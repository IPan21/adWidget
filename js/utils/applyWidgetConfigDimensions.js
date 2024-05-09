import { logError } from "./logError.js";

export const applyWidgetConfigDimensions = () => {
    const root = document.documentElement;
    try {
        const { widgetMode, horizontalModeConfig, imageAspectRatio } = window.AdWidgetConfig;
        if (!horizontalModeConfig || !imageAspectRatio) {
            throw new Error('Horizontal mode configuration or image aspect ratio is undefined');
        }

        const { ImageWidthPercentage, fontSize } = horizontalModeConfig;
        const imagePaddingTop = calculateImageDimensions(imageAspectRatio);

        if (widgetMode === 'horizontal') {
            root.style.setProperty('--adw-image-container-outer-width', `${ImageWidthPercentage}%`);
            root.style.setProperty('--adw-content-container-width', `${100 - ImageWidthPercentage}%`);
            root.style.setProperty('--adw-widget-mode-flex-direction', 'row');
            root.style.setProperty('--adw-image-container-padding-top', imagePaddingTop);
            root.style.setProperty('--adw-font-size', `${fontSize}px`);
        }
    } catch (error) {
        logError(`Error applying widget configuration dimensions: ${error}`);
    }
}

const calculateImageDimensions = (aspectRatio) => {
    try {
        if (aspectRatio && aspectRatio.width && aspectRatio.height) {
            const { width, height } = aspectRatio;
            const ratio = (height / width) * 100;
            return `${ratio}%`;
        } else {
            throw new Error('Invalid or incomplete aspect ratio');
        }
    } catch (error) {
        logError(`Error calculating image dimensions: ${error}`);
        return '0%'; // Return 0% if the config is not set properly
    }
}
