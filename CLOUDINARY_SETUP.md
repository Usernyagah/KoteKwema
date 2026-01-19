# Cloudinary Setup Guide

## Why Cloudinary?

Cloudinary offers a **free tier** with:
- ✅ 25GB storage
- ✅ 25GB bandwidth/month
- ✅ Automatic image optimization
- ✅ No billing account required
- ✅ Easy client-side uploads

Perfect alternative to Firebase Storage when you don't want to set up billing.

## Quick Setup

### 1. Create Free Account

1. Go to [cloudinary.com](https://cloudinary.com/users/register/free)
2. Sign up with your email (free account)
3. Verify your email

### 2. Get Your Credentials

After logging in, you'll see your **Cloud Name** in the dashboard URL:
```
https://console.cloudinary.com/settings/cloudinary_console
                                    ^^^^^^^^^^^^
                                    This is your Cloud Name
```

### 3. Create Upload Preset

1. Go to **Settings** → **Upload** → **Upload presets**
2. Click **"Add upload preset"**
3. Configure:
   - **Preset name**: `kotekwema-unsigned` (or any name)
   - **Signing mode**: **Unsigned** (important for client-side uploads)
   - **Folder**: `properties` (optional, organizes uploads)
   - **Upload manipulations**: 
     - Quality: `auto`
     - Format: `auto`
   - Click **Save**

### 4. Add to Your Project

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your credentials:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
   VITE_CLOUDINARY_UPLOAD_PRESET=kotekwema-unsigned
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage Examples

### Basic Upload Component

```tsx
import ImageUpload from './components/ImageUpload';

function MyComponent() {
  const handleUpload = (url: string, publicId: string) => {
    console.log('Image URL:', url);
    console.log('Public ID:', publicId);
    // Save to your database, update state, etc.
  };

  return (
    <ImageUpload
      folder="properties"
      onUploadComplete={handleUpload}
      maxSize={10} // MB
      maxWidth={1920}
      maxHeight={1080}
    />
  );
}
```

### Programmatic Upload

```tsx
import { uploadImage } from './utils/cloudinary';

async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const result = await uploadImage(file, {
      folder: 'properties',
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 'auto',
      format: 'auto',
    });
    
    console.log('Uploaded:', result.secure_url);
    // Use result.secure_url in your app
  } catch (error) {
    console.error('Upload failed:', error);
  }
}
```

### Get Optimized Image URL

```tsx
import { getOptimizedImageUrl } from './utils/cloudinary';

// Transform existing Cloudinary image
const optimizedUrl = getOptimizedImageUrl(
  'properties/image123',
  'w_800,h_600,c_fill,q_auto'
);
```

## Upload Options

- **folder**: Organize uploads (e.g., `"properties"`, `"projects"`)
- **maxWidth/maxHeight**: Auto-resize large images
- **quality**: `'auto'` or number (1-100)
- **format**: `'auto'` (auto-optimize), `'jpg'`, `'png'`, `'webp'`

## Security Notes

- **Unsigned uploads** are fine for public content
- For private/sensitive images, use **signed uploads** (requires server-side API)
- Set **Upload restrictions** in Cloudinary settings (file types, sizes, etc.)
- Use **Folders** to organize and control access

## Troubleshooting

### "Cloudinary credentials not found"
- Make sure `.env` file exists in project root
- Check that variable names start with `VITE_`
- Restart your dev server after adding env variables

### "Upload failed: 401"
- Check your Upload Preset is set to **Unsigned**
- Verify Cloud Name and Upload Preset match your Cloudinary dashboard

### "File size must be less than 10MB"
- Free tier allows up to 10MB per file
- Use `maxWidth`/`maxHeight` to auto-resize large images
- Or upgrade to paid plan for larger files

## Free Tier Limits

- ✅ 25GB storage
- ✅ 25GB bandwidth/month
- ✅ 25GB transformations/month
- ✅ Max 10MB per file
- ✅ Unlimited uploads

Perfect for most websites! 🎉


