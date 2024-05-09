import { mockResponse } from './mockResponse.js';
import { mockWidgetConfig } from './mockWidgetConfig.js';
import { fetchAds } from '../services/apiService.js';

jest.mock('../config/widgetConfig.js', () => ({
    AdWidgetConfig: mockWidgetConfig
}));

jest.mock('../services/apiService.js', () => ({
    fetchAds: jest.fn(() => Promise.resolve(mockResponse))
}));

jest.mock('../adItems/renderAdItemByType.js', () => ({
    renderAdItemByType: jest.fn(ad => `<div class="ad-item">${ad.id}</div>`)
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
        await new Promise(process.nextTick);
        const container = document.getElementById('adw_myWidget-root');
        expect(container.innerHTML).toContain('<div id="adw_ad-items-wrapper" class="adw_ad-row"></div>');
    });

    it('should update --items-per-row on window resize', () => {
        const container = document.getElementById('adw_myWidget-root');

        const breakpoints = [500, 800, 950, 1300];
        const expectedItemsPerRows = ['1', '3', '6', '6'];

        breakpoints.forEach((size, index) => {
            window.innerWidth = size;
            window.dispatchEvent(new Event('resize'));
            const style = window.getComputedStyle(container);
            const itemsPerRow = style.getPropertyValue('--items-per-row').trim();
            expect(itemsPerRow).toBe(expectedItemsPerRows[index]);
        });
    });
});
