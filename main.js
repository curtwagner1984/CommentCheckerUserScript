"use strict";
// ==UserScript==
// @name         EMP Check Helper (local)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Curtwagner1984
// @match        https://www.empornium.me/torrents.php?*action=allcomments
// @include      https://www.empornium.me/torrents.php?*action=allcomments
// @include      https://www.empornium.me/torrents.php?*action=allcomments
// @include      https://www.empornium.me/requests.php?*action=allcomments
// @include      https://www.empornium.me/forums.php?*action=allposts*
// @include      https://www.empornium.me/collages.php*?action=allcomments
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_openInTab
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @resource     mainMenuStyle file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\main-menu\main-menu-style.css
// @resource     mainMenuHtml file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\main-menu\main-menu-html.html
// @resource     addedPostButtonsHtml file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\added-post-buttons\added-post-buttons-html.html
// @resource     addedPostButtonsStyle file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\added-post-buttons\added-post-buttons-style.css
// @resource     progressBarHtml file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\progress-bar\progress-bar-html.html
// @resource     progressBarStyle file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\progress-bar\progress-bar-style.css
// @resource     modalHtml file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\modal\modal-html.html
// @resource     modalSettingsHtml file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\modal\modal-settings-html.html
// @resource     modalStyle file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\modal\modal-style.css
// @resource     sandboxHtml file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\sandbox\sandbox-html.html
// @require      https://userscripts-mirror.org/scripts/source/107941.user.js
// @require      file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\sandbox\sandbox.js
// @require      file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\modal\modal.js
// @require      file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\progress-bar\progress-bar.js
// @require      file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\added-post-buttons\added-post-buttons.js
// @require      file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\post-scanner.js
// @require      file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\main-menu\main-menu.js
// @require      file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\main.js
// ==/UserScript==

// GM_deleteValue("isHidingSignature");
// GM_deleteValue("isHidingAvatars");

console.log("main.js loaded...");

let default_settings = {
    Page_Header: "Checking Posts #{%olderPostId%} - #{%newestPostId%} ({%totalPosts%} posts)",
    Report_Header: "Checked Posts {%olderPostId%} - {%newestPostId%} ({%totalPosts%} posts) :tick: \n \n",
    Report_Comment: "Comment:{%reviewerComment%}\n \n{%quotedPost%}\n \n[hr]",
    Report_Footer: ""
};

let user_settings = GM_SuperValue.get("user_settings");

// let settings = GM_SuperValue.get("settings");

// GM_SuperValue.delete("settings");

// GM_SuperValue.set("settings", settings);

// console.log(settings);

var undoArray = [];

// GM_deleteValue("isScaning");

function scanCheck() {
    let isScaning = GM_getValue("isScaning");
    if (isScaning === undefined) {
        isScaning = false;
    }

    if (isScaning) {
        scanPosts();
    }
}

function hidePost(postIdString) {
    jQuery("#" + postIdString).hide();
    undoArray.push(postIdString);
    updateProgressBarValue();
}

function undoHidePost() {
    let postIdString = undoArray.pop();
    jQuery("#" + postIdString).show();
    updateProgressBarValue();
}

addMainMenuToDom();
scanCheck();
