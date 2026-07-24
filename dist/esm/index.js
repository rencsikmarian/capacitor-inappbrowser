import { Capacitor, registerPlugin } from '@capacitor/core';
const CAPGO_PLUGIN_NAME = 'CapgoInAppBrowser';
const PREVIOUS_PLUGIN_NAME = 'InAppBrowser';
function resolvePluginName() {
    if (!Capacitor.isNativePlatform()) {
        return CAPGO_PLUGIN_NAME;
    }
    if (Capacitor.isPluginAvailable(CAPGO_PLUGIN_NAME)) {
        return CAPGO_PLUGIN_NAME;
    }
    if (Capacitor.isPluginAvailable(PREVIOUS_PLUGIN_NAME)) {
        return PREVIOUS_PLUGIN_NAME;
    }
    console.warn(`[InAppBrowser] Neither '${CAPGO_PLUGIN_NAME}' nor '${PREVIOUS_PLUGIN_NAME}' native plugin detected. ` +
        'Ensure @capgo/capacitor-inappbrowser native code is installed.');
    return CAPGO_PLUGIN_NAME;
}
const inAppBrowserImplementations = {
    web: () => import('./web').then((m) => new m.InAppBrowserWeb()),
};
const InAppBrowser = registerPlugin(resolvePluginName(), inAppBrowserImplementations);
function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
function headersToRecord(headers) {
    const result = {};
    headers.forEach((value, key) => {
        result[key] = value;
    });
    return result;
}
function errorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
        return error.message;
    }
    return String(error);
}
function isStaleProxyResponseError(error) {
    const message = errorMessage(error);
    return message.includes('No proxy handler found') || message.includes('Target WebView not found for proxy request');
}
function isProxyResponse(value) {
    return (value !== null &&
        typeof value === 'object' &&
        'status' in value &&
        'headers' in value &&
        !(value instanceof Response));
}
function isProxyRequestOverride(value) {
    return value !== null && typeof value === 'object' && 'url' in value && !(value instanceof Response);
}
function isProxyDecision(value) {
    return (value !== null && typeof value === 'object' && ('request' in value || 'response' in value || 'cancel' in value));
}
async function sendProxyDecision(requestId, webviewId, decision, phase) {
    try {
        await InAppBrowser.handleProxyRequest({
            requestId,
            webviewId,
            decision,
            phase,
        });
    }
    catch (error) {
        if (isStaleProxyResponseError(error)) {
            return;
        }
        throw error;
    }
}
const addProxyHandler = (callback) => {
    return InAppBrowser.addListener('proxyRequest', async (event) => {
        let decision = null;
        try {
            const result = await callback(event);
            if (result === null) {
                decision = null;
            }
            else if (isProxyDecision(result)) {
                decision = result;
            }
            else if (isProxyRequestOverride(result)) {
                decision = { request: result };
            }
            else if (isProxyResponse(result)) {
                decision = { response: result };
            }
            else {
                const cloned = result.clone();
                const buffer = await cloned.arrayBuffer();
                decision = {
                    response: {
                        body: arrayBufferToBase64(buffer),
                        status: result.status,
                        headers: headersToRecord(result.headers),
                    },
                };
            }
        }
        catch (_error) {
            decision = null;
        }
        await sendProxyDecision(event.requestId, event.webviewId, decision, event.phase);
    });
};
export * from './definitions';
export { InAppBrowser, addProxyHandler };
//# sourceMappingURL=index.js.map