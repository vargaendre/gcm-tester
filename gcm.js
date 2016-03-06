function Gcm() {
}

Gcm.prototype.regToGCM = function(senderId) {
    chrome.gcm.register([senderId], this.registerCallback);
};

Gcm.prototype.deleteGcmReg = function() {
    chrome.storage.local.set({registered: null});
    renderText("Client registration removed. You can now register again with different iccid.");
    renderStatus('Ready to register.');
    document.getElementById("registerPanel").style.display='block';
    document.getElementById("delete_reg_btn").style.display='none';
};

Gcm.prototype.onMessage = function(message) {
    // A message is an object with a data property that
    // consists of key-value pairs.
    renderMessage(message);
    console.log(message);
}

Gcm.prototype.registerCallback = function(registrationId) {
    if (chrome.runtime.lastError) {
        // When the registration fails, handle the error and retry the
        // registration later.
        console.log(chrome.runtime.lastError);
        return;
    }

    displayRegisteredWithDetails(registrationId);

    chrome.storage.local.set({
        registered: {
            "registrationId": registrationId
        }
    });
}




