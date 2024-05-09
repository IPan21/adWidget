# Ad Widget Project

This project provides a configurable widget for displaying advertisements on web pages. The layout and appearance of the widget are designed to be configurable. Currently, the widget ad item contains an image, title, and brand name.

## Features

- **Configurable Image Ratio**: Set the aspect ratio of images to best fit the space or design of your webpage.
- **Flexible Layout**: Choose between a horizontal or vertical arrangement for ad elements within each ad item.
- **Configurable Number Of Items In One Row**: Set the number of ad items in one row and the number of requested ad items from the API (currently, the API is ignoring the count value, for this demo a temporary workaround is applied to adjust the number of items for demo).

### Usage

index.html contains widget only, while article.html contains a sample article with widget implemented below it

Widget dimensions can be changed in `js/config/widgetConfig.js`.
- **Example Configuration**:
    ```javascript
    const widgetConfig = {
        lazyLoadEnabled: true,
        useCustomCSS: true,
        customCSS: `/* Custom CSS styles */`,
        customUiConfigs: {
            gapBetweenAdItems: 40,
        },
        widgetMode: 'horizontal',
        imageAspectRatio: {
            width: 4,
            height: 3
        },
        horizontalModeConfig: {
            imageWidthPercentage: 30,
            fontSize: '16px'
        },
        requestedItemsNumber: 12,
        responsiveBreakpoints: [
            { maxScreenWidth: 600, itemsPerRow: 1 },
            { maxScreenWidth: 900, itemsPerRow: 3 },
            { maxScreenWidth: 1200, itemsPerRow: 6 },
            { maxScreenWidth: 5000, itemsPerRow: 6 }
        ]
    };
    ```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You need to have US VPN enabled in the browse (API has geo restriction)

You need to have the following installed:
- git
- Node.js
- npm

### Installing

Follow these steps to get your development environment running:

1. **Clone the repo**:
    ```bash
    git clone https://github.com/IPan21/adWidget.git
    cd adWidget
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the project (if applicable)**:
    ```bash
    npm start
    ```


