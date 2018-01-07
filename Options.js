$(function () {
    $("#Version").text("version: " + chrome.runtime.getManifest().version);
    $("#Helpus").click(function () {
        chrome.tabs.create({ url: "https://github.com/YotamShvartsun/TabSaver" });
    });
    $("#Reset_All").click(function () {
        localStorage["TabSaver!!_Action"] = JSON.stringify("Reset Tab Saver?");
        location.href = "delete.html";
    });
    $("#Rateus").click(function () {
        chrome.tabs.create({ url: "https://chrome.google.com/webstore/detail/tab-saver/ipmohfoikjagbhanbnknpbkkdaimfbcl/reviews" });
    });
});
