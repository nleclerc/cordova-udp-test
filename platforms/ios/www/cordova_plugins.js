cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.console/www/console-via-logger.js",
        "id": "org.apache.cordova.console.console",
        "clobbers": [
            "console"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.console/www/logger.js",
        "id": "org.apache.cordova.console.logger",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "file": "plugins/org.chromium.socket/socket.js",
        "id": "org.chromium.socket.Socket",
        "clobbers": [
            "chrome.socket"
        ]
    },
    {
        "file": "plugins/org.chromium.common/events.js",
        "id": "org.chromium.common.events",
        "clobbers": [
            "chrome.Event"
        ]
    },
    {
        "file": "plugins/org.chromium.common/errors.js",
        "id": "org.chromium.common.errors"
    },
    {
        "file": "plugins/org.chromium.common/stubs.js",
        "id": "org.chromium.common.stubs"
    },
    {
        "file": "plugins/org.chromium.common/helpers.js",
        "id": "org.chromium.common.helpers"
    },
    {
        "file": "plugins/org.chromium.common/lib/CryptoJS/sha256.js",
        "id": "org.chromium.common.CryptoJS-sha256"
    },
    {
        "file": "plugins/org.chromium.common/lib/CryptoJS/enc-base64-min.js",
        "id": "org.chromium.common.CryptoJS-enc-base64-min"
    }
]
});