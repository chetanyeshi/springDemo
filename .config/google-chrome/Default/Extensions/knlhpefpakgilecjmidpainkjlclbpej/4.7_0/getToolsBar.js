!function(e, t, n){"undefined" != typeof module && module.exports?module.exports = n():"function" == typeof define && define.amd?define(n):t[e] = n()}("Fingerprint", this, function(){"use strict"; var e = function(e){var t, n; t = Array.prototype.forEach, n = Array.prototype.map, this.each = function(e, n, r){if (null !== e)if (t && e.forEach === t)e.forEach(n, r); else if (e.length === + e.length){for (var i = 0, a = e.length; a > i; i++)if (n.call(r, e[i], i, e) === {})return} else for (var o in e)if (e.hasOwnProperty(o) && n.call(r, e[o], o, e) === {})return}, this.map = function(e, t, r){var i = []; return null == e?i:n && e.map === n?e.map(t, r):(this.each(e, function(e, n, a){i[i.length] = t.call(r, e, n, a)}), i)}, "object" == typeof e?(this.hasher = e.hasher, this.screen_resolution = e.screen_resolution, this.screen_orientation = e.screen_orientation, this.canvas = e.canvas, this.ie_activex = e.ie_activex):"function" == typeof e && (this.hasher = e)}; return e.prototype = {get:function(){var e = []; if (e.push(navigator.userAgent), e.push(navigator.language), e.push(screen.colorDepth), this.screen_resolution){var t = this.getScreenResolution(); "undefined" != typeof t && e.push(t.join("x"))}return e.push((new Date).getTimezoneOffset()), e.push(this.hasSessionStorage()), e.push(this.hasLocalStorage()), e.push(!!window.indexedDB), document.body?e.push(typeof document.body.addBehavior):e.push("undefined"), e.push(typeof window.openDatabase), e.push(navigator.cpuClass), e.push(navigator.platform), e.push(navigator.doNotTrack), e.push(this.getPluginsString()), this.canvas && this.isCanvasSupported() && e.push(this.getCanvasFingerprint()), this.hasher?this.hasher(e.join("###"), 31):this.murmurhash3_32_gc(e.join("###"), 31)}, murmurhash3_32_gc:function(e, t){var n, r, i, a, o, s, h, c; for (n = 3 & e.length, r = e.length - n, i = t, o = 3432918353, s = 461845907, c = 0; r > c; )h = 255 & e.charCodeAt(c) | (255 & e.charCodeAt(++c)) << 8 | (255 & e.charCodeAt(++c)) << 16 | (255 & e.charCodeAt(++c)) << 24, ++c, h = (65535 & h) * o + (((h >>> 16) * o & 65535) << 16) & 4294967295, h = h << 15 | h >>> 17, h = (65535 & h) * s + (((h >>> 16) * s & 65535) << 16) & 4294967295, i ^= h, i = i << 13 | i >>> 19, a = 5 * (65535 & i) + ((5 * (i >>> 16) & 65535) << 16) & 4294967295, i = (65535 & a) + 27492 + (((a >>> 16) + 58964 & 65535) << 16); switch (h = 0, n){case 3:h ^= (255 & e.charCodeAt(c + 2)) << 16; case 2:h ^= (255 & e.charCodeAt(c + 1)) << 8; case 1:h ^= 255 & e.charCodeAt(c), h = (65535 & h) * o + (((h >>> 16) * o & 65535) << 16) & 4294967295, h = h << 15 | h >>> 17, h = (65535 & h) * s + (((h >>> 16) * s & 65535) << 16) & 4294967295, i ^= h}return i ^= e.length, i ^= i >>> 16, i = 2246822507 * (65535 & i) + ((2246822507 * (i >>> 16) & 65535) << 16) & 4294967295, i ^= i >>> 13, i = 3266489909 * (65535 & i) + ((3266489909 * (i >>> 16) & 65535) << 16) & 4294967295, i ^= i >>> 16, i >>> 0}, hasLocalStorage:function(){try{return!!window.localStorage} catch (e){return!0}}, hasSessionStorage:function(){try{return!!window.sessionStorage} catch (e){return!0}}, isCanvasSupported:function(){var e = document.createElement("canvas"); return!(!e.getContext || !e.getContext("2d"))}, isIE:function(){return"Microsoft Internet Explorer" === navigator.appName?!0:"Netscape" === navigator.appName && /Trident/.test(navigator.userAgent)?!0:!1}, getPluginsString:function(){return this.isIE() && this.ie_activex?this.getIEPluginsString():this.getRegularPluginsString()}, getRegularPluginsString:function(){return this.map(navigator.plugins, function(e){var t = this.map(e, function(e){return[e.type, e.suffixes].join("~")}).join(","); return[e.name, e.description, t].join("::")}, this).join(";")}, getIEPluginsString:function(){if (window.ActiveXObject){var e = ["ShockwaveFlash.ShockwaveFlash", "AcroPDF.PDF", "PDF.PdfCtrl", "QuickTime.QuickTime", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "RealPlayer", "SWCtl.SWCtl", "WMPlayer.OCX", "AgControl.AgControl", "Skype.Detection"]; return this.map(e, function(e){try{return new ActiveXObject(e), e} catch (t){return null}}).join(";")}return""}, getScreenResolution:function(){var e; return e = this.screen_orientation?screen.height > screen.width?[screen.height, screen.width]:[screen.width, screen.height]:[screen.height, screen.width]}, getCanvasFingerprint:function(){var e = document.createElement("canvas"), t = e.getContext("2d"), n = "http://valve.github.io"; return t.textBaseline = "top", t.font = "14px 'Arial'", t.textBaseline = "alphabetic", t.fillStyle = "#f60", t.fillRect(125, 1, 62, 20), t.fillStyle = "#069", t.fillText(n, 2, 15), t.fillStyle = "rgba(102, 204, 0, 0.7)", t.fillText(n, 4, 17), e.toDataURL()}}, e});
var DP_fingerprint = new Fingerprint().get();
//document.addEventListener('DOMContentLoaded', function() {
chrome.browserAction.onClicked.addListener(function(tab) {

	//chrome.tabs.getSelected(null, function(tab) {
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) { 
				if(xhr.responseText=="logout"){ 
					/*var div = document.createElement('div');
					var innerdiv = document.createElement('span');
					var iframe = document.createElement('iframe');
					iframe.height = "575px";
					iframe.width = "350px";
					iframe.frameBorder = "0";
					document.body.appendChild(div);
					div.appendChild(innerdiv);
					div.appendChild(iframe);*/
					//popitup('http://way2sms.com/LoginExten?browserId='+DP_fingerprint);
  					//iframe.setAttribute("src", 'http://way2sms.com/LoginExten?browserId='+DP_fingerprint);
					popupCenter('http://way2sms.com/LoginExten?browserId='+DP_fingerprint,'_blank',450,700);
  					//iframe.setAttribute("src", 'http://www.way2sms.com/LoginExten?browserId='+DP_fingerprint);

  				}else if(xhr.responseText == "limitExcess"){
  					// window.close();
  					window.open("http://way2sms.com/extenLogin");
					//popupCenter('http://way2sms.com/extenLogin','Way2SMSExtension',450,600);
				}else if(xhr.responseText == "limitsuccess"){
					/*var div = document.createElement('div');
					var innerdiv = document.createElement('span');
					var iframe = document.createElement('iframe');
					iframe.height = "575px";
					iframe.width = "350px";
					iframe.frameBorder = "0";
					document.body.appendChild(div);
					div.appendChild(innerdiv);
					div.appendChild(iframe);*/ 
  					// iframe.setAttribute("src", 'http://way2sms.com/ExtReSuccess?browserId='+DP_fingerprint);
					popupCenter('http://way2sms.com/ExtReSuccess?browserId='+DP_fingerprint,'_blank',450,700);
  					//iframe.setAttribute("src", 'http://www.way2sms.com/ExtReSuccess?browserId='+DP_fingerprint);
// 
  				}
  			}
  		}
  		//xhr.open("Post", "http://www.way2sms.com/CheckExtnMsgCount?browserId="+DP_fingerprint, true);
 		xhr.open("Post", "http://way2sms.com/CheckExtnMsgCount?browserId="+DP_fingerprint, true);
		xhr.send(null);

});
//});
 
function popupCenter(url, title, w, h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 

