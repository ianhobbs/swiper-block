function me(e) {
  return e !== null && typeof e == "object" && "constructor" in e && e.constructor === Object;
}
function pe(e = {}, i = {}) {
  const t = ["__proto__", "constructor", "prototype"];
  Object.keys(i).filter((s) => t.indexOf(s) < 0).forEach((s) => {
    typeof e[s] > "u" ? e[s] = i[s] : me(i[s]) && me(e[s]) && Object.keys(i[s]).length > 0 && pe(e[s], i[s]);
  });
}
const Te = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function F() {
  const e = typeof document < "u" ? document : {};
  return pe(e, Te), e;
}
const De = {
  document: Te,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: function() {
    return this;
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(e) {
    return typeof setTimeout > "u" ? (e(), null) : setTimeout(e, 0);
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > "u" || clearTimeout(e);
  }
};
function V() {
  const e = typeof window < "u" ? window : {};
  return pe(e, De), e;
}
function Ge(e = "") {
  return e.trim().split(" ").filter((i) => !!i.trim());
}
function $e(e) {
  const i = e;
  Object.keys(i).forEach((t) => {
    try {
      i[t] = null;
    } catch {
    }
    try {
      delete i[t];
    } catch {
    }
  });
}
function Ee(e, i = 0) {
  return setTimeout(e, i);
}
function Q() {
  return Date.now();
}
function Be(e) {
  const i = V();
  let t;
  return i.getComputedStyle && (t = i.getComputedStyle(e, null)), !t && e.currentStyle && (t = e.currentStyle), t || (t = e.style), t;
}
function Ve(e, i = "x") {
  const t = V();
  let s, a, n;
  const l = Be(e);
  return t.WebKitCSSMatrix ? (a = l.transform || l.webkitTransform, a.split(",").length > 6 && (a = a.split(", ").map((o) => o.replace(",", ".")).join(", ")), n = new t.WebKitCSSMatrix(a === "none" ? "" : a)) : (n = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), s = n.toString().split(",")), i === "x" && (t.WebKitCSSMatrix ? a = n.m41 : s.length === 16 ? a = parseFloat(s[12]) : a = parseFloat(s[4])), i === "y" && (t.WebKitCSSMatrix ? a = n.m42 : s.length === 16 ? a = parseFloat(s[13]) : a = parseFloat(s[5])), a || 0;
}
function Z(e) {
  return typeof e == "object" && e !== null && e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object";
}
function Fe(e) {
  return typeof window < "u" && typeof window.HTMLElement < "u" ? e instanceof HTMLElement : e && (e.nodeType === 1 || e.nodeType === 11);
}
function _(...e) {
  const i = Object(e[0]);
  for (let t = 1; t < e.length; t += 1) {
    const s = e[t];
    if (s != null && !Fe(s)) {
      const a = Object.keys(Object(s)).filter((n) => n !== "__proto__" && n !== "constructor" && n !== "prototype");
      for (let n = 0, l = a.length; n < l; n += 1) {
        const o = a[n], r = Object.getOwnPropertyDescriptor(s, o);
        r !== void 0 && r.enumerable && (Z(i[o]) && Z(s[o]) ? s[o].__swiper__ ? i[o] = s[o] : _(i[o], s[o]) : !Z(i[o]) && Z(s[o]) ? (i[o] = {}, s[o].__swiper__ ? i[o] = s[o] : _(i[o], s[o])) : i[o] = s[o]);
      }
    }
  }
  return i;
}
function X(e, i, t) {
  e.style.setProperty(i, t);
}
function xe({
  swiper: e,
  targetPosition: i,
  side: t
}) {
  const s = V(), a = -e.translate;
  let n = null, l;
  const o = e.params.speed;
  e.wrapperEl.style.scrollSnapType = "none", s.cancelAnimationFrame(e.cssModeFrameID);
  const r = i > a ? "next" : "prev", d = (u, y) => r === "next" && u >= y || r === "prev" && u <= y, h = () => {
    l = (/* @__PURE__ */ new Date()).getTime(), n === null && (n = l);
    const u = Math.max(Math.min((l - n) / o, 1), 0), y = 0.5 - Math.cos(u * Math.PI) / 2;
    let c = a + y * (i - a);
    if (d(c, i) && (c = i), e.wrapperEl.scrollTo({
      [t]: c
    }), d(c, i)) {
      e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
          [t]: c
        });
      }), s.cancelAnimationFrame(e.cssModeFrameID);
      return;
    }
    e.cssModeFrameID = s.requestAnimationFrame(h);
  };
  h();
}
function se(e) {
  return e.querySelector(".swiper-slide-transform") || e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform") || e;
}
function H(e, i = "") {
  const t = V(), s = [...e.children];
  return t.HTMLSlotElement && e instanceof HTMLSlotElement && s.push(...e.assignedElements()), i ? s.filter((a) => a.matches(i)) : s;
}
function _e(e, i) {
  const t = [i];
  for (; t.length > 0; ) {
    const s = t.shift();
    if (e === s)
      return !0;
    t.push(...s.children, ...s.shadowRoot ? s.shadowRoot.children : [], ...s.assignedElements ? s.assignedElements() : []);
  }
}
function Ne(e, i) {
  const t = V();
  let s = i.contains(e);
  return !s && t.HTMLSlotElement && i instanceof HTMLSlotElement && (s = [...i.assignedElements()].includes(e), s || (s = _e(e, i))), s;
}
function ee(e) {
  try {
    console.warn(e);
    return;
  } catch {
  }
}
function Y(e, i = []) {
  const t = document.createElement(e);
  return t.classList.add(...Array.isArray(i) ? i : Ge(i)), t;
}
function He(e) {
  const i = V(), t = F(), s = e.getBoundingClientRect(), a = t.body, n = e.clientTop || a.clientTop || 0, l = e.clientLeft || a.clientLeft || 0, o = e === i ? i.scrollY : e.scrollTop, r = e === i ? i.scrollX : e.scrollLeft;
  return {
    top: s.top + o - n,
    left: s.left + r - l
  };
}
function Re(e, i) {
  const t = [];
  for (; e.previousElementSibling; ) {
    const s = e.previousElementSibling;
    i ? s.matches(i) && t.push(s) : t.push(s), e = s;
  }
  return t;
}
function qe(e, i) {
  const t = [];
  for (; e.nextElementSibling; ) {
    const s = e.nextElementSibling;
    i ? s.matches(i) && t.push(s) : t.push(s), e = s;
  }
  return t;
}
function j(e, i) {
  return V().getComputedStyle(e, null).getPropertyValue(i);
}
function U(e) {
  let i = e, t;
  if (i) {
    for (t = 0; (i = i.previousSibling) !== null; )
      i.nodeType === 1 && (t += 1);
    return t;
  }
}
function te(e, i) {
  const t = [];
  let s = e.parentElement;
  for (; s; )
    i ? s.matches(i) && t.push(s) : t.push(s), s = s.parentElement;
  return t;
}
function We(e, i) {
  function t(s) {
    s.target === e && (i.call(e, s), e.removeEventListener("transitionend", t));
  }
  i && e.addEventListener("transitionend", t);
}
function fe(e, i, t) {
  const s = V();
  return e[i === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(s.getComputedStyle(e, null).getPropertyValue(i === "width" ? "margin-right" : "margin-top")) + parseFloat(s.getComputedStyle(e, null).getPropertyValue(i === "width" ? "margin-left" : "margin-bottom"));
}
function $(e) {
  return (Array.isArray(e) ? e : [e]).filter((i) => !!i);
}
function je(e) {
  return (i) => Math.abs(i) > 0 && e.browser && e.browser.need3dFix && Math.abs(i) % 90 === 0 ? i + 1e-3 : i;
}
function ie(e, i = "") {
  typeof trustedTypes < "u" ? e.innerHTML = trustedTypes.createPolicy("html", {
    createHTML: (t) => t
  }).createHTML(i) : e.innerHTML = i;
}
let ne;
function Xe() {
  const e = V(), i = F();
  return {
    smoothScroll: i.documentElement && i.documentElement.style && "scrollBehavior" in i.documentElement.style,
    touch: !!("ontouchstart" in e || e.DocumentTouch && i instanceof e.DocumentTouch)
  };
}
function Ce() {
  return ne || (ne = Xe()), ne;
}
let ae;
function Ye({
  userAgent: e
} = {}) {
  const i = Ce(), t = V(), s = t.navigator.platform, a = e || t.navigator.userAgent, n = {
    ios: !1,
    android: !1
  }, l = t.screen.width, o = t.screen.height, r = a.match(/(Android);?[\s\/]+([\d.]+)?/);
  let d = a.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
  const h = a.match(/(iPod)(.*OS\s([\d_]+))?/), u = !d && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/), y = s === "Win32";
  let c = s === "MacIntel";
  const m = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  return !d && c && i.touch && m.indexOf(`${l}x${o}`) >= 0 && (d = a.match(/(Version)\/([\d.]+)/), d || (d = [0, 1, "13_0_0"]), c = !1), r && !y && (n.os = "android", n.android = !0), (d || u || h) && (n.os = "ios", n.ios = !0), n;
}
function Me(e = {}) {
  return ae || (ae = Ye(e)), ae;
}
let re;
function Ue() {
  const e = V(), i = Me();
  let t = !1;
  function s() {
    const o = e.navigator.userAgent.toLowerCase();
    return o.indexOf("safari") >= 0 && o.indexOf("chrome") < 0 && o.indexOf("android") < 0;
  }
  if (s()) {
    const o = String(e.navigator.userAgent);
    if (o.includes("Version/")) {
      const [r, d] = o.split("Version/")[1].split(" ")[0].split(".").map((h) => Number(h));
      t = r < 16 || r === 16 && d < 2;
    }
  }
  const a = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent), n = s(), l = n || a && i.ios;
  return {
    isSafari: t || n,
    needPerspectiveFix: t,
    need3dFix: l,
    isWebView: a
  };
}
function we() {
  return re || (re = Ue()), re;
}
function Ke({
  swiper: e,
  on: i,
  emit: t
}) {
  const s = V();
  let a = null, n = null;
  const l = () => {
    !e || e.destroyed || !e.initialized || (t("beforeResize"), t("resize"));
  }, o = () => {
    !e || e.destroyed || !e.initialized || (a = new ResizeObserver((h) => {
      n = s.requestAnimationFrame(() => {
        const {
          width: u,
          height: y
        } = e;
        let c = u, m = y;
        h.forEach(({
          contentBoxSize: b,
          contentRect: E,
          target: f
        }) => {
          f && f !== e.el || (c = E ? E.width : (b[0] || b).inlineSize, m = E ? E.height : (b[0] || b).blockSize);
        }), (c !== u || m !== y) && l();
      });
    }), a.observe(e.el));
  }, r = () => {
    n && s.cancelAnimationFrame(n), a && a.unobserve && e.el && (a.unobserve(e.el), a = null);
  }, d = () => {
    !e || e.destroyed || !e.initialized || t("orientationchange");
  };
  i("init", () => {
    if (e.params.resizeObserver && typeof s.ResizeObserver < "u") {
      o();
      return;
    }
    s.addEventListener("resize", l), s.addEventListener("orientationchange", d);
  }), i("destroy", () => {
    r(), s.removeEventListener("resize", l), s.removeEventListener("orientationchange", d);
  });
}
function Ze({
  swiper: e,
  extendParams: i,
  on: t,
  emit: s
}) {
  const a = [], n = V(), l = (d, h = {}) => {
    const u = n.MutationObserver || n.WebkitMutationObserver, y = new u((c) => {
      if (e.__preventObserver__) return;
      if (c.length === 1) {
        s("observerUpdate", c[0]);
        return;
      }
      const m = function() {
        s("observerUpdate", c[0]);
      };
      n.requestAnimationFrame ? n.requestAnimationFrame(m) : n.setTimeout(m, 0);
    });
    y.observe(d, {
      attributes: typeof h.attributes > "u" ? !0 : h.attributes,
      childList: e.isElement || (typeof h.childList > "u" ? !0 : h).childList,
      characterData: typeof h.characterData > "u" ? !0 : h.characterData
    }), a.push(y);
  }, o = () => {
    if (e.params.observer) {
      if (e.params.observeParents) {
        const d = te(e.hostEl);
        for (let h = 0; h < d.length; h += 1)
          l(d[h]);
      }
      l(e.hostEl, {
        childList: e.params.observeSlideChildren
      }), l(e.wrapperEl, {
        attributes: !1
      });
    }
  }, r = () => {
    a.forEach((d) => {
      d.disconnect();
    }), a.splice(0, a.length);
  };
  i({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), t("init", o), t("destroy", r);
}
var Je = {
  on(e, i, t) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof i != "function") return s;
    const a = t ? "unshift" : "push";
    return e.split(" ").forEach((n) => {
      s.eventsListeners[n] || (s.eventsListeners[n] = []), s.eventsListeners[n][a](i);
    }), s;
  },
  once(e, i, t) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof i != "function") return s;
    function a(...n) {
      s.off(e, a), a.__emitterProxy && delete a.__emitterProxy, i.apply(s, n);
    }
    return a.__emitterProxy = i, s.on(e, a, t);
  },
  onAny(e, i) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || typeof e != "function") return t;
    const s = i ? "unshift" : "push";
    return t.eventsAnyListeners.indexOf(e) < 0 && t.eventsAnyListeners[s](e), t;
  },
  offAny(e) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || !i.eventsAnyListeners) return i;
    const t = i.eventsAnyListeners.indexOf(e);
    return t >= 0 && i.eventsAnyListeners.splice(t, 1), i;
  },
  off(e, i) {
    const t = this;
    return !t.eventsListeners || t.destroyed || !t.eventsListeners || e.split(" ").forEach((s) => {
      typeof i > "u" ? t.eventsListeners[s] = [] : t.eventsListeners[s] && t.eventsListeners[s].forEach((a, n) => {
        (a === i || a.__emitterProxy && a.__emitterProxy === i) && t.eventsListeners[s].splice(n, 1);
      });
    }), t;
  },
  emit(...e) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || !i.eventsListeners) return i;
    let t, s, a;
    return typeof e[0] == "string" || Array.isArray(e[0]) ? (t = e[0], s = e.slice(1, e.length), a = i) : (t = e[0].events, s = e[0].data, a = e[0].context || i), s.unshift(a), (Array.isArray(t) ? t : t.split(" ")).forEach((l) => {
      i.eventsAnyListeners && i.eventsAnyListeners.length && i.eventsAnyListeners.forEach((o) => {
        o.apply(a, [l, ...s]);
      }), i.eventsListeners && i.eventsListeners[l] && i.eventsListeners[l].forEach((o) => {
        o.apply(a, s);
      });
    }), i;
  }
};
function Qe() {
  const e = this;
  let i, t;
  const s = e.el;
  typeof e.params.width < "u" && e.params.width !== null ? i = e.params.width : i = s.clientWidth, typeof e.params.height < "u" && e.params.height !== null ? t = e.params.height : t = s.clientHeight, !(i === 0 && e.isHorizontal() || t === 0 && e.isVertical()) && (i = i - parseInt(j(s, "padding-left") || 0, 10) - parseInt(j(s, "padding-right") || 0, 10), t = t - parseInt(j(s, "padding-top") || 0, 10) - parseInt(j(s, "padding-bottom") || 0, 10), Number.isNaN(i) && (i = 0), Number.isNaN(t) && (t = 0), Object.assign(e, {
    width: i,
    height: t,
    size: e.isHorizontal() ? i : t
  }));
}
function et() {
  const e = this;
  function i(w, C) {
    return parseFloat(w.getPropertyValue(e.getDirectionLabel(C)) || 0);
  }
  const t = e.params, {
    wrapperEl: s,
    slidesEl: a,
    rtlTranslate: n,
    wrongRTL: l
  } = e, o = e.virtual && t.virtual.enabled, r = o ? e.virtual.slides.length : e.slides.length, d = H(a, `.${e.params.slideClass}, swiper-slide`), h = o ? e.virtual.slides.length : d.length;
  let u = [];
  const y = [], c = [];
  let m = t.slidesOffsetBefore;
  typeof m == "function" && (m = t.slidesOffsetBefore.call(e));
  let b = t.slidesOffsetAfter;
  typeof b == "function" && (b = t.slidesOffsetAfter.call(e));
  const E = e.snapGrid.length, f = e.slidesGrid.length, p = e.size - m - b;
  let g = t.spaceBetween, S = -m, x = 0, k = 0;
  if (typeof p > "u")
    return;
  typeof g == "string" && g.indexOf("%") >= 0 ? g = parseFloat(g.replace("%", "")) / 100 * p : typeof g == "string" && (g = parseFloat(g)), e.virtualSize = -g - m - b, d.forEach((w) => {
    n ? w.style.marginLeft = "" : w.style.marginRight = "", w.style.marginBottom = "", w.style.marginTop = "";
  }), t.centeredSlides && t.cssMode && (X(s, "--swiper-centered-offset-before", ""), X(s, "--swiper-centered-offset-after", "")), t.cssMode && (X(s, "--swiper-slides-offset-before", `${m}px`), X(s, "--swiper-slides-offset-after", `${b}px`));
  const z = t.grid && t.grid.rows > 1 && e.grid;
  z ? e.grid.initSlides(d) : e.grid && e.grid.unsetSlides();
  let T;
  const D = t.slidesPerView === "auto" && t.breakpoints && Object.keys(t.breakpoints).filter((w) => typeof t.breakpoints[w].slidesPerView < "u").length > 0;
  for (let w = 0; w < h; w += 1) {
    T = 0;
    const C = d[w];
    if (!(C && (z && e.grid.updateSlide(w, C, d), j(C, "display") === "none"))) {
      if (o && t.slidesPerView === "auto")
        t.virtual.slidesPerViewAutoSlideSize && (T = t.virtual.slidesPerViewAutoSlideSize), T && C && (t.roundLengths && (T = Math.floor(T)), C.style[e.getDirectionLabel("width")] = `${T}px`);
      else if (t.slidesPerView === "auto") {
        D && (C.style[e.getDirectionLabel("width")] = "");
        const I = getComputedStyle(C), O = C.style.transform, A = C.style.webkitTransform;
        if (O && (C.style.transform = "none"), A && (C.style.webkitTransform = "none"), t.roundLengths)
          T = e.isHorizontal() ? fe(C, "width") : fe(C, "height");
        else {
          const v = i(I, "width"), M = i(I, "padding-left"), L = i(I, "padding-right"), P = i(I, "margin-left"), G = i(I, "margin-right"), B = I.getPropertyValue("box-sizing");
          if (B && B === "border-box")
            T = v + P + G;
          else {
            const {
              clientWidth: R,
              offsetWidth: q
            } = C;
            T = v + M + L + P + G + (q - R);
          }
        }
        O && (C.style.transform = O), A && (C.style.webkitTransform = A), t.roundLengths && (T = Math.floor(T));
      } else
        T = (p - (t.slidesPerView - 1) * g) / t.slidesPerView, t.roundLengths && (T = Math.floor(T)), C && (C.style[e.getDirectionLabel("width")] = `${T}px`);
      C && (C.swiperSlideSize = T), c.push(T), t.centeredSlides ? (S = S + T / 2 + x / 2 + g, x === 0 && w !== 0 && (S = S - p / 2 - g), w === 0 && (S = S - p / 2 - g), Math.abs(S) < 1 / 1e3 && (S = 0), t.roundLengths && (S = Math.floor(S)), k % t.slidesPerGroup === 0 && u.push(S), y.push(S)) : (t.roundLengths && (S = Math.floor(S)), (k - Math.min(e.params.slidesPerGroupSkip, k)) % e.params.slidesPerGroup === 0 && u.push(S), y.push(S), S = S + T + g), e.virtualSize += T + g, x = T, k += 1;
    }
  }
  if (e.virtualSize = Math.max(e.virtualSize, p) + b, n && l && (t.effect === "slide" || t.effect === "coverflow") && (s.style.width = `${e.virtualSize + g}px`), t.setWrapperSize && (s.style[e.getDirectionLabel("width")] = `${e.virtualSize + g}px`), z && e.grid.updateWrapperSize(T, u), !t.centeredSlides) {
    const w = t.slidesPerView !== "auto" && t.slidesPerView % 1 !== 0, C = t.snapToSlideEdge && !t.loop && (t.slidesPerView === "auto" || w);
    let I = u.length;
    if (C) {
      let A;
      if (t.slidesPerView === "auto") {
        A = 1;
        let v = 0;
        for (let M = c.length - 1; M >= 0 && (v += c[M] + (M < c.length - 1 ? g : 0), v <= p); M -= 1)
          A = c.length - M;
      } else
        A = Math.floor(t.slidesPerView);
      I = Math.max(h - A, 0);
    }
    const O = [];
    for (let A = 0; A < u.length; A += 1) {
      let v = u[A];
      t.roundLengths && (v = Math.floor(v)), C ? A <= I && O.push(v) : u[A] <= e.virtualSize - p && O.push(v);
    }
    u = O, Math.floor(e.virtualSize - p) - Math.floor(u[u.length - 1]) > 1 && (C || u.push(e.virtualSize - p));
  }
  if (o && t.loop) {
    const w = c[0] + g;
    if (t.slidesPerGroup > 1) {
      const C = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / t.slidesPerGroup), I = w * t.slidesPerGroup;
      for (let O = 0; O < C; O += 1)
        u.push(u[u.length - 1] + I);
    }
    for (let C = 0; C < e.virtual.slidesBefore + e.virtual.slidesAfter; C += 1)
      t.slidesPerGroup === 1 && u.push(u[u.length - 1] + w), y.push(y[y.length - 1] + w), e.virtualSize += w;
  }
  if (u.length === 0 && (u = [0]), g !== 0) {
    const w = e.isHorizontal() && n ? "marginLeft" : e.getDirectionLabel("marginRight");
    d.filter((C, I) => !t.cssMode || t.loop ? !0 : I !== d.length - 1).forEach((C) => {
      C.style[w] = `${g}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let w = 0;
    c.forEach((I) => {
      w += I + (g || 0);
    }), w -= g;
    const C = w > p ? w - p : 0;
    u = u.map((I) => I <= 0 ? -m : I > C ? C + b : I);
  }
  if (t.centerInsufficientSlides) {
    let w = 0;
    if (c.forEach((C) => {
      w += C + (g || 0);
    }), w -= g, w < p) {
      const C = (p - w) / 2;
      u.forEach((I, O) => {
        u[O] = I - C;
      }), y.forEach((I, O) => {
        y[O] = I + C;
      });
    }
  }
  if (Object.assign(e, {
    slides: d,
    snapGrid: u,
    slidesGrid: y,
    slidesSizesGrid: c
  }), t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
    X(s, "--swiper-centered-offset-before", `${-u[0]}px`), X(s, "--swiper-centered-offset-after", `${e.size / 2 - c[c.length - 1] / 2}px`);
    const w = -e.snapGrid[0], C = -e.slidesGrid[0];
    e.snapGrid = e.snapGrid.map((I) => I + w), e.slidesGrid = e.slidesGrid.map((I) => I + C);
  }
  if (h !== r && e.emit("slidesLengthChange"), u.length !== E && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), y.length !== f && e.emit("slidesGridLengthChange"), t.watchSlidesProgress && e.updateSlidesOffset(), e.emit("slidesUpdated"), !o && !t.cssMode && (t.effect === "slide" || t.effect === "fade")) {
    const w = `${t.containerModifierClass}backface-hidden`, C = e.el.classList.contains(w);
    h <= t.maxBackfaceHiddenSlides ? C || e.el.classList.add(w) : C && e.el.classList.remove(w);
  }
}
function tt(e) {
  const i = this, t = [], s = i.virtual && i.params.virtual.enabled;
  let a = 0, n;
  typeof e == "number" ? i.setTransition(e) : e === !0 && i.setTransition(i.params.speed);
  const l = (o) => s ? i.slides[i.getSlideIndexByData(o)] : i.slides[o];
  if (i.params.slidesPerView !== "auto" && i.params.slidesPerView > 1)
    if (i.params.centeredSlides)
      (i.visibleSlides || []).forEach((o) => {
        t.push(o);
      });
    else
      for (n = 0; n < Math.ceil(i.params.slidesPerView); n += 1) {
        const o = i.activeIndex + n;
        if (o > i.slides.length && !s) break;
        t.push(l(o));
      }
  else
    t.push(l(i.activeIndex));
  for (n = 0; n < t.length; n += 1)
    if (typeof t[n] < "u") {
      const o = t[n].offsetHeight;
      a = o > a ? o : a;
    }
  (a || a === 0) && (i.wrapperEl.style.height = `${a}px`);
}
function it() {
  const e = this, i = e.slides, t = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
  for (let s = 0; s < i.length; s += 1)
    i[s].swiperSlideOffset = (e.isHorizontal() ? i[s].offsetLeft : i[s].offsetTop) - t - e.cssOverflowAdjustment();
}
const he = (e, i, t) => {
  i && !e.classList.contains(t) ? e.classList.add(t) : !i && e.classList.contains(t) && e.classList.remove(t);
};
function st(e = this && this.translate || 0) {
  const i = this, t = i.params, {
    slides: s,
    rtlTranslate: a,
    snapGrid: n
  } = i;
  if (s.length === 0) return;
  typeof s[0].swiperSlideOffset > "u" && i.updateSlidesOffset();
  let l = -e;
  a && (l = e), i.visibleSlidesIndexes = [], i.visibleSlides = [];
  let o = t.spaceBetween;
  typeof o == "string" && o.indexOf("%") >= 0 ? o = parseFloat(o.replace("%", "")) / 100 * i.size : typeof o == "string" && (o = parseFloat(o));
  for (let r = 0; r < s.length; r += 1) {
    const d = s[r];
    let h = d.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (h -= s[0].swiperSlideOffset);
    const u = (l + (t.centeredSlides ? i.minTranslate() : 0) - h) / (d.swiperSlideSize + o), y = (l - n[0] + (t.centeredSlides ? i.minTranslate() : 0) - h) / (d.swiperSlideSize + o), c = -(l - h), m = c + i.slidesSizesGrid[r], b = c >= 0 && c <= i.size - i.slidesSizesGrid[r], E = c >= 0 && c < i.size - 1 || m > 1 && m <= i.size || c <= 0 && m >= i.size;
    E && (i.visibleSlides.push(d), i.visibleSlidesIndexes.push(r)), he(d, E, t.slideVisibleClass), he(d, b, t.slideFullyVisibleClass), d.progress = a ? -u : u, d.originalProgress = a ? -y : y;
  }
}
function nt(e) {
  const i = this;
  if (typeof e > "u") {
    const h = i.rtlTranslate ? -1 : 1;
    e = i && i.translate && i.translate * h || 0;
  }
  const t = i.params, s = i.maxTranslate() - i.minTranslate();
  let {
    progress: a,
    isBeginning: n,
    isEnd: l,
    progressLoop: o
  } = i;
  const r = n, d = l;
  if (s === 0)
    a = 0, n = !0, l = !0;
  else {
    a = (e - i.minTranslate()) / s;
    const h = Math.abs(e - i.minTranslate()) < 1, u = Math.abs(e - i.maxTranslate()) < 1;
    n = h || a <= 0, l = u || a >= 1, h && (a = 0), u && (a = 1);
  }
  if (t.loop) {
    const h = i.getSlideIndexByData(0), u = i.getSlideIndexByData(i.slides.length - 1), y = i.slidesGrid[h], c = i.slidesGrid[u], m = i.slidesGrid[i.slidesGrid.length - 1], b = Math.abs(e);
    b >= y ? o = (b - y) / m : o = (b + m - c) / m, o > 1 && (o -= 1);
  }
  Object.assign(i, {
    progress: a,
    progressLoop: o,
    isBeginning: n,
    isEnd: l
  }), (t.watchSlidesProgress || t.centeredSlides && t.autoHeight) && i.updateSlidesProgress(e), n && !r && i.emit("reachBeginning toEdge"), l && !d && i.emit("reachEnd toEdge"), (r && !n || d && !l) && i.emit("fromEdge"), i.emit("progress", a);
}
const le = (e, i, t) => {
  i && !e.classList.contains(t) ? e.classList.add(t) : !i && e.classList.contains(t) && e.classList.remove(t);
};
function at() {
  const e = this, {
    slides: i,
    params: t,
    slidesEl: s,
    activeIndex: a
  } = e, n = e.virtual && t.virtual.enabled, l = e.grid && t.grid && t.grid.rows > 1, o = (u) => H(s, `.${t.slideClass}${u}, swiper-slide${u}`)[0];
  let r, d, h;
  if (n)
    if (t.loop) {
      let u = a - e.virtual.slidesBefore;
      u < 0 && (u = e.virtual.slides.length + u), u >= e.virtual.slides.length && (u -= e.virtual.slides.length), r = o(`[data-swiper-slide-index="${u}"]`);
    } else
      r = o(`[data-swiper-slide-index="${a}"]`);
  else
    l ? (r = i.find((u) => u.column === a), h = i.find((u) => u.column === a + 1), d = i.find((u) => u.column === a - 1)) : r = i[a];
  r && (l || (h = qe(r, `.${t.slideClass}, swiper-slide`)[0], t.loop && !h && (h = i[0]), d = Re(r, `.${t.slideClass}, swiper-slide`)[0], t.loop && !d === 0 && (d = i[i.length - 1]))), i.forEach((u) => {
    le(u, u === r, t.slideActiveClass), le(u, u === h, t.slideNextClass), le(u, u === d, t.slidePrevClass);
  }), e.emitSlidesClasses();
}
const J = (e, i) => {
  if (!e || e.destroyed || !e.params) return;
  const t = () => e.isElement ? "swiper-slide" : `.${e.params.slideClass}`, s = i.closest(t());
  if (s) {
    let a = s.querySelector(`.${e.params.lazyPreloaderClass}`);
    !a && e.isElement && (s.shadowRoot ? a = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
      s.shadowRoot && (a = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`), a && !a.lazyPreloaderManaged && a.remove());
    })), a && !a.lazyPreloaderManaged && a.remove();
  }
}, oe = (e, i) => {
  if (!e.slides[i]) return;
  const t = e.slides[i].querySelector('[loading="lazy"]');
  t && t.removeAttribute("loading");
}, ue = (e) => {
  if (!e || e.destroyed || !e.params) return;
  let i = e.params.lazyPreloadPrevNext;
  const t = e.slides.length;
  if (!t || !i || i < 0) return;
  i = Math.min(i, t);
  const s = e.params.slidesPerView === "auto" ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), a = e.activeIndex;
  if (e.params.grid && e.params.grid.rows > 1) {
    const l = a, o = [l - i];
    o.push(...Array.from({
      length: i
    }).map((r, d) => l + s + d)), e.slides.forEach((r, d) => {
      o.includes(r.column) && oe(e, d);
    });
    return;
  }
  const n = a + s - 1;
  if (e.params.rewind || e.params.loop)
    for (let l = a - i; l <= n + i; l += 1) {
      const o = (l % t + t) % t;
      (o < a || o > n) && oe(e, o);
    }
  else
    for (let l = Math.max(a - i, 0); l <= Math.min(n + i, t - 1); l += 1)
      l !== a && (l > n || l < a) && oe(e, l);
};
function rt(e) {
  const {
    slidesGrid: i,
    params: t
  } = e, s = e.rtlTranslate ? e.translate : -e.translate;
  let a;
  for (let n = 0; n < i.length; n += 1)
    typeof i[n + 1] < "u" ? s >= i[n] && s < i[n + 1] - (i[n + 1] - i[n]) / 2 ? a = n : s >= i[n] && s < i[n + 1] && (a = n + 1) : s >= i[n] && (a = n);
  return t.normalizeSlideIndex && (a < 0 || typeof a > "u") && (a = 0), a;
}
function lt(e) {
  const i = this, t = i.rtlTranslate ? i.translate : -i.translate, {
    snapGrid: s,
    params: a,
    activeIndex: n,
    realIndex: l,
    snapIndex: o
  } = i;
  let r = e, d;
  const h = (c) => {
    let m = c - i.virtual.slidesBefore;
    return m < 0 && (m = i.virtual.slides.length + m), m >= i.virtual.slides.length && (m -= i.virtual.slides.length), m;
  };
  if (typeof r > "u" && (r = rt(i)), s.indexOf(t) >= 0)
    d = s.indexOf(t);
  else {
    const c = Math.min(a.slidesPerGroupSkip, r);
    d = c + Math.floor((r - c) / a.slidesPerGroup);
  }
  if (d >= s.length && (d = s.length - 1), r === n && !i.params.loop) {
    d !== o && (i.snapIndex = d, i.emit("snapIndexChange"));
    return;
  }
  if (r === n && i.params.loop && i.virtual && i.params.virtual.enabled) {
    i.realIndex = h(r);
    return;
  }
  const u = i.grid && a.grid && a.grid.rows > 1;
  let y;
  if (i.virtual && a.virtual.enabled)
    a.loop ? y = h(r) : y = r;
  else if (u) {
    const c = i.slides.find((b) => b.column === r);
    let m = parseInt(c.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(m) && (m = Math.max(i.slides.indexOf(c), 0)), y = Math.floor(m / a.grid.rows);
  } else if (i.slides[r]) {
    const c = i.slides[r].getAttribute("data-swiper-slide-index");
    c ? y = parseInt(c, 10) : y = r;
  } else
    y = r;
  Object.assign(i, {
    previousSnapIndex: o,
    snapIndex: d,
    previousRealIndex: l,
    realIndex: y,
    previousIndex: n,
    activeIndex: r
  }), i.initialized && ue(i), i.emit("activeIndexChange"), i.emit("snapIndexChange"), (i.initialized || i.params.runCallbacksOnInit) && (l !== y && i.emit("realIndexChange"), i.emit("slideChange"));
}
function ot(e, i) {
  const t = this, s = t.params;
  let a = e.closest(`.${s.slideClass}, swiper-slide`);
  !a && t.isElement && i && i.length > 1 && i.includes(e) && [...i.slice(i.indexOf(e) + 1, i.length)].forEach((o) => {
    !a && o.matches && o.matches(`.${s.slideClass}, swiper-slide`) && (a = o);
  });
  let n = !1, l;
  if (a) {
    for (let o = 0; o < t.slides.length; o += 1)
      if (t.slides[o] === a) {
        n = !0, l = o;
        break;
      }
  }
  if (a && n)
    t.clickedSlide = a, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(a.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = l;
  else {
    t.clickedSlide = void 0, t.clickedIndex = void 0;
    return;
  }
  s.slideToClickedSlide && t.clickedIndex !== void 0 && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
}
var dt = {
  updateSize: Qe,
  updateSlides: et,
  updateAutoHeight: tt,
  updateSlidesOffset: it,
  updateSlidesProgress: st,
  updateProgress: nt,
  updateSlidesClasses: at,
  updateActiveIndex: lt,
  updateClickedSlide: ot
};
function ct(e = this.isHorizontal() ? "x" : "y") {
  const i = this, {
    params: t,
    rtlTranslate: s,
    translate: a,
    wrapperEl: n
  } = i;
  if (t.virtualTranslate)
    return s ? -a : a;
  if (t.cssMode)
    return a;
  let l = Ve(n, e);
  return l += i.cssOverflowAdjustment(), s && (l = -l), l || 0;
}
function ft(e, i) {
  const t = this, {
    rtlTranslate: s,
    params: a,
    wrapperEl: n,
    progress: l
  } = t;
  let o = 0, r = 0;
  const d = 0;
  t.isHorizontal() ? o = s ? -e : e : r = e, a.roundLengths && (o = Math.floor(o), r = Math.floor(r)), t.previousTranslate = t.translate, t.translate = t.isHorizontal() ? o : r, a.cssMode ? n[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal() ? -o : -r : a.virtualTranslate || (t.isHorizontal() ? o -= t.cssOverflowAdjustment() : r -= t.cssOverflowAdjustment(), n.style.transform = `translate3d(${o}px, ${r}px, ${d}px)`);
  let h;
  const u = t.maxTranslate() - t.minTranslate();
  u === 0 ? h = 0 : h = (e - t.minTranslate()) / u, h !== l && t.updateProgress(e), t.emit("setTranslate", t.translate, i);
}
function ut() {
  return -this.snapGrid[0];
}
function pt() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function mt(e = 0, i = this.params.speed, t = !0, s = !0, a) {
  const n = this, {
    params: l,
    wrapperEl: o
  } = n;
  if (n.animating && l.preventInteractionOnTransition)
    return !1;
  const r = n.minTranslate(), d = n.maxTranslate();
  let h;
  if (s && e > r ? h = r : s && e < d ? h = d : h = e, n.updateProgress(h), l.cssMode) {
    const u = n.isHorizontal();
    if (i === 0)
      o[u ? "scrollLeft" : "scrollTop"] = -h;
    else {
      if (!n.support.smoothScroll)
        return xe({
          swiper: n,
          targetPosition: -h,
          side: u ? "left" : "top"
        }), !0;
      o.scrollTo({
        [u ? "left" : "top"]: -h,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return i === 0 ? (n.setTransition(0), n.setTranslate(h), t && (n.emit("beforeTransitionStart", i, a), n.emit("transitionEnd"))) : (n.setTransition(i), n.setTranslate(h), t && (n.emit("beforeTransitionStart", i, a), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(y) {
    !n || n.destroyed || y.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, n.animating = !1, t && n.emit("transitionEnd"));
  }), n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))), !0;
}
var ht = {
  getTranslate: ct,
  setTranslate: ft,
  minTranslate: ut,
  maxTranslate: pt,
  translateTo: mt
};
function gt(e, i) {
  const t = this;
  t.params.cssMode || (t.wrapperEl.style.transitionDuration = `${e}ms`, t.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : ""), t.emit("setTransition", e, i);
}
function Pe({
  swiper: e,
  runCallbacks: i,
  direction: t,
  step: s
}) {
  const {
    activeIndex: a,
    previousIndex: n
  } = e;
  let l = t;
  l || (a > n ? l = "next" : a < n ? l = "prev" : l = "reset"), e.emit(`transition${s}`), i && l === "reset" ? e.emit(`slideResetTransition${s}`) : i && a !== n && (e.emit(`slideChangeTransition${s}`), l === "next" ? e.emit(`slideNextTransition${s}`) : e.emit(`slidePrevTransition${s}`));
}
function vt(e = !0, i) {
  const t = this, {
    params: s
  } = t;
  s.cssMode || (s.autoHeight && t.updateAutoHeight(), Pe({
    swiper: t,
    runCallbacks: e,
    direction: i,
    step: "Start"
  }));
}
function yt(e = !0, i) {
  const t = this, {
    params: s
  } = t;
  t.animating = !1, !s.cssMode && (t.setTransition(0), Pe({
    swiper: t,
    runCallbacks: e,
    direction: i,
    step: "End"
  }));
}
var bt = {
  setTransition: gt,
  transitionStart: vt,
  transitionEnd: yt
};
function St(e = 0, i, t = !0, s, a) {
  typeof e == "string" && (e = parseInt(e, 10));
  const n = this;
  let l = e;
  l < 0 && (l = 0);
  const {
    params: o,
    snapGrid: r,
    slidesGrid: d,
    previousIndex: h,
    activeIndex: u,
    rtlTranslate: y,
    wrapperEl: c,
    enabled: m
  } = n;
  if (!m && !s && !a || n.destroyed || n.animating && o.preventInteractionOnTransition)
    return !1;
  typeof i > "u" && (i = n.params.speed);
  const b = Math.min(n.params.slidesPerGroupSkip, l);
  let E = b + Math.floor((l - b) / n.params.slidesPerGroup);
  E >= r.length && (E = r.length - 1);
  const f = -r[E];
  if (o.normalizeSlideIndex)
    for (let z = 0; z < d.length; z += 1) {
      const T = -Math.floor(f * 100), D = Math.floor(d[z] * 100), w = Math.floor(d[z + 1] * 100);
      typeof d[z + 1] < "u" ? T >= D && T < w - (w - D) / 2 ? l = z : T >= D && T < w && (l = z + 1) : T >= D && (l = z);
    }
  if (n.initialized && l !== u && (!n.allowSlideNext && (y ? f > n.translate && f > n.minTranslate() : f < n.translate && f < n.minTranslate()) || !n.allowSlidePrev && f > n.translate && f > n.maxTranslate() && (u || 0) !== l))
    return !1;
  l !== (h || 0) && t && n.emit("beforeSlideChangeStart"), n.updateProgress(f);
  let p;
  l > u ? p = "next" : l < u ? p = "prev" : p = "reset";
  const g = n.virtual && n.params.virtual.enabled;
  if (!(g && a) && (y && -f === n.translate || !y && f === n.translate))
    return n.updateActiveIndex(l), o.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), o.effect !== "slide" && n.setTranslate(f), p !== "reset" && (n.transitionStart(t, p), n.transitionEnd(t, p)), !1;
  if (o.cssMode) {
    const z = n.isHorizontal(), T = y ? f : -f;
    if (i === 0)
      g && (n.wrapperEl.style.scrollSnapType = "none", n._immediateVirtual = !0), g && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        c[z ? "scrollLeft" : "scrollTop"] = T;
      })) : c[z ? "scrollLeft" : "scrollTop"] = T, g && requestAnimationFrame(() => {
        n.wrapperEl.style.scrollSnapType = "", n._immediateVirtual = !1;
      });
    else {
      if (!n.support.smoothScroll)
        return xe({
          swiper: n,
          targetPosition: T,
          side: z ? "left" : "top"
        }), !0;
      c.scrollTo({
        [z ? "left" : "top"]: T,
        behavior: "smooth"
      });
    }
    return !0;
  }
  const k = we().isSafari;
  return g && !a && k && n.isElement && n.virtual.update(!1, !1, l), n.setTransition(i), n.setTranslate(f), n.updateActiveIndex(l), n.updateSlidesClasses(), n.emit("beforeTransitionStart", i, s), n.transitionStart(t, p), i === 0 ? n.transitionEnd(t, p) : n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(T) {
    !n || n.destroyed || T.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(t, p));
  }), n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)), !0;
}
function Tt(e = 0, i, t = !0, s) {
  typeof e == "string" && (e = parseInt(e, 10));
  const a = this;
  if (a.destroyed) return;
  typeof i > "u" && (i = a.params.speed);
  const n = a.grid && a.params.grid && a.params.grid.rows > 1;
  let l = e;
  if (a.params.loop)
    if (a.virtual && a.params.virtual.enabled)
      l = l + a.virtual.slidesBefore;
    else {
      let o;
      if (n) {
        const b = l * a.params.grid.rows;
        o = a.slides.find((E) => E.getAttribute("data-swiper-slide-index") * 1 === b).column;
      } else
        o = a.getSlideIndexByData(l);
      const r = n ? Math.ceil(a.slides.length / a.params.grid.rows) : a.slides.length, {
        centeredSlides: d,
        slidesOffsetBefore: h,
        slidesOffsetAfter: u
      } = a.params, y = d || !!h || !!u;
      let c = a.params.slidesPerView;
      c === "auto" ? c = a.slidesPerViewDynamic() : (c = Math.ceil(parseFloat(a.params.slidesPerView, 10)), y && c % 2 === 0 && (c = c + 1));
      let m = r - o < c;
      if (y && (m = m || o < Math.ceil(c / 2)), s && y && a.params.slidesPerView !== "auto" && !n && (m = !1), m) {
        const b = y ? o < a.activeIndex ? "prev" : "next" : o - a.activeIndex - 1 < a.params.slidesPerView ? "next" : "prev";
        a.loopFix({
          direction: b,
          slideTo: !0,
          activeSlideIndex: b === "next" ? o + 1 : o - r + 1,
          slideRealIndex: b === "next" ? a.realIndex : void 0
        });
      }
      if (n) {
        const b = l * a.params.grid.rows;
        l = a.slides.find((E) => E.getAttribute("data-swiper-slide-index") * 1 === b).column;
      } else
        l = a.getSlideIndexByData(l);
    }
  return requestAnimationFrame(() => {
    a.slideTo(l, i, t, s);
  }), a;
}
function Et(e, i = !0, t) {
  const s = this, {
    enabled: a,
    params: n,
    animating: l
  } = s;
  if (!a || s.destroyed) return s;
  typeof e > "u" && (e = s.params.speed);
  let o = n.slidesPerGroup;
  n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (o = Math.max(s.slidesPerViewDynamic("current", !0), 1));
  const r = s.activeIndex < n.slidesPerGroupSkip ? 1 : o, d = s.virtual && n.virtual.enabled;
  if (n.loop) {
    if (l && !d && n.loopPreventsSliding) return !1;
    if (s.loopFix({
      direction: "next"
    }), s._clientLeft = s.wrapperEl.clientLeft, s.activeIndex === s.slides.length - 1 && n.cssMode)
      return requestAnimationFrame(() => {
        s.slideTo(s.activeIndex + r, e, i, t);
      }), !0;
  }
  return n.rewind && s.isEnd ? s.slideTo(0, e, i, t) : s.slideTo(s.activeIndex + r, e, i, t);
}
function xt(e, i = !0, t) {
  const s = this, {
    params: a,
    snapGrid: n,
    slidesGrid: l,
    rtlTranslate: o,
    enabled: r,
    animating: d
  } = s;
  if (!r || s.destroyed) return s;
  typeof e > "u" && (e = s.params.speed);
  const h = s.virtual && a.virtual.enabled;
  if (a.loop) {
    if (d && !h && a.loopPreventsSliding) return !1;
    s.loopFix({
      direction: "prev"
    }), s._clientLeft = s.wrapperEl.clientLeft;
  }
  const u = o ? s.translate : -s.translate;
  function y(p) {
    return p < 0 ? -Math.floor(Math.abs(p)) : Math.floor(p);
  }
  const c = y(u), m = n.map((p) => y(p)), b = a.freeMode && a.freeMode.enabled;
  let E = n[m.indexOf(c) - 1];
  if (typeof E > "u" && (a.cssMode || b)) {
    let p;
    n.forEach((g, S) => {
      c >= g && (p = S);
    }), typeof p < "u" && (E = b ? n[p] : n[p > 0 ? p - 1 : p]);
  }
  let f = 0;
  if (typeof E < "u" && (f = l.indexOf(E), f < 0 && (f = s.activeIndex - 1), a.slidesPerView === "auto" && a.slidesPerGroup === 1 && a.slidesPerGroupAuto && (f = f - s.slidesPerViewDynamic("previous", !0) + 1, f = Math.max(f, 0))), a.rewind && s.isBeginning) {
    const p = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
    return s.slideTo(p, e, i, t);
  } else if (a.loop && s.activeIndex === 0 && a.cssMode)
    return requestAnimationFrame(() => {
      s.slideTo(f, e, i, t);
    }), !0;
  return s.slideTo(f, e, i, t);
}
function Ct(e, i = !0, t) {
  const s = this;
  if (!s.destroyed)
    return typeof e > "u" && (e = s.params.speed), s.slideTo(s.activeIndex, e, i, t);
}
function Mt(e, i = !0, t, s = 0.5) {
  const a = this;
  if (a.destroyed) return;
  typeof e > "u" && (e = a.params.speed);
  let n = a.activeIndex;
  const l = Math.min(a.params.slidesPerGroupSkip, n), o = l + Math.floor((n - l) / a.params.slidesPerGroup), r = a.rtlTranslate ? a.translate : -a.translate;
  if (r >= a.snapGrid[o]) {
    const d = a.snapGrid[o], h = a.snapGrid[o + 1];
    r - d > (h - d) * s && (n += a.params.slidesPerGroup);
  } else {
    const d = a.snapGrid[o - 1], h = a.snapGrid[o];
    r - d <= (h - d) * s && (n -= a.params.slidesPerGroup);
  }
  return n = Math.max(n, 0), n = Math.min(n, a.slidesGrid.length - 1), a.slideTo(n, e, i, t);
}
function wt() {
  const e = this;
  if (e.destroyed) return;
  const {
    params: i,
    slidesEl: t
  } = e, s = i.slidesPerView === "auto" ? e.slidesPerViewDynamic() : i.slidesPerView;
  let a = e.getSlideIndexWhenGrid(e.clickedIndex), n;
  const l = e.isElement ? "swiper-slide" : `.${i.slideClass}`, o = e.grid && e.params.grid && e.params.grid.rows > 1;
  if (i.loop) {
    if (e.animating) return;
    n = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), i.centeredSlides ? e.slideToLoop(n) : a > (o ? (e.slides.length - s) / 2 - (e.params.grid.rows - 1) : e.slides.length - s) ? (e.loopFix(), a = e.getSlideIndex(H(t, `${l}[data-swiper-slide-index="${n}"]`)[0]), Ee(() => {
      e.slideTo(a);
    })) : e.slideTo(a);
  } else
    e.slideTo(a);
}
var Pt = {
  slideTo: St,
  slideToLoop: Tt,
  slideNext: Et,
  slidePrev: xt,
  slideReset: Ct,
  slideToClosest: Mt,
  slideToClickedSlide: wt
};
function Lt(e, i) {
  const t = this, {
    params: s,
    slidesEl: a
  } = t;
  if (!s.loop || t.virtual && t.params.virtual.enabled) return;
  const n = () => {
    H(a, `.${s.slideClass}, swiper-slide`).forEach((m, b) => {
      m.setAttribute("data-swiper-slide-index", b);
    });
  }, l = () => {
    const c = H(a, `.${s.slideBlankClass}`);
    c.forEach((m) => {
      m.remove();
    }), c.length > 0 && (t.recalcSlides(), t.updateSlides());
  }, o = t.grid && s.grid && s.grid.rows > 1;
  s.loopAddBlankSlides && (s.slidesPerGroup > 1 || o) && l();
  const r = s.slidesPerGroup * (o ? s.grid.rows : 1), d = t.slides.length % r !== 0, h = o && t.slides.length % s.grid.rows !== 0, u = (c) => {
    for (let m = 0; m < c; m += 1) {
      const b = t.isElement ? Y("swiper-slide", [s.slideBlankClass]) : Y("div", [s.slideClass, s.slideBlankClass]);
      t.slidesEl.append(b);
    }
  };
  if (d) {
    if (s.loopAddBlankSlides) {
      const c = r - t.slides.length % r;
      u(c), t.recalcSlides(), t.updateSlides();
    } else
      ee("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n();
  } else if (h) {
    if (s.loopAddBlankSlides) {
      const c = s.grid.rows - t.slides.length % s.grid.rows;
      u(c), t.recalcSlides(), t.updateSlides();
    } else
      ee("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n();
  } else
    n();
  const y = s.centeredSlides || !!s.slidesOffsetBefore || !!s.slidesOffsetAfter;
  t.loopFix({
    slideRealIndex: e,
    direction: y ? void 0 : "next",
    initial: i
  });
}
function It({
  slideRealIndex: e,
  slideTo: i = !0,
  direction: t,
  setTranslate: s,
  activeSlideIndex: a,
  initial: n,
  byController: l,
  byMousewheel: o
} = {}) {
  const r = this;
  if (!r.params.loop) return;
  r.emit("beforeLoopFix");
  const {
    slides: d,
    allowSlidePrev: h,
    allowSlideNext: u,
    slidesEl: y,
    params: c
  } = r, {
    centeredSlides: m,
    slidesOffsetBefore: b,
    slidesOffsetAfter: E,
    initialSlide: f
  } = c, p = m || !!b || !!E;
  if (r.allowSlidePrev = !0, r.allowSlideNext = !0, r.virtual && c.virtual.enabled) {
    i && (!p && r.snapIndex === 0 ? r.slideTo(r.virtual.slides.length, 0, !1, !0) : p && r.snapIndex < c.slidesPerView ? r.slideTo(r.virtual.slides.length + r.snapIndex, 0, !1, !0) : r.snapIndex === r.snapGrid.length - 1 && r.slideTo(r.virtual.slidesBefore, 0, !1, !0)), r.allowSlidePrev = h, r.allowSlideNext = u, r.emit("loopFix");
    return;
  }
  let g = c.slidesPerView;
  g === "auto" ? g = r.slidesPerViewDynamic() : (g = Math.ceil(parseFloat(c.slidesPerView, 10)), p && g % 2 === 0 && (g = g + 1));
  const S = c.slidesPerGroupAuto ? g : c.slidesPerGroup;
  let x = p ? Math.max(S, Math.ceil(g / 2)) : S;
  x % S !== 0 && (x += S - x % S), x += c.loopAdditionalSlides, r.loopedSlides = x;
  const k = r.grid && c.grid && c.grid.rows > 1;
  d.length < g + x || r.params.effect === "cards" && d.length < g + x * 2 ? ee("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : k && c.grid.fill === "row" && ee("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const z = [], T = [], D = k ? Math.ceil(d.length / c.grid.rows) : d.length, w = n && D - f < g && !p;
  let C = w ? f : r.activeIndex;
  typeof a > "u" ? a = r.getSlideIndex(d.find((P) => P.classList.contains(c.slideActiveClass))) : C = a;
  const I = t === "next" || !t, O = t === "prev" || !t;
  let A = 0, v = 0;
  const L = (k ? d[a].column : a) + (p && typeof s > "u" ? -g / 2 + 0.5 : 0);
  if (L < x) {
    A = Math.max(x - L, S);
    for (let P = 0; P < x - L; P += 1) {
      const G = P - Math.floor(P / D) * D;
      if (k) {
        const B = D - G - 1;
        for (let R = d.length - 1; R >= 0; R -= 1)
          d[R].column === B && z.push(R);
      } else
        z.push(D - G - 1);
    }
  } else if (L + g > D - x) {
    v = Math.max(L - (D - x * 2), S), w && (v = Math.max(v, g - D + f + 1));
    for (let P = 0; P < v; P += 1) {
      const G = P - Math.floor(P / D) * D;
      k ? d.forEach((B, R) => {
        B.column === G && T.push(R);
      }) : T.push(G);
    }
  }
  if (r.__preventObserver__ = !0, requestAnimationFrame(() => {
    r.__preventObserver__ = !1;
  }), r.params.effect === "cards" && d.length < g + x * 2 && (T.includes(a) && T.splice(T.indexOf(a), 1), z.includes(a) && z.splice(z.indexOf(a), 1)), O && z.forEach((P) => {
    d[P].swiperLoopMoveDOM = !0, y.prepend(d[P]), d[P].swiperLoopMoveDOM = !1;
  }), I && T.forEach((P) => {
    d[P].swiperLoopMoveDOM = !0, y.append(d[P]), d[P].swiperLoopMoveDOM = !1;
  }), r.recalcSlides(), c.slidesPerView === "auto" ? r.updateSlides() : k && (z.length > 0 && O || T.length > 0 && I) && r.slides.forEach((P, G) => {
    r.grid.updateSlide(G, P, r.slides);
  }), c.watchSlidesProgress && r.updateSlidesOffset(), i) {
    if (z.length > 0 && O) {
      if (typeof e > "u") {
        const P = r.slidesGrid[C], B = r.slidesGrid[C + A] - P;
        o ? r.setTranslate(r.translate - B) : (r.slideTo(C + Math.ceil(A), 0, !1, !0), s && (r.touchEventsData.startTranslate = r.touchEventsData.startTranslate - B, r.touchEventsData.currentTranslate = r.touchEventsData.currentTranslate - B));
      } else if (s) {
        const P = k ? z.length / c.grid.rows : z.length;
        r.slideTo(r.activeIndex + P, 0, !1, !0), r.touchEventsData.currentTranslate = r.translate;
      }
    } else if (T.length > 0 && I)
      if (typeof e > "u") {
        const P = r.slidesGrid[C], B = r.slidesGrid[C - v] - P;
        o ? r.setTranslate(r.translate - B) : (r.slideTo(C - v, 0, !1, !0), s && (r.touchEventsData.startTranslate = r.touchEventsData.startTranslate - B, r.touchEventsData.currentTranslate = r.touchEventsData.currentTranslate - B));
      } else {
        const P = k ? T.length / c.grid.rows : T.length;
        r.slideTo(r.activeIndex - P, 0, !1, !0);
      }
  }
  if (r.allowSlidePrev = h, r.allowSlideNext = u, r.controller && r.controller.control && !l) {
    const P = {
      slideRealIndex: e,
      direction: t,
      setTranslate: s,
      activeSlideIndex: a,
      byController: !0
    };
    Array.isArray(r.controller.control) ? r.controller.control.forEach((G) => {
      !G.destroyed && G.params.loop && G.loopFix({
        ...P,
        slideTo: G.params.slidesPerView === c.slidesPerView ? i : !1
      });
    }) : r.controller.control instanceof r.constructor && r.controller.control.params.loop && r.controller.control.loopFix({
      ...P,
      slideTo: r.controller.control.params.slidesPerView === c.slidesPerView ? i : !1
    });
  }
  r.emit("loopFix");
}
function kt() {
  const e = this, {
    params: i,
    slidesEl: t
  } = e;
  if (!i.loop || !t || e.virtual && e.params.virtual.enabled) return;
  e.recalcSlides();
  const s = [];
  e.slides.forEach((a) => {
    const n = typeof a.swiperSlideIndex > "u" ? a.getAttribute("data-swiper-slide-index") * 1 : a.swiperSlideIndex;
    s[n] = a;
  }), e.slides.forEach((a) => {
    a.removeAttribute("data-swiper-slide-index");
  }), s.forEach((a) => {
    t.append(a);
  }), e.recalcSlides(), e.slideTo(e.realIndex, 0);
}
var At = {
  loopCreate: Lt,
  loopFix: It,
  loopDestroy: kt
};
function Ot(e) {
  const i = this;
  if (!i.params.simulateTouch || i.params.watchOverflow && i.isLocked || i.params.cssMode) return;
  const t = i.params.touchEventsTarget === "container" ? i.el : i.wrapperEl;
  i.isElement && (i.__preventObserver__ = !0), t.style.cursor = "move", t.style.cursor = e ? "grabbing" : "grab", i.isElement && requestAnimationFrame(() => {
    i.__preventObserver__ = !1;
  });
}
function zt() {
  const e = this;
  e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame(() => {
    e.__preventObserver__ = !1;
  }));
}
var Dt = {
  setGrabCursor: Ot,
  unsetGrabCursor: zt
};
function Gt(e, i = this) {
  function t(s) {
    if (!s || s === F() || s === V()) return null;
    s.assignedSlot && (s = s.assignedSlot);
    const a = s.closest(e);
    return !a && !s.getRootNode ? null : a || t(s.getRootNode().host);
  }
  return t(i);
}
function ge(e, i, t) {
  const s = V(), {
    params: a
  } = e, n = a.edgeSwipeDetection, l = a.edgeSwipeThreshold;
  return n && (t <= l || t >= s.innerWidth - l) ? n === "prevent" ? (i.preventDefault(), !0) : !1 : !0;
}
function $t(e) {
  const i = this;
  if (i.destroyed) return;
  const t = F();
  let s = e;
  s.originalEvent && (s = s.originalEvent);
  const a = i.touchEventsData;
  if (s.type === "pointerdown") {
    if (a.pointerId !== null && a.pointerId !== s.pointerId)
      return;
    a.pointerId = s.pointerId;
  } else s.type === "touchstart" && s.targetTouches.length === 1 && (a.touchId = s.targetTouches[0].identifier);
  if (s.type === "touchstart") {
    ge(i, s, s.targetTouches[0].pageX);
    return;
  }
  const {
    params: n,
    touches: l,
    enabled: o
  } = i;
  if (!o || !n.simulateTouch && s.pointerType === "mouse" || i.animating && n.preventInteractionOnTransition)
    return;
  !i.animating && n.cssMode && n.loop && i.loopFix();
  let r = s.target;
  if (n.touchEventsTarget === "wrapper" && !Ne(r, i.wrapperEl) || "which" in s && s.which === 3 || "button" in s && s.button > 0 || a.isTouched && a.isMoved) return;
  const d = !!n.noSwipingClass && n.noSwipingClass !== "", h = s.composedPath ? s.composedPath() : s.path;
  d && s.target && s.target.shadowRoot && h && (r = h[0]);
  const u = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`, y = !!(s.target && s.target.shadowRoot);
  if (n.noSwiping && (y ? Gt(u, r) : r.closest(u))) {
    i.allowClick = !0;
    return;
  }
  if (n.swipeHandler && !r.closest(n.swipeHandler))
    return;
  l.currentX = s.pageX, l.currentY = s.pageY;
  const c = l.currentX, m = l.currentY;
  if (!ge(i, s, c))
    return;
  Object.assign(a, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), l.startX = c, l.startY = m, a.touchStartTime = Q(), i.allowClick = !0, i.updateSize(), i.swipeDirection = void 0, n.threshold > 0 && (a.allowThresholdMove = !1);
  let b = !0;
  r.matches(a.focusableElements) && (b = !1, r.nodeName === "SELECT" && (a.isTouched = !1)), t.activeElement && t.activeElement.matches(a.focusableElements) && t.activeElement !== r && (s.pointerType === "mouse" || s.pointerType !== "mouse" && !r.matches(a.focusableElements)) && t.activeElement.blur();
  const E = b && i.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || E) && !r.isContentEditable && s.preventDefault(), n.freeMode && n.freeMode.enabled && i.freeMode && i.animating && !n.cssMode && i.freeMode.onTouchStart(), i.emit("touchStart", s);
}
function Bt(e) {
  const i = F(), t = this;
  if (t.destroyed) return;
  const s = t.touchEventsData, {
    params: a,
    touches: n,
    rtlTranslate: l,
    enabled: o
  } = t;
  if (!o || !a.simulateTouch && e.pointerType === "mouse") return;
  let r = e;
  if (r.originalEvent && (r = r.originalEvent), r.type === "pointermove" && (s.touchId !== null || r.pointerId !== s.pointerId))
    return;
  let d;
  if (r.type === "touchmove") {
    if (d = [...r.changedTouches].find((x) => x.identifier === s.touchId), !d || d.identifier !== s.touchId) return;
  } else
    d = r;
  if (!s.isTouched) {
    s.startMoving && s.isScrolling && t.emit("touchMoveOpposite", r);
    return;
  }
  const h = d.pageX, u = d.pageY;
  if (r.preventedByNestedSwiper) {
    n.startX = h, n.startY = u;
    return;
  }
  if (!t.allowTouchMove) {
    r.target.matches(s.focusableElements) || (t.allowClick = !1), s.isTouched && (Object.assign(n, {
      startX: h,
      startY: u,
      currentX: h,
      currentY: u
    }), s.touchStartTime = Q());
    return;
  }
  if (a.touchReleaseOnEdges && !a.loop)
    if (t.isVertical()) {
      if (u < n.startY && t.translate <= t.maxTranslate() || u > n.startY && t.translate >= t.minTranslate()) {
        s.isTouched = !1, s.isMoved = !1;
        return;
      }
    } else {
      if (l && (h > n.startX && -t.translate <= t.maxTranslate() || h < n.startX && -t.translate >= t.minTranslate()))
        return;
      if (!l && (h < n.startX && t.translate <= t.maxTranslate() || h > n.startX && t.translate >= t.minTranslate()))
        return;
    }
  if (i.activeElement && i.activeElement.matches(s.focusableElements) && i.activeElement !== r.target && r.pointerType !== "mouse" && i.activeElement.blur(), i.activeElement && r.target === i.activeElement && r.target.matches(s.focusableElements)) {
    s.isMoved = !0, t.allowClick = !1;
    return;
  }
  s.allowTouchCallbacks && t.emit("touchMove", r), n.previousX = n.currentX, n.previousY = n.currentY, n.currentX = h, n.currentY = u;
  const y = n.currentX - n.startX, c = n.currentY - n.startY;
  if (t.params.threshold && Math.sqrt(y ** 2 + c ** 2) < t.params.threshold) return;
  if (typeof s.isScrolling > "u") {
    let x;
    t.isHorizontal() && n.currentY === n.startY || t.isVertical() && n.currentX === n.startX ? s.isScrolling = !1 : y * y + c * c >= 25 && (x = Math.atan2(Math.abs(c), Math.abs(y)) * 180 / Math.PI, s.isScrolling = t.isHorizontal() ? x > a.touchAngle : 90 - x > a.touchAngle);
  }
  if (s.isScrolling && t.emit("touchMoveOpposite", r), typeof s.startMoving > "u" && (n.currentX !== n.startX || n.currentY !== n.startY) && (s.startMoving = !0), s.isScrolling || r.type === "touchmove" && s.preventTouchMoveFromPointerMove) {
    s.isTouched = !1;
    return;
  }
  if (!s.startMoving)
    return;
  t.allowClick = !1, !a.cssMode && r.cancelable && r.preventDefault(), a.touchMoveStopPropagation && !a.nested && r.stopPropagation();
  let m = t.isHorizontal() ? y : c, b = t.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  a.oneWayMovement && (m = Math.abs(m) * (l ? 1 : -1), b = Math.abs(b) * (l ? 1 : -1)), n.diff = m, m *= a.touchRatio, l && (m = -m, b = -b);
  const E = t.touchesDirection;
  t.swipeDirection = m > 0 ? "prev" : "next", t.touchesDirection = b > 0 ? "prev" : "next";
  const f = t.params.loop && !a.cssMode, p = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
  if (!s.isMoved) {
    if (f && p && t.loopFix({
      direction: t.swipeDirection
    }), s.startTranslate = t.getTranslate(), t.setTransition(0), t.animating) {
      const x = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: {
          bySwiperTouchMove: !0
        }
      });
      t.wrapperEl.dispatchEvent(x);
    }
    s.allowMomentumBounce = !1, a.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0), t.emit("sliderFirstMove", r);
  }
  if ((/* @__PURE__ */ new Date()).getTime(), a._loopSwapReset !== !1 && s.isMoved && s.allowThresholdMove && E !== t.touchesDirection && f && p && Math.abs(m) >= 1) {
    Object.assign(n, {
      startX: h,
      startY: u,
      currentX: h,
      currentY: u,
      startTranslate: s.currentTranslate
    }), s.loopSwapReset = !0, s.startTranslate = s.currentTranslate;
    return;
  }
  t.emit("sliderMove", r), s.isMoved = !0, s.currentTranslate = m + s.startTranslate;
  let g = !0, S = a.resistanceRatio;
  if (a.touchReleaseOnEdges && (S = 0), m > 0 ? (f && p && s.allowThresholdMove && s.currentTranslate > (a.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (a.slidesPerView !== "auto" && t.slides.length - a.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), s.currentTranslate > t.minTranslate() && (g = !1, a.resistance && (s.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + s.startTranslate + m) ** S))) : m < 0 && (f && p && s.allowThresholdMove && s.currentTranslate < (a.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (a.slidesPerView !== "auto" && t.slides.length - a.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: t.slides.length - (a.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(a.slidesPerView, 10)))
  }), s.currentTranslate < t.maxTranslate() && (g = !1, a.resistance && (s.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - s.startTranslate - m) ** S))), g && (r.preventedByNestedSwiper = !0), !t.allowSlideNext && t.swipeDirection === "next" && s.currentTranslate < s.startTranslate && (s.currentTranslate = s.startTranslate), !t.allowSlidePrev && t.swipeDirection === "prev" && s.currentTranslate > s.startTranslate && (s.currentTranslate = s.startTranslate), !t.allowSlidePrev && !t.allowSlideNext && (s.currentTranslate = s.startTranslate), a.threshold > 0)
    if (Math.abs(m) > a.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        s.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, s.currentTranslate = s.startTranslate, n.diff = t.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY;
        return;
      }
    } else {
      s.currentTranslate = s.startTranslate;
      return;
    }
  !a.followFinger || a.cssMode || ((a.freeMode && a.freeMode.enabled && t.freeMode || a.watchSlidesProgress) && (t.updateActiveIndex(), t.updateSlidesClasses()), a.freeMode && a.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(), t.updateProgress(s.currentTranslate), t.setTranslate(s.currentTranslate));
}
function Vt(e) {
  const i = this;
  if (i.destroyed) return;
  const t = i.touchEventsData;
  let s = e;
  s.originalEvent && (s = s.originalEvent);
  let a;
  if (s.type === "touchend" || s.type === "touchcancel") {
    if (a = [...s.changedTouches].find((x) => x.identifier === t.touchId), !a || a.identifier !== t.touchId) return;
  } else {
    if (t.touchId !== null || s.pointerId !== t.pointerId) return;
    a = s;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(s.type) && !(["pointercancel", "contextmenu"].includes(s.type) && (i.browser.isSafari || i.browser.isWebView)))
    return;
  t.pointerId = null, t.touchId = null;
  const {
    params: l,
    touches: o,
    rtlTranslate: r,
    slidesGrid: d,
    enabled: h
  } = i;
  if (!h || !l.simulateTouch && s.pointerType === "mouse") return;
  if (t.allowTouchCallbacks && i.emit("touchEnd", s), t.allowTouchCallbacks = !1, !t.isTouched) {
    t.isMoved && l.grabCursor && i.setGrabCursor(!1), t.isMoved = !1, t.startMoving = !1;
    return;
  }
  l.grabCursor && t.isMoved && t.isTouched && (i.allowSlideNext === !0 || i.allowSlidePrev === !0) && i.setGrabCursor(!1);
  const u = Q(), y = u - t.touchStartTime;
  if (i.allowClick) {
    const x = s.path || s.composedPath && s.composedPath();
    i.updateClickedSlide(x && x[0] || s.target, x), i.emit("tap click", s), y < 300 && u - t.lastClickTime < 300 && i.emit("doubleTap doubleClick", s);
  }
  if (t.lastClickTime = Q(), Ee(() => {
    i.destroyed || (i.allowClick = !0);
  }), !t.isTouched || !t.isMoved || !i.swipeDirection || o.diff === 0 && !t.loopSwapReset || t.currentTranslate === t.startTranslate && !t.loopSwapReset) {
    t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
    return;
  }
  t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
  let c;
  if (l.followFinger ? c = r ? i.translate : -i.translate : c = -t.currentTranslate, l.cssMode)
    return;
  if (l.freeMode && l.freeMode.enabled) {
    i.freeMode.onTouchEnd({
      currentPos: c
    });
    return;
  }
  const m = c >= -i.maxTranslate() && !i.params.loop;
  let b = 0, E = i.slidesSizesGrid[0];
  for (let x = 0; x < d.length; x += x < l.slidesPerGroupSkip ? 1 : l.slidesPerGroup) {
    const k = x < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
    typeof d[x + k] < "u" ? (m || c >= d[x] && c < d[x + k]) && (b = x, E = d[x + k] - d[x]) : (m || c >= d[x]) && (b = x, E = d[d.length - 1] - d[d.length - 2]);
  }
  let f = null, p = null;
  l.rewind && (i.isBeginning ? p = l.virtual && l.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1 : i.isEnd && (f = 0));
  const g = (c - d[b]) / E, S = b < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
  if (y > l.longSwipesMs) {
    if (!l.longSwipes) {
      i.slideTo(i.activeIndex);
      return;
    }
    i.swipeDirection === "next" && (g >= l.longSwipesRatio ? i.slideTo(l.rewind && i.isEnd ? f : b + S) : i.slideTo(b)), i.swipeDirection === "prev" && (g > 1 - l.longSwipesRatio ? i.slideTo(b + S) : p !== null && g < 0 && Math.abs(g) > l.longSwipesRatio ? i.slideTo(p) : i.slideTo(b));
  } else {
    if (!l.shortSwipes) {
      i.slideTo(i.activeIndex);
      return;
    }
    i.navigation && (s.target === i.navigation.nextEl || s.target === i.navigation.prevEl) ? s.target === i.navigation.nextEl ? i.slideTo(b + S) : i.slideTo(b) : (i.swipeDirection === "next" && i.slideTo(f !== null ? f : b + S), i.swipeDirection === "prev" && i.slideTo(p !== null ? p : b));
  }
}
function ve() {
  const e = this, {
    params: i,
    el: t
  } = e;
  if (t && t.offsetWidth === 0) return;
  i.breakpoints && e.setBreakpoint();
  const {
    allowSlideNext: s,
    allowSlidePrev: a,
    snapGrid: n
  } = e, l = e.virtual && e.params.virtual.enabled;
  e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
  const o = l && i.loop;
  if ((i.slidesPerView === "auto" || i.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides && !o) {
    const r = l ? e.virtual.slides : e.slides;
    e.slideTo(r.length - 1, 0, !1, !0);
  } else
    e.params.loop && !l ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
  e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), e.autoplay.resizeTimeout = setTimeout(() => {
    e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
  }, 500)), e.allowSlidePrev = a, e.allowSlideNext = s, e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
}
function Ft(e) {
  const i = this;
  i.destroyed || i.enabled && (i.allowClick || (i.params.preventClicks && e.preventDefault(), i.params.preventClicksPropagation && i.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
}
function _t() {
  const e = this;
  if (e.destroyed) return;
  const {
    wrapperEl: i,
    rtlTranslate: t,
    enabled: s
  } = e;
  if (!s) return;
  e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -i.scrollLeft : e.translate = -i.scrollTop, e.translate === 0 && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
  let a;
  const n = e.maxTranslate() - e.minTranslate();
  n === 0 ? a = 0 : a = (e.translate - e.minTranslate()) / n, a !== e.progress && e.updateProgress(t ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
}
function Nt(e) {
  const i = this;
  i.destroyed || (J(i, e.target), !(i.params.cssMode || i.params.slidesPerView !== "auto" && !i.params.autoHeight) && i.update());
}
function Ht() {
  const e = this;
  e.destroyed || e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
}
const Le = (e, i) => {
  const t = F(), {
    params: s,
    el: a,
    wrapperEl: n,
    device: l
  } = e, o = !!s.nested, r = i === "on" ? "addEventListener" : "removeEventListener", d = i;
  !a || typeof a == "string" || (t[r]("touchstart", e.onDocumentTouchStart, {
    passive: !1,
    capture: o
  }), a[r]("touchstart", e.onTouchStart, {
    passive: !1
  }), a[r]("pointerdown", e.onTouchStart, {
    passive: !1
  }), t[r]("touchmove", e.onTouchMove, {
    passive: !1,
    capture: o
  }), t[r]("pointermove", e.onTouchMove, {
    passive: !1,
    capture: o
  }), t[r]("touchend", e.onTouchEnd, {
    passive: !0
  }), t[r]("pointerup", e.onTouchEnd, {
    passive: !0
  }), t[r]("pointercancel", e.onTouchEnd, {
    passive: !0
  }), t[r]("touchcancel", e.onTouchEnd, {
    passive: !0
  }), t[r]("pointerout", e.onTouchEnd, {
    passive: !0
  }), t[r]("pointerleave", e.onTouchEnd, {
    passive: !0
  }), t[r]("contextmenu", e.onTouchEnd, {
    passive: !0
  }), (s.preventClicks || s.preventClicksPropagation) && a[r]("click", e.onClick, !0), s.cssMode && n[r]("scroll", e.onScroll), s.updateOnWindowResize ? e[d](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", ve, !0) : e[d]("observerUpdate", ve, !0), a[r]("load", e.onLoad, {
    capture: !0
  }));
};
function Rt() {
  const e = this, {
    params: i
  } = e;
  e.onTouchStart = $t.bind(e), e.onTouchMove = Bt.bind(e), e.onTouchEnd = Vt.bind(e), e.onDocumentTouchStart = Ht.bind(e), i.cssMode && (e.onScroll = _t.bind(e)), e.onClick = Ft.bind(e), e.onLoad = Nt.bind(e), Le(e, "on");
}
function qt() {
  Le(this, "off");
}
var Wt = {
  attachEvents: Rt,
  detachEvents: qt
};
const ye = (e, i) => e.grid && i.grid && i.grid.rows > 1;
function jt() {
  const e = this, {
    realIndex: i,
    initialized: t,
    params: s,
    el: a
  } = e, n = s.breakpoints;
  if (!n || n && Object.keys(n).length === 0) return;
  const l = F(), o = s.breakpointsBase === "window" || !s.breakpointsBase ? s.breakpointsBase : "container", r = ["window", "container"].includes(s.breakpointsBase) || !s.breakpointsBase ? e.el : l.querySelector(s.breakpointsBase), d = e.getBreakpoint(n, o, r);
  if (!d || e.currentBreakpoint === d) return;
  const u = (d in n ? n[d] : void 0) || e.originalParams, y = ye(e, s), c = ye(e, u), m = e.params.grabCursor, b = u.grabCursor, E = s.enabled;
  y && !c ? (a.classList.remove(`${s.containerModifierClass}grid`, `${s.containerModifierClass}grid-column`), e.emitContainerClasses()) : !y && c && (a.classList.add(`${s.containerModifierClass}grid`), (u.grid.fill && u.grid.fill === "column" || !u.grid.fill && s.grid.fill === "column") && a.classList.add(`${s.containerModifierClass}grid-column`), e.emitContainerClasses()), m && !b ? e.unsetGrabCursor() : !m && b && e.setGrabCursor(), ["navigation", "pagination", "scrollbar"].forEach((k) => {
    if (typeof u[k] > "u") return;
    const z = s[k] && s[k].enabled, T = u[k] && u[k].enabled;
    z && !T && e[k].disable(), !z && T && e[k].enable();
  });
  const f = u.direction && u.direction !== s.direction, p = s.loop && (u.slidesPerView !== s.slidesPerView || f), g = s.loop;
  f && t && e.changeDirection(), _(e.params, u);
  const S = e.params.enabled, x = e.params.loop;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev
  }), E && !S ? e.disable() : !E && S && e.enable(), e.currentBreakpoint = d, e.emit("_beforeBreakpoint", u), t && (p ? (e.loopDestroy(), e.loopCreate(i), e.updateSlides()) : !g && x ? (e.loopCreate(i), e.updateSlides()) : g && !x && e.loopDestroy()), e.emit("breakpoint", u);
}
function Xt(e, i = "window", t) {
  if (!e || i === "container" && !t) return;
  let s = !1;
  const a = V(), n = i === "window" ? a.innerHeight : t.clientHeight, l = Object.keys(e).map((o) => {
    if (typeof o == "string" && o.indexOf("@") === 0) {
      const r = parseFloat(o.substr(1));
      return {
        value: n * r,
        point: o
      };
    }
    return {
      value: o,
      point: o
    };
  });
  l.sort((o, r) => parseInt(o.value, 10) - parseInt(r.value, 10));
  for (let o = 0; o < l.length; o += 1) {
    const {
      point: r,
      value: d
    } = l[o];
    i === "window" ? a.matchMedia(`(min-width: ${d}px)`).matches && (s = r) : d <= t.clientWidth && (s = r);
  }
  return s || "max";
}
var Yt = {
  setBreakpoint: jt,
  getBreakpoint: Xt
};
function Ut(e, i) {
  const t = [];
  return e.forEach((s) => {
    typeof s == "object" ? Object.keys(s).forEach((a) => {
      s[a] && t.push(i + a);
    }) : typeof s == "string" && t.push(i + s);
  }), t;
}
function Kt() {
  const e = this, {
    classNames: i,
    params: t,
    rtl: s,
    el: a,
    device: n
  } = e, l = Ut(["initialized", t.direction, {
    "free-mode": e.params.freeMode && t.freeMode.enabled
  }, {
    autoheight: t.autoHeight
  }, {
    rtl: s
  }, {
    grid: t.grid && t.grid.rows > 1
  }, {
    "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column"
  }, {
    android: n.android
  }, {
    ios: n.ios
  }, {
    "css-mode": t.cssMode
  }, {
    centered: t.cssMode && t.centeredSlides
  }, {
    "watch-progress": t.watchSlidesProgress
  }], t.containerModifierClass);
  i.push(...l), a.classList.add(...i), e.emitContainerClasses();
}
function Zt() {
  const e = this, {
    el: i,
    classNames: t
  } = e;
  !i || typeof i == "string" || (i.classList.remove(...t), e.emitContainerClasses());
}
var Jt = {
  addClasses: Kt,
  removeClasses: Zt
};
function Qt() {
  const e = this, {
    isLocked: i,
    params: t
  } = e, {
    slidesOffsetBefore: s
  } = t;
  if (s) {
    const a = e.slides.length - 1, n = e.slidesGrid[a] + e.slidesSizesGrid[a] + s * 2;
    e.isLocked = e.size > n;
  } else
    e.isLocked = e.snapGrid.length === 1;
  t.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked), t.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked), i && i !== e.isLocked && (e.isEnd = !1), i !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
var ei = {
  checkOverflow: Qt
}, be = {
  init: !0,
  direction: "horizontal",
  oneWayMovement: !1,
  swiperElementNodeName: "SWIPER-CONTAINER",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: !1,
  updateOnWindowResize: !0,
  resizeObserver: !0,
  nested: !1,
  createElements: !1,
  eventsPrefix: "swiper",
  enabled: !0,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: !1,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: !1,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: !1,
  // Set wrapper width
  setWrapperSize: !1,
  // Virtual Translate
  virtualTranslate: !1,
  // Effects
  effect: "slide",
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: !1,
  centeredSlides: !1,
  centeredSlidesBounds: !1,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: !0,
  centerInsufficientSlides: !1,
  snapToSlideEdge: !1,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: !0,
  // Round length
  roundLengths: !1,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: !0,
  shortSwipes: !0,
  longSwipes: !0,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: !0,
  allowTouchMove: !0,
  threshold: 5,
  touchMoveStopPropagation: !1,
  touchStartPreventDefault: !0,
  touchStartForcePreventDefault: !1,
  touchReleaseOnEdges: !1,
  // Unique Navigation Elements
  uniqueNavElements: !0,
  // Resistance
  resistance: !0,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: !1,
  // Cursor
  grabCursor: !1,
  // Clicks
  preventClicks: !0,
  preventClicksPropagation: !0,
  slideToClickedSlide: !1,
  // loop
  loop: !1,
  loopAddBlankSlides: !0,
  loopAdditionalSlides: 0,
  loopPreventsSliding: !0,
  // rewind
  rewind: !1,
  // Swiping/no swiping
  allowSlidePrev: !0,
  allowSlideNext: !0,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: !0,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: !0,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  // NEW
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-blank",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideFullyVisibleClass: "swiper-slide-fully-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: !0,
  // Internals
  _emitClasses: !1
};
function ti(e, i) {
  return function(s = {}) {
    const a = Object.keys(s)[0], n = s[a];
    if (typeof n != "object" || n === null) {
      _(i, s);
      return;
    }
    if (e[a] === !0 && (e[a] = {
      enabled: !0
    }), a === "navigation" && e[a] && e[a].enabled && !e[a].prevEl && !e[a].nextEl && (e[a].auto = !0), ["pagination", "scrollbar"].indexOf(a) >= 0 && e[a] && e[a].enabled && !e[a].el && (e[a].auto = !0), !(a in e && "enabled" in n)) {
      _(i, s);
      return;
    }
    typeof e[a] == "object" && !("enabled" in e[a]) && (e[a].enabled = !0), e[a] || (e[a] = {
      enabled: !1
    }), _(i, s);
  };
}
const de = {
  eventsEmitter: Je,
  update: dt,
  translate: ht,
  transition: bt,
  slide: Pt,
  loop: At,
  grabCursor: Dt,
  events: Wt,
  breakpoints: Yt,
  checkOverflow: ei,
  classes: Jt
}, ce = {};
class N {
  constructor(...i) {
    let t, s;
    i.length === 1 && i[0].constructor && Object.prototype.toString.call(i[0]).slice(8, -1) === "Object" ? s = i[0] : [t, s] = i, s || (s = {}), s = _({}, s), t && !s.el && (s.el = t);
    const a = F();
    if (s.el && typeof s.el == "string" && a.querySelectorAll(s.el).length > 1) {
      const r = [];
      return a.querySelectorAll(s.el).forEach((d) => {
        const h = _({}, s, {
          el: d
        });
        r.push(new N(h));
      }), r;
    }
    const n = this;
    n.__swiper__ = !0, n.support = Ce(), n.device = Me({
      userAgent: s.userAgent
    }), n.browser = we(), n.eventsListeners = {}, n.eventsAnyListeners = [], n.modules = [...n.__modules__], s.modules && Array.isArray(s.modules) && s.modules.forEach((r) => {
      typeof r == "function" && n.modules.indexOf(r) < 0 && n.modules.push(r);
    });
    const l = {};
    n.modules.forEach((r) => {
      r({
        params: s,
        swiper: n,
        extendParams: ti(s, l),
        on: n.on.bind(n),
        once: n.once.bind(n),
        off: n.off.bind(n),
        emit: n.emit.bind(n)
      });
    });
    const o = _({}, be, l);
    return n.params = _({}, o, ce, s), n.originalParams = _({}, n.params), n.passedParams = _({}, s), n.params && n.params.on && Object.keys(n.params.on).forEach((r) => {
      n.on(r, n.params.on[r]);
    }), n.params && n.params.onAny && n.onAny(n.params.onAny), Object.assign(n, {
      enabled: n.params.enabled,
      el: t,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return n.params.direction === "horizontal";
      },
      isVertical() {
        return n.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: !0,
      isEnd: !1,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: !1,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: n.params.allowSlideNext,
      allowSlidePrev: n.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: n.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        pointerId: null,
        touchId: null
      },
      // Clicks
      allowClick: !0,
      // Touches
      allowTouchMove: n.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    }), n.emit("_swiper"), n.params.init && n.init(), n;
  }
  getDirectionLabel(i) {
    return this.isHorizontal() ? i : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    }[i];
  }
  getSlideIndex(i) {
    const {
      slidesEl: t,
      params: s
    } = this, a = H(t, `.${s.slideClass}, swiper-slide`), n = U(a[0]);
    return U(i) - n;
  }
  getSlideIndexByData(i) {
    return this.getSlideIndex(this.slides.find((t) => t.getAttribute("data-swiper-slide-index") * 1 === i));
  }
  getSlideIndexWhenGrid(i) {
    return this.grid && this.params.grid && this.params.grid.rows > 1 && (this.params.grid.fill === "column" ? i = Math.floor(i / this.params.grid.rows) : this.params.grid.fill === "row" && (i = i % Math.ceil(this.slides.length / this.params.grid.rows))), i;
  }
  recalcSlides() {
    const i = this, {
      slidesEl: t,
      params: s
    } = i;
    i.slides = H(t, `.${s.slideClass}, swiper-slide`);
  }
  enable() {
    const i = this;
    i.enabled || (i.enabled = !0, i.params.grabCursor && i.setGrabCursor(), i.emit("enable"));
  }
  disable() {
    const i = this;
    i.enabled && (i.enabled = !1, i.params.grabCursor && i.unsetGrabCursor(), i.emit("disable"));
  }
  setProgress(i, t) {
    const s = this;
    i = Math.min(Math.max(i, 0), 1);
    const a = s.minTranslate(), l = (s.maxTranslate() - a) * i + a;
    s.translateTo(l, typeof t > "u" ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const i = this;
    if (!i.params._emitClasses || !i.el) return;
    const t = i.el.className.split(" ").filter((s) => s.indexOf("swiper") === 0 || s.indexOf(i.params.containerModifierClass) === 0);
    i.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(i) {
    const t = this;
    return t.destroyed ? "" : i.className.split(" ").filter((s) => s.indexOf("swiper-slide") === 0 || s.indexOf(t.params.slideClass) === 0).join(" ");
  }
  emitSlidesClasses() {
    const i = this;
    if (!i.params._emitClasses || !i.el) return;
    const t = [];
    i.slides.forEach((s) => {
      const a = i.getSlideClasses(s);
      t.push({
        slideEl: s,
        classNames: a
      }), i.emit("_slideClass", s, a);
    }), i.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(i = "current", t = !1) {
    const s = this, {
      params: a,
      slides: n,
      slidesGrid: l,
      slidesSizesGrid: o,
      size: r,
      activeIndex: d
    } = s;
    let h = 1;
    if (typeof a.slidesPerView == "number") return a.slidesPerView;
    if (a.centeredSlides) {
      let u = n[d] ? Math.ceil(n[d].swiperSlideSize) : 0, y;
      for (let c = d + 1; c < n.length; c += 1)
        n[c] && !y && (u += Math.ceil(n[c].swiperSlideSize), h += 1, u > r && (y = !0));
      for (let c = d - 1; c >= 0; c -= 1)
        n[c] && !y && (u += n[c].swiperSlideSize, h += 1, u > r && (y = !0));
    } else if (i === "current")
      for (let u = d + 1; u < n.length; u += 1)
        (t ? l[u] + o[u] - l[d] < r : l[u] - l[d] < r) && (h += 1);
    else
      for (let u = d - 1; u >= 0; u -= 1)
        l[d] - l[u] < r && (h += 1);
    return h;
  }
  update() {
    const i = this;
    if (!i || i.destroyed) return;
    const {
      snapGrid: t,
      params: s
    } = i;
    s.breakpoints && i.setBreakpoint(), [...i.el.querySelectorAll('[loading="lazy"]')].forEach((l) => {
      l.complete && J(i, l);
    }), i.updateSize(), i.updateSlides(), i.updateProgress(), i.updateSlidesClasses();
    function a() {
      const l = i.rtlTranslate ? i.translate * -1 : i.translate, o = Math.min(Math.max(l, i.maxTranslate()), i.minTranslate());
      i.setTranslate(o), i.updateActiveIndex(), i.updateSlidesClasses();
    }
    let n;
    if (s.freeMode && s.freeMode.enabled && !s.cssMode)
      a(), s.autoHeight && i.updateAutoHeight();
    else {
      if ((s.slidesPerView === "auto" || s.slidesPerView > 1) && i.isEnd && !s.centeredSlides) {
        const l = i.virtual && s.virtual.enabled ? i.virtual.slides : i.slides;
        n = i.slideTo(l.length - 1, 0, !1, !0);
      } else
        n = i.slideTo(i.activeIndex, 0, !1, !0);
      n || a();
    }
    s.watchOverflow && t !== i.snapGrid && i.checkOverflow(), i.emit("update");
  }
  changeDirection(i, t = !0) {
    const s = this, a = s.params.direction;
    return i || (i = a === "horizontal" ? "vertical" : "horizontal"), i === a || i !== "horizontal" && i !== "vertical" || (s.el.classList.remove(`${s.params.containerModifierClass}${a}`), s.el.classList.add(`${s.params.containerModifierClass}${i}`), s.emitContainerClasses(), s.params.direction = i, s.slides.forEach((n) => {
      i === "vertical" ? n.style.width = "" : n.style.height = "";
    }), s.emit("changeDirection"), t && s.update()), s;
  }
  changeLanguageDirection(i) {
    const t = this;
    t.rtl && i === "rtl" || !t.rtl && i === "ltr" || (t.rtl = i === "rtl", t.rtlTranslate = t.params.direction === "horizontal" && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update());
  }
  mount(i) {
    const t = this;
    if (t.mounted) return !0;
    let s = i || t.params.el;
    if (typeof s == "string" && (s = document.querySelector(s)), !s)
      return !1;
    s.swiper = t, s.parentNode && s.parentNode.host && s.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
    const a = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let l = s && s.shadowRoot && s.shadowRoot.querySelector ? s.shadowRoot.querySelector(a()) : H(s, a())[0];
    return !l && t.params.createElements && (l = Y("div", t.params.wrapperClass), s.append(l), H(s, `.${t.params.slideClass}`).forEach((o) => {
      l.append(o);
    })), Object.assign(t, {
      el: s,
      wrapperEl: l,
      slidesEl: t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : l,
      hostEl: t.isElement ? s.parentNode.host : s,
      mounted: !0,
      // RTL
      rtl: s.dir.toLowerCase() === "rtl" || j(s, "direction") === "rtl",
      rtlTranslate: t.params.direction === "horizontal" && (s.dir.toLowerCase() === "rtl" || j(s, "direction") === "rtl"),
      wrongRTL: j(l, "display") === "-webkit-box"
    }), !0;
  }
  init(i) {
    const t = this;
    if (t.initialized || t.mount(i) === !1) return t;
    t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(void 0, !0), t.attachEvents();
    const a = [...t.el.querySelectorAll('[loading="lazy"]')];
    return t.isElement && a.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), a.forEach((n) => {
      n.complete ? J(t, n) : n.addEventListener("load", (l) => {
        J(t, l.target);
      });
    }), ue(t), t.initialized = !0, ue(t), t.emit("init"), t.emit("afterInit"), t;
  }
  destroy(i = !0, t = !0) {
    const s = this, {
      params: a,
      el: n,
      wrapperEl: l,
      slides: o
    } = s;
    return typeof s.params > "u" || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), a.loop && s.loopDestroy(), t && (s.removeClasses(), n && typeof n != "string" && n.removeAttribute("style"), l && l.removeAttribute("style"), o && o.length && o.forEach((r) => {
      r.classList.remove(a.slideVisibleClass, a.slideFullyVisibleClass, a.slideActiveClass, a.slideNextClass, a.slidePrevClass), r.removeAttribute("style"), r.removeAttribute("data-swiper-slide-index");
    })), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((r) => {
      s.off(r);
    }), i !== !1 && (s.el && typeof s.el != "string" && (s.el.swiper = null), $e(s)), s.destroyed = !0), null;
  }
  static extendDefaults(i) {
    _(ce, i);
  }
  static get extendedDefaults() {
    return ce;
  }
  static get defaults() {
    return be;
  }
  static installModule(i) {
    N.prototype.__modules__ || (N.prototype.__modules__ = []);
    const t = N.prototype.__modules__;
    typeof i == "function" && t.indexOf(i) < 0 && t.push(i);
  }
  static use(i) {
    return Array.isArray(i) ? (i.forEach((t) => N.installModule(t)), N) : (N.installModule(i), N);
  }
}
Object.keys(de).forEach((e) => {
  Object.keys(de[e]).forEach((i) => {
    N.prototype[i] = de[e][i];
  });
});
N.use([Ke, Ze]);
function ii({
  swiper: e,
  extendParams: i,
  on: t,
  emit: s
}) {
  const a = F(), n = V();
  e.keyboard = {
    enabled: !1
  }, i({
    keyboard: {
      enabled: !1,
      onlyInViewport: !0,
      pageUpDown: !0,
      speed: void 0
    }
  });
  function l(d) {
    if (!e.enabled) return;
    const {
      rtlTranslate: h
    } = e;
    let u = d;
    u.originalEvent && (u = u.originalEvent);
    const y = u.keyCode || u.charCode, c = e.params.keyboard.pageUpDown, m = c && y === 33, b = c && y === 34, E = y === 37, f = y === 39, p = y === 38, g = y === 40;
    if (!e.allowSlideNext && (e.isHorizontal() && f || e.isVertical() && g || b) || !e.allowSlidePrev && (e.isHorizontal() && E || e.isVertical() && p || m))
      return !1;
    if (u.shiftKey || u.altKey || u.ctrlKey || u.metaKey || a.activeElement && (a.activeElement.isContentEditable || a.activeElement.nodeName && (a.activeElement.nodeName.toLowerCase() === "input" || a.activeElement.nodeName.toLowerCase() === "textarea")))
      return;
    if (e.params.keyboard.onlyInViewport && (m || b || E || f || p || g)) {
      let x = !1;
      if (te(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 && te(e.el, `.${e.params.slideActiveClass}`).length === 0)
        return;
      const k = e.el, z = k.clientWidth, T = k.clientHeight, D = n.innerWidth, w = n.innerHeight, C = He(k);
      h && (C.left -= k.scrollLeft);
      const I = [[C.left, C.top], [C.left + z, C.top], [C.left, C.top + T], [C.left + z, C.top + T]];
      for (let O = 0; O < I.length; O += 1) {
        const A = I[O];
        if (A[0] >= 0 && A[0] <= D && A[1] >= 0 && A[1] <= w) {
          if (A[0] === 0 && A[1] === 0) continue;
          x = !0;
        }
      }
      if (!x) return;
    }
    const S = e.params.keyboard.speed;
    e.isHorizontal() ? ((m || b || E || f) && (u.preventDefault ? u.preventDefault() : u.returnValue = !1), ((b || f) && !h || (m || E) && h) && e.slideNext(S), ((m || E) && !h || (b || f) && h) && e.slidePrev(S)) : ((m || b || p || g) && (u.preventDefault ? u.preventDefault() : u.returnValue = !1), (b || g) && e.slideNext(S), (m || p) && e.slidePrev(S)), s("keyPress", y);
  }
  function o() {
    e.keyboard.enabled || (a.addEventListener("keydown", l), e.keyboard.enabled = !0);
  }
  function r() {
    e.keyboard.enabled && (a.removeEventListener("keydown", l), e.keyboard.enabled = !1);
  }
  t("init", () => {
    e.params.keyboard.enabled && o();
  }), t("destroy", () => {
    e.keyboard.enabled && r();
  }), Object.assign(e.keyboard, {
    enable: o,
    disable: r
  });
}
function Ie(e, i, t, s) {
  return e.params.createElements && Object.keys(s).forEach((a) => {
    if (!t[a] && t.auto === !0) {
      let n = H(e.el, `.${s[a]}`)[0];
      n || (n = Y("div", s[a]), n.className = s[a], e.el.append(n)), t[a] = n, i[a] = n;
    }
  }), t;
}
const Se = '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>';
function si({
  swiper: e,
  extendParams: i,
  on: t,
  emit: s
}) {
  i({
    navigation: {
      nextEl: null,
      prevEl: null,
      addIcons: !0,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  }), e.navigation = {
    nextEl: null,
    prevEl: null,
    arrowSvg: Se
  };
  function a(c) {
    let m;
    return c && typeof c == "string" && e.isElement && (m = e.el.querySelector(c) || e.hostEl.querySelector(c), m) ? m : (c && (typeof c == "string" && (m = [...document.querySelectorAll(c)]), e.params.uniqueNavElements && typeof c == "string" && m && m.length > 1 && e.el.querySelectorAll(c).length === 1 ? m = e.el.querySelector(c) : m && m.length === 1 && (m = m[0])), c && !m ? c : m);
  }
  function n(c, m) {
    const b = e.params.navigation;
    c = $(c), c.forEach((E) => {
      E && (E.classList[m ? "add" : "remove"](...b.disabledClass.split(" ")), E.tagName === "BUTTON" && (E.disabled = m), e.params.watchOverflow && e.enabled && E.classList[e.isLocked ? "add" : "remove"](b.lockClass));
    });
  }
  function l() {
    const {
      nextEl: c,
      prevEl: m
    } = e.navigation;
    if (e.params.loop) {
      n(m, !1), n(c, !1);
      return;
    }
    n(m, e.isBeginning && !e.params.rewind), n(c, e.isEnd && !e.params.rewind);
  }
  function o(c) {
    c.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), s("navigationPrev"));
  }
  function r(c) {
    c.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), s("navigationNext"));
  }
  function d() {
    const c = e.params.navigation;
    if (e.params.navigation = Ie(e, e.originalParams.navigation, e.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    }), !(c.nextEl || c.prevEl)) return;
    let m = a(c.nextEl), b = a(c.prevEl);
    Object.assign(e.navigation, {
      nextEl: m,
      prevEl: b
    }), m = $(m), b = $(b);
    const E = (f, p) => {
      if (f) {
        if (c.addIcons && f.matches(".swiper-button-next,.swiper-button-prev") && !f.querySelector("svg")) {
          const g = document.createElement("div");
          ie(g, Se), f.appendChild(g.querySelector("svg")), g.remove();
        }
        f.addEventListener("click", p === "next" ? r : o);
      }
      !e.enabled && f && f.classList.add(...c.lockClass.split(" "));
    };
    m.forEach((f) => E(f, "next")), b.forEach((f) => E(f, "prev"));
  }
  function h() {
    let {
      nextEl: c,
      prevEl: m
    } = e.navigation;
    c = $(c), m = $(m);
    const b = (E, f) => {
      E.removeEventListener("click", f === "next" ? r : o), E.classList.remove(...e.params.navigation.disabledClass.split(" "));
    };
    c.forEach((E) => b(E, "next")), m.forEach((E) => b(E, "prev"));
  }
  t("init", () => {
    e.params.navigation.enabled === !1 ? y() : (d(), l());
  }), t("toEdge fromEdge lock unlock", () => {
    l();
  }), t("destroy", () => {
    h();
  }), t("enable disable", () => {
    let {
      nextEl: c,
      prevEl: m
    } = e.navigation;
    if (c = $(c), m = $(m), e.enabled) {
      l();
      return;
    }
    [...c, ...m].filter((b) => !!b).forEach((b) => b.classList.add(e.params.navigation.lockClass));
  }), t("click", (c, m) => {
    let {
      nextEl: b,
      prevEl: E
    } = e.navigation;
    b = $(b), E = $(E);
    const f = m.target;
    let p = E.includes(f) || b.includes(f);
    if (e.isElement && !p) {
      const g = m.path || m.composedPath && m.composedPath();
      g && (p = g.find((S) => b.includes(S) || E.includes(S)));
    }
    if (e.params.navigation.hideOnClick && !p) {
      if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === f || e.pagination.el.contains(f))) return;
      let g;
      b.length ? g = b[0].classList.contains(e.params.navigation.hiddenClass) : E.length && (g = E[0].classList.contains(e.params.navigation.hiddenClass)), s(g === !0 ? "navigationShow" : "navigationHide"), [...b, ...E].filter((S) => !!S).forEach((S) => S.classList.toggle(e.params.navigation.hiddenClass));
    }
  });
  const u = () => {
    e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")), d(), l();
  }, y = () => {
    e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")), h();
  };
  Object.assign(e.navigation, {
    enable: u,
    disable: y,
    update: l,
    init: d,
    destroy: h
  });
}
function W(e = "") {
  return `.${e.trim().replace(/([\.:!+\/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1").replace(/ /g, ".")}`;
}
function ni({
  swiper: e,
  extendParams: i,
  on: t,
  emit: s
}) {
  const a = "swiper-pagination";
  i({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (f) => f,
      formatFractionTotal: (f) => f,
      bulletClass: `${a}-bullet`,
      bulletActiveClass: `${a}-bullet-active`,
      modifierClass: `${a}-`,
      currentClass: `${a}-current`,
      totalClass: `${a}-total`,
      hiddenClass: `${a}-hidden`,
      progressbarFillClass: `${a}-progressbar-fill`,
      progressbarOppositeClass: `${a}-progressbar-opposite`,
      clickableClass: `${a}-clickable`,
      lockClass: `${a}-lock`,
      horizontalClass: `${a}-horizontal`,
      verticalClass: `${a}-vertical`,
      paginationDisabledClass: `${a}-disabled`
    }
  }), e.pagination = {
    el: null,
    bullets: []
  };
  let n, l = 0;
  function o() {
    return !e.params.pagination.el || !e.pagination.el || Array.isArray(e.pagination.el) && e.pagination.el.length === 0;
  }
  function r(f, p) {
    const {
      bulletActiveClass: g
    } = e.params.pagination;
    f && (f = f[`${p === "prev" ? "previous" : "next"}ElementSibling`], f && (f.classList.add(`${g}-${p}`), f = f[`${p === "prev" ? "previous" : "next"}ElementSibling`], f && f.classList.add(`${g}-${p}-${p}`)));
  }
  function d(f, p, g) {
    if (f = f % g, p = p % g, p === f + 1)
      return "next";
    if (p === f - 1)
      return "previous";
  }
  function h(f) {
    const p = f.target.closest(W(e.params.pagination.bulletClass));
    if (!p)
      return;
    f.preventDefault();
    const g = U(p) * e.params.slidesPerGroup;
    if (e.params.loop) {
      if (e.realIndex === g) return;
      const S = d(e.realIndex, g, e.slides.length);
      S === "next" ? e.slideNext() : S === "previous" ? e.slidePrev() : e.slideToLoop(g);
    } else
      e.slideTo(g);
  }
  function u() {
    const f = e.rtl, p = e.params.pagination;
    if (o()) return;
    let g = e.pagination.el;
    g = $(g);
    let S, x;
    const k = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, z = e.params.loop ? Math.ceil(k / e.params.slidesPerGroup) : e.snapGrid.length;
    if (e.params.loop ? (x = e.previousRealIndex || 0, S = e.params.slidesPerGroup > 1 ? Math.floor(e.realIndex / e.params.slidesPerGroup) : e.realIndex) : typeof e.snapIndex < "u" ? (S = e.snapIndex, x = e.previousSnapIndex) : (x = e.previousIndex || 0, S = e.activeIndex || 0), p.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
      const T = e.pagination.bullets;
      let D, w, C;
      if (p.dynamicBullets && (n = fe(T[0], e.isHorizontal() ? "width" : "height"), g.forEach((I) => {
        I.style[e.isHorizontal() ? "width" : "height"] = `${n * (p.dynamicMainBullets + 4)}px`;
      }), p.dynamicMainBullets > 1 && x !== void 0 && (l += S - (x || 0), l > p.dynamicMainBullets - 1 ? l = p.dynamicMainBullets - 1 : l < 0 && (l = 0)), D = Math.max(S - l, 0), w = D + (Math.min(T.length, p.dynamicMainBullets) - 1), C = (w + D) / 2), T.forEach((I) => {
        const O = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((A) => `${p.bulletActiveClass}${A}`)].map((A) => typeof A == "string" && A.includes(" ") ? A.split(" ") : A).flat();
        I.classList.remove(...O);
      }), g.length > 1)
        T.forEach((I) => {
          const O = U(I);
          O === S ? I.classList.add(...p.bulletActiveClass.split(" ")) : e.isElement && I.setAttribute("part", "bullet"), p.dynamicBullets && (O >= D && O <= w && I.classList.add(...`${p.bulletActiveClass}-main`.split(" ")), O === D && r(I, "prev"), O === w && r(I, "next"));
        });
      else {
        const I = T[S];
        if (I && I.classList.add(...p.bulletActiveClass.split(" ")), e.isElement && T.forEach((O, A) => {
          O.setAttribute("part", A === S ? "bullet-active" : "bullet");
        }), p.dynamicBullets) {
          const O = T[D], A = T[w];
          for (let v = D; v <= w; v += 1)
            T[v] && T[v].classList.add(...`${p.bulletActiveClass}-main`.split(" "));
          r(O, "prev"), r(A, "next");
        }
      }
      if (p.dynamicBullets) {
        const I = Math.min(T.length, p.dynamicMainBullets + 4), O = (n * I - n) / 2 - C * n, A = f ? "right" : "left";
        T.forEach((v) => {
          v.style[e.isHorizontal() ? A : "top"] = `${O}px`;
        });
      }
    }
    g.forEach((T, D) => {
      if (p.type === "fraction" && (T.querySelectorAll(W(p.currentClass)).forEach((w) => {
        w.textContent = p.formatFractionCurrent(S + 1);
      }), T.querySelectorAll(W(p.totalClass)).forEach((w) => {
        w.textContent = p.formatFractionTotal(z);
      })), p.type === "progressbar") {
        let w;
        p.progressbarOpposite ? w = e.isHorizontal() ? "vertical" : "horizontal" : w = e.isHorizontal() ? "horizontal" : "vertical";
        const C = (S + 1) / z;
        let I = 1, O = 1;
        w === "horizontal" ? I = C : O = C, T.querySelectorAll(W(p.progressbarFillClass)).forEach((A) => {
          A.style.transform = `translate3d(0,0,0) scaleX(${I}) scaleY(${O})`, A.style.transitionDuration = `${e.params.speed}ms`;
        });
      }
      p.type === "custom" && p.renderCustom ? (ie(T, p.renderCustom(e, S + 1, z)), D === 0 && s("paginationRender", T)) : (D === 0 && s("paginationRender", T), s("paginationUpdate", T)), e.params.watchOverflow && e.enabled && T.classList[e.isLocked ? "add" : "remove"](p.lockClass);
    });
  }
  function y() {
    const f = e.params.pagination;
    if (o()) return;
    const p = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.grid && e.params.grid.rows > 1 ? e.slides.length / Math.ceil(e.params.grid.rows) : e.slides.length;
    let g = e.pagination.el;
    g = $(g);
    let S = "";
    if (f.type === "bullets") {
      let x = e.params.loop ? Math.ceil(p / e.params.slidesPerGroup) : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && x > p && (x = p);
      for (let k = 0; k < x; k += 1)
        f.renderBullet ? S += f.renderBullet.call(e, k, f.bulletClass) : S += `<${f.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${f.bulletClass}"></${f.bulletElement}>`;
    }
    f.type === "fraction" && (f.renderFraction ? S = f.renderFraction.call(e, f.currentClass, f.totalClass) : S = `<span class="${f.currentClass}"></span> / <span class="${f.totalClass}"></span>`), f.type === "progressbar" && (f.renderProgressbar ? S = f.renderProgressbar.call(e, f.progressbarFillClass) : S = `<span class="${f.progressbarFillClass}"></span>`), e.pagination.bullets = [], g.forEach((x) => {
      f.type !== "custom" && ie(x, S || ""), f.type === "bullets" && e.pagination.bullets.push(...x.querySelectorAll(W(f.bulletClass)));
    }), f.type !== "custom" && s("paginationRender", g[0]);
  }
  function c() {
    e.params.pagination = Ie(e, e.originalParams.pagination, e.params.pagination, {
      el: "swiper-pagination"
    });
    const f = e.params.pagination;
    if (!f.el) return;
    let p;
    typeof f.el == "string" && e.isElement && (p = e.el.querySelector(f.el)), !p && typeof f.el == "string" && (p = [...document.querySelectorAll(f.el)]), p || (p = f.el), !(!p || p.length === 0) && (e.params.uniqueNavElements && typeof f.el == "string" && Array.isArray(p) && p.length > 1 && (p = [...e.el.querySelectorAll(f.el)], p.length > 1 && (p = p.find((g) => te(g, ".swiper")[0] === e.el))), Array.isArray(p) && p.length === 1 && (p = p[0]), Object.assign(e.pagination, {
      el: p
    }), p = $(p), p.forEach((g) => {
      f.type === "bullets" && f.clickable && g.classList.add(...(f.clickableClass || "").split(" ")), g.classList.add(f.modifierClass + f.type), g.classList.add(e.isHorizontal() ? f.horizontalClass : f.verticalClass), f.type === "bullets" && f.dynamicBullets && (g.classList.add(`${f.modifierClass}${f.type}-dynamic`), l = 0, f.dynamicMainBullets < 1 && (f.dynamicMainBullets = 1)), f.type === "progressbar" && f.progressbarOpposite && g.classList.add(f.progressbarOppositeClass), f.clickable && g.addEventListener("click", h), e.enabled || g.classList.add(f.lockClass);
    }));
  }
  function m() {
    const f = e.params.pagination;
    if (o()) return;
    let p = e.pagination.el;
    p && (p = $(p), p.forEach((g) => {
      g.classList.remove(f.hiddenClass), g.classList.remove(f.modifierClass + f.type), g.classList.remove(e.isHorizontal() ? f.horizontalClass : f.verticalClass), f.clickable && (g.classList.remove(...(f.clickableClass || "").split(" ")), g.removeEventListener("click", h));
    })), e.pagination.bullets && e.pagination.bullets.forEach((g) => g.classList.remove(...f.bulletActiveClass.split(" ")));
  }
  t("changeDirection", () => {
    if (!e.pagination || !e.pagination.el) return;
    const f = e.params.pagination;
    let {
      el: p
    } = e.pagination;
    p = $(p), p.forEach((g) => {
      g.classList.remove(f.horizontalClass, f.verticalClass), g.classList.add(e.isHorizontal() ? f.horizontalClass : f.verticalClass);
    });
  }), t("init", () => {
    e.params.pagination.enabled === !1 ? E() : (c(), y(), u());
  }), t("activeIndexChange", () => {
    typeof e.snapIndex > "u" && u();
  }), t("snapIndexChange", () => {
    u();
  }), t("snapGridLengthChange", () => {
    y(), u();
  }), t("destroy", () => {
    m();
  }), t("enable disable", () => {
    let {
      el: f
    } = e.pagination;
    f && (f = $(f), f.forEach((p) => p.classList[e.enabled ? "remove" : "add"](e.params.pagination.lockClass)));
  }), t("lock unlock", () => {
    u();
  }), t("click", (f, p) => {
    const g = p.target, S = $(e.pagination.el);
    if (e.params.pagination.el && e.params.pagination.hideOnClick && S && S.length > 0 && !g.classList.contains(e.params.pagination.bulletClass)) {
      if (e.navigation && (e.navigation.nextEl && g === e.navigation.nextEl || e.navigation.prevEl && g === e.navigation.prevEl)) return;
      const x = S[0].classList.contains(e.params.pagination.hiddenClass);
      s(x === !0 ? "paginationShow" : "paginationHide"), S.forEach((k) => k.classList.toggle(e.params.pagination.hiddenClass));
    }
  });
  const b = () => {
    e.el.classList.remove(e.params.pagination.paginationDisabledClass);
    let {
      el: f
    } = e.pagination;
    f && (f = $(f), f.forEach((p) => p.classList.remove(e.params.pagination.paginationDisabledClass))), c(), y(), u();
  }, E = () => {
    e.el.classList.add(e.params.pagination.paginationDisabledClass);
    let {
      el: f
    } = e.pagination;
    f && (f = $(f), f.forEach((p) => p.classList.add(e.params.pagination.paginationDisabledClass))), m();
  };
  Object.assign(e.pagination, {
    enable: b,
    disable: E,
    render: y,
    update: u,
    init: c,
    destroy: m
  });
}
function ai({
  swiper: e,
  extendParams: i,
  on: t
}) {
  i({
    a11y: {
      enabled: !0,
      notificationClass: "swiper-notification",
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
      firstSlideMessage: "This is the first slide",
      lastSlideMessage: "This is the last slide",
      paginationBulletMessage: "Go to slide {{index}}",
      slideLabelMessage: "{{index}} / {{slidesLength}}",
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      containerRole: null,
      itemRoleDescriptionMessage: null,
      slideRole: "group",
      id: null,
      scrollOnFocus: !0,
      wrapperLiveRegion: !0
    }
  }), e.a11y = {
    clicked: !1
  };
  let s = null, a, n, l = (/* @__PURE__ */ new Date()).getTime();
  function o(v) {
    const M = s;
    M.length !== 0 && ie(M, v);
  }
  function r(v = 16) {
    const M = () => Math.round(16 * Math.random()).toString(16);
    return "x".repeat(v).replace(/x/g, M);
  }
  function d(v) {
    v = $(v), v.forEach((M) => {
      M.setAttribute("tabIndex", "0");
    });
  }
  function h(v) {
    v = $(v), v.forEach((M) => {
      M.setAttribute("tabIndex", "-1");
    });
  }
  function u(v, M) {
    v = $(v), v.forEach((L) => {
      L.setAttribute("role", M);
    });
  }
  function y(v, M) {
    v = $(v), v.forEach((L) => {
      L.setAttribute("aria-roledescription", M);
    });
  }
  function c(v, M) {
    v = $(v), v.forEach((L) => {
      L.setAttribute("aria-label", M);
    });
  }
  function m(v, M) {
    v = $(v), v.forEach((L) => {
      L.setAttribute("id", M);
    });
  }
  function b(v, M) {
    v = $(v), v.forEach((L) => {
      L.setAttribute("aria-live", M);
    });
  }
  function E(v) {
    v = $(v), v.forEach((M) => {
      M.setAttribute("aria-disabled", !0);
    });
  }
  function f(v) {
    v = $(v), v.forEach((M) => {
      M.removeAttribute("aria-disabled");
    });
  }
  function p(v) {
    if (v.keyCode !== 13 && v.keyCode !== 32) return;
    const M = e.params.a11y, L = v.target;
    if (!(e.pagination && e.pagination.el && (L === e.pagination.el || e.pagination.el.contains(v.target)) && !v.target.matches(W(e.params.pagination.bulletClass)))) {
      if (e.navigation && e.navigation.prevEl && e.navigation.nextEl) {
        const P = $(e.navigation.prevEl);
        $(e.navigation.nextEl).includes(L) && (e.isEnd && !e.params.loop || e.slideNext(), e.isEnd ? o(M.lastSlideMessage) : o(M.nextSlideMessage)), P.includes(L) && (e.isBeginning && !e.params.loop || e.slidePrev(), e.isBeginning ? o(M.firstSlideMessage) : o(M.prevSlideMessage));
      }
      e.pagination && L.matches(W(e.params.pagination.bulletClass)) && L.click();
    }
  }
  function g() {
    if (e.params.loop || e.params.rewind || !e.navigation) return;
    const {
      nextEl: v,
      prevEl: M
    } = e.navigation;
    M && (e.isBeginning ? (E(M), h(M)) : (f(M), d(M))), v && (e.isEnd ? (E(v), h(v)) : (f(v), d(v)));
  }
  function S() {
    return e.pagination && e.pagination.bullets && e.pagination.bullets.length;
  }
  function x() {
    return S() && e.params.pagination.clickable;
  }
  function k() {
    const v = e.params.a11y;
    S() && e.pagination.bullets.forEach((M) => {
      e.params.pagination.clickable && (d(M), e.params.pagination.renderBullet || (u(M, "button"), c(M, v.paginationBulletMessage.replace(/\{\{index\}\}/, U(M) + 1)))), M.matches(W(e.params.pagination.bulletActiveClass)) ? M.setAttribute("aria-current", "true") : M.removeAttribute("aria-current");
    });
  }
  const z = (v, M, L) => {
    d(v), v.tagName !== "BUTTON" && (u(v, "button"), v.addEventListener("keydown", p)), c(v, L);
  }, T = (v) => {
    n && n !== v.target && !n.contains(v.target) && (a = !0), e.a11y.clicked = !0;
  }, D = () => {
    a = !1, requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        e.destroyed || (e.a11y.clicked = !1);
      });
    });
  }, w = (v) => {
    l = (/* @__PURE__ */ new Date()).getTime();
  }, C = (v) => {
    if (e.a11y.clicked || !e.params.a11y.scrollOnFocus || (/* @__PURE__ */ new Date()).getTime() - l < 100) return;
    const M = v.target.closest(`.${e.params.slideClass}, swiper-slide`);
    if (!M || !e.slides.includes(M)) return;
    n = M;
    const L = e.virtual && e.params.virtual.enabled, P = (L ? parseInt(M.getAttribute("data-swiper-slide-index"), 10) : e.slides.indexOf(M)) === e.activeIndex, G = e.params.watchSlidesProgress && e.visibleSlides && e.visibleSlides.includes(M);
    P || G || v.sourceCapabilities && v.sourceCapabilities.firesTouchEvents || (e.isHorizontal() ? e.el.scrollLeft = 0 : e.el.scrollTop = 0, requestAnimationFrame(() => {
      a || (e.params.loop ? e.slideToLoop(e.getSlideIndexWhenGrid(parseInt(M.getAttribute("data-swiper-slide-index"))), 0) : L ? e.slideTo(e.getSlideIndexWhenGrid(parseInt(M.getAttribute("data-swiper-slide-index"), 10)), 0) : e.slideTo(e.getSlideIndexWhenGrid(e.slides.indexOf(M)), 0), a = !1);
    }));
  }, I = () => {
    const v = e.params.a11y;
    v.itemRoleDescriptionMessage && y(e.slides, v.itemRoleDescriptionMessage), v.slideRole && u(e.slides, v.slideRole);
    const M = e.slides.length;
    v.slideLabelMessage && e.slides.forEach((L, P) => {
      const G = e.params.loop ? parseInt(L.getAttribute("data-swiper-slide-index"), 10) : P, B = v.slideLabelMessage.replace(/\{\{index\}\}/, G + 1).replace(/\{\{slidesLength\}\}/, M);
      c(L, B);
    });
  }, O = () => {
    const v = e.params.a11y;
    e.el.append(s);
    const M = e.el;
    v.containerRoleDescriptionMessage && y(M, v.containerRoleDescriptionMessage), v.containerMessage && c(M, v.containerMessage), v.containerRole && u(M, v.containerRole);
    const L = e.wrapperEl, P = v.id || L.getAttribute("id") || `swiper-wrapper-${r(16)}`;
    if (m(L, P), v.wrapperLiveRegion) {
      const q = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
      b(L, q);
    }
    I();
    let {
      nextEl: G,
      prevEl: B
    } = e.navigation ? e.navigation : {};
    G = $(G), B = $(B), G && G.forEach((q) => z(q, P, v.nextSlideMessage)), B && B.forEach((q) => z(q, P, v.prevSlideMessage)), x() && $(e.pagination.el).forEach((ze) => {
      ze.addEventListener("keydown", p);
    }), F().addEventListener("visibilitychange", w), e.el.addEventListener("focus", C, !0), e.el.addEventListener("pointerdown", T, !0), e.el.addEventListener("pointerup", D, !0);
  };
  function A() {
    s && s.remove();
    let {
      nextEl: v,
      prevEl: M
    } = e.navigation ? e.navigation : {};
    v = $(v), M = $(M), v && v.forEach((P) => P.removeEventListener("keydown", p)), M && M.forEach((P) => P.removeEventListener("keydown", p)), x() && $(e.pagination.el).forEach((G) => {
      G.removeEventListener("keydown", p);
    }), F().removeEventListener("visibilitychange", w), e.el && typeof e.el != "string" && (e.el.removeEventListener("focus", C, !0), e.el.removeEventListener("pointerdown", T, !0), e.el.removeEventListener("pointerup", D, !0));
  }
  t("beforeInit", () => {
    s = Y("span", e.params.a11y.notificationClass), s.setAttribute("aria-live", "assertive"), s.setAttribute("aria-atomic", "true");
  }), t("afterInit", () => {
    e.params.a11y.enabled && O();
  }), t("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
    e.params.a11y.enabled && I();
  }), t("fromEdge toEdge afterInit lock unlock", () => {
    e.params.a11y.enabled && g();
  }), t("paginationUpdate", () => {
    e.params.a11y.enabled && k();
  }), t("destroy", () => {
    e.params.a11y.enabled && A();
  });
}
function ri({
  swiper: e,
  extendParams: i,
  on: t,
  emit: s,
  params: a
}) {
  e.autoplay = {
    running: !1,
    paused: !1,
    timeLeft: 0
  }, i({
    autoplay: {
      enabled: !1,
      delay: 3e3,
      waitForTransition: !0,
      disableOnInteraction: !1,
      stopOnLastSlide: !1,
      reverseDirection: !1,
      pauseOnMouseEnter: !1
    }
  });
  let n, l, o = a && a.autoplay ? a.autoplay.delay : 3e3, r = a && a.autoplay ? a.autoplay.delay : 3e3, d, h = (/* @__PURE__ */ new Date()).getTime(), u, y, c, m, b, E;
  function f(L) {
    !e || e.destroyed || !e.wrapperEl || L.target === e.wrapperEl && (e.wrapperEl.removeEventListener("transitionend", f), !(E || L.detail && L.detail.bySwiperTouchMove) && D());
  }
  const p = () => {
    if (e.destroyed || !e.autoplay.running) return;
    e.autoplay.paused ? u = !0 : u && (r = d, u = !1);
    const L = e.autoplay.paused ? d : h + r - (/* @__PURE__ */ new Date()).getTime();
    e.autoplay.timeLeft = L, s("autoplayTimeLeft", L, L / o), l = requestAnimationFrame(() => {
      p();
    });
  }, g = () => {
    let L;
    return e.virtual && e.params.virtual.enabled ? L = e.slides.find((G) => G.classList.contains("swiper-slide-active")) : L = e.slides[e.activeIndex], L ? parseInt(L.getAttribute("data-swiper-autoplay"), 10) : void 0;
  }, S = () => {
    let L = e.params.autoplay.delay;
    const P = g();
    return !Number.isNaN(P) && P > 0 && (L = P), L;
  }, x = (L) => {
    if (e.destroyed || !e.autoplay.running) return;
    cancelAnimationFrame(l), p();
    let P = L;
    typeof P > "u" && (P = S(), o = P, r = P), d = P;
    const G = e.params.speed, B = () => {
      !e || e.destroyed || (e.params.autoplay.reverseDirection ? !e.isBeginning || e.params.loop || e.params.rewind ? (e.slidePrev(G, !0, !0), s("autoplay")) : e.params.autoplay.stopOnLastSlide || (e.slideTo(e.slides.length - 1, G, !0, !0), s("autoplay")) : !e.isEnd || e.params.loop || e.params.rewind ? (e.slideNext(G, !0, !0), s("autoplay")) : e.params.autoplay.stopOnLastSlide || (e.slideTo(0, G, !0, !0), s("autoplay")), e.params.cssMode && (h = (/* @__PURE__ */ new Date()).getTime(), requestAnimationFrame(() => {
        x();
      })));
    };
    return P > 0 ? (clearTimeout(n), n = setTimeout(() => {
      B();
    }, P)) : requestAnimationFrame(() => {
      B();
    }), P;
  }, k = () => {
    h = (/* @__PURE__ */ new Date()).getTime(), e.autoplay.running = !0, x(), s("autoplayStart");
  }, z = () => {
    e.autoplay.running = !1, clearTimeout(n), cancelAnimationFrame(l), s("autoplayStop");
  }, T = (L, P) => {
    if (e.destroyed || !e.autoplay.running) return;
    clearTimeout(n), L || (b = !0);
    const G = () => {
      s("autoplayPause"), e.params.autoplay.waitForTransition ? e.wrapperEl.addEventListener("transitionend", f) : D();
    };
    if (e.autoplay.paused = !0, P) {
      G();
      return;
    }
    d = (d || e.params.autoplay.delay) - ((/* @__PURE__ */ new Date()).getTime() - h), !(e.isEnd && d < 0 && !e.params.loop) && (d < 0 && (d = 0), G());
  }, D = () => {
    e.isEnd && d < 0 && !e.params.loop || e.destroyed || !e.autoplay.running || (h = (/* @__PURE__ */ new Date()).getTime(), b ? (b = !1, x(d)) : x(), e.autoplay.paused = !1, s("autoplayResume"));
  }, w = () => {
    if (e.destroyed || !e.autoplay.running) return;
    const L = F();
    L.visibilityState === "hidden" && (b = !0, T(!0)), L.visibilityState === "visible" && D();
  }, C = (L) => {
    L.pointerType === "mouse" && (b = !0, E = !0, !(e.animating || e.autoplay.paused) && T(!0));
  }, I = (L) => {
    L.pointerType === "mouse" && (E = !1, e.autoplay.paused && D());
  }, O = () => {
    e.params.autoplay.pauseOnMouseEnter && (e.el.addEventListener("pointerenter", C), e.el.addEventListener("pointerleave", I));
  }, A = () => {
    e.el && typeof e.el != "string" && (e.el.removeEventListener("pointerenter", C), e.el.removeEventListener("pointerleave", I));
  }, v = () => {
    F().addEventListener("visibilitychange", w);
  }, M = () => {
    F().removeEventListener("visibilitychange", w);
  };
  t("init", () => {
    e.params.autoplay.enabled && (O(), v(), k());
  }), t("destroy", () => {
    A(), M(), e.autoplay.running && z();
  }), t("_freeModeStaticRelease", () => {
    (c || b) && D();
  }), t("_freeModeNoMomentumRelease", () => {
    e.params.autoplay.disableOnInteraction ? z() : T(!0, !0);
  }), t("beforeTransitionStart", (L, P, G) => {
    e.destroyed || !e.autoplay.running || (G || !e.params.autoplay.disableOnInteraction ? T(!0, !0) : z());
  }), t("sliderFirstMove", () => {
    if (!(e.destroyed || !e.autoplay.running)) {
      if (e.params.autoplay.disableOnInteraction) {
        z();
        return;
      }
      y = !0, c = !1, b = !1, m = setTimeout(() => {
        b = !0, c = !0, T(!0);
      }, 200);
    }
  }), t("touchEnd", () => {
    if (!(e.destroyed || !e.autoplay.running || !y)) {
      if (clearTimeout(m), clearTimeout(n), e.params.autoplay.disableOnInteraction) {
        c = !1, y = !1;
        return;
      }
      c && e.params.cssMode && D(), c = !1, y = !1;
    }
  }), t("slideChange", () => {
    e.destroyed || !e.autoplay.running || e.autoplay.paused && (d = S(), o = S());
  }), Object.assign(e.autoplay, {
    start: k,
    stop: z,
    pause: T,
    resume: D
  });
}
function ke(e) {
  const {
    effect: i,
    swiper: t,
    on: s,
    setTranslate: a,
    setTransition: n,
    overwriteParams: l,
    perspective: o,
    recreateShadows: r,
    getEffectParams: d
  } = e;
  s("beforeInit", () => {
    if (t.params.effect !== i) return;
    t.classNames.push(`${t.params.containerModifierClass}${i}`), o && o() && t.classNames.push(`${t.params.containerModifierClass}3d`);
    const u = l ? l() : {};
    Object.assign(t.params, u), Object.assign(t.originalParams, u);
  }), s("setTranslate _virtualUpdated", () => {
    t.params.effect === i && a();
  }), s("setTransition", (u, y) => {
    t.params.effect === i && n(y);
  }), s("transitionEnd", () => {
    if (t.params.effect === i && r) {
      if (!d || !d().slideShadows) return;
      t.slides.forEach((u) => {
        u.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((y) => y.remove());
      }), r();
    }
  });
  let h;
  s("virtualUpdate", () => {
    t.params.effect === i && (t.slides.length || (h = !0), requestAnimationFrame(() => {
      h && t.slides && t.slides.length && (a(), h = !1);
    }));
  });
}
function Ae(e, i) {
  const t = se(i);
  return t !== i && (t.style.backfaceVisibility = "hidden", t.style["-webkit-backface-visibility"] = "hidden"), t;
}
function Oe({
  swiper: e,
  duration: i,
  transformElements: t,
  allSlides: s
}) {
  const {
    activeIndex: a
  } = e;
  if (e.params.virtualTranslate && i !== 0) {
    let n = !1, l;
    l = t, l.forEach((o) => {
      We(o, () => {
        if (n || !e || e.destroyed) return;
        n = !0, e.animating = !1;
        const r = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0
        });
        e.wrapperEl.dispatchEvent(r);
      });
    });
  }
}
function li({
  swiper: e,
  extendParams: i,
  on: t
}) {
  i({
    fadeEffect: {
      crossFade: !1
    }
  }), ke({
    effect: "fade",
    swiper: e,
    on: t,
    setTranslate: () => {
      const {
        slides: n
      } = e, l = e.params.fadeEffect;
      for (let o = 0; o < n.length; o += 1) {
        const r = e.slides[o];
        let h = -r.swiperSlideOffset;
        e.params.virtualTranslate || (h -= e.translate);
        let u = 0;
        e.isHorizontal() || (u = h, h = 0);
        const y = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(r.progress), 0) : 1 + Math.min(Math.max(r.progress, -1), 0), c = Ae(l, r);
        c.style.opacity = y, c.style.transform = `translate3d(${h}px, ${u}px, 0px)`;
      }
    },
    setTransition: (n) => {
      const l = e.slides.map((o) => se(o));
      l.forEach((o) => {
        o.style.transitionDuration = `${n}ms`;
      }), Oe({
        swiper: e,
        duration: n,
        transformElements: l,
        allSlides: !0
      });
    },
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      spaceBetween: 0,
      virtualTranslate: !e.params.cssMode
    })
  });
}
function oi(e, i, t) {
  const s = `swiper-slide-shadow${` swiper-slide-shadow-${e}`}`, a = se(i);
  let n = a.querySelector(`.${s.split(" ").join(".")}`);
  return n || (n = Y("div", s.split(" ")), a.append(n)), n;
}
function di({
  swiper: e,
  extendParams: i,
  on: t
}) {
  i({
    creativeEffect: {
      limitProgress: 1,
      shadowPerProgress: !1,
      progressMultiplier: 1,
      perspective: !0,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      }
    }
  });
  const s = (l) => typeof l == "string" ? l : `${l}px`;
  ke({
    effect: "creative",
    swiper: e,
    on: t,
    setTranslate: () => {
      const {
        slides: l,
        wrapperEl: o,
        slidesSizesGrid: r
      } = e, d = e.params.creativeEffect, {
        progressMultiplier: h
      } = d, u = e.params.centeredSlides, y = je(e);
      if (u) {
        const c = r[0] / 2 - e.params.slidesOffsetBefore || 0;
        o.style.transform = `translateX(calc(50% - ${c}px))`;
      }
      for (let c = 0; c < l.length; c += 1) {
        const m = l[c], b = m.progress, E = Math.min(Math.max(m.progress, -d.limitProgress), d.limitProgress);
        let f = E;
        u || (f = Math.min(Math.max(m.originalProgress, -d.limitProgress), d.limitProgress));
        const p = m.swiperSlideOffset, g = [e.params.cssMode ? -p - e.translate : -p, 0, 0], S = [0, 0, 0];
        let x = !1;
        e.isHorizontal() || (g[1] = g[0], g[0] = 0);
        let k = {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          scale: 1,
          opacity: 1
        };
        E < 0 ? (k = d.next, x = !0) : E > 0 && (k = d.prev, x = !0), g.forEach((O, A) => {
          g[A] = `calc(${O}px + (${s(k.translate[A])} * ${Math.abs(E * h)}))`;
        }), S.forEach((O, A) => {
          let v = k.rotate[A] * Math.abs(E * h);
          S[A] = v;
        }), m.style.zIndex = -Math.abs(Math.round(b)) + l.length;
        const z = g.join(", "), T = `rotateX(${y(S[0])}deg) rotateY(${y(S[1])}deg) rotateZ(${y(S[2])}deg)`, D = f < 0 ? `scale(${1 + (1 - k.scale) * f * h})` : `scale(${1 - (1 - k.scale) * f * h})`, w = f < 0 ? 1 + (1 - k.opacity) * f * h : 1 - (1 - k.opacity) * f * h, C = `translate3d(${z}) ${T} ${D}`;
        if (x && k.shadow || !x) {
          let O = m.querySelector(".swiper-slide-shadow");
          if (!O && k.shadow && (O = oi("creative", m)), O) {
            const A = d.shadowPerProgress ? E * (1 / d.limitProgress) : E;
            O.style.opacity = Math.min(Math.max(Math.abs(A), 0), 1);
          }
        }
        const I = Ae(d, m);
        I.style.transform = C, I.style.opacity = w, k.origin && (I.style.transformOrigin = k.origin);
      }
    },
    setTransition: (l) => {
      const o = e.slides.map((r) => se(r));
      o.forEach((r) => {
        r.style.transitionDuration = `${l}ms`, r.querySelectorAll(".swiper-slide-shadow").forEach((d) => {
          d.style.transitionDuration = `${l}ms`;
        });
      }), Oe({
        swiper: e,
        duration: l,
        transformElements: o,
        allSlides: !0
      });
    },
    perspective: () => e.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: !0,
      virtualTranslate: !e.params.cssMode
    })
  });
}
function ci(e) {
  const i = getComputedStyle(e);
  i.getPropertyValue("--swiper-block-ratio").trim();
  const t = i.getPropertyValue("--swiper-block-height").trim();
  t && (e.style.height = t);
}
function K() {
  document.querySelectorAll(".swiper-block").forEach((i) => {
    if (i._swiperInstance) return;
    ci(i);
    let t = {};
    try {
      const o = i.dataset.swiperConfig;
      o && (t = JSON.parse(o));
    } catch (o) {
      console.warn("[swiper-block] Could not parse data-swiper-config", o);
    }
    const s = [ai, ii];
    t.navigation && s.push(si), t.pagination && s.push(ni), t.autoplay && s.push(ri);
    const a = t.effect ?? "slide";
    a === "fade" && s.push(li), a === "creative" && s.push(di);
    const n = {
      // Merge user config first, then layer in structural options
      ...t,
      modules: s,
      // Wrapper / slide selectors — use Swiper 12 defaults
      wrapperClass: "swiper-wrapper",
      slideClass: "swiper-slide",
      // Navigation
      navigation: t.navigation ? { nextEl: `#${i.id} .swiper-button-next`, prevEl: `#${i.id} .swiper-button-prev` } : !1,
      // Pagination
      pagination: t.pagination ? { el: `#${i.id} .swiper-pagination`, clickable: !0, dynamicBullets: !0 } : !1,
      // Autoplay (already structured correctly from PHP)
      autoplay: t.autoplay || !1,
      // Accessibility
      a11y: {
        enabled: !0,
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide"
      },
      // Keyboard
      keyboard: { enabled: !0, onlyInViewport: !0 },
      // Observer: re-init if DOM changes (useful with Turbo/Livewire)
      observer: !0,
      observeParents: !0,
      // Lazy loading (Swiper 12 native)
      lazyPreloadPrevNext: 1,
      // Creative effect defaults (PHP passes these but we also keep a fallback)
      creativeEffect: t.creativeEffect ?? {
        prev: { shadow: !0, translate: [0, 0, -400] },
        next: { translate: ["100%", 0, 0] }
      }
    }, l = new N(i, n);
    i._swiperInstance = l, i.querySelectorAll(".swiper-slide__img").forEach((o) => {
      var r;
      o.complete ? (r = o.closest(".swiper-slide__media")) == null || r.classList.add("is-loaded") : o.addEventListener("load", () => {
        var d;
        (d = o.closest(".swiper-slide__media")) == null || d.classList.add("is-loaded");
      }, { once: !0 });
    });
  });
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", K) : K();
document.addEventListener("turbo:render", K);
document.addEventListener("turbo:frame-render", K);
document.addEventListener("htmx:afterSettle", K);
export {
  K as initSwiperBlocks
};
//# sourceMappingURL=swiper-block.js.map
