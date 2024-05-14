import { calculateImageDimensions } from '../utils/applyWidgetConfigDimensions.js';

export const renderAdItem = ({ ad, branding, targetType }) => {
    const { imageAspectRatio } = window.AdWidgetConfig;
    const imageContainerPaddingTop = calculateImageDimensions(imageAspectRatio);

    return `
        <div id="adw_ad-item-${ad.containerId}" class="adw_ad-item ${ad.origin}">
            <a href="${ad.url}" target="${targetType}" class="adw_image-container-outer">
                <div id="adw_image-container-${ad.containerId}" class="adw_image-container" style="padding-top: ${imageContainerPaddingTop};"></div>
            </a>
            <a href="${ad.url}" target="${targetType}" class="adw_content-container-outer">
                <div id="adw_content-container-${ad.containerId}" class="adw_content-container">
                    <span class="adw_title-container">${ad.name}</span>
                    ${branding}
                </div>
            </a>
        </div>
    `;
};

