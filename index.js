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
            window.__messageRecorder__.last.any = e.data;
        });
    });


exports.getLastMessage = (webdriver, type = null, waitingTime = exports.messageRecorderSettings.defaultWaitingTime) =>
    webdriver.executeScript(
        (type, waitingTime) => new Promise(resolve => {
            const popLastMessage = () => {
                const msg = window.__messageRecorder__.last[type || 'any'];
                delete window.__messageRecorder__.last[type || 'any'];
                resolve(msg);
            }
            if (window.__messageRecorder__.last[type || 'any']) {
                popLastMessage();
            } else {
                setTimeout(() => {
                    if (window.__messageRecorder__.last[type || 'any']) {
                        popLastMessage();
                    } else {
                        resolve(null);
                    }
                }, waitingTime);
            }
        }),
        type,
        waitingTime
    );


exports.getAllMessages = (webdriver, type) =>
    webdriver.executeScript(
        type => window.__messageRecorder__.all.filter(msg => !type || (msg.type === type)),
        type
    );
