(function() {
    "use strict";
    function e(e) {
        var t = e.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        return t && t[0] ? t[0] : "https://www.instamojo.com/";
    }
    function t(e, t) {
        var a, n;
        return a = document.getElementsByTagName("head")[0], n = document.createElement("script"), 
        n.type = "text/javascript", n.src = e, n.onreadystatechange = t, n.onload = t, a.appendChild(n);
    }
    function a() {
        return c("head").append('<link rel="stylesheet" type="text/css" href="dist/css/imojo.css">');
    }
    function n(e) {
        var t = {
            link: c(e).prop("href"),
            style: c(e).attr("data-style"),
            verb: c(e).attr("data-text"),
            tab: c(e).attr("data-newtab"),
            behavior: c(e).attr("data-behavior") || c(e).attr("data-behaviour")
        };
        return t;
    }
    function o(e) {
        c(e).parent(".im-checkout").append('<a href="https://www.instamojo.com?partner=remote" target="_blank" title="Powered by Instamojo" class="im-powered-link">Powered by Instamojo</a>');
    }
    function r(t) {
        var a = c(t).prop("href"), n = a + (a.indexOf("?") > 0 ? "&" : "?") + "intent=buy&checkout=remote&iframe=1&embed=form", o = {
            modalClass: "immoral-modal-new-buy-flow",
            content: '<div class="im-embed-overlay"></div><div class="iframe-container loader"><div class="iframe-loader-wrapper"><div class="iframe-loader"></div></div><iframe class="iframe" src="' + n + '" seamless id="imojo-rc-iframe"></iframe></div>',
            modalCloseButton: "",
            modalStyle: {
                position: "relative",
                top: "0",
                left: "0",
                width: "100%",
                "max-width": "100%",
                height: "100%",
                transform: "none!important",
                margin: "0 auto",
                background: "transparent",
                "box-shadow": "none",
                "overflow-y": "visible"
            },
            modalContainerStyle: {
                position: "fixed",
                top: "0px",
                display: "block",
                left: "0px",
                height: "100%",
                width: "100%",
                background: "transparent",
                "backface-visibility": "hidden",
                "-webkit-overflow-scrolling": "touch",
                "overflow-y": "visible"
            }
        };
        /iPhone|iPad|iPod/i.test(navigator.userAgent) || (o.modalContentStyle = {
            position: "fixed",
            width: "100%",
            height: "100%"
        }), jQuery(t).immoral(o), c(t).on("click", function() {
            function t(e) {
                if (s.closest(".iframe-container").removeClass("loader"), e) try {
                    u = c('meta[name="viewport"]').clone()[0], u && c('meta[name="viewport"]').remove();
                    var t = document.createElement("meta");
                    t.name = "viewport", t.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no", 
                    t.id = "im-embed-viewport", document.head.appendChild(t);
                } catch (a) {}
                window.innerWidth < 640 && (s.closest(".immoral-modal-container").css("position", "absolute"), 
                window.scrollTo(0, 0)), m = !0;
            }
            function n() {
                try {
                    document.getElementById("im-embed-viewport").remove(), u && document.head.appendChild(u);
                } catch (e) {}
            }
            var o = e(a);
            if (h) {
                var r = window.open(o + "_blank/", null, "height=10,width=10,menubar=no,toolbar=no,location=no,status=no,resizable=no,scrollbars=no");
                r.blur();
            }
            var i = window.addEventListener ? "addEventListener" : "attachEvent", l = window[i], d = "attachEvent" === i ? "onmessage" : "message", s = c("#imojo-rc-iframe"), m = !1;
            l(d, function(e) {
                var a = e.message ? "message" : "data", o = e[a];
                m || "onRequestShow" === o && t(!0), "onRequestClose" === o && n();
            }, !1), s.load(function() {
                m || t(!1);
            });
        });
    }
    function i(e) {
        return jQuery.fn.immoral ? c(e).each(function() {
            return r(this);
        }) : jQuery.getScript("https://d2xwmjc4uy2hr5.cloudfront.net/im-embed/immoral.min.js", function() {
            return c(e).each(function() {
                return r(this);
            });
        });
    }
    function l(t, a) {
        var n, r, l, d, s;
        d = Math.floor(100 * Math.random() + 1), n = '<div class="im-checkout btn-' + d + '"><a href="' + a.link + '" class="im-checkout-btn"', 
        n += "false" === a.tab ? ">" : ' target="_blank">', n += "" !== a.verb ? a.verb.replace(/[\u00A0-\u9999<>\&]/gim, function(e) {
            return "&#" + e.charCodeAt(0) + ";";
        }) : "Checkout with Instamojo", n += "</a></div>", c(t).replaceWith(n), r = c(".im-checkout.btn-" + d).find('a[href="' + a.link + '"].im-checkout-btn'), 
        l = a.link.replace(/\/$/, "").split("/"), s = l[3], "@" === s.charAt(0) && (s = s.replace("@", ""));
        var m = e(a.link);
        return c.get(m + s + "/remote/auth.json", function(e) {
            var t = c.parseJSON(e);
            return t.im_branding && o(r), t.enable_remote_checkout === !0 && "link" !== a.behavior ? (c(r).attr("rel", "modal"), 
            i(r)) : void 0;
        }), "light" === a.style ? c(r).addClass("btn--light") : "dark" === a.style ? c(r).addClass("btn--dark") : "flat" === a.style ? c(r).addClass("btn--flat") : "flat-dark" === a.style && c(r).addClass("btn--flat-dark"), 
        r;
    }
    function d() {
        return c = jQuery.noConflict(!0), window.jQuery = window.jQuery || c, c(document).ready(function() {
            c('a[rel="im-checkout"]').each(function(e, t) {
                var o = n(t);
                l(t, o), a();
            });
        });
    }
    function s(e) {
        var t = window.jQuery.fn.jquery, a = t.split(".").map(function(e) {
            return parseInt(e);
        }), n = e.split(".").map(function(e) {
            return parseInt(e);
        });
        return a[0] === n[0] ? a[1] === n[1] ? a[2] === n[2] ? !0 : a[2] != n[2] : a[1] != n[1] : a[0] != n[0];
    }
    var c, m = Math.floor(1e4 * Math.random() + 1), u = null, h = !1, f = navigator.userAgent.toLowerCase();
    -1 !== f.indexOf("safari") && -1 === f.indexOf("chrome") && (h = !0), window.Imbedify = window.Imbedify || {}, 
    window.Imbedify.run = function() {
        return d();
    };
    var w = "1.11.1";
    !window.jQuery || window.jQuery && s(w) ? t("https://cdnjs.cloudflare.com/ajax/libs/jquery/" + w + "/jquery.min.js", d) : d();
}).call(this);