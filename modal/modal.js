console.log("modal.js loaded");

function loadModalStyle() {
    let style = GM_getResourceText("modalStyle");
    GM_addStyle(style);
}

function insertModalHtml() {
    if (jQuery("#quoteModal").length == 0) {
        let modalHtml = GM_getResourceText("modalHtml");
        jQuery("body").append(modalHtml);
    }

    registerQuoteModalButtonsCallbacks();
}

function insertSettingsModalHtml() {
    if (jQuery("#settingsModal").length == 0) {
        let modalHtml = GM_getResourceText("modalSettingsHtml");
        jQuery("body").append(modalHtml);
    }
    fillSettingsTextAreas();
    registerSettingsModalButtonsCallback();
}

function saveSettings() {
    if (user_settings === undefined) {
        user_settings = {};
    }
    user_settings.Page_Header = jQuery(".modal-content #page-header-setting-text-area").val();

    user_settings.Report_Header = jQuery(".modal-content #report-header-setting-text-area").val();

    user_settings.Report_Comment = jQuery(".modal-content #comment-quote-setting-text-area").val();

    user_settings.Report_Footer = jQuery(".modal-content #report-footer-setting-text-area").val();

    GM_SuperValue.set("user_settings", user_settings);
}

function fillSettingsTextAreas() {
    jQuery(".modal-content #page-header-setting-text-area").val(
        user_settings === undefined ? default_settings.Page_Header : user_settings.Page_Header
    );
    jQuery(".modal-content #report-header-setting-text-area").val(
        user_settings === undefined ? default_settings.Report_Header : user_settings.Report_Header
    );
    jQuery(".modal-content #comment-quote-setting-text-area").val(
        user_settings === undefined ? default_settings.Report_Comment : user_settings.Report_Comment
    );
    jQuery(".modal-content #report-footer-setting-text-area").val(
        user_settings === undefined ? default_settings.Report_Footer : user_settings.Report_Footer
    );
}

//reset settings to default values
function resetSettingsToDefault() {
    jQuery(".modal-content #page-header-setting-text-area").val(default_settings.Page_Header);
    jQuery(".modal-content #report-header-setting-text-area").val(default_settings.Report_Header);
    jQuery(".modal-content #comment-quote-setting-text-area").val(default_settings.Report_Comment);
    jQuery(".modal-content #report-footer-setting-text-area").val(default_settings.Report_Footer);
    user_settings = undefined;
    GM_deleteValue("user_settings", user_settings);
}

function setModalContent(htmlContent) {
    jQuery(".quote-comment-modal .modal-body").html(htmlContent);
}

function unregisterModalButtonsCallbacks() {
    jQuery("body").off("click", ".quote-comment-modal .close");
    jQuery("body").off("click", ".quote-comment-modal #Cancel-button");
    jQuery("body").off("click", ".quote-comment-modal #Ok-button");
}

function registerSettingsModalButtonsCallback() {
    jQuery("body").on("click", ".quote-comment-modal .close", function () {
        jQuery(".quote-comment-modal").hide();
        unregisterModalButtonsCallbacks();
    });

    jQuery("body").on("click", ".quote-comment-modal #Cancel-button", function () {
        resetSettingsToDefault();
    });

    jQuery("body").on("click", ".quote-comment-modal #Ok-button", function () {
        saveSettings();
    });
}

