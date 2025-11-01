# 🗂️ Portfolio Components Restructuring Guide

## New Structure Overview

```
src/components/
├── planets/              # All 3D interactive planet components
│   ├── profile-planet-3d.tsx
│   ├── cp-planet-3d.tsx
│   ├── projects-planet-3d.tsx
│   ├── skills-planet-3d.tsx
│   ├── blog-planet-3d.tsx
│   ├── education-planet-3d.tsx
│   ├── contact-planet-3d.tsx
│   ├── footer-planet-3d.tsx
│   ├── planet-3d.tsx
│   ├── planet-modal.tsx
│   └── index.ts
│
├── sections/             # Main page sections
│   ├── hero.tsx
│   ├── projects.tsx
│   ├── skills.tsx
│   ├── blog.tsx
│   ├── education.tsx
│   ├── contact.tsx
│   ├── cp-profiles.tsx
│   ├── projectsPage.tsx
│   ├── blogsPage.tsx
│   ├── project-details.tsx
│   ├── blog-details.tsx
│   ├── blog-details-wrapper.tsx
│   └── index.ts
│
├── layout/               # Layout & navigation
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── floating-planets.tsx
│   ├── floating-elements.tsx
│   ├── background-stars.tsx
│   ├── mouse-trail.tsx
│   ├── initial-loader.tsx
│   └── index.ts
│
├── features/             # Feature components
│   ├── linux-portfolio.tsx
│   ├── linux-navbar.tsx
│   ├── linux-contact-modal.tsx
│   ├── linux-project-modal.tsx
│   ├── linux-showcase-modal.tsx
│   ├── linux-data.ts
│   └── index.ts
│
├── shared/               # Reusable components
│   ├── section-title.tsx
│   ├── custom-button.tsx
│   ├── animated-section.tsx
│   ├── common-tooltip.tsx
│   ├── not-found.tsx
│   ├── seo.tsx
│   └── index.ts
│
├── css/                  # Styles (keep as-is)
├── custom/               # Custom utilities (keep as-is)
├── easter-eggs/          # Easter eggs (keep as-is)
├── game/                 # Games (keep as-is)
├── hero-icons/           # Hero icons (keep as-is)
├── pixel-art/            # Pixel art (keep as-is)
├── stats/                # Stats (keep as-is)
└── ui/                   # UI components (keep as-is)
```

## Step-by-Step Migration Commands

Run these commands from: `src/components/`

### Step 1: Move Planet Components
```bash
# Move all planet 3D components
mv profile-planet-3d.tsx planets/
mv cp-planet-3d.tsx planets/
mv projects-planet-3d.tsx planets/
mv skills-planet-3d.tsx planets/
mv blog-planet-3d.tsx planets/
mv education-planet-3d.tsx planets/
mv contact-planet-3d.tsx planets/
mv footer-planet-3d.tsx planets/
mv planet-3d.tsx planets/
mv planet-modal.tsx planets/
```

### Step 2: Move Section Components
```bash
# Move main sections
mv hero.tsx sections/
mv projects.tsx sections/
mv skills.tsx sections/
mv blog.tsx sections/
mv education.tsx sections/
mv contact.tsx sections/
mv cp-profiles.tsx sections/

# Move page components
mv projectsPage.tsx sections/
mv blogsPage.tsx sections/
mv project-details.tsx sections/
mv blog-details.tsx sections/
mv blog-details-wrapper.tsx sections/
mv blog-details-modal.tsx sections/
```

### Step 3: Move Layout Components
```bash
mv navbar.tsx layout/
mv footer.tsx layout/
mv floating-planets.tsx layout/
mv floating-elements.tsx layout/
mv background-stars.tsx layout/
mv mouse-trail.tsx layout/
mv initial-loader.tsx layout/
```

### Step 4: Move Feature Components
```bash
mv linux-portfolio.tsx features/
mv linux-navbar.tsx features/
mv linux-contact-modal.tsx features/
mv linux-project-modal.tsx features/
mv linux-showcase-modal.tsx features/
mv linux-data.ts features/
```

### Step 5: Move Shared Components
```bash
mv section-title.tsx shared/
mv custom-button.tsx shared/
mv animated-section.tsx shared/
mv common-tooltip.tsx shared/
mv not-found.tsx shared/
mv seo.tsx shared/
mv custom-toast.tsx shared/
mv easter-eggs-modal.tsx shared/
mv certificates.tsx shared/
```

## After Moving Files

You'll need to update imports in these key files:
- `src/App.tsx` - Update all component imports
- `src/components/planets/planet-modal.tsx` - Update planet imports
- `src/components/layout/floating-planets.tsx` - Update planet-modal import
- All section files that import other components

