// ==UserScript==
// @name         X Embed Fixer for Discord
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replace `twitter` and `x` to `vxtwitter` when sharing links
// @author       Xhera
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://tweetdeck.twitter.com/*
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
    const originalExecCommand = document.execCommand;
    const hijackedExecCommand = (...attrs) => {
        if (attrs[0] == 'copy') {
            const selected = window.getSelection().toString();
            if (selected.match(/^https+:\/\/((.+)\.)?x\.com\/(.+)\/status\/(\d+)(\?.+)?$/)) {
                const newUrl = selected.replace(/^https+:\/\/((.+)\.)?x\.com\/(.+)\/status\/(\d+)(\?.+)?$/, 'https://vxtwitter.com/$3/status/$4');
                copyTextToClipboard(newUrl);
                return;
            }
        }
        callExecCommand(...attrs);
    };
    const callExecCommand = (...attrs) => {
        document.execCommand = originalExecCommand;
        document.execCommand(...attrs);
        document.execCommand = hijackedExecCommand;
    };
    const copyTextToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };
    document.execCommand = hijackedExecCommand;
})();
