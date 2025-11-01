# 🖼️ Image Optimization Guide for Performance

## Current Issue
Large images can significantly impact your Performance score (currently 96%). Optimizing images can boost it to 98%+.

## 🎯 Quick Wins

### 1. Convert Images to WebP Format

WebP images are **25-35% smaller** than JPEG/PNG with the same quality.

#### Using Online Tools (Easiest):
1. Go to https://squoosh.app/
2. Upload your images
3. Select WebP format
4. Adjust quality to 80-85%
5. Download optimized images

#### Using Command Line:
```bash
# Install webp converter
sudo dnf install libwebp-tools  # For Fedora

# Convert single image
cwebp -q 85 alamin.jpg -o alamin.webp

# Convert all images in a directory
for img in public/*.{jpg,png}; do
  cwebp -q 85 "$img" -o "${img%.*}.webp"
done
```

### 2. Use Modern Image Component

Create an optimized image component:

```tsx
// src/components/shared/optimized-image.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  className = ''
}: OptimizedImageProps) {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
```

### 3. Use the Component

```tsx
// Before:
<img src="/alamin.jpg" alt="Al Amin" />

// After:
<OptimizedImage
  src="/alamin.jpg"
  alt="Al Amin - Full Stack Developer"
  width={500}
  height={500}
  loading="lazy"
/>
```

---

## 📏 Image Size Guidelines

| Use Case | Max Width | Max Size | Format |
|----------|-----------|----------|--------|
| Hero Image | 1200px | 200KB | WebP |
| Project Thumbnails | 800px | 100KB | WebP |
| Blog Thumbnails | 600px | 80KB | WebP |
| Icons/Logos | 200px | 20KB | SVG/WebP |
| Avatar | 400px | 50KB | WebP |

---

## 🔧 Automated Optimization with Vite Plugin

### Install Plugin:
```bash
npm install -D vite-plugin-imagemin vite-imagetools
```

### Update vite.config.ts:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: new URLSearchParams({
        format: 'webp',
        quality: '85',
      }),
    }),
  ],
})
```

### Use in Components:
```tsx
import heroImage from '/public/alamin.jpg?w=800&format=webp';

<img src={heroImage} alt="Al Amin" />
```

---

## 🎨 Lazy Loading Images

### Below-the-Fold Images:
```tsx
// Images not visible on initial load
<img
  src="/project1.jpg"
  alt="Project screenshot"
  loading="lazy"  // Browser native lazy loading
  decoding="async"
/>
```

### Critical Images (Hero):
```tsx
// Images visible immediately
<img
  src="/alamin.jpg"
  alt="Al Amin"
  loading="eager"  // Load immediately
  fetchPriority="high"
/>
```

---

## 📊 Responsive Images

### Use srcset for Different Screen Sizes:
```tsx
<img
  src="/alamin-800.webp"
  srcSet="
    /alamin-400.webp 400w,
    /alamin-800.webp 800w,
    /alamin-1200.webp 1200w
  "
  sizes="
    (max-width: 640px) 400px,
    (max-width: 1024px) 800px,
    1200px
  "
  alt="Al Amin - Full Stack Developer"
  loading="lazy"
/>
```

---

## 🚀 CDN Optimization

### Use Vercel Image Optimization (Free on Vercel):
```tsx
import Image from 'next/image'  // If using Next.js

// Or for React/Vite, use Cloudinary/ImageKit:
const optimizedUrl = `https://res.cloudinary.com/your-cloud/image/upload/f_auto,q_auto,w_800/alamin.jpg`;

<img src={optimizedUrl} alt="Al Amin" />
```

---

## 🛠️ Tools & Resources

### Image Optimization Tools:
- **Squoosh**: https://squoosh.app/ (Online, free)
- **TinyPNG**: https://tinypng.com/ (PNG/JPEG compression)
- **ImageOptim**: https://imageoptim.com/ (Mac app)
- **SVGOMG**: https://jakearchibald.github.io/svgomg/ (SVG optimization)

### CDN Services:
- **Cloudinary**: https://cloudinary.com/ (Free tier: 25GB)
- **ImageKit**: https://imagekit.io/ (Free tier: 20GB)
- **Vercel Image Optimization**: Automatic on Vercel hosting

### Testing Tools:
- **Lighthouse**: Built into Chrome DevTools
- **WebPageTest**: https://www.webpagetest.org/
- **Google PageSpeed Insights**: https://pagespeed.web.dev/

---

## ✅ Checklist

Before deploying:
- [ ] Convert all images to WebP format
- [ ] Add width/height attributes to prevent layout shift
- [ ] Add descriptive alt text to all images
- [ ] Use lazy loading for below-fold images
- [ ] Optimize image file sizes (<200KB for large images)
- [ ] Use responsive images (srcset) for different screen sizes
- [ ] Preload critical hero images
- [ ] Use SVG for icons and logos when possible

---

## 📈 Expected Impact

After optimizing images:
- **Performance Score**: 96% → 98-100%
- **Page Load Time**: -30% to -50% faster
- **First Contentful Paint**: Improved by 0.5-1s
- **Largest Contentful Paint**: Improved by 1-2s
- **Data Usage**: Reduced by 40-60%

---

**Pro Tip**: Start with the hero image and project thumbnails - they have the biggest impact on performance!