function registerQuoteModalButtonsCallbacks() {
    jQuery("body").on("click", ".quote-comment-modal .close", function () {
        jQuery(".quote-comment-modal").hide();
        unregisterModalButtonsCallbacks();
    });

    jQuery("body").on("click", ".quote-comment-modal #Cancel-button", function () {
        jQuery(".quote-comment-modal").hide();
        unregisterModalButtonsCallbacks();
    });

    jQuery("body").on("click", ".quote-comment-modal #Ok-button", function () {
        let postIdJquery = jQuery(".modal-content").find(".post_id");

        let postId = postIdJquery.html().replace("#", "");
        let threadId = postIdJquery.attr("href").match(/.*?id=(\d+)/)[1];
        let postLink = postIdJquery.attr("href");
        let username = jQuery(".modal-content").find(".user_name a").html();

        let checkerComment = jQuery(".modal-content #comment-text-area").val();

        generateQuotedText(postId, "t" + threadId, username, postLink, checkerComment);

        jQuery(".modal-content #comment-text-area").val("");
        jQuery("#content #post" + postId).hide();
        jQuery(".quote-comment-modal").hide();
        unregisterModalButtonsCallbacks();
        updateProgressBarValue();
    });
}

function getQuotedMessageFromServer(postId) {
    return new Promise(function (resolve, reject) {
        let section = GetSection();
        let request = jQuery.get(section.link + "?action=get_post&section=" + section.name + "&body=1&post=" + postId);
        request.done(function (response) {
            resolve(response);
        });
        request.fail(function () {
            reject();
        });
    });
}

async function generateQuotedText(postId, place, username, postLink, checkerComment) {
    let quotedTextFromServerEncoded = await getQuotedMessageFromServer(postId).catch((err) => {
        console.error(err);
    });
    let quotedTextFromServerDecoded = html_entity_decode(quotedTextFromServerEncoded);
    let params = place != "" ? `,${place},${postId}` : "";
    let quoteTagStart = `[quote=${username}${params}]`;
    let quoteTagEnd = "[/quote]";

    let quotedTextFinal = `${quoteTagStart}${quotedTextFromServerDecoded}${quoteTagEnd}`;
    let linkPlusQuotedText = `${postLink} \n\n ${quotedTextFinal}`;

    let finalTextToBeInsertedInReport = "";

    if (user_settings === undefined) {
        finalTextToBeInsertedInReport = default_settings.Report_Comment.replace(
            "{%quotedPost%}",
            linkPlusQuotedText
        ).replace("{%reviewerComment%}", checkerComment);
    } else {
        finalTextToBeInsertedInReport = user_settings.Report_Comment.replace(
            "{%quotedPost%}",
            linkPlusQuotedText
        ).replace("{%reviewerComment%}", checkerComment);
    }

    if ($("#quickpost").raw().value != "") finalTextToBeInsertedInReport = "\n" + finalTextToBeInsertedInReport + "\n";
    Myinsert2(finalTextToBeInsertedInReport, "quickpost");
}

function MyQuote2(post, place, user, postLink, checkerComment) {
    let s = postLink + "\n";
    username = user;
    postid = post;
    section = GetSection();
    ajax.get(section.link + "?action=get_post&section=" + section.name + "&body=1&post=" + postid, function (response) {
        var params = place != "" ? "," + place + "," + postid : "";
        s = s + "\n\n" + "[quote=" + username + params + "]" + html_entity_decode(response) + "[/quote]";
        if (checkerComment != "") {
            s = s + "\n\n" + "Comment: " + checkerComment + "\n\n[hr]";
        } else {
            s = s + "\n\n[hr]";
        }
        if ($("#quickpost").raw().value != "") s = "\n" + s + "\n";
        Myinsert2(s, "quickpost");
        // resize('quickpost');
    });
}

function Myinsert2(f, textID) {
    var obj = document.getElementById(textID);

    if (document.selection) {
        var str = document.selection.createRange().text;
        obj.focus();
        var sel = document.selection.createRange();
        sel.text = f;
    } else {
        var len = obj.value.length;
        var start = obj.selectionStart;
        var end = obj.selectionEnd;
        var sel = obj.value.substring(start, end);
        obj.value = obj.value.substring(0, start) + f + obj.value.substring(end, len);
        obj.selectionStart = start + f.length;
        obj.selectionEnd = start + f.length;
    }
    // obj.focus();
}

loadModalStyle();
