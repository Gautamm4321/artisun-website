'use client';

import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useGLTF, Center, Billboard, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ───────────────────────────────────────────────────────────────────────────
   AuraJourney — one persistent Aura Pearl bottle that travels the whole page.

   A single fixed, full-viewport WebGL canvas stays mounted for the entire
   Skinwear page. The bottle glides between invisible DOM "anchor" slots that
   sit in the empty space of each section, so it is always placed correctly no
   matter how the layout reflows. Position, scale, and a slow presentation spin
   are all driven by scroll — no scroll listeners, everything reads inside the
   render loop.
   ─────────────────────────────────────────────────────────────────────────── */

/* Soft pearl bloom that rides behind the bottle — warm, so it belongs with the
   brand's molten-orange dome without going full sunshine-gold. */
const AuraGlowMaterial = shaderMaterial(
  { glowColor: new THREE.Color('#ffd7a4'), glowOpacity: 0.6 },
  `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  `uniform vec3 glowColor; uniform float glowOpacity; varying vec2 vUv;
   void main() {
     float dist = distance(vUv, vec2(0.5));
     float alpha = smoothstep(0.5, 0.0, dist);
     alpha = pow(alpha, 1.6);
     gl_FragColor = vec4(glowColor, alpha * glowOpacity);
   }`
);
extend({ AuraGlowMaterial });

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

type Anchor = {
  docCenter: number; // absolute Y center in the document
  screenX: number; // viewport px
  screenY: number;
  scale: number;
};

function readAnchors(): Anchor[] {
  const els = document.querySelectorAll<HTMLElement>('[data-aura-anchor]');
  const list: Anchor[] = [];
  els.forEach((el) => {
    // Skip anchors hidden at the current breakpoint (display:none → no offsetParent).
    if (el.offsetParent === null) return;
    const r = el.getBoundingClientRect();
    list.push({
      docCenter: r.top + r.height / 2 + window.scrollY,
      screenX: r.left + r.width / 2,
      screenY: r.top + r.height / 2,
      scale: parseFloat(el.dataset.auraScale || '0.8'),
    });
  });
  return list.sort((a, b) => a.docCenter - b.docCenter);
}

function AuraBottle({ reduced }: { reduced: boolean }) {
  const travel = useRef<THREE.Group>(null!); // position + scale (the glide)
  const spin = useRef<THREE.Group>(null!); // rotation only
  const { scene } = useGLTF('/2.glb');
  const cloned = useMemo(() => scene.clone(true), [scene]);

  // Smoothed working values so nothing snaps.
  const cur = useRef({
    x: 0,
    y: 0,
    z: 0,
    s: 0.0001,
    rx: 0,
    ry: 0,
    rz: 0,
    scrollSpin: 0,
    lastScroll: 0,
    inited: false,
  });

  useEffect(() => {
    // start folded away so it blooms in on first frames
    if (travel.current) travel.current.scale.setScalar(0.0001);
  }, []);

  useFrame((state, delta) => {
    if (!travel.current || !spin.current) return;
    const { camera, size, clock, pointer } = state;

    const vh = size.height;
    const vw = size.width;
    if (!vw || !vh) return; // guard against a momentary zero-size canvas
    const anchors = readAnchors();

    // Visible world extents at the bottle plane (z = 0).
    const persp = camera as THREE.PerspectiveCamera;
    const visH = 2 * Math.tan((persp.fov * Math.PI) / 360) * Math.abs(persp.position.z);
    const visW = visH * (vw / vh);

    let targetScreenX = vw * 0.7;
    let targetScreenY = vh * 0.5;
    let targetScale = 0.8;
    let presence = 1;

    if (anchors.length > 0) {
      const vpCenter = window.scrollY + vh / 2;

      if (vpCenter <= anchors[0].docCenter) {
        targetScreenX = anchors[0].screenX;
        targetScreenY = anchors[0].screenY;
        targetScale = anchors[0].scale;
      } else if (vpCenter >= anchors[anchors.length - 1].docCenter) {
        const last = anchors[anchors.length - 1];
        targetScreenX = last.screenX;
        targetScreenY = last.screenY;
        targetScale = last.scale;
        // fade away quickly as we descend past the final slot, so the bottle
        // is completely gone before the "Dedicated to you" finale section
        presence = clamp01(1 - (vpCenter - last.docCenter) / (vh * 0.18));
      } else {
        // between two anchors — glide continuously from one slot to the next
        let i = 0;
        for (let k = 0; k < anchors.length - 1; k++) {
          if (vpCenter >= anchors[k].docCenter && vpCenter <= anchors[k + 1].docCenter) {
            i = k;
            break;
          }
        }
        const a = anchors[i];
        const b = anchors[i + 1];
        const raw = (vpCenter - a.docCenter) / (b.docCenter - a.docCenter || 1);
        const t = easeInOutCubic(clamp01(raw));
        targetScreenX = a.screenX + (b.screenX - a.screenX) * t;
        targetScreenY = a.screenY + (b.screenY - a.screenY) * t;
        targetScale = a.scale + (b.scale - a.scale) * t;
      }
    }

    // Screen px → world at the bottle plane.
    const worldX = (targetScreenX / vw - 0.5) * visW;
    const worldY = -(targetScreenY / vh - 0.5) * visH;

    const c = cur.current;
    const dt = Math.min(delta, 1 / 30); // clamp so a stutter can't fling the bottle

    // Scroll velocity (px/sec) → the bottle spins livelier while you scroll.
    const scrollY = window.scrollY;
    const rawScrollVel = (scrollY - c.lastScroll) / (dt || 1 / 60);
    c.lastScroll = scrollY;
    const spinTarget = reduced ? 0 : clamp(rawScrollVel * 0.0011, -7, 7);
    c.scrollSpin += (spinTarget - c.scrollSpin) * (1 - Math.pow(0.02, dt));

    // First real frame: snap into the opening slot so the bottle is simply
    // there on load rather than flying in from the centre of the screen.
    if (!c.inited) {
      c.x = worldX;
      c.y = worldY;
      c.s = targetScale * presence;
      c.inited = true;
    }

    // Momentum smoothing of the glide (frame-rate independent, floaty).
    const kPos = 1 - Math.pow(0.0009, dt);
    const prevX = c.x;
    const prevY = c.y;
    c.x += (worldX - c.x) * kPos;
    c.y += (worldY - c.y) * kPos;
    c.s += (targetScale * presence - c.s) * (1 - Math.pow(0.004, dt));

    // World velocity of the bottle itself — drives banking + a depth arc.
    const vx = (c.x - prevX) / (dt || 1 / 60);
    const vy = (c.y - prevY) / (dt || 1 / 60);
    const speed = Math.hypot(vx, vy);

    // Recede in Z while flying between slots, glide forward to settle — parallax depth.
    const zTarget = reduced ? 0 : -clamp(speed * 0.16, 0, 1.5);
    c.z += (zTarget - c.z) * (1 - Math.pow(0.02, dt));

    const floatY = reduced ? 0 : Math.sin(clock.elapsedTime * 0.6) * 0.03;
    travel.current.position.set(c.x, c.y + floatY, c.z);
    travel.current.scale.setScalar(Math.max(c.s, 0.0001));

    // ── Rotation: accumulated presentation spin, faster while scrolling ──
    const idleRate = reduced ? 0 : 0.16;
    c.ry += (idleRate + c.scrollSpin) * dt;

    // Bank into the travel: lean on horizontal motion, pitch on vertical motion,
    // blended with a decorative cursor-follow tilt. All springed so it eases.
    const cursorPitch = reduced ? 0 : pointer.y * 0.12;
    const cursorRoll = reduced ? 0 : pointer.x * -0.07;
    const bankRoll = reduced ? 0 : clamp(-vx * 0.05, -0.5, 0.5);
    const bankPitch = reduced ? 0 : clamp(vy * 0.045, -0.45, 0.45);
    const kTilt = 1 - Math.pow(0.05, dt);
    c.rx += (cursorPitch + bankPitch - c.rx) * kTilt;
    c.rz += (cursorRoll + bankRoll - c.rz) * kTilt;

    spin.current.rotation.set(c.rx, c.ry, c.rz);
  });

  return (
    <group ref={travel}>
      <Billboard position={[0, 0.1, -1.3]}>
        <mesh>
          <planeGeometry args={[8, 8]} />
          {/* @ts-ignore custom shader material via extend */}
          <auraGlowMaterial
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Billboard>
      <group ref={spin}>
        <Center>
          <primitive object={cloned} />
        </Center>
      </group>
    </group>
  );
}

function Scene({ reduced }: { reduced: boolean }) {
  return (
    <>
      {/* Warm key + cool fill, matching the rest of the brand's 3D language */}
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 0.6, 2]} intensity={2.6} color="#ffd9a8" distance={8} decay={2} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} color="#fff2df" />
      <directionalLight position={[-5, 2, -4]} intensity={0.5} color="#ff9a5a" />
      <spotLight position={[0, 9, 4]} angle={0.35} penumbra={1} intensity={1.4} color="#ffe9cf" />
      <Suspense fallback={null}>
        <AuraBottle reduced={reduced} />
      </Suspense>
    </>
  );
}

export default function AuraJourney() {
  const reducedRef = useRef(false);
  if (typeof window !== 'undefined') {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Nudge R3F to remeasure once layout has settled. Guards against the canvas
  // initialising at a zero size (before the fixed container is laid out), which
  // would otherwise leave the render loop dormant.
  useEffect(() => {
    let n = 0;
    const tick = () => {
      window.dispatchEvent(new Event('resize'));
      if (++n < 5) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[4]" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        frameloop="always"
        camera={{ position: [0, 0, 6], fov: 30 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        <Scene reduced={reducedRef.current} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/2.glb');
