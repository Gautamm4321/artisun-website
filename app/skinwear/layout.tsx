import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skinwear™ by ARTISUN — Sun Care Designed as a Wardrobe',
  description:
    'Skinwear is sun care designed as a wardrobe. Different formulas for different mornings — built for Indian skin, Indian climate, and the way you already live.',
  openGraph: {
    title: 'Skinwear™ by ARTISUN — Sun Care Designed as a Wardrobe',
    description:
      'Skinwear is sun care designed as a wardrobe. Different formulas for different mornings — built for Indian skin, Indian climate, and the way you already live.',
    type: 'website',
    siteName: 'ARTISUN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skinwear™ by ARTISUN — Sun Care Designed as a Wardrobe',
    description:
      'Different formulas for different mornings. Skinwear by ARTISUN — climate-smart sun protection for daily life.',
  },
};

export default function SkinwearLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
