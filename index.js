exports.messageRecorderSettings = {
    defaultTimeout: 150
}

exports.recordMessages = (webdriver, type = null) =>
    webdriver.executeScript(type => {
        window.__messageRecorder__ = [];
        window.addEventListener("message", e => {
            if (!type || (type === e.data.type)) {
                window.__messageRecorder__.push(e.data);
            }
        });
    }, type);

exports.getLastMessage = (webdriver, timeout = exports.messageRecorderSettings.defaultTimeout) =>
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

exports.getAllMessages = webdriver => webdriver.executeScript(() => window.__messageRecorder__);
