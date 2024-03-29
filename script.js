// ==UserScript==
// @name         Tamper GitHub
// @version      0.0.3
// @description  A userscript to disable GitHub turbolinks and hide unnecessary elements
// @license      MIT
// @author       Griko Nibras
// @namespace    https://github.com/grikomsn
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @run-at       document-end
// @grant        none
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @updateURL    https://nbr.st/tamper-github.js
// @downloadURL  https://nbr.st/tamper-github.js
// @supportURL   https://github.com/grikomsn/tamper-github/issues
// ==/UserScript==

(() => {
  "use strict";
  document.body.dataset.turbo = "false";
  let el = document.createElement("style"),
    css = String.raw;
  el.innerHTML = css`
    .js-repos-container,
    #dashboard-user-teams,
    li:has([data-src="/_side-panel-items/global/repositories"]),
    li:has([data-src="/_side-panel-items/global/repositories"])
      ~ .ActionList-sectionDivider,
    li:has([data-src="/_side-panel-items/global/repositories"])
      + .ActionList-sectionDivider,
    li:has([href^="/orgs/"]),
    li:has([href^="/orgs/"]) ~ .ActionList-sectionDivider,
    li:has([href^="/orgs/"]) + .ActionList-sectionDivider {
      display: none;
    }
    tool-tip {
      pointer-events: none !important;
    }
  `;
  document.head.appendChild(el);
})();
