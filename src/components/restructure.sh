#!/bin/bash

# Portfolio Components Restructuring Script
# Run this from: src/components/

echo "🗂️  Starting portfolio restructuring..."
echo ""

# Step 1: Move Planet Components
echo "📍 Step 1: Moving planet components..."
mv profile-planet-3d.tsx planets/ 2>/dev/null
mv cp-planet-3d.tsx planets/ 2>/dev/null
mv projects-planet-3d.tsx planets/ 2>/dev/null
mv skills-planet-3d.tsx planets/ 2>/dev/null
mv blog-planet-3d.tsx planets/ 2>/dev/null
mv education-planet-3d.tsx planets/ 2>/dev/null
mv contact-planet-3d.tsx planets/ 2>/dev/null
mv footer-planet-3d.tsx planets/ 2>/dev/null
mv planet-3d.tsx planets/ 2>/dev/null
mv planet-modal.tsx planets/ 2>/dev/null
echo "✅ Planet components moved"

# Step 2: Move Section Components
echo "📄 Step 2: Moving section components..."
mv hero.tsx sections/ 2>/dev/null
mv projects.tsx sections/ 2>/dev/null
mv skills.tsx sections/ 2>/dev/null
mv blog.tsx sections/ 2>/dev/null
mv education.tsx sections/ 2>/dev/null
mv contact.tsx sections/ 2>/dev/null
mv cp-profiles.tsx sections/ 2>/dev/null
mv projectsPage.tsx sections/ 2>/dev/null
mv blogsPage.tsx sections/ 2>/dev/null
mv project-details.tsx sections/ 2>/dev/null
mv blog-details.tsx sections/ 2>/dev/null
mv blog-details-wrapper.tsx sections/ 2>/dev/null
mv blog-details-modal.tsx sections/ 2>/dev/null
echo "✅ Section components moved"

# Step 3: Move Layout Components
echo "🎨 Step 3: Moving layout components..."
mv navbar.tsx layout/ 2>/dev/null
mv footer.tsx layout/ 2>/dev/null
mv floating-planets.tsx layout/ 2>/dev/null
mv floating-elements.tsx layout/ 2>/dev/null
mv background-stars.tsx layout/ 2>/dev/null
mv mouse-trail.tsx layout/ 2>/dev/null
mv initial-loader.tsx layout/ 2>/dev/null
echo "✅ Layout components moved"

# Step 4: Move Feature Components
echo "⚡ Step 4: Moving feature components..."
mv linux-portfolio.tsx features/ 2>/dev/null
mv linux-navbar.tsx features/ 2>/dev/null
mv linux-contact-modal.tsx features/ 2>/dev/null
mv linux-project-modal.tsx features/ 2>/dev/null
mv linux-showcase-modal.tsx features/ 2>/dev/null
mv linux-data.ts features/ 2>/dev/null
echo "✅ Feature components moved"

# Step 5: Move Shared Components
echo "🔄 Step 5: Moving shared components..."
mv section-title.tsx shared/ 2>/dev/null
mv custom-button.tsx shared/ 2>/dev/null
mv animated-section.tsx shared/ 2>/dev/null
mv common-tooltip.tsx shared/ 2>/dev/null
mv not-found.tsx shared/ 2>/dev/null
mv seo.tsx shared/ 2>/dev/null
mv custom-toast.tsx shared/ 2>/dev/null
mv easter-eggs-modal.tsx shared/ 2>/dev/null
mv certificates.tsx shared/ 2>/dev/null
echo "✅ Shared components moved"

echo ""
echo "🎉 Restructuring complete!"
echo ""
echo "⚠️  IMPORTANT: Next steps:"
echo "1. Update imports in src/App.tsx"
echo "2. Update imports in all moved component files"
echo "3. Run 'npm run dev' to check for errors"
echo "4. Fix any import path issues"
echo ""
echo "📖 See RESTRUCTURE_GUIDE.md for detailed information"
