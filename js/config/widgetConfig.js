// HORIZONTAL widget config 

export const AdWidgetConfig = {
    lazyLoadEnabled: true,
    customUiConfigs: {
        gapBetweenAdItems: 40,
    },
    widgetMode: 'horizontal', // possible values - "vertical" or "horizontal"
    imageAspectRatio: {
        width: 4,
        height: 3
      },
    horizontalModeConfig: {
        ImageWidthPercentage: 60,
        fontSize: '16px',
        gapBetweenElements: '10px'
    },
    requestedItemsNumber: 12,
    responsiveBreakpoints: [
        { maxScreenWidth: 600, itemsPerRow: 1 },
        { maxScreenWidth: 900, itemsPerRow: 2 },
        { maxScreenWidth: 1200, itemsPerRow: 3 },
        { maxScreenWidth: 5000, itemsPerRow: 6 }
    ]
};


// VERTICAL widget config

// export const AdWidgetConfig = {
//     lazyLoadEnabled: true,
//     customUiConfigs: {
//         gapBetweenAdItems: 40,
//     },
//     widgetMode: 'vertical', // possible values - "vertical" or "horizontal"
//     imageAspectRatio: {
//         width: 16,
//         height: 9
//       },
//     horizontalModeConfig: {
//         ImageWidthPercentage: 60,
//         fontSize: '16px',
//         gapBetweenElements: '10px'
//     },
//     requestedItemsNumber: 12,
//     responsiveBreakpoints: [
//         { maxScreenWidth: 600, itemsPerRow: 1 },
//         { maxScreenWidth: 900, itemsPerRow: 3 },
//         { maxScreenWidth: 1200, itemsPerRow: 3 },
//         { maxScreenWidth: 5000, itemsPerRow: 6 }
//     ]
// };