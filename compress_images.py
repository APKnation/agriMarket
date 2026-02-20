#!/usr/bin/env python3
"""
Simple image compression script to reduce file sizes while maintaining quality
"""

import os
from PIL import Image
import sys

def compress_image(input_path, output_path, quality=60, max_size=(1920, 1080)):
    """
    Compress an image to reduce file size
    
    Args:
        input_path: Path to input image
        output_path: Path for compressed output
        quality: JPEG quality (1-100)
        max_size: Maximum dimensions (width, height)
    """
    try:
        # Open the image
        img = Image.open(input_path)
        
        # Convert to RGB if necessary (for JPEG)
        if img.mode in ('RGBA', 'LA', 'P'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = rgb_img
        
        # Resize if larger than max_size
        if img.size[0] > max_size[0] or img.size[1] > max_size[1]:
            img.thumbnail(max_size, Image.LANCZOS)
        
        # Save with compression
        img.save(output_path, 'JPEG', quality=quality, optimize=True, progressive=True)
        
        # Get file sizes
        original_size = os.path.getsize(input_path)
        compressed_size = os.path.getsize(output_path)
        reduction = (original_size - compressed_size) / original_size * 100
        
        print(f"✅ {os.path.basename(input_path)}")
        print(f"   Original: {original_size / (1024*1024):.1f}MB")
        print(f"   Compressed: {compressed_size / (1024*1024):.1f}MB")
        print(f"   Reduction: {reduction:.1f}%")
        print()
        
        return True
        
    except Exception as e:
        print(f"❌ Error compressing {input_path}: {e}")
        return False

def main():
    """Main compression function"""
    images_dir = "/media/apknation/APKnation/PROJECT/VUE/kilimo/public/images/heroes"
    
    # Images to compress
    images_to_compress = [
        ("market.jpg", "market.jpg"),
        ("cropmanage.jpg", "cropmanage.jpg"), 
        ("market1.jpg", "market1.jpg")
    ]
    
    print("🗜️  Compressing images for better web performance...")
    print()
    
    for input_file, output_file in images_to_compress:
        input_path = os.path.join(images_dir, input_file)
        output_path = os.path.join(images_dir, output_file)
        
        if os.path.exists(input_path):
            # Create backup first
            backup_path = os.path.join(images_dir, f"{input_file}.backup")
            if not os.path.exists(backup_path):
                os.rename(input_path, backup_path)
                input_path = backup_path
            
            compress_image(input_path, output_path, quality=60, max_size=(1920, 1080))
        else:
            print(f"❌ File not found: {input_path}")
    
    print("🎉 Image compression complete!")
    print("📊 Check the file sizes - they should be much smaller now!")

if __name__ == "__main__":
    main()
