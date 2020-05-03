"use strict";
// ==UserScript==
// @name         EMP Check Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Curtwagner1984
// @match        https://www.empornium.me/torrents.php?*action=allcomments
// @include      https://www.empornium.me/torrents.php?*action=allcomments
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
// @resource     modalStyle file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\modal\modal-style.css
// @resource     sandboxHtml file://C:\Users\wolverine1984\Documents\tampermonkey\emp comment check\sandbox\sandbox-html.html
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

console.log('main.js loaded...')

var undoArray = [];

function scanCheck(){
    let isScaning = GM_getValue("isScaning");
    if (isScaning === undefined){
        isScaning = false;
    }

    if (isScaning){
        scanPosts();
    }

}

function hidePost(postIdString){
    jQuery("#" + postIdString).hide();
    undoArray.push(postIdString)
    updateProgressBarValue();
}

function undoHidePost(){
    let postIdString = undoArray.pop();
    jQuery("#" + postIdString).show();
    updateProgressBarValue();

}

addMainMenuToDom();
scanCheck();