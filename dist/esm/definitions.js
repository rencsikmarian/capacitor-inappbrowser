export var BackgroundColor;
(function (BackgroundColor) {
    BackgroundColor["WHITE"] = "white";
    BackgroundColor["BLACK"] = "black";
})(BackgroundColor || (BackgroundColor = {}));
export var ToolBarType;
(function (ToolBarType) {
    /**
     * Shows a simple toolbar with just a close button and share button
     * @since 0.1.0
     */
    ToolBarType["ACTIVITY"] = "activity";
    /**
     * Shows a simple toolbar with just a close button
     * @since 7.6.8
     */
    ToolBarType["COMPACT"] = "compact";
    /**
     * Shows a full navigation toolbar with back/forward buttons
     * @since 0.1.0
     */
    ToolBarType["NAVIGATION"] = "navigation";
    /**
     * Shows no toolbar
     * @since 0.1.0
     */
    ToolBarType["BLANK"] = "blank";
})(ToolBarType || (ToolBarType = {}));
export var InvisibilityMode;
(function (InvisibilityMode) {
    /**
     * WebView is aware it is hidden (dimensions may be zero).
     */
    InvisibilityMode["AWARE"] = "AWARE";
    /**
     * WebView is hidden but reports fullscreen dimensions (uses alpha=0 to remain invisible).
     */
    InvisibilityMode["FAKE_VISIBLE"] = "FAKE_VISIBLE";
})(InvisibilityMode || (InvisibilityMode = {}));
export var CloseAction;
(function (CloseAction) {
    /**
     * The toolbar close button closes and destroys the webview.
     */
    CloseAction["CLOSE"] = "close";
    /**
     * The toolbar close button hides the webview so it can be shown again.
     */
    CloseAction["HIDE"] = "hide";
})(CloseAction || (CloseAction = {}));
//# sourceMappingURL=definitions.js.map