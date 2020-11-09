exports.recordMessages = (webdriver) =>
    webdriver.executeScript(() => {
        window['__messageRecorder__'] = [];
        window.addEventListener("message", e => window['__messageRecorder__'].push(e.data));
    });

exports.getLastMessage = (webdriver, timeout = 150) =>
    webdriver.executeScript(timeout => new Promise(resolve => {
        if (window.__messageRecorder__.length) {
            resolve(window.__messageRecorder__[window.__messageRecorder__.length - 1]);
        } else {
            setTimeout(() => {
                if (window.__messageRecorder__.length) {
                    resolve(window.__messageRecorder__[window.__messageRecorder__.length - 1]);
                } else {
                    resolve(null);
                }
            }, timeout);
        }
    }), timeout);
