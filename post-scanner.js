function removePostsOnPage(){
    jQuery("div[id^=post]").remove();    
}

function clearSavedValues(){
    GM_deleteValue("mostRecentComment");
    GM_deleteValue("oldestComment");
    GM_deleteValue("storedPostsHtml");
}


function scanPosts(){
    let mostRecentComment = GM_getValue("mostRecentComment");
    let oldestComment = GM_getValue("oldestComment");
    let storedPostsHtml = GM_getValue("storedPostsHtml");

    if ((mostRecentComment === undefined) || (oldestComment === undefined)){
        console.log("Both mostRecentComment and oldestComment should have been stored at this point... Something is wrong...Exiting fuction");
        return;
    }

    if (storedPostsHtml === undefined){
        storedPostsHtml = "";
    }

    let ans = iterateThroughPosts(mostRecentComment,oldestComment,storedPostsHtml);
    
    GM_setValue("storedPostsHtml",ans.storedHtml);

    removePostsOnPage();

    if (ans.isFinished){
        console.log("Finished scanning posts...");
        jQuery(".linkbox").remove();
        insertProgressBarHtml();
        jQuery(".thin").append(ans.storedHtml);
        insertModalHtml();
        GM_setValue("isScaning",false);        
        addButtonsToPosts();
        addSandbox();
        updateProgressBarValue();
        window.scrollTo(0, 0);
        clearSavedValues();
        let numberOfComments = mostRecentComment - oldestComment;
        let commentString = "" + oldestComment + " - " + mostRecentComment + " (" + numberOfComments + " comments)";
        jQuery("#content .thin h2").html("Checking comments: " + commentString);
        jQuery("#quickpost").val("Checked comments "+ commentString +" :tick: \n\n")


    }else{
        setTimeout(
            function() 
            {
                window.location.href = jQuery(".pager_next")[0].href;
            }, 1000);                
    }

    
}


function iterateThroughPosts(mostRecentComment,oldestComment,storedPostsHtml){    
    let finished = false;
    jQuery("div[id^=post]").each(function () {
        let postId = parseInt(jQuery(this).find(".smallhead").find(".post_id").text().replace("#",""));
        if (postId < oldestComment){
            finished = true;
            return false;            
        }else if (postId > mostRecentComment){
            return true;
        }else{
            storedPostsHtml = storedPostsHtml + "\n" +  jQuery(this)[0].outerHTML;
        }        
    })
    
    return {isFinished : finished, storedHtml : storedPostsHtml};

}
