import { logError } from "./logError.js";

// Pre-load images and handle fallbacks
// assuming Cloudinary CDN and Caching are leveraged
export const preloadImage = async (cloudinaryUrl, originalUrl, placeholderUrl) => {
    const loadImage = (url) => {
        const img = new Image();
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = () => { reject(new Error(`Failed to load image at ${url}`));}
            img.src = url;
        });
    };

    return loadImage(cloudinaryUrl)
        .catch(() => loadImage(originalUrl))
        .catch(() => loadImage(placeholderUrl))
        .catch(error => {
            logError("All fallbacks failed: " + error.message);
            return null;
        });
};