"use strict";
// ==UserScript==
// @name         EMP Check Helper
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       Curtwagner1984
// @match        https://www.empornium.me/torrents.php?*action=allcomments
// @include      https://www.empornium.me/torrents.php?*action=allcomments
// @include      https://www.empornium.me/requests.php?*action=allcomments
// @include      https://www.empornium.me/forums.php?*action=allposts*
// @include      https://www.empornium.me/collages.php*?action=allcomments
// @updateURL    https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/Main_UserScript.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_openInTab
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @resource     mainMenuStyle https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/main-menu/main-menu-style.css
// @resource     mainMenuHtml https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/main-menu/main-menu-html.html
// @resource     addedPostButtonsHtml https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/added-post-buttons/added-post-buttons-html.html
// @resource     addedPostButtonsStyle https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/added-post-buttons/added-post-buttons-style.css
// @resource     progressBarHtml https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/progress-bar/progress-bar-html.html
// @resource     progressBarStyle https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/progress-bar/progress-bar-style.css
// @resource     modalHtml https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/modal/modal-html.html
// @resource     modalStyle https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/modal/modal-style.css
// @resource     sandboxHtml https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/sandbox/sandbox-html.html
// @require      https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/sandbox/sandbox.js
// @require      https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/modal/modal.js
// @require      https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/progress-bar/progress-bar.js
// @require      https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/added-post-buttons/added-post-buttons.js
// @require      https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/post-scanner.js
// @require      https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/main-menu/main-menu.js
// @require      https://raw.githubusercontent.com/curtwagner1984/CommentCheckerUserScript/master/main.js
// ==/UserScript==
