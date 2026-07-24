import { WebPlugin } from '@capacitor/core';
import type { InAppBrowserPlugin, OpenWebViewOptions, OpenOptions, GetCookieOptions, ClearCookieOptions, BringToFrontOptions, DimensionOptions, DispatchInputEventOptions, OpenSecureWindowOptions, OpenSecureWindowResponse, ScreenshotResult } from './definitions';
export declare class InAppBrowserWeb extends WebPlugin implements InAppBrowserPlugin {
    clearAllCookies(): Promise<any>;
    clearCache(): Promise<any>;
    clearAllBrowsingData(): Promise<any>;
    open(options: OpenOptions): Promise<any>;
    clearCookies(options: ClearCookieOptions): Promise<any>;
    getCookies(options: GetCookieOptions): Promise<any>;
    openWebView(options: OpenWebViewOptions): Promise<any>;
    executeScript({ code }: {
        code: string;
    }): Promise<any>;
    close(options?: {
        id?: string;
    }): Promise<any>;
    hide(options?: {
        id?: string;
    }): Promise<void>;
    show(options?: {
        id?: string;
    }): Promise<void>;
    sendToBack(options?: {
        id?: string;
        transparentBackground?: boolean;
    }): Promise<void>;
    bringToFront(options?: BringToFrontOptions): Promise<void>;
    dispatchInputEvent(options: DispatchInputEventOptions): Promise<void>;
    setUrl(options: {
        url: string;
    }): Promise<any>;
    reload(options?: {
        id?: string;
    }): Promise<any>;
    postMessage(options: Record<string, any>): Promise<any>;
    takeScreenshot(options?: {
        id?: string;
    }): Promise<ScreenshotResult>;
    goBack(): Promise<any>;
    getPluginVersion(): Promise<{
        version: string;
    }>;
    updateDimensions(options: DimensionOptions): Promise<void>;
    handleProxyRequest(options: Parameters<InAppBrowserPlugin['handleProxyRequest']>[0]): Promise<void>;
    setEnabledSafeTopMargin(options: {
        enabled: boolean;
        id?: string;
    }): Promise<void>;
    setEnabledSafeBottomMargin(options: {
        enabled: boolean;
        id?: string;
    }): Promise<void>;
    openSecureWindow(options: OpenSecureWindowOptions): Promise<OpenSecureWindowResponse>;
}
