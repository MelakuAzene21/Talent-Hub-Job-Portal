import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";

// Check if Cloudinary credentials are available
const hasCloudinaryConfig = env.CLOUDINARY.CLOUD_NAME && 
                           env.CLOUDINARY.API_KEY && 
                           env.CLOUDINARY.API_SECRET;

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY.CLOUD_NAME,
    api_key: env.CLOUDINARY.API_KEY,
    api_secret: env.CLOUDINARY.API_SECRET,
  });
  console.log('Cloudinary configured successfully');
} else {
  console.warn('Cloudinary configuration missing. File uploads will not work properly.');
  console.warn('Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.');
}

// Export the cloudinary instance for multer-storage-cloudinary
export { cloudinary, hasCloudinaryConfig };
