import { logError } from '../utils/logError.js';
import { APIConfig, APIRequest } from './apiConfig.js';

const config = new APIConfig();
const apiRequest = new APIRequest(config);

export const fetchAds = async () => {
    try {
        config.updateParameters({
            "app.type": "desktop",
            "count": window.AdWidgetConfig.requestedItemsNumber,
            "source.type": "video",
            "source.id": 214321562187,
            "source.url": "http://www.site.com/videos/214321562187.html"
        });
        const response = await apiRequest.fetchData('1.0/json/taboola-templates/recommendations.get');
        if (!response || !response.list) {
            throw new Error('Invalid or empty response from API');
        }
        const data = response.list;
        return trimRecommendationsArray(data);
    } catch (error) {
        logError(`Failed to fetch ads: ${error.message || error}`);
        return [];
    }
}

const trimRecommendationsArray = (data) => {
    if (!data || data.length === 0) return [];
    
    const screenConfig = [...window.AdWidgetConfig.responsiveBreakpoints];
    screenConfig.sort((a, b) => b.maxScreenWidth - a.maxScreenWidth);
    const maxItemsPerRow = screenConfig[0].itemsPerRow;
    const targetLength = data.length - (data.length % maxItemsPerRow);
    const trimmedArray = data.slice(0, targetLength);

    return trimmedArray || data;
}
