import { renderSponsoredItem } from "./renderSponsored.js";
import { renderOrganicItem } from "./renderOrganic.js";
import { logError } from "../utils/logError.js";

// Calls the function to render ad item by type (structured for adding new ad types like native, video etc.)
export const renderAdItemByType = (ad) => {
    switch(ad.origin){
        case 'sponsored': return renderSponsoredItem(ad);
        case 'organic': return renderOrganicItem(ad);
        default: 
            logError(`Ad type '${ad.origin}' is not supported at the moment`);
            return '';
    }
};