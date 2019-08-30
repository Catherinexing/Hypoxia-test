function telescopeInit() {
  function e(e) {
    var t = this;
    t.id = e, t.canvas = document.getElementById(e), t.canvas.setAttribute("width", t.canvas.offsetWidth), t.canvas.setAttribute("height", t.canvas.offsetWidth / 2), t.context = t.canvas.getContext("2d"), t.image = document.getElementById(e + "_preload"), t.context || (t.canvas.setAttribute("width", "0px"), t.canvas.setAttribute("width", "0px"), t.image.setAttribute("width", t.canvas.offsetWidth + "px"), t.image.setAttribute("height", "auto")), t.totalImages = 36, t.currentImage = 0, t.startImage = 0, t.travelDistance = 0, t.startX = 0, t.positionA = 0, t.imageArray = [];
    for (var n = 0; n < t.totalImages; n++) t.fileNumber = (n + 1).toString().padStart(4, "0"), t.imageArray[n] = new Image, t.imageArray[n].src = s < 420 ? "img/" + e + "_table" + t.fileNumber + "_400.jpg" : "img/" + e + "_table" + t.fileNumber + ".jpg";
    t.resize = function() {
      t.canvas.setAttribute("width", t.canvas.offsetWidth), t.canvas.setAttribute("height", t.canvas.offsetWidth / 2), t.imageArray = [];
      for (var n = 0; n < t.totalImages; n++) t.fileNumber = (n + 1).toString().padStart(4, "0"), t.imageArray[n] = new Image, t.imageArray[n].src = s < 420 ? "img/" + e + "_table" + t.fileNumber + "_400.jpg" : "img/" + e + "_table" + t.fileNumber + ".jpg";
      t.context || (t.canvas.setAttribute("width", "0px"), t.canvas.setAttribute("width", "0px"), t.image.setAttribute("width", t.canvas.offsetWidth + "px"), t.image.setAttribute("height", "auto"))
    }
  }

  function t(e) {
    function t(e) {
      e.layerX || 0 == e.layerX ? (e._x = e.layerX, e._y = e.layerY) : e.offsetX || 0 == e.offsetX ? (e._x = e.offsetX, e._y = e.offsetY) : (e.changedTouches[0].clientX || 0 == e.changedTouches[0].clientX) && (e._x = e.changedTouches[0].clientX, e._y = e.changedTouches[0].clientY);
      var t = n[e.type];
      t && t(e)
    }
    var n = new function(e) {
      var t = this;
      this.started = !1, this.mousedown = function(n) {
        n.preventDefault(), e.context.moveTo(n._x, n._y), t.started = !0, startX = n._x, e.startImage = e.currentImage
      }, this.mousemove = function(n) {
        if (n.preventDefault(), t.started) {
          e.context.clearRect(0, 0, e.canvas.width, e.canvas.height);
          var i = Math.round(n._x - startX),
            o = (e.canvas.width, 100 * i / e.canvas.width);
          for (travelDistance = Math.round(e.totalImages * o / 100), e.currentImage = e.startImage + travelDistance; e.currentImage > e.totalImages - 1;) e.currentImage = e.currentImage - e.totalImages;
          for (; e.currentImage < 0;) e.currentImage = e.currentImage + e.totalImages;
          e.context.drawImage(e.imageArray[e.currentImage], 0, 0, e.canvas.width, e.canvas.height)
        }
      }, this.mouseup = function(e) {
        e.preventDefault(), t.started && (t.mousemove(e), t.started = !1)
      }, this.touchstart = function(n) {
        n.preventDefault(), e.context.moveTo(n._x, n._y), t.started = !0, startX = n._x, e.startImage = e.currentImage
      }, this.touchmove = function(n) {
        if (n.preventDefault(), t.started) {
          e.context.clearRect(0, 0, e.canvas.width, e.canvas.height);
          var i = Math.round(n._x - startX),
            o = (e.canvas.width, 100 * i / e.canvas.width);
          for (travelDistance = Math.round(e.totalImages * o / 100), e.currentImage = e.startImage + travelDistance; e.currentImage > e.totalImages - 1;) e.currentImage = e.currentImage - e.totalImages;
          for (; e.currentImage < 0;) e.currentImage = e.currentImage + e.totalImages;
          e.context.drawImage(e.imageArray[e.currentImage], 0, 0, e.canvas.width, e.canvas.height)
        }
      }, this.touchend = function(e) {
        e.preventDefault(), t.started && (t.mousemove(e), t.started = !1)
      }
    }(e);
    e.canvas.addEventListener("mousedown", t, !1), e.canvas.addEventListener("mousemove", t, !1), e.canvas.addEventListener("mouseup", t, !1), e.canvas.addEventListener("touchstart", t, !1), e.canvas.addEventListener("touchmove", t, !1), e.canvas.addEventListener("touchend", t, !1)
  }

  function n(e) {
    e.currentImage == e.totalImages - 1 && (e.currentImage = 0);
    var t = e.id + "_gesture";
    document.getElementById(t).classList.remove("inview");
    var n = setInterval(function() {
      e.currentImage == e.totalImages - 1 ? (clearInterval(n), e.context.clearRect(0, 0, e.canvas.width, e.canvas.height), e.context.drawImage(e.imageArray[0], 0, 0, e.canvas.width, e.canvas.height), document.getElementById(t).classList.add("inview")) : (e.currentImage++, e.context.clearRect(0, 0, e.canvas.width, e.canvas.height), e.context.drawImage(e.imageArray[e.currentImage], 0, 0, e.canvas.width, e.canvas.height))
    }, 80)
  }
  var i, o, r, a, s = window.innerWidth,
    l = window.innerHeight;
  $(".img-lazy").each(function(e, t) {
    var n, i = t.getAttribute("data-pattern");
    n = s < 420 ? i.replace("{{size}}", "400") : i.replace("{{size}}", "800"), $(t).attr("data-src", n)
  }), $(document).ready(function() {
    i = new e("Lynx"), o = new e("HabEx"), t(i), t(o), $("article").fullpage({
      navigation: !0,
      navigationPosition: "right",
      lazyLoading: !0,
      recordHistory: !1,
      touchSensitivity: 8,
      normalScrollElements: "#habex_container",
      afterLoad: function(e, t) {
        $(this);
        1 === t ? $("#swipedown").addClass("inview") : $("#swipedown").removeClass("inview"), 3 === t ? (n(i), $("#swipedown1").addClass("inview")) : $("#swipedown1").removeClass("inview"), 5 === t ? $("#swipe1").addClass("inview") : $("#swipe1").removeClass("inview"), 6 === t ? (n(o), $("#swipedown2").addClass("inview")) : $("#swipedown2").removeClass("inview"), 8 === t ? $("#swipe2").addClass("inview") : $("#swipe2").removeClass("inview"), 9 === t ? (n(r), $("#swipedown3").addClass("inview")) : $("#swipedown3").removeClass("inview"), 11 === t ? $("#swipe3").addClass("inview") : $("#swipe3").removeClass("inview"), 12 === t ? (n(a), $("#swipedown4").addClass("inview")) : $("#swipedown4").removeClass("inview"), 14 === t ? $("#swipe4").addClass("inview") : $("#swipe4").removeClass("inview")
      }
    })
  }), window.addEventListener("resize", function() {
    s = window.innerWidth, l = window.innerHeight, $(".img-lazy").each(function(e, t) {
      var n, i = t.getAttribute("data-pattern");
      n = s < 420 ? i.replace("{{size}}", "400") : i.replace("{{size}}", "800"), $(t).attr("src", n)
    }), i.resize(), o.resize(), r.resize(), a.resize()
  })
}! function(e, t) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
    if (!e.document) throw new Error("jQuery requires a window with a document");
    return t(e)
  } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
  function n(e) {
    var t = e.length,
      n = ie.type(e);
    return "function" !== n && !ie.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e))
  }

  function i(e, t, n) {
    if (ie.isFunction(t)) return ie.grep(e, function(e, i) {
      return !!t.call(e, i, e) !== n
    });
    if (t.nodeType) return ie.grep(e, function(e) {
      return e === t !== n
    });
    if ("string" == typeof t) {
      if (de.test(t)) return ie.filter(t, e, n);
      t = ie.filter(t, e)
    }
    return ie.grep(e, function(e) {
      return ie.inArray(e, t) >= 0 !== n
    })
  }

  function o(e, t) {
    do {
      e = e[t]
    } while (e && 1 !== e.nodeType);
    return e
  }

  function r(e) {
    var t = ye[e] = {};
    return ie.each(e.match(ge) || [], function(e, n) {
      t[n] = !0
    }), t
  }

  function a() {
    pe.addEventListener ? (pe.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1)) : (pe.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
  }

  function s() {
    (pe.addEventListener || "load" === event.type || "complete" === pe.readyState) && (a(), ie.ready())
  }

  function l(e, t, n) {
    if (void 0 === n && 1 === e.nodeType) {
      var i = "data-" + t.replace(Ce, "-$1").toLowerCase();
      if ("string" == typeof(n = e.getAttribute(i))) {
        try {
          n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Te.test(n) ? ie.parseJSON(n) : n)
        } catch (e) {}
        ie.data(e, t, n)
      } else n = void 0
    }
    return n
  }

  function c(e) {
    var t;
    for (t in e)
      if (("data" !== t || !ie.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
    return !0
  }

  function u(e, t, n, i) {
    if (ie.acceptData(e)) {
      var o, r, a = ie.expando,
        s = e.nodeType,
        l = s ? ie.cache : e,
        c = s ? e[a] : e[a] && a;
      if (c && l[c] && (i || l[c].data) || void 0 !== n || "string" != typeof t) return c || (c = s ? e[a] = U.pop() || ie.guid++ : a), l[c] || (l[c] = s ? {} : {
        toJSON: ie.noop
      }), ("object" == typeof t || "function" == typeof t) && (i ? l[c] = ie.extend(l[c], t) : l[c].data = ie.extend(l[c].data, t)), r = l[c], i || (r.data || (r.data = {}), r = r.data), void 0 !== n && (r[ie.camelCase(t)] = n), "string" == typeof t ? null == (o = r[t]) && (o = r[ie.camelCase(t)]) : o = r, o
    }
  }

  function d(e, t, n) {
    if (ie.acceptData(e)) {
      var i, o, r = e.nodeType,
        a = r ? ie.cache : e,
        s = r ? e[ie.expando] : ie.expando;
      if (a[s]) {
        if (t && (i = n ? a[s] : a[s].data)) {
          ie.isArray(t) ? t = t.concat(ie.map(t, ie.camelCase)) : t in i ? t = [t] : (t = ie.camelCase(t), t = t in i ? [t] : t.split(" ")), o = t.length;
          for (; o--;) delete i[t[o]];
          if (n ? !c(i) : !ie.isEmptyObject(i)) return
        }(n || (delete a[s].data, c(a[s]))) && (r ? ie.cleanData([e], !0) : te.deleteExpando || a != a.window ? delete a[s] : a[s] = null)
      }
    }
  }

  function f() {
    return !0
  }

  function p() {
    return !1
  }

  function h() {
    try {
      return pe.activeElement
    } catch (e) {}
  }

  function v(e) {
    var t = Me.split("|"),
      n = e.createDocumentFragment();
    if (n.createElement)
      for (; t.length;) n.createElement(t.pop());
    return n
  }

  function m(e, t) {
    var n, i, o = 0,
      r = typeof e.getElementsByTagName !== we ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== we ? e.querySelectorAll(t || "*") : void 0;
    if (!r)
      for (r = [], n = e.childNodes || e; null != (i = n[o]); o++) !t || ie.nodeName(i, t) ? r.push(i) : ie.merge(r, m(i, t));
    return void 0 === t || t && ie.nodeName(e, t) ? ie.merge([e], r) : r
  }

  function g(e) {
    Ae.test(e.type) && (e.defaultChecked = e.checked)
  }

  function y(e, t) {
    return ie.nodeName(e, "table") && ie.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
  }

  function b(e) {
    return e.type = (null !== ie.find.attr(e, "type")) + "/" + e.type, e
  }

  function x(e) {
    var t = Xe.exec(e.type);
    return t ? e.type = t[1] : e.removeAttribute("type"), e
  }

  function w(e, t) {
    for (var n, i = 0; null != (n = e[i]); i++) ie._data(n, "globalEval", !t || ie._data(t[i], "globalEval"))
  }

  function T(e, t) {
    if (1 === t.nodeType && ie.hasData(e)) {
      var n, i, o, r = ie._data(e),
        a = ie._data(t, r),
        s = r.events;
      if (s) {
        delete a.handle, a.events = {};
        for (n in s)
          for (i = 0, o = s[n].length; o > i; i++) ie.event.add(t, n, s[n][i])
      }
      a.data && (a.data = ie.extend({}, a.data))
    }
  }

  function C(e, t) {
    var n, i, o;
    if (1 === t.nodeType) {
      if (n = t.nodeName.toLowerCase(), !te.noCloneEvent && t[ie.expando]) {
        o = ie._data(t);
        for (i in o.events) ie.removeEvent(t, i, o.handle);
        t.removeAttribute(ie.expando)
      }
      "script" === n && t.text !== e.text ? (b(t).text = e.text, x(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), te.html5Clone && e.innerHTML && !ie.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ae.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }
  }

  function S(t, n) {
    var i, o = ie(n.createElement(t)).appendTo(n.body),
      r = e.getDefaultComputedStyle && (i = e.getDefaultComputedStyle(o[0])) ? i.display : ie.css(o[0], "display");
    return o.detach(), r
  }

  function E(e) {
    var t = pe,
      n = Ke[e];
    return n || ("none" !== (n = S(e, t)) && n || (Je = (Je || ie("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), (t = (Je[0].contentWindow || Je[0].contentDocument).document).write(), t.close(), n = S(e, t), Je.detach()), Ke[e] = n), n
  }

  function k(e, t) {
    return {
      get: function() {
        var n = e();
        if (null != n) return n ? void delete this.get : (this.get = t).apply(this, arguments)
      }
    }
  }

  function N(e, t) {
    if (t in e) return t;
    for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, o = ct.length; o--;)
      if ((t = ct[o] + n) in e) return t;
    return i
  }

  function A(e, t) {
    for (var n, i, o, r = [], a = 0, s = e.length; s > a; a++)(i = e[a]).style && (r[a] = ie._data(i, "olddisplay"), n = i.style.display, t ? (r[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && ke(i) && (r[a] = ie._data(i, "olddisplay", E(i.nodeName)))) : (o = ke(i), (n && "none" !== n || !o) && ie._data(i, "olddisplay", o ? n : ie.css(i, "display"))));
    for (a = 0; s > a; a++)(i = e[a]).style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[a] || "" : "none"));
    return e
  }

  function L(e, t, n) {
    var i = rt.exec(t);
    return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
  }

  function D(e, t, n, i, o) {
    for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > r; r += 2) "margin" === n && (a += ie.css(e, n + Ee[r], !0, o)), i ? ("content" === n && (a -= ie.css(e, "padding" + Ee[r], !0, o)), "margin" !== n && (a -= ie.css(e, "border" + Ee[r] + "Width", !0, o))) : (a += ie.css(e, "padding" + Ee[r], !0, o), "padding" !== n && (a += ie.css(e, "border" + Ee[r] + "Width", !0, o)));
    return a
  }

  function I(e, t, n) {
    var i = !0,
      o = "width" === t ? e.offsetWidth : e.offsetHeight,
      r = Ge(e),
      a = te.boxSizing && "border-box" === ie.css(e, "boxSizing", !1, r);
    if (0 >= o || null == o) {
      if ((0 > (o = Qe(e, t, r)) || null == o) && (o = e.style[t]), et.test(o)) return o;
      i = a && (te.boxSizingReliable() || o === e.style[t]), o = parseFloat(o) || 0
    }
    return o + D(e, t, n || (a ? "border" : "content"), i, r) + "px"
  }

  function H(e, t, n, i, o) {
    return new H.prototype.init(e, t, n, i, o)
  }

  function j() {
    return setTimeout(function() {
      ut = void 0
    }), ut = ie.now()
  }

  function M(e, t) {
    var n, i = {
        height: e
      },
      o = 0;
    for (t = t ? 1 : 0; 4 > o; o += 2 - t) n = Ee[o], i["margin" + n] = i["padding" + n] = e;
    return t && (i.opacity = i.width = e), i
  }

  function O(e, t, n) {
    for (var i, o = (mt[t] || []).concat(mt["*"]), r = 0, a = o.length; a > r; r++)
      if (i = o[r].call(n, t, e)) return i
  }

  function _(e, t) {
    var n, i, o, r, a;
    for (n in e)
      if (i = ie.camelCase(n), o = t[i], r = e[n], ie.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), (a = ie.cssHooks[i]) && "expand" in a) {
        r = a.expand(r), delete e[i];
        for (n in r) n in e || (e[n] = r[n], t[n] = o)
      } else t[i] = o
  }

  function q(e, t, n) {
    var i, o, r = 0,
      a = vt.length,
      s = ie.Deferred().always(function() {
        delete l.elem
      }),
      l = function() {
        if (o) return !1;
        for (var t = ut || j(), n = Math.max(0, c.startTime + c.duration - t), i = 1 - (n / c.duration || 0), r = 0, a = c.tweens.length; a > r; r++) c.tweens[r].run(i);
        return s.notifyWith(e, [c, i, n]), 1 > i && a ? n : (s.resolveWith(e, [c]), !1)
      },
      c = s.promise({
        elem: e,
        props: ie.extend({}, t),
        opts: ie.extend(!0, {
          specialEasing: {}
        }, n),
        originalProperties: t,
        originalOptions: n,
        startTime: ut || j(),
        duration: n.duration,
        tweens: [],
        createTween: function(t, n) {
          var i = ie.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
          return c.tweens.push(i), i
        },
        stop: function(t) {
          var n = 0,
            i = t ? c.tweens.length : 0;
          if (o) return this;
          for (o = !0; i > n; n++) c.tweens[n].run(1);
          return t ? s.resolveWith(e, [c, t]) : s.rejectWith(e, [c, t]), this
        }
      }),
      u = c.props;
    for (_(u, c.opts.specialEasing); a > r; r++)
      if (i = vt[r].call(c, e, u, c.opts)) return i;
    return ie.map(u, O, c), ie.isFunction(c.opts.start) && c.opts.start.call(e, c), ie.fx.timer(ie.extend(l, {
      elem: e,
      anim: c,
      queue: c.opts.queue
    })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
  }

  function R(e) {
    return function(t, n) {
      "string" != typeof t && (n = t, t = "*");
      var i, o = 0,
        r = t.toLowerCase().match(ge) || [];
      if (ie.isFunction(n))
        for (; i = r[o++];) "+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
    }
  }

  function B(e, t, n, i) {
    function o(s) {
      var l;
      return r[s] = !0, ie.each(e[s] || [], function(e, s) {
        var c = s(t, n, i);
        return "string" != typeof c || a || r[c] ? a ? !(l = c) : void 0 : (t.dataTypes.unshift(c), o(c), !1)
      }), l
    }
    var r = {},
      a = e === Ft;
    return o(t.dataTypes[0]) || !r["*"] && o("*")
  }

  function F(e, t) {
    var n, i, o = ie.ajaxSettings.flatOptions || {};
    for (i in t) void 0 !== t[i] && ((o[i] ? e : n || (n = {}))[i] = t[i]);
    return n && ie.extend(!0, e, n), e
  }

  function z(e, t, n) {
    for (var i, o, r, a, s = e.contents, l = e.dataTypes;
      "*" === l[0];) l.shift(), void 0 === o && (o = e.mimeType || t.getResponseHeader("Content-Type"));
    if (o)
      for (a in s)
        if (s[a] && s[a].test(o)) {
          l.unshift(a);
          break
        } if (l[0] in n) r = l[0];
    else {
      for (a in n) {
        if (!l[0] || e.converters[a + " " + l[0]]) {
          r = a;
          break
        }
        i || (i = a)
      }
      r = r || i
    }
    return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0
  }

  function P(e, t, n, i) {
    var o, r, a, s, l, c = {},
      u = e.dataTypes.slice();
    if (u[1])
      for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
    for (r = u.shift(); r;)
      if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift())
        if ("*" === r) r = l;
        else if ("*" !== l && l !== r) {
      if (!(a = c[l + " " + r] || c["* " + r]))
        for (o in c)
          if ((s = o.split(" "))[1] === r && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
            !0 === a ? a = c[o] : !0 !== c[o] && (r = s[0], u.unshift(s[1]));
            break
          } if (!0 !== a)
        if (a && e.throws) t = a(t);
        else try {
          t = a(t)
        } catch (e) {
          return {
            state: "parsererror",
            error: a ? e : "No conversion from " + l + " to " + r
          }
        }
    }
    return {
      state: "success",
      data: t
    }
  }

  function W(e, t, n, i) {
    var o;
    if (ie.isArray(t)) ie.each(t, function(t, o) {
      n || Wt.test(e) ? i(e, o) : W(e + "[" + ("object" == typeof o ? t : "") + "]", o, n, i)
    });
    else if (n || "object" !== ie.type(t)) i(e, t);
    else
      for (o in t) W(e + "[" + o + "]", t[o], n, i)
  }

  function $() {
    try {
      return new e.XMLHttpRequest
    } catch (e) {}
  }

  function X() {
    try {
      return new e.ActiveXObject("Microsoft.XMLHTTP")
    } catch (e) {}
  }

  function V(e) {
    return ie.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
  }
  var U = [],
    Y = U.slice,
    J = U.concat,
    K = U.push,
    G = U.indexOf,
    Q = {},
    Z = Q.toString,
    ee = Q.hasOwnProperty,
    te = {},
    ne = "1.11.2",
    ie = function(e, t) {
      return new ie.fn.init(e, t)
    },
    oe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    re = /^-ms-/,
    ae = /-([\da-z])/gi,
    se = function(e, t) {
      return t.toUpperCase()
    };
  ie.fn = ie.prototype = {
    jquery: ne,
    constructor: ie,
    selector: "",
    length: 0,
    toArray: function() {
      return Y.call(this)
    },
    get: function(e) {
      return null != e ? 0 > e ? this[e + this.length] : this[e] : Y.call(this)
    },
    pushStack: function(e) {
      var t = ie.merge(this.constructor(), e);
      return t.prevObject = this, t.context = this.context, t
    },
    each: function(e, t) {
      return ie.each(this, e, t)
    },
    map: function(e) {
      return this.pushStack(ie.map(this, function(t, n) {
        return e.call(t, n, t)
      }))
    },
    slice: function() {
      return this.pushStack(Y.apply(this, arguments))
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      return this.eq(-1)
    },
    eq: function(e) {
      var t = this.length,
        n = +e + (0 > e ? t : 0);
      return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
    },
    end: function() {
      return this.prevObject || this.constructor(null)
    },
    push: K,
    sort: U.sort,
    splice: U.splice
  }, ie.extend = ie.fn.extend = function() {
    var e, t, n, i, o, r, a = arguments[0] || {},
      s = 1,
      l = arguments.length,
      c = !1;
    for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == typeof a || ie.isFunction(a) || (a = {}), s === l && (a = this, s--); l > s; s++)
      if (null != (o = arguments[s]))
        for (i in o) e = a[i], n = o[i], a !== n && (c && n && (ie.isPlainObject(n) || (t = ie.isArray(n))) ? (t ? (t = !1, r = e && ie.isArray(e) ? e : []) : r = e && ie.isPlainObject(e) ? e : {}, a[i] = ie.extend(c, r, n)) : void 0 !== n && (a[i] = n));
    return a
  }, ie.extend({
    expando: "jQuery" + (ne + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function(e) {
      throw new Error(e)
    },
    noop: function() {},
    isFunction: function(e) {
      return "function" === ie.type(e)
    },
    isArray: Array.isArray || function(e) {
      return "array" === ie.type(e)
    },
    isWindow: function(e) {
      return null != e && e == e.window
    },
    isNumeric: function(e) {
      return !ie.isArray(e) && e - parseFloat(e) + 1 >= 0
    },
    isEmptyObject: function(e) {
      var t;
      for (t in e) return !1;
      return !0
    },
    isPlainObject: function(e) {
      var t;
      if (!e || "object" !== ie.type(e) || e.nodeType || ie.isWindow(e)) return !1;
      try {
        if (e.constructor && !ee.call(e, "constructor") && !ee.call(e.constructor.prototype, "isPrototypeOf")) return !1
      } catch (e) {
        return !1
      }
      if (te.ownLast)
        for (t in e) return ee.call(e, t);
      for (t in e);
      return void 0 === t || ee.call(e, t)
    },
    type: function(e) {
      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Q[Z.call(e)] || "object" : typeof e
    },
    globalEval: function(t) {
      t && ie.trim(t) && (e.execScript || function(t) {
        e.eval.call(e, t)
      })(t)
    },
    camelCase: function(e) {
      return e.replace(re, "ms-").replace(ae, se)
    },
    nodeName: function(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    },
    each: function(e, t, i) {
      var o = 0,
        r = e.length,
        a = n(e);
      if (i) {
        if (a)
          for (; r > o && !1 !== t.apply(e[o], i); o++);
        else
          for (o in e)
            if (!1 === t.apply(e[o], i)) break
      } else if (a)
        for (; r > o && !1 !== t.call(e[o], o, e[o]); o++);
      else
        for (o in e)
          if (!1 === t.call(e[o], o, e[o])) break;
      return e
    },
    trim: function(e) {
      return null == e ? "" : (e + "").replace(oe, "")
    },
    makeArray: function(e, t) {
      var i = t || [];
      return null != e && (n(Object(e)) ? ie.merge(i, "string" == typeof e ? [e] : e) : K.call(i, e)), i
    },
    inArray: function(e, t, n) {
      var i;
      if (t) {
        if (G) return G.call(t, e, n);
        for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
          if (n in t && t[n] === e) return n
      }
      return -1
    },
    merge: function(e, t) {
      for (var n = +t.length, i = 0, o = e.length; n > i;) e[o++] = t[i++];
      if (n !== n)
        for (; void 0 !== t[i];) e[o++] = t[i++];
      return e.length = o, e
    },
    grep: function(e, t, n) {
      for (var i = [], o = 0, r = e.length, a = !n; r > o; o++) !t(e[o], o) !== a && i.push(e[o]);
      return i
    },
    map: function(e, t, i) {
      var o, r = 0,
        a = e.length,
        s = [];
      if (n(e))
        for (; a > r; r++) null != (o = t(e[r], r, i)) && s.push(o);
      else
        for (r in e) null != (o = t(e[r], r, i)) && s.push(o);
      return J.apply([], s)
    },
    guid: 1,
    proxy: function(e, t) {
      var n, i, o;
      return "string" == typeof t && (o = e[t], t = e, e = o), ie.isFunction(e) ? (n = Y.call(arguments, 2), i = function() {
        return e.apply(t || this, n.concat(Y.call(arguments)))
      }, i.guid = e.guid = e.guid || ie.guid++, i) : void 0
    },
    now: function() {
      return +new Date
    },
    support: te
  }), ie.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
    Q["[object " + t + "]"] = t.toLowerCase()
  });
  var le = function(e) {
    function t(e, t, n, i) {
      var o, r, a, s, c, d, f, p, h, v;
      if ((t ? t.ownerDocument || t : R) !== D && L(t), t = t || D, n = n || [], s = t.nodeType, "string" != typeof e || !e || 1 !== s && 9 !== s && 11 !== s) return n;
      if (!i && H) {
        if (11 !== s && (o = me.exec(e)))
          if (a = o[1]) {
            if (9 === s) {
              if (!(r = t.getElementById(a)) || !r.parentNode) return n;
              if (r.id === a) return n.push(r), n
            } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(a)) && _(t, r) && r.id === a) return n.push(r), n
          } else {
            if (o[2]) return K.apply(n, t.getElementsByTagName(e)), n;
            if ((a = o[3]) && b.getElementsByClassName) return K.apply(n, t.getElementsByClassName(a)), n
          } if (b.qsa && (!j || !j.test(e))) {
          if (p = f = q, h = t, v = 1 !== s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
            for (d = C(e), (f = t.getAttribute("id")) ? p = f.replace(ye, "\\$&") : t.setAttribute("id", p), p = "[id='" + p + "'] ", c = d.length; c--;) d[c] = p + u(d[c]);
            h = ge.test(e) && l(t.parentNode) || t, v = d.join(",")
          }
          if (v) try {
            return K.apply(n, h.querySelectorAll(v)), n
          } catch (e) {} finally {
            f || t.removeAttribute("id")
          }
        }
      }
      return E(e.replace(ae, "$1"), t, n, i)
    }

    function n() {
      function e(n, i) {
        return t.push(n + " ") > x.cacheLength && delete e[t.shift()], e[n + " "] = i
      }
      var t = [];
      return e
    }

    function i(e) {
      return e[q] = !0, e
    }

    function o(e) {
      var t = D.createElement("div");
      try {
        return !!e(t)
      } catch (e) {
        return !1
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null
      }
    }

    function r(e, t) {
      for (var n = e.split("|"), i = e.length; i--;) x.attrHandle[n[i]] = t
    }

    function a(e, t) {
      var n = t && e,
        i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || X) - (~e.sourceIndex || X);
      if (i) return i;
      if (n)
        for (; n = n.nextSibling;)
          if (n === t) return -1;
      return e ? 1 : -1
    }

    function s(e) {
      return i(function(t) {
        return t = +t, i(function(n, i) {
          for (var o, r = e([], n.length, t), a = r.length; a--;) n[o = r[a]] && (n[o] = !(i[o] = n[o]))
        })
      })
    }

    function l(e) {
      return e && void 0 !== e.getElementsByTagName && e
    }

    function c() {}

    function u(e) {
      for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
      return i
    }

    function d(e, t, n) {
      var i = t.dir,
        o = n && "parentNode" === i,
        r = F++;
      return t.first ? function(t, n, r) {
        for (; t = t[i];)
          if (1 === t.nodeType || o) return e(t, n, r)
      } : function(t, n, a) {
        var s, l, c = [B, r];
        if (a) {
          for (; t = t[i];)
            if ((1 === t.nodeType || o) && e(t, n, a)) return !0
        } else
          for (; t = t[i];)
            if (1 === t.nodeType || o) {
              if (l = t[q] || (t[q] = {}), (s = l[i]) && s[0] === B && s[1] === r) return c[2] = s[2];
              if (l[i] = c, c[2] = e(t, n, a)) return !0
            }
      }
    }

    function f(e) {
      return e.length > 1 ? function(t, n, i) {
        for (var o = e.length; o--;)
          if (!e[o](t, n, i)) return !1;
        return !0
      } : e[0]
    }

    function p(e, n, i) {
      for (var o = 0, r = n.length; r > o; o++) t(e, n[o], i);
      return i
    }

    function h(e, t, n, i, o) {
      for (var r, a = [], s = 0, l = e.length, c = null != t; l > s; s++)(r = e[s]) && (!n || n(r, i, o)) && (a.push(r), c && t.push(s));
      return a
    }

    function v(e, t, n, o, r, a) {
      return o && !o[q] && (o = v(o)), r && !r[q] && (r = v(r, a)), i(function(i, a, s, l) {
        var c, u, d, f = [],
          v = [],
          m = a.length,
          g = i || p(t || "*", s.nodeType ? [s] : s, []),
          y = !e || !i && t ? g : h(g, f, e, s, l),
          b = n ? r || (i ? e : m || o) ? [] : a : y;
        if (n && n(y, b, s, l), o)
          for (c = h(b, v), o(c, [], s, l), u = c.length; u--;)(d = c[u]) && (b[v[u]] = !(y[v[u]] = d));
        if (i) {
          if (r || e) {
            if (r) {
              for (c = [], u = b.length; u--;)(d = b[u]) && c.push(y[u] = d);
              r(null, b = [], c, l)
            }
            for (u = b.length; u--;)(d = b[u]) && (c = r ? Q(i, d) : f[u]) > -1 && (i[c] = !(a[c] = d))
          }
        } else b = h(b === a ? b.splice(m, b.length) : b), r ? r(null, a, b, l) : K.apply(a, b)
      })
    }

    function m(e) {
      for (var t, n, i, o = e.length, r = x.relative[e[0].type], a = r || x.relative[" "], s = r ? 1 : 0, l = d(function(e) {
          return e === t
        }, a, !0), c = d(function(e) {
          return Q(t, e) > -1
        }, a, !0), p = [function(e, n, i) {
          var o = !r && (i || n !== k) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i));
          return t = null, o
        }]; o > s; s++)
        if (n = x.relative[e[s].type]) p = [d(f(p), n)];
        else {
          if ((n = x.filter[e[s].type].apply(null, e[s].matches))[q]) {
            for (i = ++s; o > i && !x.relative[e[i].type]; i++);
            return v(s > 1 && f(p), s > 1 && u(e.slice(0, s - 1).concat({
              value: " " === e[s - 2].type ? "*" : ""
            })).replace(ae, "$1"), n, i > s && m(e.slice(s, i)), o > i && m(e = e.slice(i)), o > i && u(e))
          }
          p.push(n)
        } return f(p)
    }

    function g(e, n) {
      var o = n.length > 0,
        r = e.length > 0,
        a = function(i, a, s, l, c) {
          var u, d, f, p = 0,
            v = "0",
            m = i && [],
            g = [],
            y = k,
            b = i || r && x.find.TAG("*", c),
            w = B += null == y ? 1 : Math.random() || .1,
            T = b.length;
          for (c && (k = a !== D && a); v !== T && null != (u = b[v]); v++) {
            if (r && u) {
              for (d = 0; f = e[d++];)
                if (f(u, a, s)) {
                  l.push(u);
                  break
                } c && (B = w)
            }
            o && ((u = !f && u) && p--, i && m.push(u))
          }
          if (p += v, o && v !== p) {
            for (d = 0; f = n[d++];) f(m, g, a, s);
            if (i) {
              if (p > 0)
                for (; v--;) m[v] || g[v] || (g[v] = Y.call(l));
              g = h(g)
            }
            K.apply(l, g), c && !i && g.length > 0 && p + n.length > 1 && t.uniqueSort(l)
          }
          return c && (B = w, k = y), m
        };
      return o ? i(a) : a
    }
    var y, b, x, w, T, C, S, E, k, N, A, L, D, I, H, j, M, O, _, q = "sizzle" + 1 * new Date,
      R = e.document,
      B = 0,
      F = 0,
      z = n(),
      P = n(),
      W = n(),
      $ = function(e, t) {
        return e === t && (A = !0), 0
      },
      X = 1 << 31,
      V = {}.hasOwnProperty,
      U = [],
      Y = U.pop,
      J = U.push,
      K = U.push,
      G = U.slice,
      Q = function(e, t) {
        for (var n = 0, i = e.length; i > n; n++)
          if (e[n] === t) return n;
        return -1
      },
      Z = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      ee = "[\\x20\\t\\r\\n\\f]",
      te = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      ne = te.replace("w", "w#"),
      ie = "\\[" + ee + "*(" + te + ")(?:" + ee + "*([*^$|!~]?=)" + ee + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ne + "))|)" + ee + "*\\]",
      oe = ":(" + te + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)",
      re = new RegExp(ee + "+", "g"),
      ae = new RegExp("^" + ee + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ee + "+$", "g"),
      se = new RegExp("^" + ee + "*," + ee + "*"),
      le = new RegExp("^" + ee + "*([>+~]|" + ee + ")" + ee + "*"),
      ce = new RegExp("=" + ee + "*([^\\]'\"]*?)" + ee + "*\\]", "g"),
      ue = new RegExp(oe),
      de = new RegExp("^" + ne + "$"),
      fe = {
        ID: new RegExp("^#(" + te + ")"),
        CLASS: new RegExp("^\\.(" + te + ")"),
        TAG: new RegExp("^(" + te.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + ie),
        PSEUDO: new RegExp("^" + oe),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ee + "*(even|odd|(([+-]|)(\\d*)n|)" + ee + "*(?:([+-]|)" + ee + "*(\\d+)|))" + ee + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + Z + ")$", "i"),
        needsContext: new RegExp("^" + ee + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ee + "*((?:-\\d)?\\d*)" + ee + "*\\)|)(?=[^-]|$)", "i")
      },
      pe = /^(?:input|select|textarea|button)$/i,
      he = /^h\d$/i,
      ve = /^[^{]+\{\s*\[native \w/,
      me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      ge = /[+~]/,
      ye = /'|\\/g,
      be = new RegExp("\\\\([\\da-f]{1,6}" + ee + "?|(" + ee + ")|.)", "ig"),
      xe = function(e, t, n) {
        var i = "0x" + t - 65536;
        return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
      },
      we = function() {
        L()
      };
    try {
      K.apply(U = G.call(R.childNodes), R.childNodes), U[R.childNodes.length].nodeType
    } catch (e) {
      K = {
        apply: U.length ? function(e, t) {
          J.apply(e, G.call(t))
        } : function(e, t) {
          for (var n = e.length, i = 0; e[n++] = t[i++];);
          e.length = n - 1
        }
      }
    }
    b = t.support = {}, T = t.isXML = function(e) {
      var t = e && (e.ownerDocument || e).documentElement;
      return !!t && "HTML" !== t.nodeName
    }, L = t.setDocument = function(e) {
      var t, n, i = e ? e.ownerDocument || e : R;
      return i !== D && 9 === i.nodeType && i.documentElement ? (D = i, I = i.documentElement, (n = i.defaultView) && n !== n.top && (n.addEventListener ? n.addEventListener("unload", we, !1) : n.attachEvent && n.attachEvent("onunload", we)), H = !T(i), b.attributes = o(function(e) {
        return e.className = "i", !e.getAttribute("className")
      }), b.getElementsByTagName = o(function(e) {
        return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
      }), b.getElementsByClassName = ve.test(i.getElementsByClassName), b.getById = o(function(e) {
        return I.appendChild(e).id = q, !i.getElementsByName || !i.getElementsByName(q).length
      }), b.getById ? (x.find.ID = function(e, t) {
        if (void 0 !== t.getElementById && H) {
          var n = t.getElementById(e);
          return n && n.parentNode ? [n] : []
        }
      }, x.filter.ID = function(e) {
        var t = e.replace(be, xe);
        return function(e) {
          return e.getAttribute("id") === t
        }
      }) : (delete x.find.ID, x.filter.ID = function(e) {
        var t = e.replace(be, xe);
        return function(e) {
          var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
          return n && n.value === t
        }
      }), x.find.TAG = b.getElementsByTagName ? function(e, t) {
        return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : b.qsa ? t.querySelectorAll(e) : void 0
      } : function(e, t) {
        var n, i = [],
          o = 0,
          r = t.getElementsByTagName(e);
        if ("*" === e) {
          for (; n = r[o++];) 1 === n.nodeType && i.push(n);
          return i
        }
        return r
      }, x.find.CLASS = b.getElementsByClassName && function(e, t) {
        return H ? t.getElementsByClassName(e) : void 0
      }, M = [], j = [], (b.qsa = ve.test(i.querySelectorAll)) && (o(function(e) {
        I.appendChild(e).innerHTML = "<a id='" + q + "'></a><select id='" + q + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && j.push("[*^$]=" + ee + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || j.push("\\[" + ee + "*(?:value|" + Z + ")"), e.querySelectorAll("[id~=" + q + "-]").length || j.push("~="), e.querySelectorAll(":checked").length || j.push(":checked"), e.querySelectorAll("a#" + q + "+*").length || j.push(".#.+[+~]")
      }), o(function(e) {
        var t = i.createElement("input");
        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && j.push("name" + ee + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || j.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), j.push(",.*:")
      })), (b.matchesSelector = ve.test(O = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && o(function(e) {
        b.disconnectedMatch = O.call(e, "div"), O.call(e, "[s!='']:x"), M.push("!=", oe)
      }), j = j.length && new RegExp(j.join("|")), M = M.length && new RegExp(M.join("|")), t = ve.test(I.compareDocumentPosition), _ = t || ve.test(I.contains) ? function(e, t) {
        var n = 9 === e.nodeType ? e.documentElement : e,
          i = t && t.parentNode;
        return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
      } : function(e, t) {
        if (t)
          for (; t = t.parentNode;)
            if (t === e) return !0;
        return !1
      }, $ = t ? function(e, t) {
        if (e === t) return A = !0, 0;
        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !b.sortDetached && t.compareDocumentPosition(e) === n ? e === i || e.ownerDocument === R && _(R, e) ? -1 : t === i || t.ownerDocument === R && _(R, t) ? 1 : N ? Q(N, e) - Q(N, t) : 0 : 4 & n ? -1 : 1)
      } : function(e, t) {
        if (e === t) return A = !0, 0;
        var n, o = 0,
          r = e.parentNode,
          s = t.parentNode,
          l = [e],
          c = [t];
        if (!r || !s) return e === i ? -1 : t === i ? 1 : r ? -1 : s ? 1 : N ? Q(N, e) - Q(N, t) : 0;
        if (r === s) return a(e, t);
        for (n = e; n = n.parentNode;) l.unshift(n);
        for (n = t; n = n.parentNode;) c.unshift(n);
        for (; l[o] === c[o];) o++;
        return o ? a(l[o], c[o]) : l[o] === R ? -1 : c[o] === R ? 1 : 0
      }, i) : D
    }, t.matches = function(e, n) {
      return t(e, null, null, n)
    }, t.matchesSelector = function(e, n) {
      if ((e.ownerDocument || e) !== D && L(e), n = n.replace(ce, "='$1']"), !(!b.matchesSelector || !H || M && M.test(n) || j && j.test(n))) try {
        var i = O.call(e, n);
        if (i || b.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
      } catch (e) {}
      return t(n, D, null, [e]).length > 0
    }, t.contains = function(e, t) {
      return (e.ownerDocument || e) !== D && L(e), _(e, t)
    }, t.attr = function(e, t) {
      (e.ownerDocument || e) !== D && L(e);
      var n = x.attrHandle[t.toLowerCase()],
        i = n && V.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !H) : void 0;
      return void 0 !== i ? i : b.attributes || !H ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
    }, t.error = function(e) {
      throw new Error("Syntax error, unrecognized expression: " + e)
    }, t.uniqueSort = function(e) {
      var t, n = [],
        i = 0,
        o = 0;
      if (A = !b.detectDuplicates, N = !b.sortStable && e.slice(0), e.sort($), A) {
        for (; t = e[o++];) t === e[o] && (i = n.push(o));
        for (; i--;) e.splice(n[i], 1)
      }
      return N = null, e
    }, w = t.getText = function(e) {
      var t, n = "",
        i = 0,
        o = e.nodeType;
      if (o) {
        if (1 === o || 9 === o || 11 === o) {
          if ("string" == typeof e.textContent) return e.textContent;
          for (e = e.firstChild; e; e = e.nextSibling) n += w(e)
        } else if (3 === o || 4 === o) return e.nodeValue
      } else
        for (; t = e[i++];) n += w(t);
      return n
    }, (x = t.selectors = {
      cacheLength: 50,
      createPseudo: i,
      match: fe,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function(e) {
          return e[1] = e[1].replace(be, xe), e[3] = (e[3] || e[4] || e[5] || "").replace(be, xe), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
        },
        CHILD: function(e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
        },
        PSEUDO: function(e) {
          var t, n = !e[6] && e[2];
          return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && ue.test(n) && (t = C(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
        }
      },
      filter: {
        TAG: function(e) {
          var t = e.replace(be, xe).toLowerCase();
          return "*" === e ? function() {
            return !0
          } : function(e) {
            return e.nodeName && e.nodeName.toLowerCase() === t
          }
        },
        CLASS: function(e) {
          var t = z[e + " "];
          return t || (t = new RegExp("(^|" + ee + ")" + e + "(" + ee + "|$)")) && z(e, function(e) {
            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
          })
        },
        ATTR: function(e, n, i) {
          return function(o) {
            var r = t.attr(o, e);
            return null == r ? "!=" === n : !n || (r += "", "=" === n ? r === i : "!=" === n ? r !== i : "^=" === n ? i && 0 === r.indexOf(i) : "*=" === n ? i && r.indexOf(i) > -1 : "$=" === n ? i && r.slice(-i.length) === i : "~=" === n ? (" " + r.replace(re, " ") + " ").indexOf(i) > -1 : "|=" === n && (r === i || r.slice(0, i.length + 1) === i + "-"))
          }
        },
        CHILD: function(e, t, n, i, o) {
          var r = "nth" !== e.slice(0, 3),
            a = "last" !== e.slice(-4),
            s = "of-type" === t;
          return 1 === i && 0 === o ? function(e) {
            return !!e.parentNode
          } : function(t, n, l) {
            var c, u, d, f, p, h, v = r !== a ? "nextSibling" : "previousSibling",
              m = t.parentNode,
              g = s && t.nodeName.toLowerCase(),
              y = !l && !s;
            if (m) {
              if (r) {
                for (; v;) {
                  for (d = t; d = d[v];)
                    if (s ? d.nodeName.toLowerCase() === g : 1 === d.nodeType) return !1;
                  h = v = "only" === e && !h && "nextSibling"
                }
                return !0
              }
              if (h = [a ? m.firstChild : m.lastChild], a && y) {
                for (p = (c = (u = m[q] || (m[q] = {}))[e] || [])[0] === B && c[1], f = c[0] === B && c[2], d = p && m.childNodes[p]; d = ++p && d && d[v] || (f = p = 0) || h.pop();)
                  if (1 === d.nodeType && ++f && d === t) {
                    u[e] = [B, p, f];
                    break
                  }
              } else if (y && (c = (t[q] || (t[q] = {}))[e]) && c[0] === B) f = c[1];
              else
                for (;
                  (d = ++p && d && d[v] || (f = p = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== g : 1 !== d.nodeType) || !++f || (y && ((d[q] || (d[q] = {}))[e] = [B, f]), d !== t)););
              return (f -= o) === i || f % i == 0 && f / i >= 0
            }
          }
        },
        PSEUDO: function(e, n) {
          var o, r = x.pseudos[e] || x.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
          return r[q] ? r(n) : r.length > 1 ? (o = [e, e, "", n], x.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
            for (var i, o = r(e, n), a = o.length; a--;) i = Q(e, o[a]), e[i] = !(t[i] = o[a])
          }) : function(e) {
            return r(e, 0, o)
          }) : r
        }
      },
      pseudos: {
        not: i(function(e) {
          var t = [],
            n = [],
            o = S(e.replace(ae, "$1"));
          return o[q] ? i(function(e, t, n, i) {
            for (var r, a = o(e, null, i, []), s = e.length; s--;)(r = a[s]) && (e[s] = !(t[s] = r))
          }) : function(e, i, r) {
            return t[0] = e, o(t, null, r, n), t[0] = null, !n.pop()
          }
        }),
        has: i(function(e) {
          return function(n) {
            return t(e, n).length > 0
          }
        }),
        contains: i(function(e) {
          return e = e.replace(be, xe),
            function(t) {
              return (t.textContent || t.innerText || w(t)).indexOf(e) > -1
            }
        }),
        lang: i(function(e) {
          return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(be, xe).toLowerCase(),
            function(t) {
              var n;
              do {
                if (n = H ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
              } while ((t = t.parentNode) && 1 === t.nodeType);
              return !1
            }
        }),
        target: function(t) {
          var n = e.location && e.location.hash;
          return n && n.slice(1) === t.id
        },
        root: function(e) {
          return e === I
        },
        focus: function(e) {
          return e === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        },
        enabled: function(e) {
          return !1 === e.disabled
        },
        disabled: function(e) {
          return !0 === e.disabled
        },
        checked: function(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && !!e.checked || "option" === t && !!e.selected
        },
        selected: function(e) {
          return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
        },
        empty: function(e) {
          for (e = e.firstChild; e; e = e.nextSibling)
            if (e.nodeType < 6) return !1;
          return !0
        },
        parent: function(e) {
          return !x.pseudos.empty(e)
        },
        header: function(e) {
          return he.test(e.nodeName)
        },
        input: function(e) {
          return pe.test(e.nodeName)
        },
        button: function(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && "button" === e.type || "button" === t
        },
        text: function(e) {
          var t;
          return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
        },
        first: s(function() {
          return [0]
        }),
        last: s(function(e, t) {
          return [t - 1]
        }),
        eq: s(function(e, t, n) {
          return [0 > n ? n + t : n]
        }),
        even: s(function(e, t) {
          for (var n = 0; t > n; n += 2) e.push(n);
          return e
        }),
        odd: s(function(e, t) {
          for (var n = 1; t > n; n += 2) e.push(n);
          return e
        }),
        lt: s(function(e, t, n) {
          for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
          return e
        }),
        gt: s(function(e, t, n) {
          for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
          return e
        })
      }
    }).pseudos.nth = x.pseudos.eq;
    for (y in {
        radio: !0,
        checkbox: !0,
        file: !0,
        password: !0,
        image: !0
      }) x.pseudos[y] = function(e) {
      return function(t) {
        return "input" === t.nodeName.toLowerCase() && t.type === e
      }
    }(y);
    for (y in {
        submit: !0,
        reset: !0
      }) x.pseudos[y] = function(e) {
      return function(t) {
        var n = t.nodeName.toLowerCase();
        return ("input" === n || "button" === n) && t.type === e
      }
    }(y);
    return c.prototype = x.filters = x.pseudos, x.setFilters = new c, C = t.tokenize = function(e, n) {
      var i, o, r, a, s, l, c, u = P[e + " "];
      if (u) return n ? 0 : u.slice(0);
      for (s = e, l = [], c = x.preFilter; s;) {
        (!i || (o = se.exec(s))) && (o && (s = s.slice(o[0].length) || s), l.push(r = [])), i = !1, (o = le.exec(s)) && (i = o.shift(), r.push({
          value: i,
          type: o[0].replace(ae, " ")
        }), s = s.slice(i.length));
        for (a in x.filter) !(o = fe[a].exec(s)) || c[a] && !(o = c[a](o)) || (i = o.shift(), r.push({
          value: i,
          type: a,
          matches: o
        }), s = s.slice(i.length));
        if (!i) break
      }
      return n ? s.length : s ? t.error(e) : P(e, l).slice(0)
    }, S = t.compile = function(e, t) {
      var n, i = [],
        o = [],
        r = W[e + " "];
      if (!r) {
        for (t || (t = C(e)), n = t.length; n--;)(r = m(t[n]))[q] ? i.push(r) : o.push(r);
        (r = W(e, g(o, i))).selector = e
      }
      return r
    }, E = t.select = function(e, t, n, i) {
      var o, r, a, s, c, d = "function" == typeof e && e,
        f = !i && C(e = d.selector || e);
      if (n = n || [], 1 === f.length) {
        if ((r = f[0] = f[0].slice(0)).length > 2 && "ID" === (a = r[0]).type && b.getById && 9 === t.nodeType && H && x.relative[r[1].type]) {
          if (!(t = (x.find.ID(a.matches[0].replace(be, xe), t) || [])[0])) return n;
          d && (t = t.parentNode), e = e.slice(r.shift().value.length)
        }
        for (o = fe.needsContext.test(e) ? 0 : r.length; o-- && (a = r[o], !x.relative[s = a.type]);)
          if ((c = x.find[s]) && (i = c(a.matches[0].replace(be, xe), ge.test(r[0].type) && l(t.parentNode) || t))) {
            if (r.splice(o, 1), !(e = i.length && u(r))) return K.apply(n, i), n;
            break
          }
      }
      return (d || S(e, f))(i, t, !H, n, ge.test(e) && l(t.parentNode) || t), n
    }, b.sortStable = q.split("").sort($).join("") === q, b.detectDuplicates = !!A, L(), b.sortDetached = o(function(e) {
      return 1 & e.compareDocumentPosition(D.createElement("div"))
    }), o(function(e) {
      return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
    }) || r("type|href|height|width", function(e, t, n) {
      return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
    }), b.attributes && o(function(e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
    }) || r("value", function(e, t, n) {
      return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
    }), o(function(e) {
      return null == e.getAttribute("disabled")
    }) || r(Z, function(e, t, n) {
      var i;
      return n ? void 0 : !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
    }), t
  }(e);
  ie.find = le, ie.expr = le.selectors, ie.expr[":"] = ie.expr.pseudos, ie.unique = le.uniqueSort, ie.text = le.getText, ie.isXMLDoc = le.isXML, ie.contains = le.contains;
  var ce = ie.expr.match.needsContext,
    ue = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    de = /^.[^:#\[\.,]*$/;
  ie.filter = function(e, t, n) {
    var i = t[0];
    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? ie.find.matchesSelector(i, e) ? [i] : [] : ie.find.matches(e, ie.grep(t, function(e) {
      return 1 === e.nodeType
    }))
  }, ie.fn.extend({
    find: function(e) {
      var t, n = [],
        i = this,
        o = i.length;
      if ("string" != typeof e) return this.pushStack(ie(e).filter(function() {
        for (t = 0; o > t; t++)
          if (ie.contains(i[t], this)) return !0
      }));
      for (t = 0; o > t; t++) ie.find(e, i[t], n);
      return n = this.pushStack(o > 1 ? ie.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
    },
    filter: function(e) {
      return this.pushStack(i(this, e || [], !1))
    },
    not: function(e) {
      return this.pushStack(i(this, e || [], !0))
    },
    is: function(e) {
      return !!i(this, "string" == typeof e && ce.test(e) ? ie(e) : e || [], !1).length
    }
  });
  var fe, pe = e.document,
    he = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
  (ie.fn.init = function(e, t) {
    var n, i;
    if (!e) return this;
    if ("string" == typeof e) {
      if (!(n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : he.exec(e)) || !n[1] && t) return !t || t.jquery ? (t || fe).find(e) : this.constructor(t).find(e);
      if (n[1]) {
        if (t = t instanceof ie ? t[0] : t, ie.merge(this, ie.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : pe, !0)), ue.test(n[1]) && ie.isPlainObject(t))
          for (n in t) ie.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
        return this
      }
      if ((i = pe.getElementById(n[2])) && i.parentNode) {
        if (i.id !== n[2]) return fe.find(e);
        this.length = 1, this[0] = i
      }
      return this.context = pe, this.selector = e, this
    }
    return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ie.isFunction(e) ? void 0 !== fe.ready ? fe.ready(e) : e(ie) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), ie.makeArray(e, this))
  }).prototype = ie.fn, fe = ie(pe);
  var ve = /^(?:parents|prev(?:Until|All))/,
    me = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  ie.extend({
    dir: function(e, t, n) {
      for (var i = [], o = e[t]; o && 9 !== o.nodeType && (void 0 === n || 1 !== o.nodeType || !ie(o).is(n));) 1 === o.nodeType && i.push(o), o = o[t];
      return i
    },
    sibling: function(e, t) {
      for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
      return n
    }
  }), ie.fn.extend({
    has: function(e) {
      var t, n = ie(e, this),
        i = n.length;
      return this.filter(function() {
        for (t = 0; i > t; t++)
          if (ie.contains(this, n[t])) return !0
      })
    },
    closest: function(e, t) {
      for (var n, i = 0, o = this.length, r = [], a = ce.test(e) || "string" != typeof e ? ie(e, t || this.context) : 0; o > i; i++)
        for (n = this[i]; n && n !== t; n = n.parentNode)
          if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && ie.find.matchesSelector(n, e))) {
            r.push(n);
            break
          } return this.pushStack(r.length > 1 ? ie.unique(r) : r)
    },
    index: function(e) {
      return e ? "string" == typeof e ? ie.inArray(this[0], ie(e)) : ie.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function(e, t) {
      return this.pushStack(ie.unique(ie.merge(this.get(), ie(e, t))))
    },
    addBack: function(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
  }), ie.each({
    parent: function(e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null
    },
    parents: function(e) {
      return ie.dir(e, "parentNode")
    },
    parentsUntil: function(e, t, n) {
      return ie.dir(e, "parentNode", n)
    },
    next: function(e) {
      return o(e, "nextSibling")
    },
    prev: function(e) {
      return o(e, "previousSibling")
    },
    nextAll: function(e) {
      return ie.dir(e, "nextSibling")
    },
    prevAll: function(e) {
      return ie.dir(e, "previousSibling")
    },
    nextUntil: function(e, t, n) {
      return ie.dir(e, "nextSibling", n)
    },
    prevUntil: function(e, t, n) {
      return ie.dir(e, "previousSibling", n)
    },
    siblings: function(e) {
      return ie.sibling((e.parentNode || {}).firstChild, e)
    },
    children: function(e) {
      return ie.sibling(e.firstChild)
    },
    contents: function(e) {
      return ie.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ie.merge([], e.childNodes)
    }
  }, function(e, t) {
    ie.fn[e] = function(n, i) {
      var o = ie.map(this, t, n);
      return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = ie.filter(i, o)), this.length > 1 && (me[e] || (o = ie.unique(o)), ve.test(e) && (o = o.reverse())), this.pushStack(o)
    }
  });
  var ge = /\S+/g,
    ye = {};
  ie.Callbacks = function(e) {
    var t, n, i, o, a, s, l = [],
      c = !(e = "string" == typeof e ? ye[e] || r(e) : ie.extend({}, e)).once && [],
      u = function(r) {
        for (n = e.memory && r, i = !0, a = s || 0, s = 0, o = l.length, t = !0; l && o > a; a++)
          if (!1 === l[a].apply(r[0], r[1]) && e.stopOnFalse) {
            n = !1;
            break
          } t = !1, l && (c ? c.length && u(c.shift()) : n ? l = [] : d.disable())
      },
      d = {
        add: function() {
          if (l) {
            var i = l.length;
            ! function t(n) {
              ie.each(n, function(n, i) {
                var o = ie.type(i);
                "function" === o ? e.unique && d.has(i) || l.push(i) : i && i.length && "string" !== o && t(i)
              })
            }(arguments), t ? o = l.length : n && (s = i, u(n))
          }
          return this
        },
        remove: function() {
          return l && ie.each(arguments, function(e, n) {
            for (var i;
              (i = ie.inArray(n, l, i)) > -1;) l.splice(i, 1), t && (o >= i && o--, a >= i && a--)
          }), this
        },
        has: function(e) {
          return e ? ie.inArray(e, l) > -1 : !(!l || !l.length)
        },
        empty: function() {
          return l = [], o = 0, this
        },
        disable: function() {
          return l = c = n = void 0, this
        },
        disabled: function() {
          return !l
        },
        lock: function() {
          return c = void 0, n || d.disable(), this
        },
        locked: function() {
          return !c
        },
        fireWith: function(e, n) {
          return !l || i && !c || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? c.push(n) : u(n)), this
        },
        fire: function() {
          return d.fireWith(this, arguments), this
        },
        fired: function() {
          return !!i
        }
      };
    return d
  }, ie.extend({
    Deferred: function(e) {
      var t = [
          ["resolve", "done", ie.Callbacks("once memory"), "resolved"],
          ["reject", "fail", ie.Callbacks("once memory"), "rejected"],
          ["notify", "progress", ie.Callbacks("memory")]
        ],
        n = "pending",
        i = {
          state: function() {
            return n
          },
          always: function() {
            return o.done(arguments).fail(arguments), this
          },
          then: function() {
            var e = arguments;
            return ie.Deferred(function(n) {
              ie.each(t, function(t, r) {
                var a = ie.isFunction(e[t]) && e[t];
                o[r[1]](function() {
                  var e = a && a.apply(this, arguments);
                  e && ie.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[r[0] + "With"](this === i ? n.promise() : this, a ? [e] : arguments)
                })
              }), e = null
            }).promise()
          },
          promise: function(e) {
            return null != e ? ie.extend(e, i) : i
          }
        },
        o = {};
      return i.pipe = i.then, ie.each(t, function(e, r) {
        var a = r[2],
          s = r[3];
        i[r[1]] = a.add, s && a.add(function() {
          n = s
        }, t[1 ^ e][2].disable, t[2][2].lock), o[r[0]] = function() {
          return o[r[0] + "With"](this === o ? i : this, arguments), this
        }, o[r[0] + "With"] = a.fireWith
      }), i.promise(o), e && e.call(o, o), o
    },
    when: function(e) {
      var t, n, i, o = 0,
        r = Y.call(arguments),
        a = r.length,
        s = 1 !== a || e && ie.isFunction(e.promise) ? a : 0,
        l = 1 === s ? e : ie.Deferred(),
        c = function(e, n, i) {
          return function(o) {
            n[e] = this, i[e] = arguments.length > 1 ? Y.call(arguments) : o, i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
          }
        };
      if (a > 1)
        for (t = new Array(a), n = new Array(a), i = new Array(a); a > o; o++) r[o] && ie.isFunction(r[o].promise) ? r[o].promise().done(c(o, i, r)).fail(l.reject).progress(c(o, n, t)) : --s;
      return s || l.resolveWith(i, r), l.promise()
    }
  });
  var be;
  ie.fn.ready = function(e) {
    return ie.ready.promise().done(e), this
  }, ie.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function(e) {
      e ? ie.readyWait++ : ie.ready(!0)
    },
    ready: function(e) {
      if (!0 === e ? !--ie.readyWait : !ie.isReady) {
        if (!pe.body) return setTimeout(ie.ready);
        ie.isReady = !0, !0 !== e && --ie.readyWait > 0 || (be.resolveWith(pe, [ie]), ie.fn.triggerHandler && (ie(pe).triggerHandler("ready"), ie(pe).off("ready")))
      }
    }
  }), ie.ready.promise = function(t) {
    if (!be)
      if (be = ie.Deferred(), "complete" === pe.readyState) setTimeout(ie.ready);
      else if (pe.addEventListener) pe.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1);
    else {
      pe.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
      var n = !1;
      try {
        n = null == e.frameElement && pe.documentElement
      } catch (e) {}
      n && n.doScroll && function e() {
        if (!ie.isReady) {
          try {
            n.doScroll("left")
          } catch (t) {
            return setTimeout(e, 50)
          }
          a(), ie.ready()
        }
      }()
    }
    return be.promise(t)
  };
  var xe, we = "undefined";
  for (xe in ie(te)) break;
  te.ownLast = "0" !== xe, te.inlineBlockNeedsLayout = !1, ie(function() {
      var e, t, n, i;
      (n = pe.getElementsByTagName("body")[0]) && n.style && (t = pe.createElement("div"), i = pe.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== we && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", te.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
    }),
    function() {
      var e = pe.createElement("div");
      if (null == te.deleteExpando) {
        te.deleteExpando = !0;
        try {
          delete e.test
        } catch (e) {
          te.deleteExpando = !1
        }
      }
      e = null
    }(), ie.acceptData = function(e) {
      var t = ie.noData[(e.nodeName + " ").toLowerCase()],
        n = +e.nodeType || 1;
      return (1 === n || 9 === n) && (!t || !0 !== t && e.getAttribute("classid") === t)
    };
  var Te = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Ce = /([A-Z])/g;
  ie.extend({
    cache: {},
    noData: {
      "applet ": !0,
      "embed ": !0,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    },
    hasData: function(e) {
      return !!(e = e.nodeType ? ie.cache[e[ie.expando]] : e[ie.expando]) && !c(e)
    },
    data: function(e, t, n) {
      return u(e, t, n)
    },
    removeData: function(e, t) {
      return d(e, t)
    },
    _data: function(e, t, n) {
      return u(e, t, n, !0)
    },
    _removeData: function(e, t) {
      return d(e, t, !0)
    }
  }), ie.fn.extend({
    data: function(e, t) {
      var n, i, o, r = this[0],
        a = r && r.attributes;
      if (void 0 === e) {
        if (this.length && (o = ie.data(r), 1 === r.nodeType && !ie._data(r, "parsedAttrs"))) {
          for (n = a.length; n--;) a[n] && 0 === (i = a[n].name).indexOf("data-") && (i = ie.camelCase(i.slice(5)), l(r, i, o[i]));
          ie._data(r, "parsedAttrs", !0)
        }
        return o
      }
      return "object" == typeof e ? this.each(function() {
        ie.data(this, e)
      }) : arguments.length > 1 ? this.each(function() {
        ie.data(this, e, t)
      }) : r ? l(r, e, ie.data(r, e)) : void 0
    },
    removeData: function(e) {
      return this.each(function() {
        ie.removeData(this, e)
      })
    }
  }), ie.extend({
    queue: function(e, t, n) {
      var i;
      return e ? (t = (t || "fx") + "queue", i = ie._data(e, t), n && (!i || ie.isArray(n) ? i = ie._data(e, t, ie.makeArray(n)) : i.push(n)), i || []) : void 0
    },
    dequeue: function(e, t) {
      t = t || "fx";
      var n = ie.queue(e, t),
        i = n.length,
        o = n.shift(),
        r = ie._queueHooks(e, t);
      "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, function() {
        ie.dequeue(e, t)
      }, r)), !i && r && r.empty.fire()
    },
    _queueHooks: function(e, t) {
      var n = t + "queueHooks";
      return ie._data(e, n) || ie._data(e, n, {
        empty: ie.Callbacks("once memory").add(function() {
          ie._removeData(e, t + "queue"), ie._removeData(e, n)
        })
      })
    }
  }), ie.fn.extend({
    queue: function(e, t) {
      var n = 2;
      return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? ie.queue(this[0], e) : void 0 === t ? this : this.each(function() {
        var n = ie.queue(this, e, t);
        ie._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && ie.dequeue(this, e)
      })
    },
    dequeue: function(e) {
      return this.each(function() {
        ie.dequeue(this, e)
      })
    },
    clearQueue: function(e) {
      return this.queue(e || "fx", [])
    },
    promise: function(e, t) {
      var n, i = 1,
        o = ie.Deferred(),
        r = this,
        a = this.length,
        s = function() {
          --i || o.resolveWith(r, [r])
        };
      for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(n = ie._data(r[a], e + "queueHooks")) && n.empty && (i++, n.empty.add(s));
      return s(), o.promise(t)
    }
  });
  var Se = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    Ee = ["Top", "Right", "Bottom", "Left"],
    ke = function(e, t) {
      return e = t || e, "none" === ie.css(e, "display") || !ie.contains(e.ownerDocument, e)
    },
    Ne = ie.access = function(e, t, n, i, o, r, a) {
      var s = 0,
        l = e.length,
        c = null == n;
      if ("object" === ie.type(n)) {
        o = !0;
        for (s in n) ie.access(e, t, s, n[s], !0, r, a)
      } else if (void 0 !== i && (o = !0, ie.isFunction(i) || (a = !0), c && (a ? (t.call(e, i), t = null) : (c = t, t = function(e, t, n) {
          return c.call(ie(e), n)
        })), t))
        for (; l > s; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
      return o ? e : c ? t.call(e) : l ? t(e[0], n) : r
    },
    Ae = /^(?:checkbox|radio)$/i;
  ! function() {
    var e = pe.createElement("input"),
      t = pe.createElement("div"),
      n = pe.createDocumentFragment();
    if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", te.leadingWhitespace = 3 === t.firstChild.nodeType, te.tbody = !t.getElementsByTagName("tbody").length, te.htmlSerialize = !!t.getElementsByTagName("link").length, te.html5Clone = "<:nav></:nav>" !== pe.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), te.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", te.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", te.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, te.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function() {
        te.noCloneEvent = !1
      }), t.cloneNode(!0).click()), null == te.deleteExpando) {
      te.deleteExpando = !0;
      try {
        delete t.test
      } catch (e) {
        te.deleteExpando = !1
      }
    }
  }(),
  function() {
    var t, n, i = pe.createElement("div");
    for (t in {
        submit: !0,
        change: !0,
        focusin: !0
      }) n = "on" + t, (te[t + "Bubbles"] = n in e) || (i.setAttribute(n, "t"), te[t + "Bubbles"] = !1 === i.attributes[n].expando);
    i = null
  }();
  var Le = /^(?:input|select|textarea)$/i,
    De = /^key/,
    Ie = /^(?:mouse|pointer|contextmenu)|click/,
    He = /^(?:focusinfocus|focusoutblur)$/,
    je = /^([^.]*)(?:\.(.+)|)$/;
  ie.event = {
    global: {},
    add: function(e, t, n, i, o) {
      var r, a, s, l, c, u, d, f, p, h, v, m = ie._data(e);
      if (m) {
        for (n.handler && (l = n, n = l.handler, o = l.selector), n.guid || (n.guid = ie.guid++), (a = m.events) || (a = m.events = {}), (u = m.handle) || (u = m.handle = function(e) {
            return typeof ie === we || e && ie.event.triggered === e.type ? void 0 : ie.event.dispatch.apply(u.elem, arguments)
          }, u.elem = e), s = (t = (t || "").match(ge) || [""]).length; s--;) r = je.exec(t[s]) || [], p = v = r[1], h = (r[2] || "").split(".").sort(), p && (c = ie.event.special[p] || {}, p = (o ? c.delegateType : c.bindType) || p, c = ie.event.special[p] || {}, d = ie.extend({
          type: p,
          origType: v,
          data: i,
          handler: n,
          guid: n.guid,
          selector: o,
          needsContext: o && ie.expr.match.needsContext.test(o),
          namespace: h.join(".")
        }, l), (f = a[p]) || (f = a[p] = [], f.delegateCount = 0, c.setup && !1 !== c.setup.call(e, i, h, u) || (e.addEventListener ? e.addEventListener(p, u, !1) : e.attachEvent && e.attachEvent("on" + p, u))), c.add && (c.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), o ? f.splice(f.delegateCount++, 0, d) : f.push(d), ie.event.global[p] = !0);
        e = null
      }
    },
    remove: function(e, t, n, i, o) {
      var r, a, s, l, c, u, d, f, p, h, v, m = ie.hasData(e) && ie._data(e);
      if (m && (u = m.events)) {
        for (c = (t = (t || "").match(ge) || [""]).length; c--;)
          if (s = je.exec(t[c]) || [], p = v = s[1], h = (s[2] || "").split(".").sort(), p) {
            for (d = ie.event.special[p] || {}, f = u[p = (i ? d.delegateType : d.bindType) || p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = f.length; r--;) a = f[r], !o && v !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (f.splice(r, 1), a.selector && f.delegateCount--, d.remove && d.remove.call(e, a));
            l && !f.length && (d.teardown && !1 !== d.teardown.call(e, h, m.handle) || ie.removeEvent(e, p, m.handle), delete u[p])
          } else
            for (p in u) ie.event.remove(e, p + t[c], n, i, !0);
        ie.isEmptyObject(u) && (delete m.handle, ie._removeData(e, "events"))
      }
    },
    trigger: function(t, n, i, o) {
      var r, a, s, l, c, u, d, f = [i || pe],
        p = ee.call(t, "type") ? t.type : t,
        h = ee.call(t, "namespace") ? t.namespace.split(".") : [];
      if (s = u = i = i || pe, 3 !== i.nodeType && 8 !== i.nodeType && !He.test(p + ie.event.triggered) && (p.indexOf(".") >= 0 && (h = p.split("."), p = h.shift(), h.sort()), a = p.indexOf(":") < 0 && "on" + p, t = t[ie.expando] ? t : new ie.Event(p, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : ie.makeArray(n, [t]), c = ie.event.special[p] || {}, o || !c.trigger || !1 !== c.trigger.apply(i, n))) {
        if (!o && !c.noBubble && !ie.isWindow(i)) {
          for (l = c.delegateType || p, He.test(l + p) || (s = s.parentNode); s; s = s.parentNode) f.push(s), u = s;
          u === (i.ownerDocument || pe) && f.push(u.defaultView || u.parentWindow || e)
        }
        for (d = 0;
          (s = f[d++]) && !t.isPropagationStopped();) t.type = d > 1 ? l : c.bindType || p, (r = (ie._data(s, "events") || {})[t.type] && ie._data(s, "handle")) && r.apply(s, n), (r = a && s[a]) && r.apply && ie.acceptData(s) && (t.result = r.apply(s, n), !1 === t.result && t.preventDefault());
        if (t.type = p, !o && !t.isDefaultPrevented() && (!c._default || !1 === c._default.apply(f.pop(), n)) && ie.acceptData(i) && a && i[p] && !ie.isWindow(i)) {
          (u = i[a]) && (i[a] = null), ie.event.triggered = p;
          try {
            i[p]()
          } catch (e) {}
          ie.event.triggered = void 0, u && (i[a] = u)
        }
        return t.result
      }
    },
    dispatch: function(e) {
      e = ie.event.fix(e);
      var t, n, i, o, r, a = [],
        s = Y.call(arguments),
        l = (ie._data(this, "events") || {})[e.type] || [],
        c = ie.event.special[e.type] || {};
      if (s[0] = e, e.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, e)) {
        for (a = ie.event.handlers.call(this, e, l), t = 0;
          (o = a[t++]) && !e.isPropagationStopped();)
          for (e.currentTarget = o.elem, r = 0;
            (i = o.handlers[r++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, void 0 !== (n = ((ie.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, s)) && !1 === (e.result = n) && (e.preventDefault(), e.stopPropagation()));
        return c.postDispatch && c.postDispatch.call(this, e), e.result
      }
    },
    handlers: function(e, t) {
      var n, i, o, r, a = [],
        s = t.delegateCount,
        l = e.target;
      if (s && l.nodeType && (!e.button || "click" !== e.type))
        for (; l != this; l = l.parentNode || this)
          if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
            for (o = [], r = 0; s > r; r++) i = t[r], n = i.selector + " ", void 0 === o[n] && (o[n] = i.needsContext ? ie(n, this).index(l) >= 0 : ie.find(n, this, null, [l]).length), o[n] && o.push(i);
            o.length && a.push({
              elem: l,
              handlers: o
            })
          } return s < t.length && a.push({
        elem: this,
        handlers: t.slice(s)
      }), a
    },
    fix: function(e) {
      if (e[ie.expando]) return e;
      var t, n, i, o = e.type,
        r = e,
        a = this.fixHooks[o];
      for (a || (this.fixHooks[o] = a = Ie.test(o) ? this.mouseHooks : De.test(o) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, e = new ie.Event(r), t = i.length; t--;) n = i[t], e[n] = r[n];
      return e.target || (e.target = r.srcElement || pe), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, r) : e
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(e, t) {
        var n, i, o, r = t.button,
          a = t.fromElement;
        return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || pe, o = i.documentElement, n = i.body, e.pageX = t.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a), e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
      }
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function() {
          if (this !== h() && this.focus) try {
            return this.focus(), !1
          } catch (e) {}
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          return this === h() && this.blur ? (this.blur(), !1) : void 0
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          return ie.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
        },
        _default: function(e) {
          return ie.nodeName(e.target, "a")
        }
      },
      beforeunload: {
        postDispatch: function(e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
        }
      }
    },
    simulate: function(e, t, n, i) {
      var o = ie.extend(new ie.Event, n, {
        type: e,
        isSimulated: !0,
        originalEvent: {}
      });
      i ? ie.event.trigger(o, null, t) : ie.event.dispatch.call(t, o), o.isDefaultPrevented() && n.preventDefault()
    }
  }, ie.removeEvent = pe.removeEventListener ? function(e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n, !1)
  } : function(e, t, n) {
    var i = "on" + t;
    e.detachEvent && (typeof e[i] === we && (e[i] = null), e.detachEvent(i, n))
  }, ie.Event = function(e, t) {
    return this instanceof ie.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? f : p) : this.type = e, t && ie.extend(this, t), this.timeStamp = e && e.timeStamp || ie.now(), void(this[ie.expando] = !0)) : new ie.Event(e, t)
  }, ie.Event.prototype = {
    isDefaultPrevented: p,
    isPropagationStopped: p,
    isImmediatePropagationStopped: p,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = f, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = f, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = f, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
    }
  }, ie.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(e, t) {
    ie.event.special[e] = {
      delegateType: t,
      bindType: t,
      handle: function(e) {
        var n, i = this,
          o = e.relatedTarget,
          r = e.handleObj;
        return (!o || o !== i && !ie.contains(i, o)) && (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
      }
    }
  }), te.submitBubbles || (ie.event.special.submit = {
    setup: function() {
      return !ie.nodeName(this, "form") && void ie.event.add(this, "click._submit keypress._submit", function(e) {
        var t = e.target,
          n = ie.nodeName(t, "input") || ie.nodeName(t, "button") ? t.form : void 0;
        n && !ie._data(n, "submitBubbles") && (ie.event.add(n, "submit._submit", function(e) {
          e._submit_bubble = !0
        }), ie._data(n, "submitBubbles", !0))
      })
    },
    postDispatch: function(e) {
      e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ie.event.simulate("submit", this.parentNode, e, !0))
    },
    teardown: function() {
      return !ie.nodeName(this, "form") && void ie.event.remove(this, "._submit")
    }
  }), te.changeBubbles || (ie.event.special.change = {
    setup: function() {
      return Le.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ie.event.add(this, "propertychange._change", function(e) {
        "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
      }), ie.event.add(this, "click._change", function(e) {
        this._just_changed && !e.isTrigger && (this._just_changed = !1), ie.event.simulate("change", this, e, !0)
      })), !1) : void ie.event.add(this, "beforeactivate._change", function(e) {
        var t = e.target;
        Le.test(t.nodeName) && !ie._data(t, "changeBubbles") && (ie.event.add(t, "change._change", function(e) {
          !this.parentNode || e.isSimulated || e.isTrigger || ie.event.simulate("change", this.parentNode, e, !0)
        }), ie._data(t, "changeBubbles", !0))
      })
    },
    handle: function(e) {
      var t = e.target;
      return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
    },
    teardown: function() {
      return ie.event.remove(this, "._change"), !Le.test(this.nodeName)
    }
  }), te.focusinBubbles || ie.each({
    focus: "focusin",
    blur: "focusout"
  }, function(e, t) {
    var n = function(e) {
      ie.event.simulate(t, e.target, ie.event.fix(e), !0)
    };
    ie.event.special[t] = {
      setup: function() {
        var i = this.ownerDocument || this,
          o = ie._data(i, t);
        o || i.addEventListener(e, n, !0), ie._data(i, t, (o || 0) + 1)
      },
      teardown: function() {
        var i = this.ownerDocument || this,
          o = ie._data(i, t) - 1;
        o ? ie._data(i, t, o) : (i.removeEventListener(e, n, !0), ie._removeData(i, t))
      }
    }
  }), ie.fn.extend({
    on: function(e, t, n, i, o) {
      var r, a;
      if ("object" == typeof e) {
        "string" != typeof t && (n = n || t, t = void 0);
        for (r in e) this.on(r, t, n, e[r], o);
        return this
      }
      if (null == n && null == i ? (i = t, n = t = void 0) : null == i && ("string" == typeof t ? (i = n, n = void 0) : (i = n, n = t, t = void 0)), !1 === i) i = p;
      else if (!i) return this;
      return 1 === o && (a = i, i = function(e) {
        return ie().off(e), a.apply(this, arguments)
      }, i.guid = a.guid || (a.guid = ie.guid++)), this.each(function() {
        ie.event.add(this, e, i, n, t)
      })
    },
    one: function(e, t, n, i) {
      return this.on(e, t, n, i, 1)
    },
    off: function(e, t, n) {
      var i, o;
      if (e && e.preventDefault && e.handleObj) return i = e.handleObj, ie(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
      if ("object" == typeof e) {
        for (o in e) this.off(o, t, e[o]);
        return this
      }
      return (!1 === t || "function" == typeof t) && (n = t, t = void 0), !1 === n && (n = p), this.each(function() {
        ie.event.remove(this, e, n, t)
      })
    },
    trigger: function(e, t) {
      return this.each(function() {
        ie.event.trigger(e, t, this)
      })
    },
    triggerHandler: function(e, t) {
      var n = this[0];
      return n ? ie.event.trigger(e, t, n, !0) : void 0
    }
  });
  var Me = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    Oe = / jQuery\d+="(?:null|\d+)"/g,
    _e = new RegExp("<(?:" + Me + ")[\\s/>]", "i"),
    qe = /^\s+/,
    Re = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    Be = /<([\w:]+)/,
    Fe = /<tbody/i,
    ze = /<|&#?\w+;/,
    Pe = /<(?:script|style|link)/i,
    We = /checked\s*(?:[^=]|=\s*.checked.)/i,
    $e = /^$|\/(?:java|ecma)script/i,
    Xe = /^true\/(.*)/,
    Ve = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    Ue = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: te.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    },
    Ye = v(pe).appendChild(pe.createElement("div"));
  Ue.optgroup = Ue.option, Ue.tbody = Ue.tfoot = Ue.colgroup = Ue.caption = Ue.thead, Ue.th = Ue.td, ie.extend({
    clone: function(e, t, n) {
      var i, o, r, a, s, l = ie.contains(e.ownerDocument, e);
      if (te.html5Clone || ie.isXMLDoc(e) || !_e.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (Ye.innerHTML = e.outerHTML, Ye.removeChild(r = Ye.firstChild)), !(te.noCloneEvent && te.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ie.isXMLDoc(e)))
        for (i = m(r), s = m(e), a = 0; null != (o = s[a]); ++a) i[a] && C(o, i[a]);
      if (t)
        if (n)
          for (s = s || m(e), i = i || m(r), a = 0; null != (o = s[a]); a++) T(o, i[a]);
        else T(e, r);
      return (i = m(r, "script")).length > 0 && w(i, !l && m(e, "script")), i = s = o = null, r
    },
    buildFragment: function(e, t, n, i) {
      for (var o, r, a, s, l, c, u, d = e.length, f = v(t), p = [], h = 0; d > h; h++)
        if ((r = e[h]) || 0 === r)
          if ("object" === ie.type(r)) ie.merge(p, r.nodeType ? [r] : r);
          else if (ze.test(r)) {
        for (s = s || f.appendChild(t.createElement("div")), l = (Be.exec(r) || ["", ""])[1].toLowerCase(), u = Ue[l] || Ue._default, s.innerHTML = u[1] + r.replace(Re, "<$1></$2>") + u[2], o = u[0]; o--;) s = s.lastChild;
        if (!te.leadingWhitespace && qe.test(r) && p.push(t.createTextNode(qe.exec(r)[0])), !te.tbody)
          for (o = (r = "table" !== l || Fe.test(r) ? "<table>" !== u[1] || Fe.test(r) ? 0 : s : s.firstChild) && r.childNodes.length; o--;) ie.nodeName(c = r.childNodes[o], "tbody") && !c.childNodes.length && r.removeChild(c);
        for (ie.merge(p, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
        s = f.lastChild
      } else p.push(t.createTextNode(r));
      for (s && f.removeChild(s), te.appendChecked || ie.grep(m(p, "input"), g), h = 0; r = p[h++];)
        if ((!i || -1 === ie.inArray(r, i)) && (a = ie.contains(r.ownerDocument, r), s = m(f.appendChild(r), "script"), a && w(s), n))
          for (o = 0; r = s[o++];) $e.test(r.type || "") && n.push(r);
      return s = null, f
    },
    cleanData: function(e, t) {
      for (var n, i, o, r, a = 0, s = ie.expando, l = ie.cache, c = te.deleteExpando, u = ie.event.special; null != (n = e[a]); a++)
        if ((t || ie.acceptData(n)) && (o = n[s], r = o && l[o])) {
          if (r.events)
            for (i in r.events) u[i] ? ie.event.remove(n, i) : ie.removeEvent(n, i, r.handle);
          l[o] && (delete l[o], c ? delete n[s] : typeof n.removeAttribute !== we ? n.removeAttribute(s) : n[s] = null, U.push(o))
        }
    }
  }), ie.fn.extend({
    text: function(e) {
      return Ne(this, function(e) {
        return void 0 === e ? ie.text(this) : this.empty().append((this[0] && this[0].ownerDocument || pe).createTextNode(e))
      }, null, e, arguments.length)
    },
    append: function() {
      return this.domManip(arguments, function(e) {
        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || y(this, e).appendChild(e)
      })
    },
    prepend: function() {
      return this.domManip(arguments, function(e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = y(this, e);
          t.insertBefore(e, t.firstChild)
        }
      })
    },
    before: function() {
      return this.domManip(arguments, function(e) {
        this.parentNode && this.parentNode.insertBefore(e, this)
      })
    },
    after: function() {
      return this.domManip(arguments, function(e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
      })
    },
    remove: function(e, t) {
      for (var n, i = e ? ie.filter(e, this) : this, o = 0; null != (n = i[o]); o++) t || 1 !== n.nodeType || ie.cleanData(m(n)), n.parentNode && (t && ie.contains(n.ownerDocument, n) && w(m(n, "script")), n.parentNode.removeChild(n));
      return this
    },
    empty: function() {
      for (var e, t = 0; null != (e = this[t]); t++) {
        for (1 === e.nodeType && ie.cleanData(m(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
        e.options && ie.nodeName(e, "select") && (e.options.length = 0)
      }
      return this
    },
    clone: function(e, t) {
      return e = null != e && e, t = null == t ? e : t, this.map(function() {
        return ie.clone(this, e, t)
      })
    },
    html: function(e) {
      return Ne(this, function(e) {
        var t = this[0] || {},
          n = 0,
          i = this.length;
        if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Oe, "") : void 0;
        if (!("string" != typeof e || Pe.test(e) || !te.htmlSerialize && _e.test(e) || !te.leadingWhitespace && qe.test(e) || Ue[(Be.exec(e) || ["", ""])[1].toLowerCase()])) {
          e = e.replace(Re, "<$1></$2>");
          try {
            for (; i > n; n++) 1 === (t = this[n] || {}).nodeType && (ie.cleanData(m(t, !1)), t.innerHTML = e);
            t = 0
          } catch (e) {}
        }
        t && this.empty().append(e)
      }, null, e, arguments.length)
    },
    replaceWith: function() {
      var e = arguments[0];
      return this.domManip(arguments, function(t) {
        e = this.parentNode, ie.cleanData(m(this)), e && e.replaceChild(t, this)
      }), e && (e.length || e.nodeType) ? this : this.remove()
    },
    detach: function(e) {
      return this.remove(e, !0)
    },
    domManip: function(e, t) {
      e = J.apply([], e);
      var n, i, o, r, a, s, l = 0,
        c = this.length,
        u = this,
        d = c - 1,
        f = e[0],
        p = ie.isFunction(f);
      if (p || c > 1 && "string" == typeof f && !te.checkClone && We.test(f)) return this.each(function(n) {
        var i = u.eq(n);
        p && (e[0] = f.call(this, n, i.html())), i.domManip(e, t)
      });
      if (c && (s = ie.buildFragment(e, this[0].ownerDocument, !1, this), n = s.firstChild, 1 === s.childNodes.length && (s = n), n)) {
        for (o = (r = ie.map(m(s, "script"), b)).length; c > l; l++) i = s, l !== d && (i = ie.clone(i, !0, !0), o && ie.merge(r, m(i, "script"))), t.call(this[l], i, l);
        if (o)
          for (a = r[r.length - 1].ownerDocument, ie.map(r, x), l = 0; o > l; l++) i = r[l], $e.test(i.type || "") && !ie._data(i, "globalEval") && ie.contains(a, i) && (i.src ? ie._evalUrl && ie._evalUrl(i.src) : ie.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Ve, "")));
        s = n = null
      }
      return this
    }
  }), ie.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(e, t) {
    ie.fn[e] = function(e) {
      for (var n, i = 0, o = [], r = ie(e), a = r.length - 1; a >= i; i++) n = i === a ? this : this.clone(!0), ie(r[i])[t](n), K.apply(o, n.get());
      return this.pushStack(o)
    }
  });
  var Je, Ke = {};
  ! function() {
    var e;
    te.shrinkWrapBlocks = function() {
      if (null != e) return e;
      e = !1;
      var t, n, i;
      return (n = pe.getElementsByTagName("body")[0]) && n.style ? (t = pe.createElement("div"), i = pe.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== we && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(pe.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(i), e) : void 0
    }
  }();
  var Ge, Qe, Ze = /^margin/,
    et = new RegExp("^(" + Se + ")(?!px)[a-z%]+$", "i"),
    tt = /^(top|right|bottom|left)$/;
  e.getComputedStyle ? (Ge = function(t) {
      return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
    }, Qe = function(e, t, n) {
      var i, o, r, a, s = e.style;
      return n = n || Ge(e), a = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== a || ie.contains(e.ownerDocument, e) || (a = ie.style(e, t)), et.test(a) && Ze.test(t) && (i = s.width, o = s.minWidth, r = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = o, s.maxWidth = r)), void 0 === a ? a : a + ""
    }) : pe.documentElement.currentStyle && (Ge = function(e) {
      return e.currentStyle
    }, Qe = function(e, t, n) {
      var i, o, r, a, s = e.style;
      return n = n || Ge(e), null == (a = n ? n[t] : void 0) && s && s[t] && (a = s[t]), et.test(a) && !tt.test(t) && (i = s.left, o = e.runtimeStyle, (r = o && o.left) && (o.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = i, r && (o.left = r)), void 0 === a ? a : a + "" || "auto"
    }),
    function() {
      function t() {
        var t, n, i, o;
        (n = pe.getElementsByTagName("body")[0]) && n.style && (t = pe.createElement("div"), i = pe.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", r = a = !1, l = !0, e.getComputedStyle && (r = "1%" !== (e.getComputedStyle(t, null) || {}).top, a = "4px" === (e.getComputedStyle(t, null) || {
          width: "4px"
        }).width, o = t.appendChild(pe.createElement("div")), o.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", o.style.marginRight = o.style.width = "0", t.style.width = "1px", l = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight), t.removeChild(o)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = t.getElementsByTagName("td"), o[0].style.cssText = "margin:0;border:0;padding:0;display:none", (s = 0 === o[0].offsetHeight) && (o[0].style.display = "", o[1].style.display = "none", s = 0 === o[0].offsetHeight), n.removeChild(i))
      }
      var n, i, o, r, a, s, l;
      (n = pe.createElement("div")).innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", (i = (o = n.getElementsByTagName("a")[0]) && o.style) && (i.cssText = "float:left;opacity:.5", te.opacity = "0.5" === i.opacity, te.cssFloat = !!i.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", te.clearCloneStyle = "content-box" === n.style.backgroundClip, te.boxSizing = "" === i.boxSizing || "" === i.MozBoxSizing || "" === i.WebkitBoxSizing, ie.extend(te, {
        reliableHiddenOffsets: function() {
          return null == s && t(), s
        },
        boxSizingReliable: function() {
          return null == a && t(), a
        },
        pixelPosition: function() {
          return null == r && t(), r
        },
        reliableMarginRight: function() {
          return null == l && t(), l
        }
      }))
    }(), ie.swap = function(e, t, n, i) {
      var o, r, a = {};
      for (r in t) a[r] = e.style[r], e.style[r] = t[r];
      o = n.apply(e, i || []);
      for (r in t) e.style[r] = a[r];
      return o
    };
  var nt = /alpha\([^)]*\)/i,
    it = /opacity\s*=\s*([^)]*)/,
    ot = /^(none|table(?!-c[ea]).+)/,
    rt = new RegExp("^(" + Se + ")(.*)$", "i"),
    at = new RegExp("^([+-])=(" + Se + ")", "i"),
    st = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    lt = {
      letterSpacing: "0",
      fontWeight: "400"
    },
    ct = ["Webkit", "O", "Moz", "ms"];
  ie.extend({
    cssHooks: {
      opacity: {
        get: function(e, t) {
          if (t) {
            var n = Qe(e, "opacity");
            return "" === n ? "1" : n
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      float: te.cssFloat ? "cssFloat" : "styleFloat"
    },
    style: function(e, t, n, i) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var o, r, a, s = ie.camelCase(t),
          l = e.style;
        if (t = ie.cssProps[s] || (ie.cssProps[s] = N(l, s)), a = ie.cssHooks[t] || ie.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (o = a.get(e, !1, i)) ? o : l[t];
        if ("string" === (r = typeof n) && (o = at.exec(n)) && (n = (o[1] + 1) * o[2] + parseFloat(ie.css(e, t)), r = "number"), null != n && n === n && ("number" !== r || ie.cssNumber[s] || (n += "px"), te.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(e, n, i))))) try {
          l[t] = n
        } catch (e) {}
      }
    },
    css: function(e, t, n, i) {
      var o, r, a, s = ie.camelCase(t);
      return t = ie.cssProps[s] || (ie.cssProps[s] = N(e.style, s)), (a = ie.cssHooks[t] || ie.cssHooks[s]) && "get" in a && (r = a.get(e, !0, n)), void 0 === r && (r = Qe(e, t, i)), "normal" === r && t in lt && (r = lt[t]), "" === n || n ? (o = parseFloat(r), !0 === n || ie.isNumeric(o) ? o || 0 : r) : r
    }
  }), ie.each(["height", "width"], function(e, t) {
    ie.cssHooks[t] = {
      get: function(e, n, i) {
        return n ? ot.test(ie.css(e, "display")) && 0 === e.offsetWidth ? ie.swap(e, st, function() {
          return I(e, t, i)
        }) : I(e, t, i) : void 0
      },
      set: function(e, n, i) {
        var o = i && Ge(e);
        return L(0, n, i ? D(e, t, i, te.boxSizing && "border-box" === ie.css(e, "boxSizing", !1, o), o) : 0)
      }
    }
  }), te.opacity || (ie.cssHooks.opacity = {
    get: function(e, t) {
      return it.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
    },
    set: function(e, t) {
      var n = e.style,
        i = e.currentStyle,
        o = ie.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
        r = i && i.filter || n.filter || "";
      n.zoom = 1, (t >= 1 || "" === t) && "" === ie.trim(r.replace(nt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = nt.test(r) ? r.replace(nt, o) : r + " " + o)
    }
  }), ie.cssHooks.marginRight = k(te.reliableMarginRight, function(e, t) {
    return t ? ie.swap(e, {
      display: "inline-block"
    }, Qe, [e, "marginRight"]) : void 0
  }), ie.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(e, t) {
    ie.cssHooks[e + t] = {
      expand: function(n) {
        for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) o[e + Ee[i] + t] = r[i] || r[i - 2] || r[0];
        return o
      }
    }, Ze.test(e) || (ie.cssHooks[e + t].set = L)
  }), ie.fn.extend({
    css: function(e, t) {
      return Ne(this, function(e, t, n) {
        var i, o, r = {},
          a = 0;
        if (ie.isArray(t)) {
          for (i = Ge(e), o = t.length; o > a; a++) r[t[a]] = ie.css(e, t[a], !1, i);
          return r
        }
        return void 0 !== n ? ie.style(e, t, n) : ie.css(e, t)
      }, e, t, arguments.length > 1)
    },
    show: function() {
      return A(this, !0)
    },
    hide: function() {
      return A(this)
    },
    toggle: function(e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
        ke(this) ? ie(this).show() : ie(this).hide()
      })
    }
  }), ie.Tween = H, H.prototype = {
    constructor: H,
    init: function(e, t, n, i, o, r) {
      this.elem = e, this.prop = n, this.easing = o || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (ie.cssNumber[n] ? "" : "px")
    },
    cur: function() {
      var e = H.propHooks[this.prop];
      return e && e.get ? e.get(this) : H.propHooks._default.get(this)
    },
    run: function(e) {
      var t, n = H.propHooks[this.prop];
      return this.pos = t = this.options.duration ? ie.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : H.propHooks._default.set(this), this
    }
  }, H.prototype.init.prototype = H.prototype, H.propHooks = {
    _default: {
      get: function(e) {
        var t;
        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ie.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0 : e.elem[e.prop]
      },
      set: function(e) {
        ie.fx.step[e.prop] ? ie.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ie.cssProps[e.prop]] || ie.cssHooks[e.prop]) ? ie.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
      }
    }
  }, H.propHooks.scrollTop = H.propHooks.scrollLeft = {
    set: function(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }
  }, ie.easing = {
    linear: function(e) {
      return e
    },
    swing: function(e) {
      return .5 - Math.cos(e * Math.PI) / 2
    }
  }, ie.fx = H.prototype.init, ie.fx.step = {};
  var ut, dt, ft = /^(?:toggle|show|hide)$/,
    pt = new RegExp("^(?:([+-])=|)(" + Se + ")([a-z%]*)$", "i"),
    ht = /queueHooks$/,
    vt = [function(e, t, n) {
      var i, o, r, a, s, l, c, u = this,
        d = {},
        f = e.style,
        p = e.nodeType && ke(e),
        h = ie._data(e, "fxshow");
      n.queue || (null == (s = ie._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function() {
        s.unqueued || l()
      }), s.unqueued++, u.always(function() {
        u.always(function() {
          s.unqueued--, ie.queue(e, "fx").length || s.empty.fire()
        })
      })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], "inline" === ("none" === (c = ie.css(e, "display")) ? ie._data(e, "olddisplay") || E(e.nodeName) : c) && "none" === ie.css(e, "float") && (te.inlineBlockNeedsLayout && "inline" !== E(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")), n.overflow && (f.overflow = "hidden", te.shrinkWrapBlocks() || u.always(function() {
        f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
      }));
      for (i in t)
        if (o = t[i], ft.exec(o)) {
          if (delete t[i], r = r || "toggle" === o, o === (p ? "hide" : "show")) {
            if ("show" !== o || !h || void 0 === h[i]) continue;
            p = !0
          }
          d[i] = h && h[i] || ie.style(e, i)
        } else c = void 0;
      if (ie.isEmptyObject(d)) "inline" === ("none" === c ? E(e.nodeName) : c) && (f.display = c);
      else {
        h ? "hidden" in h && (p = h.hidden) : h = ie._data(e, "fxshow", {}), r && (h.hidden = !p), p ? ie(e).show() : u.done(function() {
          ie(e).hide()
        }), u.done(function() {
          var t;
          ie._removeData(e, "fxshow");
          for (t in d) ie.style(e, t, d[t])
        });
        for (i in d) a = O(p ? h[i] : 0, i, u), i in h || (h[i] = a.start, p && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
      }
    }],
    mt = {
      "*": [function(e, t) {
        var n = this.createTween(e, t),
          i = n.cur(),
          o = pt.exec(t),
          r = o && o[3] || (ie.cssNumber[e] ? "" : "px"),
          a = (ie.cssNumber[e] || "px" !== r && +i) && pt.exec(ie.css(n.elem, e)),
          s = 1,
          l = 20;
        if (a && a[3] !== r) {
          r = r || a[3], o = o || [], a = +i || 1;
          do {
            s = s || ".5", a /= s, ie.style(n.elem, e, a + r)
          } while (s !== (s = n.cur() / i) && 1 !== s && --l)
        }
        return o && (a = n.start = +a || +i || 0, n.unit = r, n.end = o[1] ? a + (o[1] + 1) * o[2] : +o[2]), n
      }]
    };
  ie.Animation = ie.extend(q, {
      tweener: function(e, t) {
        ie.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
        for (var n, i = 0, o = e.length; o > i; i++) n = e[i], mt[n] = mt[n] || [], mt[n].unshift(t)
      },
      prefilter: function(e, t) {
        t ? vt.unshift(e) : vt.push(e)
      }
    }), ie.speed = function(e, t, n) {
      var i = e && "object" == typeof e ? ie.extend({}, e) : {
        complete: n || !n && t || ie.isFunction(e) && e,
        duration: e,
        easing: n && t || t && !ie.isFunction(t) && t
      };
      return i.duration = ie.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ie.fx.speeds ? ie.fx.speeds[i.duration] : ie.fx.speeds._default, (null == i.queue || !0 === i.queue) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
        ie.isFunction(i.old) && i.old.call(this), i.queue && ie.dequeue(this, i.queue)
      }, i
    }, ie.fn.extend({
      fadeTo: function(e, t, n, i) {
        return this.filter(ke).css("opacity", 0).show().end().animate({
          opacity: t
        }, e, n, i)
      },
      animate: function(e, t, n, i) {
        var o = ie.isEmptyObject(e),
          r = ie.speed(t, n, i),
          a = function() {
            var t = q(this, ie.extend({}, e), r);
            (o || ie._data(this, "finish")) && t.stop(!0)
          };
        return a.finish = a, o || !1 === r.queue ? this.each(a) : this.queue(r.queue, a)
      },
      stop: function(e, t, n) {
        var i = function(e) {
          var t = e.stop;
          delete e.stop, t(n)
        };
        return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function() {
          var t = !0,
            o = null != e && e + "queueHooks",
            r = ie.timers,
            a = ie._data(this);
          if (o) a[o] && a[o].stop && i(a[o]);
          else
            for (o in a) a[o] && a[o].stop && ht.test(o) && i(a[o]);
          for (o = r.length; o--;) r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n), t = !1, r.splice(o, 1));
          (t || !n) && ie.dequeue(this, e)
        })
      },
      finish: function(e) {
        return !1 !== e && (e = e || "fx"), this.each(function() {
          var t, n = ie._data(this),
            i = n[e + "queue"],
            o = n[e + "queueHooks"],
            r = ie.timers,
            a = i ? i.length : 0;
          for (n.finish = !0, ie.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
          for (t = 0; a > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
          delete n.finish
        })
      }
    }), ie.each(["toggle", "show", "hide"], function(e, t) {
      var n = ie.fn[t];
      ie.fn[t] = function(e, i, o) {
        return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(M(t, !0), e, i, o)
      }
    }), ie.each({
      slideDown: M("show"),
      slideUp: M("hide"),
      slideToggle: M("toggle"),
      fadeIn: {
        opacity: "show"
      },
      fadeOut: {
        opacity: "hide"
      },
      fadeToggle: {
        opacity: "toggle"
      }
    }, function(e, t) {
      ie.fn[e] = function(e, n, i) {
        return this.animate(t, e, n, i)
      }
    }), ie.timers = [], ie.fx.tick = function() {
      var e, t = ie.timers,
        n = 0;
      for (ut = ie.now(); n < t.length; n++)(e = t[n])() || t[n] !== e || t.splice(n--, 1);
      t.length || ie.fx.stop(), ut = void 0
    }, ie.fx.timer = function(e) {
      ie.timers.push(e), e() ? ie.fx.start() : ie.timers.pop()
    }, ie.fx.interval = 13, ie.fx.start = function() {
      dt || (dt = setInterval(ie.fx.tick, ie.fx.interval))
    }, ie.fx.stop = function() {
      clearInterval(dt), dt = null
    }, ie.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400
    }, ie.fn.delay = function(e, t) {
      return e = ie.fx ? ie.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
        var i = setTimeout(t, e);
        n.stop = function() {
          clearTimeout(i)
        }
      })
    },
    function() {
      var e, t, n, i, o;
      (t = pe.createElement("div")).setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = t.getElementsByTagName("a")[0], o = (n = pe.createElement("select")).appendChild(pe.createElement("option")), e = t.getElementsByTagName("input")[0], i.style.cssText = "top:1px", te.getSetAttribute = "t" !== t.className, te.style = /top/.test(i.getAttribute("style")), te.hrefNormalized = "/a" === i.getAttribute("href"), te.checkOn = !!e.value, te.optSelected = o.selected, te.enctype = !!pe.createElement("form").enctype, n.disabled = !0, te.optDisabled = !o.disabled, (e = pe.createElement("input")).setAttribute("value", ""), te.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), te.radioValue = "t" === e.value
    }();
  var gt = /\r/g;
  ie.fn.extend({
    val: function(e) {
      var t, n, i, o = this[0];
      return arguments.length ? (i = ie.isFunction(e), this.each(function(n) {
        var o;
        1 === this.nodeType && (null == (o = i ? e.call(this, n, ie(this).val()) : e) ? o = "" : "number" == typeof o ? o += "" : ie.isArray(o) && (o = ie.map(o, function(e) {
          return null == e ? "" : e + ""
        })), (t = ie.valHooks[this.type] || ie.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
      })) : o ? (t = ie.valHooks[o.type] || ie.valHooks[o.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : "string" == typeof(n = o.value) ? n.replace(gt, "") : null == n ? "" : n : void 0
    }
  }), ie.extend({
    valHooks: {
      option: {
        get: function(e) {
          var t = ie.find.attr(e, "value");
          return null != t ? t : ie.trim(ie.text(e))
        }
      },
      select: {
        get: function(e) {
          for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || 0 > o, a = r ? null : [], s = r ? o + 1 : i.length, l = 0 > o ? s : r ? o : 0; s > l; l++)
            if (!(!(n = i[l]).selected && l !== o || (te.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ie.nodeName(n.parentNode, "optgroup"))) {
              if (t = ie(n).val(), r) return t;
              a.push(t)
            } return a
        },
        set: function(e, t) {
          for (var n, i, o = e.options, r = ie.makeArray(t), a = o.length; a--;)
            if (i = o[a], ie.inArray(ie.valHooks.option.get(i), r) >= 0) try {
              i.selected = n = !0
            } catch (e) {
              i.scrollHeight
            } else i.selected = !1;
          return n || (e.selectedIndex = -1), o
        }
      }
    }
  }), ie.each(["radio", "checkbox"], function() {
    ie.valHooks[this] = {
      set: function(e, t) {
        return ie.isArray(t) ? e.checked = ie.inArray(ie(e).val(), t) >= 0 : void 0
      }
    }, te.checkOn || (ie.valHooks[this].get = function(e) {
      return null === e.getAttribute("value") ? "on" : e.value
    })
  });
  var yt, bt, xt = ie.expr.attrHandle,
    wt = /^(?:checked|selected)$/i,
    Tt = te.getSetAttribute,
    Ct = te.input;
  ie.fn.extend({
    attr: function(e, t) {
      return Ne(this, ie.attr, e, t, arguments.length > 1)
    },
    removeAttr: function(e) {
      return this.each(function() {
        ie.removeAttr(this, e)
      })
    }
  }), ie.extend({
    attr: function(e, t, n) {
      var i, o, r = e.nodeType;
      if (e && 3 !== r && 8 !== r && 2 !== r) return typeof e.getAttribute === we ? ie.prop(e, t, n) : (1 === r && ie.isXMLDoc(e) || (t = t.toLowerCase(), i = ie.attrHooks[t] || (ie.expr.match.bool.test(t) ? bt : yt)), void 0 === n ? i && "get" in i && null !== (o = i.get(e, t)) ? o : null == (o = ie.find.attr(e, t)) ? void 0 : o : null !== n ? i && "set" in i && void 0 !== (o = i.set(e, n, t)) ? o : (e.setAttribute(t, n + ""), n) : void ie.removeAttr(e, t))
    },
    removeAttr: function(e, t) {
      var n, i, o = 0,
        r = t && t.match(ge);
      if (r && 1 === e.nodeType)
        for (; n = r[o++];) i = ie.propFix[n] || n, ie.expr.match.bool.test(n) ? Ct && Tt || !wt.test(n) ? e[i] = !1 : e[ie.camelCase("default-" + n)] = e[i] = !1 : ie.attr(e, n, ""), e.removeAttribute(Tt ? n : i)
    },
    attrHooks: {
      type: {
        set: function(e, t) {
          if (!te.radioValue && "radio" === t && ie.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
          }
        }
      }
    }
  }), bt = {
    set: function(e, t, n) {
      return !1 === t ? ie.removeAttr(e, n) : Ct && Tt || !wt.test(n) ? e.setAttribute(!Tt && ie.propFix[n] || n, n) : e[ie.camelCase("default-" + n)] = e[n] = !0, n
    }
  }, ie.each(ie.expr.match.bool.source.match(/\w+/g), function(e, t) {
    var n = xt[t] || ie.find.attr;
    xt[t] = Ct && Tt || !wt.test(t) ? function(e, t, i) {
      var o, r;
      return i || (r = xt[t], xt[t] = o, o = null != n(e, t, i) ? t.toLowerCase() : null, xt[t] = r), o
    } : function(e, t, n) {
      return n ? void 0 : e[ie.camelCase("default-" + t)] ? t.toLowerCase() : null
    }
  }), Ct && Tt || (ie.attrHooks.value = {
    set: function(e, t, n) {
      return ie.nodeName(e, "input") ? void(e.defaultValue = t) : yt && yt.set(e, t, n)
    }
  }), Tt || (yt = {
    set: function(e, t, n) {
      var i = e.getAttributeNode(n);
      return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)), i.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
    }
  }, xt.id = xt.name = xt.coords = function(e, t, n) {
    var i;
    return n ? void 0 : (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
  }, ie.valHooks.button = {
    get: function(e, t) {
      var n = e.getAttributeNode(t);
      return n && n.specified ? n.value : void 0
    },
    set: yt.set
  }, ie.attrHooks.contenteditable = {
    set: function(e, t, n) {
      yt.set(e, "" !== t && t, n)
    }
  }, ie.each(["width", "height"], function(e, t) {
    ie.attrHooks[t] = {
      set: function(e, n) {
        return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
      }
    }
  })), te.style || (ie.attrHooks.style = {
    get: function(e) {
      return e.style.cssText || void 0
    },
    set: function(e, t) {
      return e.style.cssText = t + ""
    }
  });
  var St = /^(?:input|select|textarea|button|object)$/i,
    Et = /^(?:a|area)$/i;
  ie.fn.extend({
    prop: function(e, t) {
      return Ne(this, ie.prop, e, t, arguments.length > 1)
    },
    removeProp: function(e) {
      return e = ie.propFix[e] || e, this.each(function() {
        try {
          this[e] = void 0, delete this[e]
        } catch (e) {}
      })
    }
  }), ie.extend({
    propFix: {
      for: "htmlFor",
      class: "className"
    },
    prop: function(e, t, n) {
      var i, o, r = e.nodeType;
      if (e && 3 !== r && 8 !== r && 2 !== r) return (1 !== r || !ie.isXMLDoc(e)) && (t = ie.propFix[t] || t, o = ie.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
    },
    propHooks: {
      tabIndex: {
        get: function(e) {
          var t = ie.find.attr(e, "tabindex");
          return t ? parseInt(t, 10) : St.test(e.nodeName) || Et.test(e.nodeName) && e.href ? 0 : -1
        }
      }
    }
  }), te.hrefNormalized || ie.each(["href", "src"], function(e, t) {
    ie.propHooks[t] = {
      get: function(e) {
        return e.getAttribute(t, 4)
      }
    }
  }), te.optSelected || (ie.propHooks.selected = {
    get: function(e) {
      var t = e.parentNode;
      return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
    }
  }), ie.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    ie.propFix[this.toLowerCase()] = this
  }), te.enctype || (ie.propFix.enctype = "encoding");
  var kt = /[\t\r\n\f]/g;
  ie.fn.extend({
    addClass: function(e) {
      var t, n, i, o, r, a, s = 0,
        l = this.length,
        c = "string" == typeof e && e;
      if (ie.isFunction(e)) return this.each(function(t) {
        ie(this).addClass(e.call(this, t, this.className))
      });
      if (c)
        for (t = (e || "").match(ge) || []; l > s; s++)
          if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(kt, " ") : " ")) {
            for (r = 0; o = t[r++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
            a = ie.trim(i), n.className !== a && (n.className = a)
          } return this
    },
    removeClass: function(e) {
      var t, n, i, o, r, a, s = 0,
        l = this.length,
        c = 0 === arguments.length || "string" == typeof e && e;
      if (ie.isFunction(e)) return this.each(function(t) {
        ie(this).removeClass(e.call(this, t, this.className))
      });
      if (c)
        for (t = (e || "").match(ge) || []; l > s; s++)
          if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(kt, " ") : "")) {
            for (r = 0; o = t[r++];)
              for (; i.indexOf(" " + o + " ") >= 0;) i = i.replace(" " + o + " ", " ");
            a = e ? ie.trim(i) : "", n.className !== a && (n.className = a)
          } return this
    },
    toggleClass: function(e, t) {
      var n = typeof e;
      return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(ie.isFunction(e) ? function(n) {
        ie(this).toggleClass(e.call(this, n, this.className, t), t)
      } : function() {
        if ("string" === n)
          for (var t, i = 0, o = ie(this), r = e.match(ge) || []; t = r[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
        else(n === we || "boolean" === n) && (this.className && ie._data(this, "__className__", this.className), this.className = this.className || !1 === e ? "" : ie._data(this, "__className__") || "")
      })
    },
    hasClass: function(e) {
      for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)
        if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(kt, " ").indexOf(t) >= 0) return !0;
      return !1
    }
  }), ie.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
    ie.fn[t] = function(e, n) {
      return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
    }
  }), ie.fn.extend({
    hover: function(e, t) {
      return this.mouseenter(e).mouseleave(t || e)
    },
    bind: function(e, t, n) {
      return this.on(e, null, t, n)
    },
    unbind: function(e, t) {
      return this.off(e, null, t)
    },
    delegate: function(e, t, n, i) {
      return this.on(t, e, n, i)
    },
    undelegate: function(e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
    }
  });
  var Nt = ie.now(),
    At = /\?/,
    Lt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  ie.parseJSON = function(t) {
    if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
    var n, i = null,
      o = ie.trim(t + "");
    return o && !ie.trim(o.replace(Lt, function(e, t, o, r) {
      return n && t && (i = 0), 0 === i ? e : (n = o || t, i += !r - !o, "")
    })) ? Function("return " + o)() : ie.error("Invalid JSON: " + t)
  }, ie.parseXML = function(t) {
    var n, i;
    if (!t || "string" != typeof t) return null;
    try {
      e.DOMParser ? (i = new DOMParser, n = i.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
    } catch (e) {
      n = void 0
    }
    return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ie.error("Invalid XML: " + t), n
  };
  var Dt, It, Ht = /#.*$/,
    jt = /([?&])_=[^&]*/,
    Mt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Ot = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    _t = /^(?:GET|HEAD)$/,
    qt = /^\/\//,
    Rt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Bt = {},
    Ft = {},
    zt = "*/".concat("*");
  try {
    It = location.href
  } catch (e) {
    (It = pe.createElement("a")).href = "", It = It.href
  }
  Dt = Rt.exec(It.toLowerCase()) || [], ie.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: It,
      type: "GET",
      isLocal: Ot.test(Dt[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": zt,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": ie.parseJSON,
        "text xml": ie.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function(e, t) {
      return t ? F(F(e, ie.ajaxSettings), t) : F(ie.ajaxSettings, e)
    },
    ajaxPrefilter: R(Bt),
    ajaxTransport: R(Ft),
    ajax: function(e, t) {
      function n(e, t, n, i) {
        var o, u, g, y, x, T = t;
        2 !== b && (b = 2, s && clearTimeout(s), c = void 0, a = i || "", w.readyState = e > 0 ? 4 : 0, o = e >= 200 && 300 > e || 304 === e, n && (y = z(d, w, n)), y = P(d, y, w, o), o ? (d.ifModified && ((x = w.getResponseHeader("Last-Modified")) && (ie.lastModified[r] = x), (x = w.getResponseHeader("etag")) && (ie.etag[r] = x)), 204 === e || "HEAD" === d.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = y.state, u = y.data, g = y.error, o = !g)) : (g = T, (e || !T) && (T = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || T) + "", o ? h.resolveWith(f, [u, T, w]) : h.rejectWith(f, [w, T, g]), w.statusCode(m), m = void 0, l && p.trigger(o ? "ajaxSuccess" : "ajaxError", [w, d, o ? u : g]), v.fireWith(f, [w, T]), l && (p.trigger("ajaxComplete", [w, d]), --ie.active || ie.event.trigger("ajaxStop")))
      }
      "object" == typeof e && (t = e, e = void 0), t = t || {};
      var i, o, r, a, s, l, c, u, d = ie.ajaxSetup({}, t),
        f = d.context || d,
        p = d.context && (f.nodeType || f.jquery) ? ie(f) : ie.event,
        h = ie.Deferred(),
        v = ie.Callbacks("once memory"),
        m = d.statusCode || {},
        g = {},
        y = {},
        b = 0,
        x = "canceled",
        w = {
          readyState: 0,
          getResponseHeader: function(e) {
            var t;
            if (2 === b) {
              if (!u)
                for (u = {}; t = Mt.exec(a);) u[t[1].toLowerCase()] = t[2];
              t = u[e.toLowerCase()]
            }
            return null == t ? null : t
          },
          getAllResponseHeaders: function() {
            return 2 === b ? a : null
          },
          setRequestHeader: function(e, t) {
            var n = e.toLowerCase();
            return b || (e = y[n] = y[n] || e, g[e] = t), this
          },
          overrideMimeType: function(e) {
            return b || (d.mimeType = e), this
          },
          statusCode: function(e) {
            var t;
            if (e)
              if (2 > b)
                for (t in e) m[t] = [m[t], e[t]];
              else w.always(e[w.status]);
            return this
          },
          abort: function(e) {
            var t = e || x;
            return c && c.abort(t), n(0, t), this
          }
        };
      if (h.promise(w).complete = v.add, w.success = w.done, w.error = w.fail, d.url = ((e || d.url || It) + "").replace(Ht, "").replace(qt, Dt[1] + "//"), d.type = t.method || t.type || d.method || d.type, d.dataTypes = ie.trim(d.dataType || "*").toLowerCase().match(ge) || [""], null == d.crossDomain && (i = Rt.exec(d.url.toLowerCase()), d.crossDomain = !(!i || i[1] === Dt[1] && i[2] === Dt[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (Dt[3] || ("http:" === Dt[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = ie.param(d.data, d.traditional)), B(Bt, d, t, w), 2 === b) return w;
      (l = ie.event && d.global) && 0 == ie.active++ && ie.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !_t.test(d.type), r = d.url, d.hasContent || (d.data && (r = d.url += (At.test(r) ? "&" : "?") + d.data, delete d.data), !1 === d.cache && (d.url = jt.test(r) ? r.replace(jt, "$1_=" + Nt++) : r + (At.test(r) ? "&" : "?") + "_=" + Nt++)), d.ifModified && (ie.lastModified[r] && w.setRequestHeader("If-Modified-Since", ie.lastModified[r]), ie.etag[r] && w.setRequestHeader("If-None-Match", ie.etag[r])), (d.data && d.hasContent && !1 !== d.contentType || t.contentType) && w.setRequestHeader("Content-Type", d.contentType), w.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + zt + "; q=0.01" : "") : d.accepts["*"]);
      for (o in d.headers) w.setRequestHeader(o, d.headers[o]);
      if (d.beforeSend && (!1 === d.beforeSend.call(f, w, d) || 2 === b)) return w.abort();
      x = "abort";
      for (o in {
          success: 1,
          error: 1,
          complete: 1
        }) w[o](d[o]);
      if (c = B(Ft, d, t, w)) {
        w.readyState = 1, l && p.trigger("ajaxSend", [w, d]), d.async && d.timeout > 0 && (s = setTimeout(function() {
          w.abort("timeout")
        }, d.timeout));
        try {
          b = 1, c.send(g, n)
        } catch (e) {
          if (!(2 > b)) throw e;
          n(-1, e)
        }
      } else n(-1, "No Transport");
      return w
    },
    getJSON: function(e, t, n) {
      return ie.get(e, t, n, "json")
    },
    getScript: function(e, t) {
      return ie.get(e, void 0, t, "script")
    }
  }), ie.each(["get", "post"], function(e, t) {
    ie[t] = function(e, n, i, o) {
      return ie.isFunction(n) && (o = o || i, i = n, n = void 0), ie.ajax({
        url: e,
        type: t,
        dataType: o,
        data: n,
        success: i
      })
    }
  }), ie._evalUrl = function(e) {
    return ie.ajax({
      url: e,
      type: "GET",
      dataType: "script",
      async: !1,
      global: !1,
      throws: !0
    })
  }, ie.fn.extend({
    wrapAll: function(e) {
      if (ie.isFunction(e)) return this.each(function(t) {
        ie(this).wrapAll(e.call(this, t))
      });
      if (this[0]) {
        var t = ie(e, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
          for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
          return e
        }).append(this)
      }
      return this
    },
    wrapInner: function(e) {
      return this.each(ie.isFunction(e) ? function(t) {
        ie(this).wrapInner(e.call(this, t))
      } : function() {
        var t = ie(this),
          n = t.contents();
        n.length ? n.wrapAll(e) : t.append(e)
      })
    },
    wrap: function(e) {
      var t = ie.isFunction(e);
      return this.each(function(n) {
        ie(this).wrapAll(t ? e.call(this, n) : e)
      })
    },
    unwrap: function() {
      return this.parent().each(function() {
        ie.nodeName(this, "body") || ie(this).replaceWith(this.childNodes)
      }).end()
    }
  }), ie.expr.filters.hidden = function(e) {
    return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !te.reliableHiddenOffsets() && "none" === (e.style && e.style.display || ie.css(e, "display"))
  }, ie.expr.filters.visible = function(e) {
    return !ie.expr.filters.hidden(e)
  };
  var Pt = /%20/g,
    Wt = /\[\]$/,
    $t = /\r?\n/g,
    Xt = /^(?:submit|button|image|reset|file)$/i,
    Vt = /^(?:input|select|textarea|keygen)/i;
  ie.param = function(e, t) {
    var n, i = [],
      o = function(e, t) {
        t = ie.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
      };
    if (void 0 === t && (t = ie.ajaxSettings && ie.ajaxSettings.traditional), ie.isArray(e) || e.jquery && !ie.isPlainObject(e)) ie.each(e, function() {
      o(this.name, this.value)
    });
    else
      for (n in e) W(n, e[n], t, o);
    return i.join("&").replace(Pt, "+")
  }, ie.fn.extend({
    serialize: function() {
      return ie.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        var e = ie.prop(this, "elements");
        return e ? ie.makeArray(e) : this
      }).filter(function() {
        var e = this.type;
        return this.name && !ie(this).is(":disabled") && Vt.test(this.nodeName) && !Xt.test(e) && (this.checked || !Ae.test(e))
      }).map(function(e, t) {
        var n = ie(this).val();
        return null == n ? null : ie.isArray(n) ? ie.map(n, function(e) {
          return {
            name: t.name,
            value: e.replace($t, "\r\n")
          }
        }) : {
          name: t.name,
          value: n.replace($t, "\r\n")
        }
      }).get()
    }
  }), ie.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
    return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && $() || X()
  } : $;
  var Ut = 0,
    Yt = {},
    Jt = ie.ajaxSettings.xhr();
  e.attachEvent && e.attachEvent("onunload", function() {
    for (var e in Yt) Yt[e](void 0, !0)
  }), te.cors = !!Jt && "withCredentials" in Jt, (Jt = te.ajax = !!Jt) && ie.ajaxTransport(function(e) {
    if (!e.crossDomain || te.cors) {
      var t;
      return {
        send: function(n, i) {
          var o, r = e.xhr(),
            a = ++Ut;
          if (r.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
            for (o in e.xhrFields) r[o] = e.xhrFields[o];
          e.mimeType && r.overrideMimeType && r.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
          for (o in n) void 0 !== n[o] && r.setRequestHeader(o, n[o] + "");
          r.send(e.hasContent && e.data || null), t = function(n, o) {
            var s, l, c;
            if (t && (o || 4 === r.readyState))
              if (delete Yt[a], t = void 0, r.onreadystatechange = ie.noop, o) 4 !== r.readyState && r.abort();
              else {
                c = {}, s = r.status, "string" == typeof r.responseText && (c.text = r.responseText);
                try {
                  l = r.statusText
                } catch (e) {
                  l = ""
                }
                s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = c.text ? 200 : 404
              } c && i(s, l, c, r.getAllResponseHeaders())
          }, e.async ? 4 === r.readyState ? setTimeout(t) : r.onreadystatechange = Yt[a] = t : t()
        },
        abort: function() {
          t && t(void 0, !0)
        }
      }
    }
  }), ie.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      "text script": function(e) {
        return ie.globalEval(e), e
      }
    }
  }), ie.ajaxPrefilter("script", function(e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
  }), ie.ajaxTransport("script", function(e) {
    if (e.crossDomain) {
      var t, n = pe.head || ie("head")[0] || pe.documentElement;
      return {
        send: function(i, o) {
          (t = pe.createElement("script")).async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, n) {
            (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || o(200, "success"))
          }, n.insertBefore(t, n.firstChild)
        },
        abort: function() {
          t && t.onload(void 0, !0)
        }
      }
    }
  });
  var Kt = [],
    Gt = /(=)\?(?=&|$)|\?\?/;
  ie.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var e = Kt.pop() || ie.expando + "_" + Nt++;
      return this[e] = !0, e
    }
  }), ie.ajaxPrefilter("json jsonp", function(t, n, i) {
    var o, r, a, s = !1 !== t.jsonp && (Gt.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Gt.test(t.data) && "data");
    return s || "jsonp" === t.dataTypes[0] ? (o = t.jsonpCallback = ie.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Gt, "$1" + o) : !1 !== t.jsonp && (t.url += (At.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function() {
      return a || ie.error(o + " was not called"), a[0]
    }, t.dataTypes[0] = "json", r = e[o], e[o] = function() {
      a = arguments
    }, i.always(function() {
      e[o] = r, t[o] && (t.jsonpCallback = n.jsonpCallback, Kt.push(o)), a && ie.isFunction(r) && r(a[0]), a = r = void 0
    }), "script") : void 0
  }), ie.parseHTML = function(e, t, n) {
    if (!e || "string" != typeof e) return null;
    "boolean" == typeof t && (n = t, t = !1), t = t || pe;
    var i = ue.exec(e),
      o = !n && [];
    return i ? [t.createElement(i[1])] : (i = ie.buildFragment([e], t, o), o && o.length && ie(o).remove(), ie.merge([], i.childNodes))
  };
  var Qt = ie.fn.load;
  ie.fn.load = function(e, t, n) {
    if ("string" != typeof e && Qt) return Qt.apply(this, arguments);
    var i, o, r, a = this,
      s = e.indexOf(" ");
    return s >= 0 && (i = ie.trim(e.slice(s, e.length)), e = e.slice(0, s)), ie.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"), a.length > 0 && ie.ajax({
      url: e,
      type: r,
      dataType: "html",
      data: t
    }).done(function(e) {
      o = arguments, a.html(i ? ie("<div>").append(ie.parseHTML(e)).find(i) : e)
    }).complete(n && function(e, t) {
      a.each(n, o || [e.responseText, t, e])
    }), this
  }, ie.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
    ie.fn[t] = function(e) {
      return this.on(t, e)
    }
  }), ie.expr.filters.animated = function(e) {
    return ie.grep(ie.timers, function(t) {
      return e === t.elem
    }).length
  };
  var Zt = e.document.documentElement;
  ie.offset = {
    setOffset: function(e, t, n) {
      var i, o, r, a, s, l, c = ie.css(e, "position"),
        u = ie(e),
        d = {};
      "static" === c && (e.style.position = "relative"), s = u.offset(), r = ie.css(e, "top"), l = ie.css(e, "left"), ("absolute" === c || "fixed" === c) && ie.inArray("auto", [r, l]) > -1 ? (i = u.position(), a = i.top, o = i.left) : (a = parseFloat(r) || 0, o = parseFloat(l) || 0), ie.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (d.top = t.top - s.top + a), null != t.left && (d.left = t.left - s.left + o), "using" in t ? t.using.call(e, d) : u.css(d)
    }
  }, ie.fn.extend({
    offset: function(e) {
      if (arguments.length) return void 0 === e ? this : this.each(function(t) {
        ie.offset.setOffset(this, e, t)
      });
      var t, n, i = {
          top: 0,
          left: 0
        },
        o = this[0],
        r = o && o.ownerDocument;
      return r ? (t = r.documentElement, ie.contains(t, o) ? (typeof o.getBoundingClientRect !== we && (i = o.getBoundingClientRect()), n = V(r), {
        top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
        left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
      }) : i) : void 0
    },
    position: function() {
      if (this[0]) {
        var e, t, n = {
            top: 0,
            left: 0
          },
          i = this[0];
        return "fixed" === ie.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ie.nodeName(e[0], "html") || (n = e.offset()), n.top += ie.css(e[0], "borderTopWidth", !0), n.left += ie.css(e[0], "borderLeftWidth", !0)), {
          top: t.top - n.top - ie.css(i, "marginTop", !0),
          left: t.left - n.left - ie.css(i, "marginLeft", !0)
        }
      }
    },
    offsetParent: function() {
      return this.map(function() {
        for (var e = this.offsetParent || Zt; e && !ie.nodeName(e, "html") && "static" === ie.css(e, "position");) e = e.offsetParent;
        return e || Zt
      })
    }
  }), ie.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(e, t) {
    var n = /Y/.test(t);
    ie.fn[e] = function(i) {
      return Ne(this, function(e, i, o) {
        var r = V(e);
        return void 0 === o ? r ? t in r ? r[t] : r.document.documentElement[i] : e[i] : void(r ? r.scrollTo(n ? ie(r).scrollLeft() : o, n ? o : ie(r).scrollTop()) : e[i] = o)
      }, e, i, arguments.length, null)
    }
  }), ie.each(["top", "left"], function(e, t) {
    ie.cssHooks[t] = k(te.pixelPosition, function(e, n) {
      return n ? (n = Qe(e, t), et.test(n) ? ie(e).position()[t] + "px" : n) : void 0
    })
  }), ie.each({
    Height: "height",
    Width: "width"
  }, function(e, t) {
    ie.each({
      padding: "inner" + e,
      content: t,
      "": "outer" + e
    }, function(n, i) {
      ie.fn[i] = function(i, o) {
        var r = arguments.length && (n || "boolean" != typeof i),
          a = n || (!0 === i || !0 === o ? "margin" : "border");
        return Ne(this, function(t, n, i) {
          var o;
          return ie.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? ie.css(t, n, a) : ie.style(t, n, i, a)
        }, t, r ? i : void 0, r, null)
      }
    })
  }), ie.fn.size = function() {
    return this.length
  }, ie.fn.andSelf = ie.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
    return ie
  });
  var en = e.jQuery,
    tn = e.$;
  return ie.noConflict = function(t) {
    return e.$ === ie && (e.$ = tn), t && e.jQuery === ie && (e.jQuery = en), ie
  }, typeof t === we && (e.jQuery = e.$ = ie), ie
}),
function(e, t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], function(n) {
    return t(n, e, e.document, e.Math)
  }) : "object" == typeof exports && exports ? module.exports = t(require("jquery"), e, e.document, e.Math) : t(jQuery, e, e.document, e.Math)
}("undefined" != typeof window ? window : this, function(e, t, n, i, o) {
  "use strict";
  var r = "fullpage-wrapper",
    a = "." + r,
    s = "fp-scrollable",
    l = "." + s,
    c = "fp-responsive",
    u = "fp-notransition",
    d = "fp-destroyed",
    f = "fp-enabled",
    p = "fp-viewing",
    h = "active",
    v = "." + h,
    m = "fp-completely",
    g = "." + m,
    y = "fp-section",
    b = "." + y,
    x = b + v,
    w = b + ":first",
    T = b + ":last",
    C = "fp-tableCell",
    S = "." + C,
    E = "fp-auto-height",
    k = "fp-normal-scroll",
    N = "fp-nav",
    A = "#" + N,
    L = "fp-tooltip",
    D = "." + L,
    I = "fp-show-active",
    H = "fp-slide",
    j = "." + H,
    M = j + v,
    O = "fp-slides",
    _ = "." + O,
    q = "fp-slidesContainer",
    R = "." + q,
    B = "fp-table",
    F = "fp-slidesNav",
    z = "." + F,
    P = z + " a",
    W = "fp-controlArrow",
    $ = "." + W,
    X = "fp-prev",
    V = W + " " + X,
    U = $ + ("." + X),
    Y = "fp-next",
    J = W + " " + Y,
    K = $ + ".fp-next",
    G = e(t),
    Q = e(n),
    Z = {
      scrollbars: !0,
      mouseWheel: !0,
      hideScrollbars: !1,
      fadeScrollbars: !1,
      disableMouse: !0,
      interactiveScrollbars: !0
    };
  e.fn.fullpage = function(s) {
    function l(t, n) {
      t || Yt(0), Qt("autoScrolling", t, n);
      var i = e(x);
      s.autoScrolling && !s.scrollBar ? (tn.css({
        overflow: "hidden",
        height: "100%"
      }), W(Nn.recordHistory, "internal"), fn.css({
        "-ms-touch-action": "none",
        "touch-action": "none"
      }), i.length && Yt(i.position().top)) : (tn.css({
        overflow: "visible",
        height: "initial"
      }), W(!1, "internal"), fn.css({
        "-ms-touch-action": "",
        "touch-action": ""
      }), i.length && tn.scrollTop(i.position().top))
    }

    function W(e, t) {
      Qt("recordHistory", e, t)
    }

    function Y(e, t) {
      Qt("scrollingSpeed", e, t)
    }

    function te(e, t) {
      Qt("fitToSection", e, t)
    }

    function ne(e) {
      e ? (zt(), Pt()) : (Ft(), Wt())
    }

    function ie(t, n) {
      void 0 !== n ? (n = n.replace(/ /g, "").split(","), e.each(n, function(e, n) {
        Kt(t, n, "m")
      })) : t ? (ne(!0), $t()) : (ne(!1), Xt())
    }

    function oe(t, n) {
      void 0 !== n ? (n = n.replace(/ /g, "").split(","), e.each(n, function(e, n) {
        Kt(t, n, "k")
      })) : s.keyboardScrolling = t
    }

    function re() {
      var t = e(x).prev(b);
      t.length || !s.loopTop && !s.continuousVertical || (t = e(b).last()), t.length && Pe(t, null, !0)
    }

    function ae() {
      var t = e(x).next(b);
      t.length || !s.loopBottom && !s.continuousVertical || (t = e(b).first()), t.length && Pe(t, null, !1)
    }

    function se(e, t) {
      Y(0, "internal"), le(e, t), Y(Nn.scrollingSpeed, "internal")
    }

    function le(e, t) {
      var n = Dt(e);
      void 0 !== t ? Ht(e, t) : n.length > 0 && Pe(n)
    }

    function ce(e) {
      Be("right", e)
    }

    function ue(e) {
      Be("left", e)
    }

    function de(t) {
      if (!fn.hasClass(d)) {
        hn = !0, pn = G.height(), e(b).each(function() {
          var t = e(this).find(_),
            n = e(this).find(j);
          s.verticalCentered && e(this).find(S).css("height", At(e(this)) + "px"), e(this).css("height", pn + "px"), s.scrollOverflow && (n.length ? n.each(function() {
            kt(e(this))
          }) : kt(e(this))), n.length > 1 && pt(t, t.find(M))
        });
        var n = e(x).index(b);
        n && se(n + 1), hn = !1, e.isFunction(s.afterResize) && t && s.afterResize.call(fn), e.isFunction(s.afterReBuild) && !t && s.afterReBuild.call(fn)
      }
    }

    function fe(t) {
      var n = nn.hasClass(c);
      t ? n || (l(!1, "internal"), te(!1, "internal"), e(A).hide(), nn.addClass(c), e.isFunction(s.afterResponsive) && s.afterResponsive.call(fn, t)) : n && (l(Nn.autoScrolling, "internal"), te(Nn.autoScrolling, "internal"), e(A).show(), nn.removeClass(c), e.isFunction(s.afterResponsive) && s.afterResponsive.call(fn, t))
    }

    function pe() {
      var t = fn.find(s.sectionSelector);
      s.anchors.length || (s.anchors = t.filter("[data-anchor]").map(function() {
        return e(this).data("anchor").toString()
      }).get()), s.navigationTooltips.length || (s.navigationTooltips = t.filter("[data-tooltip]").map(function() {
        return e(this).data("tooltip").toString()
      }).get())
    }

    function he() {
      fn.css({
        height: "100%",
        position: "relative"
      }), fn.addClass(r), e("html").addClass(f), pn = G.height(), fn.removeClass(d), ye(), e(b).each(function(t) {
        var n = e(this),
          i = n.find(j),
          o = i.length;
        me(n, t), ge(n, t), o > 0 ? ve(n, i, o) : s.verticalCentered && Nt(n)
      }), s.fixedElements && s.css3 && e(s.fixedElements).appendTo(nn), s.navigation && xe(), Te(), s.scrollOverflow ? ("complete" === n.readyState && we(), G.on("load", we)) : Ee()
    }

    function ve(t, n, i) {
      var o = 100 * i,
        r = 100 / i;
      n.wrapAll('<div class="' + q + '" />'), n.parent().wrap('<div class="' + O + '" />'), t.find(R).css("width", o + "%"), i > 1 && (s.controlArrows && be(t), s.slidesNavigation && Mt(t, i)), n.each(function(t) {
        e(this).css("width", r + "%"), s.verticalCentered && Nt(e(this))
      });
      var a = t.find(M);
      a.length && (0 !== e(x).index(b) || 0 === e(x).index(b) && 0 !== a.index()) ? Ut(a, "internal") : n.eq(0).addClass(h)
    }

    function me(t, n) {
      n || 0 !== e(x).length || t.addClass(h), ln = e(x), t.css("height", pn + "px"), s.paddingTop && t.css("padding-top", s.paddingTop), s.paddingBottom && t.css("padding-bottom", s.paddingBottom), void 0 !== s.sectionsColor[n] && t.css("background-color", s.sectionsColor[n]), void 0 !== s.anchors[n] && t.attr("data-anchor", s.anchors[n])
    }

    function ge(t, n) {
      void 0 !== s.anchors[n] && t.hasClass(h) && Ct(s.anchors[n], n), s.menu && s.css3 && e(s.menu).closest(a).length && e(s.menu).appendTo(nn)
    }

    function ye() {
      fn.find(s.sectionSelector).addClass(y), fn.find(s.slideSelector).addClass(H)
    }

    function be(e) {
      e.find(_).after('<div class="' + V + '"></div><div class="' + J + '"></div>'), "#fff" != s.controlArrowColor && (e.find(K).css("border-color", "transparent transparent transparent " + s.controlArrowColor), e.find(U).css("border-color", "transparent " + s.controlArrowColor + " transparent transparent")), s.loopHorizontal || e.find(U).hide()
    }

    function xe() {
      nn.append('<div id="' + N + '"><ul></ul></div>');
      var t = e(A);
      t.addClass(function() {
        return s.showActiveTooltip ? I + " " + s.navigationPosition : s.navigationPosition
      });
      for (var n = 0; n < e(b).length; n++) {
        var i = "";
        s.anchors.length && (i = s.anchors[n]);
        var o = '<li><a href="#' + i + '"><span></span></a>',
          r = s.navigationTooltips[n];
        void 0 !== r && "" !== r && (o += '<div class="' + L + " " + s.navigationPosition + '">' + r + "</div>"), o += "</li>", t.find("ul").append(o)
      }
      e(A).css("margin-top", "-" + e(A).height() / 2 + "px"), e(A).find("li").eq(e(x).index(b)).find("a").addClass(h)
    }

    function we() {
      e(b).each(function() {
        var t = e(this).find(j);
        t.length ? t.each(function() {
          kt(e(this))
        }) : kt(e(this))
      }), Ee()
    }

    function Te() {
      fn.find('iframe[src*="youtube.com/embed/"]').each(function() {
        Ce(e(this), "enablejsapi=1")
      })
    }

    function Ce(e, t) {
      var n = e.attr("src");
      e.attr("src", n + Se(n) + t)
    }

    function Se(e) {
      return /\?/.test(e) ? "&" : "?"
    }

    function Ee() {
      var t = e(x);
      t.addClass(m), s.scrollOverflowHandler.afterRender && s.scrollOverflowHandler.afterRender(t), Je(t), Ke(t), s.scrollOverflowHandler.afterLoad(), ke() && e.isFunction(s.afterLoad) && s.afterLoad.call(t, t.data("anchor"), t.index(b) + 1), e.isFunction(s.afterRender) && s.afterRender.call(fn)
    }

    function ke() {
      var e = t.location.hash.replace("#", "").split("/"),
        n = Dt(decodeURIComponent(e[0]));
      return !n.length || n.length && n.index() === ln.index()
    }

    function Ne() {
      var t;
      if (!s.autoScrolling || s.scrollBar) {
        var i = G.scrollTop(),
          o = De(i),
          r = 0,
          a = i + G.height() / 2,
          l = nn.height() - G.height() === i,
          c = n.querySelectorAll(b);
        if (l) r = c.length - 1;
        else if (i)
          for (var u = 0; u < c.length; ++u) c[u].offsetTop <= a && (r = u);
        else r = 0;
        if (Le(o) && (e(x).hasClass(m) || e(x).addClass(m).siblings().removeClass(m)), !(t = e(c).eq(r)).hasClass(h)) {
          An = !0;
          var d, f, p = e(x),
            v = p.index(b) + 1,
            g = St(t),
            y = t.data("anchor"),
            w = t.index(b) + 1,
            T = t.find(M);
          T.length && (f = T.data("anchor"), d = T.index()), mn && (t.addClass(h).siblings().removeClass(h), e.isFunction(s.onLeave) && s.onLeave.call(p, v, w, g), e.isFunction(s.afterLoad) && s.afterLoad.call(t, y, w), Qe(p), Je(t), Ke(t), Ct(y, w - 1), s.anchors.length && (rn = y), Ot(d, f, y, w)), clearTimeout(Tn), Tn = setTimeout(function() {
            An = !1
          }, 100)
        }
        s.fitToSection && (clearTimeout(Cn), Cn = setTimeout(function() {
          s.fitToSection && Ae()
        }, s.fitToSectionDelay))
      }
    }

    function Ae() {
      mn && (hn = !0, Pe(e(x)), hn = !1)
    }

    function Le(t) {
      var n = e(x).position().top,
        i = n + G.height();
      return "up" == t ? i >= G.scrollTop() + G.height() : n <= G.scrollTop()
    }

    function De(e) {
      var t = e > Ln ? "down" : "up";
      return Ln = e, On = e, t
    }

    function Ie(e, t) {
      if (yn.m[e]) {
        var n = "down" === e ? "bottom" : "top",
          i = "down" === e ? ae : re;
        if (t.length > 0) {
          if (!s.scrollOverflowHandler.isScrolled(n, t)) return !0;
          i()
        } else i()
      }
    }

    function He(e) {
      var t = e.originalEvent;
      !Me(e.target) && s.autoScrolling && Oe(t) && e.preventDefault()
    }

    function je(t) {
      var n = t.originalEvent,
        o = e(n.target).closest(b);
      if (!Me(t.target) && Oe(n)) {
        s.autoScrolling && t.preventDefault();
        var r = s.scrollOverflowHandler.scrollable(o),
          a = Vt(n);
        Hn = a.y, jn = a.x, o.find(_).length && i.abs(In - jn) > i.abs(Dn - Hn) ? !cn && i.abs(In - jn) > G.outerWidth() / 100 * s.touchSensitivity && (In > jn ? yn.m.right && ce(o) : yn.m.left && ue(o)) : s.autoScrolling && mn && i.abs(Dn - Hn) > G.height() / 100 * s.touchSensitivity && (Dn > Hn ? Ie("down", r) : Hn > Dn && Ie("up", r))
      }
    }

    function Me(t, n) {
      n = n || 0;
      var i = e(t).parent();
      return !!(n < s.normalScrollElementTouchThreshold && i.is(s.normalScrollElements)) || n != s.normalScrollElementTouchThreshold && Me(i, ++n)
    }

    function Oe(e) {
      return void 0 === e.pointerType || "mouse" != e.pointerType
    }

    function _e(e) {
      var t = e.originalEvent;
      if (s.fitToSection && tn.stop(), Oe(t)) {
        var n = Vt(t);
        Dn = n.y, In = n.x
      }
    }

    function qe(e, t) {
      for (var n = 0, o = e.slice(i.max(e.length - t, 1)), r = 0; r < o.length; r++) n += o[r];
      return i.ceil(n / t)
    }

    function Re(n) {
      var o = (new Date).getTime(),
        r = e(g).hasClass(k);
      if (s.autoScrolling && !sn && !r) {
        var a = (n = n || t.event).wheelDelta || -n.deltaY || -n.detail,
          l = i.max(-1, i.min(1, a)),
          c = void 0 !== n.wheelDeltaX || void 0 !== n.deltaX,
          u = i.abs(n.wheelDeltaX) < i.abs(n.wheelDelta) || i.abs(n.deltaX) < i.abs(n.deltaY) || !c;
        gn.length > 149 && gn.shift(), gn.push(i.abs(a)), s.scrollBar && (n.preventDefault ? n.preventDefault() : n.returnValue = !1);
        var d = e(x),
          f = s.scrollOverflowHandler.scrollable(d),
          p = o - Mn;
        return Mn = o, p > 200 && (gn = []), mn && qe(gn, 10) >= qe(gn, 70) && u && (0 > l ? Ie("down", f) : Ie("up", f)), !1
      }
      s.fitToSection && tn.stop()
    }

    function Be(t, n) {
      var i = (void 0 === n ? e(x) : n).find(_),
        o = i.find(j).length;
      if (!(!i.length || cn || 2 > o)) {
        var r = i.find(M),
          a = null;
        if (!(a = "left" === t ? r.prev(j) : r.next(j)).length) {
          if (!s.loopHorizontal) return;
          a = "left" === t ? r.siblings(":last") : r.siblings(":first")
        }
        cn = !0, pt(i, a, t)
      }
    }

    function Fe() {
      e(M).each(function() {
        Ut(e(this), "internal")
      })
    }

    function ze(e) {
      var t = e.position(),
        n = t.top,
        i = t.top > On,
        o = n - pn + e.outerHeight(),
        r = s.bigSectionsDestination;
      return e.outerHeight() > pn ? (!i && !r || "bottom" === r) && (n = o) : (i || hn && e.is(":last-child")) && (n = o), On = n, n
    }

    function Pe(t, n, i) {
      if (void 0 !== t) {
        var o, r, a = {
          element: t,
          callback: n,
          isMovementUp: i,
          dtop: ze(t),
          yMovement: St(t),
          anchorLink: t.data("anchor"),
          sectionIndex: t.index(b),
          activeSlide: t.find(M),
          activeSection: e(x),
          leavingSection: e(x).index(b) + 1,
          localIsResizing: hn
        };
        a.activeSection.is(t) && !hn || s.scrollBar && G.scrollTop() === a.dtop && !t.hasClass(E) || (a.activeSlide.length && (o = a.activeSlide.data("anchor"), r = a.activeSlide.index()), s.autoScrolling && s.continuousVertical && void 0 !== a.isMovementUp && (!a.isMovementUp && "up" == a.yMovement || a.isMovementUp && "down" == a.yMovement) && (a = Xe(a)), (!e.isFunction(s.onLeave) || a.localIsResizing || !1 !== s.onLeave.call(a.activeSection, a.leavingSection, a.sectionIndex + 1, a.yMovement)) && (a.localIsResizing || Qe(a.activeSection), s.scrollOverflowHandler.beforeLeave(), t.addClass(h).siblings().removeClass(h), Je(t), s.scrollOverflowHandler.onLeave(), mn = !1, Ot(r, o, a.anchorLink, a.sectionIndex), We(a), rn = a.anchorLink, Ct(a.anchorLink, a.sectionIndex)))
      }
    }

    function We(t) {
      if (s.css3 && s.autoScrolling && !s.scrollBar) Lt("translate3d(0px, -" + i.round(t.dtop) + "px, 0px)", !0), s.scrollingSpeed ? (clearTimeout(xn), xn = setTimeout(function() {
        Ue(t)
      }, s.scrollingSpeed)) : Ue(t);
      else {
        var n = $e(t);
        e(n.element).animate(n.options, s.scrollingSpeed, s.easing).promise().done(function() {
          s.scrollBar ? setTimeout(function() {
            Ue(t)
          }, 30) : Ue(t)
        })
      }
    }

    function $e(e) {
      var t = {};
      return s.autoScrolling && !s.scrollBar ? (t.options = {
        top: -e.dtop
      }, t.element = a) : (t.options = {
        scrollTop: e.dtop
      }, t.element = "html, body"), t
    }

    function Xe(t) {
      return t.isMovementUp ? e(x).before(t.activeSection.nextAll(b)) : e(x).after(t.activeSection.prevAll(b).get().reverse()), Yt(e(x).position().top), Fe(), t.wrapAroundElements = t.activeSection, t.dtop = t.element.position().top, t.yMovement = St(t.element), t
    }

    function Ve(t) {
      t.wrapAroundElements && t.wrapAroundElements.length && (t.isMovementUp ? e(w).before(t.wrapAroundElements) : e(T).after(t.wrapAroundElements), Yt(e(x).position().top), Fe())
    }

    function Ue(t) {
      Ve(t), e.isFunction(s.afterLoad) && !t.localIsResizing && s.afterLoad.call(t.element, t.anchorLink, t.sectionIndex + 1), s.scrollOverflowHandler.afterLoad(), t.localIsResizing || Ke(t.element), t.element.addClass(m).siblings().removeClass(m), mn = !0, e.isFunction(t.callback) && t.callback.call(this)
    }

    function Ye(e, t) {
      e.attr(t, e.data(t)).removeAttr("data-" + t)
    }

    function Je(t) {
      if (s.lazyLoading) {
        var n;
        Ze(t).find("img[data-src], img[data-srcset], source[data-src], audio[data-src], iframe[data-src]").each(function() {
          n = e(this), e.each(["src", "srcset"], function(e, t) {
            var i = n.attr("data-" + t);
            void 0 !== i && i && Ye(n, t)
          }), n.is("source") && n.closest("video").get(0).load()
        })
      }
    }

    function Ke(t) {
      var n = Ze(t);
      n.find("video, audio").each(function() {
        var t = e(this).get(0);
        t.hasAttribute("data-autoplay") && "function" == typeof t.play && t.play()
      }), n.find('iframe[src*="youtube.com/embed/"]').each(function() {
        var t = e(this).get(0);
        t.hasAttribute("data-autoplay") && Ge(t), t.onload = function() {
          t.hasAttribute("data-autoplay") && Ge(t)
        }
      })
    }

    function Ge(e) {
      e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
    }

    function Qe(t) {
      var n = Ze(t);
      n.find("video, audio").each(function() {
        var t = e(this).get(0);
        t.hasAttribute("data-keepplaying") || "function" != typeof t.pause || t.pause()
      }), n.find('iframe[src*="youtube.com/embed/"]').each(function() {
        var t = e(this).get(0);
        /youtube\.com\/embed\//.test(e(this).attr("src")) && !t.hasAttribute("data-keepplaying") && e(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
      })
    }

    function Ze(t) {
      var n = t.find(M);
      return n.length && (t = e(n)), t
    }

    function et() {
      var e = t.location.hash.replace("#", "").split("/"),
        n = decodeURIComponent(e[0]),
        i = decodeURIComponent(e[1]);
      n && (s.animateAnchor ? Ht(n, i) : se(n, i))
    }

    function tt() {
      if (!An && !s.lockAnchors) {
        var e = t.location.hash.replace("#", "").split("/"),
          n = decodeURIComponent(e[0]),
          i = decodeURIComponent(e[1]),
          o = void 0 === rn,
          r = void 0 === rn && void 0 === i && !cn;
        n.length && (n && n !== rn && !o || r || !cn && an != i) && Ht(n, i)
      }
    }

    function nt(t) {
      clearTimeout(Sn);
      var n = e(":focus");
      if (!n.is("textarea") && !n.is("input") && !n.is("select") && "true" !== n.attr("contentEditable") && "" !== n.attr("contentEditable") && s.keyboardScrolling && s.autoScrolling) {
        var i = t.which,
          o = [40, 38, 32, 33, 34];
        e.inArray(i, o) > -1 && t.preventDefault(), sn = t.ctrlKey, Sn = setTimeout(function() {
          dt(t)
        }, 150)
      }
    }

    function it() {
      e(this).prev().trigger("click")
    }

    function ot(e) {
      vn && (sn = e.ctrlKey)
    }

    function rt(e) {
      2 == e.which && (_n = e.pageY, fn.on("mousemove", ft))
    }

    function at(e) {
      2 == e.which && fn.off("mousemove")
    }

    function st() {
      var t = e(this).closest(b);
      e(this).hasClass(X) ? yn.m.left && ue(t) : yn.m.right && ce(t)
    }

    function lt() {
      vn = !1, sn = !1
    }

    function ct(t) {
      t.preventDefault();
      var n = e(this).parent().index();
      Pe(e(b).eq(n))
    }

    function ut(t) {
      t.preventDefault();
      var n = e(this).closest(b).find(_);
      pt(n, n.find(j).eq(e(this).closest("li").index()))
    }

    function dt(t) {
      var n = t.shiftKey;
      if (mn || !([37, 39].indexOf(t.which) < 0)) switch (t.which) {
        case 38:
        case 33:
          yn.k.up && re();
          break;
        case 32:
          if (n && yn.k.up) {
            re();
            break
          }
          case 40:
          case 34:
            yn.k.down && ae();
            break;
          case 36:
            yn.k.up && le(1);
            break;
          case 35:
            yn.k.down && le(e(b).length);
            break;
          case 37:
            yn.k.left && ue();
            break;
          case 39:
            yn.k.right && ce();
            break;
          default:
            return
      }
    }

    function ft(e) {
      mn && (e.pageY < _n && yn.m.up ? re() : e.pageY > _n && yn.m.down && ae()), _n = e.pageY
    }

    function pt(t, n, i) {
      var o = t.closest(b),
        r = {
          slides: t,
          destiny: n,
          direction: i,
          destinyPos: n.position(),
          slideIndex: n.index(),
          section: o,
          sectionIndex: o.index(b),
          anchorLink: o.data("anchor"),
          slidesNav: o.find(z),
          slideAnchor: qt(n),
          prevSlide: o.find(M),
          prevSlideIndex: o.find(M).index(),
          localIsResizing: hn
        };
      return r.xMovement = Et(r.prevSlideIndex, r.slideIndex), r.localIsResizing || (mn = !1), s.onSlideLeave && !r.localIsResizing && "none" !== r.xMovement && e.isFunction(s.onSlideLeave) && !1 === s.onSlideLeave.call(r.prevSlide, r.anchorLink, r.sectionIndex + 1, r.prevSlideIndex, r.xMovement, r.slideIndex) ? void(cn = !1) : (n.addClass(h).siblings().removeClass(h), r.localIsResizing || (Qe(r.prevSlide), Je(n)), !s.loopHorizontal && s.controlArrows && (o.find(U).toggle(0 !== r.slideIndex), o.find(K).toggle(!n.is(":last-child"))), o.hasClass(h) && !r.localIsResizing && Ot(r.slideIndex, r.slideAnchor, r.anchorLink, r.sectionIndex), void vt(t, r, !0))
    }

    function ht(t) {
      mt(t.slidesNav, t.slideIndex), t.localIsResizing || (e.isFunction(s.afterSlideLoad) && s.afterSlideLoad.call(t.destiny, t.anchorLink, t.sectionIndex + 1, t.slideAnchor, t.slideIndex), mn = !0, Ke(t.destiny)), cn = !1
    }

    function vt(e, t, n) {
      var o = t.destinyPos;
      if (s.css3) {
        var r = "translate3d(-" + i.round(o.left) + "px, 0px, 0px)";
        bt(e.find(R)).css(Jt(r)), wn = setTimeout(function() {
          n && ht(t)
        }, s.scrollingSpeed, s.easing)
      } else e.animate({
        scrollLeft: i.round(o.left)
      }, s.scrollingSpeed, s.easing, function() {
        n && ht(t)
      })
    }

    function mt(e, t) {
      e.find(v).removeClass(h), e.find("li").eq(t).find("a").addClass(h)
    }

    function gt() {
      if (yt(), un) {
        var t = e(n.activeElement);
        if (!t.is("textarea") && !t.is("input") && !t.is("select")) {
          var o = G.height();
          i.abs(o - qn) > 20 * i.max(qn, o) / 100 && (de(!0), qn = o)
        }
      } else clearTimeout(bn), bn = setTimeout(function() {
        de(!0)
      }, 350)
    }

    function yt() {
      var e = s.responsive || s.responsiveWidth,
        t = s.responsiveHeight,
        n = e && G.outerWidth() < e,
        i = t && G.height() < t;
      e && t ? fe(n || i) : e ? fe(n) : t && fe(i)
    }

    function bt(e) {
      var t = "all " + s.scrollingSpeed + "ms " + s.easingcss3;
      return e.removeClass(u), e.css({
        "-webkit-transition": t,
        transition: t
      })
    }

    function xt(e) {
      return e.addClass(u)
    }

    function wt(t, n) {
      s.navigation && (e(A).find(v).removeClass(h), t ? e(A).find('a[href="#' + t + '"]').addClass(h) : e(A).find("li").eq(n).find("a").addClass(h))
    }

    function Tt(t) {
      s.menu && (e(s.menu).find(v).removeClass(h), e(s.menu).find('[data-menuanchor="' + t + '"]').addClass(h))
    }

    function Ct(e, t) {
      Tt(e), wt(e, t)
    }

    function St(t) {
      var n = e(x).index(b),
        i = t.index(b);
      return n == i ? "none" : n > i ? "up" : "down"
    }

    function Et(e, t) {
      return e == t ? "none" : e > t ? "left" : "right"
    }

    function kt(e) {
      if (!e.hasClass("fp-noscroll")) {
        e.css("overflow", "hidden");
        var t, n = s.scrollOverflowHandler,
          i = n.wrapContent(),
          o = e.closest(b),
          r = n.scrollable(e);
        r.length ? t = n.scrollHeight(e) : (t = e.get(0).scrollHeight, s.verticalCentered && (t = e.find(S).get(0).scrollHeight));
        var a = pn - parseInt(o.css("padding-bottom")) - parseInt(o.css("padding-top"));
        t > a ? r.length ? n.update(e, a) : (s.verticalCentered ? e.find(S).wrapInner(i) : e.wrapInner(i), n.create(e, a)) : n.remove(e), e.css("overflow", "")
      }
    }

    function Nt(e) {
      e.hasClass(B) || e.addClass(B).wrapInner('<div class="' + C + '" style="height:' + At(e) + 'px;" />')
    }

    function At(e) {
      var t = pn;
      if (s.paddingTop || s.paddingBottom) {
        var n = e;
        n.hasClass(y) || (n = e.closest(b));
        var i = parseInt(n.css("padding-top")) + parseInt(n.css("padding-bottom"));
        t = pn - i
      }
      return t
    }

    function Lt(e, t) {
      t ? bt(fn) : xt(fn), fn.css(Jt(e)), setTimeout(function() {
        fn.removeClass(u)
      }, 10)
    }

    function Dt(t) {
      if (!t) return [];
      var n = fn.find(b + '[data-anchor="' + t + '"]');
      return n.length || (n = e(b).eq(t - 1)), n
    }

    function It(e, t) {
      var n = t.find(_),
        i = n.find(j + '[data-anchor="' + e + '"]');
      return i.length || (i = n.find(j).eq(e)), i
    }

    function Ht(e, t) {
      var n = Dt(e);
      n.length && (void 0 === t && (t = 0), e === rn || n.hasClass(h) ? jt(n, t) : Pe(n, function() {
        jt(n, t)
      }))
    }

    function jt(e, t) {
      if (void 0 !== t) {
        var n = e.find(_),
          i = It(t, e);
        i.length && pt(n, i)
      }
    }

    function Mt(e, t) {
      e.append('<div class="' + F + '"><ul></ul></div>');
      var n = e.find(z);
      n.addClass(s.slidesNavPosition);
      for (var i = 0; t > i; i++) n.find("ul").append('<li><a href="#"><span></span></a></li>');
      n.css("margin-left", "-" + n.width() / 2 + "px"), n.find("li").first().find("a").addClass(h)
    }

    function Ot(e, t, n, i) {
      var o = "";
      s.anchors.length && !s.lockAnchors && (e ? (void 0 !== n && (o = n), void 0 === t && (t = e), an = t, _t(o + "/" + t)) : void 0 !== e ? (an = t, _t(n)) : _t(n)), Rt()
    }

    function _t(e) {
      if (s.recordHistory) location.hash = e;
      else if (un || dn) t.history.replaceState(o, o, "#" + e);
      else {
        var n = t.location.href.split("#")[0];
        t.location.replace(n + "#" + e)
      }
    }

    function qt(e) {
      var t = e.data("anchor"),
        n = e.index();
      return void 0 === t && (t = n), t
    }

    function Rt() {
      var t = e(x),
        n = t.find(M),
        i = qt(t),
        o = qt(n),
        r = String(i);
      n.length && (r = r + "-" + o), r = r.replace("/", "-").replace("#", "");
      var a = new RegExp("\\b\\s?" + p + "-[^\\s]+\\b", "g");
      nn[0].className = nn[0].className.replace(a, ""), nn.addClass(p + "-" + r)
    }

    function Bt() {
      var e, i = n.createElement("p"),
        r = {
          webkitTransform: "-webkit-transform",
          OTransform: "-o-transform",
          msTransform: "-ms-transform",
          MozTransform: "-moz-transform",
          transform: "transform"
        };
      n.body.insertBefore(i, null);
      for (var a in r) i.style[a] !== o && (i.style[a] = "translate3d(1px,1px,1px)", e = t.getComputedStyle(i).getPropertyValue(r[a]));
      return n.body.removeChild(i), e !== o && e.length > 0 && "none" !== e
    }

    function Ft() {
      n.addEventListener ? (n.removeEventListener("mousewheel", Re, !1), n.removeEventListener("wheel", Re, !1), n.removeEventListener("MozMousePixelScroll", Re, !1)) : n.detachEvent("onmousewheel", Re)
    }

    function zt() {
      var e, i = "";
      t.addEventListener ? e = "addEventListener" : (e = "attachEvent", i = "on");
      var r = "onwheel" in n.createElement("div") ? "wheel" : n.onmousewheel !== o ? "mousewheel" : "DOMMouseScroll";
      "DOMMouseScroll" == r ? n[e](i + "MozMousePixelScroll", Re, !1) : n[e](i + r, Re, !1)
    }

    function Pt() {
      fn.on("mousedown", rt).on("mouseup", at)
    }

    function Wt() {
      fn.off("mousedown", rt).off("mouseup", at)
    }

    function $t() {
      (un || dn) && (s.autoScrolling && nn.off(kn.touchmove).on(kn.touchmove, He), e(a).off(kn.touchstart).on(kn.touchstart, _e).off(kn.touchmove).on(kn.touchmove, je))
    }

    function Xt() {
      (un || dn) && e(a).off(kn.touchstart).off(kn.touchmove)
    }

    function Vt(e) {
      var t = [];
      return t.y = void 0 !== e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, t.x = void 0 !== e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, dn && Oe(e) && s.scrollBar && (t.y = e.touches[0].pageY, t.x = e.touches[0].pageX), t
    }

    function Ut(e, t) {
      Y(0, "internal"), void 0 !== t && (hn = !0), pt(e.closest(_), e), void 0 !== t && (hn = !1), Y(Nn.scrollingSpeed, "internal")
    }

    function Yt(e) {
      var t = i.round(e);
      s.css3 && s.autoScrolling && !s.scrollBar ? Lt("translate3d(0px, -" + t + "px, 0px)", !1) : s.autoScrolling && !s.scrollBar ? fn.css("top", -t) : tn.scrollTop(t)
    }

    function Jt(e) {
      return {
        "-webkit-transform": e,
        "-moz-transform": e,
        "-ms-transform": e,
        transform: e
      }
    }

    function Kt(e, t, n) {
      switch (t) {
        case "up":
          yn[n].up = e;
          break;
        case "down":
          yn[n].down = e;
          break;
        case "left":
          yn[n].left = e;
          break;
        case "right":
          yn[n].right = e;
          break;
        case "all":
          "m" == n ? ie(e) : oe(e)
      }
    }

    function Gt() {
      Yt(0), fn.find("img[data-src], source[data-src], audio[data-src], iframe[data-src]").each(function() {
        Ye(e(this), "src")
      }), fn.find("img[data-srcset]").each(function() {
        Ye(e(this), "srcset")
      }), e(A + ", " + z + ", " + $).remove(), e(b).css({
        height: "",
        "background-color": "",
        padding: ""
      }), e(j).css({
        width: ""
      }), fn.css({
        height: "",
        position: "",
        "-ms-touch-action": "",
        "touch-action": ""
      }), tn.css({
        overflow: "",
        height: ""
      }), e("html").removeClass(f), nn.removeClass(c), e.each(nn.get(0).className.split(/\s+/), function(e, t) {
        0 === t.indexOf(p) && nn.removeClass(t)
      }), e(b + ", " + j).each(function() {
        s.scrollOverflowHandler.remove(e(this)), e(this).removeClass(B + " " + h)
      }), xt(fn), fn.find(S + ", " + R + ", " + _).each(function() {
        e(this).replaceWith(this.childNodes)
      }), fn.css({
        "-webkit-transition": "none",
        transition: "none"
      }), tn.scrollTop(0);
      var t = [y, H, q];
      e.each(t, function(t, n) {
        e("." + n).removeClass(n)
      })
    }

    function Qt(e, t, n) {
      s[e] = t, "internal" !== n && (Nn[e] = t)
    }

    function Zt() {
      var t = ["fadingEffect", "continuousHorizontal", "scrollHorizontally", "interlockedSlides", "resetSliders", "responsiveSlides", "offsetSections", "dragAndMove", "scrollOverflowReset", "parallax"];
      return e("html").hasClass(f) ? void en("error", "Fullpage.js can only be initialized once and you are doing it multiple times!") : (s.continuousVertical && (s.loopTop || s.loopBottom) && (s.continuousVertical = !1, en("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), s.scrollBar && s.scrollOverflow && en("warn", "Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"), !s.continuousVertical || !s.scrollBar && s.autoScrolling || (s.continuousVertical = !1, en("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), e.each(t, function(e, t) {
        s[t] && en("warn", "fullpage.js extensions require jquery.fullpage.extensions.min.js file instead of the usual jquery.fullpage.js. Requested: " + t)
      }), void e.each(s.anchors, function(t, n) {
        var i = Q.find("[name]").filter(function() {
            return e(this).attr("name") && e(this).attr("name").toLowerCase() == n.toLowerCase()
          }),
          o = Q.find("[id]").filter(function() {
            return e(this).attr("id") && e(this).attr("id").toLowerCase() == n.toLowerCase()
          });
        (o.length || i.length) && (en("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."), o.length && en("error", '"' + n + '" is is being used by another element `id` property'), i.length && en("error", '"' + n + '" is is being used by another element `name` property'))
      }))
    }

    function en(e, t) {
      console && console[e] && console[e]("fullPage: " + t)
    }
    if (e("html").hasClass(f)) Zt();
    else {
      var tn = e("html, body"),
        nn = e("body"),
        on = e.fn.fullpage;
      s = e.extend({
        menu: !1,
        anchors: [],
        lockAnchors: !1,
        navigation: !1,
        navigationPosition: "right",
        navigationTooltips: [],
        showActiveTooltip: !1,
        slidesNavigation: !1,
        slidesNavPosition: "bottom",
        scrollBar: !1,
        hybrid: !1,
        css3: !0,
        scrollingSpeed: 700,
        autoScrolling: !0,
        fitToSection: !0,
        fitToSectionDelay: 1e3,
        easing: "easeInOutCubic",
        easingcss3: "ease",
        loopBottom: !1,
        loopTop: !1,
        loopHorizontal: !0,
        continuousVertical: !1,
        continuousHorizontal: !1,
        scrollHorizontally: !1,
        interlockedSlides: !1,
        dragAndMove: !1,
        offsetSections: !1,
        resetSliders: !1,
        fadingEffect: !1,
        normalScrollElements: null,
        scrollOverflow: !1,
        scrollOverflowReset: !1,
        scrollOverflowHandler: ee,
        scrollOverflowOptions: null,
        touchSensitivity: 5,
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: null,
        keyboardScrolling: !0,
        animateAnchor: !0,
        recordHistory: !0,
        controlArrows: !0,
        controlArrowColor: "#fff",
        verticalCentered: !0,
        sectionsColor: [],
        paddingTop: 0,
        paddingBottom: 0,
        fixedElements: null,
        responsive: 0,
        responsiveWidth: 0,
        responsiveHeight: 0,
        responsiveSlides: !1,
        parallax: !1,
        parallaxOptions: {
          type: "reveal",
          percentage: 62,
          property: "translate"
        },
        sectionSelector: ".section",
        slideSelector: ".slide",
        afterLoad: null,
        onLeave: null,
        afterRender: null,
        afterResize: null,
        afterReBuild: null,
        afterSlideLoad: null,
        onSlideLeave: null,
        afterResponsive: null,
        lazyLoading: !0
      }, s);
      var rn, an, sn, ln, cn = !1,
        un = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
        dn = "ontouchstart" in t || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
        fn = e(this),
        pn = G.height(),
        hn = !1,
        vn = !0,
        mn = !0,
        gn = [],
        yn = {};
      yn.m = {
        up: !0,
        down: !0,
        left: !0,
        right: !0
      }, yn.k = e.extend(!0, {}, yn.m);
      var bn, xn, wn, Tn, Cn, Sn, En = t.PointerEvent ? {
          down: "pointerdown",
          move: "pointermove"
        } : {
          down: "MSPointerDown",
          move: "MSPointerMove"
        },
        kn = {
          touchmove: "ontouchmove" in t ? "touchmove" : En.move,
          touchstart: "ontouchstart" in t ? "touchstart" : En.down
        },
        Nn = e.extend(!0, {}, s);
      Zt(), Z.click = dn, Z = e.extend(Z, s.scrollOverflowOptions), e.extend(e.easing, {
        easeInOutCubic: function(e, t, n, i, o) {
          return (t /= o / 2) < 1 ? i / 2 * t * t * t + n : i / 2 * ((t -= 2) * t * t + 2) + n
        }
      }), e(this).length && (on.setAutoScrolling = l, on.setRecordHistory = W, on.setScrollingSpeed = Y, on.setFitToSection = te, on.setLockAnchors = function(e) {
        s.lockAnchors = e
      }, on.setMouseWheelScrolling = ne, on.setAllowScrolling = ie, on.setKeyboardScrolling = oe, on.moveSectionUp = re, on.moveSectionDown = ae, on.silentMoveTo = se, on.moveTo = le, on.moveSlideRight = ce, on.moveSlideLeft = ue, on.fitToSection = Ae, on.reBuild = de, on.setResponsive = fe, on.destroy = function(t) {
        l(!1, "internal"), ie(!1), oe(!1), fn.addClass(d), clearTimeout(wn), clearTimeout(xn), clearTimeout(bn), clearTimeout(Tn), clearTimeout(Cn), G.off("scroll", Ne).off("hashchange", tt).off("resize", gt), Q.off("click touchstart", A + " a").off("mouseenter", A + " li").off("mouseleave", A + " li").off("click touchstart", P).off("mouseover", s.normalScrollElements).off("mouseout", s.normalScrollElements), e(b).off("click touchstart", $), clearTimeout(wn), clearTimeout(xn), t && Gt()
      }, s.css3 && (s.css3 = Bt()), s.scrollBar = s.scrollBar || s.hybrid, pe(), he(), ie(!0), l(s.autoScrolling, "internal"), yt(), Rt(), "complete" === n.readyState && et(), G.on("load", et), G.on("scroll", Ne).on("hashchange", tt).blur(lt).resize(gt), Q.keydown(nt).keyup(ot).on("click touchstart", A + " a", ct).on("click touchstart", P, ut).on("click", D, it), e(b).on("click touchstart", $, st), s.normalScrollElements && (Q.on("mouseenter", s.normalScrollElements, function() {
        ne(!1)
      }), Q.on("mouseleave", s.normalScrollElements, function() {
        ne(!0)
      })));
      var An = !1,
        Ln = 0,
        Dn = 0,
        In = 0,
        Hn = 0,
        jn = 0,
        Mn = (new Date).getTime(),
        On = 0,
        _n = 0,
        qn = pn
    }
  }, "undefined" != typeof IScroll && (IScroll.prototype.wheelOn = function() {
    this.wrapper.addEventListener("wheel", this), this.wrapper.addEventListener("mousewheel", this), this.wrapper.addEventListener("DOMMouseScroll", this)
  }, IScroll.prototype.wheelOff = function() {
    this.wrapper.removeEventListener("wheel", this), this.wrapper.removeEventListener("mousewheel", this), this.wrapper.removeEventListener("DOMMouseScroll", this)
  });
  var ee = {
    refreshId: null,
    iScrollInstances: [],
    toggleWheel: function(t) {
      e(x).find(l).each(function() {
        var n = e(this).data("iscrollInstance");
        void 0 !== n && n && (t ? n.wheelOn() : n.wheelOff())
      })
    },
    onLeave: function() {
      ee.toggleWheel(!1)
    },
    beforeLeave: function() {
      ee.onLeave()
    },
    afterLoad: function() {
      ee.toggleWheel(!0)
    },
    create: function(t, n) {
      var i = t.find(l);
      i.height(n), i.each(function() {
        var t = e(this),
          n = t.data("iscrollInstance");
        n && e.each(ee.iScrollInstances, function() {
          e(this).destroy()
        }), n = new IScroll(t.get(0), Z), ee.iScrollInstances.push(n), n.wheelOff(), t.data("iscrollInstance", n)
      })
    },
    isScrolled: function(e, t) {
      var n = t.data("iscrollInstance");
      return !n || ("top" === e ? n.y >= 0 && !t.scrollTop() : "bottom" === e ? 0 - n.y + t.scrollTop() + 1 + t.innerHeight() >= t[0].scrollHeight : void 0)
    },
    scrollable: function(e) {
      return e.find(_).length ? e.find(M).find(l) : e.find(l)
    },
    scrollHeight: function(e) {
      return e.find(l).children().first().get(0).scrollHeight
    },
    remove: function(e) {
      var t = e.find(l);
      t.length && (t.data("iscrollInstance").destroy(), t.data("iscrollInstance", null)), e.find(l).children().first().children().first().unwrap().unwrap()
    },
    update: function(t, n) {
      clearTimeout(ee.refreshId), ee.refreshId = setTimeout(function() {
        e.each(ee.iScrollInstances, function() {
          e(this).get(0).refresh()
        })
      }, 150), t.find(l).css("height", n + "px").parent().css("height", n + "px")
    },
    wrapContent: function() {
      return '<div class="' + s + '"><div class="fp-scroller"></div></div>'
    }
  }
}), telescopeInit();
