/**
 * Skinwear flow field — the Artisun analog of the reference's soft, defocused
 * gradient hero. A handful of large, heavily-blurred colour fields drift and
 * bloom over a deep molten base, blended with `screen` so they read as flowing
 * light rather than flat shapes. Pure CSS (see globals.css `.sw-flow-*`), fixed
 * behind the page, honours reduced motion. No JS / WebGL, so it composites
 * cheaply and never blocks the main thread.
 */
export default function SkinwearFlowfield() {
  return (
    <div className="sw-flow" aria-hidden>
      <div className="sw-flow-blob sw-flow-a" />
      <div className="sw-flow-blob sw-flow-b" />
      <div className="sw-flow-blob sw-flow-c" />
      <div className="sw-flow-blob sw-flow-d" />
      <div className="sw-flow-blob sw-flow-e" />
    </div>
  );
}
