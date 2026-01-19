/**
 * Cloudinary Image Upload Utility
 * Free tier: 25GB storage, 25GB bandwidth/month
 * 
 * Setup:
 * 1. Sign up at https://cloudinary.com (free account)
 * 2. Get your Cloud Name, Upload Preset from dashboard
 * 3. Add to .env:
 *    VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
 *    VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
 */

interface UploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

interface UploadOptions {
  folder?: string;
  maxWidth?: number;
  maxHeight?: number;
  quality?: 'auto' | number;
  format?: 'auto' | 'jpg' | 'png' | 'webp';
}

/**
 * Upload image to Cloudinary
 * @param file - File object to upload
 * @param options - Upload options (folder, max dimensions, quality, format)
 * @returns Promise with upload response containing secure_url
 */
export async function uploadImage(
  file: File,
  options: UploadOptions = {}
): Promise<UploadResponse> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    const missing = [];
    if (!cloudName) missing.push('VITE_CLOUDINARY_CLOUD_NAME');
    if (!uploadPreset) missing.push('VITE_CLOUDINARY_UPLOAD_PRESET');
    throw new Error(
      `Cloudinary credentials not found. Missing: ${missing.join(', ')}. Please add them to your .env file and restart the dev server.`
    );
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  // Validate file size (max 10MB for free tier)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('File size must be less than 10MB');
  }

  // Build form data
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  
  if (options.folder) {
    formData.append('folder', options.folder);
  }

  // Note: Transformations are applied via URL after upload, not during upload
  // This keeps the upload simple and compatible with unsigned presets

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      let errorMessage = `Upload failed: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
        await response.text().catch(() => '');
      }
      throw new Error(errorMessage);
    }

    const data: UploadResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to upload image');
  }
}

/**
 * Upload multiple images
 * @param files - Array of File objects
 * @param options - Upload options
 * @returns Promise with array of upload responses
 */
export async function uploadImages(
  files: File[],
  options: UploadOptions = {}
): Promise<UploadResponse[]> {
  const uploadPromises = files.map((file) => uploadImage(file, options));
  return Promise.all(uploadPromises);
}

/**
 * Delete image from Cloudinary (requires signed uploads or admin API)
 * Note: For unsigned uploads, you'll need to use Cloudinary Admin API
 * This is a placeholder - implement if needed with server-side API
 */
export async function deleteImage(publicId: string): Promise<void> {
  // This requires server-side implementation with Cloudinary Admin API
  // For unsigned uploads, images are typically kept unless manually deleted
  throw new Error('Delete functionality requires server-side Cloudinary Admin API');
}

/**
 * Get optimized image URL with transformations
 * @param publicId - Cloudinary public ID or full URL
 * @param transformations - Transformation string (e.g., "w_800,h_600,c_fill,q_auto")
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  publicId: string,
  transformations: string = 'q_auto,f_auto'
): string {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    // If publicId is already a full URL, return as-is
    if (publicId.startsWith('http')) {
      return publicId;
    }
    throw new Error('Cloudinary cloud name not configured');
  }

  // If it's already a Cloudinary URL, extract public_id
  let imagePublicId = publicId;
  if (publicId.includes('cloudinary.com')) {
    const match = publicId.match(/\/v\d+\/(.+)$/);
    if (match) {
      imagePublicId = match[1].replace(/\.[^.]+$/, ''); // Remove extension
    }
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${imagePublicId}`;
}

