# Image Directory Structure

## 📁 Public Images Folder
```
/public/images/
├── logos/          # Company logos, branding
├── heroes/         # Hero section images
├── banners/        # Banner images
├── products/       # Product images
├── farmers/        # Farmer profile photos
└── icons/          # Small icons and UI elements
```

## 🖼️ How to Use Images

### 1. Place Images
- Add your images to appropriate folders in `/public/images/`
- Use descriptive names (e.g., `farmer-john.jpg`, `maize-product.jpg`)

### 2. Reference in Vue Components
```vue
<!-- Using absolute path from public folder -->
<img src="/images/logos/sfmp-logo.png" alt="SFMP Logo" />

<!-- Hero image -->
<img src="/images/heroes/tanzania-farmers.jpg" alt="Tanzanian Farmers" />

<!-- Product image -->
<img src="/images/products/maize.jpg" alt="Fresh Maize" />

<!-- Farmer profile -->
<img src="/images/farmers/john-mwangi.jpg" alt="John Mwangi" />
```

### 3. Dynamic Images
```vue
<template>
  <img :src="`/images/products/${product.image}`" :alt="product.name" />
</template>
```

### 4. Background Images
```vue
<div class="hero-section" :style="`background-image: url('/images/heroes/farm-background.jpg')`">
  <!-- Content -->
</div>
```

## 📸 Recommended Image Types

### Logos
- PNG with transparent background
- 200x200px for small logos
- 400x400px for large logos

### Hero Images
- JPG for photos
- 1920x1080px (16:9 ratio)
- Optimized for web (under 500KB)

### Product Images
- JPG or PNG
- 800x800px square
- White background for products

### Farmer Photos
- JPG for photos
- 400x400px square
- Professional headshots

## 🌐 Image Sources

### Free Stock Photos
- Unsplash.com (free, high quality)
- Pexels.com (free, good selection)
- Pixabay.com (free, large library)

### Tanzania-Specific Images
- Search for "Tanzania farming"
- "African agriculture"
- "Smallholder farmers"
- "Maize farming Tanzania"

## 📝 File Naming Convention

Use descriptive, lowercase names with hyphens:
```
✅ Good: farmer-john-mwangi.jpg
✅ Good: fresh-maize-tanzania.jpg
✅ Good: sfmp-logo-primary.png

❌ Bad: IMG_1234.jpg
❌ Bad: Farmer Photo.jpg
❌ Bad: image (1).png
```

## 🚀 Optimization Tips

1. **Compress images** before adding
2. **Use WebP format** for better compression
3. **Create multiple sizes** for responsive design
4. **Add alt text** for accessibility
5. **Use lazy loading** for better performance
