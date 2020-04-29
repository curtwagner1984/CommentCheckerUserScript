console.log("progress-bar.js loaded!");

function loadProgressBarStyle(){
    let style = GM_getResourceText("progressBarStyle");
    GM_addStyle (style);
}


function insertProgressBarHtml(){
    let progressBarHtml = GM_getResourceText("progressBarHtml");
    jQuery("#content").prepend(progressBarHtml);
}


function updateProgressBarValue(){
    let totalValue = jQuery("div[id^=post]").length;
    let currentValue = jQuery("div[id^=post]").filter(":hidden").length;
    let value = ((currentValue / totalValue) * 100) + "%";
    jQuery("#progress-bar").css("width",value)
    jQuery("#progress-bar-lable").html(currentValue + " Out Of " + totalValue);

}


loadProgressBarStyle();