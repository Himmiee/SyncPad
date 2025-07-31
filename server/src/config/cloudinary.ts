import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export const cloudinaryUpload = (fileBuffer: Buffer, folder = "avatars") => {
  return new Promise<{ url: string; public_id: string }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};
