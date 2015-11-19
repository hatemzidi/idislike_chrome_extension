
// run if tab is [fully] loaded
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.runtime.getPlatformInfo(function (info) {
            // send a message to the bus
            // todo try to find a way to get the browser's version
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {platform: info.os});
            });
        });
    }
});


