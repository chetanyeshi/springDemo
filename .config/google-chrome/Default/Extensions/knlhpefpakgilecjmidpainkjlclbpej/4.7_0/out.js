window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    if (event.data.indexOf("skypetoken") > -1) {
        var t = event.data;
        var skype_token = t.toString().substring(t.toString().lastIndexOf('skypetoken":"') + 13, t.toString().indexOf('","expires_in"'));
        var skypeid = t.toString().substring(t.toString().lastIndexOf('skypeid":"') + 10, t.toString().indexOf('","state"'));
        console.log(skype_token, skypeid);
        chrome.storage.sync.set({"skype_token":skype_token ,"skypeid" : skypeid}, function () {
        });
    }
}
