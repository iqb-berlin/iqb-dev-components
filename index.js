exports.messageRecorderSettings = {
    defaultWaitingTime: 150
}

exports.recordMessages = webdriver =>
    webdriver.executeScript(() => {
        window.__messageRecorder__ = {
            'all': [],
            'last': {}
        };
        window.addEventListener("message", e => {
            window.__messageRecorder__.all.push(e.data);
            window.__messageRecorder__.last[e.data.type || 'unknown'] = e.data;
            window.__messageRecorder__.last.all = e.data;
        });
    });


exports.getLastMessage = (webdriver, type = null, wait = exports.messageRecorderSettings.defaultWaitingTime) =>
    webdriver.executeScript((type, wait) => new Promise(resolve => {
        const popLastMessage = () => {
            const msg = window.__messageRecorder__.last[type || 'all'];
            delete window.__messageRecorder__.last[type || 'all'];
            resolve(msg);
        }
        if (window.__messageRecorder__.last[type || 'all']) {
            popLastMessage();
        } else {
            setTimeout(() => {
                if (window.__messageRecorder__.last[type || 'all']) {
                    popLastMessage();
                } else {
                    resolve(null);
                }
            }, wait);
        }
    }), type, wait);


exports.getAllMessages = (webdriver, type) =>
    webdriver.executeScript(
        type => window.__messageRecorder__.all.filter(msg => !type || (msg.type === type))
        , type
    );
