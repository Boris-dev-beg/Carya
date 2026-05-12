import cloudinary from "./cloudinary";
import { UploadApiResponse } from "cloudinary";

export const UploadImage = async (file: File, folder:string): Promise<UploadApiResponse> => {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            resource_type: "auto",
            folder: folder
        }, async (error, result) => {
            if(error) return reject(error.message)
            return resolve(result as UploadApiResponse)
        }).end(bytes)
    })
}
