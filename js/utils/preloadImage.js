import { logError } from "./logError.js";

// Pre-load images and handle fallbacks
// Note: For slow networks, consider implementing a timeout for image loading operations.
export const preloadImage = (cloudinaryUrl, originalUrl, placeholderUrl) => {
    const img = new Image();

    const loadImage = (url) => {
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(url);
            img.onerror = () => { logError(`Failed to load image at ${url}`); reject() };
            img.src = url;
        });
    };

    loadImage(cloudinaryUrl)
        .then(url => { img.src = url; })
            .catch(() => { loadImage(originalUrl) // if cloudinary fails, load the original image
                .then(url => {img.src = url;})
                    .catch(() => {img.src = placeholderUrl;}); // both Cloudinary and original image failed, using placeholder
                        });
    return img;
}