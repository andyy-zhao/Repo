document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById('btn');
    chrome.storage.sync.get(["state"]).then((result) => {
        let isActive = result.state;
        if (isActive === "active") { 
            btn.innerHTML = "Disable"; 
        } else {
            btn.innerHTML = "Enable";
        }
    });
    popup();
});

function popup() {
    var disableButton = document.getElementById('btn');
    var githubButton = document.getElementById('github');
    disableButton.addEventListener('click', function() {
        if(disableButton.innerHTML === "Disable") { 
            disableButton.innerHTML = "Enable";
            chrome.storage.sync.set({ state: "inactive" }).then(() => { 
                console.log(`inactive state stored`);
            });
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, { "action": 'disable' });
            });
        } else { 
            disableButton.innerHTML = "Disable"; 
            chrome.storage.sync.set({ state: "active" }).then(() => {
                console.log(`active state stored`);
            });
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, { "action": 'enable' });
            });
        }
    });
    githubButton.addEventListener('click', function() {
        const url = 'https://github.com/andyy-zhao/Youtube-Ad-Skip-Chrome-Extension';
        window.open(url, '_blank').focus();
    });
}