// // this file allows extension to perform tasks and interact with browser in the background

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.get(["state"]).then((result) => {
        let isActive = result.state; 
        if (isActive === "active") { 
            if (changeInfo.status === 'complete') {
                let url = tab.url;
                if (url.startsWith("https://www.youtube.com/watch")) {
                    chrome.tabs.query({ active: true, currentWindow: true }, () => {
                        chrome.tabs.sendMessage(tabId, { action: "enable" });
                      });
                }
            }
        }
    });
    
});