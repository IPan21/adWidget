import { logError } from "./logError.js";

export const applyResponsiveStyles = () => {
    try {
        const breakpoints = window.AdWidgetConfig.responsiveBreakpoints;
        if (!breakpoints || breakpoints.length === 0) {
            throw new Error('No responsive breakpoints configured');
        }
        const screenWidth = window.innerWidth;
        const container = document.getElementById('adw_myWidget-root');
        const activeBreakpoint = breakpoints.find(bp => screenWidth <= bp.maxScreenWidth);

        if (activeBreakpoint) {
            container.style.setProperty('--items-per-row', activeBreakpoint.itemsPerRow.toString());
        } else {
            throw new Error('No appropriate breakpoint found for current screen width');
        }
    } catch (error) {
        logError(`Error applying responsive styles: ${error}`);
    }
};
