#!/bin/bash

# Lighthouse Optimization Helper Script
# Run this to check for common accessibility and performance issues

echo "🔍 Checking for common Lighthouse issues..."
echo ""

# Check for images without alt text
echo "📷 Checking for images without alt text..."
grep -rn "src=\"" src/ --include="*.tsx" --include="*.jsx" | grep -v "alt=" | head -10
echo ""

# Check for buttons without accessible labels
echo "🔘 Checking for buttons without labels..."
grep -rn "<button" src/ --include="*.tsx" --include="*.jsx" | grep -v "aria-label" | grep -v ">" | head -10
echo ""

# Check for inputs without labels
echo "📝 Checking for inputs without associated labels..."
grep -rn "<input" src/ --include="*.tsx" --include="*.jsx" | grep -v "aria-label" | grep -v "id=" | head -10
echo ""

# Check for links without meaningful text
echo "🔗 Checking for links with generic text..."
grep -rn "Click here\|Read more\|Learn more" src/ --include="*.tsx" --include="*.jsx" | head -10
echo ""

# Check for console.log statements
echo "🐛 Checking for console.log statements (should be removed in production)..."
grep -rn "console.log" src/ --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" | wc -l
echo " console.log statements found"
echo ""

# Check for large image files
echo "🖼️  Checking for large images (>500KB)..."
find public/ -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" \) -size +500k -exec ls -lh {} \; 2>/dev/null
echo ""

# Check for unused dependencies
echo "📦 Checking for potentially unused dependencies..."
echo "(Run 'npx depcheck' for detailed analysis)"
echo ""

# Summary
echo "✅ Quick check complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Add alt text to images found above"
echo "  2. Add aria-labels to buttons and interactive elements"
echo "  3. Associate labels with form inputs"
echo "  4. Remove console.log statements before production"
echo "  5. Optimize large images to WebP format"
echo ""
echo "🚀 Run 'npm run build' to create optimized production bundle"
echo "🧪 Run 'npx lighthouse https://your-site.com --view' to test"
