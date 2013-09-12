/*!
 * jQuery JavaScript Library v1.10.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-05-30T21:49Z
 */
!function (e, t) {
    function n(e) {
        var t = e.length, n = ct.type(e);
        return ct.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function r(e) {
        var t = St[e] = {};
        return ct.each(e.match(dt) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function i(e, n, r, i) {
        if (ct.acceptData(e)) {
            var o, a, s = ct.expando, l = e.nodeType, u = l ? ct.cache : e, c = l ? e[s] : e[s] && s;
            if (c && u[c] && (i || u[c].data) || r !== t || "string" != typeof n)return c || (c = l ? e[s] = tt.pop() || ct.guid++ : s), u[c] || (u[c] = l ? {} : {toJSON: ct.noop}), ("object" == typeof n || "function" == typeof n) && (i ? u[c] = ct.extend(u[c], n) : u[c].data = ct.extend(u[c].data, n)), a = u[c], i || (a.data || (a.data = {}), a = a.data), r !== t && (a[ct.camelCase(n)] = r), "string" == typeof n ? (o = a[n], null == o && (o = a[ct.camelCase(n)])) : o = a, o
        }
    }

    function o(e, t, n) {
        if (ct.acceptData(e)) {
            var r, i, o = e.nodeType, a = o ? ct.cache : e, l = o ? e[ct.expando] : ct.expando;
            if (a[l]) {
                if (t && (r = n ? a[l] : a[l].data)) {
                    ct.isArray(t) ? t = t.concat(ct.map(t, ct.camelCase)) : t in r ? t = [t] : (t = ct.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
                    for (; i--;)delete r[t[i]];
                    if (n ? !s(r) : !ct.isEmptyObject(r))return
                }
                (n || (delete a[l].data, s(a[l]))) && (o ? ct.cleanData([e], !0) : ct.support.deleteExpando || a != a.window ? delete a[l] : a[l] = null)
            }
        }
    }

    function a(e, n, r) {
        if (r === t && 1 === e.nodeType) {
            var i = "data-" + n.replace(Et, "-$1").toLowerCase();
            if (r = e.getAttribute(i), "string" == typeof r) {
                try {
                    r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : Nt.test(r) ? ct.parseJSON(r) : r
                } catch (o) {
                }
                ct.data(e, n, r)
            } else r = t
        }
        return r
    }

    function s(e) {
        var t;
        for (t in e)if (("data" !== t || !ct.isEmptyObject(e[t])) && "toJSON" !== t)return!1;
        return!0
    }

    function l() {
        return!0
    }

    function u() {
        return!1
    }

    function c() {
        try {
            return G.activeElement
        } catch (e) {
        }
    }

    function f(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function d(e, t, n) {
        if (ct.isFunction(t))return ct.grep(e, function (e, r) {
            return!!t.call(e, r, e) !== n
        });
        if (t.nodeType)return ct.grep(e, function (e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (Bt.test(t))return ct.filter(t, e, n);
            t = ct.filter(t, e)
        }
        return ct.grep(e, function (e) {
            return ct.inArray(e, t) >= 0 !== n
        })
    }

    function p(e) {
        var t = Ut.split("|"), n = e.createDocumentFragment();
        if (n.createElement)for (; t.length;)n.createElement(t.pop());
        return n
    }

    function h(e, t) {
        return ct.nodeName(e, "table") && ct.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function m(e) {
        return e.type = (null !== ct.find.attr(e, "type")) + "/" + e.type, e
    }

    function g(e) {
        var t = on.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function y(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++)ct._data(n, "globalEval", !t || ct._data(t[r], "globalEval"))
    }

    function v(e, t) {
        if (1 === t.nodeType && ct.hasData(e)) {
            var n, r, i, o = ct._data(e), a = ct._data(t, o), s = o.events;
            if (s) {
                delete a.handle, a.events = {};
                for (n in s)for (r = 0, i = s[n].length; i > r; r++)ct.event.add(t, n, s[n][r])
            }
            a.data && (a.data = ct.extend({}, a.data))
        }
    }

    function b(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !ct.support.noCloneEvent && t[ct.expando]) {
                i = ct._data(t);
                for (r in i.events)ct.removeEvent(t, r, i.handle);
                t.removeAttribute(ct.expando)
            }
            "script" === n && t.text !== e.text ? (m(t).text = e.text, g(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ct.support.html5Clone && e.innerHTML && !ct.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && tn.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function x(e, n) {
        var r, i, o = 0, a = typeof e.getElementsByTagName !== Q ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== Q ? e.querySelectorAll(n || "*") : t;
        if (!a)for (a = [], r = e.childNodes || e; null != (i = r[o]); o++)!n || ct.nodeName(i, n) ? a.push(i) : ct.merge(a, x(i, n));
        return n === t || n && ct.nodeName(e, n) ? ct.merge([e], a) : a
    }

    function w(e) {
        tn.test(e.type) && (e.defaultChecked = e.checked)
    }

    function C(e, t) {
        if (t in e)return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = Sn.length; i--;)if (t = Sn[i] + n, t in e)return t;
        return r
    }

    function T(e, t) {
        return e = t || e, "none" === ct.css(e, "display") || !ct.contains(e.ownerDocument, e)
    }

    function k(e, t) {
        for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++)r = e[a], r.style && (o[a] = ct._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && T(r) && (o[a] = ct._data(r, "olddisplay", j(r.nodeName)))) : o[a] || (i = T(r), (n && "none" !== n || !i) && ct._data(r, "olddisplay", i ? n : ct.css(r, "display"))));
        for (a = 0; s > a; a++)r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        return e
    }

    function S(e, t, n) {
        var r = vn.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function N(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2)"margin" === n && (a += ct.css(e, n + kn[o], !0, i)), r ? ("content" === n && (a -= ct.css(e, "padding" + kn[o], !0, i)), "margin" !== n && (a -= ct.css(e, "border" + kn[o] + "Width", !0, i))) : (a += ct.css(e, "padding" + kn[o], !0, i), "padding" !== n && (a += ct.css(e, "border" + kn[o] + "Width", !0, i)));
        return a
    }

    function E(e, t, n) {
        var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = fn(e), a = ct.support.boxSizing && "border-box" === ct.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = dn(e, t, o), (0 > i || null == i) && (i = e.style[t]), bn.test(i))return i;
            r = a && (ct.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + N(e, t, n || (a ? "border" : "content"), r, o) + "px"
    }

    function j(e) {
        var t = G, n = wn[e];
        return n || (n = A(e, t), "none" !== n && n || (cn = (cn || ct("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (cn[0].contentWindow || cn[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = A(e, t), cn.detach()), wn[e] = n), n
    }

    function A(e, t) {
        var n = ct(t.createElement(e)).appendTo(t.body), r = ct.css(n[0], "display");
        return n.remove(), r
    }

    function $(e, t, n, r) {
        var i;
        if (ct.isArray(t))ct.each(t, function (t, i) {
            n || En.test(e) ? r(e, i) : $(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        }); else if (n || "object" !== ct.type(t))r(e, t); else for (i in t)$(e + "[" + i + "]", t[i], n, r)
    }

    function D(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0, o = t.toLowerCase().match(dt) || [];
            if (ct.isFunction(n))for (; r = o[i++];)"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function L(e, t, n, r) {
        function i(s) {
            var l;
            return o[s] = !0, ct.each(e[s] || [], function (e, s) {
                var u = s(t, n, r);
                return"string" != typeof u || a || o[u] ? a ? !(l = u) : void 0 : (t.dataTypes.unshift(u), i(u), !1)
            }), l
        }

        var o = {}, a = e === zn;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }

    function H(e, n) {
        var r, i, o = ct.ajaxSettings.flatOptions || {};
        for (i in n)n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
        return r && ct.extend(!0, e, r), e
    }

    function q(e, n, r) {
        for (var i, o, a, s, l = e.contents, u = e.dataTypes; "*" === u[0];)u.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
        if (o)for (s in l)if (l[s] && l[s].test(o)) {
            u.unshift(s);
            break
        }
        if (u[0]in r)a = u[0]; else {
            for (s in r) {
                if (!u[0] || e.converters[s + " " + u[0]]) {
                    a = s;
                    break
                }
                i || (i = s)
            }
            a = a || i
        }
        return a ? (a !== u[0] && u.unshift(a), r[a]) : void 0
    }

    function _(e, t, n, r) {
        var i, o, a, s, l, u = {}, c = e.dataTypes.slice();
        if (c[1])for (a in e.converters)u[a.toLowerCase()] = e.converters[a];
        for (o = c.shift(); o;)if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift())if ("*" === o)o = l; else if ("*" !== l && l !== o) {
            if (a = u[l + " " + o] || u["* " + o], !a)for (i in u)if (s = i.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], c.unshift(s[1]));
                break
            }
            if (a !== !0)if (a && e["throws"])t = a(t); else try {
                t = a(t)
            } catch (f) {
                return{state: "parsererror", error: a ? f : "No conversion from " + l + " to " + o}
            }
        }
        return{state: "success", data: t}
    }

    function O() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    }

    function I() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {
        }
    }

    function P() {
        return setTimeout(function () {
            Zn = t
        }), Zn = ct.now()
    }

    function F(e, t, n) {
        for (var r, i = (or[t] || []).concat(or["*"]), o = 0, a = i.length; a > o; o++)if (r = i[o].call(n, t, e))return r
    }

    function M(e, t, n) {
        var r, i, o = 0, a = ir.length, s = ct.Deferred().always(function () {
            delete l.elem
        }), l = function () {
            if (i)return!1;
            for (var t = Zn || P(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, a = 0, l = u.tweens.length; l > a; a++)u.tweens[a].run(o);
            return s.notifyWith(e, [u, o, n]), 1 > o && l ? n : (s.resolveWith(e, [u]), !1)
        }, u = s.promise({elem: e, props: ct.extend({}, t), opts: ct.extend(!0, {specialEasing: {}}, n), originalProperties: t, originalOptions: n, startTime: Zn || P(), duration: n.duration, tweens: [], createTween: function (t, n) {
            var r = ct.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
            return u.tweens.push(r), r
        }, stop: function (t) {
            var n = 0, r = t ? u.tweens.length : 0;
            if (i)return this;
            for (i = !0; r > n; n++)u.tweens[n].run(1);
            return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this
        }}), c = u.props;
        for (R(c, u.opts.specialEasing); a > o; o++)if (r = ir[o].call(u, e, c, u.opts))return r;
        return ct.map(c, F, u), ct.isFunction(u.opts.start) && u.opts.start.call(e, u), ct.fx.timer(ct.extend(l, {elem: e, anim: u, queue: u.opts.queue})), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function R(e, t) {
        var n, r, i, o, a;
        for (n in e)if (r = ct.camelCase(n), i = t[r], o = e[n], ct.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = ct.cssHooks[r], a && "expand"in a) {
            o = a.expand(o), delete e[r];
            for (n in o)n in e || (e[n] = o[n], t[n] = i)
        } else t[r] = i
    }

    function B(e, t, n) {
        var r, i, o, a, s, l, u = this, c = {}, f = e.style, d = e.nodeType && T(e), p = ct._data(e, "fxshow");
        n.queue || (s = ct._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () {
            s.unqueued || l()
        }), s.unqueued++, u.always(function () {
            u.always(function () {
                s.unqueued--, ct.queue(e, "fx").length || s.empty.fire()
            })
        })), 1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], "inline" === ct.css(e, "display") && "none" === ct.css(e, "float") && (ct.support.inlineBlockNeedsLayout && "inline" !== j(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")), n.overflow && (f.overflow = "hidden", ct.support.shrinkWrapBlocks || u.always(function () {
            f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
        }));
        for (r in t)if (i = t[r], tr.exec(i)) {
            if (delete t[r], o = o || "toggle" === i, i === (d ? "hide" : "show"))continue;
            c[r] = p && p[r] || ct.style(e, r)
        }
        if (!ct.isEmptyObject(c)) {
            p ? "hidden"in p && (d = p.hidden) : p = ct._data(e, "fxshow", {}), o && (p.hidden = !d), d ? ct(e).show() : u.done(function () {
                ct(e).hide()
            }), u.done(function () {
                var t;
                ct._removeData(e, "fxshow");
                for (t in c)ct.style(e, t, c[t])
            });
            for (r in c)a = F(d ? p[r] : 0, r, u), r in p || (p[r] = a.start, d && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function W(e, t, n, r, i) {
        return new W.prototype.init(e, t, n, r, i)
    }

    function z(e, t) {
        var n, r = {height: e}, i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t)n = kn[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function X(e) {
        return ct.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }

    var U, V, Q = typeof t, Y = e.location, G = e.document, K = G.documentElement, J = e.jQuery, Z = e.$, et = {}, tt = [], nt = "1.10.1", rt = tt.concat, it = tt.push, ot = tt.slice, at = tt.indexOf, st = et.toString, lt = et.hasOwnProperty, ut = nt.trim, ct = function (e, t) {
        return new ct.fn.init(e, t, V)
    }, ft = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, dt = /\S+/g, pt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ht = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, mt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, gt = /^[\],:{}\s]*$/, yt = /(?:^|:|,)(?:\s*\[)+/g, vt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, bt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, xt = /^-ms-/, wt = /-([\da-z])/gi, Ct = function (e, t) {
        return t.toUpperCase()
    }, Tt = function (e) {
        (G.addEventListener || "load" === e.type || "complete" === G.readyState) && (kt(), ct.ready())
    }, kt = function () {
        G.addEventListener ? (G.removeEventListener("DOMContentLoaded", Tt, !1), e.removeEventListener("load", Tt, !1)) : (G.detachEvent("onreadystatechange", Tt), e.detachEvent("onload", Tt))
    };
    ct.fn = ct.prototype = {jquery: nt, constructor: ct, init: function (e, n, r) {
        var i, o;
        if (!e)return this;
        if ("string" == typeof e) {
            if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ht.exec(e), !i || !i[1] && n)return!n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
            if (i[1]) {
                if (n = n instanceof ct ? n[0] : n, ct.merge(this, ct.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : G, !0)), mt.test(i[1]) && ct.isPlainObject(n))for (i in n)ct.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
                return this
            }
            if (o = G.getElementById(i[2]), o && o.parentNode) {
                if (o.id !== i[2])return r.find(e);
                this.length = 1, this[0] = o
            }
            return this.context = G, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ct.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), ct.makeArray(e, this))
    }, selector: "", length: 0, toArray: function () {
        return ot.call(this)
    }, get: function (e) {
        return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
    }, pushStack: function (e) {
        var t = ct.merge(this.constructor(), e);
        return t.prevObject = this, t.context = this.context, t
    }, each: function (e, t) {
        return ct.each(this, e, t)
    }, ready: function (e) {
        return ct.ready.promise().done(e), this
    }, slice: function () {
        return this.pushStack(ot.apply(this, arguments))
    }, first: function () {
        return this.eq(0)
    }, last: function () {
        return this.eq(-1)
    }, eq: function (e) {
        var t = this.length, n = +e + (0 > e ? t : 0);
        return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
    }, map: function (e) {
        return this.pushStack(ct.map(this, function (t, n) {
            return e.call(t, n, t)
        }))
    }, end: function () {
        return this.prevObject || this.constructor(null)
    }, push: it, sort: [].sort, splice: [].splice}, ct.fn.init.prototype = ct.fn, ct.extend = ct.fn.extend = function () {
        var e, n, r, i, o, a, s = arguments[0] || {}, l = 1, u = arguments.length, c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, l = 2), "object" == typeof s || ct.isFunction(s) || (s = {}), u === l && (s = this, --l); u > l; l++)if (null != (o = arguments[l]))for (i in o)e = s[i], r = o[i], s !== r && (c && r && (ct.isPlainObject(r) || (n = ct.isArray(r))) ? (n ? (n = !1, a = e && ct.isArray(e) ? e : []) : a = e && ct.isPlainObject(e) ? e : {}, s[i] = ct.extend(c, a, r)) : r !== t && (s[i] = r));
        return s
    }, ct.extend({expando: "jQuery" + (nt + Math.random()).replace(/\D/g, ""), noConflict: function (t) {
        return e.$ === ct && (e.$ = Z), t && e.jQuery === ct && (e.jQuery = J), ct
    }, isReady: !1, readyWait: 1, holdReady: function (e) {
        e ? ct.readyWait++ : ct.ready(!0)
    }, ready: function (e) {
        if (e === !0 ? !--ct.readyWait : !ct.isReady) {
            if (!G.body)return setTimeout(ct.ready);
            ct.isReady = !0, e !== !0 && --ct.readyWait > 0 || (U.resolveWith(G, [ct]), ct.fn.trigger && ct(G).trigger("ready").off("ready"))
        }
    }, isFunction: function (e) {
        return"function" === ct.type(e)
    }, isArray: Array.isArray || function (e) {
        return"array" === ct.type(e)
    }, isWindow: function (e) {
        return null != e && e == e.window
    }, isNumeric: function (e) {
        return!isNaN(parseFloat(e)) && isFinite(e)
    }, type: function (e) {
        return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? et[st.call(e)] || "object" : typeof e
    }, isPlainObject: function (e) {
        var n;
        if (!e || "object" !== ct.type(e) || e.nodeType || ct.isWindow(e))return!1;
        try {
            if (e.constructor && !lt.call(e, "constructor") && !lt.call(e.constructor.prototype, "isPrototypeOf"))return!1
        } catch (r) {
            return!1
        }
        if (ct.support.ownLast)for (n in e)return lt.call(e, n);
        for (n in e);
        return n === t || lt.call(e, n)
    }, isEmptyObject: function (e) {
        var t;
        for (t in e)return!1;
        return!0
    }, error: function (e) {
        throw new Error(e)
    }, parseHTML: function (e, t, n) {
        if (!e || "string" != typeof e)return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || G;
        var r = mt.exec(e), i = !n && [];
        return r ? [t.createElement(r[1])] : (r = ct.buildFragment([e], t, i), i && ct(i).remove(), ct.merge([], r.childNodes))
    }, parseJSON: function (t) {
        return e.JSON && e.JSON.parse ? e.JSON.parse(t) : null === t ? t : "string" == typeof t && (t = ct.trim(t), t && gt.test(t.replace(vt, "@").replace(bt, "]").replace(yt, ""))) ? new Function("return " + t)() : (ct.error("Invalid JSON: " + t), void 0)
    }, parseXML: function (n) {
        var r, i;
        if (!n || "string" != typeof n)return null;
        try {
            e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
        } catch (o) {
            r = t
        }
        return r && r.documentElement && !r.getElementsByTagName("parsererror").length || ct.error("Invalid XML: " + n), r
    }, noop: function () {
    }, globalEval: function (t) {
        t && ct.trim(t) && (e.execScript || function (t) {
            e.eval.call(e, t)
        })(t)
    }, camelCase: function (e) {
        return e.replace(xt, "ms-").replace(wt, Ct)
    }, nodeName: function (e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }, each: function (e, t, r) {
        var i, o = 0, a = e.length, s = n(e);
        if (r) {
            if (s)for (; a > o && (i = t.apply(e[o], r), i !== !1); o++); else for (o in e)if (i = t.apply(e[o], r), i === !1)break
        } else if (s)for (; a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++); else for (o in e)if (i = t.call(e[o], o, e[o]), i === !1)break;
        return e
    }, trim: ut && !ut.call("﻿ ") ? function (e) {
        return null == e ? "" : ut.call(e)
    } : function (e) {
        return null == e ? "" : (e + "").replace(pt, "")
    }, makeArray: function (e, t) {
        var r = t || [];
        return null != e && (n(Object(e)) ? ct.merge(r, "string" == typeof e ? [e] : e) : it.call(r, e)), r
    }, inArray: function (e, t, n) {
        var r;
        if (t) {
            if (at)return at.call(t, e, n);
            for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)if (n in t && t[n] === e)return n
        }
        return-1
    }, merge: function (e, n) {
        var r = n.length, i = e.length, o = 0;
        if ("number" == typeof r)for (; r > o; o++)e[i++] = n[o]; else for (; n[o] !== t;)e[i++] = n[o++];
        return e.length = i, e
    }, grep: function (e, t, n) {
        var r, i = [], o = 0, a = e.length;
        for (n = !!n; a > o; o++)r = !!t(e[o], o), n !== r && i.push(e[o]);
        return i
    }, map: function (e, t, r) {
        var i, o = 0, a = e.length, s = n(e), l = [];
        if (s)for (; a > o; o++)i = t(e[o], o, r), null != i && (l[l.length] = i); else for (o in e)i = t(e[o], o, r), null != i && (l[l.length] = i);
        return rt.apply([], l)
    }, guid: 1, proxy: function (e, n) {
        var r, i, o;
        return"string" == typeof n && (o = e[n], n = e, e = o), ct.isFunction(e) ? (r = ot.call(arguments, 2), i = function () {
            return e.apply(n || this, r.concat(ot.call(arguments)))
        }, i.guid = e.guid = e.guid || ct.guid++, i) : t
    }, access: function (e, n, r, i, o, a, s) {
        var l = 0, u = e.length, c = null == r;
        if ("object" === ct.type(r)) {
            o = !0;
            for (l in r)ct.access(e, n, l, r[l], !0, a, s)
        } else if (i !== t && (o = !0, ct.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function (e, t, n) {
            return c.call(ct(e), n)
        })), n))for (; u > l; l++)n(e[l], r, s ? i : i.call(e[l], l, n(e[l], r)));
        return o ? e : c ? n.call(e) : u ? n(e[0], r) : a
    }, now: function () {
        return(new Date).getTime()
    }, swap: function (e, t, n, r) {
        var i, o, a = {};
        for (o in t)a[o] = e.style[o], e.style[o] = t[o];
        i = n.apply(e, r || []);
        for (o in t)e.style[o] = a[o];
        return i
    }}), ct.ready.promise = function (t) {
        if (!U)if (U = ct.Deferred(), "complete" === G.readyState)setTimeout(ct.ready); else if (G.addEventListener)G.addEventListener("DOMContentLoaded", Tt, !1), e.addEventListener("load", Tt, !1); else {
            G.attachEvent("onreadystatechange", Tt), e.attachEvent("onload", Tt);
            var n = !1;
            try {
                n = null == e.frameElement && G.documentElement
            } catch (r) {
            }
            n && n.doScroll && function i() {
                if (!ct.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (e) {
                        return setTimeout(i, 50)
                    }
                    kt(), ct.ready()
                }
            }()
        }
        return U.promise(t)
    }, ct.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        et["[object " + t + "]"] = t.toLowerCase()
    }), V = ct(G), /*!
     * Sizzle CSS Selector Engine v1.9.4-pre
     * http://sizzlejs.com/
     *
     * Copyright 2013 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2013-05-27
     */
        function (e, t) {
            function n(e, t, n, r) {
                var i, o, a, s, l, u, c, f, d, p;
                if ((t ? t.ownerDocument || t : z) !== O && _(t), t = t || O, n = n || [], !e || "string" != typeof e)return n;
                if (1 !== (s = t.nodeType) && 9 !== s)return[];
                if (P && !r) {
                    if (i = Tt.exec(e))if (a = i[1]) {
                        if (9 === s) {
                            if (o = t.getElementById(a), !o || !o.parentNode)return n;
                            if (o.id === a)return n.push(o), n
                        } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && B(t, o) && o.id === a)return n.push(o), n
                    } else {
                        if (i[2])return it.apply(n, t.getElementsByTagName(e)), n;
                        if ((a = i[3]) && E.getElementsByClassName && t.getElementsByClassName)return it.apply(n, t.getElementsByClassName(a)), n
                    }
                    if (E.qsa && (!F || !F.test(e))) {
                        if (f = c = W, d = t, p = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                            for (u = m(e), (c = t.getAttribute("id")) ? f = c.replace(Nt, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", l = u.length; l--;)u[l] = f + g(u[l]);
                            d = yt.test(e) && t.parentNode || t, p = u.join(",")
                        }
                        if (p)try {
                            return it.apply(n, d.querySelectorAll(p)), n
                        } catch (h) {
                        } finally {
                            c || t.removeAttribute("id")
                        }
                    }
                }
                return k(e.replace(ht, "$1"), t, n, r)
            }

            function r(e) {
                return Ct.test(e + "")
            }

            function i() {
                function e(n, r) {
                    return t.push(n += " ") > A.cacheLength && delete e[t.shift()], e[n] = r
                }

                var t = [];
                return e
            }

            function o(e) {
                return e[W] = !0, e
            }

            function a(e) {
                var t = O.createElement("div");
                try {
                    return!!e(t)
                } catch (n) {
                    return!1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function s(e, t, n) {
                e = e.split("|");
                for (var r, i = e.length, o = n ? null : t; i--;)(r = A.attrHandle[e[i]]) && r !== t || (A.attrHandle[e[i]] = o)
            }

            function l(e, t) {
                var n = e.getAttributeNode(t);
                return n && n.specified ? n.value : e[t] === !0 ? t.toLowerCase() : null
            }

            function u(e, t) {
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }

            function c(e) {
                return"input" === e.nodeName.toLowerCase() ? e.defaultValue : void 0
            }

            function f(e, t) {
                var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Z) - (~e.sourceIndex || Z);
                if (r)return r;
                if (n)for (; n = n.nextSibling;)if (n === t)return-1;
                return e ? 1 : -1
            }

            function d(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return"input" === n && t.type === e
                }
            }

            function p(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return("input" === n || "button" === n) && t.type === e
                }
            }

            function h(e) {
                return o(function (t) {
                    return t = +t, o(function (n, r) {
                        for (var i, o = e([], n.length, t), a = o.length; a--;)n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }

            function m(e, t) {
                var r, i, o, a, s, l, u, c = Q[e + " "];
                if (c)return t ? 0 : c.slice(0);
                for (s = e, l = [], u = A.preFilter; s;) {
                    (!r || (i = mt.exec(s))) && (i && (s = s.slice(i[0].length) || s), l.push(o = [])), r = !1, (i = gt.exec(s)) && (r = i.shift(), o.push({value: r, type: i[0].replace(ht, " ")}), s = s.slice(r.length));
                    for (a in A.filter)!(i = wt[a].exec(s)) || u[a] && !(i = u[a](i)) || (r = i.shift(), o.push({value: r, type: a, matches: i}), s = s.slice(r.length));
                    if (!r)break
                }
                return t ? s.length : s ? n.error(e) : Q(e, l).slice(0)
            }

            function g(e) {
                for (var t = 0, n = e.length, r = ""; n > t; t++)r += e[t].value;
                return r
            }

            function y(e, t, n) {
                var r = t.dir, i = n && "parentNode" === r, o = U++;
                return t.first ? function (t, n, o) {
                    for (; t = t[r];)if (1 === t.nodeType || i)return e(t, n, o)
                } : function (t, n, a) {
                    var s, l, u, c = X + " " + o;
                    if (a) {
                        for (; t = t[r];)if ((1 === t.nodeType || i) && e(t, n, a))return!0
                    } else for (; t = t[r];)if (1 === t.nodeType || i)if (u = t[W] || (t[W] = {}), (l = u[r]) && l[0] === c) {
                        if ((s = l[1]) === !0 || s === j)return s === !0
                    } else if (l = u[r] = [c], l[1] = e(t, n, a) || j, l[1] === !0)return!0
                }
            }

            function v(e) {
                return e.length > 1 ? function (t, n, r) {
                    for (var i = e.length; i--;)if (!e[i](t, n, r))return!1;
                    return!0
                } : e[0]
            }

            function b(e, t, n, r, i) {
                for (var o, a = [], s = 0, l = e.length, u = null != t; l > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), u && t.push(s));
                return a
            }

            function x(e, t, n, r, i, a) {
                return r && !r[W] && (r = x(r)), i && !i[W] && (i = x(i, a)), o(function (o, a, s, l) {
                    var u, c, f, d = [], p = [], h = a.length, m = o || T(t || "*", s.nodeType ? [s] : s, []), g = !e || !o && t ? m : b(m, d, e, s, l), y = n ? i || (o ? e : h || r) ? [] : a : g;
                    if (n && n(g, y, s, l), r)for (u = b(y, p), r(u, [], s, l), c = u.length; c--;)(f = u[c]) && (y[p[c]] = !(g[p[c]] = f));
                    if (o) {
                        if (i || e) {
                            if (i) {
                                for (u = [], c = y.length; c--;)(f = y[c]) && u.push(g[c] = f);
                                i(null, y = [], u, l)
                            }
                            for (c = y.length; c--;)(f = y[c]) && (u = i ? at.call(o, f) : d[c]) > -1 && (o[u] = !(a[u] = f))
                        }
                    } else y = b(y === a ? y.splice(h, y.length) : y), i ? i(null, a, y, l) : it.apply(a, y)
                })
            }

            function w(e) {
                for (var t, n, r, i = e.length, o = A.relative[e[0].type], a = o || A.relative[" "], s = o ? 1 : 0, l = y(function (e) {
                    return e === t
                }, a, !0), u = y(function (e) {
                    return at.call(t, e) > -1
                }, a, !0), c = [function (e, n, r) {
                    return!o && (r || n !== H) || ((t = n).nodeType ? l(e, n, r) : u(e, n, r))
                }]; i > s; s++)if (n = A.relative[e[s].type])c = [y(v(c), n)]; else {
                    if (n = A.filter[e[s].type].apply(null, e[s].matches), n[W]) {
                        for (r = ++s; i > r && !A.relative[e[r].type]; r++);
                        return x(s > 1 && v(c), s > 1 && g(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(ht, "$1"), n, r > s && w(e.slice(s, r)), i > r && w(e = e.slice(r)), i > r && g(e))
                    }
                    c.push(n)
                }
                return v(c)
            }

            function C(e, t) {
                var r = 0, i = t.length > 0, a = e.length > 0, s = function (o, s, l, u, c) {
                    var f, d, p, h = [], m = 0, g = "0", y = o && [], v = null != c, x = H, w = o || a && A.find.TAG("*", c && s.parentNode || s), C = X += null == x ? 1 : Math.random() || .1;
                    for (v && (H = s !== O && s, j = r); null != (f = w[g]); g++) {
                        if (a && f) {
                            for (d = 0; p = e[d++];)if (p(f, s, l)) {
                                u.push(f);
                                break
                            }
                            v && (X = C, j = ++r)
                        }
                        i && ((f = !p && f) && m--, o && y.push(f))
                    }
                    if (m += g, i && g !== m) {
                        for (d = 0; p = t[d++];)p(y, h, s, l);
                        if (o) {
                            if (m > 0)for (; g--;)y[g] || h[g] || (h[g] = nt.call(u));
                            h = b(h)
                        }
                        it.apply(u, h), v && !o && h.length > 0 && m + t.length > 1 && n.uniqueSort(u)
                    }
                    return v && (X = C, H = x), y
                };
                return i ? o(s) : s
            }

            function T(e, t, r) {
                for (var i = 0, o = t.length; o > i; i++)n(e, t[i], r);
                return r
            }

            function k(e, t, n, r) {
                var i, o, a, s, l, u = m(e);
                if (!r && 1 === u.length) {
                    if (o = u[0] = u[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && E.getById && 9 === t.nodeType && P && A.relative[o[1].type]) {
                        if (t = (A.find.ID(a.matches[0].replace(Et, jt), t) || [])[0], !t)return n;
                        e = e.slice(o.shift().value.length)
                    }
                    for (i = wt.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !A.relative[s = a.type]);)if ((l = A.find[s]) && (r = l(a.matches[0].replace(Et, jt), yt.test(o[0].type) && t.parentNode || t))) {
                        if (o.splice(i, 1), e = r.length && g(o), !e)return it.apply(n, r), n;
                        break
                    }
                }
                return L(e, u)(r, t, !P, n, yt.test(e)), n
            }

            function S() {
            }

            var N, E, j, A, $, D, L, H, q, _, O, I, P, F, M, R, B, W = "sizzle" + -new Date, z = e.document, X = 0, U = 0, V = i(), Q = i(), Y = i(), G = !1, K = function () {
                return 0
            }, J = typeof t, Z = 1 << 31, et = {}.hasOwnProperty, tt = [], nt = tt.pop, rt = tt.push, it = tt.push, ot = tt.slice, at = tt.indexOf || function (e) {
                for (var t = 0, n = this.length; n > t; t++)if (this[t] === e)return t;
                return-1
            }, st = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", lt = "[\\x20\\t\\r\\n\\f]", ut = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ft = ut.replace("w", "w#"), dt = "\\[" + lt + "*(" + ut + ")" + lt + "*(?:([*^$|!~]?=)" + lt + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ft + ")|)|)" + lt + "*\\]", pt = ":(" + ut + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + dt.replace(3, 8) + ")*)|.*)\\)|)", ht = new RegExp("^" + lt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + lt + "+$", "g"), mt = new RegExp("^" + lt + "*," + lt + "*"), gt = new RegExp("^" + lt + "*([>+~]|" + lt + ")" + lt + "*"), yt = new RegExp(lt + "*[+~]"), vt = new RegExp("=" + lt + "*([^\\]'\"]*)" + lt + "*\\]", "g"), bt = new RegExp(pt), xt = new RegExp("^" + ft + "$"), wt = {ID: new RegExp("^#(" + ut + ")"), CLASS: new RegExp("^\\.(" + ut + ")"), TAG: new RegExp("^(" + ut.replace("w", "w*") + ")"), ATTR: new RegExp("^" + dt), PSEUDO: new RegExp("^" + pt), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + lt + "*(even|odd|(([+-]|)(\\d*)n|)" + lt + "*(?:([+-]|)" + lt + "*(\\d+)|))" + lt + "*\\)|)", "i"), bool: new RegExp("^(?:" + st + ")$", "i"), needsContext: new RegExp("^" + lt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + lt + "*((?:-\\d)?\\d*)" + lt + "*\\)|)(?=[^-]|$)", "i")}, Ct = /^[^{]+\{\s*\[native \w/, Tt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, kt = /^(?:input|select|textarea|button)$/i, St = /^h\d$/i, Nt = /'|\\/g, Et = new RegExp("\\\\([\\da-f]{1,6}" + lt + "?|(" + lt + ")|.)", "ig"), jt = function (e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r)
            };
            try {
                it.apply(tt = ot.call(z.childNodes), z.childNodes), tt[z.childNodes.length].nodeType
            } catch (At) {
                it = {apply: tt.length ? function (e, t) {
                    rt.apply(e, ot.call(t))
                } : function (e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }}
            }
            D = n.isXML = function (e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, E = n.support = {}, _ = n.setDocument = function (e) {
                var t = e ? e.ownerDocument || e : z, n = t.parentWindow;
                return t !== O && 9 === t.nodeType && t.documentElement ? (O = t, I = t.documentElement, P = !D(t), n && n.frameElement && n.attachEvent("onbeforeunload", function () {
                    _()
                }), E.attributes = a(function (e) {
                    return e.innerHTML = "<a href='#'></a>", s("type|href|height|width", u, "#" === e.firstChild.getAttribute("href")), s(st, l, null == e.getAttribute("disabled")), e.className = "i", !e.getAttribute("className")
                }), E.input = a(function (e) {
                    return e.innerHTML = "<input>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                }), s("value", c, E.attributes && E.input), E.getElementsByTagName = a(function (e) {
                    return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
                }), E.getElementsByClassName = a(function (e) {
                    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
                }), E.getById = a(function (e) {
                    return I.appendChild(e).id = W, !t.getElementsByName || !t.getElementsByName(W).length
                }), E.getById ? (A.find.ID = function (e, t) {
                    if (typeof t.getElementById !== J && P) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                }, A.filter.ID = function (e) {
                    var t = e.replace(Et, jt);
                    return function (e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete A.find.ID, A.filter.ID = function (e) {
                    var t = e.replace(Et, jt);
                    return function (e) {
                        var n = typeof e.getAttributeNode !== J && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), A.find.TAG = E.getElementsByTagName ? function (e, t) {
                    return typeof t.getElementsByTagName !== J ? t.getElementsByTagName(e) : void 0
                } : function (e, t) {
                    var n, r = [], i = 0, o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = o[i++];)1 === n.nodeType && r.push(n);
                        return r
                    }
                    return o
                }, A.find.CLASS = E.getElementsByClassName && function (e, t) {
                    return typeof t.getElementsByClassName !== J && P ? t.getElementsByClassName(e) : void 0
                }, M = [], F = [], (E.qsa = r(t.querySelectorAll)) && (a(function (e) {
                    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || F.push("\\[" + lt + "*(?:value|" + st + ")"), e.querySelectorAll(":checked").length || F.push(":checked")
                }), a(function (e) {
                    var n = t.createElement("input");
                    n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && F.push("[*^$]=" + lt + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || F.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), F.push(",.*:")
                })), (E.matchesSelector = r(R = I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && a(function (e) {
                    E.disconnectedMatch = R.call(e, "div"), R.call(e, "[s!='']:x"), M.push("!=", pt)
                }), F = F.length && new RegExp(F.join("|")), M = M.length && new RegExp(M.join("|")), B = r(I.contains) || I.compareDocumentPosition ? function (e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                } : function (e, t) {
                    if (t)for (; t = t.parentNode;)if (t === e)return!0;
                    return!1
                }, E.sortDetached = a(function (e) {
                    return 1 & e.compareDocumentPosition(t.createElement("div"))
                }), K = I.compareDocumentPosition ? function (e, n) {
                    if (e === n)return G = !0, 0;
                    var r = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
                    return r ? 1 & r || !E.sortDetached && n.compareDocumentPosition(e) === r ? e === t || B(z, e) ? -1 : n === t || B(z, n) ? 1 : q ? at.call(q, e) - at.call(q, n) : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
                } : function (e, n) {
                    var r, i = 0, o = e.parentNode, a = n.parentNode, s = [e], l = [n];
                    if (e === n)return G = !0, 0;
                    if (!o || !a)return e === t ? -1 : n === t ? 1 : o ? -1 : a ? 1 : q ? at.call(q, e) - at.call(q, n) : 0;
                    if (o === a)return f(e, n);
                    for (r = e; r = r.parentNode;)s.unshift(r);
                    for (r = n; r = r.parentNode;)l.unshift(r);
                    for (; s[i] === l[i];)i++;
                    return i ? f(s[i], l[i]) : s[i] === z ? -1 : l[i] === z ? 1 : 0
                }, t) : O
            }, n.matches = function (e, t) {
                return n(e, null, null, t)
            }, n.matchesSelector = function (e, t) {
                if ((e.ownerDocument || e) !== O && _(e), t = t.replace(vt, "='$1']"), !(!E.matchesSelector || !P || M && M.test(t) || F && F.test(t)))try {
                    var r = R.call(e, t);
                    if (r || E.disconnectedMatch || e.document && 11 !== e.document.nodeType)return r
                } catch (i) {
                }
                return n(t, O, null, [e]).length > 0
            }, n.contains = function (e, t) {
                return(e.ownerDocument || e) !== O && _(e), B(e, t)
            }, n.attr = function (e, n) {
                (e.ownerDocument || e) !== O && _(e);
                var r = A.attrHandle[n.toLowerCase()], i = r && et.call(A.attrHandle, n.toLowerCase()) ? r(e, n, !P) : t;
                return i === t ? E.attributes || !P ? e.getAttribute(n) : (i = e.getAttributeNode(n)) && i.specified ? i.value : null : i
            }, n.error = function (e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, n.uniqueSort = function (e) {
                var t, n = [], r = 0, i = 0;
                if (G = !E.detectDuplicates, q = !E.sortStable && e.slice(0), e.sort(K), G) {
                    for (; t = e[i++];)t === e[i] && (r = n.push(i));
                    for (; r--;)e.splice(n[r], 1)
                }
                return e
            }, $ = n.getText = function (e) {
                var t, n = "", r = 0, i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent)return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling)n += $(e)
                    } else if (3 === i || 4 === i)return e.nodeValue
                } else for (; t = e[r]; r++)n += $(t);
                return n
            }, A = n.selectors = {cacheLength: 50, createPseudo: o, match: wt, attrHandle: {}, find: {}, relative: {">": {dir: "parentNode", first: !0}, " ": {dir: "parentNode"}, "+": {dir: "previousSibling", first: !0}, "~": {dir: "previousSibling"}}, preFilter: {ATTR: function (e) {
                return e[1] = e[1].replace(Et, jt), e[3] = (e[4] || e[5] || "").replace(Et, jt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
            }, CHILD: function (e) {
                return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]), e
            }, PSEUDO: function (e) {
                var n, r = !e[5] && e[2];
                return wt.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && bt.test(r) && (n = m(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), e[2] = r.slice(0, n)), e.slice(0, 3))
            }}, filter: {TAG: function (e) {
                var t = e.replace(Et, jt).toLowerCase();
                return"*" === e ? function () {
                    return!0
                } : function (e) {
                    return e.nodeName && e.nodeName.toLowerCase() === t
                }
            }, CLASS: function (e) {
                var t = V[e + " "];
                return t || (t = new RegExp("(^|" + lt + ")" + e + "(" + lt + "|$)")) && V(e, function (e) {
                    return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== J && e.getAttribute("class") || "")
                })
            }, ATTR: function (e, t, r) {
                return function (i) {
                    var o = n.attr(i, e);
                    return null == o ? "!=" === t : t ? (o += "", "=" === t ? o === r : "!=" === t ? o !== r : "^=" === t ? r && 0 === o.indexOf(r) : "*=" === t ? r && o.indexOf(r) > -1 : "$=" === t ? r && o.slice(-r.length) === r : "~=" === t ? (" " + o + " ").indexOf(r) > -1 : "|=" === t ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
                }
            }, CHILD: function (e, t, n, r, i) {
                var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                return 1 === r && 0 === i ? function (e) {
                    return!!e.parentNode
                } : function (t, n, l) {
                    var u, c, f, d, p, h, m = o !== a ? "nextSibling" : "previousSibling", g = t.parentNode, y = s && t.nodeName.toLowerCase(), v = !l && !s;
                    if (g) {
                        if (o) {
                            for (; m;) {
                                for (f = t; f = f[m];)if (s ? f.nodeName.toLowerCase() === y : 1 === f.nodeType)return!1;
                                h = m = "only" === e && !h && "nextSibling"
                            }
                            return!0
                        }
                        if (h = [a ? g.firstChild : g.lastChild], a && v) {
                            for (c = g[W] || (g[W] = {}), u = c[e] || [], p = u[0] === X && u[1], d = u[0] === X && u[2], f = p && g.childNodes[p]; f = ++p && f && f[m] || (d = p = 0) || h.pop();)if (1 === f.nodeType && ++d && f === t) {
                                c[e] = [X, p, d];
                                break
                            }
                        } else if (v && (u = (t[W] || (t[W] = {}))[e]) && u[0] === X)d = u[1]; else for (; (f = ++p && f && f[m] || (d = p = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== y : 1 !== f.nodeType) || !++d || (v && ((f[W] || (f[W] = {}))[e] = [X, d]), f !== t)););
                        return d -= i, d === r || 0 === d % r && d / r >= 0
                    }
                }
            }, PSEUDO: function (e, t) {
                var r, i = A.pseudos[e] || A.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
                return i[W] ? i(t) : i.length > 1 ? (r = [e, e, "", t], A.setFilters.hasOwnProperty(e.toLowerCase()) ? o(function (e, n) {
                    for (var r, o = i(e, t), a = o.length; a--;)r = at.call(e, o[a]), e[r] = !(n[r] = o[a])
                }) : function (e) {
                    return i(e, 0, r)
                }) : i
            }}, pseudos: {not: o(function (e) {
                var t = [], n = [], r = L(e.replace(ht, "$1"));
                return r[W] ? o(function (e, t, n, i) {
                    for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                }) : function (e, i, o) {
                    return t[0] = e, r(t, null, o, n), !n.pop()
                }
            }), has: o(function (e) {
                return function (t) {
                    return n(e, t).length > 0
                }
            }), contains: o(function (e) {
                return function (t) {
                    return(t.textContent || t.innerText || $(t)).indexOf(e) > -1
                }
            }), lang: o(function (e) {
                return xt.test(e || "") || n.error("unsupported lang: " + e), e = e.replace(Et, jt).toLowerCase(), function (t) {
                    var n;
                    do if (n = P ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                    return!1
                }
            }), target: function (t) {
                var n = e.location && e.location.hash;
                return n && n.slice(1) === t.id
            }, root: function (e) {
                return e === I
            }, focus: function (e) {
                return e === O.activeElement && (!O.hasFocus || O.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
            }, enabled: function (e) {
                return e.disabled === !1
            }, disabled: function (e) {
                return e.disabled === !0
            }, checked: function (e) {
                var t = e.nodeName.toLowerCase();
                return"input" === t && !!e.checked || "option" === t && !!e.selected
            }, selected: function (e) {
                return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
            }, empty: function (e) {
                for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType)return!1;
                return!0
            }, parent: function (e) {
                return!A.pseudos.empty(e)
            }, header: function (e) {
                return St.test(e.nodeName)
            }, input: function (e) {
                return kt.test(e.nodeName)
            }, button: function (e) {
                var t = e.nodeName.toLowerCase();
                return"input" === t && "button" === e.type || "button" === t
            }, text: function (e) {
                var t;
                return"input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
            }, first: h(function () {
                return[0]
            }), last: h(function (e, t) {
                return[t - 1]
            }), eq: h(function (e, t, n) {
                return[0 > n ? n + t : n]
            }), even: h(function (e, t) {
                for (var n = 0; t > n; n += 2)e.push(n);
                return e
            }), odd: h(function (e, t) {
                for (var n = 1; t > n; n += 2)e.push(n);
                return e
            }), lt: h(function (e, t, n) {
                for (var r = 0 > n ? n + t : n; --r >= 0;)e.push(r);
                return e
            }), gt: h(function (e, t, n) {
                for (var r = 0 > n ? n + t : n; ++r < t;)e.push(r);
                return e
            })}};
            for (N in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})A.pseudos[N] = d(N);
            for (N in{submit: !0, reset: !0})A.pseudos[N] = p(N);
            L = n.compile = function (e, t) {
                var n, r = [], i = [], o = Y[e + " "];
                if (!o) {
                    for (t || (t = m(e)), n = t.length; n--;)o = w(t[n]), o[W] ? r.push(o) : i.push(o);
                    o = Y(e, C(i, r))
                }
                return o
            }, A.pseudos.nth = A.pseudos.eq, S.prototype = A.filters = A.pseudos, A.setFilters = new S, E.sortStable = W.split("").sort(K).join("") === W, _(), [0, 0].sort(K), E.detectDuplicates = G, ct.find = n, ct.expr = n.selectors, ct.expr[":"] = ct.expr.pseudos, ct.unique = n.uniqueSort, ct.text = n.getText, ct.isXMLDoc = n.isXML, ct.contains = n.contains
        }(e);
    var St = {};
    ct.Callbacks = function (e) {
        e = "string" == typeof e ? St[e] || r(e) : ct.extend({}, e);
        var n, i, o, a, s, l, u = [], c = !e.once && [], f = function (t) {
            for (i = e.memory && t, o = !0, s = l || 0, l = 0, a = u.length, n = !0; u && a > s; s++)if (u[s].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                i = !1;
                break
            }
            n = !1, u && (c ? c.length && f(c.shift()) : i ? u = [] : d.disable())
        }, d = {add: function () {
            if (u) {
                var t = u.length;
                !function r(t) {
                    ct.each(t, function (t, n) {
                        var i = ct.type(n);
                        "function" === i ? e.unique && d.has(n) || u.push(n) : n && n.length && "string" !== i && r(n)
                    })
                }(arguments), n ? a = u.length : i && (l = t, f(i))
            }
            return this
        }, remove: function () {
            return u && ct.each(arguments, function (e, t) {
                for (var r; (r = ct.inArray(t, u, r)) > -1;)u.splice(r, 1), n && (a >= r && a--, s >= r && s--)
            }), this
        }, has: function (e) {
            return e ? ct.inArray(e, u) > -1 : !(!u || !u.length)
        }, empty: function () {
            return u = [], a = 0, this
        }, disable: function () {
            return u = c = i = t, this
        }, disabled: function () {
            return!u
        }, lock: function () {
            return c = t, i || d.disable(), this
        }, locked: function () {
            return!c
        }, fireWith: function (e, t) {
            return t = t || [], t = [e, t.slice ? t.slice() : t], !u || o && !c || (n ? c.push(t) : f(t)), this
        }, fire: function () {
            return d.fireWith(this, arguments), this
        }, fired: function () {
            return!!o
        }};
        return d
    }, ct.extend({Deferred: function (e) {
        var t = [
            ["resolve", "done", ct.Callbacks("once memory"), "resolved"],
            ["reject", "fail", ct.Callbacks("once memory"), "rejected"],
            ["notify", "progress", ct.Callbacks("memory")]
        ], n = "pending", r = {state: function () {
            return n
        }, always: function () {
            return i.done(arguments).fail(arguments), this
        }, then: function () {
            var e = arguments;
            return ct.Deferred(function (n) {
                ct.each(t, function (t, o) {
                    var a = o[0], s = ct.isFunction(e[t]) && e[t];
                    i[o[1]](function () {
                        var e = s && s.apply(this, arguments);
                        e && ct.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments)
                    })
                }), e = null
            }).promise()
        }, promise: function (e) {
            return null != e ? ct.extend(e, r) : r
        }}, i = {};
        return r.pipe = r.then, ct.each(t, function (e, o) {
            var a = o[2], s = o[3];
            r[o[1]] = a.add, s && a.add(function () {
                n = s
            }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
                return i[o[0] + "With"](this === i ? r : this, arguments), this
            }, i[o[0] + "With"] = a.fireWith
        }), r.promise(i), e && e.call(i, i), i
    }, when: function (e) {
        var t, n, r, i = 0, o = ot.call(arguments), a = o.length, s = 1 !== a || e && ct.isFunction(e.promise) ? a : 0, l = 1 === s ? e : ct.Deferred(), u = function (e, n, r) {
            return function (i) {
                n[e] = this, r[e] = arguments.length > 1 ? ot.call(arguments) : i, r === t ? l.notifyWith(n, r) : --s || l.resolveWith(n, r)
            }
        };
        if (a > 1)for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++)o[i] && ct.isFunction(o[i].promise) ? o[i].promise().done(u(i, r, o)).fail(l.reject).progress(u(i, n, t)) : --s;
        return s || l.resolveWith(r, o), l.promise()
    }}), ct.support = function (t) {
        var n, r, i, o, a, s, l, u, c, f = G.createElement("div");
        if (f.setAttribute("className", "t"), f.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = f.getElementsByTagName("*") || [], r = f.getElementsByTagName("a")[0], !r || !r.style || !n.length)return t;
        o = G.createElement("select"), s = o.appendChild(G.createElement("option")), i = f.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== f.className, t.leadingWhitespace = 3 === f.firstChild.nodeType, t.tbody = !f.getElementsByTagName("tbody").length, t.htmlSerialize = !!f.getElementsByTagName("link").length, t.style = /top/.test(r.getAttribute("style")), t.hrefNormalized = "/a" === r.getAttribute("href"), t.opacity = /^0.5/.test(r.style.opacity), t.cssFloat = !!r.style.cssFloat, t.checkOn = !!i.value, t.optSelected = s.selected, t.enctype = !!G.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== G.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, i.checked = !0, t.noCloneChecked = i.cloneNode(!0).checked, o.disabled = !0, t.optDisabled = !s.disabled;
        try {
            delete f.test
        } catch (d) {
            t.deleteExpando = !1
        }
        i = G.createElement("input"), i.setAttribute("value", ""), t.input = "" === i.getAttribute("value"), i.value = "t", i.setAttribute("type", "radio"), t.radioValue = "t" === i.value, i.setAttribute("checked", "t"), i.setAttribute("name", "t"), a = G.createDocumentFragment(), a.appendChild(i), t.appendChecked = i.checked, t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, f.attachEvent && (f.attachEvent("onclick", function () {
            t.noCloneEvent = !1
        }), f.cloneNode(!0).click());
        for (c in{submit: !0, change: !0, focusin: !0})f.setAttribute(l = "on" + c, "t"), t[c + "Bubbles"] = l in e || f.attributes[l].expando === !1;
        f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === f.style.backgroundClip;
        for (c in ct(t))break;
        return t.ownLast = "0" !== c, ct(function () {
            var n, r, i, o = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", a = G.getElementsByTagName("body")[0];
            a && (n = G.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(f), f.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = f.getElementsByTagName("td"), i[0].style.cssText = "padding:0;margin:0;border:0;display:none", u = 0 === i[0].offsetHeight, i[0].style.display = "", i[1].style.display = "none", t.reliableHiddenOffsets = u && 0 === i[0].offsetHeight, f.innerHTML = "", f.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", ct.swap(a, null != a.style.zoom ? {zoom: 1} : {}, function () {
                t.boxSizing = 4 === f.offsetWidth
            }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(f, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(f, null) || {width: "4px"}).width, r = f.appendChild(G.createElement("div")), r.style.cssText = f.style.cssText = o, r.style.marginRight = r.style.width = "0", f.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof f.style.zoom !== Q && (f.innerHTML = "", f.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === f.offsetWidth, f.style.display = "block", f.innerHTML = "<div></div>", f.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== f.offsetWidth, t.inlineBlockNeedsLayout && (a.style.zoom = 1)), a.removeChild(n), n = f = i = r = null)
        }), n = o = a = s = r = i = null, t
    }({});
    var Nt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, Et = /([A-Z])/g;
    ct.extend({cache: {}, noData: {applet: !0, embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"}, hasData: function (e) {
        return e = e.nodeType ? ct.cache[e[ct.expando]] : e[ct.expando], !!e && !s(e)
    }, data: function (e, t, n) {
        return i(e, t, n)
    }, removeData: function (e, t) {
        return o(e, t)
    }, _data: function (e, t, n) {
        return i(e, t, n, !0)
    }, _removeData: function (e, t) {
        return o(e, t, !0)
    }, acceptData: function (e) {
        if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType)return!1;
        var t = e.nodeName && ct.noData[e.nodeName.toLowerCase()];
        return!t || t !== !0 && e.getAttribute("classid") === t
    }}), ct.fn.extend({data: function (e, n) {
        var r, i, o = null, s = 0, l = this[0];
        if (e === t) {
            if (this.length && (o = ct.data(l), 1 === l.nodeType && !ct._data(l, "parsedAttrs"))) {
                for (r = l.attributes; s < r.length; s++)i = r[s].name, 0 === i.indexOf("data-") && (i = ct.camelCase(i.slice(5)), a(l, i, o[i]));
                ct._data(l, "parsedAttrs", !0)
            }
            return o
        }
        return"object" == typeof e ? this.each(function () {
            ct.data(this, e)
        }) : arguments.length > 1 ? this.each(function () {
            ct.data(this, e, n)
        }) : l ? a(l, e, ct.data(l, e)) : null
    }, removeData: function (e) {
        return this.each(function () {
            ct.removeData(this, e)
        })
    }}), ct.extend({queue: function (e, t, n) {
        var r;
        return e ? (t = (t || "fx") + "queue", r = ct._data(e, t), n && (!r || ct.isArray(n) ? r = ct._data(e, t, ct.makeArray(n)) : r.push(n)), r || []) : void 0
    }, dequeue: function (e, t) {
        t = t || "fx";
        var n = ct.queue(e, t), r = n.length, i = n.shift(), o = ct._queueHooks(e, t), a = function () {
            ct.dequeue(e, t)
        };
        "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
    }, _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return ct._data(e, n) || ct._data(e, n, {empty: ct.Callbacks("once memory").add(function () {
            ct._removeData(e, t + "queue"), ct._removeData(e, n)
        })})
    }}), ct.fn.extend({queue: function (e, n) {
        var r = 2;
        return"string" != typeof e && (n = e, e = "fx", r--), arguments.length < r ? ct.queue(this[0], e) : n === t ? this : this.each(function () {
            var t = ct.queue(this, e, n);
            ct._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && ct.dequeue(this, e)
        })
    }, dequeue: function (e) {
        return this.each(function () {
            ct.dequeue(this, e)
        })
    }, delay: function (e, t) {
        return e = ct.fx ? ct.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var r = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(r)
            }
        })
    }, clearQueue: function (e) {
        return this.queue(e || "fx", [])
    }, promise: function (e, n) {
        var r, i = 1, o = ct.Deferred(), a = this, s = this.length, l = function () {
            --i || o.resolveWith(a, [a])
        };
        for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--;)r = ct._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(l));
        return l(), o.promise(n)
    }});
    var jt, At, $t = /[\t\r\n\f]/g, Dt = /\r/g, Lt = /^(?:input|select|textarea|button|object)$/i, Ht = /^(?:a|area)$/i, qt = /^(?:checked|selected)$/i, _t = ct.support.getSetAttribute, Ot = ct.support.input;
    ct.fn.extend({attr: function (e, t) {
        return ct.access(this, ct.attr, e, t, arguments.length > 1)
    }, removeAttr: function (e) {
        return this.each(function () {
            ct.removeAttr(this, e)
        })
    }, prop: function (e, t) {
        return ct.access(this, ct.prop, e, t, arguments.length > 1)
    }, removeProp: function (e) {
        return e = ct.propFix[e] || e, this.each(function () {
            try {
                this[e] = t, delete this[e]
            } catch (n) {
            }
        })
    }, addClass: function (e) {
        var t, n, r, i, o, a = 0, s = this.length, l = "string" == typeof e && e;
        if (ct.isFunction(e))return this.each(function (t) {
            ct(this).addClass(e.call(this, t, this.className))
        });
        if (l)for (t = (e || "").match(dt) || []; s > a; a++)if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace($t, " ") : " ")) {
            for (o = 0; i = t[o++];)r.indexOf(" " + i + " ") < 0 && (r += i + " ");
            n.className = ct.trim(r)
        }
        return this
    }, removeClass: function (e) {
        var t, n, r, i, o, a = 0, s = this.length, l = 0 === arguments.length || "string" == typeof e && e;
        if (ct.isFunction(e))return this.each(function (t) {
            ct(this).removeClass(e.call(this, t, this.className))
        });
        if (l)for (t = (e || "").match(dt) || []; s > a; a++)if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace($t, " ") : "")) {
            for (o = 0; i = t[o++];)for (; r.indexOf(" " + i + " ") >= 0;)r = r.replace(" " + i + " ", " ");
            n.className = e ? ct.trim(r) : ""
        }
        return this
    }, toggleClass: function (e, t) {
        var n = typeof e, r = "boolean" == typeof t;
        return ct.isFunction(e) ? this.each(function (n) {
            ct(this).toggleClass(e.call(this, n, this.className, t), t)
        }) : this.each(function () {
            if ("string" === n)for (var i, o = 0, a = ct(this), s = t, l = e.match(dt) || []; i = l[o++];)s = r ? s : !a.hasClass(i), a[s ? "addClass" : "removeClass"](i); else(n === Q || "boolean" === n) && (this.className && ct._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ct._data(this, "__className__") || "")
        })
    }, hasClass: function (e) {
        for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace($t, " ").indexOf(t) >= 0)return!0;
        return!1
    }, val: function (e) {
        var n, r, i, o = this[0];
        {
            if (arguments.length)return i = ct.isFunction(e), this.each(function (n) {
                var o;
                1 === this.nodeType && (o = i ? e.call(this, n, ct(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : ct.isArray(o) && (o = ct.map(o, function (e) {
                    return null == e ? "" : e + ""
                })), r = ct.valHooks[this.type] || ct.valHooks[this.nodeName.toLowerCase()], r && "set"in r && r.set(this, o, "value") !== t || (this.value = o))
            });
            if (o)return r = ct.valHooks[o.type] || ct.valHooks[o.nodeName.toLowerCase()], r && "get"in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(Dt, "") : null == n ? "" : n)
        }
    }}), ct.extend({valHooks: {option: {get: function (e) {
        var t = ct.find.attr(e, "value");
        return null != t ? t : e.text
    }}, select: {get: function (e) {
        for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, l = 0 > i ? s : o ? i : 0; s > l; l++)if (n = r[l], !(!n.selected && l !== i || (ct.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ct.nodeName(n.parentNode, "optgroup"))) {
            if (t = ct(n).val(), o)return t;
            a.push(t)
        }
        return a
    }, set: function (e, t) {
        for (var n, r, i = e.options, o = ct.makeArray(t), a = i.length; a--;)r = i[a], (r.selected = ct.inArray(ct(r).val(), o) >= 0) && (n = !0);
        return n || (e.selectedIndex = -1), o
    }}}, attr: function (e, n, r) {
        var i, o, a = e.nodeType;
        if (e && 3 !== a && 8 !== a && 2 !== a)return typeof e.getAttribute === Q ? ct.prop(e, n, r) : (1 === a && ct.isXMLDoc(e) || (n = n.toLowerCase(), i = ct.attrHooks[n] || (ct.expr.match.bool.test(n) ? At : jt)), r === t ? i && "get"in i && null !== (o = i.get(e, n)) ? o : (o = ct.find.attr(e, n), null == o ? t : o) : null !== r ? i && "set"in i && (o = i.set(e, r, n)) !== t ? o : (e.setAttribute(n, r + ""), r) : (ct.removeAttr(e, n), void 0))
    }, removeAttr: function (e, t) {
        var n, r, i = 0, o = t && t.match(dt);
        if (o && 1 === e.nodeType)for (; n = o[i++];)r = ct.propFix[n] || n, ct.expr.match.bool.test(n) ? Ot && _t || !qt.test(n) ? e[r] = !1 : e[ct.camelCase("default-" + n)] = e[r] = !1 : ct.attr(e, n, ""), e.removeAttribute(_t ? n : r)
    }, attrHooks: {type: {set: function (e, t) {
        if (!ct.support.radioValue && "radio" === t && ct.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
        }
    }}}, propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, n, r) {
        var i, o, a, s = e.nodeType;
        if (e && 3 !== s && 8 !== s && 2 !== s)return a = 1 !== s || !ct.isXMLDoc(e), a && (n = ct.propFix[n] || n, o = ct.propHooks[n]), r !== t ? o && "set"in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get"in o && null !== (i = o.get(e, n)) ? i : e[n]
    }, propHooks: {tabIndex: {get: function (e) {
        var t = ct.find.attr(e, "tabindex");
        return t ? parseInt(t, 10) : Lt.test(e.nodeName) || Ht.test(e.nodeName) && e.href ? 0 : -1
    }}}}), At = {set: function (e, t, n) {
        return t === !1 ? ct.removeAttr(e, n) : Ot && _t || !qt.test(n) ? e.setAttribute(!_t && ct.propFix[n] || n, n) : e[ct.camelCase("default-" + n)] = e[n] = !0, n
    }}, ct.each(ct.expr.match.bool.source.match(/\w+/g), function (e, n) {
        var r = ct.expr.attrHandle[n] || ct.find.attr;
        ct.expr.attrHandle[n] = Ot && _t || !qt.test(n) ? function (e, n, i) {
            var o = ct.expr.attrHandle[n], a = i ? t : (ct.expr.attrHandle[n] = t) != r(e, n, i) ? n.toLowerCase() : null;
            return ct.expr.attrHandle[n] = o, a
        } : function (e, n, r) {
            return r ? t : e[ct.camelCase("default-" + n)] ? n.toLowerCase() : null
        }
    }), Ot && _t || (ct.attrHooks.value = {set: function (e, t, n) {
        return ct.nodeName(e, "input") ? (e.defaultValue = t, void 0) : jt && jt.set(e, t, n)
    }}), _t || (jt = {set: function (e, n, r) {
        var i = e.getAttributeNode(r);
        return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t
    }}, ct.expr.attrHandle.id = ct.expr.attrHandle.name = ct.expr.attrHandle.coords = function (e, n, r) {
        var i;
        return r ? t : (i = e.getAttributeNode(n)) && "" !== i.value ? i.value : null
    }, ct.valHooks.button = {get: function (e, n) {
        var r = e.getAttributeNode(n);
        return r && r.specified ? r.value : t
    }, set: jt.set}, ct.attrHooks.contenteditable = {set: function (e, t, n) {
        jt.set(e, "" === t ? !1 : t, n)
    }}, ct.each(["width", "height"], function (e, t) {
        ct.attrHooks[t] = {set: function (e, n) {
            return"" === n ? (e.setAttribute(t, "auto"), n) : void 0
        }}
    })), ct.support.hrefNormalized || ct.each(["href", "src"], function (e, t) {
        ct.propHooks[t] = {get: function (e) {
            return e.getAttribute(t, 4)
        }}
    }), ct.support.style || (ct.attrHooks.style = {get: function (e) {
        return e.style.cssText || t
    }, set: function (e, t) {
        return e.style.cssText = t + ""
    }}), ct.support.optSelected || (ct.propHooks.selected = {get: function (e) {
        var t = e.parentNode;
        return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
    }}), ct.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        ct.propFix[this.toLowerCase()] = this
    }), ct.support.enctype || (ct.propFix.enctype = "encoding"), ct.each(["radio", "checkbox"], function () {
        ct.valHooks[this] = {set: function (e, t) {
            return ct.isArray(t) ? e.checked = ct.inArray(ct(e).val(), t) >= 0 : void 0
        }}, ct.support.checkOn || (ct.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var It = /^(?:input|select|textarea)$/i, Pt = /^key/, Ft = /^(?:mouse|contextmenu)|click/, Mt = /^(?:focusinfocus|focusoutblur)$/, Rt = /^([^.]*)(?:\.(.+)|)$/;
    ct.event = {global: {}, add: function (e, n, r, i, o) {
        var a, s, l, u, c, f, d, p, h, m, g, y = ct._data(e);
        if (y) {
            for (r.handler && (u = r, r = u.handler, o = u.selector), r.guid || (r.guid = ct.guid++), (s = y.events) || (s = y.events = {}), (f = y.handle) || (f = y.handle = function (e) {
                return typeof ct === Q || e && ct.event.triggered === e.type ? t : ct.event.dispatch.apply(f.elem, arguments)
            }, f.elem = e), n = (n || "").match(dt) || [""], l = n.length; l--;)a = Rt.exec(n[l]) || [], h = g = a[1], m = (a[2] || "").split(".").sort(), h && (c = ct.event.special[h] || {}, h = (o ? c.delegateType : c.bindType) || h, c = ct.event.special[h] || {}, d = ct.extend({type: h, origType: g, data: i, handler: r, guid: r.guid, selector: o, needsContext: o && ct.expr.match.needsContext.test(o), namespace: m.join(".")}, u), (p = s[h]) || (p = s[h] = [], p.delegateCount = 0, c.setup && c.setup.call(e, i, m, f) !== !1 || (e.addEventListener ? e.addEventListener(h, f, !1) : e.attachEvent && e.attachEvent("on" + h, f))), c.add && (c.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)), o ? p.splice(p.delegateCount++, 0, d) : p.push(d), ct.event.global[h] = !0);
            e = null
        }
    }, remove: function (e, t, n, r, i) {
        var o, a, s, l, u, c, f, d, p, h, m, g = ct.hasData(e) && ct._data(e);
        if (g && (c = g.events)) {
            for (t = (t || "").match(dt) || [""], u = t.length; u--;)if (s = Rt.exec(t[u]) || [], p = m = s[1], h = (s[2] || "").split(".").sort(), p) {
                for (f = ct.event.special[p] || {}, p = (r ? f.delegateType : f.bindType) || p, d = c[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = d.length; o--;)a = d[o], !i && m !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (d.splice(o, 1), a.selector && d.delegateCount--, f.remove && f.remove.call(e, a));
                l && !d.length && (f.teardown && f.teardown.call(e, h, g.handle) !== !1 || ct.removeEvent(e, p, g.handle), delete c[p])
            } else for (p in c)ct.event.remove(e, p + t[u], n, r, !0);
            ct.isEmptyObject(c) && (delete g.handle, ct._removeData(e, "events"))
        }
    }, trigger: function (n, r, i, o) {
        var a, s, l, u, c, f, d, p = [i || G], h = lt.call(n, "type") ? n.type : n, m = lt.call(n, "namespace") ? n.namespace.split(".") : [];
        if (l = f = i = i || G, 3 !== i.nodeType && 8 !== i.nodeType && !Mt.test(h + ct.event.triggered) && (h.indexOf(".") >= 0 && (m = h.split("."), h = m.shift(), m.sort()), s = h.indexOf(":") < 0 && "on" + h, n = n[ct.expando] ? n : new ct.Event(h, "object" == typeof n && n), n.isTrigger = o ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : ct.makeArray(r, [n]), c = ct.event.special[h] || {}, o || !c.trigger || c.trigger.apply(i, r) !== !1)) {
            if (!o && !c.noBubble && !ct.isWindow(i)) {
                for (u = c.delegateType || h, Mt.test(u + h) || (l = l.parentNode); l; l = l.parentNode)p.push(l), f = l;
                f === (i.ownerDocument || G) && p.push(f.defaultView || f.parentWindow || e)
            }
            for (d = 0; (l = p[d++]) && !n.isPropagationStopped();)n.type = d > 1 ? u : c.bindType || h, a = (ct._data(l, "events") || {})[n.type] && ct._data(l, "handle"), a && a.apply(l, r), a = s && l[s], a && ct.acceptData(l) && a.apply && a.apply(l, r) === !1 && n.preventDefault();
            if (n.type = h, !o && !n.isDefaultPrevented() && (!c._default || c._default.apply(p.pop(), r) === !1) && ct.acceptData(i) && s && i[h] && !ct.isWindow(i)) {
                f = i[s], f && (i[s] = null), ct.event.triggered = h;
                try {
                    i[h]()
                } catch (g) {
                }
                ct.event.triggered = t, f && (i[s] = f)
            }
            return n.result
        }
    }, dispatch: function (e) {
        e = ct.event.fix(e);
        var n, r, i, o, a, s = [], l = ot.call(arguments), u = (ct._data(this, "events") || {})[e.type] || [], c = ct.event.special[e.type] || {};
        if (l[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
            for (s = ct.event.handlers.call(this, e, u), n = 0; (o = s[n++]) && !e.isPropagationStopped();)for (e.currentTarget = o.elem, a = 0; (i = o.handlers[a++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((ct.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, l), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
            return c.postDispatch && c.postDispatch.call(this, e), e.result
        }
    }, handlers: function (e, n) {
        var r, i, o, a, s = [], l = n.delegateCount, u = e.target;
        if (l && u.nodeType && (!e.button || "click" !== e.type))for (; u != this; u = u.parentNode || this)if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
            for (o = [], a = 0; l > a; a++)i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? ct(r, this).index(u) >= 0 : ct.find(r, this, null, [u]).length), o[r] && o.push(i);
            o.length && s.push({elem: u, handlers: o})
        }
        return l < n.length && s.push({elem: this, handlers: n.slice(l)}), s
    }, fix: function (e) {
        if (e[ct.expando])return e;
        var t, n, r, i = e.type, o = e, a = this.fixHooks[i];
        for (a || (this.fixHooks[i] = a = Ft.test(i) ? this.mouseHooks : Pt.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new ct.Event(o), t = r.length; t--;)n = r[t], e[n] = o[n];
        return e.target || (e.target = o.srcElement || G), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: {props: "char charCode key keyCode".split(" "), filter: function (e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
    }}, mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (e, n) {
        var r, i, o, a = n.button, s = n.fromElement;
        return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || G, o = i.documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement : s), e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
    }}, special: {load: {noBubble: !0}, focus: {trigger: function () {
        if (this !== c() && this.focus)try {
            return this.focus(), !1
        } catch (e) {
        }
    }, delegateType: "focusin"}, blur: {trigger: function () {
        return this === c() && this.blur ? (this.blur(), !1) : void 0
    }, delegateType: "focusout"}, click: {trigger: function () {
        return ct.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
    }, _default: function (e) {
        return ct.nodeName(e.target, "a")
    }}, beforeunload: {postDispatch: function (e) {
        e.result !== t && (e.originalEvent.returnValue = e.result)
    }}}, simulate: function (e, t, n, r) {
        var i = ct.extend(new ct.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
        r ? ct.event.trigger(i, null, t) : ct.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
    }}, ct.removeEvent = G.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === Q && (e[r] = null), e.detachEvent(r, n))
    }, ct.Event = function (e, t) {
        return this instanceof ct.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? l : u) : this.type = e, t && ct.extend(this, t), this.timeStamp = e && e.timeStamp || ct.now(), this[ct.expando] = !0, void 0) : new ct.Event(e, t)
    }, ct.Event.prototype = {isDefaultPrevented: u, isPropagationStopped: u, isImmediatePropagationStopped: u, preventDefault: function () {
        var e = this.originalEvent;
        this.isDefaultPrevented = l, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
    }, stopPropagation: function () {
        var e = this.originalEvent;
        this.isPropagationStopped = l, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
    }, stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = l, this.stopPropagation()
    }}, ct.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (e, t) {
        ct.event.special[e] = {delegateType: t, bindType: t, handle: function (e) {
            var n, r = this, i = e.relatedTarget, o = e.handleObj;
            return(!i || i !== r && !ct.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
        }}
    }), ct.support.submitBubbles || (ct.event.special.submit = {setup: function () {
        return ct.nodeName(this, "form") ? !1 : (ct.event.add(this, "click._submit keypress._submit", function (e) {
            var n = e.target, r = ct.nodeName(n, "input") || ct.nodeName(n, "button") ? n.form : t;
            r && !ct._data(r, "submitBubbles") && (ct.event.add(r, "submit._submit", function (e) {
                e._submit_bubble = !0
            }), ct._data(r, "submitBubbles", !0))
        }), void 0)
    }, postDispatch: function (e) {
        e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ct.event.simulate("submit", this.parentNode, e, !0))
    }, teardown: function () {
        return ct.nodeName(this, "form") ? !1 : (ct.event.remove(this, "._submit"), void 0)
    }}), ct.support.changeBubbles || (ct.event.special.change = {setup: function () {
        return It.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ct.event.add(this, "propertychange._change", function (e) {
            "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
        }), ct.event.add(this, "click._change", function (e) {
            this._just_changed && !e.isTrigger && (this._just_changed = !1), ct.event.simulate("change", this, e, !0)
        })), !1) : (ct.event.add(this, "beforeactivate._change", function (e) {
            var t = e.target;
            It.test(t.nodeName) && !ct._data(t, "changeBubbles") && (ct.event.add(t, "change._change", function (e) {
                !this.parentNode || e.isSimulated || e.isTrigger || ct.event.simulate("change", this.parentNode, e, !0)
            }), ct._data(t, "changeBubbles", !0))
        }), void 0)
    }, handle: function (e) {
        var t = e.target;
        return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
    }, teardown: function () {
        return ct.event.remove(this, "._change"), !It.test(this.nodeName)
    }}), ct.support.focusinBubbles || ct.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = 0, r = function (e) {
            ct.event.simulate(t, e.target, ct.event.fix(e), !0)
        };
        ct.event.special[t] = {setup: function () {
            0 === n++ && G.addEventListener(e, r, !0)
        }, teardown: function () {
            0 === --n && G.removeEventListener(e, r, !0)
        }}
    }), ct.fn.extend({on: function (e, n, r, i, o) {
        var a, s;
        if ("object" == typeof e) {
            "string" != typeof n && (r = r || n, n = t);
            for (a in e)this.on(a, n, r, e[a], o);
            return this
        }
        if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1)i = u; else if (!i)return this;
        return 1 === o && (s = i, i = function (e) {
            return ct().off(e), s.apply(this, arguments)
        }, i.guid = s.guid || (s.guid = ct.guid++)), this.each(function () {
            ct.event.add(this, e, i, r, n)
        })
    }, one: function (e, t, n, r) {
        return this.on(e, t, n, r, 1)
    }, off: function (e, n, r) {
        var i, o;
        if (e && e.preventDefault && e.handleObj)return i = e.handleObj, ct(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
        if ("object" == typeof e) {
            for (o in e)this.off(o, n, e[o]);
            return this
        }
        return(n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = u), this.each(function () {
            ct.event.remove(this, e, r, n)
        })
    }, trigger: function (e, t) {
        return this.each(function () {
            ct.event.trigger(e, t, this)
        })
    }, triggerHandler: function (e, t) {
        var n = this[0];
        return n ? ct.event.trigger(e, t, n, !0) : void 0
    }});
    var Bt = /^.[^:#\[\.,]*$/, Wt = /^(?:parents|prev(?:Until|All))/, zt = ct.expr.match.needsContext, Xt = {children: !0, contents: !0, next: !0, prev: !0};
    ct.fn.extend({find: function (e) {
        var t, n = [], r = this, i = r.length;
        if ("string" != typeof e)return this.pushStack(ct(e).filter(function () {
            for (t = 0; i > t; t++)if (ct.contains(r[t], this))return!0
        }));
        for (t = 0; i > t; t++)ct.find(e, r[t], n);
        return n = this.pushStack(i > 1 ? ct.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
    }, has: function (e) {
        var t, n = ct(e, this), r = n.length;
        return this.filter(function () {
            for (t = 0; r > t; t++)if (ct.contains(this, n[t]))return!0
        })
    }, not: function (e) {
        return this.pushStack(d(this, e || [], !0))
    }, filter: function (e) {
        return this.pushStack(d(this, e || [], !1))
    }, is: function (e) {
        return!!d(this, "string" == typeof e && zt.test(e) ? ct(e) : e || [], !1).length
    }, closest: function (e, t) {
        for (var n, r = 0, i = this.length, o = [], a = zt.test(e) || "string" != typeof e ? ct(e, t || this.context) : 0; i > r; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && ct.find.matchesSelector(n, e))) {
            n = o.push(n);
            break
        }
        return this.pushStack(o.length > 1 ? ct.unique(o) : o)
    }, index: function (e) {
        return e ? "string" == typeof e ? ct.inArray(this[0], ct(e)) : ct.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    }, add: function (e, t) {
        var n = "string" == typeof e ? ct(e, t) : ct.makeArray(e && e.nodeType ? [e] : e), r = ct.merge(this.get(), n);
        return this.pushStack(ct.unique(r))
    }, addBack: function (e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }}), ct.each({parent: function (e) {
        var t = e.parentNode;
        return t && 11 !== t.nodeType ? t : null
    }, parents: function (e) {
        return ct.dir(e, "parentNode")
    }, parentsUntil: function (e, t, n) {
        return ct.dir(e, "parentNode", n)
    }, next: function (e) {
        return f(e, "nextSibling")
    }, prev: function (e) {
        return f(e, "previousSibling")
    }, nextAll: function (e) {
        return ct.dir(e, "nextSibling")
    }, prevAll: function (e) {
        return ct.dir(e, "previousSibling")
    }, nextUntil: function (e, t, n) {
        return ct.dir(e, "nextSibling", n)
    }, prevUntil: function (e, t, n) {
        return ct.dir(e, "previousSibling", n)
    }, siblings: function (e) {
        return ct.sibling((e.parentNode || {}).firstChild, e)
    }, children: function (e) {
        return ct.sibling(e.firstChild)
    }, contents: function (e) {
        return ct.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ct.merge([], e.childNodes)
    }}, function (e, t) {
        ct.fn[e] = function (n, r) {
            var i = ct.map(this, t, n);
            return"Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = ct.filter(r, i)), this.length > 1 && (Xt[e] || (i = ct.unique(i)), Wt.test(e) && (i = i.reverse())), this.pushStack(i)
        }
    }), ct.extend({filter: function (e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? ct.find.matchesSelector(r, e) ? [r] : [] : ct.find.matches(e, ct.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, dir: function (e, n, r) {
        for (var i = [], o = e[n]; o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !ct(o).is(r));)1 === o.nodeType && i.push(o), o = o[n];
        return i
    }, sibling: function (e, t) {
        for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
        return n
    }});
    var Ut = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Vt = / jQuery\d+="(?:null|\d+)"/g, Qt = new RegExp("<(?:" + Ut + ")[\\s/>]", "i"), Yt = /^\s+/, Gt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Kt = /<([\w:]+)/, Jt = /<tbody/i, Zt = /<|&#?\w+;/, en = /<(?:script|style|link)/i, tn = /^(?:checkbox|radio)$/i, nn = /checked\s*(?:[^=]|=\s*.checked.)/i, rn = /^$|\/(?:java|ecma)script/i, on = /^true\/(.*)/, an = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, sn = {option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: ct.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]}, ln = p(G), un = ln.appendChild(G.createElement("div"));
    sn.optgroup = sn.option, sn.tbody = sn.tfoot = sn.colgroup = sn.caption = sn.thead, sn.th = sn.td, ct.fn.extend({text: function (e) {
        return ct.access(this, function (e) {
            return e === t ? ct.text(this) : this.empty().append((this[0] && this[0].ownerDocument || G).createTextNode(e))
        }, null, e, arguments.length)
    }, append: function () {
        return this.domManip(arguments, function (e) {
            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                var t = h(this, e);
                t.appendChild(e)
            }
        })
    }, prepend: function () {
        return this.domManip(arguments, function (e) {
            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                var t = h(this, e);
                t.insertBefore(e, t.firstChild)
            }
        })
    }, before: function () {
        return this.domManip(arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this)
        })
    }, after: function () {
        return this.domManip(arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
        })
    }, remove: function (e, t) {
        for (var n, r = e ? ct.filter(e, this) : this, i = 0; null != (n = r[i]); i++)t || 1 !== n.nodeType || ct.cleanData(x(n)), n.parentNode && (t && ct.contains(n.ownerDocument, n) && y(x(n, "script")), n.parentNode.removeChild(n));
        return this
    }, empty: function () {
        for (var e, t = 0; null != (e = this[t]); t++) {
            for (1 === e.nodeType && ct.cleanData(x(e, !1)); e.firstChild;)e.removeChild(e.firstChild);
            e.options && ct.nodeName(e, "select") && (e.options.length = 0)
        }
        return this
    }, clone: function (e, t) {
        return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
            return ct.clone(this, e, t)
        })
    }, html: function (e) {
        return ct.access(this, function (e) {
            var n = this[0] || {}, r = 0, i = this.length;
            if (e === t)return 1 === n.nodeType ? n.innerHTML.replace(Vt, "") : t;
            if (!("string" != typeof e || en.test(e) || !ct.support.htmlSerialize && Qt.test(e) || !ct.support.leadingWhitespace && Yt.test(e) || sn[(Kt.exec(e) || ["", ""])[1].toLowerCase()])) {
                e = e.replace(Gt, "<$1></$2>");
                try {
                    for (; i > r; r++)n = this[r] || {}, 1 === n.nodeType && (ct.cleanData(x(n, !1)), n.innerHTML = e);
                    n = 0
                } catch (o) {
                }
            }
            n && this.empty().append(e)
        }, null, e, arguments.length)
    }, replaceWith: function () {
        var e = ct.map(this, function (e) {
            return[e.nextSibling, e.parentNode]
        }), t = 0;
        return this.domManip(arguments, function (n) {
            var r = e[t++], i = e[t++];
            i && (r && r.parentNode !== i && (r = this.nextSibling), ct(this).remove(), i.insertBefore(n, r))
        }, !0), t ? this : this.remove()
    }, detach: function (e) {
        return this.remove(e, !0)
    }, domManip: function (e, t, n) {
        e = rt.apply([], e);
        var r, i, o, a, s, l, u = 0, c = this.length, f = this, d = c - 1, p = e[0], h = ct.isFunction(p);
        if (h || !(1 >= c || "string" != typeof p || ct.support.checkClone) && nn.test(p))return this.each(function (r) {
            var i = f.eq(r);
            h && (e[0] = p.call(this, r, i.html())), i.domManip(e, t, n)
        });
        if (c && (l = ct.buildFragment(e, this[0].ownerDocument, !1, !n && this), r = l.firstChild, 1 === l.childNodes.length && (l = r), r)) {
            for (a = ct.map(x(l, "script"), m), o = a.length; c > u; u++)i = l, u !== d && (i = ct.clone(i, !0, !0), o && ct.merge(a, x(i, "script"))), t.call(this[u], i, u);
            if (o)for (s = a[a.length - 1].ownerDocument, ct.map(a, g), u = 0; o > u; u++)i = a[u], rn.test(i.type || "") && !ct._data(i, "globalEval") && ct.contains(s, i) && (i.src ? ct._evalUrl(i.src) : ct.globalEval((i.text || i.textContent || i.innerHTML || "").replace(an, "")));
            l = r = null
        }
        return this
    }}), ct.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (e, t) {
        ct.fn[e] = function (e) {
            for (var n, r = 0, i = [], o = ct(e), a = o.length - 1; a >= r; r++)n = r === a ? this : this.clone(!0), ct(o[r])[t](n), it.apply(i, n.get());
            return this.pushStack(i)
        }
    }), ct.extend({clone: function (e, t, n) {
        var r, i, o, a, s, l = ct.contains(e.ownerDocument, e);
        if (ct.support.html5Clone || ct.isXMLDoc(e) || !Qt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (un.innerHTML = e.outerHTML, un.removeChild(o = un.firstChild)), !(ct.support.noCloneEvent && ct.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ct.isXMLDoc(e)))for (r = x(o), s = x(e), a = 0; null != (i = s[a]); ++a)r[a] && b(i, r[a]);
        if (t)if (n)for (s = s || x(e), r = r || x(o), a = 0; null != (i = s[a]); a++)v(i, r[a]); else v(e, o);
        return r = x(o, "script"), r.length > 0 && y(r, !l && x(e, "script")), r = s = i = null, o
    }, buildFragment: function (e, t, n, r) {
        for (var i, o, a, s, l, u, c, f = e.length, d = p(t), h = [], m = 0; f > m; m++)if (o = e[m], o || 0 === o)if ("object" === ct.type(o))ct.merge(h, o.nodeType ? [o] : o); else if (Zt.test(o)) {
            for (s = s || d.appendChild(t.createElement("div")), l = (Kt.exec(o) || ["", ""])[1].toLowerCase(), c = sn[l] || sn._default, s.innerHTML = c[1] + o.replace(Gt, "<$1></$2>") + c[2], i = c[0]; i--;)s = s.lastChild;
            if (!ct.support.leadingWhitespace && Yt.test(o) && h.push(t.createTextNode(Yt.exec(o)[0])), !ct.support.tbody)for (o = "table" !== l || Jt.test(o) ? "<table>" !== c[1] || Jt.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length; i--;)ct.nodeName(u = o.childNodes[i], "tbody") && !u.childNodes.length && o.removeChild(u);
            for (ct.merge(h, s.childNodes), s.textContent = ""; s.firstChild;)s.removeChild(s.firstChild);
            s = d.lastChild
        } else h.push(t.createTextNode(o));
        for (s && d.removeChild(s), ct.support.appendChecked || ct.grep(x(h, "input"), w), m = 0; o = h[m++];)if ((!r || -1 === ct.inArray(o, r)) && (a = ct.contains(o.ownerDocument, o), s = x(d.appendChild(o), "script"), a && y(s), n))for (i = 0; o = s[i++];)rn.test(o.type || "") && n.push(o);
        return s = null, d
    }, cleanData: function (e, t) {
        for (var n, r, i, o, a = 0, s = ct.expando, l = ct.cache, u = ct.support.deleteExpando, c = ct.event.special; null != (n = e[a]); a++)if ((t || ct.acceptData(n)) && (i = n[s], o = i && l[i])) {
            if (o.events)for (r in o.events)c[r] ? ct.event.remove(n, r) : ct.removeEvent(n, r, o.handle);
            l[i] && (delete l[i], u ? delete n[s] : typeof n.removeAttribute !== Q ? n.removeAttribute(s) : n[s] = null, tt.push(i))
        }
    }, _evalUrl: function (e) {
        return ct.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }}), ct.fn.extend({wrapAll: function (e) {
        if (ct.isFunction(e))return this.each(function (t) {
            ct(this).wrapAll(e.call(this, t))
        });
        if (this[0]) {
            var t = ct(e, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;)e = e.firstChild;
                return e
            }).append(this)
        }
        return this
    }, wrapInner: function (e) {
        return ct.isFunction(e) ? this.each(function (t) {
            ct(this).wrapInner(e.call(this, t))
        }) : this.each(function () {
            var t = ct(this), n = t.contents();
            n.length ? n.wrapAll(e) : t.append(e)
        })
    }, wrap: function (e) {
        var t = ct.isFunction(e);
        return this.each(function (n) {
            ct(this).wrapAll(t ? e.call(this, n) : e)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            ct.nodeName(this, "body") || ct(this).replaceWith(this.childNodes)
        }).end()
    }});
    var cn, fn, dn, pn = /alpha\([^)]*\)/i, hn = /opacity\s*=\s*([^)]*)/, mn = /^(top|right|bottom|left)$/, gn = /^(none|table(?!-c[ea]).+)/, yn = /^margin/, vn = new RegExp("^(" + ft + ")(.*)$", "i"), bn = new RegExp("^(" + ft + ")(?!px)[a-z%]+$", "i"), xn = new RegExp("^([+-])=(" + ft + ")", "i"), wn = {BODY: "block"}, Cn = {position: "absolute", visibility: "hidden", display: "block"}, Tn = {letterSpacing: 0, fontWeight: 400}, kn = ["Top", "Right", "Bottom", "Left"], Sn = ["Webkit", "O", "Moz", "ms"];
    ct.fn.extend({css: function (e, n) {
        return ct.access(this, function (e, n, r) {
            var i, o, a = {}, s = 0;
            if (ct.isArray(n)) {
                for (o = fn(e), i = n.length; i > s; s++)a[n[s]] = ct.css(e, n[s], !1, o);
                return a
            }
            return r !== t ? ct.style(e, n, r) : ct.css(e, n)
        }, e, n, arguments.length > 1)
    }, show: function () {
        return k(this, !0)
    }, hide: function () {
        return k(this)
    }, toggle: function (e) {
        var t = "boolean" == typeof e;
        return this.each(function () {
            (t ? e : T(this)) ? ct(this).show() : ct(this).hide()
        })
    }}), ct.extend({cssHooks: {opacity: {get: function (e, t) {
        if (t) {
            var n = dn(e, "opacity");
            return"" === n ? "1" : n
        }
    }}}, cssNumber: {columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0}, cssProps: {"float": ct.support.cssFloat ? "cssFloat" : "styleFloat"}, style: function (e, n, r, i) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
            var o, a, s, l = ct.camelCase(n), u = e.style;
            if (n = ct.cssProps[l] || (ct.cssProps[l] = C(u, l)), s = ct.cssHooks[n] || ct.cssHooks[l], r === t)return s && "get"in s && (o = s.get(e, !1, i)) !== t ? o : u[n];
            if (a = typeof r, "string" === a && (o = xn.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(ct.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || ct.cssNumber[l] || (r += "px"), ct.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (u[n] = "inherit"), s && "set"in s && (r = s.set(e, r, i)) === t)))try {
                u[n] = r
            } catch (c) {
            }
        }
    }, css: function (e, n, r, i) {
        var o, a, s, l = ct.camelCase(n);
        return n = ct.cssProps[l] || (ct.cssProps[l] = C(e.style, l)), s = ct.cssHooks[n] || ct.cssHooks[l], s && "get"in s && (a = s.get(e, !0, r)), a === t && (a = dn(e, n, i)), "normal" === a && n in Tn && (a = Tn[n]), "" === r || r ? (o = parseFloat(a), r === !0 || ct.isNumeric(o) ? o || 0 : a) : a
    }}), e.getComputedStyle ? (fn = function (t) {
        return e.getComputedStyle(t, null)
    }, dn = function (e, n, r) {
        var i, o, a, s = r || fn(e), l = s ? s.getPropertyValue(n) || s[n] : t, u = e.style;
        return s && ("" !== l || ct.contains(e.ownerDocument, e) || (l = ct.style(e, n)), bn.test(l) && yn.test(n) && (i = u.width, o = u.minWidth, a = u.maxWidth, u.minWidth = u.maxWidth = u.width = l, l = s.width, u.width = i, u.minWidth = o, u.maxWidth = a)), l
    }) : G.documentElement.currentStyle && (fn = function (e) {
        return e.currentStyle
    }, dn = function (e, n, r) {
        var i, o, a, s = r || fn(e), l = s ? s[n] : t, u = e.style;
        return null == l && u && u[n] && (l = u[n]), bn.test(l) && !mn.test(n) && (i = u.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), u.left = "fontSize" === n ? "1em" : l, l = u.pixelLeft + "px", u.left = i, a && (o.left = a)), "" === l ? "auto" : l
    }), ct.each(["height", "width"], function (e, t) {
        ct.cssHooks[t] = {get: function (e, n, r) {
            return n ? 0 === e.offsetWidth && gn.test(ct.css(e, "display")) ? ct.swap(e, Cn, function () {
                return E(e, t, r)
            }) : E(e, t, r) : void 0
        }, set: function (e, n, r) {
            var i = r && fn(e);
            return S(e, n, r ? N(e, t, r, ct.support.boxSizing && "border-box" === ct.css(e, "boxSizing", !1, i), i) : 0)
        }}
    }), ct.support.opacity || (ct.cssHooks.opacity = {get: function (e, t) {
        return hn.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
    }, set: function (e, t) {
        var n = e.style, r = e.currentStyle, i = ct.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", o = r && r.filter || n.filter || "";
        n.zoom = 1, (t >= 1 || "" === t) && "" === ct.trim(o.replace(pn, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = pn.test(o) ? o.replace(pn, i) : o + " " + i)
    }}), ct(function () {
        ct.support.reliableMarginRight || (ct.cssHooks.marginRight = {get: function (e, t) {
            return t ? ct.swap(e, {display: "inline-block"}, dn, [e, "marginRight"]) : void 0
        }}), !ct.support.pixelPosition && ct.fn.position && ct.each(["top", "left"], function (e, t) {
            ct.cssHooks[t] = {get: function (e, n) {
                return n ? (n = dn(e, t), bn.test(n) ? ct(e).position()[t] + "px" : n) : void 0
            }}
        })
    }), ct.expr && ct.expr.filters && (ct.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ct.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ct.css(e, "display"))
    }, ct.expr.filters.visible = function (e) {
        return!ct.expr.filters.hidden(e)
    }), ct.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        ct.cssHooks[e + t] = {expand: function (n) {
            for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)i[e + kn[r] + t] = o[r] || o[r - 2] || o[0];
            return i
        }}, yn.test(e) || (ct.cssHooks[e + t].set = S)
    });
    var Nn = /%20/g, En = /\[\]$/, jn = /\r?\n/g, An = /^(?:submit|button|image|reset|file)$/i, $n = /^(?:input|select|textarea|keygen)/i;
    ct.fn.extend({serialize: function () {
        return ct.param(this.serializeArray())
    }, serializeArray: function () {
        return this.map(function () {
            var e = ct.prop(this, "elements");
            return e ? ct.makeArray(e) : this
        }).filter(function () {
            var e = this.type;
            return this.name && !ct(this).is(":disabled") && $n.test(this.nodeName) && !An.test(e) && (this.checked || !tn.test(e))
        }).map(function (e, t) {
            var n = ct(this).val();
            return null == n ? null : ct.isArray(n) ? ct.map(n, function (e) {
                return{name: t.name, value: e.replace(jn, "\r\n")}
            }) : {name: t.name, value: n.replace(jn, "\r\n")}
        }).get()
    }}), ct.param = function (e, n) {
        var r, i = [], o = function (e, t) {
            t = ct.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (n === t && (n = ct.ajaxSettings && ct.ajaxSettings.traditional), ct.isArray(e) || e.jquery && !ct.isPlainObject(e))ct.each(e, function () {
            o(this.name, this.value)
        }); else for (r in e)$(r, e[r], n, o);
        return i.join("&").replace(Nn, "+")
    }, ct.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        ct.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), ct.fn.extend({hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e)
    }, bind: function (e, t, n) {
        return this.on(e, null, t, n)
    }, unbind: function (e, t) {
        return this.off(e, null, t)
    }, delegate: function (e, t, n, r) {
        return this.on(t, e, n, r)
    }, undelegate: function (e, t, n) {
        return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
    }});
    var Dn, Ln, Hn = ct.now(), qn = /\?/, _n = /#.*$/, On = /([?&])_=[^&]*/, In = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Pn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Fn = /^(?:GET|HEAD)$/, Mn = /^\/\//, Rn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Bn = ct.fn.load, Wn = {}, zn = {}, Xn = "*/".concat("*");
    try {
        Ln = Y.href
    } catch (Un) {
        Ln = G.createElement("a"), Ln.href = "", Ln = Ln.href
    }
    Dn = Rn.exec(Ln.toLowerCase()) || [], ct.fn.load = function (e, n, r) {
        if ("string" != typeof e && Bn)return Bn.apply(this, arguments);
        var i, o, a, s = this, l = e.indexOf(" ");
        return l >= 0 && (i = e.slice(l, e.length), e = e.slice(0, l)), ct.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && ct.ajax({url: e, type: a, dataType: "html", data: n}).done(function (e) {
            o = arguments, s.html(i ? ct("<div>").append(ct.parseHTML(e)).find(i) : e)
        }).complete(r && function (e, t) {
            s.each(r, o || [e.responseText, t, e])
        }), this
    }, ct.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        ct.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), ct.extend({active: 0, lastModified: {}, etag: {}, ajaxSettings: {url: Ln, type: "GET", isLocal: Pn.test(Dn[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: {"*": Xn, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript"}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"}, converters: {"* text": String, "text html": !0, "text json": ct.parseJSON, "text xml": ct.parseXML}, flatOptions: {url: !0, context: !0}}, ajaxSetup: function (e, t) {
        return t ? H(H(e, ct.ajaxSettings), t) : H(ct.ajaxSettings, e)
    }, ajaxPrefilter: D(Wn), ajaxTransport: D(zn), ajax: function (e, n) {
        function r(e, n, r, i) {
            var o, f, v, b, w, T = n;
            2 !== x && (x = 2, l && clearTimeout(l), c = t, s = i || "", C.readyState = e > 0 ? 4 : 0, o = e >= 200 && 300 > e || 304 === e, r && (b = q(d, C, r)), b = _(d, b, C, o), o ? (d.ifModified && (w = C.getResponseHeader("Last-Modified"), w && (ct.lastModified[a] = w), w = C.getResponseHeader("etag"), w && (ct.etag[a] = w)), 204 === e || "HEAD" === d.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = b.state, f = b.data, v = b.error, o = !v)) : (v = T, (e || !T) && (T = "error", 0 > e && (e = 0))), C.status = e, C.statusText = (n || T) + "", o ? m.resolveWith(p, [f, T, C]) : m.rejectWith(p, [C, T, v]), C.statusCode(y), y = t, u && h.trigger(o ? "ajaxSuccess" : "ajaxError", [C, d, o ? f : v]), g.fireWith(p, [C, T]), u && (h.trigger("ajaxComplete", [C, d]), --ct.active || ct.event.trigger("ajaxStop")))
        }

        "object" == typeof e && (n = e, e = t), n = n || {};
        var i, o, a, s, l, u, c, f, d = ct.ajaxSetup({}, n), p = d.context || d, h = d.context && (p.nodeType || p.jquery) ? ct(p) : ct.event, m = ct.Deferred(), g = ct.Callbacks("once memory"), y = d.statusCode || {}, v = {}, b = {}, x = 0, w = "canceled", C = {readyState: 0, getResponseHeader: function (e) {
            var t;
            if (2 === x) {
                if (!f)for (f = {}; t = In.exec(s);)f[t[1].toLowerCase()] = t[2];
                t = f[e.toLowerCase()]
            }
            return null == t ? null : t
        }, getAllResponseHeaders: function () {
            return 2 === x ? s : null
        }, setRequestHeader: function (e, t) {
            var n = e.toLowerCase();
            return x || (e = b[n] = b[n] || e, v[e] = t), this
        }, overrideMimeType: function (e) {
            return x || (d.mimeType = e), this
        }, statusCode: function (e) {
            var t;
            if (e)if (2 > x)for (t in e)y[t] = [y[t], e[t]]; else C.always(e[C.status]);
            return this
        }, abort: function (e) {
            var t = e || w;
            return c && c.abort(t), r(0, t), this
        }};
        if (m.promise(C).complete = g.add, C.success = C.done, C.error = C.fail, d.url = ((e || d.url || Ln) + "").replace(_n, "").replace(Mn, Dn[1] + "//"), d.type = n.method || n.type || d.method || d.type, d.dataTypes = ct.trim(d.dataType || "*").toLowerCase().match(dt) || [""], null == d.crossDomain && (i = Rn.exec(d.url.toLowerCase()), d.crossDomain = !(!i || i[1] === Dn[1] && i[2] === Dn[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (Dn[3] || ("http:" === Dn[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = ct.param(d.data, d.traditional)), L(Wn, d, n, C), 2 === x)return C;
        u = d.global, u && 0 === ct.active++ && ct.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !Fn.test(d.type), a = d.url, d.hasContent || (d.data && (a = d.url += (qn.test(a) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = On.test(a) ? a.replace(On, "$1_=" + Hn++) : a + (qn.test(a) ? "&" : "?") + "_=" + Hn++)), d.ifModified && (ct.lastModified[a] && C.setRequestHeader("If-Modified-Since", ct.lastModified[a]), ct.etag[a] && C.setRequestHeader("If-None-Match", ct.etag[a])), (d.data && d.hasContent && d.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type", d.contentType), C.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Xn + "; q=0.01" : "") : d.accepts["*"]);
        for (o in d.headers)C.setRequestHeader(o, d.headers[o]);
        if (d.beforeSend && (d.beforeSend.call(p, C, d) === !1 || 2 === x))return C.abort();
        w = "abort";
        for (o in{success: 1, error: 1, complete: 1})C[o](d[o]);
        if (c = L(zn, d, n, C)) {
            C.readyState = 1, u && h.trigger("ajaxSend", [C, d]), d.async && d.timeout > 0 && (l = setTimeout(function () {
                C.abort("timeout")
            }, d.timeout));
            try {
                x = 1, c.send(v, r)
            } catch (T) {
                if (!(2 > x))throw T;
                r(-1, T)
            }
        } else r(-1, "No Transport");
        return C
    }, getJSON: function (e, t, n) {
        return ct.get(e, t, n, "json")
    }, getScript: function (e, n) {
        return ct.get(e, t, n, "script")
    }}), ct.each(["get", "post"], function (e, n) {
        ct[n] = function (e, r, i, o) {
            return ct.isFunction(r) && (o = o || i, i = r, r = t), ct.ajax({url: e, type: n, dataType: o, data: r, success: i})
        }
    }), ct.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /(?:java|ecma)script/}, converters: {"text script": function (e) {
        return ct.globalEval(e), e
    }}}), ct.ajaxPrefilter("script", function (e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), ct.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var n, r = G.head || ct("head")[0] || G.documentElement;
            return{send: function (t, i) {
                n = G.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, t) {
                    (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"))
                }, r.insertBefore(n, r.firstChild)
            }, abort: function () {
                n && n.onload(t, !0)
            }}
        }
    });
    var Vn = [], Qn = /(=)\?(?=&|$)|\?\?/;
    ct.ajaxSetup({jsonp: "callback", jsonpCallback: function () {
        var e = Vn.pop() || ct.expando + "_" + Hn++;
        return this[e] = !0, e
    }}), ct.ajaxPrefilter("json jsonp", function (n, r, i) {
        var o, a, s, l = n.jsonp !== !1 && (Qn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Qn.test(n.data) && "data");
        return l || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = ct.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace(Qn, "$1" + o) : n.jsonp !== !1 && (n.url += (qn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function () {
            return s || ct.error(o + " was not called"), s[0]
        }, n.dataTypes[0] = "json", a = e[o], e[o] = function () {
            s = arguments
        }, i.always(function () {
            e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Vn.push(o)), s && ct.isFunction(a) && a(s[0]), s = a = t
        }), "script") : void 0
    });
    var Yn, Gn, Kn = 0, Jn = e.ActiveXObject && function () {
        var e;
        for (e in Yn)Yn[e](t, !0)
    };
    ct.ajaxSettings.xhr = e.ActiveXObject ? function () {
        return!this.isLocal && O() || I()
    } : O, Gn = ct.ajaxSettings.xhr(), ct.support.cors = !!Gn && "withCredentials"in Gn, Gn = ct.support.ajax = !!Gn, Gn && ct.ajaxTransport(function (n) {
        if (!n.crossDomain || ct.support.cors) {
            var r;
            return{send: function (i, o) {
                var a, s, l = n.xhr();
                if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields)for (s in n.xhrFields)l[s] = n.xhrFields[s];
                n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                try {
                    for (s in i)l.setRequestHeader(s, i[s])
                } catch (u) {
                }
                l.send(n.hasContent && n.data || null), r = function (e, i) {
                    var s, u, c, f;
                    try {
                        if (r && (i || 4 === l.readyState))if (r = t, a && (l.onreadystatechange = ct.noop, Jn && delete Yn[a]), i)4 !== l.readyState && l.abort(); else {
                            f = {}, s = l.status, u = l.getAllResponseHeaders(), "string" == typeof l.responseText && (f.text = l.responseText);
                            try {
                                c = l.statusText
                            } catch (d) {
                                c = ""
                            }
                            s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = f.text ? 200 : 404
                        }
                    } catch (p) {
                        i || o(-1, p)
                    }
                    f && o(s, c, f, u)
                }, n.async ? 4 === l.readyState ? setTimeout(r) : (a = ++Kn, Jn && (Yn || (Yn = {}, ct(e).unload(Jn)), Yn[a] = r), l.onreadystatechange = r) : r()
            }, abort: function () {
                r && r(t, !0)
            }}
        }
    });
    var Zn, er, tr = /^(?:toggle|show|hide)$/, nr = new RegExp("^(?:([+-])=|)(" + ft + ")([a-z%]*)$", "i"), rr = /queueHooks$/, ir = [B], or = {"*": [function (e, t) {
        var n = this.createTween(e, t), r = n.cur(), i = nr.exec(t), o = i && i[3] || (ct.cssNumber[e] ? "" : "px"), a = (ct.cssNumber[e] || "px" !== o && +r) && nr.exec(ct.css(n.elem, e)), s = 1, l = 20;
        if (a && a[3] !== o) {
            o = o || a[3], i = i || [], a = +r || 1;
            do s = s || ".5", a /= s, ct.style(n.elem, e, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --l)
        }
        return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
    }]};
    ct.Animation = ct.extend(M, {tweener: function (e, t) {
        ct.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
        for (var n, r = 0, i = e.length; i > r; r++)n = e[r], or[n] = or[n] || [], or[n].unshift(t)
    }, prefilter: function (e, t) {
        t ? ir.unshift(e) : ir.push(e)
    }}), ct.Tween = W, W.prototype = {constructor: W, init: function (e, t, n, r, i, o) {
        this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (ct.cssNumber[n] ? "" : "px")
    }, cur: function () {
        var e = W.propHooks[this.prop];
        return e && e.get ? e.get(this) : W.propHooks._default.get(this)
    }, run: function (e) {
        var t, n = W.propHooks[this.prop];
        return this.pos = t = this.options.duration ? ct.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : W.propHooks._default.set(this), this
    }}, W.prototype.init.prototype = W.prototype, W.propHooks = {_default: {get: function (e) {
        var t;
        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ct.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
    }, set: function (e) {
        ct.fx.step[e.prop] ? ct.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ct.cssProps[e.prop]] || ct.cssHooks[e.prop]) ? ct.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
    }}}, W.propHooks.scrollTop = W.propHooks.scrollLeft = {set: function (e) {
        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }}, ct.each(["toggle", "show", "hide"], function (e, t) {
        var n = ct.fn[t];
        ct.fn[t] = function (e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(z(t, !0), e, r, i)
        }
    }), ct.fn.extend({fadeTo: function (e, t, n, r) {
        return this.filter(T).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
    }, animate: function (e, t, n, r) {
        var i = ct.isEmptyObject(e), o = ct.speed(t, n, r), a = function () {
            var t = M(this, ct.extend({}, e), o);
            (i || ct._data(this, "finish")) && t.stop(!0)
        };
        return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
    }, stop: function (e, n, r) {
        var i = function (e) {
            var t = e.stop;
            delete e.stop, t(r)
        };
        return"string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
            var t = !0, n = null != e && e + "queueHooks", o = ct.timers, a = ct._data(this);
            if (n)a[n] && a[n].stop && i(a[n]); else for (n in a)a[n] && a[n].stop && rr.test(n) && i(a[n]);
            for (n = o.length; n--;)o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1));
            (t || !r) && ct.dequeue(this, e)
        })
    }, finish: function (e) {
        return e !== !1 && (e = e || "fx"), this.each(function () {
            var t, n = ct._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = ct.timers, a = r ? r.length : 0;
            for (n.finish = !0, ct.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
            for (t = 0; a > t; t++)r[t] && r[t].finish && r[t].finish.call(this);
            delete n.finish
        })
    }}), ct.each({slideDown: z("show"), slideUp: z("hide"), slideToggle: z("toggle"), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}, fadeToggle: {opacity: "toggle"}}, function (e, t) {
        ct.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), ct.speed = function (e, t, n) {
        var r = e && "object" == typeof e ? ct.extend({}, e) : {complete: n || !n && t || ct.isFunction(e) && e, duration: e, easing: n && t || t && !ct.isFunction(t) && t};
        return r.duration = ct.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ct.fx.speeds ? ct.fx.speeds[r.duration] : ct.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            ct.isFunction(r.old) && r.old.call(this), r.queue && ct.dequeue(this, r.queue)
        }, r
    }, ct.easing = {linear: function (e) {
        return e
    }, swing: function (e) {
        return.5 - Math.cos(e * Math.PI) / 2
    }}, ct.timers = [], ct.fx = W.prototype.init, ct.fx.tick = function () {
        var e, n = ct.timers, r = 0;
        for (Zn = ct.now(); r < n.length; r++)e = n[r], e() || n[r] !== e || n.splice(r--, 1);
        n.length || ct.fx.stop(), Zn = t
    }, ct.fx.timer = function (e) {
        e() && ct.timers.push(e) && ct.fx.start()
    }, ct.fx.interval = 13, ct.fx.start = function () {
        er || (er = setInterval(ct.fx.tick, ct.fx.interval))
    }, ct.fx.stop = function () {
        clearInterval(er), er = null
    }, ct.fx.speeds = {slow: 600, fast: 200, _default: 400}, ct.fx.step = {}, ct.expr && ct.expr.filters && (ct.expr.filters.animated = function (e) {
        return ct.grep(ct.timers,function (t) {
            return e === t.elem
        }).length
    }), ct.fn.offset = function (e) {
        if (arguments.length)return e === t ? this : this.each(function (t) {
            ct.offset.setOffset(this, e, t)
        });
        var n, r, i = {top: 0, left: 0}, o = this[0], a = o && o.ownerDocument;
        if (a)return n = a.documentElement, ct.contains(n, o) ? (typeof o.getBoundingClientRect !== Q && (i = o.getBoundingClientRect()), r = X(a), {top: i.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0), left: i.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)}) : i
    }, ct.offset = {setOffset: function (e, t, n) {
        var r = ct.css(e, "position");
        "static" === r && (e.style.position = "relative");
        var i, o, a = ct(e), s = a.offset(), l = ct.css(e, "top"), u = ct.css(e, "left"), c = ("absolute" === r || "fixed" === r) && ct.inArray("auto", [l, u]) > -1, f = {}, d = {};
        c ? (d = a.position(), i = d.top, o = d.left) : (i = parseFloat(l) || 0, o = parseFloat(u) || 0), ct.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (f.top = t.top - s.top + i), null != t.left && (f.left = t.left - s.left + o), "using"in t ? t.using.call(e, f) : a.css(f)
    }}, ct.fn.extend({position: function () {
        if (this[0]) {
            var e, t, n = {top: 0, left: 0}, r = this[0];
            return"fixed" === ct.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ct.nodeName(e[0], "html") || (n = e.offset()), n.top += ct.css(e[0], "borderTopWidth", !0), n.left += ct.css(e[0], "borderLeftWidth", !0)), {top: t.top - n.top - ct.css(r, "marginTop", !0), left: t.left - n.left - ct.css(r, "marginLeft", !0)}
        }
    }, offsetParent: function () {
        return this.map(function () {
            for (var e = this.offsetParent || K; e && !ct.nodeName(e, "html") && "static" === ct.css(e, "position");)e = e.offsetParent;
            return e || K
        })
    }}), ct.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, n) {
        var r = /Y/.test(n);
        ct.fn[e] = function (i) {
            return ct.access(this, function (e, i, o) {
                var a = X(e);
                return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : (a ? a.scrollTo(r ? ct(a).scrollLeft() : o, r ? o : ct(a).scrollTop()) : e[i] = o, void 0)
            }, e, i, arguments.length, null)
        }
    }), ct.each({Height: "height", Width: "width"}, function (e, n) {
        ct.each({padding: "inner" + e, content: n, "": "outer" + e}, function (r, i) {
            ct.fn[i] = function (i, o) {
                var a = arguments.length && (r || "boolean" != typeof i), s = r || (i === !0 || o === !0 ? "margin" : "border");
                return ct.access(this, function (n, r, i) {
                    var o;
                    return ct.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? ct.css(n, r, s) : ct.style(n, r, i, s)
                }, n, a ? i : t, a, null)
            }
        })
    }), ct.fn.size = function () {
        return this.length
    }, ct.fn.andSelf = ct.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = ct : (e.jQuery = e.$ = ct, "function" == typeof define && define.amd && define("jquery", [], function () {
        return ct
    }))
}(window), function (e, t) {
    e.rails !== t && e.error("jquery-ujs has already been loaded!");
    var n;
    e.rails = n = {linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]", buttonClickSelector: "button[data-remote]", inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]", formSubmitSelector: "form", formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])", disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]", enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled", requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])", fileInputSelector: "input[type=file]", linkDisableSelector: "a[data-disable-with]", CSRFProtection: function (t) {
        var n = e('meta[name="csrf-token"]').attr("content");
        n && t.setRequestHeader("X-CSRF-Token", n)
    }, fire: function (t, n, r) {
        var i = e.Event(n);
        return t.trigger(i, r), i.result !== !1
    }, confirm: function (e) {
        return confirm(e)
    }, ajax: function (t) {
        return e.ajax(t)
    }, href: function (e) {
        return e.attr("href")
    }, handleRemote: function (r) {
        var i, o, a, s, l, u, c, f;
        if (n.fire(r, "ajax:before")) {
            if (s = r.data("cross-domain"), l = s === t ? null : s, u = r.data("with-credentials") || null, c = r.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, r.is("form")) {
                i = r.attr("method"), o = r.attr("action"), a = r.serializeArray();
                var d = r.data("ujs:submit-button");
                d && (a.push(d), r.data("ujs:submit-button", null))
            } else r.is(n.inputChangeSelector) ? (i = r.data("method"), o = r.data("url"), a = r.serialize(), r.data("params") && (a = a + "&" + r.data("params"))) : r.is(n.buttonClickSelector) ? (i = r.data("method") || "get", o = r.data("url"), a = r.serialize(), r.data("params") && (a = a + "&" + r.data("params"))) : (i = r.data("method"), o = n.href(r), a = r.data("params") || null);
            f = {type: i || "GET", data: a, dataType: c, beforeSend: function (e, i) {
                return i.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + i.accepts.script), n.fire(r, "ajax:beforeSend", [e, i])
            }, success: function (e, t, n) {
                r.trigger("ajax:success", [e, t, n])
            }, complete: function (e, t) {
                r.trigger("ajax:complete", [e, t])
            }, error: function (e, t, n) {
                r.trigger("ajax:error", [e, t, n])
            }, crossDomain: l}, u && (f.xhrFields = {withCredentials: u}), o && (f.url = o);
            var p = n.ajax(f);
            return r.trigger("ajax:send", p), p
        }
        return!1
    }, handleMethod: function (r) {
        var i = n.href(r), o = r.data("method"), a = r.attr("target"), s = e("meta[name=csrf-token]").attr("content"), l = e("meta[name=csrf-param]").attr("content"), u = e('<form method="post" action="' + i + '"></form>'), c = '<input name="_method" value="' + o + '" type="hidden" />';
        l !== t && s !== t && (c += '<input name="' + l + '" value="' + s + '" type="hidden" />'), a && u.attr("target", a), u.hide().append(c).appendTo("body"), u.submit()
    }, disableFormElements: function (t) {
        t.find(n.disableSelector).each(function () {
            var t = e(this), n = t.is("button") ? "html" : "val";
            t.data("ujs:enable-with", t[n]()), t[n](t.data("disable-with")), t.prop("disabled", !0)
        })
    }, enableFormElements: function (t) {
        t.find(n.enableSelector).each(function () {
            var t = e(this), n = t.is("button") ? "html" : "val";
            t.data("ujs:enable-with") && t[n](t.data("ujs:enable-with")), t.prop("disabled", !1)
        })
    }, allowAction: function (e) {
        var t, r = e.data("confirm"), i = !1;
        return r ? (n.fire(e, "confirm") && (i = n.confirm(r), t = n.fire(e, "confirm:complete", [i])), i && t) : !0
    }, blankInputs: function (t, n, r) {
        var i, o, a = e(), s = n || "input,textarea", l = t.find(s);
        return l.each(function () {
            if (i = e(this), o = i.is("input[type=checkbox],input[type=radio]") ? i.is(":checked") : i.val(), !o == !r) {
                if (i.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + i.attr("name") + '"]').length)return!0;
                a = a.add(i)
            }
        }), a.length ? a : !1
    }, nonBlankInputs: function (e, t) {
        return n.blankInputs(e, t, !0)
    }, stopEverything: function (t) {
        return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), !1
    }, disableElement: function (e) {
        e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function (e) {
            return n.stopEverything(e)
        })
    }, enableElement: function (e) {
        e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.unbind("click.railsDisable")
    }}, n.fire(e(document), "rails:attachBindings") && (e.ajaxPrefilter(function (e, t, r) {
        e.crossDomain || n.CSRFProtection(r)
    }), e(document).delegate(n.linkDisableSelector, "ajax:complete", function () {
        n.enableElement(e(this))
    }), e(document).delegate(n.linkClickSelector, "click.rails", function (r) {
        var i = e(this), o = i.data("method"), a = i.data("params");
        if (!n.allowAction(i))return n.stopEverything(r);
        if (i.is(n.linkDisableSelector) && n.disableElement(i), i.data("remote") !== t) {
            if (!(!r.metaKey && !r.ctrlKey || o && "GET" !== o || a))return!0;
            var s = n.handleRemote(i);
            return s === !1 ? n.enableElement(i) : s.error(function () {
                n.enableElement(i)
            }), !1
        }
        return i.data("method") ? (n.handleMethod(i), !1) : void 0
    }), e(document).delegate(n.buttonClickSelector, "click.rails", function (t) {
        var r = e(this);
        return n.allowAction(r) ? (n.handleRemote(r), !1) : n.stopEverything(t)
    }), e(document).delegate(n.inputChangeSelector, "change.rails", function (t) {
        var r = e(this);
        return n.allowAction(r) ? (n.handleRemote(r), !1) : n.stopEverything(t)
    }), e(document).delegate(n.formSubmitSelector, "submit.rails", function (r) {
        var i = e(this), o = i.data("remote") !== t, a = n.blankInputs(i, n.requiredInputSelector), s = n.nonBlankInputs(i, n.fileInputSelector);
        if (!n.allowAction(i))return n.stopEverything(r);
        if (a && i.attr("novalidate") == t && n.fire(i, "ajax:aborted:required", [a]))return n.stopEverything(r);
        if (o) {
            if (s) {
                setTimeout(function () {
                    n.disableFormElements(i)
                }, 13);
                var l = n.fire(i, "ajax:aborted:file", [s]);
                return l || setTimeout(function () {
                    n.enableFormElements(i)
                }, 13), l
            }
            return n.handleRemote(i), !1
        }
        setTimeout(function () {
            n.disableFormElements(i)
        }, 13)
    }), e(document).delegate(n.formInputClickSelector, "click.rails", function (t) {
        var r = e(this);
        if (!n.allowAction(r))return n.stopEverything(t);
        var i = r.attr("name"), o = i ? {name: i, value: r.val()} : null;
        r.closest("form").data("ujs:submit-button", o)
    }), e(document).delegate(n.formSubmitSelector, "ajax:beforeSend.rails", function (t) {
        this == t.target && n.disableFormElements(e(this))
    }), e(document).delegate(n.formSubmitSelector, "ajax:complete.rails", function (t) {
        this == t.target && n.enableFormElements(e(this))
    }), e(function () {
        var t = e("meta[name=csrf-token]").attr("content"), n = e("meta[name=csrf-param]").attr("content");
        e('form input[name="' + n + '"]').val(t)
    }))
}(jQuery), /* ===================================================
 * bootstrap-transition.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
    !function (e) {
        "use strict";
        e(function () {
            e.support.transition = function () {
                var e = function () {
                    var e, t = document.createElement("bootstrap"), n = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend"};
                    for (e in n)if (void 0 !== t.style[e])return n[e]
                }();
                return e && {end: e}
            }()
        })
    }(window.jQuery), /* ==========================================================
 * bootstrap-alert.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
    !function (e) {
        "use strict";
        var t = '[data-dismiss="alert"]', n = function (n) {
            e(n).on("click", t, this.close)
        };
        n.prototype.close = function (t) {
            function n() {
                r.trigger("closed").remove()
            }

            var r, i = e(this), o = i.attr("data-target");
            o || (o = i.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), r = e(o), t && t.preventDefault(), r.length || (r = i.hasClass("alert") ? i : i.parent()), r.trigger(t = e.Event("close")), t.isDefaultPrevented() || (r.removeClass("in"), e.support.transition && r.hasClass("fade") ? r.on(e.support.transition.end, n) : n())
        };
        var r = e.fn.alert;
        e.fn.alert = function (t) {
            return this.each(function () {
                var r = e(this), i = r.data("alert");
                i || r.data("alert", i = new n(this)), "string" == typeof t && i[t].call(r)
            })
        }, e.fn.alert.Constructor = n, e.fn.alert.noConflict = function () {
            return e.fn.alert = r, this
        }, e(document).on("click.alert.data-api", t, n.prototype.close)
    }(window.jQuery), /* ============================================================
 * bootstrap-button.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
    !function (e) {
        "use strict";
        var t = function (t, n) {
            this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
        };
        t.prototype.setState = function (e) {
            var t = "disabled", n = this.$element, r = n.data(), i = n.is("input") ? "val" : "html";
            e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function () {
                "loadingText" == e ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
            }, 0)
        }, t.prototype.toggle = function () {
            var e = this.$element.closest('[data-toggle="buttons-radio"]');
            e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
        };
        var n = e.fn.button;
        e.fn.button = function (n) {
            return this.each(function () {
                var r = e(this), i = r.data("button"), o = "object" == typeof n && n;
                i || r.data("button", i = new t(this, o)), "toggle" == n ? i.toggle() : n && i.setState(n)
            })
        }, e.fn.button.defaults = {loadingText: "loading..."}, e.fn.button.Constructor = t, e.fn.button.noConflict = function () {
            return e.fn.button = n, this
        }, e(document).on("click.button.data-api", "[data-toggle^=button]", function (t) {
            var n = e(t.target);
            n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
        })
    }(window.jQuery), /* ==========================================================
 * bootstrap-carousel.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
    !function (e) {
        "use strict";
        var t = function (t, n) {
            this.$element = e(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, "hover" == this.options.pause && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
        };
        t.prototype = {cycle: function (t) {
            return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
        }, getActiveIndex: function () {
            return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
        }, to: function (t) {
            var n = this.getActiveIndex(), r = this;
            if (!(t > this.$items.length - 1 || 0 > t))return this.sliding ? this.$element.one("slid", function () {
                r.to(t)
            }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", e(this.$items[t]))
        }, pause: function (t) {
            return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this
        }, next: function () {
            return this.sliding ? void 0 : this.slide("next")
        }, prev: function () {
            return this.sliding ? void 0 : this.slide("prev")
        }, slide: function (t, n) {
            var r, i = this.$element.find(".item.active"), o = n || i[t](), a = this.interval, s = "next" == t ? "left" : "right", l = "next" == t ? "first" : "last", u = this;
            if (this.sliding = !0, a && this.pause(), o = o.length ? o : this.$element.find(".item")[l](), r = e.Event("slide", {relatedTarget: o[0], direction: s}), !o.hasClass("active")) {
                if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function () {
                    var t = e(u.$indicators.children()[u.getActiveIndex()]);
                    t && t.addClass("active")
                })), e.support.transition && this.$element.hasClass("slide")) {
                    if (this.$element.trigger(r), r.isDefaultPrevented())return;
                    o.addClass(t), o[0].offsetWidth, i.addClass(s), o.addClass(s), this.$element.one(e.support.transition.end, function () {
                        o.removeClass([t, s].join(" ")).addClass("active"), i.removeClass(["active", s].join(" ")), u.sliding = !1, setTimeout(function () {
                            u.$element.trigger("slid")
                        }, 0)
                    })
                } else {
                    if (this.$element.trigger(r), r.isDefaultPrevented())return;
                    i.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
                }
                return a && this.cycle(), this
            }
        }};
        var n = e.fn.carousel;
        e.fn.carousel = function (n) {
            return this.each(function () {
                var r = e(this), i = r.data("carousel"), o = e.extend({}, e.fn.carousel.defaults, "object" == typeof n && n), a = "string" == typeof n ? n : o.slide;
                i || r.data("carousel", i = new t(this, o)), "number" == typeof n ? i.to(n) : a ? i[a]() : o.interval && i.pause().cycle()
            })
        }, e.fn.carousel.defaults = {interval: 5e3, pause: "hover"}, e.fn.carousel.Constructor = t, e.fn.carousel.noConflict = function () {
            return e.fn.carousel = n, this
        }, e(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function (t) {
            var n, r, i = e(this), o = e(i.attr("data-target") || (n = i.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")), a = e.extend({}, o.data(), i.data());
            o.carousel(a), (r = i.attr("data-slide-to")) && o.data("carousel").pause().to(r).cycle(), t.preventDefault()
        })
    }(window.jQuery), /* =============================================================
 * bootstrap-collapse.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
    !function (e) {
        "use strict";
        var t = function (t, n) {
            this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
        };
        t.prototype = {constructor: t, dimension: function () {
            var e = this.$element.hasClass("width");
            return e ? "width" : "height"
        }, show: function () {
            var t, n, r, i;
            if (!this.transitioning && !this.$element.hasClass("in")) {
                if (t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in"), r && r.length) {
                    if (i = r.data("collapse"), i && i.transitioning)return;
                    r.collapse("hide"), i || r.data("collapse", null)
                }
                this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), e.support.transition && this.$element[t](this.$element[0][n])
            }
        }, hide: function () {
            var t;
            !this.transitioning && this.$element.hasClass("in") && (t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0))
        }, reset: function (e) {
            var t = this.dimension();
            return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[null !== e ? "addClass" : "removeClass"]("collapse"), this
        }, transition: function (t, n, r) {
            var i = this, o = function () {
                "show" == n.type && i.reset(), i.transitioning = 0, i.$element.trigger(r)
            };
            this.$element.trigger(n), n.isDefaultPrevented() || (this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, o) : o())
        }, toggle: function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }};
        var n = e.fn.collapse;
        e.fn.collapse = function (n) {
            return this.each(function () {
                var r = e(this), i = r.data("collapse"), o = e.extend({}, e.fn.collapse.defaults, r.data(), "object" == typeof n && n);
                i || r.data("collapse", i = new t(this, o)), "string" == typeof n && i[n]()
            })
        }, e.fn.collapse.defaults = {toggle: !0}, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function () {
            return e.fn.collapse = n, this
        }, e(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (t) {
            var n, r = e(this), i = r.attr("data-target") || t.preventDefault() || (n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""), o = e(i).data("collapse") ? "toggle" : r.data();
            r[e(i).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), e(i).collapse(o)
        })
    }(window.jQuery), /* ============================================================
 * bootstrap-dropdown.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
    !function (e) {
        "use strict";
        function t() {
            e(".dropdown-backdrop").remove(), e(r).each(function () {
                n(e(this)).removeClass("open")
            })
        }

        function n(t) {
            var n, r = t.attr("data-target");
            return r || (r = t.attr("href"), r = r && /#/.test(r) && r.replace(/.*(?=#[^\s]*$)/, "")), n = r && e(r), n && n.length || (n = t.parent()), n
        }

        var r = "[data-toggle=dropdown]", i = function (t) {
            var n = e(t).on("click.dropdown.data-api", this.toggle);
            e("html").on("click.dropdown.data-api", function () {
                n.parent().removeClass("open")
            })
        };
        i.prototype = {constructor: i, toggle: function () {
            var r, i, o = e(this);
            if (!o.is(".disabled, :disabled"))return r = n(o), i = r.hasClass("open"), t(), i || ("ontouchstart"in document.documentElement && e('<div class="dropdown-backdrop"/>').insertBefore(e(this)).on("click", t), r.toggleClass("open")), o.focus(), !1
        }, keydown: function (t) {
            var i, o, a, s, l;
            if (/(38|40|27)/.test(t.keyCode) && (i = e(this), t.preventDefault(), t.stopPropagation(), !i.is(".disabled, :disabled"))) {
                if (a = n(i), s = a.hasClass("open"), !s || s && 27 == t.keyCode)return 27 == t.which && a.find(r).focus(), i.click();
                o = e("[role=menu] li:not(.divider):visible a", a), o.length && (l = o.index(o.filter(":focus")), 38 == t.keyCode && l > 0 && l--, 40 == t.keyCode && l < o.length - 1 && l++, ~l || (l = 0), o.eq(l).focus())
            }
        }};
        var o = e.fn.dropdown;
        e.fn.dropdown = function (t) {
            return this.each(function () {
                var n = e(this), r = n.data("dropdown");
                r || n.data("dropdown", r = new i(this)), "string" == typeof t && r[t].call(n)
            })
        }, e.fn.dropdown.Constructor = i, e.fn.dropdown.noConflict = function () {
            return e.fn.dropdown = o, this
        }, e(document).on("click.dropdown.data-api", t).on("click.dropdown.data-api", ".dropdown form",function (e) {
            e.stopPropagation()
        }).on("click.dropdown.data-api", r, i.prototype.toggle).on("keydown.dropdown.data-api", r + ", [role=menu]", i.prototype.keydown)
    }(window.jQuery), /* =========================================================
 * bootstrap-modal.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
    !function (e) {
        "use strict";
        var t = function (t, n) {
            this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
        };
        t.prototype = {constructor: t, toggle: function () {
            return this[this.isShown ? "hide" : "show"]()
        }, show: function () {
            var t = this, n = e.Event("show");
            this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function () {
                var n = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1), t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function () {
                    t.$element.focus().trigger("shown")
                }) : t.$element.focus().trigger("shown")
            }))
        }, hide: function (t) {
            t && t.preventDefault(), t = e.Event("hide"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        }, enforceFocus: function () {
            var t = this;
            e(document).on("focusin.modal", function (e) {
                t.$element[0] === e.target || t.$element.has(e.target).length || t.$element.focus()
            })
        }, escape: function () {
            var e = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (t) {
                27 == t.which && e.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        }, hideWithTransition: function () {
            var t = this, n = setTimeout(function () {
                t.$element.off(e.support.transition.end), t.hideModal()
            }, 500);
            this.$element.one(e.support.transition.end, function () {
                clearTimeout(n), t.hideModal()
            })
        }, hideModal: function () {
            var e = this;
            this.$element.hide(), this.backdrop(function () {
                e.removeBackdrop(), e.$element.trigger("hidden")
            })
        }, removeBackdrop: function () {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, backdrop: function (t) {
            var n = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var r = e.support.transition && n;
                if (this.$backdrop = e('<div class="modal-backdrop ' + n + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? e.proxy(this.$element[0].focus, this.$element[0]) : e.proxy(this.hide, this)), r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t)return;
                r ? this.$backdrop.one(e.support.transition.end, t) : t()
            } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t) : t()) : t && t()
        }};
        var n = e.fn.modal;
        e.fn.modal = function (n) {
            return this.each(function () {
                var r = e(this), i = r.data("modal"), o = e.extend({}, e.fn.modal.defaults, r.data(), "object" == typeof n && n);
                i || r.data("modal", i = new t(this, o)), "string" == typeof n ? i[n]() : o.show && i.show()
            })
        }, e.fn.modal.defaults = {backdrop: !0, keyboard: !0, show: !0}, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function () {
            return e.fn.modal = n, this
        }, e(document).on("click.modal.data-api", '[data-toggle="modal"]', function (t) {
            var n = e(this), r = n.attr("href"), i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")), o = i.data("modal") ? "toggle" : e.extend({remote: !/#/.test(r) && r}, i.data(), n.data());
            t.preventDefault(), i.modal(o).one("hide", function () {
                n.focus()
            })
        })
    }(window.jQuery), /* ===========================================================
 * bootstrap-tooltip.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
    !function (e) {
        "use strict";
        var t = function (e, t) {
            this.init("tooltip", e, t)
        };
        t.prototype = {constructor: t, init: function (t, n, r) {
            var i, o, a, s, l;
            for (this.type = t, this.$element = e(n), this.options = this.getOptions(r), this.enabled = !0, a = this.options.trigger.split(" "), l = a.length; l--;)s = a[l], "click" == s ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : "manual" != s && (i = "hover" == s ? "mouseenter" : "focus", o = "hover" == s ? "mouseleave" : "blur", this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(o + "." + this.type, this.options.selector, e.proxy(this.leave, this)));
            this.options.selector ? this._options = e.extend({}, this.options, {trigger: "manual", selector: ""}) : this.fixTitle()
        }, getOptions: function (t) {
            return t = e.extend({}, e.fn[this.type].defaults, this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {show: t.delay, hide: t.delay}), t
        }, enter: function (t) {
            var n, r = e.fn[this.type].defaults, i = {};
            return this._options && e.each(this._options, function (e, t) {
                r[e] != t && (i[e] = t)
            }, this), n = e(t.currentTarget)[this.type](i).data(this.type), n.options.delay && n.options.delay.show ? (clearTimeout(this.timeout), n.hoverState = "in", this.timeout = setTimeout(function () {
                "in" == n.hoverState && n.show()
            }, n.options.delay.show), void 0) : n.show()
        }, leave: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), n.options.delay && n.options.delay.hide ? (n.hoverState = "out", this.timeout = setTimeout(function () {
                "out" == n.hoverState && n.hide()
            }, n.options.delay.hide), void 0) : n.hide()
        }, show: function () {
            var t, n, r, i, o, a, s = e.Event("show");
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(s), s.isDefaultPrevented())return;
                switch (t = this.tip(), this.setContent(), this.options.animation && t.addClass("fade"), o = "function" == typeof this.options.placement ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement, t.detach().css({top: 0, left: 0, display: "block"}), this.options.container ? t.appendTo(this.options.container) : t.insertAfter(this.$element), n = this.getPosition(), r = t[0].offsetWidth, i = t[0].offsetHeight, o) {
                    case"bottom":
                        a = {top: n.top + n.height, left: n.left + n.width / 2 - r / 2};
                        break;
                    case"top":
                        a = {top: n.top - i, left: n.left + n.width / 2 - r / 2};
                        break;
                    case"left":
                        a = {top: n.top + n.height / 2 - i / 2, left: n.left - r};
                        break;
                    case"right":
                        a = {top: n.top + n.height / 2 - i / 2, left: n.left + n.width}
                }
                this.applyPlacement(a, o), this.$element.trigger("shown")
            }
        }, applyPlacement: function (e, t) {
            var n, r, i, o, a = this.tip(), s = a[0].offsetWidth, l = a[0].offsetHeight;
            a.offset(e).addClass(t).addClass("in"), n = a[0].offsetWidth, r = a[0].offsetHeight, "top" == t && r != l && (e.top = e.top + l - r, o = !0), "bottom" == t || "top" == t ? (i = 0, e.left < 0 && (i = -2 * e.left, e.left = 0, a.offset(e), n = a[0].offsetWidth, r = a[0].offsetHeight), this.replaceArrow(i - s + n, n, "left")) : this.replaceArrow(r - l, r, "top"), o && a.offset(e)
        }, replaceArrow: function (e, t, n) {
            this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "")
        }, setContent: function () {
            var e = this.tip(), t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
        }, hide: function () {
            function t() {
                var t = setTimeout(function () {
                    n.off(e.support.transition.end).detach()
                }, 500);
                n.one(e.support.transition.end, function () {
                    clearTimeout(t), n.detach()
                })
            }

            var n = this.tip(), r = e.Event("hide");
            return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? t() : n.detach(), this.$element.trigger("hidden"), this)
        }, fixTitle: function () {
            var e = this.$element;
            (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
        }, hasContent: function () {
            return this.getTitle()
        }, getPosition: function () {
            var t = this.$element[0];
            return e.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() : {width: t.offsetWidth, height: t.offsetHeight}, this.$element.offset())
        }, getTitle: function () {
            var e, t = this.$element, n = this.options;
            return e = t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
        }, tip: function () {
            return this.$tip = this.$tip || e(this.options.template)
        }, arrow: function () {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, enable: function () {
            this.enabled = !0
        }, disable: function () {
            this.enabled = !1
        }, toggleEnabled: function () {
            this.enabled = !this.enabled
        }, toggle: function (t) {
            var n = t ? e(t.currentTarget)[this.type](this._options).data(this.type) : this;
            n.tip().hasClass("in") ? n.hide() : n.show()
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }};
        var n = e.fn.tooltip;
        e.fn.tooltip = function (n) {
            return this.each(function () {
                var r = e(this), i = r.data("tooltip"), o = "object" == typeof n && n;
                i || r.data("tooltip", i = new t(this, o)), "string" == typeof n && i[n]()
            })
        }, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1}, e.fn.tooltip.noConflict = function () {
            return e.fn.tooltip = n, this
        }
    }(window.jQuery), /* ===========================================================
 * bootstrap-popover.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */
    !function (e) {
        "use strict";
        var t = function (e, t) {
            this.init("popover", e, t)
        };
        t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {constructor: t, setContent: function () {
            var e = this.tip(), t = this.getTitle(), n = this.getContent();
            e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content")[this.options.html ? "html" : "text"](n), e.removeClass("fade top bottom left right in")
        }, hasContent: function () {
            return this.getTitle() || this.getContent()
        }, getContent: function () {
            var e, t = this.$element, n = this.options;
            return e = ("function" == typeof n.content ? n.content.call(t[0]) : n.content) || t.attr("data-content")
        }, tip: function () {
            return this.$tip || (this.$tip = e(this.options.template)), this.$tip
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }});
        var n = e.fn.popover;
        e.fn.popover = function (n) {
            return this.each(function () {
                var r = e(this), i = r.data("popover"), o = "object" == typeof n && n;
                i || r.data("popover", i = new t(this, o)), "string" == typeof n && i[n]()
            })
        }, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}), e.fn.popover.noConflict = function () {
            return e.fn.popover = n, this
        }
    }(window.jQuery), /* =============================================================
 * bootstrap-scrollspy.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */
    !function (e) {
        "use strict";
        function t(t, n) {
            var r, i = e.proxy(this.process, this), o = e(t).is("body") ? e(window) : e(t);
            this.options = e.extend({}, e.fn.scrollspy.defaults, n), this.$scrollElement = o.on("scroll.scroll-spy.data-api", i), this.selector = (this.options.target || (r = e(t).attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = e("body"), this.refresh(), this.process()
        }

        t.prototype = {constructor: t, refresh: function () {
            var t, n = this;
            this.offsets = e([]), this.targets = e([]), t = this.$body.find(this.selector).map(function () {
                var t = e(this), r = t.data("target") || t.attr("href"), i = /^#\w/.test(r) && e(r);
                return i && i.length && [
                    [i.position().top + (!e.isWindow(n.$scrollElement.get(0)) && n.$scrollElement.scrollTop()), r]
                ] || null
            }).sort(function (e, t) {
                return e[0] - t[0]
            }).each(function () {
                n.offsets.push(this[0]), n.targets.push(this[1])
            })
        }, process: function () {
            var e, t = this.$scrollElement.scrollTop() + this.options.offset, n = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, r = n - this.$scrollElement.height(), i = this.offsets, o = this.targets, a = this.activeTarget;
            if (t >= r)return a != (e = o.last()[0]) && this.activate(e);
            for (e = i.length; e--;)a != o[e] && t >= i[e] && (!i[e + 1] || t <= i[e + 1]) && this.activate(o[e])
        }, activate: function (t) {
            var n, r;
            this.activeTarget = t, e(this.selector).parent(".active").removeClass("active"), r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', n = e(r).parent("li").addClass("active"), n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
        }};
        var n = e.fn.scrollspy;
        e.fn.scrollspy = function (n) {
            return this.each(function () {
                var r = e(this), i = r.data("scrollspy"), o = "object" == typeof n && n;
                i || r.data("scrollspy", i = new t(this, o)), "string" == typeof n && i[n]()
            })
        }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.defaults = {offset: 10}, e.fn.scrollspy.noConflict = function () {
            return e.fn.scrollspy = n, this
        }, e(window).on("load", function () {
            e('[data-spy="scroll"]').each(function () {
                var t = e(this);
                t.scrollspy(t.data())
            })
        })
    }(window.jQuery), /* ========================================================
 * bootstrap-tab.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */
    !function (e) {
        "use strict";
        var t = function (t) {
            this.element = e(t)
        };
        t.prototype = {constructor: t, show: function () {
            var t, n, r, i = this.element, o = i.closest("ul:not(.dropdown-menu)"), a = i.attr("data-target");
            a || (a = i.attr("href"), a = a && a.replace(/.*(?=#[^\s]*$)/, "")), i.parent("li").hasClass("active") || (t = o.find(".active:last a")[0], r = e.Event("show", {relatedTarget: t}), i.trigger(r), r.isDefaultPrevented() || (n = e(a), this.activate(i.parent("li"), o), this.activate(n, n.parent(), function () {
                i.trigger({type: "shown", relatedTarget: t})
            })))
        }, activate: function (t, n, r) {
            function i() {
                o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), a ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
            }

            var o = n.find("> .active"), a = r && e.support.transition && o.hasClass("fade");
            a ? o.one(e.support.transition.end, i) : i(), o.removeClass("in")
        }};
        var n = e.fn.tab;
        e.fn.tab = function (n) {
            return this.each(function () {
                var r = e(this), i = r.data("tab");
                i || r.data("tab", i = new t(this)), "string" == typeof n && i[n]()
            })
        }, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function () {
            return e.fn.tab = n, this
        }, e(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (t) {
            t.preventDefault(), e(this).tab("show")
        })
    }(window.jQuery), /* =============================================================
 * bootstrap-typeahead.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
    !function (e) {
        "use strict";
        var t = function (t, n) {
            this.$element = e(t), this.options = e.extend({}, e.fn.typeahead.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = e(this.options.menu), this.shown = !1, this.listen()
        };
        t.prototype = {constructor: t, select: function () {
            var e = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(e)).change(), this.hide()
        }, updater: function (e) {
            return e
        }, show: function () {
            var t = e.extend({}, this.$element.position(), {height: this.$element[0].offsetHeight});
            return this.$menu.insertAfter(this.$element).css({top: t.top + t.height, left: t.left}).show(), this.shown = !0, this
        }, hide: function () {
            return this.$menu.hide(), this.shown = !1, this
        }, lookup: function () {
            var t;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (t = e.isFunction(this.source) ? this.source(this.query, e.proxy(this.process, this)) : this.source, t ? this.process(t) : this)
        }, process: function (t) {
            var n = this;
            return t = e.grep(t, function (e) {
                return n.matcher(e)
            }), t = this.sorter(t), t.length ? this.render(t.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        }, matcher: function (e) {
            return~e.toLowerCase().indexOf(this.query.toLowerCase())
        }, sorter: function (e) {
            for (var t, n = [], r = [], i = []; t = e.shift();)t.toLowerCase().indexOf(this.query.toLowerCase()) ? ~t.indexOf(this.query) ? r.push(t) : i.push(t) : n.push(t);
            return n.concat(r, i)
        }, highlighter: function (e) {
            var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return e.replace(new RegExp("(" + t + ")", "ig"), function (e, t) {
                return"<strong>" + t + "</strong>"
            })
        }, render: function (t) {
            var n = this;
            return t = e(t).map(function (t, r) {
                return t = e(n.options.item).attr("data-value", r), t.find("a").html(n.highlighter(r)), t[0]
            }), t.first().addClass("active"), this.$menu.html(t), this
        }, next: function () {
            var t = this.$menu.find(".active").removeClass("active"), n = t.next();
            n.length || (n = e(this.$menu.find("li")[0])), n.addClass("active")
        }, prev: function () {
            var e = this.$menu.find(".active").removeClass("active"), t = e.prev();
            t.length || (t = this.$menu.find("li").last()), t.addClass("active")
        }, listen: function () {
            this.$element.on("focus", e.proxy(this.focus, this)).on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("keyup", e.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", e.proxy(this.keydown, this)), this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this)).on("mouseleave", "li", e.proxy(this.mouseleave, this))
        }, eventSupported: function (e) {
            var t = e in this.$element;
            return t || (this.$element.setAttribute(e, "return;"), t = "function" == typeof this.$element[e]), t
        }, move: function (e) {
            if (this.shown) {
                switch (e.keyCode) {
                    case 9:
                    case 13:
                    case 27:
                        e.preventDefault();
                        break;
                    case 38:
                        e.preventDefault(), this.prev();
                        break;
                    case 40:
                        e.preventDefault(), this.next()
                }
                e.stopPropagation()
            }
        }, keydown: function (t) {
            this.suppressKeyPressRepeat = ~e.inArray(t.keyCode, [40, 38, 9, 13, 27]), this.move(t)
        }, keypress: function (e) {
            this.suppressKeyPressRepeat || this.move(e)
        }, keyup: function (e) {
            switch (e.keyCode) {
                case 40:
                case 38:
                case 16:
                case 17:
                case 18:
                    break;
                case 9:
                case 13:
                    if (!this.shown)return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown)return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            e.stopPropagation(), e.preventDefault()
        }, focus: function () {
            this.focused = !0
        }, blur: function () {
            this.focused = !1, !this.mousedover && this.shown && this.hide()
        }, click: function (e) {
            e.stopPropagation(), e.preventDefault(), this.select(), this.$element.focus()
        }, mouseenter: function (t) {
            this.mousedover = !0, this.$menu.find(".active").removeClass("active"), e(t.currentTarget).addClass("active")
        }, mouseleave: function () {
            this.mousedover = !1, !this.focused && this.shown && this.hide()
        }};
        var n = e.fn.typeahead;
        e.fn.typeahead = function (n) {
            return this.each(function () {
                var r = e(this), i = r.data("typeahead"), o = "object" == typeof n && n;
                i || r.data("typeahead", i = new t(this, o)), "string" == typeof n && i[n]()
            })
        }, e.fn.typeahead.defaults = {source: [], items: 8, menu: '<ul class="typeahead dropdown-menu"></ul>', item: '<li><a href="#"></a></li>', minLength: 1}, e.fn.typeahead.Constructor = t, e.fn.typeahead.noConflict = function () {
            return e.fn.typeahead = n, this
        }, e(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function () {
            var t = e(this);
            t.data("typeahead") || t.typeahead(t.data())
        })
    }(window.jQuery), /* ==========================================================
 * bootstrap-affix.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
    !function (e) {
        "use strict";
        var t = function (t, n) {
            this.options = e.extend({}, e.fn.affix.defaults, n), this.$window = e(window).on("scroll.affix.data-api", e.proxy(this.checkPosition, this)).on("click.affix.data-api", e.proxy(function () {
                setTimeout(e.proxy(this.checkPosition, this), 1)
            }, this)), this.$element = e(t), this.checkPosition()
        };
        t.prototype.checkPosition = function () {
            if (this.$element.is(":visible")) {
                var t, n = e(document).height(), r = this.$window.scrollTop(), i = this.$element.offset(), o = this.options.offset, a = o.bottom, s = o.top, l = "affix affix-top affix-bottom";
                "object" != typeof o && (a = s = o), "function" == typeof s && (s = o.top()), "function" == typeof a && (a = o.bottom()), t = null != this.unpin && r + this.unpin <= i.top ? !1 : null != a && i.top + this.$element.height() >= n - a ? "bottom" : null != s && s >= r ? "top" : !1, this.affixed !== t && (this.affixed = t, this.unpin = "bottom" == t ? i.top - r : null, this.$element.removeClass(l).addClass("affix" + (t ? "-" + t : "")))
            }
        };
        var n = e.fn.affix;
        e.fn.affix = function (n) {
            return this.each(function () {
                var r = e(this), i = r.data("affix"), o = "object" == typeof n && n;
                i || r.data("affix", i = new t(this, o)), "string" == typeof n && i[n]()
            })
        }, e.fn.affix.Constructor = t, e.fn.affix.defaults = {offset: 0}, e.fn.affix.noConflict = function () {
            return e.fn.affix = n, this
        }, e(window).on("load", function () {
            e('[data-spy="affix"]').each(function () {
                var t = e(this), n = t.data();
                n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
            })
        })
    }(window.jQuery), function () {
    var e, t, n;
    e = jQuery, n = function () {
        function e() {
            this.fileLoadingImage = "/assets/loading.gif", this.fileCloseImage = "/assets/close.png", this.resizeDuration = 700, this.fadeDuration = 500, this.labelImage = "Image", this.labelOf = "of"
        }

        return e
    }(), t = function () {
        function t(e) {
            this.options = e, this.album = [], this.currentImageIndex = void 0, this.init()
        }

        return t.prototype.init = function () {
            return this.enable(), this.build()
        }, t.prototype.enable = function () {
            var t = this;
            return e("body").on("click", "a[data-rel^=lightbox], area[data-rel^=lightbox]", function (n) {
                return t.start(e(n.currentTarget)), !1
            })
        }, t.prototype.build = function () {
            var t, n = this;
            e("<div>", {id: "lightboxOverlay"}).appendTo(e("body")), e("#lightboxOverlay").after(e("<div/>", {id: "lightbox"}).append(e("<div/>", {"class": "lb-outerContainer"}).append(e("<div/>", {"class": "lb-container"}).append(e("<img/>", {"class": "lb-image"}), e("<div/>", {"class": "lb-nav"}).append(e("<a/>", {"class": "lb-prev"}), e("<a/>", {"class": "lb-next"})), e("<div/>", {"class": "lb-loader"}).append(e("<a/>", {"class": "lb-cancel"}).append(e("<img/>", {src: this.options.fileLoadingImage}))))), e("<div/>", {"class": "lb-dataContainer"}).append(e("<div/>", {"class": "lb-data"}).append(e("<div/>", {"class": "lb-details"}).append(e("<span/>", {"class": "lb-caption"}), e("<span/>", {"class": "lb-number"})), e("<div/>", {"class": "lb-closeContainer"}).append(e("<a/>", {"class": "lb-close"}).append(e("<img/>", {src: this.options.fileCloseImage}))))))), e("#lightboxOverlay").hide().on("click", function () {
                return n.end(), !1
            }), t = e("#lightbox"), t.hide().on("click", function (t) {
                return"lightbox" === e(t.target).attr("id") && n.end(), !1
            }), t.find(".lb-outerContainer").on("click", function (t) {
                return"lightbox" === e(t.target).attr("id") && n.end(), !1
            }), t.find(".lb-prev").on("click", function () {
                return n.changeImage(n.currentImageIndex - 1), !1
            }), t.find(".lb-next").on("click", function () {
                return n.changeImage(n.currentImageIndex + 1), !1
            }), t.find(".lb-loader, .lb-close").on("click", function () {
                return n.end(), !1
            })
        }, t.prototype.start = function (t) {
            var n, r, i, o, a, s, l, u, c;
            if (e(window).on("resize", this.sizeOverlay), e("select, object, embed").css({visibility: "hidden"}), e("#lightboxOverlay").width(e(document).width()).height(e(document).height()).fadeIn(this.options.fadeDuration), this.album = [], a = 0, "lightbox" === t.attr("data-rel"))this.album.push({link: t.attr("href"), title: t.attr("title")}); else for (c = e(t.prop("tagName") + '[data-rel="' + t.attr("data-rel") + '"]'), o = 0, u = c.length; u > o; o++)i = c[o], this.album.push({link: e(i).attr("href"), title: e(i).attr("title")}), e(i).attr("href") === t.attr("href") && (a = o);
            r = e(window), l = r.scrollTop() + r.height() / 10, s = r.scrollLeft(), n = e("#lightbox"), n.css({top: l + "px", left: s + "px"}).fadeIn(this.options.fadeDuration), this.changeImage(a)
        }, t.prototype.changeImage = function (t) {
            var n, r, i, o = this;
            this.disableKeyboardNav(), r = e("#lightbox"), n = r.find(".lb-image"), this.sizeOverlay(), e("#lightboxOverlay").fadeIn(this.options.fadeDuration), e(".loader").fadeIn("slow"), r.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), r.find(".lb-outerContainer").addClass("animating"), i = new Image, i.onload = function () {
                return n.attr("src", o.album[t].link), n.width = i.width, n.height = i.height, o.sizeContainer(i.width, i.height)
            }, i.src = this.album[t].link, this.currentImageIndex = t
        }, t.prototype.sizeOverlay = function () {
            return e("#lightboxOverlay").width(e(document).width()).height(e(document).height())
        }, t.prototype.sizeContainer = function (t, n) {
            var r, i, o, a, s, l, u, c, f, d, p, h = this;
            i = e("#lightbox"), o = i.find(".lb-outerContainer"), p = o.outerWidth(), d = o.outerHeight(), r = i.find(".lb-container"), u = parseInt(r.css("padding-top"), 10), l = parseInt(r.css("padding-right"), 10), a = parseInt(r.css("padding-bottom"), 10), s = parseInt(r.css("padding-left"), 10), f = t + s + l, c = n + u + a, f !== p && c !== d ? o.animate({width: f, height: c}, this.options.resizeDuration, "swing") : f !== p ? o.animate({width: f}, this.options.resizeDuration, "swing") : c !== d && o.animate({height: c}, this.options.resizeDuration, "swing"), setTimeout(function () {
                i.find(".lb-dataContainer").width(f), i.find(".lb-prevLink").height(c), i.find(".lb-nextLink").height(c), h.showImage()
            }, this.options.resizeDuration)
        }, t.prototype.showImage = function () {
            var t;
            t = e("#lightbox"), t.find(".lb-loader").hide(), t.find(".lb-image").fadeIn("slow"), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
        }, t.prototype.updateNav = function () {
            var t;
            t = e("#lightbox"), t.find(".lb-nav").show(), this.currentImageIndex > 0 && t.find(".lb-prev").show(), this.currentImageIndex < this.album.length - 1 && t.find(".lb-next").show()
        }, t.prototype.updateDetails = function () {
            var t, n = this;
            t = e("#lightbox"), "undefined" != typeof this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title && t.find(".lb-caption").html(this.album[this.currentImageIndex].title).fadeIn("fast"), this.album.length > 1 ? t.find(".lb-number").html(this.options.labelImage + " " + (this.currentImageIndex + 1) + " " + this.options.labelOf + "  " + this.album.length).fadeIn("fast") : t.find(".lb-number").hide(), t.find(".lb-outerContainer").removeClass("animating"), t.find(".lb-dataContainer").fadeIn(this.resizeDuration, function () {
                return n.sizeOverlay()
            })
        }, t.prototype.preloadNeighboringImages = function () {
            var e, t;
            this.album.length > this.currentImageIndex + 1 && (e = new Image, e.src = this.album[this.currentImageIndex + 1].link), this.currentImageIndex > 0 && (t = new Image, t.src = this.album[this.currentImageIndex - 1].link)
        }, t.prototype.enableKeyboardNav = function () {
            e(document).on("keyup.keyboard", e.proxy(this.keyboardAction, this))
        }, t.prototype.disableKeyboardNav = function () {
            e(document).off(".keyboard")
        }, t.prototype.keyboardAction = function (e) {
            var t, n, r, i, o;
            t = 27, n = 37, r = 39, o = e.keyCode, i = String.fromCharCode(o).toLowerCase(), o === t || i.match(/x|o|c/) ? this.end() : "p" === i || o === n ? 0 !== this.currentImageIndex && this.changeImage(this.currentImageIndex - 1) : ("n" === i || o === r) && this.currentImageIndex !== this.album.length - 1 && this.changeImage(this.currentImageIndex + 1)
        }, t.prototype.end = function () {
            return this.disableKeyboardNav(), e(window).off("resize", this.sizeOverlay), e("#lightbox").fadeOut(this.options.fadeDuration), e("#lightboxOverlay").fadeOut(this.options.fadeDuration), e("select, object, embed").css({visibility: "visible"})
        }, t
    }(), e(function () {
        var e, r;
        return r = new n, e = new t(r)
    })
}.call(this);
var q = null;
window.PR_SHOULD_USE_CONTINUATION = !0, function () {
    function e(e) {
        function t(e) {
            var t = e.charCodeAt(0);
            if (92 !== t)return t;
            var n = e.charAt(1);
            return(t = f[n]) ? t : n >= "0" && "7" >= n ? parseInt(e.substring(1), 8) : "u" === n || "x" === n ? parseInt(e.substring(2), 16) : e.charCodeAt(1)
        }

        function n(e) {
            return 32 > e ? (16 > e ? "\\x0" : "\\x") + e.toString(16) : (e = String.fromCharCode(e), ("\\" === e || "-" === e || "[" === e || "]" === e) && (e = "\\" + e), e)
        }

        function r(e) {
            for (var r = e.substring(1, e.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g), e = [], i = [], o = "^" === r[0], a = o ? 1 : 0, s = r.length; s > a; ++a) {
                var l = r[a];
                if (/\\[bdsw]/i.test(l))e.push(l); else {
                    var u, l = t(l);
                    s > a + 2 && "-" === r[a + 1] ? (u = t(r[a + 2]), a += 2) : u = l, i.push([l, u]), 65 > u || l > 122 || (65 > u || l > 90 || i.push([32 | Math.max(65, l), 32 | Math.min(u, 90)]), 97 > u || l > 122 || i.push([-33 & Math.max(97, l), -33 & Math.min(u, 122)]))
                }
            }
            for (i.sort(function (e, t) {
                return e[0] - t[0] || t[1] - e[1]
            }), r = [], l = [0 / 0, 0 / 0], a = 0; a < i.length; ++a)s = i[a], s[0] <= l[1] + 1 ? l[1] = Math.max(l[1], s[1]) : r.push(l = s);
            for (i = ["["], o && i.push("^"), i.push.apply(i, e), a = 0; a < r.length; ++a)s = r[a], i.push(n(s[0])), s[1] > s[0] && (s[1] + 1 > s[0] && i.push("-"), i.push(n(s[1])));
            return i.push("]"), i.join("")
        }

        function i(e) {
            for (var t = e.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), n = t.length, i = [], s = 0, l = 0; n > s; ++s) {
                var u = t[s];
                "(" === u ? ++l : "\\" === u.charAt(0) && (u = +u.substring(1)) && l >= u && (i[u] = -1)
            }
            for (s = 1; s < i.length; ++s)-1 === i[s] && (i[s] = ++o);
            for (l = s = 0; n > s; ++s)u = t[s], "(" === u ? (++l, void 0 === i[l] && (t[s] = "(?:")) : "\\" === u.charAt(0) && (u = +u.substring(1)) && l >= u && (t[s] = "\\" + i[l]);
            for (l = s = 0; n > s; ++s)"^" === t[s] && "^" !== t[s + 1] && (t[s] = "");
            if (e.ignoreCase && a)for (s = 0; n > s; ++s)u = t[s], e = u.charAt(0), u.length >= 2 && "[" === e ? t[s] = r(u) : "\\" !== e && (t[s] = u.replace(/[A-Za-z]/g, function (e) {
                return e = e.charCodeAt(0), "[" + String.fromCharCode(-33 & e, 32 | e) + "]"
            }));
            return t.join("")
        }

        for (var o = 0, a = !1, s = !1, l = 0, u = e.length; u > l; ++l) {
            var c = e[l];
            if (c.ignoreCase)s = !0; else if (/[a-z]/i.test(c.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
                a = !0, s = !1;
                break
            }
        }
        for (var f = {b: 8, t: 9, n: 10, v: 11, f: 12, r: 13}, d = [], l = 0, u = e.length; u > l; ++l) {
            if (c = e[l], c.global || c.multiline)throw Error("" + c);
            d.push("(?:" + i(c) + ")")
        }
        return RegExp(d.join("|"), s ? "gi" : "g")
    }

    function t(e) {
        function t(e) {
            switch (e.nodeType) {
                case 1:
                    if (r.test(e.className))break;
                    for (var n = e.firstChild; n; n = n.nextSibling)t(n);
                    n = e.nodeName, ("BR" === n || "LI" === n) && (i[s] = "\n", a[s << 1] = o++, a[1 | s++ << 1] = e);
                    break;
                case 3:
                case 4:
                    n = e.nodeValue, n.length && (n = l ? n.replace(/\r\n?/g, "\n") : n.replace(/[\t\n\r ]+/g, " "), i[s] = n, a[s << 1] = o, o += n.length, a[1 | s++ << 1] = e)
            }
        }

        var n, r = /(?:^|\s)nocode(?:\s|$)/, i = [], o = 0, a = [], s = 0;
        e.currentStyle ? n = e.currentStyle.whiteSpace : window.getComputedStyle && (n = document.defaultView.getComputedStyle(e, q).getPropertyValue("white-space"));
        var l = n && "pre" === n.substring(0, 3);
        return t(e), {a: i.join("").replace(/\n$/, ""), c: a}
    }

    function n(e, t, n, r) {
        t && (e = {a: t, d: e}, n(e), r.push.apply(r, e.e))
    }

    function r(t, r) {
        function i(e) {
            for (var t = e.d, u = [t, "pln"], c = 0, f = e.a.match(o) || [], d = {}, p = 0, h = f.length; h > p; ++p) {
                var m, g = f[p], y = d[g], v = void 0;
                if ("string" == typeof y)m = !1; else {
                    var b = a[g.charAt(0)];
                    if (b)v = g.match(b[1]), y = b[0]; else {
                        for (m = 0; l > m; ++m)if (b = r[m], v = g.match(b[1])) {
                            y = b[0];
                            break
                        }
                        v || (y = "pln")
                    }
                    !(m = y.length >= 5 && "lang-" === y.substring(0, 5)) || v && "string" == typeof v[1] || (m = !1, y = "src"), m || (d[g] = y)
                }
                if (b = c, c += g.length, m) {
                    m = v[1];
                    var x = g.indexOf(m), w = x + m.length;
                    v[2] && (w = g.length - v[2].length, x = w - m.length), y = y.substring(5), n(t + b, g.substring(0, x), i, u), n(t + b + x, m, s(y, m), u), n(t + b + w, g.substring(w), i, u)
                } else u.push(t + b, y)
            }
            e.e = u
        }

        var o, a = {};
        !function () {
            for (var n = t.concat(r), i = [], s = {}, l = 0, u = n.length; u > l; ++l) {
                var c = n[l], f = c[3];
                if (f)for (var d = f.length; --d >= 0;)a[f.charAt(d)] = c;
                c = c[1], f = "" + c, s.hasOwnProperty(f) || (i.push(c), s[f] = q)
            }
            i.push(/[\S\s]/), o = e(i)
        }();
        var l = r.length;
        return i
    }

    function i(e) {
        var t = [], n = [];
        e.tripleQuotedStrings ? t.push(["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, q, "'\""]) : e.multiLineStrings ? t.push(["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/, q, "'\"`"]) : t.push(["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, q, "\"'"]), e.verbatimStrings && n.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, q]);
        var i = e.hashComments;
        return i && (e.cStyleComments ? (i > 1 ? t.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, q, "#"]) : t.push(["com", /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/, q, "#"]), n.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/, q])) : t.push(["com", /^#[^\n\r]*/, q, "#"])), e.cStyleComments && (n.push(["com", /^\/\/[^\n\r]*/, q]), n.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, q])), e.regexLiterals && n.push(["lang-regex", /^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]), (i = e.types) && n.push(["typ", i]), e = ("" + e.keywords).replace(/^ | $/g, ""), e.length && n.push(["kwd", RegExp("^(?:" + e.replace(/[\s,]+/g, "|") + ")\\b"), q]), t.push(["pln", /^\s+/, q, " \r\n	 "]), n.push(["lit", /^@[$_a-z][\w$@]*/i, q], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, q], ["pln", /^[$_a-z][\w$@]*/i, q], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, q, "0123456789"], ["pln", /^\\[\S\s]?/, q], ["pun", /^.[^\s\w"-$'./@\\`]*/, q]), r(t, n)
    }

    function o(e, t) {
        function n(e) {
            switch (e.nodeType) {
                case 1:
                    if (o.test(e.className))break;
                    if ("BR" === e.nodeName)r(e), e.parentNode && e.parentNode.removeChild(e); else for (e = e.firstChild; e; e = e.nextSibling)n(e);
                    break;
                case 3:
                case 4:
                    if (l) {
                        var t = e.nodeValue, i = t.match(a);
                        if (i) {
                            var u = t.substring(0, i.index);
                            e.nodeValue = u, (t = t.substring(i.index + i[0].length)) && e.parentNode.insertBefore(s.createTextNode(t), e.nextSibling), r(e), u || e.parentNode.removeChild(e)
                        }
                    }
            }
        }

        function r(e) {
            function t(e, n) {
                var r = n ? e.cloneNode(!1) : e, i = e.parentNode;
                if (i) {
                    var i = t(i, 1), o = e.nextSibling;
                    i.appendChild(r);
                    for (var a = o; a; a = o)o = a.nextSibling, i.appendChild(a)
                }
                return r
            }

            for (; !e.nextSibling;)if (e = e.parentNode, !e)return;
            for (var n, e = t(e.nextSibling, 0); (n = e.parentNode) && 1 === n.nodeType;)e = n;
            u.push(e)
        }

        var i, o = /(?:^|\s)nocode(?:\s|$)/, a = /\r\n?|\n/, s = e.ownerDocument;
        e.currentStyle ? i = e.currentStyle.whiteSpace : window.getComputedStyle && (i = s.defaultView.getComputedStyle(e, q).getPropertyValue("white-space"));
        var l = i && "pre" === i.substring(0, 3);
        for (i = s.createElement("LI"); e.firstChild;)i.appendChild(e.firstChild);
        for (var u = [i], c = 0; c < u.length; ++c)n(u[c]);
        t === (0 | t) && u[0].setAttribute("value", t);
        var f = s.createElement("OL");
        f.className = "linenums";
        for (var d = Math.max(0, 0 | t - 1) || 0, c = 0, p = u.length; p > c; ++c)i = u[c], i.className = "L" + (c + d) % 10, i.firstChild || i.appendChild(s.createTextNode(" ")), f.appendChild(i);
        e.appendChild(f)
    }

    function a(e, t) {
        for (var n = t.length; --n >= 0;) {
            var r = t[n];
            b.hasOwnProperty(r) ? window.console && console.warn("cannot override language handler %s", r) : b[r] = e
        }
    }

    function s(e, t) {
        return e && b.hasOwnProperty(e) || (e = /^\s*</.test(t) ? "default-markup" : "default-code"), b[e]
    }

    function l(e) {
        var n = e.g;
        try {
            var r = t(e.h), i = r.a;
            e.a = i, e.c = r.c, e.d = 0, s(n, i)(e);
            var o = /\bMSIE\b/.test(navigator.userAgent), n = /\n/g, a = e.a, l = a.length, r = 0, u = e.c, c = u.length, i = 0, f = e.e, d = f.length, e = 0;
            f[d] = l;
            var p, h;
            for (h = p = 0; d > h;)f[h] !== f[h + 2] ? (f[p++] = f[h++], f[p++] = f[h++]) : h += 2;
            for (d = p, h = p = 0; d > h;) {
                for (var m = f[h], g = f[h + 1], y = h + 2; d >= y + 2 && f[y + 1] === g;)y += 2;
                f[p++] = m, f[p++] = g, h = y
            }
            for (f.length = p; c > i;) {
                var v, b = u[i + 2] || l, x = f[e + 2] || l, y = Math.min(b, x), w = u[i + 1];
                if (1 !== w.nodeType && (v = a.substring(r, y))) {
                    o && (v = v.replace(n, "\r")), w.nodeValue = v;
                    var C = w.ownerDocument, T = C.createElement("SPAN");
                    T.className = f[e + 1];
                    var k = w.parentNode;
                    k.replaceChild(T, w), T.appendChild(w), b > r && (u[i + 1] = w = C.createTextNode(a.substring(y, b)), k.insertBefore(w, T.nextSibling))
                }
                r = y, r >= b && (i += 2), r >= x && (e += 2)
            }
        } catch (S) {
            "console"in window && console.log(S && S.stack ? S.stack : S)
        }
    }

    var u = ["break,continue,do,else,for,if,return,while"], c = [
        [u, "auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
        "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"
    ], f = [c, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"], d = [c, "abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"], p = [d, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"], c = [c, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"], h = [u, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"], m = [u, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"], u = [u, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"], g = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/, y = /\S/, v = i({keywords: [f, p, c, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END" + h, m, u], hashComments: !0, cStyleComments: !0, multiLineStrings: !0, regexLiterals: !0}), b = {};
    a(v, ["default-code"]), a(r([], [
        ["pln", /^[^<?]+/],
        ["dec", /^<!\w[^>]*(?:>|$)/],
        ["com", /^<\!--[\S\s]*?(?:--\>|$)/],
        ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/],
        ["lang-", /^<%([\S\s]+?)(?:%>|$)/],
        ["pun", /^(?:<[%?]|[%?]>)/],
        ["lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],
        ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],
        ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],
        ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
    ]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]), a(r([
        ["pln", /^\s+/, q, " 	\r\n"],
        ["atv", /^(?:"[^"]*"?|'[^']*'?)/, q, "\"'"]
    ], [
        ["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],
        ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
        ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],
        ["pun", /^[/<->]+/],
        ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i],
        ["lang-js", /^on\w+\s*=\s*'([^']+)'/i],
        ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i],
        ["lang-css", /^style\s*=\s*"([^"]+)"/i],
        ["lang-css", /^style\s*=\s*'([^']+)'/i],
        ["lang-css", /^style\s*=\s*([^\s"'>]+)/i]
    ]), ["in.tag"]), a(r([], [
        ["atv", /^[\S\s]+/]
    ]), ["uq.val"]), a(i({keywords: f, hashComments: !0, cStyleComments: !0, types: g}), ["c", "cc", "cpp", "cxx", "cyc", "m"]), a(i({keywords: "null,true,false"}), ["json"]), a(i({keywords: p, hashComments: !0, cStyleComments: !0, verbatimStrings: !0, types: g}), ["cs"]), a(i({keywords: d, cStyleComments: !0}), ["java"]), a(i({keywords: u, hashComments: !0, multiLineStrings: !0}), ["bsh", "csh", "sh"]), a(i({keywords: h, hashComments: !0, multiLineStrings: !0, tripleQuotedStrings: !0}), ["cv", "py"]), a(i({keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", hashComments: !0, multiLineStrings: !0, regexLiterals: !0}), ["perl", "pl", "pm"]), a(i({keywords: m, hashComments: !0, multiLineStrings: !0, regexLiterals: !0}), ["rb"]), a(i({keywords: c, cStyleComments: !0, regexLiterals: !0}), ["js"]), a(i({keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes", hashComments: 3, cStyleComments: !0, multilineStrings: !0, tripleQuotedStrings: !0, regexLiterals: !0}), ["coffee"]), a(r([], [
        ["str", /^[\S\s]+/]
    ]), ["regex"]), window.prettyPrintOne = function (e, t, n) {
        var r = document.createElement("PRE");
        return r.innerHTML = e, n && o(r, n), l({g: t, i: n, h: r}), r.innerHTML
    }, window.prettyPrint = function (e) {
        function t() {
            for (var n = window.PR_SHOULD_USE_CONTINUATION ? u.now() + 250 : 1 / 0; f < r.length && u.now() < n; f++) {
                var i = r[f], a = i.className;
                if (a.indexOf("prettyprint") >= 0) {
                    var s, p, a = a.match(d);
                    if (p = !a) {
                        p = i;
                        for (var h = void 0, m = p.firstChild; m; m = m.nextSibling)var g = m.nodeType, h = 1 === g ? h ? p : m : 3 === g ? y.test(m.nodeValue) ? p : h : h;
                        p = (s = h === p ? void 0 : h) && "CODE" === s.tagName
                    }
                    for (p && (a = s.className.match(d)), a && (a = a[1]), p = !1, h = i.parentNode; h; h = h.parentNode)if (("pre" === h.tagName || "code" === h.tagName || "xmp" === h.tagName) && h.className && h.className.indexOf("prettyprint") >= 0) {
                        p = !0;
                        break
                    }
                    p || ((p = (p = i.className.match(/\blinenums\b(?::(\d+))?/)) ? p[1] && p[1].length ? +p[1] : !0 : !1) && o(i, p), c = {g: a, h: i, i: p}, l(c))
                }
            }
            f < r.length ? setTimeout(t, 250) : e && e()
        }

        for (var n = [document.getElementsByTagName("pre"), document.getElementsByTagName("code"), document.getElementsByTagName("xmp")], r = [], i = 0; i < n.length; ++i)for (var a = 0, s = n[i].length; s > a; ++a)r.push(n[i][a]);
        var n = q, u = Date;
        u.now || (u = {now: function () {
            return+new Date
        }});
        var c, f = 0, d = /\blang(?:uage)?-([\w.]+)(?!\S)/;
        t()
    }, window.PR = {createSimpleLexer: r, registerLangHandler: a, sourceDecorator: i, PR_ATTRIB_NAME: "atn", PR_ATTRIB_VALUE: "atv", PR_COMMENT: "com", PR_DECLARATION: "dec", PR_KEYWORD: "kwd", PR_LITERAL: "lit", PR_NOCODE: "nocode", PR_PLAIN: "pln", PR_PUNCTUATION: "pun", PR_SOURCE: "src", PR_STRING: "str", PR_TAG: "tag", PR_TYPE: "typ"}
}(), function () {
    $(function () {
        return $(".tooltip-examples a, .tooltip-paragraph-examples a").tooltip({animation: !1}), $(".top-sign-in").on("click", function () {
            return $(".login-box").fadeIn("fast"), !1
        }), $(".login-box-close").on("click", function () {
            return $(this).closest(".login-box").fadeOut("fast"), !1
        }), prettyPrint(), $(".slider-browser-center").animate({bottom: $(".slider-browser-center").data("position-bottom")}, "fast", function () {
            return $(".slider-browser-left").animate({bottom: $(".slider-browser-left").data("position-bottom")}, "fast", function () {
                return $(".slider-browser-right").animate({bottom: $(".slider-browser-right").data("position-bottom")}, "fast")
            })
        }), $(".carousel").carousel({interval: !1}), $('a[data-toggle="testimonial"]').on("click", function () {
            return $(this).closest(".testimonials-users").find('a[data-toggle="testimonial"]').removeClass("active"), $(this).addClass("active"), $(".testimonials-speech").removeClass("active"), $(".testimonials-speech" + $(this).attr("href")).addClass("active"), !1
        }), $("body").on("touchstart.dropdown", ".dropdown-menu", function (e) {
            return e.stopPropagation()
        }), $(document).on("click", ".dropdown-menu a", function () {
            return document.location = $(this).attr("href")
        }), $("#gridSystem").length && $("#gridSystem").tooltip({selector: ".show-grid > div", title: function () {
            return $(this).width() + "px"
        }}), $(".tooltip-demo").tooltip({selector: "a[rel=tooltip]"}), $(".tooltip-test").tooltip(), $(".popover-test").popover(), $("a[rel=popover]").popover().click(function (e) {
            return e.preventDefault()
        })
    })
}.call(this);