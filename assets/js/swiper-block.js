function me(e) {
  return e !== null && typeof e == "object" && "constructor" in e && e.constructor === Object;
}
function ue(e = {}, i = {}) {
  const t = [
    "__proto__",
    "constructor",
    "prototype"
  ];
  Object.keys(i).filter((s) => t.indexOf(s) < 0).forEach((s) => {
    typeof e[s] > "u" ? e[s] = i[s] : me(i[s]) && me(e[s]) && Object.keys(i[s]).length > 0 && ue(e[s], i[s]);
  });
}
var Te = {
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
    return { initEvent() {
    } };
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
  return ue(e, Te), e;
}
var De = {
  document: Te,
  navigator: { userAgent: "" },
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
    return { getPropertyValue() {
      return "";
    } };
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
  return ue(e, De), e;
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
function J() {
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
function K(e) {
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
        r !== void 0 && r.enumerable && (K(i[o]) && K(s[o]) ? s[o].__swiper__ ? i[o] = s[o] : _(i[o], s[o]) : !K(i[o]) && K(s[o]) ? (i[o] = {}, s[o].__swiper__ ? i[o] = s[o] : _(i[o], s[o])) : i[o] = s[o]);
      }
    }
  }
  return i;
}
function j(e, i, t) {
  e.style.setProperty(i, t);
}
function xe({ swiper: e, targetPosition: i, side: t }) {
  const s = V(), a = -e.translate;
  let n = null, l;
  const o = e.params.speed;
  e.wrapperEl.style.scrollSnapType = "none", s.cancelAnimationFrame(e.cssModeFrameID);
  const r = i > a ? "next" : "prev", c = (u, v) => r === "next" && u >= v || r === "prev" && u <= v, m = () => {
    l = (/* @__PURE__ */ new Date()).getTime(), n === null && (n = l);
    const u = Math.max(Math.min((l - n) / o, 1), 0);
    let v = a + (0.5 - Math.cos(u * Math.PI) / 2) * (i - a);
    if (c(v, i) && (v = i), e.wrapperEl.scrollTo({ [t]: v }), c(v, i)) {
      e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({ [t]: v });
      }), s.cancelAnimationFrame(e.cssModeFrameID);
      return;
    }
    e.cssModeFrameID = s.requestAnimationFrame(m);
  };
  m();
}
function ie(e) {
  return e.querySelector(".swiper-slide-transform") || e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform") || e;
}
function N(e, i = "") {
  const t = V(), s = [...e.children];
  return t.HTMLSlotElement && e instanceof HTMLSlotElement && s.push(...e.assignedElements()), i ? s.filter((a) => a.matches(i)) : s;
}
function _e(e, i) {
  const t = [i];
  for (; t.length > 0; ) {
    const s = t.shift();
    if (e === s) return !0;
    t.push(...s.children, ...s.shadowRoot ? s.shadowRoot.children : [], ...s.assignedElements ? s.assignedElements() : []);
  }
}
function Ne(e, i) {
  const t = V();
  let s = i.contains(e);
  return !s && t.HTMLSlotElement && i instanceof HTMLSlotElement && (s = [...i.assignedElements()].includes(e), s || (s = _e(e, i))), s;
}
function Q(e) {
  try {
    console.warn(e);
    return;
  } catch {
  }
}
function X(e, i = []) {
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
function q(e, i) {
  return V().getComputedStyle(e, null).getPropertyValue(i);
}
function Y(e) {
  let i = e, t;
  if (i) {
    for (t = 0; (i = i.previousSibling) !== null; ) i.nodeType === 1 && (t += 1);
    return t;
  }
}
function ee(e, i) {
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
function ce(e, i, t) {
  const s = V();
  return t ? e[i === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(s.getComputedStyle(e, null).getPropertyValue(i === "width" ? "margin-right" : "margin-top")) + parseFloat(s.getComputedStyle(e, null).getPropertyValue(i === "width" ? "margin-left" : "margin-bottom")) : e.offsetWidth;
}
function G(e) {
  return (Array.isArray(e) ? e : [e]).filter((i) => !!i);
}
function je(e) {
  return (i) => Math.abs(i) > 0 && e.browser && e.browser.need3dFix && Math.abs(i) % 90 === 0 ? i + 1e-3 : i;
}
function te(e, i = "") {
  typeof trustedTypes < "u" ? e.innerHTML = trustedTypes.createPolicy("html", { createHTML: (t) => t }).createHTML(i) : e.innerHTML = i;
}
var se;
function Xe() {
  const e = V(), i = F();
  return {
    smoothScroll: i.documentElement && i.documentElement.style && "scrollBehavior" in i.documentElement.style,
    touch: !!("ontouchstart" in e || e.DocumentTouch && i instanceof e.DocumentTouch)
  };
}
function Ce() {
  return se || (se = Xe()), se;
}
var ne;
function Ye({ userAgent: e } = {}) {
  const i = Ce(), t = V(), s = t.navigator.platform, a = e || t.navigator.userAgent, n = {
    ios: !1,
    android: !1
  }, l = t.screen.width, o = t.screen.height, r = a.match(/(Android);?[\s\/]+([\d.]+)?/);
  let c = a.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
  const m = a.match(/(iPod)(.*OS\s([\d_]+))?/), u = !c && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/), v = s === "Win32";
  let p = s === "MacIntel";
  return !c && p && i.touch && [
    "1024x1366",
    "1366x1024",
    "834x1194",
    "1194x834",
    "834x1112",
    "1112x834",
    "768x1024",
    "1024x768",
    "820x1180",
    "1180x820",
    "810x1080",
    "1080x810"
  ].indexOf(`${l}x${o}`) >= 0 && (c = a.match(/(Version)\/([\d.]+)/), c || (c = [
    0,
    1,
    "13_0_0"
  ]), p = !1), r && !v && (n.os = "android", n.android = !0), (c || u || m) && (n.os = "ios", n.ios = !0), n;
}
function Me(e = {}) {
  return ne || (ne = Ye(e)), ne;
}
var ae;
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
      const [r, c] = o.split("Version/")[1].split(" ")[0].split(".").map((m) => Number(m));
      t = r < 16 || r === 16 && c < 2;
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
function Pe() {
  return ae || (ae = Ue()), ae;
}
function Ke({ swiper: e, on: i, emit: t }) {
  const s = V();
  let a = null, n = null;
  const l = () => {
    !e || e.destroyed || !e.initialized || (t("beforeResize"), t("resize"));
  }, o = () => {
    !e || e.destroyed || !e.initialized || (a = new ResizeObserver((m) => {
      n = s.requestAnimationFrame(() => {
        const { width: u, height: v } = e;
        let p = u, h = v;
        m.forEach(({ contentBoxSize: S, contentRect: E, target: d }) => {
          d && d !== e.el || (p = E ? E.width : (S[0] || S).inlineSize, h = E ? E.height : (S[0] || S).blockSize);
        }), (p !== u || h !== v) && l();
      });
    }), a.observe(e.el));
  }, r = () => {
    n && s.cancelAnimationFrame(n), a && a.unobserve && e.el && (a.unobserve(e.el), a = null);
  }, c = () => {
    !e || e.destroyed || !e.initialized || t("orientationchange");
  };
  i("init", () => {
    if (e.params.resizeObserver && typeof s.ResizeObserver < "u") {
      o();
      return;
    }
    s.addEventListener("resize", l), s.addEventListener("orientationchange", c);
  }), i("destroy", () => {
    r(), s.removeEventListener("resize", l), s.removeEventListener("orientationchange", c);
  });
}
function Ze({ swiper: e, extendParams: i, on: t, emit: s }) {
  const a = [], n = V(), l = (c, m = {}) => {
    const u = new (n.MutationObserver || n.WebkitMutationObserver)((v) => {
      if (e.__preventObserver__) return;
      if (v.length === 1) {
        s("observerUpdate", v[0]);
        return;
      }
      const p = function() {
        s("observerUpdate", v[0]);
      };
      n.requestAnimationFrame ? n.requestAnimationFrame(p) : n.setTimeout(p, 0);
    });
    u.observe(c, {
      attributes: typeof m.attributes > "u" ? !0 : m.attributes,
      childList: e.isElement || (typeof m.childList > "u" ? !0 : m).childList,
      characterData: typeof m.characterData > "u" ? !0 : m.characterData
    }), a.push(u);
  }, o = () => {
    if (e.params.observer) {
      if (e.params.observeParents) {
        const c = ee(e.hostEl);
        for (let m = 0; m < c.length; m += 1) l(c[m]);
      }
      l(e.hostEl, { childList: e.params.observeSlideChildren }), l(e.wrapperEl, { attributes: !1 });
    }
  }, r = () => {
    a.forEach((c) => {
      c.disconnect();
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
    return typeof e[0] == "string" || Array.isArray(e[0]) ? (t = e[0], s = e.slice(1, e.length), a = i) : (t = e[0].events, s = e[0].data, a = e[0].context || i), s.unshift(a), (Array.isArray(t) ? t : t.split(" ")).forEach((n) => {
      i.eventsAnyListeners && i.eventsAnyListeners.length && i.eventsAnyListeners.forEach((l) => {
        l.apply(a, [n, ...s]);
      }), i.eventsListeners && i.eventsListeners[n] && i.eventsListeners[n].forEach((l) => {
        l.apply(a, s);
      });
    }), i;
  }
};
function Qe() {
  const e = this;
  let i, t;
  const s = e.el;
  typeof e.params.width < "u" && e.params.width !== null ? i = e.params.width : i = s.clientWidth, typeof e.params.height < "u" && e.params.height !== null ? t = e.params.height : t = s.clientHeight, !(i === 0 && e.isHorizontal() || t === 0 && e.isVertical()) && (i = i - parseInt(q(s, "padding-left") || 0, 10) - parseInt(q(s, "padding-right") || 0, 10), t = t - parseInt(q(s, "padding-top") || 0, 10) - parseInt(q(s, "padding-bottom") || 0, 10), Number.isNaN(i) && (i = 0), Number.isNaN(t) && (t = 0), Object.assign(e, {
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
  const t = e.params, { wrapperEl: s, slidesEl: a, rtlTranslate: n, wrongRTL: l } = e, o = e.virtual && t.virtual.enabled, r = o ? e.virtual.slides.length : e.slides.length, c = N(a, `.${e.params.slideClass}, swiper-slide`), m = o ? e.virtual.slides.length : c.length;
  let u = [];
  const v = [], p = [];
  let h = t.slidesOffsetBefore;
  typeof h == "function" && (h = t.slidesOffsetBefore.call(e));
  let S = t.slidesOffsetAfter;
  typeof S == "function" && (S = t.slidesOffsetAfter.call(e));
  const E = e.snapGrid.length, d = e.slidesGrid.length, f = e.size - h - S;
  let g = t.spaceBetween, b = -h, x = 0, I = 0;
  if (typeof f > "u") return;
  typeof g == "string" && g.indexOf("%") >= 0 ? g = parseFloat(g.replace("%", "")) / 100 * f : typeof g == "string" && (g = parseFloat(g)), e.virtualSize = -g - h - S, c.forEach((w) => {
    n ? w.style.marginLeft = "" : w.style.marginRight = "", w.style.marginBottom = "", w.style.marginTop = "";
  }), t.centeredSlides && t.cssMode && (j(s, "--swiper-centered-offset-before", ""), j(s, "--swiper-centered-offset-after", "")), t.cssMode && (j(s, "--swiper-slides-offset-before", `${h}px`), j(s, "--swiper-slides-offset-after", `${S}px`));
  const z = t.grid && t.grid.rows > 1 && e.grid;
  z ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
  let P;
  const D = t.slidesPerView === "auto" && t.breakpoints && Object.keys(t.breakpoints).filter((w) => typeof t.breakpoints[w].slidesPerView < "u").length > 0;
  for (let w = 0; w < m; w += 1) {
    P = 0;
    const C = c[w];
    if (!(C && (z && e.grid.updateSlide(w, C, c), q(C, "display") === "none"))) {
      if (o && t.slidesPerView === "auto")
        t.virtual.slidesPerViewAutoSlideSize && (P = t.virtual.slidesPerViewAutoSlideSize), P && C && (t.roundLengths && (P = Math.floor(P)), C.style[e.getDirectionLabel("width")] = `${P}px`);
      else if (t.slidesPerView === "auto") {
        D && (C.style[e.getDirectionLabel("width")] = "");
        const L = getComputedStyle(C), A = C.style.transform, k = C.style.webkitTransform;
        if (A && (C.style.transform = "none"), k && (C.style.webkitTransform = "none"), t.roundLengths) P = e.isHorizontal() ? ce(C, "width", !0) : ce(C, "height", !0);
        else {
          const y = i(L, "width"), M = i(L, "padding-left"), T = i(L, "padding-right"), O = i(L, "margin-left"), $ = i(L, "margin-right"), B = L.getPropertyValue("box-sizing");
          if (B && B === "border-box") P = y + O + $;
          else {
            const { clientWidth: W, offsetWidth: ze } = C;
            P = y + M + T + O + $ + (ze - W);
          }
        }
        A && (C.style.transform = A), k && (C.style.webkitTransform = k), t.roundLengths && (P = Math.floor(P));
      } else
        P = (f - (t.slidesPerView - 1) * g) / t.slidesPerView, t.roundLengths && (P = Math.floor(P)), C && (C.style[e.getDirectionLabel("width")] = `${P}px`);
      C && (C.swiperSlideSize = P), p.push(P), t.centeredSlides ? (b = b + P / 2 + x / 2 + g, x === 0 && w !== 0 && (b = b - f / 2 - g), w === 0 && (b = b - f / 2 - g), Math.abs(b) < 1 / 1e3 && (b = 0), t.roundLengths && (b = Math.floor(b)), I % t.slidesPerGroup === 0 && u.push(b), v.push(b)) : (t.roundLengths && (b = Math.floor(b)), (I - Math.min(e.params.slidesPerGroupSkip, I)) % e.params.slidesPerGroup === 0 && u.push(b), v.push(b), b = b + P + g), e.virtualSize += P + g, x = P, I += 1;
    }
  }
  if (e.virtualSize = Math.max(e.virtualSize, f) + S, n && l && (t.effect === "slide" || t.effect === "coverflow") && (s.style.width = `${e.virtualSize + g}px`), t.setWrapperSize && (s.style[e.getDirectionLabel("width")] = `${e.virtualSize + g}px`), z && e.grid.updateWrapperSize(P, u), !t.centeredSlides) {
    const w = t.slidesPerView !== "auto" && t.slidesPerView % 1 !== 0, C = t.snapToSlideEdge && !t.loop && (t.slidesPerView === "auto" || w);
    let L = u.length;
    if (C) {
      let k;
      if (t.slidesPerView === "auto") {
        k = 1;
        let y = 0;
        for (let M = p.length - 1; M >= 0 && (y += p[M] + (M < p.length - 1 ? g : 0), y <= f); M -= 1)
          k = p.length - M;
      } else k = Math.floor(t.slidesPerView);
      L = Math.max(m - k, 0);
    }
    const A = [];
    for (let k = 0; k < u.length; k += 1) {
      let y = u[k];
      t.roundLengths && (y = Math.floor(y)), C ? k <= L && A.push(y) : u[k] <= e.virtualSize - f && A.push(y);
    }
    u = A, Math.floor(e.virtualSize - f) - Math.floor(u[u.length - 1]) > 1 && (C || u.push(e.virtualSize - f));
  }
  if (o && t.loop) {
    const w = p[0] + g;
    if (t.slidesPerGroup > 1) {
      const C = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / t.slidesPerGroup), L = w * t.slidesPerGroup;
      for (let A = 0; A < C; A += 1) u.push(u[u.length - 1] + L);
    }
    for (let C = 0; C < e.virtual.slidesBefore + e.virtual.slidesAfter; C += 1)
      t.slidesPerGroup === 1 && u.push(u[u.length - 1] + w), v.push(v[v.length - 1] + w), e.virtualSize += w;
  }
  if (u.length === 0 && (u = [0]), g !== 0) {
    const w = e.isHorizontal() && n ? "marginLeft" : e.getDirectionLabel("marginRight");
    c.filter((C, L) => !t.cssMode || t.loop ? !0 : L !== c.length - 1).forEach((C) => {
      C.style[w] = `${g}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let w = 0;
    p.forEach((L) => {
      w += L + (g || 0);
    }), w -= g;
    const C = w > f ? w - f : 0;
    u = u.map((L) => L <= 0 ? -h : L > C ? C + S : L);
  }
  if (t.centerInsufficientSlides) {
    let w = 0;
    if (p.forEach((C) => {
      w += C + (g || 0);
    }), w -= g, w < f) {
      const C = (f - w) / 2;
      u.forEach((L, A) => {
        u[A] = L - C;
      }), v.forEach((L, A) => {
        v[A] = L + C;
      });
    }
  }
  if (Object.assign(e, {
    slides: c,
    snapGrid: u,
    slidesGrid: v,
    slidesSizesGrid: p
  }), t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
    j(s, "--swiper-centered-offset-before", `${-u[0]}px`), j(s, "--swiper-centered-offset-after", `${e.size / 2 - p[p.length - 1] / 2}px`);
    const w = -e.snapGrid[0], C = -e.slidesGrid[0];
    e.snapGrid = e.snapGrid.map((L) => L + w), e.slidesGrid = e.slidesGrid.map((L) => L + C);
  }
  if (m !== r && e.emit("slidesLengthChange"), u.length !== E && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), v.length !== d && e.emit("slidesGridLengthChange"), t.watchSlidesProgress && e.updateSlidesOffset(), e.emit("slidesUpdated"), !o && !t.cssMode && (t.effect === "slide" || t.effect === "fade")) {
    const w = `${t.containerModifierClass}backface-hidden`, C = e.el.classList.contains(w);
    m <= t.maxBackfaceHiddenSlides ? C || e.el.classList.add(w) : C && e.el.classList.remove(w);
  }
}
function tt(e) {
  const i = this, t = [], s = i.virtual && i.params.virtual.enabled;
  let a = 0, n;
  typeof e == "number" ? i.setTransition(e) : e === !0 && i.setTransition(i.params.speed);
  const l = (o) => s ? i.slides[i.getSlideIndexByData(o)] : i.slides[o];
  if (i.params.slidesPerView !== "auto" && i.params.slidesPerView > 1) if (i.params.centeredSlides) (i.visibleSlides || []).forEach((o) => {
    t.push(o);
  });
  else for (n = 0; n < Math.ceil(i.params.slidesPerView); n += 1) {
    const o = i.activeIndex + n;
    if (o > i.slides.length && !s) break;
    t.push(l(o));
  }
  else t.push(l(i.activeIndex));
  for (n = 0; n < t.length; n += 1) if (typeof t[n] < "u") {
    const o = t[n].offsetHeight;
    a = o > a ? o : a;
  }
  (a || a === 0) && (i.wrapperEl.style.height = `${a}px`);
}
function it() {
  const e = this, i = e.slides, t = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
  for (let s = 0; s < i.length; s += 1) i[s].swiperSlideOffset = (e.isHorizontal() ? i[s].offsetLeft : i[s].offsetTop) - t - e.cssOverflowAdjustment();
}
var he = (e, i, t) => {
  i && !e.classList.contains(t) ? e.classList.add(t) : !i && e.classList.contains(t) && e.classList.remove(t);
};
function st(e = this && this.translate || 0) {
  const i = this, t = i.params, { slides: s, rtlTranslate: a, snapGrid: n } = i;
  if (s.length === 0) return;
  typeof s[0].swiperSlideOffset > "u" && i.updateSlidesOffset();
  let l = -e;
  a && (l = e), i.visibleSlidesIndexes = [], i.visibleSlides = [];
  let o = t.spaceBetween;
  typeof o == "string" && o.indexOf("%") >= 0 ? o = parseFloat(o.replace("%", "")) / 100 * i.size : typeof o == "string" && (o = parseFloat(o));
  for (let r = 0; r < s.length; r += 1) {
    const c = s[r];
    let m = c.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (m -= s[0].swiperSlideOffset);
    const u = (l + (t.centeredSlides ? i.minTranslate() : 0) - m) / (c.swiperSlideSize + o), v = (l - n[0] + (t.centeredSlides ? i.minTranslate() : 0) - m) / (c.swiperSlideSize + o), p = -(l - m), h = p + i.slidesSizesGrid[r], S = p >= 0 && p <= i.size - i.slidesSizesGrid[r], E = p >= 0 && p < i.size - 1 || h > 1 && h <= i.size || p <= 0 && h >= i.size;
    E && (i.visibleSlides.push(c), i.visibleSlidesIndexes.push(r)), he(c, E, t.slideVisibleClass), he(c, S, t.slideFullyVisibleClass), c.progress = a ? -u : u, c.originalProgress = a ? -v : v;
  }
}
function nt(e) {
  const i = this;
  if (typeof e > "u") {
    const m = i.rtlTranslate ? -1 : 1;
    e = i && i.translate && i.translate * m || 0;
  }
  const t = i.params, s = i.maxTranslate() - i.minTranslate();
  let { progress: a, isBeginning: n, isEnd: l, progressLoop: o } = i;
  const r = n, c = l;
  if (s === 0)
    a = 0, n = !0, l = !0;
  else {
    a = (e - i.minTranslate()) / s;
    const m = Math.abs(e - i.minTranslate()) < 1, u = Math.abs(e - i.maxTranslate()) < 1;
    n = m || a <= 0, l = u || a >= 1, m && (a = 0), u && (a = 1);
  }
  if (t.loop) {
    const m = i.getSlideIndexByData(0), u = i.getSlideIndexByData(i.slides.length - 1), v = i.slidesGrid[m], p = i.slidesGrid[u], h = i.slidesGrid[i.slidesGrid.length - 1], S = Math.abs(e);
    S >= v ? o = (S - v) / h : o = (S + h - p) / h, o > 1 && (o -= 1);
  }
  Object.assign(i, {
    progress: a,
    progressLoop: o,
    isBeginning: n,
    isEnd: l
  }), (t.watchSlidesProgress || t.centeredSlides && t.autoHeight) && i.updateSlidesProgress(e), n && !r && i.emit("reachBeginning toEdge"), l && !c && i.emit("reachEnd toEdge"), (r && !n || c && !l) && i.emit("fromEdge"), i.emit("progress", a);
}
var re = (e, i, t) => {
  i && !e.classList.contains(t) ? e.classList.add(t) : !i && e.classList.contains(t) && e.classList.remove(t);
};
function at() {
  const e = this, { slides: i, params: t, slidesEl: s, activeIndex: a } = e, n = e.virtual && t.virtual.enabled, l = e.grid && t.grid && t.grid.rows > 1, o = (u) => N(s, `.${t.slideClass}${u}, swiper-slide${u}`)[0];
  let r, c, m;
  if (n) if (t.loop) {
    let u = a - e.virtual.slidesBefore;
    u < 0 && (u = e.virtual.slides.length + u), u >= e.virtual.slides.length && (u -= e.virtual.slides.length), r = o(`[data-swiper-slide-index="${u}"]`);
  } else r = o(`[data-swiper-slide-index="${a}"]`);
  else l ? (r = i.find((u) => u.column === a), m = i.find((u) => u.column === a + 1), c = i.find((u) => u.column === a - 1)) : r = i[a];
  r && (l || (m = qe(r, `.${t.slideClass}, swiper-slide`)[0], t.loop && !m && (m = i[0]), c = Re(r, `.${t.slideClass}, swiper-slide`)[0], t.loop)), i.forEach((u) => {
    re(u, u === r, t.slideActiveClass), re(u, u === m, t.slideNextClass), re(u, u === c, t.slidePrevClass);
  }), e.emitSlidesClasses();
}
var Z = (e, i) => {
  if (!e || e.destroyed || !e.params) return;
  const t = () => e.isElement ? "swiper-slide" : `.${e.params.slideClass}`, s = i.closest(t());
  if (s) {
    let a = s.querySelector(`.${e.params.lazyPreloaderClass}`);
    !a && e.isElement && (s.shadowRoot ? a = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
      s.shadowRoot && (a = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`), a && !a.lazyPreloaderManaged && a.remove());
    })), a && !a.lazyPreloaderManaged && a.remove();
  }
}, le = (e, i) => {
  if (!e.slides[i]) return;
  const t = e.slides[i].querySelector('[loading="lazy"]');
  t && t.removeAttribute("loading");
}, fe = (e) => {
  if (!e || e.destroyed || !e.params) return;
  let i = e.params.lazyPreloadPrevNext;
  const t = e.slides.length;
  if (!t || !i || i < 0) return;
  i = Math.min(i, t);
  const s = e.params.slidesPerView === "auto" ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), a = e.activeIndex;
  if (e.params.grid && e.params.grid.rows > 1) {
    const l = a, o = [l - i];
    o.push(...Array.from({ length: i }).map((r, c) => l + s + c)), e.slides.forEach((r, c) => {
      o.includes(r.column) && le(e, c);
    });
    return;
  }
  const n = a + s - 1;
  if (e.params.rewind || e.params.loop) for (let l = a - i; l <= n + i; l += 1) {
    const o = (l % t + t) % t;
    (o < a || o > n) && le(e, o);
  }
  else for (let l = Math.max(a - i, 0); l <= Math.min(n + i, t - 1); l += 1) l !== a && (l > n || l < a) && le(e, l);
};
function rt(e) {
  const { slidesGrid: i, params: t } = e, s = e.rtlTranslate ? e.translate : -e.translate;
  let a;
  for (let n = 0; n < i.length; n += 1) typeof i[n + 1] < "u" ? s >= i[n] && s < i[n + 1] - (i[n + 1] - i[n]) / 2 ? a = n : s >= i[n] && s < i[n + 1] && (a = n + 1) : s >= i[n] && (a = n);
  return t.normalizeSlideIndex && (a < 0 || typeof a > "u") && (a = 0), a;
}
function lt(e) {
  const i = this, t = i.rtlTranslate ? i.translate : -i.translate, { snapGrid: s, params: a, activeIndex: n, realIndex: l, snapIndex: o } = i;
  let r = e, c;
  const m = (p) => {
    let h = p - i.virtual.slidesBefore;
    return h < 0 && (h = i.virtual.slides.length + h), h >= i.virtual.slides.length && (h -= i.virtual.slides.length), h;
  };
  if (typeof r > "u" && (r = rt(i)), s.indexOf(t) >= 0) c = s.indexOf(t);
  else {
    const p = Math.min(a.slidesPerGroupSkip, r);
    c = p + Math.floor((r - p) / a.slidesPerGroup);
  }
  if (c >= s.length && (c = s.length - 1), r === n && !i.params.loop) {
    c !== o && (i.snapIndex = c, i.emit("snapIndexChange"));
    return;
  }
  if (r === n && i.params.loop && i.virtual && i.params.virtual.enabled) {
    i.realIndex = m(r);
    return;
  }
  const u = i.grid && a.grid && a.grid.rows > 1;
  let v;
  if (i.virtual && a.virtual.enabled) a.loop ? v = m(r) : v = r;
  else if (u) {
    const p = i.slides.find((S) => S.column === r);
    let h = parseInt(p.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(h) && (h = Math.max(i.slides.indexOf(p), 0)), v = Math.floor(h / a.grid.rows);
  } else if (i.slides[r]) {
    const p = i.slides[r].getAttribute("data-swiper-slide-index");
    p ? v = parseInt(p, 10) : v = r;
  } else v = r;
  Object.assign(i, {
    previousSnapIndex: o,
    snapIndex: c,
    previousRealIndex: l,
    realIndex: v,
    previousIndex: n,
    activeIndex: r
  }), i.initialized && fe(i), i.emit("activeIndexChange"), i.emit("snapIndexChange"), (i.initialized || i.params.runCallbacksOnInit) && (l !== v && i.emit("realIndexChange"), i.emit("slideChange"));
}
function ot(e, i) {
  const t = this, s = t.params;
  let a = e.closest(`.${s.slideClass}, swiper-slide`);
  !a && t.isElement && i && i.length > 1 && i.includes(e) && [...i.slice(i.indexOf(e) + 1, i.length)].forEach((o) => {
    !a && o.matches && o.matches(`.${s.slideClass}, swiper-slide`) && (a = o);
  });
  let n = !1, l;
  if (a) {
    for (let o = 0; o < t.slides.length; o += 1) if (t.slides[o] === a) {
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
  const i = this, { params: t, rtlTranslate: s, translate: a, wrapperEl: n } = i;
  if (t.virtualTranslate) return s ? -a : a;
  if (t.cssMode) return a;
  let l = Ve(n, e);
  return l += i.cssOverflowAdjustment(), s && (l = -l), l || 0;
}
function ft(e, i) {
  const t = this, { rtlTranslate: s, params: a, wrapperEl: n, progress: l } = t;
  let o = 0, r = 0;
  const c = 0;
  t.isHorizontal() ? o = s ? -e : e : r = e, a.roundLengths && (o = Math.floor(o), r = Math.floor(r)), t.previousTranslate = t.translate, t.translate = t.isHorizontal() ? o : r, a.cssMode ? n[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal() ? -o : -r : a.virtualTranslate || (t.isHorizontal() ? o -= t.cssOverflowAdjustment() : r -= t.cssOverflowAdjustment(), n.style.transform = `translate3d(${o}px, ${r}px, ${c}px)`);
  let m;
  const u = t.maxTranslate() - t.minTranslate();
  u === 0 ? m = 0 : m = (e - t.minTranslate()) / u, m !== l && t.updateProgress(e), t.emit("setTranslate", t.translate, i);
}
function ut() {
  return -this.snapGrid[0];
}
function pt() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function mt(e = 0, i = this.params.speed, t = !0, s = !0, a) {
  const n = this, { params: l, wrapperEl: o } = n;
  if (n.animating && l.preventInteractionOnTransition) return !1;
  const r = n.minTranslate(), c = n.maxTranslate();
  let m;
  if (s && e > r ? m = r : s && e < c ? m = c : m = e, n.updateProgress(m), l.cssMode) {
    const u = n.isHorizontal();
    if (i === 0) o[u ? "scrollLeft" : "scrollTop"] = -m;
    else {
      if (!n.support.smoothScroll)
        return xe({
          swiper: n,
          targetPosition: -m,
          side: u ? "left" : "top"
        }), !0;
      o.scrollTo({
        [u ? "left" : "top"]: -m,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return i === 0 ? (n.setTransition(0), n.setTranslate(m), t && (n.emit("beforeTransitionStart", i, a), n.emit("transitionEnd"))) : (n.setTransition(i), n.setTranslate(m), t && (n.emit("beforeTransitionStart", i, a), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(v) {
    !n || n.destroyed || v.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, n.animating = !1, t && n.emit("transitionEnd"));
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
function we({ swiper: e, runCallbacks: i, direction: t, step: s }) {
  const { activeIndex: a, previousIndex: n } = e;
  let l = t;
  l || (a > n ? l = "next" : a < n ? l = "prev" : l = "reset"), e.emit(`transition${s}`), i && l === "reset" ? e.emit(`slideResetTransition${s}`) : i && a !== n && (e.emit(`slideChangeTransition${s}`), l === "next" ? e.emit(`slideNextTransition${s}`) : e.emit(`slidePrevTransition${s}`));
}
function vt(e = !0, i) {
  const t = this, { params: s } = t;
  s.cssMode || (s.autoHeight && t.updateAutoHeight(), we({
    swiper: t,
    runCallbacks: e,
    direction: i,
    step: "Start"
  }));
}
function yt(e = !0, i) {
  const t = this, { params: s } = t;
  t.animating = !1, !s.cssMode && (t.setTransition(0), we({
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
  const { params: o, snapGrid: r, slidesGrid: c, previousIndex: m, activeIndex: u, rtlTranslate: v, wrapperEl: p, enabled: h } = n;
  if (!h && !s && !a || n.destroyed || n.animating && o.preventInteractionOnTransition) return !1;
  typeof i > "u" && (i = n.params.speed);
  const S = Math.min(n.params.slidesPerGroupSkip, l);
  let E = S + Math.floor((l - S) / n.params.slidesPerGroup);
  E >= r.length && (E = r.length - 1);
  const d = -r[E];
  if (o.normalizeSlideIndex) for (let x = 0; x < c.length; x += 1) {
    const I = -Math.floor(d * 100), z = Math.floor(c[x] * 100), P = Math.floor(c[x + 1] * 100);
    typeof c[x + 1] < "u" ? I >= z && I < P - (P - z) / 2 ? l = x : I >= z && I < P && (l = x + 1) : I >= z && (l = x);
  }
  if (n.initialized && l !== u && (!n.allowSlideNext && (v ? d > n.translate && d > n.minTranslate() : d < n.translate && d < n.minTranslate()) || !n.allowSlidePrev && d > n.translate && d > n.maxTranslate() && (u || 0) !== l))
    return !1;
  l !== (m || 0) && t && n.emit("beforeSlideChangeStart"), n.updateProgress(d);
  let f;
  l > u ? f = "next" : l < u ? f = "prev" : f = "reset";
  const g = n.virtual && n.params.virtual.enabled;
  if (!(g && a) && (v && -d === n.translate || !v && d === n.translate))
    return n.updateActiveIndex(l), o.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), o.effect !== "slide" && n.setTranslate(d), f !== "reset" && (n.transitionStart(t, f), n.transitionEnd(t, f)), !1;
  if (o.cssMode) {
    const x = n.isHorizontal(), I = v ? d : -d;
    if (i === 0)
      g && (n.wrapperEl.style.scrollSnapType = "none", n._immediateVirtual = !0), g && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        p[x ? "scrollLeft" : "scrollTop"] = I;
      })) : p[x ? "scrollLeft" : "scrollTop"] = I, g && requestAnimationFrame(() => {
        n.wrapperEl.style.scrollSnapType = "", n._immediateVirtual = !1;
      });
    else {
      if (!n.support.smoothScroll)
        return xe({
          swiper: n,
          targetPosition: I,
          side: x ? "left" : "top"
        }), !0;
      p.scrollTo({
        [x ? "left" : "top"]: I,
        behavior: "smooth"
      });
    }
    return !0;
  }
  const b = Pe().isSafari;
  return g && !a && b && n.isElement && n.virtual.update(!1, !1, l), n.setTransition(i), n.setTranslate(d), n.updateActiveIndex(l), n.updateSlidesClasses(), n.emit("beforeTransitionStart", i, s), n.transitionStart(t, f), i === 0 ? n.transitionEnd(t, f) : n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(I) {
    !n || n.destroyed || I.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(t, f));
  }), n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)), !0;
}
function Tt(e = 0, i, t = !0, s) {
  typeof e == "string" && (e = parseInt(e, 10));
  const a = this;
  if (a.destroyed) return;
  typeof i > "u" && (i = a.params.speed);
  const n = a.grid && a.params.grid && a.params.grid.rows > 1;
  let l = e;
  if (a.params.loop) if (a.virtual && a.params.virtual.enabled) l = l + a.virtual.slidesBefore;
  else {
    let o;
    if (n) {
      const S = l * a.params.grid.rows;
      o = a.slides.find((E) => E.getAttribute("data-swiper-slide-index") * 1 === S).column;
    } else o = a.getSlideIndexByData(l);
    const r = n ? Math.ceil(a.slides.length / a.params.grid.rows) : a.slides.length, { centeredSlides: c, slidesOffsetBefore: m, slidesOffsetAfter: u } = a.params, v = c || !!m || !!u;
    let p = a.params.slidesPerView;
    p === "auto" ? p = a.slidesPerViewDynamic() : (p = Math.ceil(parseFloat(a.params.slidesPerView, 10)), v && p % 2 === 0 && (p = p + 1));
    let h = r - o < p;
    if (v && (h = h || o < Math.ceil(p / 2)), s && v && a.params.slidesPerView !== "auto" && !n && (h = !1), h) {
      const S = v ? o < a.activeIndex ? "prev" : "next" : o - a.activeIndex - 1 < a.params.slidesPerView ? "next" : "prev";
      a.loopFix({
        direction: S,
        slideTo: !0,
        activeSlideIndex: S === "next" ? o + 1 : o - r + 1,
        slideRealIndex: S === "next" ? a.realIndex : void 0
      });
    }
    if (n) {
      const S = l * a.params.grid.rows;
      l = a.slides.find((E) => E.getAttribute("data-swiper-slide-index") * 1 === S).column;
    } else l = a.getSlideIndexByData(l);
  }
  return requestAnimationFrame(() => {
    a.slideTo(l, i, t, s);
  }), a;
}
function Et(e, i = !0, t) {
  const s = this, { enabled: a, params: n, animating: l } = s;
  if (!a || s.destroyed) return s;
  typeof e > "u" && (e = s.params.speed);
  let o = n.slidesPerGroup;
  n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (o = Math.max(s.slidesPerViewDynamic("current", !0), 1));
  const r = s.activeIndex < n.slidesPerGroupSkip ? 1 : o, c = s.virtual && n.virtual.enabled;
  if (n.loop) {
    if (l && !c && n.loopPreventsSliding) return !1;
    if (s.loopFix({ direction: "next" }), s._clientLeft = s.wrapperEl.clientLeft, s.activeIndex === s.slides.length - 1 && n.cssMode)
      return requestAnimationFrame(() => {
        s.slideTo(s.activeIndex + r, e, i, t);
      }), !0;
  }
  return n.rewind && s.isEnd ? s.slideTo(0, e, i, t) : s.slideTo(s.activeIndex + r, e, i, t);
}
function xt(e, i = !0, t) {
  const s = this, { params: a, snapGrid: n, slidesGrid: l, rtlTranslate: o, enabled: r, animating: c } = s;
  if (!r || s.destroyed) return s;
  typeof e > "u" && (e = s.params.speed);
  const m = s.virtual && a.virtual.enabled;
  if (a.loop) {
    if (c && !m && a.loopPreventsSliding) return !1;
    s.loopFix({ direction: "prev" }), s._clientLeft = s.wrapperEl.clientLeft;
  }
  const u = o ? s.translate : -s.translate;
  function v(f) {
    return f < 0 ? -Math.floor(Math.abs(f)) : Math.floor(f);
  }
  const p = v(u), h = n.map((f) => v(f)), S = a.freeMode && a.freeMode.enabled;
  let E = n[h.indexOf(p) - 1];
  if (typeof E > "u" && (a.cssMode || S)) {
    let f;
    n.forEach((g, b) => {
      p >= g && (f = b);
    }), typeof f < "u" && (E = S ? n[f] : n[f > 0 ? f - 1 : f]);
  }
  let d = 0;
  if (typeof E < "u" && (d = l.indexOf(E), d < 0 && (d = s.activeIndex - 1), a.slidesPerView === "auto" && a.slidesPerGroup === 1 && a.slidesPerGroupAuto && (d = d - s.slidesPerViewDynamic("previous", !0) + 1, d = Math.max(d, 0))), a.rewind && s.isBeginning) {
    const f = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
    return s.slideTo(f, e, i, t);
  } else if (a.loop && s.activeIndex === 0 && a.cssMode)
    return requestAnimationFrame(() => {
      s.slideTo(d, e, i, t);
    }), !0;
  return s.slideTo(d, e, i, t);
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
    const c = a.snapGrid[o], m = a.snapGrid[o + 1];
    r - c > (m - c) * s && (n += a.params.slidesPerGroup);
  } else {
    const c = a.snapGrid[o - 1], m = a.snapGrid[o];
    r - c <= (m - c) * s && (n -= a.params.slidesPerGroup);
  }
  return n = Math.max(n, 0), n = Math.min(n, a.slidesGrid.length - 1), a.slideTo(n, e, i, t);
}
function Pt() {
  const e = this;
  if (e.destroyed) return;
  const { params: i, slidesEl: t } = e, s = i.slidesPerView === "auto" ? e.slidesPerViewDynamic() : i.slidesPerView;
  let a = e.getSlideIndexWhenGrid(e.clickedIndex), n;
  const l = e.isElement ? "swiper-slide" : `.${i.slideClass}`, o = e.grid && e.params.grid && e.params.grid.rows > 1;
  if (i.loop) {
    if (e.animating) return;
    n = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), i.centeredSlides ? e.slideToLoop(n) : a > (o ? (e.slides.length - s) / 2 - (e.params.grid.rows - 1) : e.slides.length - s) ? (e.loopFix(), a = e.getSlideIndex(N(t, `${l}[data-swiper-slide-index="${n}"]`)[0]), Ee(() => {
      e.slideTo(a);
    })) : e.slideTo(a);
  } else e.slideTo(a);
}
var wt = {
  slideTo: St,
  slideToLoop: Tt,
  slideNext: Et,
  slidePrev: xt,
  slideReset: Ct,
  slideToClosest: Mt,
  slideToClickedSlide: Pt
};
function Lt(e, i) {
  const t = this, { params: s, slidesEl: a } = t;
  if (!s.loop || t.virtual && t.params.virtual.enabled) return;
  const n = () => {
    N(a, `.${s.slideClass}, swiper-slide`).forEach((p, h) => {
      p.setAttribute("data-swiper-slide-index", h);
    });
  }, l = () => {
    const p = N(a, `.${s.slideBlankClass}`);
    p.forEach((h) => {
      h.remove();
    }), p.length > 0 && (t.recalcSlides(), t.updateSlides());
  }, o = t.grid && s.grid && s.grid.rows > 1;
  s.loopAddBlankSlides && (s.slidesPerGroup > 1 || o) && l();
  const r = s.slidesPerGroup * (o ? s.grid.rows : 1), c = t.slides.length % r !== 0, m = o && t.slides.length % s.grid.rows !== 0, u = (p) => {
    for (let h = 0; h < p; h += 1) {
      const S = t.isElement ? X("swiper-slide", [s.slideBlankClass]) : X("div", [s.slideClass, s.slideBlankClass]);
      t.slidesEl.append(S);
    }
  };
  c ? (s.loopAddBlankSlides ? (u(r - t.slides.length % r), t.recalcSlides(), t.updateSlides()) : Q("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"), n()) : (m && (s.loopAddBlankSlides ? (u(s.grid.rows - t.slides.length % s.grid.rows), t.recalcSlides(), t.updateSlides()) : Q("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)")), n());
  const v = s.centeredSlides || !!s.slidesOffsetBefore || !!s.slidesOffsetAfter;
  t.loopFix({
    slideRealIndex: e,
    direction: v ? void 0 : "next",
    initial: i
  });
}
function It({ slideRealIndex: e, slideTo: i = !0, direction: t, setTranslate: s, activeSlideIndex: a, initial: n, byController: l, byMousewheel: o } = {}) {
  const r = this;
  if (!r.params.loop) return;
  r.emit("beforeLoopFix");
  const { slides: c, allowSlidePrev: m, allowSlideNext: u, slidesEl: v, params: p } = r, { centeredSlides: h, slidesOffsetBefore: S, slidesOffsetAfter: E, initialSlide: d } = p, f = h || !!S || !!E;
  if (r.allowSlidePrev = !0, r.allowSlideNext = !0, r.virtual && p.virtual.enabled) {
    i && (!f && r.snapIndex === 0 ? r.slideTo(r.virtual.slides.length, 0, !1, !0) : f && r.snapIndex < p.slidesPerView ? r.slideTo(r.virtual.slides.length + r.snapIndex, 0, !1, !0) : r.snapIndex === r.snapGrid.length - 1 && r.slideTo(r.virtual.slidesBefore, 0, !1, !0)), r.allowSlidePrev = m, r.allowSlideNext = u, r.emit("loopFix");
    return;
  }
  let g = p.slidesPerView;
  g === "auto" ? g = r.slidesPerViewDynamic() : (g = Math.ceil(parseFloat(p.slidesPerView, 10)), f && g % 2 === 0 && (g = g + 1));
  const b = p.slidesPerGroupAuto ? g : p.slidesPerGroup;
  let x = f ? Math.max(b, Math.ceil(g / 2)) : b;
  x % b !== 0 && (x += b - x % b), x += p.loopAdditionalSlides, r.loopedSlides = x;
  const I = r.grid && p.grid && p.grid.rows > 1;
  c.length < g + x || r.params.effect === "cards" && c.length < g + x * 2 ? Q("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : I && p.grid.fill === "row" && Q("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const z = [], P = [], D = I ? Math.ceil(c.length / p.grid.rows) : c.length, w = n && D - d < g && !f;
  let C = w ? d : r.activeIndex;
  typeof a > "u" ? a = r.getSlideIndex(c.find((T) => T.classList.contains(p.slideActiveClass))) : C = a;
  const L = t === "next" || !t, A = t === "prev" || !t;
  let k = 0, y = 0;
  const M = (I ? c[a].column : a) + (f && typeof s > "u" ? -g / 2 + 0.5 : 0);
  if (M < x) {
    k = Math.max(x - M, b);
    for (let T = 0; T < x - M; T += 1) {
      const O = T - Math.floor(T / D) * D;
      if (I) {
        const $ = D - O - 1;
        for (let B = c.length - 1; B >= 0; B -= 1) c[B].column === $ && z.push(B);
      } else z.push(D - O - 1);
    }
  } else if (M + g > D - x) {
    y = Math.max(M - (D - x * 2), b), w && (y = Math.max(y, g - D + d + 1));
    for (let T = 0; T < y; T += 1) {
      const O = T - Math.floor(T / D) * D;
      I ? c.forEach(($, B) => {
        $.column === O && P.push(B);
      }) : P.push(O);
    }
  }
  if (r.__preventObserver__ = !0, requestAnimationFrame(() => {
    r.__preventObserver__ = !1;
  }), r.params.effect === "cards" && c.length < g + x * 2 && (P.includes(a) && P.splice(P.indexOf(a), 1), z.includes(a) && z.splice(z.indexOf(a), 1)), A && z.forEach((T) => {
    c[T].swiperLoopMoveDOM = !0, v.prepend(c[T]), c[T].swiperLoopMoveDOM = !1;
  }), L && P.forEach((T) => {
    c[T].swiperLoopMoveDOM = !0, v.append(c[T]), c[T].swiperLoopMoveDOM = !1;
  }), r.recalcSlides(), p.slidesPerView === "auto" ? r.updateSlides() : I && (z.length > 0 && A || P.length > 0 && L) && r.slides.forEach((T, O) => {
    r.grid.updateSlide(O, T, r.slides);
  }), p.watchSlidesProgress && r.updateSlidesOffset(), i) {
    if (z.length > 0 && A) {
      if (typeof e > "u") {
        const T = r.slidesGrid[C], O = r.slidesGrid[C + k] - T;
        o ? r.setTranslate(r.translate - O) : (r.slideTo(C + Math.ceil(k), 0, !1, !0), s && (r.touchEventsData.startTranslate = r.touchEventsData.startTranslate - O, r.touchEventsData.currentTranslate = r.touchEventsData.currentTranslate - O));
      } else if (s) {
        const T = I ? z.length / p.grid.rows : z.length;
        r.slideTo(r.activeIndex + T, 0, !1, !0), r.touchEventsData.currentTranslate = r.translate;
      }
    } else if (P.length > 0 && L) if (typeof e > "u") {
      const T = r.slidesGrid[C], O = r.slidesGrid[C - y] - T;
      o ? r.setTranslate(r.translate - O) : (r.slideTo(C - y, 0, !1, !0), s && (r.touchEventsData.startTranslate = r.touchEventsData.startTranslate - O, r.touchEventsData.currentTranslate = r.touchEventsData.currentTranslate - O));
    } else {
      const T = I ? P.length / p.grid.rows : P.length;
      r.slideTo(r.activeIndex - T, 0, !1, !0);
    }
  }
  if (r.allowSlidePrev = m, r.allowSlideNext = u, r.controller && r.controller.control && !l) {
    const T = {
      slideRealIndex: e,
      direction: t,
      setTranslate: s,
      activeSlideIndex: a,
      byController: !0
    };
    Array.isArray(r.controller.control) ? r.controller.control.forEach((O) => {
      !O.destroyed && O.params.loop && O.loopFix({
        ...T,
        slideTo: O.params.slidesPerView === p.slidesPerView ? i : !1
      });
    }) : r.controller.control instanceof r.constructor && r.controller.control.params.loop && r.controller.control.loopFix({
      ...T,
      slideTo: r.controller.control.params.slidesPerView === p.slidesPerView ? i : !1
    });
  }
  r.emit("loopFix");
}
function kt() {
  const e = this, { params: i, slidesEl: t } = e;
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
  const s = V(), { params: a } = e, n = a.edgeSwipeDetection, l = a.edgeSwipeThreshold;
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
    if (a.pointerId !== null && a.pointerId !== s.pointerId) return;
    a.pointerId = s.pointerId;
  } else s.type === "touchstart" && s.targetTouches.length === 1 && (a.touchId = s.targetTouches[0].identifier);
  if (s.type === "touchstart") {
    ge(i, s, s.targetTouches[0].pageX);
    return;
  }
  const { params: n, touches: l, enabled: o } = i;
  if (!o || !n.simulateTouch && s.pointerType === "mouse" || i.animating && n.preventInteractionOnTransition) return;
  !i.animating && n.cssMode && n.loop && i.loopFix();
  let r = s.target;
  if (n.touchEventsTarget === "wrapper" && !Ne(r, i.wrapperEl) || "which" in s && s.which === 3 || "button" in s && s.button > 0 || a.isTouched && a.isMoved) return;
  const c = !!n.noSwipingClass && n.noSwipingClass !== "", m = s.composedPath ? s.composedPath() : s.path;
  c && s.target && s.target.shadowRoot && m && (r = m[0]);
  const u = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`, v = !!(s.target && s.target.shadowRoot);
  if (n.noSwiping && (v ? Gt(u, r) : r.closest(u))) {
    i.allowClick = !0;
    return;
  }
  if (n.swipeHandler && !r.closest(n.swipeHandler))
    return;
  l.currentX = s.pageX, l.currentY = s.pageY;
  const p = l.currentX, h = l.currentY;
  if (!ge(i, s, p)) return;
  Object.assign(a, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), l.startX = p, l.startY = h, a.touchStartTime = J(), i.allowClick = !0, i.updateSize(), i.swipeDirection = void 0, n.threshold > 0 && (a.allowThresholdMove = !1);
  let S = !0;
  r.matches(a.focusableElements) && (S = !1, r.nodeName === "SELECT" && (a.isTouched = !1)), t.activeElement && t.activeElement.matches(a.focusableElements) && t.activeElement !== r && (s.pointerType === "mouse" || s.pointerType !== "mouse" && !r.matches(a.focusableElements)) && t.activeElement.blur();
  const E = S && i.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || E) && !r.isContentEditable && s.preventDefault(), n.freeMode && n.freeMode.enabled && i.freeMode && i.animating && !n.cssMode && i.freeMode.onTouchStart(), i.emit("touchStart", s);
}
function Bt(e) {
  const i = F(), t = this;
  if (t.destroyed) return;
  const s = t.touchEventsData, { params: a, touches: n, rtlTranslate: l, enabled: o } = t;
  if (!o || !a.simulateTouch && e.pointerType === "mouse") return;
  let r = e;
  if (r.originalEvent && (r = r.originalEvent), r.type === "pointermove" && (s.touchId !== null || r.pointerId !== s.pointerId))
    return;
  let c;
  if (r.type === "touchmove") {
    if (c = [...r.changedTouches].find((x) => x.identifier === s.touchId), !c || c.identifier !== s.touchId) return;
  } else c = r;
  if (!s.isTouched) {
    s.startMoving && s.isScrolling && t.emit("touchMoveOpposite", r);
    return;
  }
  const m = c.pageX, u = c.pageY;
  if (r.preventedByNestedSwiper) {
    n.startX = m, n.startY = u;
    return;
  }
  if (!t.allowTouchMove) {
    r.target.matches(s.focusableElements) || (t.allowClick = !1), s.isTouched && (Object.assign(n, {
      startX: m,
      startY: u,
      currentX: m,
      currentY: u
    }), s.touchStartTime = J());
    return;
  }
  if (a.touchReleaseOnEdges && !a.loop)
    if (t.isVertical()) {
      if (u < n.startY && t.translate <= t.maxTranslate() || u > n.startY && t.translate >= t.minTranslate()) {
        s.isTouched = !1, s.isMoved = !1;
        return;
      }
    } else {
      if (l && (m > n.startX && -t.translate <= t.maxTranslate() || m < n.startX && -t.translate >= t.minTranslate())) return;
      if (!l && (m < n.startX && t.translate <= t.maxTranslate() || m > n.startX && t.translate >= t.minTranslate())) return;
    }
  if (i.activeElement && i.activeElement.matches(s.focusableElements) && i.activeElement !== r.target && r.pointerType !== "mouse" && i.activeElement.blur(), i.activeElement && r.target === i.activeElement && r.target.matches(s.focusableElements)) {
    s.isMoved = !0, t.allowClick = !1;
    return;
  }
  s.allowTouchCallbacks && t.emit("touchMove", r), n.previousX = n.currentX, n.previousY = n.currentY, n.currentX = m, n.currentY = u;
  const v = n.currentX - n.startX, p = n.currentY - n.startY;
  if (t.params.threshold && Math.sqrt(v ** 2 + p ** 2) < t.params.threshold) return;
  if (typeof s.isScrolling > "u") {
    let x;
    t.isHorizontal() && n.currentY === n.startY || t.isVertical() && n.currentX === n.startX ? s.isScrolling = !1 : v * v + p * p >= 25 && (x = Math.atan2(Math.abs(p), Math.abs(v)) * 180 / Math.PI, s.isScrolling = t.isHorizontal() ? x > a.touchAngle : 90 - x > a.touchAngle);
  }
  if (s.isScrolling && t.emit("touchMoveOpposite", r), typeof s.startMoving > "u" && (n.currentX !== n.startX || n.currentY !== n.startY) && (s.startMoving = !0), s.isScrolling || r.type === "touchmove" && s.preventTouchMoveFromPointerMove) {
    s.isTouched = !1;
    return;
  }
  if (!s.startMoving) return;
  t.allowClick = !1, !a.cssMode && r.cancelable && r.preventDefault(), a.touchMoveStopPropagation && !a.nested && r.stopPropagation();
  let h = t.isHorizontal() ? v : p, S = t.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  a.oneWayMovement && (h = Math.abs(h) * (l ? 1 : -1), S = Math.abs(S) * (l ? 1 : -1)), n.diff = h, h *= a.touchRatio, l && (h = -h, S = -S);
  const E = t.touchesDirection;
  t.swipeDirection = h > 0 ? "prev" : "next", t.touchesDirection = S > 0 ? "prev" : "next";
  const d = t.params.loop && !a.cssMode, f = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
  if (!s.isMoved) {
    if (d && f && t.loopFix({ direction: t.swipeDirection }), s.startTranslate = t.getTranslate(), t.setTransition(0), t.animating) {
      const x = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: { bySwiperTouchMove: !0 }
      });
      t.wrapperEl.dispatchEvent(x);
    }
    s.allowMomentumBounce = !1, a.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0), t.emit("sliderFirstMove", r);
  }
  if ((/* @__PURE__ */ new Date()).getTime(), a._loopSwapReset !== !1 && s.isMoved && s.allowThresholdMove && E !== t.touchesDirection && d && f && Math.abs(h) >= 1) {
    Object.assign(n, {
      startX: m,
      startY: u,
      currentX: m,
      currentY: u,
      startTranslate: s.currentTranslate
    }), s.loopSwapReset = !0, s.startTranslate = s.currentTranslate;
    return;
  }
  t.emit("sliderMove", r), s.isMoved = !0, s.currentTranslate = h + s.startTranslate;
  let g = !0, b = a.resistanceRatio;
  if (a.touchReleaseOnEdges && (b = 0), h > 0 ? (d && f && s.allowThresholdMove && s.currentTranslate > (a.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (a.slidesPerView !== "auto" && t.slides.length - a.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), s.currentTranslate > t.minTranslate() && (g = !1, a.resistance && (s.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + s.startTranslate + h) ** b))) : h < 0 && (d && f && s.allowThresholdMove && s.currentTranslate < (a.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (a.slidesPerView !== "auto" && t.slides.length - a.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: t.slides.length - (a.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(a.slidesPerView, 10)))
  }), s.currentTranslate < t.maxTranslate() && (g = !1, a.resistance && (s.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - s.startTranslate - h) ** b))), g && (r.preventedByNestedSwiper = !0), !t.allowSlideNext && t.swipeDirection === "next" && s.currentTranslate < s.startTranslate && (s.currentTranslate = s.startTranslate), !t.allowSlidePrev && t.swipeDirection === "prev" && s.currentTranslate > s.startTranslate && (s.currentTranslate = s.startTranslate), !t.allowSlidePrev && !t.allowSlideNext && (s.currentTranslate = s.startTranslate), a.threshold > 0) if (Math.abs(h) > a.threshold || s.allowThresholdMove) {
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
    if (a = [...s.changedTouches].find((b) => b.identifier === t.touchId), !a || a.identifier !== t.touchId) return;
  } else {
    if (t.touchId !== null || s.pointerId !== t.pointerId) return;
    a = s;
  }
  if ([
    "pointercancel",
    "pointerout",
    "pointerleave",
    "contextmenu"
  ].includes(s.type) && !(["pointercancel", "contextmenu"].includes(s.type) && (i.browser.isSafari || i.browser.isWebView)))
    return;
  t.pointerId = null, t.touchId = null;
  const { params: n, touches: l, rtlTranslate: o, slidesGrid: r, enabled: c } = i;
  if (!c || !n.simulateTouch && s.pointerType === "mouse") return;
  if (t.allowTouchCallbacks && i.emit("touchEnd", s), t.allowTouchCallbacks = !1, !t.isTouched) {
    t.isMoved && n.grabCursor && i.setGrabCursor(!1), t.isMoved = !1, t.startMoving = !1;
    return;
  }
  n.grabCursor && t.isMoved && t.isTouched && (i.allowSlideNext === !0 || i.allowSlidePrev === !0) && i.setGrabCursor(!1);
  const m = J(), u = m - t.touchStartTime;
  if (i.allowClick) {
    const b = s.path || s.composedPath && s.composedPath();
    i.updateClickedSlide(b && b[0] || s.target, b), i.emit("tap click", s), u < 300 && m - t.lastClickTime < 300 && i.emit("doubleTap doubleClick", s);
  }
  if (t.lastClickTime = J(), Ee(() => {
    i.destroyed || (i.allowClick = !0);
  }), !t.isTouched || !t.isMoved || !i.swipeDirection || l.diff === 0 && !t.loopSwapReset || t.currentTranslate === t.startTranslate && !t.loopSwapReset) {
    t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
    return;
  }
  t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
  let v;
  if (n.followFinger ? v = o ? i.translate : -i.translate : v = -t.currentTranslate, n.cssMode) return;
  if (n.freeMode && n.freeMode.enabled) {
    i.freeMode.onTouchEnd({ currentPos: v });
    return;
  }
  const p = v >= -i.maxTranslate() && !i.params.loop;
  let h = 0, S = i.slidesSizesGrid[0];
  for (let b = 0; b < r.length; b += b < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup) {
    const x = b < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    typeof r[b + x] < "u" ? (p || v >= r[b] && v < r[b + x]) && (h = b, S = r[b + x] - r[b]) : (p || v >= r[b]) && (h = b, S = r[r.length - 1] - r[r.length - 2]);
  }
  let E = null, d = null;
  n.rewind && (i.isBeginning ? d = n.virtual && n.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1 : i.isEnd && (E = 0));
  const f = (v - r[h]) / S, g = h < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
  if (u > n.longSwipesMs) {
    if (!n.longSwipes) {
      i.slideTo(i.activeIndex);
      return;
    }
    i.swipeDirection === "next" && (f >= n.longSwipesRatio ? i.slideTo(n.rewind && i.isEnd ? E : h + g) : i.slideTo(h)), i.swipeDirection === "prev" && (f > 1 - n.longSwipesRatio ? i.slideTo(h + g) : d !== null && f < 0 && Math.abs(f) > n.longSwipesRatio ? i.slideTo(d) : i.slideTo(h));
  } else {
    if (!n.shortSwipes) {
      i.slideTo(i.activeIndex);
      return;
    }
    i.navigation && (s.target === i.navigation.nextEl || s.target === i.navigation.prevEl) ? s.target === i.navigation.nextEl ? i.slideTo(h + g) : i.slideTo(h) : (i.swipeDirection === "next" && i.slideTo(E !== null ? E : h + g), i.swipeDirection === "prev" && i.slideTo(d !== null ? d : h));
  }
}
function ve() {
  const e = this, { params: i, el: t } = e;
  if (t && t.offsetWidth === 0) return;
  i.breakpoints && e.setBreakpoint();
  const { allowSlideNext: s, allowSlidePrev: a, snapGrid: n } = e, l = e.virtual && e.params.virtual.enabled;
  e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
  const o = l && i.loop;
  if ((i.slidesPerView === "auto" || i.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides && !o) {
    const r = l ? e.virtual.slides : e.slides;
    e.slideTo(r.length - 1, 0, !1, !0);
  } else e.params.loop && !l ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
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
  const { wrapperEl: i, rtlTranslate: t, enabled: s } = e;
  if (!s) return;
  e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -i.scrollLeft : e.translate = -i.scrollTop, e.translate === 0 && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
  let a;
  const n = e.maxTranslate() - e.minTranslate();
  n === 0 ? a = 0 : a = (e.translate - e.minTranslate()) / n, a !== e.progress && e.updateProgress(t ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
}
function Nt(e) {
  const i = this;
  i.destroyed || (Z(i, e.target), !(i.params.cssMode || i.params.slidesPerView !== "auto" && !i.params.autoHeight) && i.update());
}
function Ht() {
  const e = this;
  e.destroyed || e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
}
var Le = (e, i) => {
  const t = F(), { params: s, el: a, wrapperEl: n, device: l } = e, o = !!s.nested, r = i === "on" ? "addEventListener" : "removeEventListener", c = i;
  !a || typeof a == "string" || (t[r]("touchstart", e.onDocumentTouchStart, {
    passive: !1,
    capture: o
  }), a[r]("touchstart", e.onTouchStart, { passive: !1 }), a[r]("pointerdown", e.onTouchStart, { passive: !1 }), t[r]("touchmove", e.onTouchMove, {
    passive: !1,
    capture: o
  }), t[r]("pointermove", e.onTouchMove, {
    passive: !1,
    capture: o
  }), t[r]("touchend", e.onTouchEnd, { passive: !0 }), t[r]("pointerup", e.onTouchEnd, { passive: !0 }), t[r]("pointercancel", e.onTouchEnd, { passive: !0 }), t[r]("touchcancel", e.onTouchEnd, { passive: !0 }), t[r]("pointerout", e.onTouchEnd, { passive: !0 }), t[r]("pointerleave", e.onTouchEnd, { passive: !0 }), t[r]("contextmenu", e.onTouchEnd, { passive: !0 }), (s.preventClicks || s.preventClicksPropagation) && a[r]("click", e.onClick, !0), s.cssMode && n[r]("scroll", e.onScroll), s.updateOnWindowResize ? e[c](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", ve, !0) : e[c]("observerUpdate", ve, !0), a[r]("load", e.onLoad, { capture: !0 }));
};
function Rt() {
  const e = this, { params: i } = e;
  e.onTouchStart = $t.bind(e), e.onTouchMove = Bt.bind(e), e.onTouchEnd = Vt.bind(e), e.onDocumentTouchStart = Ht.bind(e), i.cssMode && (e.onScroll = _t.bind(e)), e.onClick = Ft.bind(e), e.onLoad = Nt.bind(e), Le(e, "on");
}
function qt() {
  Le(this, "off");
}
var Wt = {
  attachEvents: Rt,
  detachEvents: qt
}, ye = (e, i) => e.grid && i.grid && i.grid.rows > 1;
function jt() {
  const e = this, { realIndex: i, initialized: t, params: s, el: a } = e, n = s.breakpoints;
  if (!n || n && Object.keys(n).length === 0) return;
  const l = F(), o = s.breakpointsBase === "window" || !s.breakpointsBase ? s.breakpointsBase : "container", r = ["window", "container"].includes(s.breakpointsBase) || !s.breakpointsBase ? e.el : l.querySelector(s.breakpointsBase), c = e.getBreakpoint(n, o, r);
  if (!c || e.currentBreakpoint === c) return;
  const m = (c in n ? n[c] : void 0) || e.originalParams, u = ye(e, s), v = ye(e, m), p = e.params.grabCursor, h = m.grabCursor, S = s.enabled;
  u && !v ? (a.classList.remove(`${s.containerModifierClass}grid`, `${s.containerModifierClass}grid-column`), e.emitContainerClasses()) : !u && v && (a.classList.add(`${s.containerModifierClass}grid`), (m.grid.fill && m.grid.fill === "column" || !m.grid.fill && s.grid.fill === "column") && a.classList.add(`${s.containerModifierClass}grid-column`), e.emitContainerClasses()), p && !h ? e.unsetGrabCursor() : !p && h && e.setGrabCursor(), [
    "navigation",
    "pagination",
    "scrollbar"
  ].forEach((x) => {
    if (typeof m[x] > "u") return;
    const I = s[x] && s[x].enabled, z = m[x] && m[x].enabled;
    I && !z && e[x].disable(), !I && z && e[x].enable();
  });
  const E = m.direction && m.direction !== s.direction, d = s.loop && (m.slidesPerView !== s.slidesPerView || E), f = s.loop;
  E && t && e.changeDirection(), _(e.params, m);
  const g = e.params.enabled, b = e.params.loop;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev
  }), S && !g ? e.disable() : !S && g && e.enable(), e.currentBreakpoint = c, e.emit("_beforeBreakpoint", m), t && (d ? (e.loopDestroy(), e.loopCreate(i), e.updateSlides()) : !f && b ? (e.loopCreate(i), e.updateSlides()) : f && !b && e.loopDestroy()), e.emit("breakpoint", m);
}
function Xt(e, i = "window", t) {
  if (!e || i === "container" && !t) return;
  let s = !1;
  const a = V(), n = i === "window" ? a.innerHeight : t.clientHeight, l = Object.keys(e).map((o) => typeof o == "string" && o.indexOf("@") === 0 ? {
    value: n * parseFloat(o.substr(1)),
    point: o
  } : {
    value: o,
    point: o
  });
  l.sort((o, r) => parseInt(o.value, 10) - parseInt(r.value, 10));
  for (let o = 0; o < l.length; o += 1) {
    const { point: r, value: c } = l[o];
    i === "window" ? a.matchMedia(`(min-width: ${c}px)`).matches && (s = r) : c <= t.clientWidth && (s = r);
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
  const e = this, { classNames: i, params: t, rtl: s, el: a, device: n } = e, l = Ut([
    "initialized",
    t.direction,
    { "free-mode": e.params.freeMode && t.freeMode.enabled },
    { autoheight: t.autoHeight },
    { rtl: s },
    { grid: t.grid && t.grid.rows > 1 },
    { "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column" },
    { android: n.android },
    { ios: n.ios },
    { "css-mode": t.cssMode },
    { centered: t.cssMode && t.centeredSlides },
    { "watch-progress": t.watchSlidesProgress }
  ], t.containerModifierClass);
  i.push(...l), a.classList.add(...i), e.emitContainerClasses();
}
function Zt() {
  const e = this, { el: i, classNames: t } = e;
  !i || typeof i == "string" || (i.classList.remove(...t), e.emitContainerClasses());
}
var Jt = {
  addClasses: Kt,
  removeClasses: Zt
};
function Qt() {
  const e = this, { isLocked: i, params: t } = e, { slidesOffsetBefore: s } = t;
  if (s) {
    const a = e.slides.length - 1, n = e.slidesGrid[a] + e.slidesSizesGrid[a] + s * 2;
    e.isLocked = e.size > n;
  } else e.isLocked = e.snapGrid.length === 1;
  t.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked), t.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked), i && i !== e.isLocked && (e.isEnd = !1), i !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
var ei = { checkOverflow: Qt }, be = {
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
  width: null,
  height: null,
  preventInteractionOnTransition: !1,
  userAgent: null,
  url: null,
  edgeSwipeDetection: !1,
  edgeSwipeThreshold: 20,
  autoHeight: !1,
  setWrapperSize: !1,
  virtualTranslate: !1,
  effect: "slide",
  breakpoints: void 0,
  breakpointsBase: "window",
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: !1,
  centeredSlides: !1,
  centeredSlidesBounds: !1,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  normalizeSlideIndex: !0,
  centerInsufficientSlides: !1,
  snapToSlideEdge: !1,
  watchOverflow: !0,
  roundLengths: !1,
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
  uniqueNavElements: !0,
  resistance: !0,
  resistanceRatio: 0.85,
  watchSlidesProgress: !1,
  grabCursor: !1,
  preventClicks: !0,
  preventClicksPropagation: !0,
  slideToClickedSlide: !1,
  loop: !1,
  loopAddBlankSlides: !0,
  loopAdditionalSlides: 0,
  loopPreventsSliding: !0,
  rewind: !1,
  allowSlidePrev: !0,
  allowSlideNext: !0,
  swipeHandler: null,
  noSwiping: !0,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  passiveListeners: !0,
  maxBackfaceHiddenSlides: 10,
  containerModifierClass: "swiper-",
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
  runCallbacksOnInit: !0,
  _emitClasses: !1
};
function ti(e, i) {
  return function(s = {}) {
    const a = Object.keys(s)[0], n = s[a];
    if (typeof n != "object" || n === null) {
      _(i, s);
      return;
    }
    if (e[a] === !0 && (e[a] = { enabled: !0 }), a === "navigation" && e[a] && e[a].enabled && !e[a].prevEl && !e[a].nextEl && (e[a].auto = !0), ["pagination", "scrollbar"].indexOf(a) >= 0 && e[a] && e[a].enabled && !e[a].el && (e[a].auto = !0), !(a in e && "enabled" in n)) {
      _(i, s);
      return;
    }
    typeof e[a] == "object" && !("enabled" in e[a]) && (e[a].enabled = !0), e[a] || (e[a] = { enabled: !1 }), _(i, s);
  };
}
var oe = {
  eventsEmitter: Je,
  update: dt,
  translate: ht,
  transition: bt,
  slide: wt,
  loop: At,
  grabCursor: Dt,
  events: Wt,
  breakpoints: Yt,
  checkOverflow: ei,
  classes: Jt
}, de = {}, pe = class H {
  constructor(...i) {
    let t, s;
    i.length === 1 && i[0].constructor && Object.prototype.toString.call(i[0]).slice(8, -1) === "Object" ? s = i[0] : [t, s] = i, s || (s = {}), s = _({}, s), t && !s.el && (s.el = t);
    const a = F();
    if (s.el && typeof s.el == "string" && a.querySelectorAll(s.el).length > 1) {
      const o = [];
      return a.querySelectorAll(s.el).forEach((r) => {
        const c = _({}, s, { el: r });
        o.push(new H(c));
      }), o;
    }
    const n = this;
    n.__swiper__ = !0, n.support = Ce(), n.device = Me({ userAgent: s.userAgent }), n.browser = Pe(), n.eventsListeners = {}, n.eventsAnyListeners = [], n.modules = [...n.__modules__], s.modules && Array.isArray(s.modules) && s.modules.forEach((o) => {
      typeof o == "function" && n.modules.indexOf(o) < 0 && n.modules.push(o);
    });
    const l = {};
    return n.modules.forEach((o) => {
      o({
        params: s,
        swiper: n,
        extendParams: ti(s, l),
        on: n.on.bind(n),
        once: n.once.bind(n),
        off: n.off.bind(n),
        emit: n.emit.bind(n)
      });
    }), n.params = _({}, _({}, be, l), de, s), n.originalParams = _({}, n.params), n.passedParams = _({}, s), n.params && n.params.on && Object.keys(n.params.on).forEach((o) => {
      n.on(o, n.params.on[o]);
    }), n.params && n.params.onAny && n.onAny(n.params.onAny), Object.assign(n, {
      enabled: n.params.enabled,
      el: t,
      classNames: [],
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      isHorizontal() {
        return n.params.direction === "horizontal";
      },
      isVertical() {
        return n.params.direction === "vertical";
      },
      activeIndex: 0,
      realIndex: 0,
      isBeginning: !0,
      isEnd: !1,
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: !1,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      allowSlideNext: n.params.allowSlideNext,
      allowSlidePrev: n.params.allowSlidePrev,
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        focusableElements: n.params.focusableElements,
        lastClickTime: 0,
        clickTimeout: void 0,
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        pointerId: null,
        touchId: null
      },
      allowClick: !0,
      allowTouchMove: n.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
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
    const { slidesEl: t, params: s } = this, a = Y(N(t, `.${s.slideClass}, swiper-slide`)[0]);
    return Y(i) - a;
  }
  getSlideIndexByData(i) {
    return this.getSlideIndex(this.slides.find((t) => t.getAttribute("data-swiper-slide-index") * 1 === i));
  }
  getSlideIndexWhenGrid(i) {
    return this.grid && this.params.grid && this.params.grid.rows > 1 && (this.params.grid.fill === "column" ? i = Math.floor(i / this.params.grid.rows) : this.params.grid.fill === "row" && (i = i % Math.ceil(this.slides.length / this.params.grid.rows))), i;
  }
  recalcSlides() {
    const i = this, { slidesEl: t, params: s } = i;
    i.slides = N(t, `.${s.slideClass}, swiper-slide`);
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
    const a = s.minTranslate(), n = (s.maxTranslate() - a) * i + a;
    s.translateTo(n, typeof t > "u" ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses();
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
    const { params: s, slides: a, slidesGrid: n, slidesSizesGrid: l, size: o, activeIndex: r } = this;
    let c = 1;
    if (typeof s.slidesPerView == "number") return s.slidesPerView;
    if (s.centeredSlides) {
      let m = a[r] ? Math.ceil(a[r].swiperSlideSize) : 0, u;
      for (let v = r + 1; v < a.length; v += 1) a[v] && !u && (m += Math.ceil(a[v].swiperSlideSize), c += 1, m > o && (u = !0));
      for (let v = r - 1; v >= 0; v -= 1) a[v] && !u && (m += a[v].swiperSlideSize, c += 1, m > o && (u = !0));
    } else if (i === "current")
      for (let m = r + 1; m < a.length; m += 1) (t ? n[m] + l[m] - n[r] < o : n[m] - n[r] < o) && (c += 1);
    else for (let m = r - 1; m >= 0; m -= 1) n[r] - n[m] < o && (c += 1);
    return c;
  }
  update() {
    const i = this;
    if (!i || i.destroyed) return;
    const { snapGrid: t, params: s } = i;
    s.breakpoints && i.setBreakpoint(), [...i.el.querySelectorAll('[loading="lazy"]')].forEach((l) => {
      l.complete && Z(i, l);
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
      } else n = i.slideTo(i.activeIndex, 0, !1, !0);
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
    if (typeof s == "string" && (s = document.querySelector(s)), !s) return !1;
    s.swiper = t, s.parentNode && s.parentNode.host && s.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
    const a = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let l = s && s.shadowRoot && s.shadowRoot.querySelector ? s.shadowRoot.querySelector(a()) : N(s, a())[0];
    return !l && t.params.createElements && (l = X("div", t.params.wrapperClass), s.append(l), N(s, `.${t.params.slideClass}`).forEach((o) => {
      l.append(o);
    })), Object.assign(t, {
      el: s,
      wrapperEl: l,
      slidesEl: t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : l,
      hostEl: t.isElement ? s.parentNode.host : s,
      mounted: !0,
      rtl: s.dir.toLowerCase() === "rtl" || q(s, "direction") === "rtl",
      rtlTranslate: t.params.direction === "horizontal" && (s.dir.toLowerCase() === "rtl" || q(s, "direction") === "rtl"),
      wrongRTL: q(l, "display") === "-webkit-box"
    }), !0;
  }
  init(i) {
    const t = this;
    if (t.initialized || t.mount(i) === !1) return t;
    t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(void 0, !0), t.attachEvents();
    const s = [...t.el.querySelectorAll('[loading="lazy"]')];
    return t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), s.forEach((a) => {
      a.complete ? Z(t, a) : a.addEventListener("load", (n) => {
        Z(t, n.target);
      });
    }), fe(t), t.initialized = !0, fe(t), t.emit("init"), t.emit("afterInit"), t;
  }
  destroy(i = !0, t = !0) {
    const s = this, { params: a, el: n, wrapperEl: l, slides: o } = s;
    return typeof s.params > "u" || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), a.loop && s.loopDestroy(), t && (s.removeClasses(), n && typeof n != "string" && n.removeAttribute("style"), l && l.removeAttribute("style"), o && o.length && o.forEach((r) => {
      r.classList.remove(a.slideVisibleClass, a.slideFullyVisibleClass, a.slideActiveClass, a.slideNextClass, a.slidePrevClass), r.removeAttribute("style"), r.removeAttribute("data-swiper-slide-index");
    })), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((r) => {
      s.off(r);
    }), i !== !1 && (s.el && typeof s.el != "string" && (s.el.swiper = null), $e(s)), s.destroyed = !0), null;
  }
  static extendDefaults(i) {
    _(de, i);
  }
  static get extendedDefaults() {
    return de;
  }
  static get defaults() {
    return be;
  }
  static installModule(i) {
    H.prototype.__modules__ || (H.prototype.__modules__ = []);
    const t = H.prototype.__modules__;
    typeof i == "function" && t.indexOf(i) < 0 && t.push(i);
  }
  static use(i) {
    return Array.isArray(i) ? (i.forEach((t) => H.installModule(t)), H) : (H.installModule(i), H);
  }
};
Object.keys(oe).forEach((e) => {
  Object.keys(oe[e]).forEach((i) => {
    pe.prototype[i] = oe[e][i];
  });
});
pe.use([Ke, Ze]);
function ii({ swiper: e, extendParams: i, on: t, emit: s }) {
  const a = F(), n = V();
  e.keyboard = { enabled: !1 }, i({ keyboard: {
    enabled: !1,
    onlyInViewport: !0,
    pageUpDown: !0,
    speed: void 0
  } });
  function l(c) {
    if (!e.enabled) return;
    const { rtlTranslate: m } = e;
    let u = c;
    u.originalEvent && (u = u.originalEvent);
    const v = u.keyCode || u.charCode, p = e.params.keyboard.pageUpDown, h = p && v === 33, S = p && v === 34, E = v === 37, d = v === 39, f = v === 38, g = v === 40;
    if (!e.allowSlideNext && (e.isHorizontal() && d || e.isVertical() && g || S) || !e.allowSlidePrev && (e.isHorizontal() && E || e.isVertical() && f || h)) return !1;
    if (u.shiftKey || u.altKey || u.ctrlKey || u.metaKey || a.activeElement && (a.activeElement.isContentEditable || a.activeElement.nodeName && (a.activeElement.nodeName.toLowerCase() === "input" || a.activeElement.nodeName.toLowerCase() === "textarea"))) return;
    if (e.params.keyboard.onlyInViewport && (h || S || E || d || f || g)) {
      let x = !1;
      if (ee(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 && ee(e.el, `.${e.params.slideActiveClass}`).length === 0) return;
      const I = e.el, z = I.clientWidth, P = I.clientHeight, D = n.innerWidth, w = n.innerHeight, C = He(I);
      m && (C.left -= I.scrollLeft);
      const L = [
        [C.left, C.top],
        [C.left + z, C.top],
        [C.left, C.top + P],
        [C.left + z, C.top + P]
      ];
      for (let A = 0; A < L.length; A += 1) {
        const k = L[A];
        if (k[0] >= 0 && k[0] <= D && k[1] >= 0 && k[1] <= w) {
          if (k[0] === 0 && k[1] === 0) continue;
          x = !0;
        }
      }
      if (!x) return;
    }
    const b = e.params.keyboard.speed;
    e.isHorizontal() ? ((h || S || E || d) && (u.preventDefault ? u.preventDefault() : u.returnValue = !1), ((S || d) && !m || (h || E) && m) && e.slideNext(b), ((h || E) && !m || (S || d) && m) && e.slidePrev(b)) : ((h || S || f || g) && (u.preventDefault ? u.preventDefault() : u.returnValue = !1), (S || g) && e.slideNext(b), (h || f) && e.slidePrev(b)), s("keyPress", v);
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
      let n = N(e.el, `.${s[a]}`)[0];
      n || (n = X("div", s[a]), n.className = s[a], e.el.append(n)), t[a] = n, i[a] = n;
    }
  }), t;
}
var Se = '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>';
function si({ swiper: e, extendParams: i, on: t, emit: s }) {
  i({ navigation: {
    nextEl: null,
    prevEl: null,
    addIcons: !0,
    hideOnClick: !1,
    disabledClass: "swiper-button-disabled",
    hiddenClass: "swiper-button-hidden",
    lockClass: "swiper-button-lock",
    navigationDisabledClass: "swiper-navigation-disabled"
  } }), e.navigation = {
    nextEl: null,
    prevEl: null,
    arrowSvg: Se
  };
  function a(p) {
    let h;
    return p && typeof p == "string" && e.isElement && (h = e.el.querySelector(p) || e.hostEl.querySelector(p), h) ? h : (p && (typeof p == "string" && (h = [...document.querySelectorAll(p)]), e.params.uniqueNavElements && typeof p == "string" && h && h.length > 1 && e.el.querySelectorAll(p).length === 1 ? h = e.el.querySelector(p) : h && h.length === 1 && (h = h[0])), p && !h ? p : h);
  }
  function n(p, h) {
    const S = e.params.navigation;
    p = G(p), p.forEach((E) => {
      E && (E.classList[h ? "add" : "remove"](...S.disabledClass.split(" ")), E.tagName === "BUTTON" && (E.disabled = h), e.params.watchOverflow && e.enabled && E.classList[e.isLocked ? "add" : "remove"](S.lockClass));
    });
  }
  function l() {
    const { nextEl: p, prevEl: h } = e.navigation;
    if (e.params.loop) {
      n(h, !1), n(p, !1);
      return;
    }
    n(h, e.isBeginning && !e.params.rewind), n(p, e.isEnd && !e.params.rewind);
  }
  function o(p) {
    p.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), s("navigationPrev"));
  }
  function r(p) {
    p.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), s("navigationNext"));
  }
  function c() {
    const p = e.params.navigation;
    if (e.params.navigation = Ie(e, e.originalParams.navigation, e.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    }), !(p.nextEl || p.prevEl)) return;
    let h = a(p.nextEl), S = a(p.prevEl);
    Object.assign(e.navigation, {
      nextEl: h,
      prevEl: S
    }), h = G(h), S = G(S);
    const E = (d, f) => {
      if (d) {
        if (p.addIcons && d.matches(".swiper-button-next,.swiper-button-prev") && !d.querySelector("svg")) {
          const g = document.createElement("div");
          te(g, Se), d.appendChild(g.querySelector("svg")), g.remove();
        }
        d.addEventListener("click", f === "next" ? r : o);
      }
      !e.enabled && d && d.classList.add(...p.lockClass.split(" "));
    };
    h.forEach((d) => E(d, "next")), S.forEach((d) => E(d, "prev"));
  }
  function m() {
    let { nextEl: p, prevEl: h } = e.navigation;
    p = G(p), h = G(h);
    const S = (E, d) => {
      E.removeEventListener("click", d === "next" ? r : o), E.classList.remove(...e.params.navigation.disabledClass.split(" "));
    };
    p.forEach((E) => S(E, "next")), h.forEach((E) => S(E, "prev"));
  }
  t("init", () => {
    e.params.navigation.enabled === !1 ? v() : (c(), l());
  }), t("toEdge fromEdge lock unlock", () => {
    l();
  }), t("destroy", () => {
    m();
  }), t("enable disable", () => {
    let { nextEl: p, prevEl: h } = e.navigation;
    if (p = G(p), h = G(h), e.enabled) {
      l();
      return;
    }
    [...p, ...h].filter((S) => !!S).forEach((S) => S.classList.add(e.params.navigation.lockClass));
  }), t("click", (p, h) => {
    let { nextEl: S, prevEl: E } = e.navigation;
    S = G(S), E = G(E);
    const d = h.target;
    let f = E.includes(d) || S.includes(d);
    if (e.isElement && !f) {
      const g = h.path || h.composedPath && h.composedPath();
      g && (f = g.find((b) => S.includes(b) || E.includes(b)));
    }
    if (e.params.navigation.hideOnClick && !f) {
      if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === d || e.pagination.el.contains(d))) return;
      let g;
      S.length ? g = S[0].classList.contains(e.params.navigation.hiddenClass) : E.length && (g = E[0].classList.contains(e.params.navigation.hiddenClass)), s(g === !0 ? "navigationShow" : "navigationHide"), [...S, ...E].filter((b) => !!b).forEach((b) => b.classList.toggle(e.params.navigation.hiddenClass));
    }
  });
  const u = () => {
    e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")), c(), l();
  }, v = () => {
    e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")), m();
  };
  Object.assign(e.navigation, {
    enable: u,
    disable: v,
    update: l,
    init: c,
    destroy: m
  });
}
function R(e = "") {
  return `.${e.trim().replace(/([\.:!+\/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1").replace(/ /g, ".")}`;
}
function ni({ swiper: e, extendParams: i, on: t, emit: s }) {
  const a = "swiper-pagination";
  i({ pagination: {
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
    dynamicBullets: !1,
    dynamicMainBullets: 1,
    formatFractionCurrent: (d) => d,
    formatFractionTotal: (d) => d,
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
  } }), e.pagination = {
    el: null,
    bullets: []
  };
  let n, l = 0;
  function o() {
    return !e.params.pagination.el || !e.pagination.el || Array.isArray(e.pagination.el) && e.pagination.el.length === 0;
  }
  function r(d, f) {
    const { bulletActiveClass: g } = e.params.pagination;
    d && (d = d[`${f === "prev" ? "previous" : "next"}ElementSibling`], d && (d.classList.add(`${g}-${f}`), d = d[`${f === "prev" ? "previous" : "next"}ElementSibling`], d && d.classList.add(`${g}-${f}-${f}`)));
  }
  function c(d, f, g) {
    if (d = d % g, f = f % g, f === d + 1) return "next";
    if (f === d - 1) return "previous";
  }
  function m(d) {
    const f = d.target.closest(R(e.params.pagination.bulletClass));
    if (!f) return;
    d.preventDefault();
    const g = Y(f) * e.params.slidesPerGroup;
    if (e.params.loop) {
      if (e.realIndex === g) return;
      const b = c(e.realIndex, g, e.slides.length);
      b === "next" ? e.slideNext() : b === "previous" ? e.slidePrev() : e.slideToLoop(g);
    } else e.slideTo(g);
  }
  function u() {
    const d = e.rtl, f = e.params.pagination;
    if (o()) return;
    let g = e.pagination.el;
    g = G(g);
    let b, x;
    const I = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, z = e.params.loop ? Math.ceil(I / e.params.slidesPerGroup) : e.snapGrid.length;
    if (e.params.loop ? (x = e.previousRealIndex || 0, b = e.params.slidesPerGroup > 1 ? Math.floor(e.realIndex / e.params.slidesPerGroup) : e.realIndex) : typeof e.snapIndex < "u" ? (b = e.snapIndex, x = e.previousSnapIndex) : (x = e.previousIndex || 0, b = e.activeIndex || 0), f.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
      const P = e.pagination.bullets;
      let D, w, C;
      if (f.dynamicBullets && (n = ce(P[0], e.isHorizontal() ? "width" : "height", !0), g.forEach((L) => {
        L.style[e.isHorizontal() ? "width" : "height"] = `${n * (f.dynamicMainBullets + 4)}px`;
      }), f.dynamicMainBullets > 1 && x !== void 0 && (l += b - (x || 0), l > f.dynamicMainBullets - 1 ? l = f.dynamicMainBullets - 1 : l < 0 && (l = 0)), D = Math.max(b - l, 0), w = D + (Math.min(P.length, f.dynamicMainBullets) - 1), C = (w + D) / 2), P.forEach((L) => {
        const A = [...[
          "",
          "-next",
          "-next-next",
          "-prev",
          "-prev-prev",
          "-main"
        ].map((k) => `${f.bulletActiveClass}${k}`)].map((k) => typeof k == "string" && k.includes(" ") ? k.split(" ") : k).flat();
        L.classList.remove(...A);
      }), g.length > 1) P.forEach((L) => {
        const A = Y(L);
        A === b ? L.classList.add(...f.bulletActiveClass.split(" ")) : e.isElement && L.setAttribute("part", "bullet"), f.dynamicBullets && (A >= D && A <= w && L.classList.add(...`${f.bulletActiveClass}-main`.split(" ")), A === D && r(L, "prev"), A === w && r(L, "next"));
      });
      else {
        const L = P[b];
        if (L && L.classList.add(...f.bulletActiveClass.split(" ")), e.isElement && P.forEach((A, k) => {
          A.setAttribute("part", k === b ? "bullet-active" : "bullet");
        }), f.dynamicBullets) {
          const A = P[D], k = P[w];
          for (let y = D; y <= w; y += 1) P[y] && P[y].classList.add(...`${f.bulletActiveClass}-main`.split(" "));
          r(A, "prev"), r(k, "next");
        }
      }
      if (f.dynamicBullets) {
        const L = Math.min(P.length, f.dynamicMainBullets + 4), A = (n * L - n) / 2 - C * n, k = d ? "right" : "left";
        P.forEach((y) => {
          y.style[e.isHorizontal() ? k : "top"] = `${A}px`;
        });
      }
    }
    g.forEach((P, D) => {
      if (f.type === "fraction" && (P.querySelectorAll(R(f.currentClass)).forEach((w) => {
        w.textContent = f.formatFractionCurrent(b + 1);
      }), P.querySelectorAll(R(f.totalClass)).forEach((w) => {
        w.textContent = f.formatFractionTotal(z);
      })), f.type === "progressbar") {
        let w;
        f.progressbarOpposite ? w = e.isHorizontal() ? "vertical" : "horizontal" : w = e.isHorizontal() ? "horizontal" : "vertical";
        const C = (b + 1) / z;
        let L = 1, A = 1;
        w === "horizontal" ? L = C : A = C, P.querySelectorAll(R(f.progressbarFillClass)).forEach((k) => {
          k.style.transform = `translate3d(0,0,0) scaleX(${L}) scaleY(${A})`, k.style.transitionDuration = `${e.params.speed}ms`;
        });
      }
      f.type === "custom" && f.renderCustom ? (te(P, f.renderCustom(e, b + 1, z)), D === 0 && s("paginationRender", P)) : (D === 0 && s("paginationRender", P), s("paginationUpdate", P)), e.params.watchOverflow && e.enabled && P.classList[e.isLocked ? "add" : "remove"](f.lockClass);
    });
  }
  function v() {
    const d = e.params.pagination;
    if (o()) return;
    const f = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.grid && e.params.grid.rows > 1 ? e.slides.length / Math.ceil(e.params.grid.rows) : e.slides.length;
    let g = e.pagination.el;
    g = G(g);
    let b = "";
    if (d.type === "bullets") {
      let x = e.params.loop ? Math.ceil(f / e.params.slidesPerGroup) : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && x > f && (x = f);
      for (let I = 0; I < x; I += 1) d.renderBullet ? b += d.renderBullet.call(e, I, d.bulletClass) : b += `<${d.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${d.bulletClass}"></${d.bulletElement}>`;
    }
    d.type === "fraction" && (d.renderFraction ? b = d.renderFraction.call(e, d.currentClass, d.totalClass) : b = `<span class="${d.currentClass}"></span> / <span class="${d.totalClass}"></span>`), d.type === "progressbar" && (d.renderProgressbar ? b = d.renderProgressbar.call(e, d.progressbarFillClass) : b = `<span class="${d.progressbarFillClass}"></span>`), e.pagination.bullets = [], g.forEach((x) => {
      d.type !== "custom" && te(x, b || ""), d.type === "bullets" && e.pagination.bullets.push(...x.querySelectorAll(R(d.bulletClass)));
    }), d.type !== "custom" && s("paginationRender", g[0]);
  }
  function p() {
    e.params.pagination = Ie(e, e.originalParams.pagination, e.params.pagination, { el: "swiper-pagination" });
    const d = e.params.pagination;
    if (!d.el) return;
    let f;
    typeof d.el == "string" && e.isElement && (f = e.el.querySelector(d.el)), !f && typeof d.el == "string" && (f = [...document.querySelectorAll(d.el)]), f || (f = d.el), !(!f || f.length === 0) && (e.params.uniqueNavElements && typeof d.el == "string" && Array.isArray(f) && f.length > 1 && (f = [...e.el.querySelectorAll(d.el)], f.length > 1 && (f = f.find((g) => ee(g, ".swiper")[0] === e.el))), Array.isArray(f) && f.length === 1 && (f = f[0]), Object.assign(e.pagination, { el: f }), f = G(f), f.forEach((g) => {
      d.type === "bullets" && d.clickable && g.classList.add(...(d.clickableClass || "").split(" ")), g.classList.add(d.modifierClass + d.type), g.classList.add(e.isHorizontal() ? d.horizontalClass : d.verticalClass), d.type === "bullets" && d.dynamicBullets && (g.classList.add(`${d.modifierClass}${d.type}-dynamic`), l = 0, d.dynamicMainBullets < 1 && (d.dynamicMainBullets = 1)), d.type === "progressbar" && d.progressbarOpposite && g.classList.add(d.progressbarOppositeClass), d.clickable && g.addEventListener("click", m), e.enabled || g.classList.add(d.lockClass);
    }));
  }
  function h() {
    const d = e.params.pagination;
    if (o()) return;
    let f = e.pagination.el;
    f && (f = G(f), f.forEach((g) => {
      g.classList.remove(d.hiddenClass), g.classList.remove(d.modifierClass + d.type), g.classList.remove(e.isHorizontal() ? d.horizontalClass : d.verticalClass), d.clickable && (g.classList.remove(...(d.clickableClass || "").split(" ")), g.removeEventListener("click", m));
    })), e.pagination.bullets && e.pagination.bullets.forEach((g) => g.classList.remove(...d.bulletActiveClass.split(" ")));
  }
  t("changeDirection", () => {
    if (!e.pagination || !e.pagination.el) return;
    const d = e.params.pagination;
    let { el: f } = e.pagination;
    f = G(f), f.forEach((g) => {
      g.classList.remove(d.horizontalClass, d.verticalClass), g.classList.add(e.isHorizontal() ? d.horizontalClass : d.verticalClass);
    });
  }), t("init", () => {
    e.params.pagination.enabled === !1 ? E() : (p(), v(), u());
  }), t("activeIndexChange", () => {
    typeof e.snapIndex > "u" && u();
  }), t("snapIndexChange", () => {
    u();
  }), t("snapGridLengthChange", () => {
    v(), u();
  }), t("destroy", () => {
    h();
  }), t("enable disable", () => {
    let { el: d } = e.pagination;
    d && (d = G(d), d.forEach((f) => f.classList[e.enabled ? "remove" : "add"](e.params.pagination.lockClass)));
  }), t("lock unlock", () => {
    u();
  }), t("click", (d, f) => {
    const g = f.target, b = G(e.pagination.el);
    if (e.params.pagination.el && e.params.pagination.hideOnClick && b && b.length > 0 && !g.classList.contains(e.params.pagination.bulletClass)) {
      if (e.navigation && (e.navigation.nextEl && g === e.navigation.nextEl || e.navigation.prevEl && g === e.navigation.prevEl)) return;
      b[0].classList.contains(e.params.pagination.hiddenClass) === !0 ? s("paginationShow") : s("paginationHide"), b.forEach((x) => x.classList.toggle(e.params.pagination.hiddenClass));
    }
  });
  const S = () => {
    e.el.classList.remove(e.params.pagination.paginationDisabledClass);
    let { el: d } = e.pagination;
    d && (d = G(d), d.forEach((f) => f.classList.remove(e.params.pagination.paginationDisabledClass))), p(), v(), u();
  }, E = () => {
    e.el.classList.add(e.params.pagination.paginationDisabledClass);
    let { el: d } = e.pagination;
    d && (d = G(d), d.forEach((f) => f.classList.add(e.params.pagination.paginationDisabledClass))), h();
  };
  Object.assign(e.pagination, {
    enable: S,
    disable: E,
    render: v,
    update: u,
    init: p,
    destroy: h
  });
}
function ai({ swiper: e, extendParams: i, on: t }) {
  i({ a11y: {
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
  } }), e.a11y = { clicked: !1 };
  let s = null, a, n, l = (/* @__PURE__ */ new Date()).getTime();
  function o(y) {
    const M = s;
    M.length !== 0 && te(M, y);
  }
  function r(y = 16) {
    const M = () => Math.round(16 * Math.random()).toString(16);
    return "x".repeat(y).replace(/x/g, M);
  }
  function c(y) {
    y = G(y), y.forEach((M) => {
      M.setAttribute("tabIndex", "0");
    });
  }
  function m(y) {
    y = G(y), y.forEach((M) => {
      M.setAttribute("tabIndex", "-1");
    });
  }
  function u(y, M) {
    y = G(y), y.forEach((T) => {
      T.setAttribute("role", M);
    });
  }
  function v(y, M) {
    y = G(y), y.forEach((T) => {
      T.setAttribute("aria-roledescription", M);
    });
  }
  function p(y, M) {
    y = G(y), y.forEach((T) => {
      T.setAttribute("aria-label", M);
    });
  }
  function h(y, M) {
    y = G(y), y.forEach((T) => {
      T.setAttribute("id", M);
    });
  }
  function S(y, M) {
    y = G(y), y.forEach((T) => {
      T.setAttribute("aria-live", M);
    });
  }
  function E(y) {
    y = G(y), y.forEach((M) => {
      M.setAttribute("aria-disabled", !0);
    });
  }
  function d(y) {
    y = G(y), y.forEach((M) => {
      M.removeAttribute("aria-disabled");
    });
  }
  function f(y) {
    if (y.keyCode !== 13 && y.keyCode !== 32) return;
    const M = e.params.a11y, T = y.target;
    if (!(e.pagination && e.pagination.el && (T === e.pagination.el || e.pagination.el.contains(y.target)) && !y.target.matches(R(e.params.pagination.bulletClass)))) {
      if (e.navigation && e.navigation.prevEl && e.navigation.nextEl) {
        const O = G(e.navigation.prevEl);
        G(e.navigation.nextEl).includes(T) && (e.isEnd && !e.params.loop || e.slideNext(), e.isEnd ? o(M.lastSlideMessage) : o(M.nextSlideMessage)), O.includes(T) && (e.isBeginning && !e.params.loop || e.slidePrev(), e.isBeginning ? o(M.firstSlideMessage) : o(M.prevSlideMessage));
      }
      e.pagination && T.matches(R(e.params.pagination.bulletClass)) && T.click();
    }
  }
  function g() {
    if (e.params.loop || e.params.rewind || !e.navigation) return;
    const { nextEl: y, prevEl: M } = e.navigation;
    M && (e.isBeginning ? (E(M), m(M)) : (d(M), c(M))), y && (e.isEnd ? (E(y), m(y)) : (d(y), c(y)));
  }
  function b() {
    return e.pagination && e.pagination.bullets && e.pagination.bullets.length;
  }
  function x() {
    return b() && e.params.pagination.clickable;
  }
  function I() {
    const y = e.params.a11y;
    b() && e.pagination.bullets.forEach((M) => {
      e.params.pagination.clickable && (c(M), e.params.pagination.renderBullet || (u(M, "button"), p(M, y.paginationBulletMessage.replace(/\{\{index\}\}/, Y(M) + 1)))), M.matches(R(e.params.pagination.bulletActiveClass)) ? M.setAttribute("aria-current", "true") : M.removeAttribute("aria-current");
    });
  }
  const z = (y, M, T) => {
    c(y), y.tagName !== "BUTTON" && (u(y, "button"), y.addEventListener("keydown", f)), p(y, T);
  }, P = (y) => {
    n && n !== y.target && !n.contains(y.target) && (a = !0), e.a11y.clicked = !0;
  }, D = () => {
    a = !1, requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        e.destroyed || (e.a11y.clicked = !1);
      });
    });
  }, w = (y) => {
    l = (/* @__PURE__ */ new Date()).getTime();
  }, C = (y) => {
    if (e.a11y.clicked || !e.params.a11y.scrollOnFocus || (/* @__PURE__ */ new Date()).getTime() - l < 100) return;
    const M = y.target.closest(`.${e.params.slideClass}, swiper-slide`);
    if (!M || !e.slides.includes(M)) return;
    n = M;
    const T = e.virtual && e.params.virtual.enabled, O = (T ? parseInt(M.getAttribute("data-swiper-slide-index"), 10) : e.slides.indexOf(M)) === e.activeIndex, $ = e.params.watchSlidesProgress && e.visibleSlides && e.visibleSlides.includes(M);
    O || $ || y.sourceCapabilities && y.sourceCapabilities.firesTouchEvents || (e.isHorizontal() ? e.el.scrollLeft = 0 : e.el.scrollTop = 0, requestAnimationFrame(() => {
      a || (e.params.loop ? e.slideToLoop(e.getSlideIndexWhenGrid(parseInt(M.getAttribute("data-swiper-slide-index"))), 0) : T ? e.slideTo(e.getSlideIndexWhenGrid(parseInt(M.getAttribute("data-swiper-slide-index"), 10)), 0) : e.slideTo(e.getSlideIndexWhenGrid(e.slides.indexOf(M)), 0), a = !1);
    }));
  }, L = () => {
    const y = e.params.a11y;
    y.itemRoleDescriptionMessage && v(e.slides, y.itemRoleDescriptionMessage), y.slideRole && u(e.slides, y.slideRole);
    const M = e.slides.length;
    y.slideLabelMessage && e.slides.forEach((T, O) => {
      const $ = e.params.loop ? parseInt(T.getAttribute("data-swiper-slide-index"), 10) : O;
      p(T, y.slideLabelMessage.replace(/\{\{index\}\}/, $ + 1).replace(/\{\{slidesLength\}\}/, M));
    });
  }, A = () => {
    const y = e.params.a11y;
    e.el.append(s);
    const M = e.el;
    y.containerRoleDescriptionMessage && v(M, y.containerRoleDescriptionMessage), y.containerMessage && p(M, y.containerMessage), y.containerRole && u(M, y.containerRole);
    const T = e.wrapperEl, O = y.id || T.getAttribute("id") || `swiper-wrapper-${r(16)}`;
    h(T, O), y.wrapperLiveRegion && S(T, e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite"), L();
    let { nextEl: $, prevEl: B } = e.navigation ? e.navigation : {};
    $ = G($), B = G(B), $ && $.forEach((W) => z(W, O, y.nextSlideMessage)), B && B.forEach((W) => z(W, O, y.prevSlideMessage)), x() && G(e.pagination.el).forEach((W) => {
      W.addEventListener("keydown", f);
    }), F().addEventListener("visibilitychange", w), e.el.addEventListener("focus", C, !0), e.el.addEventListener("pointerdown", P, !0), e.el.addEventListener("pointerup", D, !0);
  };
  function k() {
    s && s.remove();
    let { nextEl: y, prevEl: M } = e.navigation ? e.navigation : {};
    y = G(y), M = G(M), y && y.forEach((T) => T.removeEventListener("keydown", f)), M && M.forEach((T) => T.removeEventListener("keydown", f)), x() && G(e.pagination.el).forEach((T) => {
      T.removeEventListener("keydown", f);
    }), F().removeEventListener("visibilitychange", w), e.el && typeof e.el != "string" && (e.el.removeEventListener("focus", C, !0), e.el.removeEventListener("pointerdown", P, !0), e.el.removeEventListener("pointerup", D, !0));
  }
  t("beforeInit", () => {
    s = X("span", e.params.a11y.notificationClass), s.setAttribute("aria-live", "assertive"), s.setAttribute("aria-atomic", "true");
  }), t("afterInit", () => {
    e.params.a11y.enabled && A();
  }), t("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
    e.params.a11y.enabled && L();
  }), t("fromEdge toEdge afterInit lock unlock", () => {
    e.params.a11y.enabled && g();
  }), t("paginationUpdate", () => {
    e.params.a11y.enabled && I();
  }), t("destroy", () => {
    e.params.a11y.enabled && k();
  });
}
function ri({ swiper: e, extendParams: i, on: t, emit: s, params: a }) {
  e.autoplay = {
    running: !1,
    paused: !1,
    timeLeft: 0
  }, i({ autoplay: {
    enabled: !1,
    delay: 3e3,
    waitForTransition: !0,
    disableOnInteraction: !1,
    stopOnLastSlide: !1,
    reverseDirection: !1,
    pauseOnMouseEnter: !1
  } });
  let n, l, o = a && a.autoplay ? a.autoplay.delay : 3e3, r = a && a.autoplay ? a.autoplay.delay : 3e3, c, m = (/* @__PURE__ */ new Date()).getTime(), u, v, p, h, S, E;
  function d(T) {
    !e || e.destroyed || !e.wrapperEl || T.target === e.wrapperEl && (e.wrapperEl.removeEventListener("transitionend", d), !(E || T.detail && T.detail.bySwiperTouchMove) && D());
  }
  const f = () => {
    if (e.destroyed || !e.autoplay.running) return;
    e.autoplay.paused ? u = !0 : u && (r = c, u = !1);
    const T = e.autoplay.paused ? c : m + r - (/* @__PURE__ */ new Date()).getTime();
    e.autoplay.timeLeft = T, s("autoplayTimeLeft", T, T / o), l = requestAnimationFrame(() => {
      f();
    });
  }, g = () => {
    let T;
    if (e.virtual && e.params.virtual.enabled ? T = e.slides.find((O) => O.classList.contains("swiper-slide-active")) : T = e.slides[e.activeIndex], !!T)
      return parseInt(T.getAttribute("data-swiper-autoplay"), 10);
  }, b = () => {
    let T = e.params.autoplay.delay;
    const O = g();
    return !Number.isNaN(O) && O > 0 && (T = O), T;
  }, x = (T) => {
    if (e.destroyed || !e.autoplay.running) return;
    cancelAnimationFrame(l), f();
    let O = T;
    typeof O > "u" && (O = b(), o = O, r = O), c = O;
    const $ = e.params.speed, B = () => {
      !e || e.destroyed || (e.params.autoplay.reverseDirection ? !e.isBeginning || e.params.loop || e.params.rewind ? (e.slidePrev($, !0, !0), s("autoplay")) : e.params.autoplay.stopOnLastSlide || (e.slideTo(e.slides.length - 1, $, !0, !0), s("autoplay")) : !e.isEnd || e.params.loop || e.params.rewind ? (e.slideNext($, !0, !0), s("autoplay")) : e.params.autoplay.stopOnLastSlide || (e.slideTo(0, $, !0, !0), s("autoplay")), e.params.cssMode && (m = (/* @__PURE__ */ new Date()).getTime(), requestAnimationFrame(() => {
        x();
      })));
    };
    return O > 0 ? (clearTimeout(n), n = setTimeout(() => {
      B();
    }, O)) : requestAnimationFrame(() => {
      B();
    }), O;
  }, I = () => {
    m = (/* @__PURE__ */ new Date()).getTime(), e.autoplay.running = !0, x(), s("autoplayStart");
  }, z = () => {
    e.autoplay.running = !1, clearTimeout(n), cancelAnimationFrame(l), s("autoplayStop");
  }, P = (T, O) => {
    if (e.destroyed || !e.autoplay.running) return;
    clearTimeout(n), T || (S = !0);
    const $ = () => {
      s("autoplayPause"), e.params.autoplay.waitForTransition ? e.wrapperEl.addEventListener("transitionend", d) : D();
    };
    if (e.autoplay.paused = !0, O) {
      $();
      return;
    }
    c = (c || e.params.autoplay.delay) - ((/* @__PURE__ */ new Date()).getTime() - m), !(e.isEnd && c < 0 && !e.params.loop) && (c < 0 && (c = 0), $());
  }, D = () => {
    e.isEnd && c < 0 && !e.params.loop || e.destroyed || !e.autoplay.running || (m = (/* @__PURE__ */ new Date()).getTime(), S ? (S = !1, x(c)) : x(), e.autoplay.paused = !1, s("autoplayResume"));
  }, w = () => {
    if (e.destroyed || !e.autoplay.running) return;
    const T = F();
    T.visibilityState === "hidden" && (S = !0, P(!0)), T.visibilityState === "visible" && D();
  }, C = (T) => {
    T.pointerType === "mouse" && (S = !0, E = !0, !(e.animating || e.autoplay.paused) && P(!0));
  }, L = (T) => {
    T.pointerType === "mouse" && (E = !1, e.autoplay.paused && D());
  }, A = () => {
    e.params.autoplay.pauseOnMouseEnter && (e.el.addEventListener("pointerenter", C), e.el.addEventListener("pointerleave", L));
  }, k = () => {
    e.el && typeof e.el != "string" && (e.el.removeEventListener("pointerenter", C), e.el.removeEventListener("pointerleave", L));
  }, y = () => {
    F().addEventListener("visibilitychange", w);
  }, M = () => {
    F().removeEventListener("visibilitychange", w);
  };
  t("init", () => {
    e.params.autoplay.enabled && (A(), y(), I());
  }), t("destroy", () => {
    k(), M(), e.autoplay.running && z();
  }), t("_freeModeStaticRelease", () => {
    (p || S) && D();
  }), t("_freeModeNoMomentumRelease", () => {
    e.params.autoplay.disableOnInteraction ? z() : P(!0, !0);
  }), t("beforeTransitionStart", (T, O, $) => {
    e.destroyed || !e.autoplay.running || ($ || !e.params.autoplay.disableOnInteraction ? P(!0, !0) : z());
  }), t("sliderFirstMove", () => {
    if (!(e.destroyed || !e.autoplay.running)) {
      if (e.params.autoplay.disableOnInteraction) {
        z();
        return;
      }
      v = !0, p = !1, S = !1, h = setTimeout(() => {
        S = !0, p = !0, P(!0);
      }, 200);
    }
  }), t("touchEnd", () => {
    if (!(e.destroyed || !e.autoplay.running || !v)) {
      if (clearTimeout(h), clearTimeout(n), e.params.autoplay.disableOnInteraction) {
        p = !1, v = !1;
        return;
      }
      p && e.params.cssMode && D(), p = !1, v = !1;
    }
  }), t("slideChange", () => {
    e.destroyed || !e.autoplay.running || e.autoplay.paused && (c = b(), o = b());
  }), Object.assign(e.autoplay, {
    start: I,
    stop: z,
    pause: P,
    resume: D
  });
}
function ke(e) {
  const { effect: i, swiper: t, on: s, setTranslate: a, setTransition: n, overwriteParams: l, perspective: o, recreateShadows: r, getEffectParams: c } = e;
  s("beforeInit", () => {
    if (t.params.effect !== i) return;
    t.classNames.push(`${t.params.containerModifierClass}${i}`), o && o() && t.classNames.push(`${t.params.containerModifierClass}3d`);
    const u = l ? l() : {};
    Object.assign(t.params, u), Object.assign(t.originalParams, u);
  }), s("setTranslate _virtualUpdated", () => {
    t.params.effect === i && a();
  }), s("setTransition", (u, v) => {
    t.params.effect === i && n(v);
  }), s("transitionEnd", () => {
    if (t.params.effect === i && r) {
      if (!c || !c().slideShadows) return;
      t.slides.forEach((u) => {
        u.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((v) => v.remove());
      }), r();
    }
  });
  let m;
  s("virtualUpdate", () => {
    t.params.effect === i && (t.slides.length || (m = !0), requestAnimationFrame(() => {
      m && t.slides && t.slides.length && (a(), m = !1);
    }));
  });
}
function Ae(e, i) {
  const t = ie(i);
  return t !== i && (t.style.backfaceVisibility = "hidden", t.style["-webkit-backface-visibility"] = "hidden"), t;
}
function Oe({ swiper: e, duration: i, transformElements: t, allSlides: s }) {
  const { activeIndex: a } = e, n = (l) => l.parentElement ? l.parentElement : e.slides.find((o) => o.shadowRoot && o.shadowRoot === l.parentNode);
  if (e.params.virtualTranslate && i !== 0) {
    let l = !1, o;
    s ? o = t : o = t.filter((r) => {
      const c = r.classList.contains("swiper-slide-transform") ? n(r) : r;
      return e.getSlideIndex(c) === a;
    }), o.forEach((r) => {
      We(r, () => {
        if (l || !e || e.destroyed) return;
        l = !0, e.animating = !1;
        const c = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0
        });
        e.wrapperEl.dispatchEvent(c);
      });
    });
  }
}
function li({ swiper: e, extendParams: i, on: t }) {
  i({ fadeEffect: { crossFade: !1 } }), ke({
    effect: "fade",
    swiper: e,
    on: t,
    setTranslate: () => {
      const { slides: n } = e, l = e.params.fadeEffect;
      for (let o = 0; o < n.length; o += 1) {
        const r = e.slides[o];
        let c = -r.swiperSlideOffset;
        e.params.virtualTranslate || (c -= e.translate);
        let m = 0;
        e.isHorizontal() || (m = c, c = 0);
        const u = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(r.progress), 0) : 1 + Math.min(Math.max(r.progress, -1), 0), v = Ae(l, r);
        v.style.opacity = u, v.style.transform = `translate3d(${c}px, ${m}px, 0px)`;
      }
    },
    setTransition: (n) => {
      const l = e.slides.map((o) => ie(o));
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
  const s = `swiper-slide-shadow${t ? `-${t}` : ""}${e ? ` swiper-slide-shadow-${e}` : ""}`, a = ie(i);
  let n = a.querySelector(`.${s.split(" ").join(".")}`);
  return n || (n = X("div", s.split(" ")), a.append(n)), n;
}
function di({ swiper: e, extendParams: i, on: t }) {
  i({ creativeEffect: {
    limitProgress: 1,
    shadowPerProgress: !1,
    progressMultiplier: 1,
    perspective: !0,
    prev: {
      translate: [
        0,
        0,
        0
      ],
      rotate: [
        0,
        0,
        0
      ],
      opacity: 1,
      scale: 1
    },
    next: {
      translate: [
        0,
        0,
        0
      ],
      rotate: [
        0,
        0,
        0
      ],
      opacity: 1,
      scale: 1
    }
  } });
  const s = (l) => typeof l == "string" ? l : `${l}px`;
  ke({
    effect: "creative",
    swiper: e,
    on: t,
    setTranslate: () => {
      const { slides: l, wrapperEl: o, slidesSizesGrid: r } = e, c = e.params.creativeEffect, { progressMultiplier: m } = c, u = e.params.centeredSlides, v = je(e);
      if (u) {
        const p = r[0] / 2 - e.params.slidesOffsetBefore || 0;
        o.style.transform = `translateX(calc(50% - ${p}px))`;
      }
      for (let p = 0; p < l.length; p += 1) {
        const h = l[p], S = h.progress, E = Math.min(Math.max(h.progress, -c.limitProgress), c.limitProgress);
        let d = E;
        u || (d = Math.min(Math.max(h.originalProgress, -c.limitProgress), c.limitProgress));
        const f = h.swiperSlideOffset, g = [
          e.params.cssMode ? -f - e.translate : -f,
          0,
          0
        ], b = [
          0,
          0,
          0
        ];
        let x = !1;
        e.isHorizontal() || (g[1] = g[0], g[0] = 0);
        let I = {
          translate: [
            0,
            0,
            0
          ],
          rotate: [
            0,
            0,
            0
          ],
          scale: 1,
          opacity: 1
        };
        E < 0 ? (I = c.next, x = !0) : E > 0 && (I = c.prev, x = !0), g.forEach((A, k) => {
          g[k] = `calc(${A}px + (${s(I.translate[k])} * ${Math.abs(E * m)}))`;
        }), b.forEach((A, k) => {
          b[k] = I.rotate[k] * Math.abs(E * m);
        }), h.style.zIndex = -Math.abs(Math.round(S)) + l.length;
        const z = g.join(", "), P = `rotateX(${v(b[0])}deg) rotateY(${v(b[1])}deg) rotateZ(${v(b[2])}deg)`, D = d < 0 ? `scale(${1 + (1 - I.scale) * d * m})` : `scale(${1 - (1 - I.scale) * d * m})`, w = d < 0 ? 1 + (1 - I.opacity) * d * m : 1 - (1 - I.opacity) * d * m, C = `translate3d(${z}) ${P} ${D}`;
        if (x && I.shadow || !x) {
          let A = h.querySelector(".swiper-slide-shadow");
          if (!A && I.shadow && (A = oi("creative", h)), A) {
            const k = c.shadowPerProgress ? E * (1 / c.limitProgress) : E;
            A.style.opacity = Math.min(Math.max(Math.abs(k), 0), 1);
          }
        }
        const L = Ae(c, h);
        L.style.transform = C, L.style.opacity = w, I.origin && (L.style.transformOrigin = I.origin);
      }
    },
    setTransition: (l) => {
      const o = e.slides.map((r) => ie(r));
      o.forEach((r) => {
        r.style.transitionDuration = `${l}ms`, r.querySelectorAll(".swiper-slide-shadow").forEach((c) => {
          c.style.transitionDuration = `${l}ms`;
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
  const i = getComputedStyle(e), t = i.getPropertyValue("--swiper-block-ratio").trim(), s = i.getPropertyValue("--swiper-block-height").trim();
  s && (e.style.height = s);
}
function U() {
  document.querySelectorAll(".swiper-block").forEach((e) => {
    if (e._swiperInstance) return;
    ci(e);
    let i = {};
    try {
      const a = e.dataset.swiperConfig;
      a && (i = JSON.parse(a));
    } catch (a) {
      console.warn("[swiper-block] Could not parse data-swiper-config", a);
    }
    const t = [ai, ii];
    i.navigation && t.push(si), i.pagination && t.push(ni), i.autoplay && t.push(ri);
    const s = i.effect ?? "slide";
    s === "fade" && t.push(li), s === "creative" && t.push(di), e._swiperInstance = new pe(e, {
      ...i,
      modules: t,
      wrapperClass: "swiper-wrapper",
      slideClass: "swiper-slide",
      navigation: i.navigation ? {
        nextEl: `#${e.id} .swiper-button-next`,
        prevEl: `#${e.id} .swiper-button-prev`
      } : !1,
      pagination: i.pagination ? {
        el: `#${e.id} .swiper-pagination`,
        clickable: !0,
        dynamicBullets: !0
      } : !1,
      autoplay: i.autoplay || !1,
      a11y: {
        enabled: !0,
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide"
      },
      keyboard: {
        enabled: !0,
        onlyInViewport: !0
      },
      observer: !0,
      observeParents: !0,
      lazyPreloadPrevNext: 1,
      creativeEffect: i.creativeEffect ?? {
        prev: {
          shadow: !0,
          translate: [
            0,
            0,
            -400
          ]
        },
        next: { translate: [
          "100%",
          0,
          0
        ] }
      }
    }), e.querySelectorAll(".swiper-slide__img").forEach((a) => {
      a.complete ? a.closest(".swiper-slide__media")?.classList.add("is-loaded") : a.addEventListener("load", () => {
        a.closest(".swiper-slide__media")?.classList.add("is-loaded");
      }, { once: !0 });
    });
  });
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", U) : U();
document.addEventListener("turbo:render", U);
document.addEventListener("turbo:frame-render", U);
document.addEventListener("htmx:afterSettle", U);
export {
  U as initSwiperBlocks
};

//# sourceMappingURL=swiper-block.js.map