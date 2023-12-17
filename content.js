// allow for injecting and modifying content of web pages
// It allows your extension to interact with the web page’s HTML, CSS, and JavaScript code

let intervalId;
let checkTimes = 0;
let btnInterval;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'enable') {
        intervalId = setInterval(checkForAd, 500);
    } else if (request.action === 'disable') {
        document.documentElement.style.filter = 'none';
        reset();
    }
});

function checkForAd() {
    if (++checkTimes === 4) { // 2 second buffer period
        clearInterval(intervalId);
        checkTimes = 0;
    }
    if (document.querySelector("div.ad-showing")) {
        speedUp();
        clearInterval(intervalId);
        btnInterval = setInterval(checkSkipAd, 100);
    }
}

function checkSkipAd() {
    let skip_button_list = document.getElementsByClassName('ytp-ad-skip-button-modern ytp-button')
    if (skip_button_list.length > 0) {
        const skip_button = skip_button_list[0];
        skip_button.click();
        clearInterval(btnInterval);
    }
}

function speedUp() {
    document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = 16.0;
}

function reset() {
    document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = 1.0;
}