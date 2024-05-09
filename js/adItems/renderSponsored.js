import { renderAdItem } from './renderUtils.js';

export const renderSponsoredItem = (ad) => {
    const { branding } = ad;
    const brandingElement = `<span class="adw_branding-container">${branding || ''}</span>`;
    const targetType = '_blank'
    return renderAdItem({ad, branding: brandingElement, targetType});
}

