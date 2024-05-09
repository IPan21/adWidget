import { logError } from "./logError.js";

export const formatAdsArrayForRender = (data) => {
    try {
        const cloudinaryUrlPartWithParams = getCloudinaryUrlPartWithParams();
        const formattedData = data.map((ad, index) => {
            if (ad.thumbnail && ad.thumbnail.length > 0) {
                const imageUrl = ad.thumbnail[0].url || '';
                ad.cloudinaryUrl = imageUrl ? `${cloudinaryUrlPartWithParams}/${imageUrl}`: '';
                ad.thumbnailImage = imageUrl;
                ad.containerId = index + 1;
            }
            return ad;
        });
        return formattedData;
    } catch (error) {
        logError(`Error formatting ad array for render: ${error}`);
        return [];
    }
}

const getCloudinaryUrlPartWithParams = () => {
    try {
        const { width, height } = calculateImageSize();
        const cloudinaryBaseUrl = "https://res.cloudinary.com/du8iytc06/image/fetch/";
        const cloudinaryParams = `w_${width},h_${height},c_fill,g_auto,f_webp`;
        return `${cloudinaryBaseUrl}${cloudinaryParams}`;
    } catch (error) {
        logError(`Error generating Cloudinary URL part: ${error}`);
        return "";
    }
};

// Calculate the size of the image container based on screen width and items per row
const calculateImageSize = () => {
    const screenWidth = window.innerWidth;
    const imageAspectRatio = window.AdWidgetConfig.imageAspectRatio;
    try {
        const itemsPerRow = window.AdWidgetConfig.responsiveBreakpoints.find(bp => screenWidth <= bp.maxScreenWidth).itemsPerRow;
        const imageWidth = Math.round(screenWidth / itemsPerRow) - window.AdWidgetConfig.customUiConfigs.gapBetweenAdItems; // Subtracting margin
        const imageHeight = Math.round((imageWidth / imageAspectRatio.width) * imageAspectRatio.height);
        return { width: imageWidth, height: imageHeight };
    } catch (error) {
        logError(`Error calculating image size: ${error}`);
        return { width: 300, height: 169 }; // Default size fallback to image with 16/9 ratio
    }
};