// ==UserScript==
// @name         Tamper GitHub
// @version      0.3.0
// @description  A userscript to disable GitHub turbolinks and toggle elements to blur out
// @license      MIT
// @author       Griko Nibras
// @namespace    https://github.com/grikomsn
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @updateURL    https://nbr.st/tamper-github.js
// @downloadURL  https://nbr.st/tamper-github.js
// @supportURL   https://github.com/grikomsn/tamper-github/issues
// ==/UserScript==

var css = String.raw;

(() => {
  "use strict";

  document.body.dataset.turbo = "false";

  var el = document.createElement("style");
  el.innerHTML += css`
    tool-tip {
      pointer-events: none !important;
    }
  `;
  document.head.appendChild(el);
})();
