import { applyResponsiveStyles } from "./applyResponsiveStyles.js";
import { applyWidgetConfigDimensions } from "./applyWidgetConfigDimensions.js";
import { logError } from "./logError.js";

export const injectCSS = () => {
    try {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/main.css';
        document.head.appendChild(link);
        applyResponsiveStyles();
        applyWidgetConfigDimensions();
    } catch (error) {
        logError(`Error during CSS injection and initial setup: ${error}`);
    }
};
