// ==UserScript==
// @name         Tamper GitHub
// @version      0.1.2
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

  document.addEventListener("keydown", (event) => {
    if (event.metaKey && event.ctrlKey && event.shiftKey && event.key === "R") {
      toggleRedact();
    }
  });
  if (typeof GM_registerMenuCommand === "function") {
    GM_registerMenuCommand("Toggle Redact", toggleRedact);
  }
  if (GM_getValue("lastState", true)) {
    toggleRedact();
  }

  function toggleRedact() {
    var id = "tamper-github-redact-style";
    var keywords = GM_getValue("keywords", []);
    if (keywords.length < 1) {
      console.error("toggleRedact error: no keywords found");
    }
    var current = document.getElementById(id);
    if (current) {
      current.remove();
      GM_setValue("lastState", false);
      return;
    }
    var el = document.createElement("style");
    el.id = id;
    el.innerHTML += css`
      #js-contribution-activity {
        filter: blur(4px);
      }
    `;
    keywords.forEach((keyword) => {
      el.innerHTML += css`
        .js-for-you-feed-items > *:has([href*="${keyword}"]),
        .orghead:has([href*="${keyword}"]) h1 + *,
        .orghead:has([href*="${keyword}"]) h1,
        .orghead:has([href*="${keyword}"]) img,
        .orghead:has([href*="${keyword}"]) ul,
        .Popover-message div:has([href*="${keyword}"]) ~ .color-fg-muted,
        .Popover-message:has([href*="${keyword}"]) [itemprop="description"],
        [aria-label="Explore"] div:has([href*="${keyword}"]) + p,
        [aria-label="Explore"] span:has([href*="${keyword}"]),
        [href*="${keyword}"] + tool-tip,
        [href*="${keyword}"],
        [href*="${keyword}"]:not([itemprop="programmingLanguage"]),
        [href="/orgs/${keyword}/people"] + .flex-wrap,
        [itemprop="name codeRepository"][href*="${keyword}"]
          ~ [itemprop="description"],
        div:has([href*="${keyword}"]) ~ .pinned-item-desc {
          filter: blur(4px) grayscale(100%);
        }
      `;
    });
    document.head.appendChild(el);
    GM_setValue("lastState", true);
  }
})();
