console.log("modal.js loaded");

function loadModalStyle(){
    let style = GM_getResourceText("modalStyle");
    GM_addStyle (style);
}


function insertModalHtml(){
    let modalHtml = GM_getResourceText("modalHtml");
    jQuery("body").append(modalHtml);

    registerModalButtonsCallbacks();

}

function setModalContent(htmlContent){
    jQuery(".quote-comment-modal .modal-body").html(htmlContent);
}


function registerModalButtonsCallbacks(){
    jQuery('body').on("click",".quote-comment-modal .close",function(){
        jQuery(".quote-comment-modal").hide();
    });

    jQuery('body').on("click",".quote-comment-modal #Cancel-button",function(){
        jQuery(".quote-comment-modal").hide();
    });

    jQuery('body').on("click",".quote-comment-modal #Ok-button",function(){
        let postIdJquery = jQuery(".modal-content").find(".post_id");

        let postId = postIdJquery.html().replace('#','');
        let threadId = postIdJquery.attr("href").match(/php\?id=(\d+)/)[1];
        let postLink = postIdJquery.attr("href");
        let username = jQuery(".modal-content").find(".user_name a").html();

        let checkerComment = jQuery(".modal-content #comment-text-area").val();

        MyQuote2(postId,'t'+threadId,username,postLink,checkerComment);

        jQuery(".modal-content #comment-text-area").val('');
        jQuery("#content #post" + postId).hide();        
        jQuery(".quote-comment-modal").hide();
        updateProgressBarValue();
    });
}

function MyQuote2(post, place, user, postLink, checkerComment) {
    let s = postLink + "\n" ;
    username = user;
    postid = post;
    section = GetSection();
    ajax.get(section.link + "?action=get_post&section=" + section.name + "&body=1&post=" + postid, function(response) {
        var params = place != '' ? ","+place+","+postid : '';
        s = s + "\n\n" + "[quote="+username+params+"]" +  html_entity_decode(response) + "[/quote]";
        if (checkerComment != ''){
            s = s + "\n\n" + "Comment: " +checkerComment + "\n\n[hr]"; 
        }else{
            s = s + "\n\n[hr]";
        }
        if ( $('#quickpost').raw().value != '')   s = "\n" + s + "\n";
        Myinsert2( s, 'quickpost');
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

