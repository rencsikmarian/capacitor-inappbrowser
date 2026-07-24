import { WebPlugin } from '@capacitor/core';
export class InAppBrowserWeb extends WebPlugin {
    clearAllCookies() {
        console.log('clearAllCookies');
        return Promise.resolve();
    }
    clearCache() {
        console.log('clearCache');
        return Promise.resolve();
    }
    clearAllBrowsingData() {
        console.log('clearAllBrowsingData');
        return Promise.resolve();
    }
    async open(options) {
        console.log('open', options);
        return options;
    }
    async clearCookies(options) {
        console.log('cleanCookies', options);
        return;
    }
    async getCookies(options) {
        // Web implementation to get cookies
        return options;
    }
    async openWebView(options) {
        console.log('openWebView', options);
        return options;
    }
    async executeScript({ code }) {
        console.log('code', code);
        return code;
    }
    async close(options) {
        console.log('close', options);
        return;
    }
    async hide(options) {
        console.log('hide', options);
        return;
    }
    async show(options) {
        console.log('show', options);
        return;
    }
    async sendToBack(options) {
        console.log('sendToBack not supported on web', options);
        return;
    }
    async bringToFront(options) {
        console.log('bringToFront not supported on web', options);
        return;
    }
    async dispatchInputEvent(options) {
        console.log('dispatchInputEvent not supported on web', options);
        return;
    }
    async setUrl(options) {
        console.log('setUrl', options.url);
        return;
    }
    async reload(options) {
        console.log('reload', options);
        return;
    }
    async postMessage(options) {
        console.log('postMessage', options);
        return options;
    }
    async takeScreenshot(options) {
        console.log('takeScreenshot not supported on web', options);
        throw this.unimplemented('Screenshots are not supported on web.');
    }
    async goBack() {
        console.log('goBack');
        return;
    }
    async getPluginVersion() {
        return { version: 'web' };
    }
    async updateDimensions(options) {
        console.log('updateDimensions', options);
        // Web platform doesn't support dimension control
        return;
    }
    async handleProxyRequest(options) {
        console.log('handleProxyRequest not supported on web', options);
        return;
    }
    async setEnabledSafeTopMargin(options) {
        console.log('setEnabledSafeTopMargin not supported on web', options);
        return;
    }
    async setEnabledSafeBottomMargin(options) {
        console.log('setEnabledSafeBottomMargin not supported on web', options);
        return;
    }
    async openSecureWindow(options) {
        const w = 600;
        const h = 550;
        const settings = [
            ['width', w],
            ['height', h],
            ['left', screen.width / 2 - w / 2],
            ['top', screen.height / 2 - h / 2],
        ]
            .map((x) => x.join('='))
            .join(',');
        const popup = window.open(options.authEndpoint, 'Authorization', settings);
        if (!popup) {
            throw new Error('Failed to open secure window');
        }
        if (typeof popup.focus === 'function') {
            popup.focus();
        }
        return new Promise((resolve, reject) => {
            const bc = new BroadcastChannel(options.broadcastChannelName || 'oauth-channel');
            bc.addEventListener('message', (event) => {
                if (event.data.startsWith(options.redirectUri)) {
                    bc.close();
                    resolve({ redirectedUri: event.data });
                }
                else {
                    bc.close();
                    reject(new Error('Redirect URI does not match, expected ' + options.redirectUri + ' but got ' + event.data));
                }
            });
            setTimeout(() => {
                bc.close();
                reject(new Error('The sign-in flow timed out'));
            }, 5 * 60000);
        });
    }
}
//# sourceMappingURL=web.js.map