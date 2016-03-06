var gcm = new Gcm();

chrome.runtime.onStartup.addListener(function() {
    chrome.gcm.onMessage.addListener(gcm.onMessage);
})

function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

function renderMessage(jsonObj) {
    document.getElementById('textOutput').innerHTML += JSON.stringify(jsonObj.data, null, 2) + '\n';
}

function renderText(text) {
    document.getElementById('textOutput').innerHTML += text + '\n';
}

var displayRegisteredWithDetails= function(registrationId) {
    document.getElementById("registerPanel").style.display='none';
    document.getElementById("delete_reg_btn").style.display='block';
    renderText("Successfully registered with  GCM registrationId = " + registrationId);
    renderStatus("Registered already. Ready to receive messages.");
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("register_btn").addEventListener('click', function() {
        var senderId = document.getElementById("senderIdInput").value;
        gcm.regToGCM(senderId)
    });
    document.getElementById("delete_reg_btn").addEventListener('click', gcm.deleteGcmReg);

    chrome.storage.local.get("registered", function(result) {
        var registered = result["registered"];
        if (registered){
            displayRegisteredWithDetails(registered.registrationId);
        }
    });
});