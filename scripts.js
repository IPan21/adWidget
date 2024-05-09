import { fetchAds } from "./js/services/apiService.js";
import { renderAdItemByType } from './js/adItems/renderAdItemByType.js';
import { AdWidgetConfig } from "./js/config/widgetConfig.js";
import { applyResponsiveStyles } from './js/utils/applyResponsiveStyles.js';
import { loadAdItemImages } from "./js/utils/loadAdItemImages.js";
import { injectCSS } from "./js/utils/injectCSS.js";
import { logError } from "./js/utils/logError.js";
import { formatAdsArrayForRender } from "./js/utils/formatAdsArrayForRender.js";

window.AdWidgetConfig = AdWidgetConfig;
window.AdWidgetConfig.responsiveBreakpoints.sort((a, b) => a.maxScreenWidth - b.maxScreenWidth);

// Initializes the widget
export const initializeWidget = async () => {
    try {
        injectCSS();
        const data = await fetchAds();
        const adsArray = formatAdsArrayForRender(data);
        renderAds(adsArray);
    } catch (error) {
        logError("Error initializing the widget:", error);
    }
};

// Renders the ads array in the container
export const renderAds = (ads) => {
    const container = document.getElementById('adw_myWidget-root');
    if (container) {
        container.innerHTML = `<div id="adw_ad-items-wrapper" class="adw_ad-row">${ads.map(renderAdItemByType).join('')}</div>`;
        ads.forEach(ad => loadAdItemImages(ad));
    } else {
        logError('Ad widget root container not found');
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWidget);
} else {
    initializeWidget();
}

window.addEventListener('resize', applyResponsiveStyles);
