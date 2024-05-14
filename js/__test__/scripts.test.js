import { mockResponse, mockAdsArray } from './mockResponse.js';
import { mockWidgetConfig } from './mockWidgetConfig.js';
import { fetchAds } from '../services/apiService.js';

jest.mock('../config/widgetConfig.js', () => ({
    AdWidgetConfig: mockWidgetConfig
}));

jest.mock('../services/apiService.js', () => ({
    fetchAds: jest.fn(() => Promise.resolve(mockResponse.list))
}));

jest.mock('../adItems/renderAdItemByType.js', () => ({
    renderAdItemByType: jest.fn(ad => `<div class="ad-item">${ad.id}</div>`)
}));

jest.mock('../utils/loadAdItemImages.js', () => ({
    loadAdItemImages: jest.fn(() => {})
}));

document.body.innerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ad Widget Demo</title>
</head>
<body>
    <div id="adw_myWidget-root"></div>
</body>
</html>
`;

describe('Widget Initialization', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        const { initializeWidget } = await import('../../scripts.js');
        await initializeWidget();
    });

    it('should inject CSS into head', () => {
        expect(document.head.innerHTML).toContain('<link rel="stylesheet" href="css/main.css">');
    });

    it('should render ads after fetching', async () => {
        expect(fetchAds).toHaveBeenCalled();
        await new Promise(resolve => process.nextTick(resolve));
        const widgetContainer = document.getElementById('adw_myWidget-root');
        expect(widgetContainer.innerHTML).toContain('<div id="adw_ad-items-wrapper" class="adw_ad-row">');
        const adsWrapper = document.getElementById('adw_ad-items-wrapper');
        expect(adsWrapper.children.length).toBeGreaterThan(0);
        expect(adsWrapper.children[0].classList.contains('ad-item')).toBe(true);
    });

    it('should update --items-per-row on window resize', () => {
        const container = document.getElementById('adw_myWidget-root');
        const responsiveBreakpoints = [...window.AdWidgetConfig.responsiveBreakpoints]

        responsiveBreakpoints.forEach((item, index) => {
            window.innerWidth = item.maxScreenWidth;
            window.dispatchEvent(new Event('resize'));
            const style = window.getComputedStyle(container);
            const itemsPerRow = style.getPropertyValue('--items-per-row').trim();
            expect(Number(itemsPerRow)).toBe(item.itemsPerRow);
        });
    });
});
