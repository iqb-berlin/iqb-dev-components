exports.recordMessages = (webdriver, type) =>
    webdriver.executeScript(type => {
        window.__messageRecorder__ = [];
        window.addEventListener("message", e => {
            if (!type || (type === e.data.type)) {
                window.__messageRecorder__.push(e.data);
            }
        });
    }, type);

exports.getLastMessage = (webdriver, timeout = 3000) =>
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
