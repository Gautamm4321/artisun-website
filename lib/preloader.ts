import { asset } from '@/lib/asset';



const IMAGES = [
  asset('/logo.png'),
  asset('/keyhole-bg.webp'),
  asset('/a-new-language-of-suncare.png'),
  asset('/a-new-language-of-suncare-2.webp'),
  asset('/a-new-language-of-suncare-3.webp'),
];

const VIDEOS = [
  asset('/videos/climate/1.mp4'),
  asset('/videos/climate/2.mp4'),
  asset('/videos/climate/3.mp4'),
  asset('/videos/climate/4.mp4'),
  asset('/videos/climate/5.mp4'),
];

const MODELS: string[] = [];

const FETCH_ASSETS = [asset('/1.glb')];

export const preloadedAssets: {
  images: Record<string, HTMLImageElement>;
  videos: Record<string, string>;
} = {
  images: {},
  videos: {},
};

export function preloadAll(onProgress: (progress: number) => void): Promise<void> {
  return new Promise((resolve) => {
    let loadedCount = 0;
    const totalAssets = IMAGES.length + VIDEOS.length + MODELS.length + FETCH_ASSETS.length;
    let isResolved = false;

    const forceResolve = () => {
      if (isResolved) return;
      isResolved = true;
      onProgress(100);
      resolve();
    };

    // Longer timeout for production — videos are ~18MB total
    setTimeout(forceResolve, 25000);

    const updateProgress = () => {
      loadedCount++;
      if (!isResolved) {
        onProgress(Math.floor((loadedCount / totalAssets) * 100));
        if (loadedCount >= totalAssets) forceResolve();
      }
    };

    if (totalAssets === 0) {
      onProgress(100);
      resolve();
      return;
    }

    // Preload Images
    IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress;
      img.onabort = updateProgress;
      img.src = src;
      preloadedAssets.images[src] = img;
    });

    // Preload Videos as Blobs — never abort, let them finish in background
    VIDEOS.forEach((src) => {
      fetch(src)
        .then((res) => {
          if (!res.ok) throw new Error('Video fetch failed');
          return res.blob();
        })
        .then((blob) => {
          preloadedAssets.videos[src] = URL.createObjectURL(blob);
          updateProgress();
        })
        .catch((err) => {
          console.error('Failed to preload video:', src, err);
          updateProgress();
        });
    });



    // Fetch other heavy assets to prime the browser cache
    FETCH_ASSETS.forEach((src) => {
      fetch(src, { cache: 'force-cache' })
        .then((res) => {
          if (!res.ok) throw new Error('Fetch failed');
          return res.blob();
        })
        .then(() => updateProgress())
        .catch((err) => {
          console.error('Failed to fetch asset:', src, err);
          updateProgress();
        });
    });
  });
}
