function deletepage() {
    document.body.innerHTML = '';
    html = '<div style=white-space:nowrap><p class=text-primary id=Action></div><button class="btn button btn-primary"id=Yes>Yes</button> <button class="btn button btn-warning"id=No style="padding:5px 5px">No</button>';
    $("body").html(html);
    var str = "Are you sure you want to reset Tab Saver?";
    $("#Action").text(str);
    var Yes = $("#Yes");
    var No = $("#No");
    No.click(function () {
        window.close();
    });
    Yes.click(function () {
         localStorage.clear();
         window.close();
        });
    }

$(function () {
    $("#Version").text("version: " + chrome.runtime.getManifest().version);
    $("#Helpus").click(function () {
        chrome.tabs.create({ url: "https://github.com/YotamShvartsun/TabSaver" });
    });
    $("#Reset_All").click(function () {
        deletepage();
    });
    $("#Rateus").click(function () {
        chrome.tabs.create({ url: "https://chrome.google.com/webstore/detail/tab-saver/ipmohfoikjagbhanbnknpbkkdaimfbcl/reviews" });
    });
});
