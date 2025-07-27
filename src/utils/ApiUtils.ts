

// utils/triggerApiCall.ts
import { APIRequestContext } from '@playwright/test';
import { stat } from 'fs';

export async function triggerApiCall(
    apiContext: APIRequestContext,
    method: 'GET' | 'POST' | 'DELETE',
    endpoint: string,
    payload?: Record<string, any>
) {
    let response;

    switch (method) {
        case 'GET':
            response = await apiContext.get(endpoint);
            break;
        case 'POST':
            response = await apiContext.post(endpoint, {
                data: payload || {},
            });
            break;
        case 'DELETE':
            response = await apiContext.delete(endpoint, {
                data: payload || {},
            });
            break;
        default:
            throw new Error(`Unsupported method: ${method}`);
    }

    const body = await response.json(); // Use .json() if expecting JSON
    const status = await response.status();
    return {"responseBody": body , "responseStatus" : status};
    //return body;
}

