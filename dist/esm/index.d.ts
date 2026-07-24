import type { PluginListenerHandle } from '@capacitor/core';
import type { InAppBrowserPlugin, ProxyHandler } from './definitions';
declare const InAppBrowser: InAppBrowserPlugin;
declare const addProxyHandler: (callback: ProxyHandler) => Promise<PluginListenerHandle>;
export * from './definitions';
export { InAppBrowser, addProxyHandler };
