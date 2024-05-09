import { API_KEY } from '../../env.js'
import { logError } from '../utils/logError.js';

export class APIConfig {
    constructor() {
        this.baseUrl = 'http://api.taboola.com/';
        this.headers = {
        };
        this.params = {
            "app.apikey": API_KEY,
        };
    }

    updateParameter(key, value) {
        if (typeof key === 'string' && key.trim() !== '') {
            this.params[key.trim()] = value;
        } else {
            logError('Invalid key provided for API parameter update');
        }
    }

    updateParameters(newParams) {
        if (typeof newParams === 'object' && newParams !== null) {
            Object.assign(this.params, newParams);
        } else {
            logError('Invalid parameters provided for API update');
        }
    }
}

export class APIRequest {
    constructor(config) {
        this.config = config;
    }

    async fetchData(endpoint) {
        const queryParams = new URLSearchParams(this.config.params).toString();
        const url = `${this.config.baseUrl}${endpoint}?${queryParams}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: this.config.headers
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            logError(`Request failed for ${url}:`, error);
            throw error;
        }
    }
}
