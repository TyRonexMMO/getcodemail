
import type { ApiRequest, ApiResponse } from '../types';

const API_URL = 'https://tools.dongvanfb.net/api/get_code_oauth2';

export const getCode = async (requestData: ApiRequest): Promise<ApiResponse> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            // Try to get error message from body, otherwise use status text
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                 const errorBody = await response.json();
                 errorMessage = errorBody.message || JSON.stringify(errorBody);
            } catch (e) {
                // Ignore if body isn't json
            }
            throw new Error(errorMessage);
        }

        return await response.json() as ApiResponse;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Network request failed: ${error.message}`);
        }
        throw new Error('An unknown error occurred during the API request.');
    }
};
