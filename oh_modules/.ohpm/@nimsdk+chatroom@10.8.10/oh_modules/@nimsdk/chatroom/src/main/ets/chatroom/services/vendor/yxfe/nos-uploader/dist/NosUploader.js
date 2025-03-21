!function (z114, a115) { "object" == typeof exports && "object" == typeof module ? module.exports = a115() : "function" == typeof define && define.amd ? define([], a115) : "object" == typeof exports ? exports.NosUploader = a115() : z114.NosUploader = a115(); }(self, (function () { return function () {
    "use strict";
    var r107 = { d: function (w114, x114) { for (var y114 in x114)
            r107.o(x114, y114) && !r107.o(w114, y114) && Object.defineProperty(w114, y114, { enumerable: !0, get: x114[y114] }); }, o: function (u114, v114) { return Object.prototype.hasOwnProperty.call(u114, v114); } }, s107 = {};
    r107.d(s107, { default: function () { return c108; } });
    var t107 = function d108(e113) { for (var f113 in function (s114, t114) { if (!(s114 instanceof t114))
        throw new TypeError("Cannot call a class as a function"); }(this, d108), this.directUploadAddr = "https://wanproxy-web.127.net", this.retryCount = 1, this.trunkSize = 4194304, this.trunkUploadTimeout = 5e4, this.getOffsetTimeout = 1e4, this.version = "1.0", this.enableCache = !0, this.logger = console, this.onError = function (r114) { }, this.onProgress = function (q114) { }, this.onUploadProgress = function (p114) { }, this.onComplete = function (o114) { }, e113)
        this[f113] = e113[f113]; };
    function h107(q112, r112) { var s112 = "undefined" != typeof Symbol && q112[Symbol.iterator] || q112["@@iterator"]; if (!s112) {
        if (Array.isArray(q112) || (s112 = function (b113, c113) { if (b113) {
            if ("string" == typeof b113)
                return i107(b113, c113);
            var d113 = Object.prototype.toString.call(b113).slice(8, -1);
            return "Object" === d113 && b113.constructor && (d113 = b113.constructor.name), "Map" === d113 || "Set" === d113 ? Array.from(b113) : "Arguments" === d113 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(d113) ? i107(b113, c113) : void 0;
        } }(q112)) || r112 && q112 && "number" == typeof q112.length) {
            s112 && (q112 = s112);
            var t112 = 0, u112 = function () { };
            return { s: u112, n: function () { return t112 >= q112.length ? { done: !0 } : { done: !1, value: q112[t112++] }; }, e: function (a113) { throw a113; }, f: u112 };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    } var v112, w112 = !0, x112 = !1; return { s: function () { s112 = s112.call(q112); }, n: function () { var z112 = s112.next(); return w112 = z112.done, z112; }, e: function (y112) { x112 = !0, v112 = y112; }, f: function () { try {
            w112 || null == s112.return || s112.return();
        }
        finally {
            if (x112)
                throw v112;
        } } }; }
    function i107(m112, n112) { (null == n112 || n112 > m112.length) && (n112 = m112.length); for (var o112 = 0, p112 = new Array(n112); o112 < n112; o112++)
        p112[o112] = m112[o112]; return p112; }
    var u107 = window.localStorage;
    window.localStorage && "function" == typeof window.localStorage.getItem && "function" == typeof window.localStorage.setItem && "function" == typeof window.localStorage.removeItem || (u107 = { privateObj: {}, setItem: function (k112, l112) { u107.privateObj[k112] = l112; }, getItem: function (j112) { return u107.privateObj[j112]; }, removeItem: function (i112) { delete u107.privateObj[i112]; }, getKeys: function () { return Object.keys(u107.privateObj); } });
    var v107 = { getFileKey: function (f112) { var g112 = f112.size.toString(), h112 = f112.lastModified.toString(); return "_NosUploader_" + f112.name + g112.slice(g112.length - 5) + h112.slice(h112.length - 5); }, getFileInfo: function (c112) { var d112 = u107.getItem(c112); if (!d112)
            return null; try {
            return JSON.parse(d112);
        }
        catch (e112) {
            return null;
        } }, initFile: function (x111, y111, z111) { v107.clearExpiredInfo(); var a112 = this.getFileKey(y111), b112 = { ctx: void 0 !== x111.ctx ? x111.ctx : "", bucket: x111.bucketName, obj: x111.objectName, token: x111.token, modifyAt: Date.now(), end: !1 }; return x111.payload && (b112.payload = x111.payload), z111 && u107.setItem(a112, JSON.stringify(b112)), a112; }, setUploadContext: function (t111, u111, v111) { var w111 = this.getFileInfo(t111); w111 && (w111.ctx = u111, v111 && u107.setItem(t111, JSON.stringify(w111))); }, setComplete: function (q111, r111) { var s111 = this.getFileInfo(q111); s111 && (s111.modifyAt = Date.now(), s111.end = !0, r111 && u107.setItem(q111, JSON.stringify(s111))); }, getUploadContext: function (o111) { var p111 = this.getFileInfo(o111); return p111 ? p111.ctx : ""; }, removeFileInfo: function (n111) { 0 === n111.indexOf("_NosUploader_") && u107.removeItem(n111); }, clearExpiredInfo: function () { var z110, a111 = "function" == typeof u107.getKeys ? u107.getKeys() : Object.keys(u107), b111 = Date.now(), c111 = [], d111 = h107(a111); try {
            for (d111.s(); !(z110 = d111.n()).done;) {
                var e111 = z110.value;
                if (0 === e111.indexOf("_NosUploader_")) {
                    var f111 = v107.getFileInfo(e111);
                    null === f111 || b111 - f111.modifyAt > c108.expireTime ? u107.removeItem(e111) : c111.push({ fileInfo: f111, key: e111 });
                }
            }
        }
        catch (m111) {
            d111.e(m111);
        }
        finally {
            d111.f();
        } if (c111.length > c108.maxFileCache) {
            var g111, h111 = h107(c111.sort((function (k111, l111) { return l111.fileInfo.modifyAt - k111.fileInfo.modifyAt; })).slice(c108.maxFileCache));
            try {
                for (h111.s(); !(g111 = h111.n()).done;) {
                    var i111 = g111.value;
                    0 === i111.key.indexOf("_NosUploader_") && u107.removeItem(i111.key);
                }
            }
            catch (j111) {
                h111.e(j111);
            }
            finally {
                h111.f();
            }
        } } }, w107 = v107;
    function j107(w110) { return (j107 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (y110) { return typeof y110; } : function (x110) { return x110 && "function" == typeof Symbol && x110.constructor === Symbol && x110 !== Symbol.prototype ? "symbol" : typeof x110; })(w110); }
    function k107(t110, u110) { return !u110 || "object" !== j107(u110) && "function" != typeof u110 ? function (v110) { if (void 0 === v110)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return v110; }(t110) : u110; }
    function l107(o110) { var p110 = "function" == typeof Map ? new Map : void 0; return (l107 = function (q110) { if (null === q110 || (s110 = q110, -1 === Function.toString.call(s110).indexOf("[native code]")))
        return q110; var s110; if ("function" != typeof q110)
        throw new TypeError("Super expression must either be null or a function"); if (void 0 !== p110) {
        if (p110.has(q110))
            return p110.get(q110);
        p110.set(q110, r110);
    } function r110() { return m107(q110, arguments, p107(this).constructor); } return r110.prototype = Object.create(q110.prototype, { constructor: { value: r110, enumerable: !1, writable: !0, configurable: !0 } }), o107(r110, q110); })(o110); }
    function m107(g110, h110, i110) { return (m107 = n107() ? Reflect.construct : function (j110, k110, l110) { var m110 = [null]; m110.push.apply(m110, k110); var n110 = new (Function.bind.apply(j110, m110)); return l110 && o107(n110, l110.prototype), n110; }).apply(null, arguments); }
    function n107() { if ("undefined" == typeof Reflect || !Reflect.construct)
        return !1; if (Reflect.construct.sham)
        return !1; if ("function" == typeof Proxy)
        return !0; try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () { }))), !0;
    }
    catch (f110) {
        return !1;
    } }
    function o107(b110, c110) { return (o107 = Object.setPrototypeOf || function (d110, e110) { return d110.__proto__ = e110, d110; })(b110, c110); }
    function p107(z109) { return (p107 = Object.setPrototypeOf ? Object.getPrototypeOf : function (a110) { return a110.__proto__ || Object.getPrototypeOf(a110); })(z109); }
    var x107 = function (k109) { !function (x109, y109) { if ("function" != typeof y109 && null !== y109)
        throw new TypeError("Super expression must either be null or a function"); x109.prototype = Object.create(y109 && y109.prototype, { constructor: { value: x109, writable: !0, configurable: !0 } }), y109 && o107(x109, y109); }(l109, k109); var m109, n109, o109 = (m109 = l109, n109 = n107(), function () { var u109, v109 = p107(m109); if (n109) {
        var w109 = p107(this).constructor;
        u109 = Reflect.construct(v109, arguments, w109);
    }
    else
        u109 = v109.apply(this, arguments); return k107(this, u109); }); function l109(p109, q109) { var r109; return function (s109, t109) { if (!(s109 instanceof t109))
        throw new TypeError("Cannot call a class as a function"); }(this, l109), (r109 = o109.call(this, "NosUploadError:" + p109)).errCode = q109, r109.errMsg = p109, r109; } return l109; }(l107(Error)), y107 = function e108(g113, h113, i113) { if ("uploading" === g113.uploadState) {
        var j113 = g113.config, k113 = g113.param, l113 = w107.getUploadContext(g113.fileKey);
        if (!l113)
            return i113(0);
        var m113 = new XMLHttpRequest, n113 = j113.directUploadAddr + "/".concat(k113.bucketName) + "/".concat(encodeURIComponent(k113.objectName)) + "?uploadContext" + "&context=".concat(l113) + "&version=".concat(j113.version);
        m113.onreadystatechange = function () { var l114; if ("abort" !== g113.uploadState && 4 === m113.readyState) {
            var m114;
            try {
                m114 = JSON.parse(m113.responseText);
            }
            catch (n114) {
                m114 = { errMsg: "JsonParseError in getOffset", errCode: 500 };
            }
            200 === m113.status ? m114.errCode ? g113.config.onError(new x107(m114.errMsg, m114.errCode)) : i113(m114.offset) : m113.status.toString().match(/^5/) ? e108(g113, h113 - 1, i113) : h113 > 0 ? ("function" == typeof (null === (l114 = j113.logger) || void 0 === l114 ? void 0 : l114.error) && j113.logger.error("getOffset(".concat(n113, ") error. retry after 3 seconds. ").concat((new Date).toTimeString())), setTimeout((function () { e108(g113, h113 - 1, i113); }), 3500)) : (w107.removeFileInfo(g113.fileKey), m113.status ? j113.onError(new x107("getOffset(".concat(n113, ") error: ").concat(m113.status, " ").concat(m113.statusText))) : j113.onError(new x107("getOffset(".concat(n113, ") error. no Error Code"))));
        } }, m113.open("get", n113), m113.setRequestHeader("x-nos-token", k113.token), m113.timeout = j113.getOffsetTimeout, m113.send();
    } }, z107 = function f108(o113, p113, q113, r113) { if ("uploading" === o113.uploadState) {
        var s113 = o113.param, t113 = o113.config, u113 = File.prototype.slice, v113 = void 0 !== s113.ctx ? s113.ctx : "", w113 = p113 + t113.trunkSize > o113.file.size, x113 = w113 ? o113.file.size : p113 + t113.trunkSize, y113 = new XMLHttpRequest, z113 = t113.directUploadAddr + "/".concat(s113.bucketName) + "/".concat(encodeURIComponent(s113.objectName));
        if (y113.upload.onprogress = function (j114) { if ("abort" !== o113.uploadState) {
            var k114 = 0;
            j114.lengthComputable ? (k114 = (p113 + j114.loaded) / o113.file.size, t113.onProgress(k114), t113.onUploadProgress({ loaded: j114.loaded, total: o113.file.size, percentage: k114, percentageText: (100 * k114).toFixed(2) + "%" })) : t113.onError(new x107("browser does not support query upload progress"));
        } }, y113.onreadystatechange = function () { var f114, g114; if ("abort" !== o113.uploadState && 4 === y113.readyState) {
            var h114;
            try {
                h114 = JSON.parse(y113.responseText);
            }
            catch (i114) {
                "function" == typeof (null === (f114 = t113.logger) || void 0 === f114 ? void 0 : f114.error) && t113.logger.error("JsonParseError in uploadTrunk", i114), h114 = { errMsg: "JsonParseError in uploadTrunk" };
            }
            200 === y113.status ? (o113.setContext(h114.context), w113 ? (r113(), o113.setComplete()) : f108(o113, h114.offset, t113.retryCount, r113)) : y113.status.toString().match(/^5/) ? q113 > 0 ? f108(o113, p113, q113 - 1, r113) : (w107.removeFileInfo(o113.fileKey), t113.onError(new x107(h114.errMsg, h114.errCode))) : q113 > 0 ? ("function" == typeof (null === (g114 = t113.logger) || void 0 === g114 ? void 0 : g114.error) && t113.logger.error("uploadTrunk(".concat(z113, ") error. retry after 3 seconds. ").concat((new Date).toTimeString())), setTimeout((function () { f108(o113, p113, q113 - 1, r113); }), 3500)) : (w107.removeFileInfo(o113.fileKey), y113.status ? t113.onError(new x107("uploadTrunk(".concat(z113, ") error: ").concat(y113.status, " ").concat(y113.statusText))) : t113.onError(new x107("uploadTrunk(".concat(z113, ") error. no Error Code. Please check your network"))));
        } }, y113.open("post", z113 + "?offset=".concat(p113) + "&complete=".concat(w113) + "&context=".concat(v113) + "&version=".concat(t113.version)), y113.setRequestHeader("x-nos-token", s113.token), s113.md5 && y113.setRequestHeader("content-md5", s113.md5), o113.file.type && y113.setRequestHeader("content-type", o113.file.type), y113.timeout = t113.trunkUploadTimeout, "undefined" != typeof FileReader) {
            var a114 = new FileReader;
            a114.addEventListener("load", (function (d114) { var e114; (null === (e114 = null == d114 ? void 0 : d114.target) || void 0 === e114 ? void 0 : e114.result) ? y113.send(d114.target.result) : t113.onError(new x107("Read ArrayBuffer failed")); })), a114.addEventListener("error", (function (b114) { var c114 = b114.target.error; t113.onError(new x107("Read ArrayBuffer error. ".concat(c114.toString()), c114.code)); })), a114.readAsArrayBuffer(u113.call(o113.file, p113, x113));
        }
        else
            y113.send(u113.call(o113.file, p113, x113));
    } };
    function q107(g109, h109) { for (var i109 = 0; i109 < h109.length; i109++) {
        var j109 = h109[i109];
        j109.enumerable = j109.enumerable || !1, j109.configurable = !0, "value" in j109 && (j109.writable = !0), Object.defineProperty(g109, j109.key, j109);
    } }
    var a108 = function () { function t108(b109, c109, d109) { !function (e109, f109) { if (!(e109 instanceof f109))
        throw new TypeError("Cannot call a class as a function"); }(this, t108), this.uploadState = "paused", this.config = d109, this.file = b109, this.param = c109, this.fileKey = w107.initFile(c109, b109, this.config.enableCache), this.resume(); } var u108, v108; return u108 = t108, (v108 = [{ key: "resume", value: function () { var y108 = this; if ("uploading" !== this.uploadState) {
                this.setUploadState("uploading");
                var z108 = this.config;
                y107(this, z108.retryCount, (function (a109) { z107(y108, a109, z108.retryCount, (function () { y108.setUploadState("ended"), "function" == typeof z108.onComplete && z108.onComplete(y108.param); })); }));
            } } }, { key: "pause", value: function () { this.setUploadState("paused"); } }, { key: "abort", value: function () { "ended" !== this.uploadState && "abort" !== this.uploadState && (this.setUploadState("abort"), w107.removeFileInfo(this.fileKey), this.config.onError(new x107("Upload Aborted", 10499))); } }, { key: "setUploadState", value: function (x108) { x108 !== this.uploadState && (this.uploadState = x108); } }, { key: "setContext", value: function (w108) { w107.setUploadContext(this.fileKey, w108, this.config.enableCache), this.param.ctx = w108; } }, { key: "setComplete", value: function () { w107.setComplete(this.fileKey, this.config.enableCache), this.setUploadState("ended"); } }]) && q107(u108.prototype, v108), t108; }(), b108 = { maxFileCache: 6, expireTime: 864e5, getFileUploadInformation: function (q108) { var r108 = w107.getFileKey(q108), s108 = w107.getFileInfo(r108); return null === s108 ? null : Date.now() - s108.modifyAt > b108.expireTime ? (w107.removeFileInfo(r108), null) : { uploadInfo: Object.assign({ bucketName: s108.bucket, objectName: s108.obj, token: s108.token, ctx: s108.ctx }, s108.payload ? { payload: s108.payload } : {}), complete: s108.end }; }, setMaxFileCache: function (p108) { b108.maxFileCache = p108; }, setExpireTime: function (o108) { b108.expireTime = o108; }, printCaches: function () { for (var k108 = 0, l108 = Object.keys(localStorage); k108 < l108.length; k108++) {
            var m108 = l108[k108], n108 = w107.getFileInfo(m108);
            n108 && console.log(n108, "modifiedAt", new Date(n108.modifyAt).toTimeString());
        } }, createConfig: function (j108) { return new t107(j108); }, createTask: function (g108, h108, i108) { return new a108(g108, h108, i108); } }, c108 = b108;
    return s107.default;
}(); }));
