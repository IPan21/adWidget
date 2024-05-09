import { preloadImage } from './preloadImage.js';
import { logError } from './logError.js'; // Assuming logError is correctly imported

// Image load or lazy load for images
export const loadAdItemImages = ({ cloudinaryUrl, thumbnailImage: highResUrl, containerId }) => {
    const placeholder = "/assets/placeholder.webp";

    const appendImage = (container) => {
        try {
            const img = preloadImage(cloudinaryUrl, highResUrl, placeholder);
            img.classList.add('adw_thumbnail');
            img.id = `adw_thumbnail-${containerId}`;
            container.appendChild(img);
        } catch (error) {
            logError(`Error appending image in container ${containerId}: ${error}`);
        }
    };

    try {
        const containers = document.querySelectorAll(`div[id='adw_image-container-${containerId}']`);
        if (!window.AdWidgetConfig.lazyLoadEnabled) {
            containers.forEach(container => {
                if (container) appendImage(container);
            });
            return;
        }

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target) {
                    appendImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '300px' });

        containers.forEach(container => {
            if (container) observer.observe(container);
        });
    } catch (error) {
        logError(`Error setting up image loading for containerId ${containerId}: ${error}`);
    }
};
