import { S as R, _ as J, a as j, b as Z, c as Le, d as Pe, f as W, g as ve, h as G, i as N, l as oe, m as we, n as X, o as Ie, p as F, r as ke, s as Ae, t as ye, u as Q, v as Y, x as $, y as ee } from "../utils-D0b02zKE.js";
var te;
function Oe() {
  const e = R(), s = $();
  return {
    smoothScroll: s.documentElement && s.documentElement.style && "scrollBehavior" in s.documentElement.style,
    touch: !!("ontouchstart" in e || e.DocumentTouch && s instanceof e.DocumentTouch)
  };
}
function be() {
  return te || (te = Oe()), te;
}
var ie;
function ze({ userAgent: e } = {}) {
  const s = be(), t = R(), i = t.navigator.platform, n = e || t.navigator.userAgent, a = {
    ios: !1,
    android: !1
  }, l = t.screen.width, o = t.screen.height, r = n.match(/(Android);?[\s\/]+([\d.]+)?/);
  let u = n.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
  const m = n.match(/(iPod)(.*OS\s([\d_]+))?/), p = !u && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/), y = i === "Win32";
  let f = i === "MacIntel";
  return !u && f && s.touch && [
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
  ].indexOf(`${l}x${o}`) >= 0 && (u = n.match(/(Version)\/([\d.]+)/), u || (u = [
    0,
    1,
    "13_0_0"
  ]), f = !1), r && !y && (a.os = "android", a.android = !0), (u || p || m) && (a.os = "ios", a.ios = !0), a;
}
function Se(e = {}) {
  return ie || (ie = ze(e)), ie;
}
var se;
function De() {
  const e = R(), s = Se();
  let t = !1;
  function i() {
    const o = e.navigator.userAgent.toLowerCase();
    return o.indexOf("safari") >= 0 && o.indexOf("chrome") < 0 && o.indexOf("android") < 0;
  }
  if (i()) {
    const o = String(e.navigator.userAgent);
    if (o.includes("Version/")) {
      const [r, u] = o.split("Version/")[1].split(" ")[0].split(".").map((m) => Number(m));
      t = r < 16 || r === 16 && u < 2;
    }
  }
  const n = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent), a = i(), l = a || n && s.ios;
  return {
    isSafari: t || a,
    needPerspectiveFix: t,
    need3dFix: l,
    isWebView: n
  };
}
function Te() {
  return se || (se = De()), se;
}
function Ge({ swiper: e, on: s, emit: t }) {
  const i = R();
  let n = null, a = null;
  const l = () => {
    !e || e.destroyed || !e.initialized || (t("beforeResize"), t("resize"));
  }, o = () => {
    !e || e.destroyed || !e.initialized || (n = new ResizeObserver((m) => {
      a = i.requestAnimationFrame(() => {
        const { width: p, height: y } = e;
        let f = p, g = y;
        m.forEach(({ contentBoxSize: S, contentRect: M, target: d }) => {
          d && d !== e.el || (f = M ? M.width : (S[0] || S).inlineSize, g = M ? M.height : (S[0] || S).blockSize);
        }), (f !== p || g !== y) && l();
      });
    }), n.observe(e.el));
  }, r = () => {
    a && i.cancelAnimationFrame(a), n && n.unobserve && e.el && (n.unobserve(e.el), n = null);
  }, u = () => {
    !e || e.destroyed || !e.initialized || t("orientationchange");
  };
  s("init", () => {
    if (e.params.resizeObserver && typeof i.ResizeObserver < "u") {
      o();
      return;
    }
    i.addEventListener("resize", l), i.addEventListener("orientationchange", u);
  }), s("destroy", () => {
    r(), i.removeEventListener("resize", l), i.removeEventListener("orientationchange", u);
  });
}
function Be({ swiper: e, extendParams: s, on: t, emit: i }) {
  const n = [], a = R(), l = (u, m = {}) => {
    const p = new (a.MutationObserver || a.WebkitMutationObserver)((y) => {
      if (e.__preventObserver__) return;
      if (y.length === 1) {
        i("observerUpdate", y[0]);
        return;
      }
      const f = function() {
        i("observerUpdate", y[0]);
      };
      a.requestAnimationFrame ? a.requestAnimationFrame(f) : a.setTimeout(f, 0);
    });
    p.observe(u, {
      attributes: typeof m.attributes > "u" ? !0 : m.attributes,
      childList: e.isElement || (typeof m.childList > "u" ? !0 : m).childList,
      characterData: typeof m.characterData > "u" ? !0 : m.characterData
    }), n.push(p);
  }, o = () => {
    if (e.params.observer) {
      if (e.params.observeParents) {
        const u = Q(e.hostEl);
        for (let m = 0; m < u.length; m += 1) l(u[m]);
      }
      l(e.hostEl, { childList: e.params.observeSlideChildren }), l(e.wrapperEl, { attributes: !1 });
    }
  }, r = () => {
    n.forEach((u) => {
      u.disconnect();
    }), n.splice(0, n.length);
  };
  s({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), t("init", o), t("destroy", r);
}
var Ve = {
  on(e, s, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof s != "function") return i;
    const n = t ? "unshift" : "push";
    return e.split(" ").forEach((a) => {
      i.eventsListeners[a] || (i.eventsListeners[a] = []), i.eventsListeners[a][n](s);
    }), i;
  },
  once(e, s, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof s != "function") return i;
    function n(...a) {
      i.off(e, n), n.__emitterProxy && delete n.__emitterProxy, s.apply(i, a);
    }
    return n.__emitterProxy = s, i.on(e, n, t);
  },
  onAny(e, s) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || typeof e != "function") return t;
    const i = s ? "unshift" : "push";
    return t.eventsAnyListeners.indexOf(e) < 0 && t.eventsAnyListeners[i](e), t;
  },
  offAny(e) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || !s.eventsAnyListeners) return s;
    const t = s.eventsAnyListeners.indexOf(e);
    return t >= 0 && s.eventsAnyListeners.splice(t, 1), s;
  },
  off(e, s) {
    const t = this;
    return !t.eventsListeners || t.destroyed || !t.eventsListeners || e.split(" ").forEach((i) => {
      typeof s > "u" ? t.eventsListeners[i] = [] : t.eventsListeners[i] && t.eventsListeners[i].forEach((n, a) => {
        (n === s || n.__emitterProxy && n.__emitterProxy === s) && t.eventsListeners[i].splice(a, 1);
      });
    }), t;
  },
  emit(...e) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || !s.eventsListeners) return s;
    let t, i, n;
    return typeof e[0] == "string" || Array.isArray(e[0]) ? (t = e[0], i = e.slice(1, e.length), n = s) : (t = e[0].events, i = e[0].data, n = e[0].context || s), i.unshift(n), (Array.isArray(t) ? t : t.split(" ")).forEach((a) => {
      s.eventsAnyListeners && s.eventsAnyListeners.length && s.eventsAnyListeners.forEach((l) => {
        l.apply(n, [a, ...i]);
      }), s.eventsListeners && s.eventsListeners[a] && s.eventsListeners[a].forEach((l) => {
        l.apply(n, i);
      });
    }), s;
  }
};
function $e() {
  const e = this;
  let s, t;
  const i = e.el;
  typeof e.params.width < "u" && e.params.width !== null ? s = e.params.width : s = i.clientWidth, typeof e.params.height < "u" && e.params.height !== null ? t = e.params.height : t = i.clientHeight, !(s === 0 && e.isHorizontal() || t === 0 && e.isVertical()) && (s = s - parseInt(W(i, "padding-left") || 0, 10) - parseInt(W(i, "padding-right") || 0, 10), t = t - parseInt(W(i, "padding-top") || 0, 10) - parseInt(W(i, "padding-bottom") || 0, 10), Number.isNaN(s) && (s = 0), Number.isNaN(t) && (t = 0), Object.assign(e, {
    width: s,
    height: t,
    size: e.isHorizontal() ? s : t
  }));
}
function Fe() {
  const e = this;
  function s(P, C) {
    return parseFloat(P.getPropertyValue(e.getDirectionLabel(C)) || 0);
  }
  const t = e.params, { wrapperEl: i, slidesEl: n, rtlTranslate: a, wrongRTL: l } = e, o = e.virtual && t.virtual.enabled, r = o ? e.virtual.slides.length : e.slides.length, u = N(n, `.${e.params.slideClass}, swiper-slide`), m = o ? e.virtual.slides.length : u.length;
  let p = [];
  const y = [], f = [];
  let g = t.slidesOffsetBefore;
  typeof g == "function" && (g = t.slidesOffsetBefore.call(e));
  let S = t.slidesOffsetAfter;
  typeof S == "function" && (S = t.slidesOffsetAfter.call(e));
  const M = e.snapGrid.length, d = e.slidesGrid.length, c = e.size - g - S;
  let h = t.spaceBetween, b = -g, E = 0, k = 0;
  if (typeof c > "u") return;
  typeof h == "string" && h.indexOf("%") >= 0 ? h = parseFloat(h.replace("%", "")) / 100 * c : typeof h == "string" && (h = parseFloat(h)), e.virtualSize = -h - g - S, u.forEach((P) => {
    a ? P.style.marginLeft = "" : P.style.marginRight = "", P.style.marginBottom = "", P.style.marginTop = "";
  }), t.centeredSlides && t.cssMode && (Y(i, "--swiper-centered-offset-before", ""), Y(i, "--swiper-centered-offset-after", "")), t.cssMode && (Y(i, "--swiper-slides-offset-before", `${g}px`), Y(i, "--swiper-slides-offset-after", `${S}px`));
  const z = t.grid && t.grid.rows > 1 && e.grid;
  z ? e.grid.initSlides(u) : e.grid && e.grid.unsetSlides();
  let L;
  const D = t.slidesPerView === "auto" && t.breakpoints && Object.keys(t.breakpoints).filter((P) => typeof t.breakpoints[P].slidesPerView < "u").length > 0;
  for (let P = 0; P < m; P += 1) {
    L = 0;
    const C = u[P];
    if (!(C && (z && e.grid.updateSlide(P, C, u), W(C, "display") === "none"))) {
      if (o && t.slidesPerView === "auto")
        t.virtual.slidesPerViewAutoSlideSize && (L = t.virtual.slidesPerViewAutoSlideSize), L && C && (t.roundLengths && (L = Math.floor(L)), C.style[e.getDirectionLabel("width")] = `${L}px`);
      else if (t.slidesPerView === "auto") {
        D && (C.style[e.getDirectionLabel("width")] = "");
        const w = getComputedStyle(C), O = C.style.transform, A = C.style.webkitTransform;
        if (O && (C.style.transform = "none"), A && (C.style.webkitTransform = "none"), t.roundLengths) L = e.isHorizontal() ? oe(C, "width", !0) : oe(C, "height", !0);
        else {
          const v = s(w, "width"), x = s(w, "padding-left"), T = s(w, "padding-right"), I = s(w, "margin-left"), B = s(w, "margin-right"), V = w.getPropertyValue("box-sizing");
          if (V && V === "border-box") L = v + I + B;
          else {
            const { clientWidth: q, offsetWidth: Me } = C;
            L = v + x + T + I + B + (Me - q);
          }
        }
        O && (C.style.transform = O), A && (C.style.webkitTransform = A), t.roundLengths && (L = Math.floor(L));
      } else
        L = (c - (t.slidesPerView - 1) * h) / t.slidesPerView, t.roundLengths && (L = Math.floor(L)), C && (C.style[e.getDirectionLabel("width")] = `${L}px`);
      C && (C.swiperSlideSize = L), f.push(L), t.centeredSlides ? (b = b + L / 2 + E / 2 + h, E === 0 && P !== 0 && (b = b - c / 2 - h), P === 0 && (b = b - c / 2 - h), Math.abs(b) < 1 / 1e3 && (b = 0), t.roundLengths && (b = Math.floor(b)), k % t.slidesPerGroup === 0 && p.push(b), y.push(b)) : (t.roundLengths && (b = Math.floor(b)), (k - Math.min(e.params.slidesPerGroupSkip, k)) % e.params.slidesPerGroup === 0 && p.push(b), y.push(b), b = b + L + h), e.virtualSize += L + h, E = L, k += 1;
    }
  }
  if (e.virtualSize = Math.max(e.virtualSize, c) + S, a && l && (t.effect === "slide" || t.effect === "coverflow") && (i.style.width = `${e.virtualSize + h}px`), t.setWrapperSize && (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + h}px`), z && e.grid.updateWrapperSize(L, p), !t.centeredSlides) {
    const P = t.slidesPerView !== "auto" && t.slidesPerView % 1 !== 0, C = t.snapToSlideEdge && !t.loop && (t.slidesPerView === "auto" || P);
    let w = p.length;
    if (C) {
      let A;
      if (t.slidesPerView === "auto") {
        A = 1;
        let v = 0;
        for (let x = f.length - 1; x >= 0 && (v += f[x] + (x < f.length - 1 ? h : 0), v <= c); x -= 1)
          A = f.length - x;
      } else A = Math.floor(t.slidesPerView);
      w = Math.max(m - A, 0);
    }
    const O = [];
    for (let A = 0; A < p.length; A += 1) {
      let v = p[A];
      t.roundLengths && (v = Math.floor(v)), C ? A <= w && O.push(v) : p[A] <= e.virtualSize - c && O.push(v);
    }
    p = O, Math.floor(e.virtualSize - c) - Math.floor(p[p.length - 1]) > 1 && (C || p.push(e.virtualSize - c));
  }
  if (o && t.loop) {
    const P = f[0] + h;
    if (t.slidesPerGroup > 1) {
      const C = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / t.slidesPerGroup), w = P * t.slidesPerGroup;
      for (let O = 0; O < C; O += 1) p.push(p[p.length - 1] + w);
    }
    for (let C = 0; C < e.virtual.slidesBefore + e.virtual.slidesAfter; C += 1)
      t.slidesPerGroup === 1 && p.push(p[p.length - 1] + P), y.push(y[y.length - 1] + P), e.virtualSize += P;
  }
  if (p.length === 0 && (p = [0]), h !== 0) {
    const P = e.isHorizontal() && a ? "marginLeft" : e.getDirectionLabel("marginRight");
    u.filter((C, w) => !t.cssMode || t.loop ? !0 : w !== u.length - 1).forEach((C) => {
      C.style[P] = `${h}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let P = 0;
    f.forEach((w) => {
      P += w + (h || 0);
    }), P -= h;
    const C = P > c ? P - c : 0;
    p = p.map((w) => w <= 0 ? -g : w > C ? C + S : w);
  }
  if (t.centerInsufficientSlides) {
    let P = 0;
    if (f.forEach((C) => {
      P += C + (h || 0);
    }), P -= h, P < c) {
      const C = (c - P) / 2;
      p.forEach((w, O) => {
        p[O] = w - C;
      }), y.forEach((w, O) => {
        y[O] = w + C;
      });
    }
  }
  if (Object.assign(e, {
    slides: u,
    snapGrid: p,
    slidesGrid: y,
    slidesSizesGrid: f
  }), t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
    Y(i, "--swiper-centered-offset-before", `${-p[0]}px`), Y(i, "--swiper-centered-offset-after", `${e.size / 2 - f[f.length - 1] / 2}px`);
    const P = -e.snapGrid[0], C = -e.slidesGrid[0];
    e.snapGrid = e.snapGrid.map((w) => w + P), e.slidesGrid = e.slidesGrid.map((w) => w + C);
  }
  if (m !== r && e.emit("slidesLengthChange"), p.length !== M && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), y.length !== d && e.emit("slidesGridLengthChange"), t.watchSlidesProgress && e.updateSlidesOffset(), e.emit("slidesUpdated"), !o && !t.cssMode && (t.effect === "slide" || t.effect === "fade")) {
    const P = `${t.containerModifierClass}backface-hidden`, C = e.el.classList.contains(P);
    m <= t.maxBackfaceHiddenSlides ? C || e.el.classList.add(P) : C && e.el.classList.remove(P);
  }
}
function Ne(e) {
  const s = this, t = [], i = s.virtual && s.params.virtual.enabled;
  let n = 0, a;
  typeof e == "number" ? s.setTransition(e) : e === !0 && s.setTransition(s.params.speed);
  const l = (o) => i ? s.slides[s.getSlideIndexByData(o)] : s.slides[o];
  if (s.params.slidesPerView !== "auto" && s.params.slidesPerView > 1) if (s.params.centeredSlides) (s.visibleSlides || []).forEach((o) => {
    t.push(o);
  });
  else for (a = 0; a < Math.ceil(s.params.slidesPerView); a += 1) {
    const o = s.activeIndex + a;
    if (o > s.slides.length && !i) break;
    t.push(l(o));
  }
  else t.push(l(s.activeIndex));
  for (a = 0; a < t.length; a += 1) if (typeof t[a] < "u") {
    const o = t[a].offsetHeight;
    n = o > n ? o : n;
  }
  (n || n === 0) && (s.wrapperEl.style.height = `${n}px`);
}
function _e() {
  const e = this, s = e.slides, t = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
  for (let i = 0; i < s.length; i += 1) s[i].swiperSlideOffset = (e.isHorizontal() ? s[i].offsetLeft : s[i].offsetTop) - t - e.cssOverflowAdjustment();
}
var fe = (e, s, t) => {
  s && !e.classList.contains(t) ? e.classList.add(t) : !s && e.classList.contains(t) && e.classList.remove(t);
};
function Re(e = this && this.translate || 0) {
  const s = this, t = s.params, { slides: i, rtlTranslate: n, snapGrid: a } = s;
  if (i.length === 0) return;
  typeof i[0].swiperSlideOffset > "u" && s.updateSlidesOffset();
  let l = -e;
  n && (l = e), s.visibleSlidesIndexes = [], s.visibleSlides = [];
  let o = t.spaceBetween;
  typeof o == "string" && o.indexOf("%") >= 0 ? o = parseFloat(o.replace("%", "")) / 100 * s.size : typeof o == "string" && (o = parseFloat(o));
  for (let r = 0; r < i.length; r += 1) {
    const u = i[r];
    let m = u.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (m -= i[0].swiperSlideOffset);
    const p = (l + (t.centeredSlides ? s.minTranslate() : 0) - m) / (u.swiperSlideSize + o), y = (l - a[0] + (t.centeredSlides ? s.minTranslate() : 0) - m) / (u.swiperSlideSize + o), f = -(l - m), g = f + s.slidesSizesGrid[r], S = f >= 0 && f <= s.size - s.slidesSizesGrid[r], M = f >= 0 && f < s.size - 1 || g > 1 && g <= s.size || f <= 0 && g >= s.size;
    M && (s.visibleSlides.push(u), s.visibleSlidesIndexes.push(r)), fe(u, M, t.slideVisibleClass), fe(u, S, t.slideFullyVisibleClass), u.progress = n ? -p : p, u.originalProgress = n ? -y : y;
  }
}
function He(e) {
  const s = this;
  if (typeof e > "u") {
    const m = s.rtlTranslate ? -1 : 1;
    e = s && s.translate && s.translate * m || 0;
  }
  const t = s.params, i = s.maxTranslate() - s.minTranslate();
  let { progress: n, isBeginning: a, isEnd: l, progressLoop: o } = s;
  const r = a, u = l;
  if (i === 0)
    n = 0, a = !0, l = !0;
  else {
    n = (e - s.minTranslate()) / i;
    const m = Math.abs(e - s.minTranslate()) < 1, p = Math.abs(e - s.maxTranslate()) < 1;
    a = m || n <= 0, l = p || n >= 1, m && (n = 0), p && (n = 1);
  }
  if (t.loop) {
    const m = s.getSlideIndexByData(0), p = s.getSlideIndexByData(s.slides.length - 1), y = s.slidesGrid[m], f = s.slidesGrid[p], g = s.slidesGrid[s.slidesGrid.length - 1], S = Math.abs(e);
    S >= y ? o = (S - y) / g : o = (S + g - f) / g, o > 1 && (o -= 1);
  }
  Object.assign(s, {
    progress: n,
    progressLoop: o,
    isBeginning: a,
    isEnd: l
  }), (t.watchSlidesProgress || t.centeredSlides && t.autoHeight) && s.updateSlidesProgress(e), a && !r && s.emit("reachBeginning toEdge"), l && !u && s.emit("reachEnd toEdge"), (r && !a || u && !l) && s.emit("fromEdge"), s.emit("progress", n);
}
var ae = (e, s, t) => {
  s && !e.classList.contains(t) ? e.classList.add(t) : !s && e.classList.contains(t) && e.classList.remove(t);
};
function We() {
  const e = this, { slides: s, params: t, slidesEl: i, activeIndex: n } = e, a = e.virtual && t.virtual.enabled, l = e.grid && t.grid && t.grid.rows > 1, o = (p) => N(i, `.${t.slideClass}${p}, swiper-slide${p}`)[0];
  let r, u, m;
  if (a) if (t.loop) {
    let p = n - e.virtual.slidesBefore;
    p < 0 && (p = e.virtual.slides.length + p), p >= e.virtual.slides.length && (p -= e.virtual.slides.length), r = o(`[data-swiper-slide-index="${p}"]`);
  } else r = o(`[data-swiper-slide-index="${n}"]`);
  else l ? (r = s.find((p) => p.column === n), m = s.find((p) => p.column === n + 1), u = s.find((p) => p.column === n - 1)) : r = s[n];
  r && (l || (m = Ae(r, `.${t.slideClass}, swiper-slide`)[0], t.loop && !m && (m = s[0]), u = Pe(r, `.${t.slideClass}, swiper-slide`)[0], t.loop)), s.forEach((p) => {
    ae(p, p === r, t.slideActiveClass), ae(p, p === m, t.slideNextClass), ae(p, p === u, t.slidePrevClass);
  }), e.emitSlidesClasses();
}
var K = (e, s) => {
  if (!e || e.destroyed || !e.params) return;
  const t = () => e.isElement ? "swiper-slide" : `.${e.params.slideClass}`, i = s.closest(t());
  if (i) {
    let n = i.querySelector(`.${e.params.lazyPreloaderClass}`);
    !n && e.isElement && (i.shadowRoot ? n = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
      i.shadowRoot && (n = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`), n && !n.lazyPreloaderManaged && n.remove());
    })), n && !n.lazyPreloaderManaged && n.remove();
  }
}, ne = (e, s) => {
  if (!e.slides[s]) return;
  const t = e.slides[s].querySelector('[loading="lazy"]');
  t && t.removeAttribute("loading");
}, de = (e) => {
  if (!e || e.destroyed || !e.params) return;
  let s = e.params.lazyPreloadPrevNext;
  const t = e.slides.length;
  if (!t || !s || s < 0) return;
  s = Math.min(s, t);
  const i = e.params.slidesPerView === "auto" ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), n = e.activeIndex;
  if (e.params.grid && e.params.grid.rows > 1) {
    const l = n, o = [l - s];
    o.push(...Array.from({ length: s }).map((r, u) => l + i + u)), e.slides.forEach((r, u) => {
      o.includes(r.column) && ne(e, u);
    });
    return;
  }
  const a = n + i - 1;
  if (e.params.rewind || e.params.loop) for (let l = n - s; l <= a + s; l += 1) {
    const o = (l % t + t) % t;
    (o < n || o > a) && ne(e, o);
  }
  else for (let l = Math.max(n - s, 0); l <= Math.min(a + s, t - 1); l += 1) l !== n && (l > a || l < n) && ne(e, l);
};
function qe(e) {
  const { slidesGrid: s, params: t } = e, i = e.rtlTranslate ? e.translate : -e.translate;
  let n;
  for (let a = 0; a < s.length; a += 1) typeof s[a + 1] < "u" ? i >= s[a] && i < s[a + 1] - (s[a + 1] - s[a]) / 2 ? n = a : i >= s[a] && i < s[a + 1] && (n = a + 1) : i >= s[a] && (n = a);
  return t.normalizeSlideIndex && (n < 0 || typeof n > "u") && (n = 0), n;
}
function Ye(e) {
  const s = this, t = s.rtlTranslate ? s.translate : -s.translate, { snapGrid: i, params: n, activeIndex: a, realIndex: l, snapIndex: o } = s;
  let r = e, u;
  const m = (f) => {
    let g = f - s.virtual.slidesBefore;
    return g < 0 && (g = s.virtual.slides.length + g), g >= s.virtual.slides.length && (g -= s.virtual.slides.length), g;
  };
  if (typeof r > "u" && (r = qe(s)), i.indexOf(t) >= 0) u = i.indexOf(t);
  else {
    const f = Math.min(n.slidesPerGroupSkip, r);
    u = f + Math.floor((r - f) / n.slidesPerGroup);
  }
  if (u >= i.length && (u = i.length - 1), r === a && !s.params.loop) {
    u !== o && (s.snapIndex = u, s.emit("snapIndexChange"));
    return;
  }
  if (r === a && s.params.loop && s.virtual && s.params.virtual.enabled) {
    s.realIndex = m(r);
    return;
  }
  const p = s.grid && n.grid && n.grid.rows > 1;
  let y;
  if (s.virtual && n.virtual.enabled) n.loop ? y = m(r) : y = r;
  else if (p) {
    const f = s.slides.find((S) => S.column === r);
    let g = parseInt(f.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(g) && (g = Math.max(s.slides.indexOf(f), 0)), y = Math.floor(g / n.grid.rows);
  } else if (s.slides[r]) {
    const f = s.slides[r].getAttribute("data-swiper-slide-index");
    f ? y = parseInt(f, 10) : y = r;
  } else y = r;
  Object.assign(s, {
    previousSnapIndex: o,
    snapIndex: u,
    previousRealIndex: l,
    realIndex: y,
    previousIndex: a,
    activeIndex: r
  }), s.initialized && de(s), s.emit("activeIndexChange"), s.emit("snapIndexChange"), (s.initialized || s.params.runCallbacksOnInit) && (l !== y && s.emit("realIndexChange"), s.emit("slideChange"));
}
function je(e, s) {
  const t = this, i = t.params;
  let n = e.closest(`.${i.slideClass}, swiper-slide`);
  !n && t.isElement && s && s.length > 1 && s.includes(e) && [...s.slice(s.indexOf(e) + 1, s.length)].forEach((o) => {
    !n && o.matches && o.matches(`.${i.slideClass}, swiper-slide`) && (n = o);
  });
  let a = !1, l;
  if (n) {
    for (let o = 0; o < t.slides.length; o += 1) if (t.slides[o] === n) {
      a = !0, l = o;
      break;
    }
  }
  if (n && a)
    t.clickedSlide = n, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(n.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = l;
  else {
    t.clickedSlide = void 0, t.clickedIndex = void 0;
    return;
  }
  i.slideToClickedSlide && t.clickedIndex !== void 0 && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
}
var Xe = {
  updateSize: $e,
  updateSlides: Fe,
  updateAutoHeight: Ne,
  updateSlidesOffset: _e,
  updateSlidesProgress: Re,
  updateProgress: He,
  updateSlidesClasses: We,
  updateActiveIndex: Ye,
  updateClickedSlide: je
};
function Ue(e = this.isHorizontal() ? "x" : "y") {
  const s = this, { params: t, rtlTranslate: i, translate: n, wrapperEl: a } = s;
  if (t.virtualTranslate) return i ? -n : n;
  if (t.cssMode) return n;
  let l = we(a, e);
  return l += s.cssOverflowAdjustment(), i && (l = -l), l || 0;
}
function Ke(e, s) {
  const t = this, { rtlTranslate: i, params: n, wrapperEl: a, progress: l } = t;
  let o = 0, r = 0;
  const u = 0;
  t.isHorizontal() ? o = i ? -e : e : r = e, n.roundLengths && (o = Math.floor(o), r = Math.floor(r)), t.previousTranslate = t.translate, t.translate = t.isHorizontal() ? o : r, n.cssMode ? a[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal() ? -o : -r : n.virtualTranslate || (t.isHorizontal() ? o -= t.cssOverflowAdjustment() : r -= t.cssOverflowAdjustment(), a.style.transform = `translate3d(${o}px, ${r}px, ${u}px)`);
  let m;
  const p = t.maxTranslate() - t.minTranslate();
  p === 0 ? m = 0 : m = (e - t.minTranslate()) / p, m !== l && t.updateProgress(e), t.emit("setTranslate", t.translate, s);
}
function Je() {
  return -this.snapGrid[0];
}
function Ze() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function Qe(e = 0, s = this.params.speed, t = !0, i = !0, n) {
  const a = this, { params: l, wrapperEl: o } = a;
  if (a.animating && l.preventInteractionOnTransition) return !1;
  const r = a.minTranslate(), u = a.maxTranslate();
  let m;
  if (i && e > r ? m = r : i && e < u ? m = u : m = e, a.updateProgress(m), l.cssMode) {
    const p = a.isHorizontal();
    if (s === 0) o[p ? "scrollLeft" : "scrollTop"] = -m;
    else {
      if (!a.support.smoothScroll)
        return ye({
          swiper: a,
          targetPosition: -m,
          side: p ? "left" : "top"
        }), !0;
      o.scrollTo({
        [p ? "left" : "top"]: -m,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return s === 0 ? (a.setTransition(0), a.setTranslate(m), t && (a.emit("beforeTransitionStart", s, n), a.emit("transitionEnd"))) : (a.setTransition(s), a.setTranslate(m), t && (a.emit("beforeTransitionStart", s, n), a.emit("transitionStart")), a.animating || (a.animating = !0, a.onTranslateToWrapperTransitionEnd || (a.onTranslateToWrapperTransitionEnd = function(y) {
    !a || a.destroyed || y.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onTranslateToWrapperTransitionEnd), a.onTranslateToWrapperTransitionEnd = null, delete a.onTranslateToWrapperTransitionEnd, a.animating = !1, t && a.emit("transitionEnd"));
  }), a.wrapperEl.addEventListener("transitionend", a.onTranslateToWrapperTransitionEnd))), !0;
}
var et = {
  getTranslate: Ue,
  setTranslate: Ke,
  minTranslate: Je,
  maxTranslate: Ze,
  translateTo: Qe
};
function tt(e, s) {
  const t = this;
  t.params.cssMode || (t.wrapperEl.style.transitionDuration = `${e}ms`, t.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : ""), t.emit("setTransition", e, s);
}
function xe({ swiper: e, runCallbacks: s, direction: t, step: i }) {
  const { activeIndex: n, previousIndex: a } = e;
  let l = t;
  l || (n > a ? l = "next" : n < a ? l = "prev" : l = "reset"), e.emit(`transition${i}`), s && l === "reset" ? e.emit(`slideResetTransition${i}`) : s && n !== a && (e.emit(`slideChangeTransition${i}`), l === "next" ? e.emit(`slideNextTransition${i}`) : e.emit(`slidePrevTransition${i}`));
}
function it(e = !0, s) {
  const t = this, { params: i } = t;
  i.cssMode || (i.autoHeight && t.updateAutoHeight(), xe({
    swiper: t,
    runCallbacks: e,
    direction: s,
    step: "Start"
  }));
}
function st(e = !0, s) {
  const t = this, { params: i } = t;
  t.animating = !1, !i.cssMode && (t.setTransition(0), xe({
    swiper: t,
    runCallbacks: e,
    direction: s,
    step: "End"
  }));
}
var at = {
  setTransition: tt,
  transitionStart: it,
  transitionEnd: st
};
function nt(e = 0, s, t = !0, i, n) {
  typeof e == "string" && (e = parseInt(e, 10));
  const a = this;
  let l = e;
  l < 0 && (l = 0);
  const { params: o, snapGrid: r, slidesGrid: u, previousIndex: m, activeIndex: p, rtlTranslate: y, wrapperEl: f, enabled: g } = a;
  if (!g && !i && !n || a.destroyed || a.animating && o.preventInteractionOnTransition) return !1;
  typeof s > "u" && (s = a.params.speed);
  const S = Math.min(a.params.slidesPerGroupSkip, l);
  let M = S + Math.floor((l - S) / a.params.slidesPerGroup);
  M >= r.length && (M = r.length - 1);
  const d = -r[M];
  if (o.normalizeSlideIndex) for (let E = 0; E < u.length; E += 1) {
    const k = -Math.floor(d * 100), z = Math.floor(u[E] * 100), L = Math.floor(u[E + 1] * 100);
    typeof u[E + 1] < "u" ? k >= z && k < L - (L - z) / 2 ? l = E : k >= z && k < L && (l = E + 1) : k >= z && (l = E);
  }
  if (a.initialized && l !== p && (!a.allowSlideNext && (y ? d > a.translate && d > a.minTranslate() : d < a.translate && d < a.minTranslate()) || !a.allowSlidePrev && d > a.translate && d > a.maxTranslate() && (p || 0) !== l))
    return !1;
  l !== (m || 0) && t && a.emit("beforeSlideChangeStart"), a.updateProgress(d);
  let c;
  l > p ? c = "next" : l < p ? c = "prev" : c = "reset";
  const h = a.virtual && a.params.virtual.enabled;
  if (!(h && n) && (y && -d === a.translate || !y && d === a.translate))
    return a.updateActiveIndex(l), o.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), o.effect !== "slide" && a.setTranslate(d), c !== "reset" && (a.transitionStart(t, c), a.transitionEnd(t, c)), !1;
  if (o.cssMode) {
    const E = a.isHorizontal(), k = y ? d : -d;
    if (s === 0)
      h && (a.wrapperEl.style.scrollSnapType = "none", a._immediateVirtual = !0), h && !a._cssModeVirtualInitialSet && a.params.initialSlide > 0 ? (a._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        f[E ? "scrollLeft" : "scrollTop"] = k;
      })) : f[E ? "scrollLeft" : "scrollTop"] = k, h && requestAnimationFrame(() => {
        a.wrapperEl.style.scrollSnapType = "", a._immediateVirtual = !1;
      });
    else {
      if (!a.support.smoothScroll)
        return ye({
          swiper: a,
          targetPosition: k,
          side: E ? "left" : "top"
        }), !0;
      f.scrollTo({
        [E ? "left" : "top"]: k,
        behavior: "smooth"
      });
    }
    return !0;
  }
  const b = Te().isSafari;
  return h && !n && b && a.isElement && a.virtual.update(!1, !1, l), a.setTransition(s), a.setTranslate(d), a.updateActiveIndex(l), a.updateSlidesClasses(), a.emit("beforeTransitionStart", s, i), a.transitionStart(t, c), s === 0 ? a.transitionEnd(t, c) : a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function(k) {
    !a || a.destroyed || k.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, a.transitionEnd(t, c));
  }), a.wrapperEl.addEventListener("transitionend", a.onSlideToWrapperTransitionEnd)), !0;
}
function rt(e = 0, s, t = !0, i) {
  typeof e == "string" && (e = parseInt(e, 10));
  const n = this;
  if (n.destroyed) return;
  typeof s > "u" && (s = n.params.speed);
  const a = n.grid && n.params.grid && n.params.grid.rows > 1;
  let l = e;
  if (n.params.loop) if (n.virtual && n.params.virtual.enabled) l = l + n.virtual.slidesBefore;
  else {
    let o;
    if (a) {
      const S = l * n.params.grid.rows;
      o = n.slides.find((M) => M.getAttribute("data-swiper-slide-index") * 1 === S).column;
    } else o = n.getSlideIndexByData(l);
    const r = a ? Math.ceil(n.slides.length / n.params.grid.rows) : n.slides.length, { centeredSlides: u, slidesOffsetBefore: m, slidesOffsetAfter: p } = n.params, y = u || !!m || !!p;
    let f = n.params.slidesPerView;
    f === "auto" ? f = n.slidesPerViewDynamic() : (f = Math.ceil(parseFloat(n.params.slidesPerView, 10)), y && f % 2 === 0 && (f = f + 1));
    let g = r - o < f;
    if (y && (g = g || o < Math.ceil(f / 2)), i && y && n.params.slidesPerView !== "auto" && !a && (g = !1), g) {
      const S = y ? o < n.activeIndex ? "prev" : "next" : o - n.activeIndex - 1 < n.params.slidesPerView ? "next" : "prev";
      n.loopFix({
        direction: S,
        slideTo: !0,
        activeSlideIndex: S === "next" ? o + 1 : o - r + 1,
        slideRealIndex: S === "next" ? n.realIndex : void 0
      });
    }
    if (a) {
      const S = l * n.params.grid.rows;
      l = n.slides.find((M) => M.getAttribute("data-swiper-slide-index") * 1 === S).column;
    } else l = n.getSlideIndexByData(l);
  }
  return requestAnimationFrame(() => {
    n.slideTo(l, s, t, i);
  }), n;
}
function lt(e, s = !0, t) {
  const i = this, { enabled: n, params: a, animating: l } = i;
  if (!n || i.destroyed) return i;
  typeof e > "u" && (e = i.params.speed);
  let o = a.slidesPerGroup;
  a.slidesPerView === "auto" && a.slidesPerGroup === 1 && a.slidesPerGroupAuto && (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
  const r = i.activeIndex < a.slidesPerGroupSkip ? 1 : o, u = i.virtual && a.virtual.enabled;
  if (a.loop) {
    if (l && !u && a.loopPreventsSliding) return !1;
    if (i.loopFix({ direction: "next" }), i._clientLeft = i.wrapperEl.clientLeft, i.activeIndex === i.slides.length - 1 && a.cssMode)
      return requestAnimationFrame(() => {
        i.slideTo(i.activeIndex + r, e, s, t);
      }), !0;
  }
  return a.rewind && i.isEnd ? i.slideTo(0, e, s, t) : i.slideTo(i.activeIndex + r, e, s, t);
}
function ot(e, s = !0, t) {
  const i = this, { params: n, snapGrid: a, slidesGrid: l, rtlTranslate: o, enabled: r, animating: u } = i;
  if (!r || i.destroyed) return i;
  typeof e > "u" && (e = i.params.speed);
  const m = i.virtual && n.virtual.enabled;
  if (n.loop) {
    if (u && !m && n.loopPreventsSliding) return !1;
    i.loopFix({ direction: "prev" }), i._clientLeft = i.wrapperEl.clientLeft;
  }
  const p = o ? i.translate : -i.translate;
  function y(c) {
    return c < 0 ? -Math.floor(Math.abs(c)) : Math.floor(c);
  }
  const f = y(p), g = a.map((c) => y(c)), S = n.freeMode && n.freeMode.enabled;
  let M = a[g.indexOf(f) - 1];
  if (typeof M > "u" && (n.cssMode || S)) {
    let c;
    a.forEach((h, b) => {
      f >= h && (c = b);
    }), typeof c < "u" && (M = S ? a[c] : a[c > 0 ? c - 1 : c]);
  }
  let d = 0;
  if (typeof M < "u" && (d = l.indexOf(M), d < 0 && (d = i.activeIndex - 1), n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (d = d - i.slidesPerViewDynamic("previous", !0) + 1, d = Math.max(d, 0))), n.rewind && i.isBeginning) {
    const c = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
    return i.slideTo(c, e, s, t);
  } else if (n.loop && i.activeIndex === 0 && n.cssMode)
    return requestAnimationFrame(() => {
      i.slideTo(d, e, s, t);
    }), !0;
  return i.slideTo(d, e, s, t);
}
function dt(e, s = !0, t) {
  const i = this;
  if (!i.destroyed)
    return typeof e > "u" && (e = i.params.speed), i.slideTo(i.activeIndex, e, s, t);
}
function ct(e, s = !0, t, i = 0.5) {
  const n = this;
  if (n.destroyed) return;
  typeof e > "u" && (e = n.params.speed);
  let a = n.activeIndex;
  const l = Math.min(n.params.slidesPerGroupSkip, a), o = l + Math.floor((a - l) / n.params.slidesPerGroup), r = n.rtlTranslate ? n.translate : -n.translate;
  if (r >= n.snapGrid[o]) {
    const u = n.snapGrid[o], m = n.snapGrid[o + 1];
    r - u > (m - u) * i && (a += n.params.slidesPerGroup);
  } else {
    const u = n.snapGrid[o - 1], m = n.snapGrid[o];
    r - u <= (m - u) * i && (a -= n.params.slidesPerGroup);
  }
  return a = Math.max(a, 0), a = Math.min(a, n.slidesGrid.length - 1), n.slideTo(a, e, s, t);
}
function ft() {
  const e = this;
  if (e.destroyed) return;
  const { params: s, slidesEl: t } = e, i = s.slidesPerView === "auto" ? e.slidesPerViewDynamic() : s.slidesPerView;
  let n = e.getSlideIndexWhenGrid(e.clickedIndex), a;
  const l = e.isElement ? "swiper-slide" : `.${s.slideClass}`, o = e.grid && e.params.grid && e.params.grid.rows > 1;
  if (s.loop) {
    if (e.animating) return;
    a = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), s.centeredSlides ? e.slideToLoop(a) : n > (o ? (e.slides.length - i) / 2 - (e.params.grid.rows - 1) : e.slides.length - i) ? (e.loopFix(), n = e.getSlideIndex(N(t, `${l}[data-swiper-slide-index="${a}"]`)[0]), ve(() => {
      e.slideTo(n);
    })) : e.slideTo(n);
  } else e.slideTo(n);
}
var ut = {
  slideTo: nt,
  slideToLoop: rt,
  slideNext: lt,
  slidePrev: ot,
  slideReset: dt,
  slideToClosest: ct,
  slideToClickedSlide: ft
};
function pt(e, s) {
  const t = this, { params: i, slidesEl: n } = t;
  if (!i.loop || t.virtual && t.params.virtual.enabled) return;
  const a = () => {
    N(n, `.${i.slideClass}, swiper-slide`).forEach((f, g) => {
      f.setAttribute("data-swiper-slide-index", g);
    });
  }, l = () => {
    const f = N(n, `.${i.slideBlankClass}`);
    f.forEach((g) => {
      g.remove();
    }), f.length > 0 && (t.recalcSlides(), t.updateSlides());
  }, o = t.grid && i.grid && i.grid.rows > 1;
  i.loopAddBlankSlides && (i.slidesPerGroup > 1 || o) && l();
  const r = i.slidesPerGroup * (o ? i.grid.rows : 1), u = t.slides.length % r !== 0, m = o && t.slides.length % i.grid.rows !== 0, p = (f) => {
    for (let g = 0; g < f; g += 1) {
      const S = t.isElement ? X("swiper-slide", [i.slideBlankClass]) : X("div", [i.slideClass, i.slideBlankClass]);
      t.slidesEl.append(S);
    }
  };
  u ? (i.loopAddBlankSlides ? (p(r - t.slides.length % r), t.recalcSlides(), t.updateSlides()) : Z("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"), a()) : (m && (i.loopAddBlankSlides ? (p(i.grid.rows - t.slides.length % i.grid.rows), t.recalcSlides(), t.updateSlides()) : Z("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)")), a());
  const y = i.centeredSlides || !!i.slidesOffsetBefore || !!i.slidesOffsetAfter;
  t.loopFix({
    slideRealIndex: e,
    direction: y ? void 0 : "next",
    initial: s
  });
}
function mt({ slideRealIndex: e, slideTo: s = !0, direction: t, setTranslate: i, activeSlideIndex: n, initial: a, byController: l, byMousewheel: o } = {}) {
  const r = this;
  if (!r.params.loop) return;
  r.emit("beforeLoopFix");
  const { slides: u, allowSlidePrev: m, allowSlideNext: p, slidesEl: y, params: f } = r, { centeredSlides: g, slidesOffsetBefore: S, slidesOffsetAfter: M, initialSlide: d } = f, c = g || !!S || !!M;
  if (r.allowSlidePrev = !0, r.allowSlideNext = !0, r.virtual && f.virtual.enabled) {
    s && (!c && r.snapIndex === 0 ? r.slideTo(r.virtual.slides.length, 0, !1, !0) : c && r.snapIndex < f.slidesPerView ? r.slideTo(r.virtual.slides.length + r.snapIndex, 0, !1, !0) : r.snapIndex === r.snapGrid.length - 1 && r.slideTo(r.virtual.slidesBefore, 0, !1, !0)), r.allowSlidePrev = m, r.allowSlideNext = p, r.emit("loopFix");
    return;
  }
  let h = f.slidesPerView;
  h === "auto" ? h = r.slidesPerViewDynamic() : (h = Math.ceil(parseFloat(f.slidesPerView, 10)), c && h % 2 === 0 && (h = h + 1));
  const b = f.slidesPerGroupAuto ? h : f.slidesPerGroup;
  let E = c ? Math.max(b, Math.ceil(h / 2)) : b;
  E % b !== 0 && (E += b - E % b), E += f.loopAdditionalSlides, r.loopedSlides = E;
  const k = r.grid && f.grid && f.grid.rows > 1;
  u.length < h + E || r.params.effect === "cards" && u.length < h + E * 2 ? Z("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : k && f.grid.fill === "row" && Z("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const z = [], L = [], D = k ? Math.ceil(u.length / f.grid.rows) : u.length, P = a && D - d < h && !c;
  let C = P ? d : r.activeIndex;
  typeof n > "u" ? n = r.getSlideIndex(u.find((T) => T.classList.contains(f.slideActiveClass))) : C = n;
  const w = t === "next" || !t, O = t === "prev" || !t;
  let A = 0, v = 0;
  const x = (k ? u[n].column : n) + (c && typeof i > "u" ? -h / 2 + 0.5 : 0);
  if (x < E) {
    A = Math.max(E - x, b);
    for (let T = 0; T < E - x; T += 1) {
      const I = T - Math.floor(T / D) * D;
      if (k) {
        const B = D - I - 1;
        for (let V = u.length - 1; V >= 0; V -= 1) u[V].column === B && z.push(V);
      } else z.push(D - I - 1);
    }
  } else if (x + h > D - E) {
    v = Math.max(x - (D - E * 2), b), P && (v = Math.max(v, h - D + d + 1));
    for (let T = 0; T < v; T += 1) {
      const I = T - Math.floor(T / D) * D;
      k ? u.forEach((B, V) => {
        B.column === I && L.push(V);
      }) : L.push(I);
    }
  }
  if (r.__preventObserver__ = !0, requestAnimationFrame(() => {
    r.__preventObserver__ = !1;
  }), r.params.effect === "cards" && u.length < h + E * 2 && (L.includes(n) && L.splice(L.indexOf(n), 1), z.includes(n) && z.splice(z.indexOf(n), 1)), O && z.forEach((T) => {
    u[T].swiperLoopMoveDOM = !0, y.prepend(u[T]), u[T].swiperLoopMoveDOM = !1;
  }), w && L.forEach((T) => {
    u[T].swiperLoopMoveDOM = !0, y.append(u[T]), u[T].swiperLoopMoveDOM = !1;
  }), r.recalcSlides(), f.slidesPerView === "auto" ? r.updateSlides() : k && (z.length > 0 && O || L.length > 0 && w) && r.slides.forEach((T, I) => {
    r.grid.updateSlide(I, T, r.slides);
  }), f.watchSlidesProgress && r.updateSlidesOffset(), s) {
    if (z.length > 0 && O) {
      if (typeof e > "u") {
        const T = r.slidesGrid[C], I = r.slidesGrid[C + A] - T;
        o ? r.setTranslate(r.translate - I) : (r.slideTo(C + Math.ceil(A), 0, !1, !0), i && (r.touchEventsData.startTranslate = r.touchEventsData.startTranslate - I, r.touchEventsData.currentTranslate = r.touchEventsData.currentTranslate - I));
      } else if (i) {
        const T = k ? z.length / f.grid.rows : z.length;
        r.slideTo(r.activeIndex + T, 0, !1, !0), r.touchEventsData.currentTranslate = r.translate;
      }
    } else if (L.length > 0 && w) if (typeof e > "u") {
      const T = r.slidesGrid[C], I = r.slidesGrid[C - v] - T;
      o ? r.setTranslate(r.translate - I) : (r.slideTo(C - v, 0, !1, !0), i && (r.touchEventsData.startTranslate = r.touchEventsData.startTranslate - I, r.touchEventsData.currentTranslate = r.touchEventsData.currentTranslate - I));
    } else {
      const T = k ? L.length / f.grid.rows : L.length;
      r.slideTo(r.activeIndex - T, 0, !1, !0);
    }
  }
  if (r.allowSlidePrev = m, r.allowSlideNext = p, r.controller && r.controller.control && !l) {
    const T = {
      slideRealIndex: e,
      direction: t,
      setTranslate: i,
      activeSlideIndex: n,
      byController: !0
    };
    Array.isArray(r.controller.control) ? r.controller.control.forEach((I) => {
      !I.destroyed && I.params.loop && I.loopFix({
        ...T,
        slideTo: I.params.slidesPerView === f.slidesPerView ? s : !1
      });
    }) : r.controller.control instanceof r.constructor && r.controller.control.params.loop && r.controller.control.loopFix({
      ...T,
      slideTo: r.controller.control.params.slidesPerView === f.slidesPerView ? s : !1
    });
  }
  r.emit("loopFix");
}
function gt() {
  const e = this, { params: s, slidesEl: t } = e;
  if (!s.loop || !t || e.virtual && e.params.virtual.enabled) return;
  e.recalcSlides();
  const i = [];
  e.slides.forEach((n) => {
    const a = typeof n.swiperSlideIndex > "u" ? n.getAttribute("data-swiper-slide-index") * 1 : n.swiperSlideIndex;
    i[a] = n;
  }), e.slides.forEach((n) => {
    n.removeAttribute("data-swiper-slide-index");
  }), i.forEach((n) => {
    t.append(n);
  }), e.recalcSlides(), e.slideTo(e.realIndex, 0);
}
var ht = {
  loopCreate: pt,
  loopFix: mt,
  loopDestroy: gt
};
function vt(e) {
  const s = this;
  if (!s.params.simulateTouch || s.params.watchOverflow && s.isLocked || s.params.cssMode) return;
  const t = s.params.touchEventsTarget === "container" ? s.el : s.wrapperEl;
  s.isElement && (s.__preventObserver__ = !0), t.style.cursor = "move", t.style.cursor = e ? "grabbing" : "grab", s.isElement && requestAnimationFrame(() => {
    s.__preventObserver__ = !1;
  });
}
function yt() {
  const e = this;
  e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame(() => {
    e.__preventObserver__ = !1;
  }));
}
var bt = {
  setGrabCursor: vt,
  unsetGrabCursor: yt
};
function St(e, s = this) {
  function t(i) {
    if (!i || i === $() || i === R()) return null;
    i.assignedSlot && (i = i.assignedSlot);
    const n = i.closest(e);
    return !n && !i.getRootNode ? null : n || t(i.getRootNode().host);
  }
  return t(s);
}
function ue(e, s, t) {
  const i = R(), { params: n } = e, a = n.edgeSwipeDetection, l = n.edgeSwipeThreshold;
  return a && (t <= l || t >= i.innerWidth - l) ? a === "prevent" ? (s.preventDefault(), !0) : !1 : !0;
}
function Tt(e) {
  const s = this;
  if (s.destroyed) return;
  const t = $();
  let i = e;
  i.originalEvent && (i = i.originalEvent);
  const n = s.touchEventsData;
  if (i.type === "pointerdown") {
    if (n.pointerId !== null && n.pointerId !== i.pointerId) return;
    n.pointerId = i.pointerId;
  } else i.type === "touchstart" && i.targetTouches.length === 1 && (n.touchId = i.targetTouches[0].identifier);
  if (i.type === "touchstart") {
    ue(s, i, i.targetTouches[0].pageX);
    return;
  }
  const { params: a, touches: l, enabled: o } = s;
  if (!o || !a.simulateTouch && i.pointerType === "mouse" || s.animating && a.preventInteractionOnTransition) return;
  !s.animating && a.cssMode && a.loop && s.loopFix();
  let r = i.target;
  if (a.touchEventsTarget === "wrapper" && !Ie(r, s.wrapperEl) || "which" in i && i.which === 3 || "button" in i && i.button > 0 || n.isTouched && n.isMoved) return;
  const u = !!a.noSwipingClass && a.noSwipingClass !== "", m = i.composedPath ? i.composedPath() : i.path;
  u && i.target && i.target.shadowRoot && m && (r = m[0]);
  const p = a.noSwipingSelector ? a.noSwipingSelector : `.${a.noSwipingClass}`, y = !!(i.target && i.target.shadowRoot);
  if (a.noSwiping && (y ? St(p, r) : r.closest(p))) {
    s.allowClick = !0;
    return;
  }
  if (a.swipeHandler && !r.closest(a.swipeHandler))
    return;
  l.currentX = i.pageX, l.currentY = i.pageY;
  const f = l.currentX, g = l.currentY;
  if (!ue(s, i, f)) return;
  Object.assign(n, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), l.startX = f, l.startY = g, n.touchStartTime = J(), s.allowClick = !0, s.updateSize(), s.swipeDirection = void 0, a.threshold > 0 && (n.allowThresholdMove = !1);
  let S = !0;
  r.matches(n.focusableElements) && (S = !1, r.nodeName === "SELECT" && (n.isTouched = !1)), t.activeElement && t.activeElement.matches(n.focusableElements) && t.activeElement !== r && (i.pointerType === "mouse" || i.pointerType !== "mouse" && !r.matches(n.focusableElements)) && t.activeElement.blur();
  const M = S && s.allowTouchMove && a.touchStartPreventDefault;
  (a.touchStartForcePreventDefault || M) && !r.isContentEditable && i.preventDefault(), a.freeMode && a.freeMode.enabled && s.freeMode && s.animating && !a.cssMode && s.freeMode.onTouchStart(), s.emit("touchStart", i);
}
function xt(e) {
  const s = $(), t = this;
  if (t.destroyed) return;
  const i = t.touchEventsData, { params: n, touches: a, rtlTranslate: l, enabled: o } = t;
  if (!o || !n.simulateTouch && e.pointerType === "mouse") return;
  let r = e;
  if (r.originalEvent && (r = r.originalEvent), r.type === "pointermove" && (i.touchId !== null || r.pointerId !== i.pointerId))
    return;
  let u;
  if (r.type === "touchmove") {
    if (u = [...r.changedTouches].find((E) => E.identifier === i.touchId), !u || u.identifier !== i.touchId) return;
  } else u = r;
  if (!i.isTouched) {
    i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", r);
    return;
  }
  const m = u.pageX, p = u.pageY;
  if (r.preventedByNestedSwiper) {
    a.startX = m, a.startY = p;
    return;
  }
  if (!t.allowTouchMove) {
    r.target.matches(i.focusableElements) || (t.allowClick = !1), i.isTouched && (Object.assign(a, {
      startX: m,
      startY: p,
      currentX: m,
      currentY: p
    }), i.touchStartTime = J());
    return;
  }
  if (n.touchReleaseOnEdges && !n.loop)
    if (t.isVertical()) {
      if (p < a.startY && t.translate <= t.maxTranslate() || p > a.startY && t.translate >= t.minTranslate()) {
        i.isTouched = !1, i.isMoved = !1;
        return;
      }
    } else {
      if (l && (m > a.startX && -t.translate <= t.maxTranslate() || m < a.startX && -t.translate >= t.minTranslate())) return;
      if (!l && (m < a.startX && t.translate <= t.maxTranslate() || m > a.startX && t.translate >= t.minTranslate())) return;
    }
  if (s.activeElement && s.activeElement.matches(i.focusableElements) && s.activeElement !== r.target && r.pointerType !== "mouse" && s.activeElement.blur(), s.activeElement && r.target === s.activeElement && r.target.matches(i.focusableElements)) {
    i.isMoved = !0, t.allowClick = !1;
    return;
  }
  i.allowTouchCallbacks && t.emit("touchMove", r), a.previousX = a.currentX, a.previousY = a.currentY, a.currentX = m, a.currentY = p;
  const y = a.currentX - a.startX, f = a.currentY - a.startY;
  if (t.params.threshold && Math.sqrt(y ** 2 + f ** 2) < t.params.threshold) return;
  if (typeof i.isScrolling > "u") {
    let E;
    t.isHorizontal() && a.currentY === a.startY || t.isVertical() && a.currentX === a.startX ? i.isScrolling = !1 : y * y + f * f >= 25 && (E = Math.atan2(Math.abs(f), Math.abs(y)) * 180 / Math.PI, i.isScrolling = t.isHorizontal() ? E > n.touchAngle : 90 - E > n.touchAngle);
  }
  if (i.isScrolling && t.emit("touchMoveOpposite", r), typeof i.startMoving > "u" && (a.currentX !== a.startX || a.currentY !== a.startY) && (i.startMoving = !0), i.isScrolling || r.type === "touchmove" && i.preventTouchMoveFromPointerMove) {
    i.isTouched = !1;
    return;
  }
  if (!i.startMoving) return;
  t.allowClick = !1, !n.cssMode && r.cancelable && r.preventDefault(), n.touchMoveStopPropagation && !n.nested && r.stopPropagation();
  let g = t.isHorizontal() ? y : f, S = t.isHorizontal() ? a.currentX - a.previousX : a.currentY - a.previousY;
  n.oneWayMovement && (g = Math.abs(g) * (l ? 1 : -1), S = Math.abs(S) * (l ? 1 : -1)), a.diff = g, g *= n.touchRatio, l && (g = -g, S = -S);
  const M = t.touchesDirection;
  t.swipeDirection = g > 0 ? "prev" : "next", t.touchesDirection = S > 0 ? "prev" : "next";
  const d = t.params.loop && !n.cssMode, c = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
  if (!i.isMoved) {
    if (d && c && t.loopFix({ direction: t.swipeDirection }), i.startTranslate = t.getTranslate(), t.setTransition(0), t.animating) {
      const E = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: { bySwiperTouchMove: !0 }
      });
      t.wrapperEl.dispatchEvent(E);
    }
    i.allowMomentumBounce = !1, n.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0), t.emit("sliderFirstMove", r);
  }
  if ((/* @__PURE__ */ new Date()).getTime(), n._loopSwapReset !== !1 && i.isMoved && i.allowThresholdMove && M !== t.touchesDirection && d && c && Math.abs(g) >= 1) {
    Object.assign(a, {
      startX: m,
      startY: p,
      currentX: m,
      currentY: p,
      startTranslate: i.currentTranslate
    }), i.loopSwapReset = !0, i.startTranslate = i.currentTranslate;
    return;
  }
  t.emit("sliderMove", r), i.isMoved = !0, i.currentTranslate = g + i.startTranslate;
  let h = !0, b = n.resistanceRatio;
  if (n.touchReleaseOnEdges && (b = 0), g > 0 ? (d && c && i.allowThresholdMove && i.currentTranslate > (n.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (n.slidesPerView !== "auto" && t.slides.length - n.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), i.currentTranslate > t.minTranslate() && (h = !1, n.resistance && (i.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + i.startTranslate + g) ** b))) : g < 0 && (d && c && i.allowThresholdMove && i.currentTranslate < (n.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (n.slidesPerView !== "auto" && t.slides.length - n.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: t.slides.length - (n.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(n.slidesPerView, 10)))
  }), i.currentTranslate < t.maxTranslate() && (h = !1, n.resistance && (i.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - i.startTranslate - g) ** b))), h && (r.preventedByNestedSwiper = !0), !t.allowSlideNext && t.swipeDirection === "next" && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !t.allowSlidePrev && t.swipeDirection === "prev" && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), !t.allowSlidePrev && !t.allowSlideNext && (i.currentTranslate = i.startTranslate), n.threshold > 0) if (Math.abs(g) > n.threshold || i.allowThresholdMove) {
    if (!i.allowThresholdMove) {
      i.allowThresholdMove = !0, a.startX = a.currentX, a.startY = a.currentY, i.currentTranslate = i.startTranslate, a.diff = t.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY;
      return;
    }
  } else {
    i.currentTranslate = i.startTranslate;
    return;
  }
  !n.followFinger || n.cssMode || ((n.freeMode && n.freeMode.enabled && t.freeMode || n.watchSlidesProgress) && (t.updateActiveIndex(), t.updateSlidesClasses()), n.freeMode && n.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(), t.updateProgress(i.currentTranslate), t.setTranslate(i.currentTranslate));
}
function Et(e) {
  const s = this;
  if (s.destroyed) return;
  const t = s.touchEventsData;
  let i = e;
  i.originalEvent && (i = i.originalEvent);
  let n;
  if (i.type === "touchend" || i.type === "touchcancel") {
    if (n = [...i.changedTouches].find((b) => b.identifier === t.touchId), !n || n.identifier !== t.touchId) return;
  } else {
    if (t.touchId !== null || i.pointerId !== t.pointerId) return;
    n = i;
  }
  if ([
    "pointercancel",
    "pointerout",
    "pointerleave",
    "contextmenu"
  ].includes(i.type) && !(["pointercancel", "contextmenu"].includes(i.type) && (s.browser.isSafari || s.browser.isWebView)))
    return;
  t.pointerId = null, t.touchId = null;
  const { params: a, touches: l, rtlTranslate: o, slidesGrid: r, enabled: u } = s;
  if (!u || !a.simulateTouch && i.pointerType === "mouse") return;
  if (t.allowTouchCallbacks && s.emit("touchEnd", i), t.allowTouchCallbacks = !1, !t.isTouched) {
    t.isMoved && a.grabCursor && s.setGrabCursor(!1), t.isMoved = !1, t.startMoving = !1;
    return;
  }
  a.grabCursor && t.isMoved && t.isTouched && (s.allowSlideNext === !0 || s.allowSlidePrev === !0) && s.setGrabCursor(!1);
  const m = J(), p = m - t.touchStartTime;
  if (s.allowClick) {
    const b = i.path || i.composedPath && i.composedPath();
    s.updateClickedSlide(b && b[0] || i.target, b), s.emit("tap click", i), p < 300 && m - t.lastClickTime < 300 && s.emit("doubleTap doubleClick", i);
  }
  if (t.lastClickTime = J(), ve(() => {
    s.destroyed || (s.allowClick = !0);
  }), !t.isTouched || !t.isMoved || !s.swipeDirection || l.diff === 0 && !t.loopSwapReset || t.currentTranslate === t.startTranslate && !t.loopSwapReset) {
    t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
    return;
  }
  t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
  let y;
  if (a.followFinger ? y = o ? s.translate : -s.translate : y = -t.currentTranslate, a.cssMode) return;
  if (a.freeMode && a.freeMode.enabled) {
    s.freeMode.onTouchEnd({ currentPos: y });
    return;
  }
  const f = y >= -s.maxTranslate() && !s.params.loop;
  let g = 0, S = s.slidesSizesGrid[0];
  for (let b = 0; b < r.length; b += b < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
    const E = b < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    typeof r[b + E] < "u" ? (f || y >= r[b] && y < r[b + E]) && (g = b, S = r[b + E] - r[b]) : (f || y >= r[b]) && (g = b, S = r[r.length - 1] - r[r.length - 2]);
  }
  let M = null, d = null;
  a.rewind && (s.isBeginning ? d = a.virtual && a.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1 : s.isEnd && (M = 0));
  const c = (y - r[g]) / S, h = g < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
  if (p > a.longSwipesMs) {
    if (!a.longSwipes) {
      s.slideTo(s.activeIndex);
      return;
    }
    s.swipeDirection === "next" && (c >= a.longSwipesRatio ? s.slideTo(a.rewind && s.isEnd ? M : g + h) : s.slideTo(g)), s.swipeDirection === "prev" && (c > 1 - a.longSwipesRatio ? s.slideTo(g + h) : d !== null && c < 0 && Math.abs(c) > a.longSwipesRatio ? s.slideTo(d) : s.slideTo(g));
  } else {
    if (!a.shortSwipes) {
      s.slideTo(s.activeIndex);
      return;
    }
    s.navigation && (i.target === s.navigation.nextEl || i.target === s.navigation.prevEl) ? i.target === s.navigation.nextEl ? s.slideTo(g + h) : s.slideTo(g) : (s.swipeDirection === "next" && s.slideTo(M !== null ? M : g + h), s.swipeDirection === "prev" && s.slideTo(d !== null ? d : g));
  }
}
function pe() {
  const e = this, { params: s, el: t } = e;
  if (t && t.offsetWidth === 0) return;
  s.breakpoints && e.setBreakpoint();
  const { allowSlideNext: i, allowSlidePrev: n, snapGrid: a } = e, l = e.virtual && e.params.virtual.enabled;
  e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
  const o = l && s.loop;
  if ((s.slidesPerView === "auto" || s.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides && !o) {
    const r = l ? e.virtual.slides : e.slides;
    e.slideTo(r.length - 1, 0, !1, !0);
  } else e.params.loop && !l ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
  e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), e.autoplay.resizeTimeout = setTimeout(() => {
    e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
  }, 500)), e.allowSlidePrev = n, e.allowSlideNext = i, e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
}
function Ct(e) {
  const s = this;
  s.destroyed || s.enabled && (s.allowClick || (s.params.preventClicks && e.preventDefault(), s.params.preventClicksPropagation && s.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
}
function Mt() {
  const e = this;
  if (e.destroyed) return;
  const { wrapperEl: s, rtlTranslate: t, enabled: i } = e;
  if (!i) return;
  e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -s.scrollLeft : e.translate = -s.scrollTop, e.translate === 0 && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
  let n;
  const a = e.maxTranslate() - e.minTranslate();
  a === 0 ? n = 0 : n = (e.translate - e.minTranslate()) / a, n !== e.progress && e.updateProgress(t ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
}
function Lt(e) {
  const s = this;
  s.destroyed || (K(s, e.target), !(s.params.cssMode || s.params.slidesPerView !== "auto" && !s.params.autoHeight) && s.update());
}
function Pt() {
  const e = this;
  e.destroyed || e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
}
var Ee = (e, s) => {
  const t = $(), { params: i, el: n, wrapperEl: a, device: l } = e, o = !!i.nested, r = s === "on" ? "addEventListener" : "removeEventListener", u = s;
  !n || typeof n == "string" || (t[r]("touchstart", e.onDocumentTouchStart, {
    passive: !1,
    capture: o
  }), n[r]("touchstart", e.onTouchStart, { passive: !1 }), n[r]("pointerdown", e.onTouchStart, { passive: !1 }), t[r]("touchmove", e.onTouchMove, {
    passive: !1,
    capture: o
  }), t[r]("pointermove", e.onTouchMove, {
    passive: !1,
    capture: o
  }), t[r]("touchend", e.onTouchEnd, { passive: !0 }), t[r]("pointerup", e.onTouchEnd, { passive: !0 }), t[r]("pointercancel", e.onTouchEnd, { passive: !0 }), t[r]("touchcancel", e.onTouchEnd, { passive: !0 }), t[r]("pointerout", e.onTouchEnd, { passive: !0 }), t[r]("pointerleave", e.onTouchEnd, { passive: !0 }), t[r]("contextmenu", e.onTouchEnd, { passive: !0 }), (i.preventClicks || i.preventClicksPropagation) && n[r]("click", e.onClick, !0), i.cssMode && a[r]("scroll", e.onScroll), i.updateOnWindowResize ? e[u](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", pe, !0) : e[u]("observerUpdate", pe, !0), n[r]("load", e.onLoad, { capture: !0 }));
};
function wt() {
  const e = this, { params: s } = e;
  e.onTouchStart = Tt.bind(e), e.onTouchMove = xt.bind(e), e.onTouchEnd = Et.bind(e), e.onDocumentTouchStart = Pt.bind(e), s.cssMode && (e.onScroll = Mt.bind(e)), e.onClick = Ct.bind(e), e.onLoad = Lt.bind(e), Ee(e, "on");
}
function It() {
  Ee(this, "off");
}
var kt = {
  attachEvents: wt,
  detachEvents: It
}, me = (e, s) => e.grid && s.grid && s.grid.rows > 1;
function At() {
  const e = this, { realIndex: s, initialized: t, params: i, el: n } = e, a = i.breakpoints;
  if (!a || a && Object.keys(a).length === 0) return;
  const l = $(), o = i.breakpointsBase === "window" || !i.breakpointsBase ? i.breakpointsBase : "container", r = ["window", "container"].includes(i.breakpointsBase) || !i.breakpointsBase ? e.el : l.querySelector(i.breakpointsBase), u = e.getBreakpoint(a, o, r);
  if (!u || e.currentBreakpoint === u) return;
  const m = (u in a ? a[u] : void 0) || e.originalParams, p = me(e, i), y = me(e, m), f = e.params.grabCursor, g = m.grabCursor, S = i.enabled;
  p && !y ? (n.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`), e.emitContainerClasses()) : !p && y && (n.classList.add(`${i.containerModifierClass}grid`), (m.grid.fill && m.grid.fill === "column" || !m.grid.fill && i.grid.fill === "column") && n.classList.add(`${i.containerModifierClass}grid-column`), e.emitContainerClasses()), f && !g ? e.unsetGrabCursor() : !f && g && e.setGrabCursor(), [
    "navigation",
    "pagination",
    "scrollbar"
  ].forEach((E) => {
    if (typeof m[E] > "u") return;
    const k = i[E] && i[E].enabled, z = m[E] && m[E].enabled;
    k && !z && e[E].disable(), !k && z && e[E].enable();
  });
  const M = m.direction && m.direction !== i.direction, d = i.loop && (m.slidesPerView !== i.slidesPerView || M), c = i.loop;
  M && t && e.changeDirection(), F(e.params, m);
  const h = e.params.enabled, b = e.params.loop;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev
  }), S && !h ? e.disable() : !S && h && e.enable(), e.currentBreakpoint = u, e.emit("_beforeBreakpoint", m), t && (d ? (e.loopDestroy(), e.loopCreate(s), e.updateSlides()) : !c && b ? (e.loopCreate(s), e.updateSlides()) : c && !b && e.loopDestroy()), e.emit("breakpoint", m);
}
function Ot(e, s = "window", t) {
  if (!e || s === "container" && !t) return;
  let i = !1;
  const n = R(), a = s === "window" ? n.innerHeight : t.clientHeight, l = Object.keys(e).map((o) => typeof o == "string" && o.indexOf("@") === 0 ? {
    value: a * parseFloat(o.substr(1)),
    point: o
  } : {
    value: o,
    point: o
  });
  l.sort((o, r) => parseInt(o.value, 10) - parseInt(r.value, 10));
  for (let o = 0; o < l.length; o += 1) {
    const { point: r, value: u } = l[o];
    s === "window" ? n.matchMedia(`(min-width: ${u}px)`).matches && (i = r) : u <= t.clientWidth && (i = r);
  }
  return i || "max";
}
var zt = {
  setBreakpoint: At,
  getBreakpoint: Ot
};
function Dt(e, s) {
  const t = [];
  return e.forEach((i) => {
    typeof i == "object" ? Object.keys(i).forEach((n) => {
      i[n] && t.push(s + n);
    }) : typeof i == "string" && t.push(s + i);
  }), t;
}
function Gt() {
  const e = this, { classNames: s, params: t, rtl: i, el: n, device: a } = e, l = Dt([
    "initialized",
    t.direction,
    { "free-mode": e.params.freeMode && t.freeMode.enabled },
    { autoheight: t.autoHeight },
    { rtl: i },
    { grid: t.grid && t.grid.rows > 1 },
    { "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column" },
    { android: a.android },
    { ios: a.ios },
    { "css-mode": t.cssMode },
    { centered: t.cssMode && t.centeredSlides },
    { "watch-progress": t.watchSlidesProgress }
  ], t.containerModifierClass);
  s.push(...l), n.classList.add(...s), e.emitContainerClasses();
}
function Bt() {
  const e = this, { el: s, classNames: t } = e;
  !s || typeof s == "string" || (s.classList.remove(...t), e.emitContainerClasses());
}
var Vt = {
  addClasses: Gt,
  removeClasses: Bt
};
function $t() {
  const e = this, { isLocked: s, params: t } = e, { slidesOffsetBefore: i } = t;
  if (i) {
    const n = e.slides.length - 1, a = e.slidesGrid[n] + e.slidesSizesGrid[n] + i * 2;
    e.isLocked = e.size > a;
  } else e.isLocked = e.snapGrid.length === 1;
  t.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked), t.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked), s && s !== e.isLocked && (e.isEnd = !1), s !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
var Ft = { checkOverflow: $t }, ge = {
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
function Nt(e, s) {
  return function(i = {}) {
    const n = Object.keys(i)[0], a = i[n];
    if (typeof a != "object" || a === null) {
      F(s, i);
      return;
    }
    if (e[n] === !0 && (e[n] = { enabled: !0 }), n === "navigation" && e[n] && e[n].enabled && !e[n].prevEl && !e[n].nextEl && (e[n].auto = !0), ["pagination", "scrollbar"].indexOf(n) >= 0 && e[n] && e[n].enabled && !e[n].el && (e[n].auto = !0), !(n in e && "enabled" in a)) {
      F(s, i);
      return;
    }
    typeof e[n] == "object" && !("enabled" in e[n]) && (e[n].enabled = !0), e[n] || (e[n] = { enabled: !1 }), F(s, i);
  };
}
var re = {
  eventsEmitter: Ve,
  update: Xe,
  translate: et,
  transition: at,
  slide: ut,
  loop: ht,
  grabCursor: bt,
  events: kt,
  breakpoints: zt,
  checkOverflow: Ft,
  classes: Vt
}, le = {}, ce = class _ {
  constructor(...s) {
    let t, i;
    s.length === 1 && s[0].constructor && Object.prototype.toString.call(s[0]).slice(8, -1) === "Object" ? i = s[0] : [t, i] = s, i || (i = {}), i = F({}, i), t && !i.el && (i.el = t);
    const n = $();
    if (i.el && typeof i.el == "string" && n.querySelectorAll(i.el).length > 1) {
      const o = [];
      return n.querySelectorAll(i.el).forEach((r) => {
        const u = F({}, i, { el: r });
        o.push(new _(u));
      }), o;
    }
    const a = this;
    a.__swiper__ = !0, a.support = be(), a.device = Se({ userAgent: i.userAgent }), a.browser = Te(), a.eventsListeners = {}, a.eventsAnyListeners = [], a.modules = [...a.__modules__], i.modules && Array.isArray(i.modules) && i.modules.forEach((o) => {
      typeof o == "function" && a.modules.indexOf(o) < 0 && a.modules.push(o);
    });
    const l = {};
    return a.modules.forEach((o) => {
      o({
        params: i,
        swiper: a,
        extendParams: Nt(i, l),
        on: a.on.bind(a),
        once: a.once.bind(a),
        off: a.off.bind(a),
        emit: a.emit.bind(a)
      });
    }), a.params = F({}, F({}, ge, l), le, i), a.originalParams = F({}, a.params), a.passedParams = F({}, i), a.params && a.params.on && Object.keys(a.params.on).forEach((o) => {
      a.on(o, a.params.on[o]);
    }), a.params && a.params.onAny && a.onAny(a.params.onAny), Object.assign(a, {
      enabled: a.params.enabled,
      el: t,
      classNames: [],
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      isHorizontal() {
        return a.params.direction === "horizontal";
      },
      isVertical() {
        return a.params.direction === "vertical";
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
      allowSlideNext: a.params.allowSlideNext,
      allowSlidePrev: a.params.allowSlidePrev,
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        focusableElements: a.params.focusableElements,
        lastClickTime: 0,
        clickTimeout: void 0,
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        pointerId: null,
        touchId: null
      },
      allowClick: !0,
      allowTouchMove: a.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      imagesToLoad: [],
      imagesLoaded: 0
    }), a.emit("_swiper"), a.params.init && a.init(), a;
  }
  getDirectionLabel(s) {
    return this.isHorizontal() ? s : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    }[s];
  }
  getSlideIndex(s) {
    const { slidesEl: t, params: i } = this, n = j(N(t, `.${i.slideClass}, swiper-slide`)[0]);
    return j(s) - n;
  }
  getSlideIndexByData(s) {
    return this.getSlideIndex(this.slides.find((t) => t.getAttribute("data-swiper-slide-index") * 1 === s));
  }
  getSlideIndexWhenGrid(s) {
    return this.grid && this.params.grid && this.params.grid.rows > 1 && (this.params.grid.fill === "column" ? s = Math.floor(s / this.params.grid.rows) : this.params.grid.fill === "row" && (s = s % Math.ceil(this.slides.length / this.params.grid.rows))), s;
  }
  recalcSlides() {
    const s = this, { slidesEl: t, params: i } = s;
    s.slides = N(t, `.${i.slideClass}, swiper-slide`);
  }
  enable() {
    const s = this;
    s.enabled || (s.enabled = !0, s.params.grabCursor && s.setGrabCursor(), s.emit("enable"));
  }
  disable() {
    const s = this;
    s.enabled && (s.enabled = !1, s.params.grabCursor && s.unsetGrabCursor(), s.emit("disable"));
  }
  setProgress(s, t) {
    const i = this;
    s = Math.min(Math.max(s, 0), 1);
    const n = i.minTranslate(), a = (i.maxTranslate() - n) * s + n;
    i.translateTo(a, typeof t > "u" ? 0 : t), i.updateActiveIndex(), i.updateSlidesClasses();
  }
  emitContainerClasses() {
    const s = this;
    if (!s.params._emitClasses || !s.el) return;
    const t = s.el.className.split(" ").filter((i) => i.indexOf("swiper") === 0 || i.indexOf(s.params.containerModifierClass) === 0);
    s.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(s) {
    const t = this;
    return t.destroyed ? "" : s.className.split(" ").filter((i) => i.indexOf("swiper-slide") === 0 || i.indexOf(t.params.slideClass) === 0).join(" ");
  }
  emitSlidesClasses() {
    const s = this;
    if (!s.params._emitClasses || !s.el) return;
    const t = [];
    s.slides.forEach((i) => {
      const n = s.getSlideClasses(i);
      t.push({
        slideEl: i,
        classNames: n
      }), s.emit("_slideClass", i, n);
    }), s.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(s = "current", t = !1) {
    const { params: i, slides: n, slidesGrid: a, slidesSizesGrid: l, size: o, activeIndex: r } = this;
    let u = 1;
    if (typeof i.slidesPerView == "number") return i.slidesPerView;
    if (i.centeredSlides) {
      let m = n[r] ? Math.ceil(n[r].swiperSlideSize) : 0, p;
      for (let y = r + 1; y < n.length; y += 1) n[y] && !p && (m += Math.ceil(n[y].swiperSlideSize), u += 1, m > o && (p = !0));
      for (let y = r - 1; y >= 0; y -= 1) n[y] && !p && (m += n[y].swiperSlideSize, u += 1, m > o && (p = !0));
    } else if (s === "current")
      for (let m = r + 1; m < n.length; m += 1) (t ? a[m] + l[m] - a[r] < o : a[m] - a[r] < o) && (u += 1);
    else for (let m = r - 1; m >= 0; m -= 1) a[r] - a[m] < o && (u += 1);
    return u;
  }
  update() {
    const s = this;
    if (!s || s.destroyed) return;
    const { snapGrid: t, params: i } = s;
    i.breakpoints && s.setBreakpoint(), [...s.el.querySelectorAll('[loading="lazy"]')].forEach((l) => {
      l.complete && K(s, l);
    }), s.updateSize(), s.updateSlides(), s.updateProgress(), s.updateSlidesClasses();
    function n() {
      const l = s.rtlTranslate ? s.translate * -1 : s.translate, o = Math.min(Math.max(l, s.maxTranslate()), s.minTranslate());
      s.setTranslate(o), s.updateActiveIndex(), s.updateSlidesClasses();
    }
    let a;
    if (i.freeMode && i.freeMode.enabled && !i.cssMode)
      n(), i.autoHeight && s.updateAutoHeight();
    else {
      if ((i.slidesPerView === "auto" || i.slidesPerView > 1) && s.isEnd && !i.centeredSlides) {
        const l = s.virtual && i.virtual.enabled ? s.virtual.slides : s.slides;
        a = s.slideTo(l.length - 1, 0, !1, !0);
      } else a = s.slideTo(s.activeIndex, 0, !1, !0);
      a || n();
    }
    i.watchOverflow && t !== s.snapGrid && s.checkOverflow(), s.emit("update");
  }
  changeDirection(s, t = !0) {
    const i = this, n = i.params.direction;
    return s || (s = n === "horizontal" ? "vertical" : "horizontal"), s === n || s !== "horizontal" && s !== "vertical" || (i.el.classList.remove(`${i.params.containerModifierClass}${n}`), i.el.classList.add(`${i.params.containerModifierClass}${s}`), i.emitContainerClasses(), i.params.direction = s, i.slides.forEach((a) => {
      s === "vertical" ? a.style.width = "" : a.style.height = "";
    }), i.emit("changeDirection"), t && i.update()), i;
  }
  changeLanguageDirection(s) {
    const t = this;
    t.rtl && s === "rtl" || !t.rtl && s === "ltr" || (t.rtl = s === "rtl", t.rtlTranslate = t.params.direction === "horizontal" && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update());
  }
  mount(s) {
    const t = this;
    if (t.mounted) return !0;
    let i = s || t.params.el;
    if (typeof i == "string" && (i = document.querySelector(i)), !i) return !1;
    i.swiper = t, i.parentNode && i.parentNode.host && i.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
    const n = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let l = i && i.shadowRoot && i.shadowRoot.querySelector ? i.shadowRoot.querySelector(n()) : N(i, n())[0];
    return !l && t.params.createElements && (l = X("div", t.params.wrapperClass), i.append(l), N(i, `.${t.params.slideClass}`).forEach((o) => {
      l.append(o);
    })), Object.assign(t, {
      el: i,
      wrapperEl: l,
      slidesEl: t.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : l,
      hostEl: t.isElement ? i.parentNode.host : i,
      mounted: !0,
      rtl: i.dir.toLowerCase() === "rtl" || W(i, "direction") === "rtl",
      rtlTranslate: t.params.direction === "horizontal" && (i.dir.toLowerCase() === "rtl" || W(i, "direction") === "rtl"),
      wrongRTL: W(l, "display") === "-webkit-box"
    }), !0;
  }
  init(s) {
    const t = this;
    if (t.initialized || t.mount(s) === !1) return t;
    t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(void 0, !0), t.attachEvents();
    const i = [...t.el.querySelectorAll('[loading="lazy"]')];
    return t.isElement && i.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), i.forEach((n) => {
      n.complete ? K(t, n) : n.addEventListener("load", (a) => {
        K(t, a.target);
      });
    }), de(t), t.initialized = !0, de(t), t.emit("init"), t.emit("afterInit"), t;
  }
  destroy(s = !0, t = !0) {
    const i = this, { params: n, el: a, wrapperEl: l, slides: o } = i;
    return typeof i.params > "u" || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), n.loop && i.loopDestroy(), t && (i.removeClasses(), a && typeof a != "string" && a.removeAttribute("style"), l && l.removeAttribute("style"), o && o.length && o.forEach((r) => {
      r.classList.remove(n.slideVisibleClass, n.slideFullyVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass), r.removeAttribute("style"), r.removeAttribute("data-swiper-slide-index");
    })), i.emit("destroy"), Object.keys(i.eventsListeners).forEach((r) => {
      i.off(r);
    }), s !== !1 && (i.el && typeof i.el != "string" && (i.el.swiper = null), ke(i)), i.destroyed = !0), null;
  }
  static extendDefaults(s) {
    F(le, s);
  }
  static get extendedDefaults() {
    return le;
  }
  static get defaults() {
    return ge;
  }
  static installModule(s) {
    _.prototype.__modules__ || (_.prototype.__modules__ = []);
    const t = _.prototype.__modules__;
    typeof s == "function" && t.indexOf(s) < 0 && t.push(s);
  }
  static use(s) {
    return Array.isArray(s) ? (s.forEach((t) => _.installModule(t)), _) : (_.installModule(s), _);
  }
};
Object.keys(re).forEach((e) => {
  Object.keys(re[e]).forEach((s) => {
    ce.prototype[s] = re[e][s];
  });
});
ce.use([Ge, Be]);
function _t({ swiper: e, extendParams: s, on: t, emit: i }) {
  const n = $(), a = R();
  e.keyboard = { enabled: !1 }, s({ keyboard: {
    enabled: !1,
    onlyInViewport: !0,
    pageUpDown: !0,
    speed: void 0
  } });
  function l(u) {
    if (!e.enabled) return;
    const { rtlTranslate: m } = e;
    let p = u;
    p.originalEvent && (p = p.originalEvent);
    const y = p.keyCode || p.charCode, f = e.params.keyboard.pageUpDown, g = f && y === 33, S = f && y === 34, M = y === 37, d = y === 39, c = y === 38, h = y === 40;
    if (!e.allowSlideNext && (e.isHorizontal() && d || e.isVertical() && h || S) || !e.allowSlidePrev && (e.isHorizontal() && M || e.isVertical() && c || g)) return !1;
    if (p.shiftKey || p.altKey || p.ctrlKey || p.metaKey || n.activeElement && (n.activeElement.isContentEditable || n.activeElement.nodeName && (n.activeElement.nodeName.toLowerCase() === "input" || n.activeElement.nodeName.toLowerCase() === "textarea"))) return;
    if (e.params.keyboard.onlyInViewport && (g || S || M || d || c || h)) {
      let E = !1;
      if (Q(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 && Q(e.el, `.${e.params.slideActiveClass}`).length === 0) return;
      const k = e.el, z = k.clientWidth, L = k.clientHeight, D = a.innerWidth, P = a.innerHeight, C = Le(k);
      m && (C.left -= k.scrollLeft);
      const w = [
        [C.left, C.top],
        [C.left + z, C.top],
        [C.left, C.top + L],
        [C.left + z, C.top + L]
      ];
      for (let O = 0; O < w.length; O += 1) {
        const A = w[O];
        if (A[0] >= 0 && A[0] <= D && A[1] >= 0 && A[1] <= P) {
          if (A[0] === 0 && A[1] === 0) continue;
          E = !0;
        }
      }
      if (!E) return;
    }
    const b = e.params.keyboard.speed;
    e.isHorizontal() ? ((g || S || M || d) && (p.preventDefault ? p.preventDefault() : p.returnValue = !1), ((S || d) && !m || (g || M) && m) && e.slideNext(b), ((g || M) && !m || (S || d) && m) && e.slidePrev(b)) : ((g || S || c || h) && (p.preventDefault ? p.preventDefault() : p.returnValue = !1), (S || h) && e.slideNext(b), (g || c) && e.slidePrev(b)), i("keyPress", y);
  }
  function o() {
    e.keyboard.enabled || (n.addEventListener("keydown", l), e.keyboard.enabled = !0);
  }
  function r() {
    e.keyboard.enabled && (n.removeEventListener("keydown", l), e.keyboard.enabled = !1);
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
function Ce(e, s, t, i) {
  return e.params.createElements && Object.keys(i).forEach((n) => {
    if (!t[n] && t.auto === !0) {
      let a = N(e.el, `.${i[n]}`)[0];
      a || (a = X("div", i[n]), a.className = i[n], e.el.append(a)), t[n] = a, s[n] = a;
    }
  }), t;
}
var he = '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>';
function Rt({ swiper: e, extendParams: s, on: t, emit: i }) {
  s({ navigation: {
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
    arrowSvg: he
  };
  function n(f) {
    let g;
    return f && typeof f == "string" && e.isElement && (g = e.el.querySelector(f) || e.hostEl.querySelector(f), g) ? g : (f && (typeof f == "string" && (g = [...document.querySelectorAll(f)]), e.params.uniqueNavElements && typeof f == "string" && g && g.length > 1 && e.el.querySelectorAll(f).length === 1 ? g = e.el.querySelector(f) : g && g.length === 1 && (g = g[0])), f && !g ? f : g);
  }
  function a(f, g) {
    const S = e.params.navigation;
    f = G(f), f.forEach((M) => {
      M && (M.classList[g ? "add" : "remove"](...S.disabledClass.split(" ")), M.tagName === "BUTTON" && (M.disabled = g), e.params.watchOverflow && e.enabled && M.classList[e.isLocked ? "add" : "remove"](S.lockClass));
    });
  }
  function l() {
    const { nextEl: f, prevEl: g } = e.navigation;
    if (e.params.loop) {
      a(g, !1), a(f, !1);
      return;
    }
    a(g, e.isBeginning && !e.params.rewind), a(f, e.isEnd && !e.params.rewind);
  }
  function o(f) {
    f.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), i("navigationPrev"));
  }
  function r(f) {
    f.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), i("navigationNext"));
  }
  function u() {
    const f = e.params.navigation;
    if (e.params.navigation = Ce(e, e.originalParams.navigation, e.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    }), !(f.nextEl || f.prevEl)) return;
    let g = n(f.nextEl), S = n(f.prevEl);
    Object.assign(e.navigation, {
      nextEl: g,
      prevEl: S
    }), g = G(g), S = G(S);
    const M = (d, c) => {
      if (d) {
        if (f.addIcons && d.matches(".swiper-button-next,.swiper-button-prev") && !d.querySelector("svg")) {
          const h = document.createElement("div");
          ee(h, he), d.appendChild(h.querySelector("svg")), h.remove();
        }
        d.addEventListener("click", c === "next" ? r : o);
      }
      !e.enabled && d && d.classList.add(...f.lockClass.split(" "));
    };
    g.forEach((d) => M(d, "next")), S.forEach((d) => M(d, "prev"));
  }
  function m() {
    let { nextEl: f, prevEl: g } = e.navigation;
    f = G(f), g = G(g);
    const S = (M, d) => {
      M.removeEventListener("click", d === "next" ? r : o), M.classList.remove(...e.params.navigation.disabledClass.split(" "));
    };
    f.forEach((M) => S(M, "next")), g.forEach((M) => S(M, "prev"));
  }
  t("init", () => {
    e.params.navigation.enabled === !1 ? y() : (u(), l());
  }), t("toEdge fromEdge lock unlock", () => {
    l();
  }), t("destroy", () => {
    m();
  }), t("enable disable", () => {
    let { nextEl: f, prevEl: g } = e.navigation;
    if (f = G(f), g = G(g), e.enabled) {
      l();
      return;
    }
    [...f, ...g].filter((S) => !!S).forEach((S) => S.classList.add(e.params.navigation.lockClass));
  }), t("click", (f, g) => {
    let { nextEl: S, prevEl: M } = e.navigation;
    S = G(S), M = G(M);
    const d = g.target;
    let c = M.includes(d) || S.includes(d);
    if (e.isElement && !c) {
      const h = g.path || g.composedPath && g.composedPath();
      h && (c = h.find((b) => S.includes(b) || M.includes(b)));
    }
    if (e.params.navigation.hideOnClick && !c) {
      if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === d || e.pagination.el.contains(d))) return;
      let h;
      S.length ? h = S[0].classList.contains(e.params.navigation.hiddenClass) : M.length && (h = M[0].classList.contains(e.params.navigation.hiddenClass)), i(h === !0 ? "navigationShow" : "navigationHide"), [...S, ...M].filter((b) => !!b).forEach((b) => b.classList.toggle(e.params.navigation.hiddenClass));
    }
  });
  const p = () => {
    e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")), u(), l();
  }, y = () => {
    e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")), m();
  };
  Object.assign(e.navigation, {
    enable: p,
    disable: y,
    update: l,
    init: u,
    destroy: m
  });
}
function H(e = "") {
  return `.${e.trim().replace(/([\.:!+\/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1").replace(/ /g, ".")}`;
}
function Ht({ swiper: e, extendParams: s, on: t, emit: i }) {
  const n = "swiper-pagination";
  s({ pagination: {
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
    bulletClass: `${n}-bullet`,
    bulletActiveClass: `${n}-bullet-active`,
    modifierClass: `${n}-`,
    currentClass: `${n}-current`,
    totalClass: `${n}-total`,
    hiddenClass: `${n}-hidden`,
    progressbarFillClass: `${n}-progressbar-fill`,
    progressbarOppositeClass: `${n}-progressbar-opposite`,
    clickableClass: `${n}-clickable`,
    lockClass: `${n}-lock`,
    horizontalClass: `${n}-horizontal`,
    verticalClass: `${n}-vertical`,
    paginationDisabledClass: `${n}-disabled`
  } }), e.pagination = {
    el: null,
    bullets: []
  };
  let a, l = 0;
  function o() {
    return !e.params.pagination.el || !e.pagination.el || Array.isArray(e.pagination.el) && e.pagination.el.length === 0;
  }
  function r(d, c) {
    const { bulletActiveClass: h } = e.params.pagination;
    d && (d = d[`${c === "prev" ? "previous" : "next"}ElementSibling`], d && (d.classList.add(`${h}-${c}`), d = d[`${c === "prev" ? "previous" : "next"}ElementSibling`], d && d.classList.add(`${h}-${c}-${c}`)));
  }
  function u(d, c, h) {
    if (d = d % h, c = c % h, c === d + 1) return "next";
    if (c === d - 1) return "previous";
  }
  function m(d) {
    const c = d.target.closest(H(e.params.pagination.bulletClass));
    if (!c) return;
    d.preventDefault();
    const h = j(c) * e.params.slidesPerGroup;
    if (e.params.loop) {
      if (e.realIndex === h) return;
      const b = u(e.realIndex, h, e.slides.length);
      b === "next" ? e.slideNext() : b === "previous" ? e.slidePrev() : e.slideToLoop(h);
    } else e.slideTo(h);
  }
  function p() {
    const d = e.rtl, c = e.params.pagination;
    if (o()) return;
    let h = e.pagination.el;
    h = G(h);
    let b, E;
    const k = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, z = e.params.loop ? Math.ceil(k / e.params.slidesPerGroup) : e.snapGrid.length;
    if (e.params.loop ? (E = e.previousRealIndex || 0, b = e.params.slidesPerGroup > 1 ? Math.floor(e.realIndex / e.params.slidesPerGroup) : e.realIndex) : typeof e.snapIndex < "u" ? (b = e.snapIndex, E = e.previousSnapIndex) : (E = e.previousIndex || 0, b = e.activeIndex || 0), c.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
      const L = e.pagination.bullets;
      let D, P, C;
      if (c.dynamicBullets && (a = oe(L[0], e.isHorizontal() ? "width" : "height", !0), h.forEach((w) => {
        w.style[e.isHorizontal() ? "width" : "height"] = `${a * (c.dynamicMainBullets + 4)}px`;
      }), c.dynamicMainBullets > 1 && E !== void 0 && (l += b - (E || 0), l > c.dynamicMainBullets - 1 ? l = c.dynamicMainBullets - 1 : l < 0 && (l = 0)), D = Math.max(b - l, 0), P = D + (Math.min(L.length, c.dynamicMainBullets) - 1), C = (P + D) / 2), L.forEach((w) => {
        const O = [...[
          "",
          "-next",
          "-next-next",
          "-prev",
          "-prev-prev",
          "-main"
        ].map((A) => `${c.bulletActiveClass}${A}`)].map((A) => typeof A == "string" && A.includes(" ") ? A.split(" ") : A).flat();
        w.classList.remove(...O);
      }), h.length > 1) L.forEach((w) => {
        const O = j(w);
        O === b ? w.classList.add(...c.bulletActiveClass.split(" ")) : e.isElement && w.setAttribute("part", "bullet"), c.dynamicBullets && (O >= D && O <= P && w.classList.add(...`${c.bulletActiveClass}-main`.split(" ")), O === D && r(w, "prev"), O === P && r(w, "next"));
      });
      else {
        const w = L[b];
        if (w && w.classList.add(...c.bulletActiveClass.split(" ")), e.isElement && L.forEach((O, A) => {
          O.setAttribute("part", A === b ? "bullet-active" : "bullet");
        }), c.dynamicBullets) {
          const O = L[D], A = L[P];
          for (let v = D; v <= P; v += 1) L[v] && L[v].classList.add(...`${c.bulletActiveClass}-main`.split(" "));
          r(O, "prev"), r(A, "next");
        }
      }
      if (c.dynamicBullets) {
        const w = Math.min(L.length, c.dynamicMainBullets + 4), O = (a * w - a) / 2 - C * a, A = d ? "right" : "left";
        L.forEach((v) => {
          v.style[e.isHorizontal() ? A : "top"] = `${O}px`;
        });
      }
    }
    h.forEach((L, D) => {
      if (c.type === "fraction" && (L.querySelectorAll(H(c.currentClass)).forEach((P) => {
        P.textContent = c.formatFractionCurrent(b + 1);
      }), L.querySelectorAll(H(c.totalClass)).forEach((P) => {
        P.textContent = c.formatFractionTotal(z);
      })), c.type === "progressbar") {
        let P;
        c.progressbarOpposite ? P = e.isHorizontal() ? "vertical" : "horizontal" : P = e.isHorizontal() ? "horizontal" : "vertical";
        const C = (b + 1) / z;
        let w = 1, O = 1;
        P === "horizontal" ? w = C : O = C, L.querySelectorAll(H(c.progressbarFillClass)).forEach((A) => {
          A.style.transform = `translate3d(0,0,0) scaleX(${w}) scaleY(${O})`, A.style.transitionDuration = `${e.params.speed}ms`;
        });
      }
      c.type === "custom" && c.renderCustom ? (ee(L, c.renderCustom(e, b + 1, z)), D === 0 && i("paginationRender", L)) : (D === 0 && i("paginationRender", L), i("paginationUpdate", L)), e.params.watchOverflow && e.enabled && L.classList[e.isLocked ? "add" : "remove"](c.lockClass);
    });
  }
  function y() {
    const d = e.params.pagination;
    if (o()) return;
    const c = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.grid && e.params.grid.rows > 1 ? e.slides.length / Math.ceil(e.params.grid.rows) : e.slides.length;
    let h = e.pagination.el;
    h = G(h);
    let b = "";
    if (d.type === "bullets") {
      let E = e.params.loop ? Math.ceil(c / e.params.slidesPerGroup) : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && E > c && (E = c);
      for (let k = 0; k < E; k += 1) d.renderBullet ? b += d.renderBullet.call(e, k, d.bulletClass) : b += `<${d.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${d.bulletClass}"></${d.bulletElement}>`;
    }
    d.type === "fraction" && (d.renderFraction ? b = d.renderFraction.call(e, d.currentClass, d.totalClass) : b = `<span class="${d.currentClass}"></span> / <span class="${d.totalClass}"></span>`), d.type === "progressbar" && (d.renderProgressbar ? b = d.renderProgressbar.call(e, d.progressbarFillClass) : b = `<span class="${d.progressbarFillClass}"></span>`), e.pagination.bullets = [], h.forEach((E) => {
      d.type !== "custom" && ee(E, b || ""), d.type === "bullets" && e.pagination.bullets.push(...E.querySelectorAll(H(d.bulletClass)));
    }), d.type !== "custom" && i("paginationRender", h[0]);
  }
  function f() {
    e.params.pagination = Ce(e, e.originalParams.pagination, e.params.pagination, { el: "swiper-pagination" });
    const d = e.params.pagination;
    if (!d.el) return;
    let c;
    typeof d.el == "string" && e.isElement && (c = e.el.querySelector(d.el)), !c && typeof d.el == "string" && (c = [...document.querySelectorAll(d.el)]), c || (c = d.el), !(!c || c.length === 0) && (e.params.uniqueNavElements && typeof d.el == "string" && Array.isArray(c) && c.length > 1 && (c = [...e.el.querySelectorAll(d.el)], c.length > 1 && (c = c.find((h) => Q(h, ".swiper")[0] === e.el))), Array.isArray(c) && c.length === 1 && (c = c[0]), Object.assign(e.pagination, { el: c }), c = G(c), c.forEach((h) => {
      d.type === "bullets" && d.clickable && h.classList.add(...(d.clickableClass || "").split(" ")), h.classList.add(d.modifierClass + d.type), h.classList.add(e.isHorizontal() ? d.horizontalClass : d.verticalClass), d.type === "bullets" && d.dynamicBullets && (h.classList.add(`${d.modifierClass}${d.type}-dynamic`), l = 0, d.dynamicMainBullets < 1 && (d.dynamicMainBullets = 1)), d.type === "progressbar" && d.progressbarOpposite && h.classList.add(d.progressbarOppositeClass), d.clickable && h.addEventListener("click", m), e.enabled || h.classList.add(d.lockClass);
    }));
  }
  function g() {
    const d = e.params.pagination;
    if (o()) return;
    let c = e.pagination.el;
    c && (c = G(c), c.forEach((h) => {
      h.classList.remove(d.hiddenClass), h.classList.remove(d.modifierClass + d.type), h.classList.remove(e.isHorizontal() ? d.horizontalClass : d.verticalClass), d.clickable && (h.classList.remove(...(d.clickableClass || "").split(" ")), h.removeEventListener("click", m));
    })), e.pagination.bullets && e.pagination.bullets.forEach((h) => h.classList.remove(...d.bulletActiveClass.split(" ")));
  }
  t("changeDirection", () => {
    if (!e.pagination || !e.pagination.el) return;
    const d = e.params.pagination;
    let { el: c } = e.pagination;
    c = G(c), c.forEach((h) => {
      h.classList.remove(d.horizontalClass, d.verticalClass), h.classList.add(e.isHorizontal() ? d.horizontalClass : d.verticalClass);
    });
  }), t("init", () => {
    e.params.pagination.enabled === !1 ? M() : (f(), y(), p());
  }), t("activeIndexChange", () => {
    typeof e.snapIndex > "u" && p();
  }), t("snapIndexChange", () => {
    p();
  }), t("snapGridLengthChange", () => {
    y(), p();
  }), t("destroy", () => {
    g();
  }), t("enable disable", () => {
    let { el: d } = e.pagination;
    d && (d = G(d), d.forEach((c) => c.classList[e.enabled ? "remove" : "add"](e.params.pagination.lockClass)));
  }), t("lock unlock", () => {
    p();
  }), t("click", (d, c) => {
    const h = c.target, b = G(e.pagination.el);
    if (e.params.pagination.el && e.params.pagination.hideOnClick && b && b.length > 0 && !h.classList.contains(e.params.pagination.bulletClass)) {
      if (e.navigation && (e.navigation.nextEl && h === e.navigation.nextEl || e.navigation.prevEl && h === e.navigation.prevEl)) return;
      b[0].classList.contains(e.params.pagination.hiddenClass) === !0 ? i("paginationShow") : i("paginationHide"), b.forEach((E) => E.classList.toggle(e.params.pagination.hiddenClass));
    }
  });
  const S = () => {
    e.el.classList.remove(e.params.pagination.paginationDisabledClass);
    let { el: d } = e.pagination;
    d && (d = G(d), d.forEach((c) => c.classList.remove(e.params.pagination.paginationDisabledClass))), f(), y(), p();
  }, M = () => {
    e.el.classList.add(e.params.pagination.paginationDisabledClass);
    let { el: d } = e.pagination;
    d && (d = G(d), d.forEach((c) => c.classList.add(e.params.pagination.paginationDisabledClass))), g();
  };
  Object.assign(e.pagination, {
    enable: S,
    disable: M,
    render: y,
    update: p,
    init: f,
    destroy: g
  });
}
function Wt({ swiper: e, extendParams: s, on: t }) {
  s({ a11y: {
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
  let i = null, n, a, l = (/* @__PURE__ */ new Date()).getTime();
  function o(v) {
    const x = i;
    x.length !== 0 && ee(x, v);
  }
  function r(v = 16) {
    const x = () => Math.round(16 * Math.random()).toString(16);
    return "x".repeat(v).replace(/x/g, x);
  }
  function u(v) {
    v = G(v), v.forEach((x) => {
      x.setAttribute("tabIndex", "0");
    });
  }
  function m(v) {
    v = G(v), v.forEach((x) => {
      x.setAttribute("tabIndex", "-1");
    });
  }
  function p(v, x) {
    v = G(v), v.forEach((T) => {
      T.setAttribute("role", x);
    });
  }
  function y(v, x) {
    v = G(v), v.forEach((T) => {
      T.setAttribute("aria-roledescription", x);
    });
  }
  function f(v, x) {
    v = G(v), v.forEach((T) => {
      T.setAttribute("aria-label", x);
    });
  }
  function g(v, x) {
    v = G(v), v.forEach((T) => {
      T.setAttribute("id", x);
    });
  }
  function S(v, x) {
    v = G(v), v.forEach((T) => {
      T.setAttribute("aria-live", x);
    });
  }
  function M(v) {
    v = G(v), v.forEach((x) => {
      x.setAttribute("aria-disabled", !0);
    });
  }
  function d(v) {
    v = G(v), v.forEach((x) => {
      x.removeAttribute("aria-disabled");
    });
  }
  function c(v) {
    if (v.keyCode !== 13 && v.keyCode !== 32) return;
    const x = e.params.a11y, T = v.target;
    if (!(e.pagination && e.pagination.el && (T === e.pagination.el || e.pagination.el.contains(v.target)) && !v.target.matches(H(e.params.pagination.bulletClass)))) {
      if (e.navigation && e.navigation.prevEl && e.navigation.nextEl) {
        const I = G(e.navigation.prevEl);
        G(e.navigation.nextEl).includes(T) && (e.isEnd && !e.params.loop || e.slideNext(), e.isEnd ? o(x.lastSlideMessage) : o(x.nextSlideMessage)), I.includes(T) && (e.isBeginning && !e.params.loop || e.slidePrev(), e.isBeginning ? o(x.firstSlideMessage) : o(x.prevSlideMessage));
      }
      e.pagination && T.matches(H(e.params.pagination.bulletClass)) && T.click();
    }
  }
  function h() {
    if (e.params.loop || e.params.rewind || !e.navigation) return;
    const { nextEl: v, prevEl: x } = e.navigation;
    x && (e.isBeginning ? (M(x), m(x)) : (d(x), u(x))), v && (e.isEnd ? (M(v), m(v)) : (d(v), u(v)));
  }
  function b() {
    return e.pagination && e.pagination.bullets && e.pagination.bullets.length;
  }
  function E() {
    return b() && e.params.pagination.clickable;
  }
  function k() {
    const v = e.params.a11y;
    b() && e.pagination.bullets.forEach((x) => {
      e.params.pagination.clickable && (u(x), e.params.pagination.renderBullet || (p(x, "button"), f(x, v.paginationBulletMessage.replace(/\{\{index\}\}/, j(x) + 1)))), x.matches(H(e.params.pagination.bulletActiveClass)) ? x.setAttribute("aria-current", "true") : x.removeAttribute("aria-current");
    });
  }
  const z = (v, x, T) => {
    u(v), v.tagName !== "BUTTON" && (p(v, "button"), v.addEventListener("keydown", c)), f(v, T);
  }, L = (v) => {
    a && a !== v.target && !a.contains(v.target) && (n = !0), e.a11y.clicked = !0;
  }, D = () => {
    n = !1, requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        e.destroyed || (e.a11y.clicked = !1);
      });
    });
  }, P = (v) => {
    l = (/* @__PURE__ */ new Date()).getTime();
  }, C = (v) => {
    if (e.a11y.clicked || !e.params.a11y.scrollOnFocus || (/* @__PURE__ */ new Date()).getTime() - l < 100) return;
    const x = v.target.closest(`.${e.params.slideClass}, swiper-slide`);
    if (!x || !e.slides.includes(x)) return;
    a = x;
    const T = e.virtual && e.params.virtual.enabled, I = (T ? parseInt(x.getAttribute("data-swiper-slide-index"), 10) : e.slides.indexOf(x)) === e.activeIndex, B = e.params.watchSlidesProgress && e.visibleSlides && e.visibleSlides.includes(x);
    I || B || v.sourceCapabilities && v.sourceCapabilities.firesTouchEvents || (e.isHorizontal() ? e.el.scrollLeft = 0 : e.el.scrollTop = 0, requestAnimationFrame(() => {
      n || (e.params.loop ? e.slideToLoop(e.getSlideIndexWhenGrid(parseInt(x.getAttribute("data-swiper-slide-index"))), 0) : T ? e.slideTo(e.getSlideIndexWhenGrid(parseInt(x.getAttribute("data-swiper-slide-index"), 10)), 0) : e.slideTo(e.getSlideIndexWhenGrid(e.slides.indexOf(x)), 0), n = !1);
    }));
  }, w = () => {
    const v = e.params.a11y;
    v.itemRoleDescriptionMessage && y(e.slides, v.itemRoleDescriptionMessage), v.slideRole && p(e.slides, v.slideRole);
    const x = e.slides.length;
    v.slideLabelMessage && e.slides.forEach((T, I) => {
      const B = e.params.loop ? parseInt(T.getAttribute("data-swiper-slide-index"), 10) : I;
      f(T, v.slideLabelMessage.replace(/\{\{index\}\}/, B + 1).replace(/\{\{slidesLength\}\}/, x));
    });
  }, O = () => {
    const v = e.params.a11y;
    e.el.append(i);
    const x = e.el;
    v.containerRoleDescriptionMessage && y(x, v.containerRoleDescriptionMessage), v.containerMessage && f(x, v.containerMessage), v.containerRole && p(x, v.containerRole);
    const T = e.wrapperEl, I = v.id || T.getAttribute("id") || `swiper-wrapper-${r(16)}`;
    g(T, I), v.wrapperLiveRegion && S(T, e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite"), w();
    let { nextEl: B, prevEl: V } = e.navigation ? e.navigation : {};
    B = G(B), V = G(V), B && B.forEach((q) => z(q, I, v.nextSlideMessage)), V && V.forEach((q) => z(q, I, v.prevSlideMessage)), E() && G(e.pagination.el).forEach((q) => {
      q.addEventListener("keydown", c);
    }), $().addEventListener("visibilitychange", P), e.el.addEventListener("focus", C, !0), e.el.addEventListener("pointerdown", L, !0), e.el.addEventListener("pointerup", D, !0);
  };
  function A() {
    i && i.remove();
    let { nextEl: v, prevEl: x } = e.navigation ? e.navigation : {};
    v = G(v), x = G(x), v && v.forEach((T) => T.removeEventListener("keydown", c)), x && x.forEach((T) => T.removeEventListener("keydown", c)), E() && G(e.pagination.el).forEach((T) => {
      T.removeEventListener("keydown", c);
    }), $().removeEventListener("visibilitychange", P), e.el && typeof e.el != "string" && (e.el.removeEventListener("focus", C, !0), e.el.removeEventListener("pointerdown", L, !0), e.el.removeEventListener("pointerup", D, !0));
  }
  t("beforeInit", () => {
    i = X("span", e.params.a11y.notificationClass), i.setAttribute("aria-live", "assertive"), i.setAttribute("aria-atomic", "true");
  }), t("afterInit", () => {
    e.params.a11y.enabled && O();
  }), t("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
    e.params.a11y.enabled && w();
  }), t("fromEdge toEdge afterInit lock unlock", () => {
    e.params.a11y.enabled && h();
  }), t("paginationUpdate", () => {
    e.params.a11y.enabled && k();
  }), t("destroy", () => {
    e.params.a11y.enabled && A();
  });
}
function qt({ swiper: e, extendParams: s, on: t, emit: i, params: n }) {
  e.autoplay = {
    running: !1,
    paused: !1,
    timeLeft: 0
  }, s({ autoplay: {
    enabled: !1,
    delay: 3e3,
    waitForTransition: !0,
    disableOnInteraction: !1,
    stopOnLastSlide: !1,
    reverseDirection: !1,
    pauseOnMouseEnter: !1
  } });
  let a, l, o = n && n.autoplay ? n.autoplay.delay : 3e3, r = n && n.autoplay ? n.autoplay.delay : 3e3, u, m = (/* @__PURE__ */ new Date()).getTime(), p, y, f, g, S, M;
  function d(T) {
    !e || e.destroyed || !e.wrapperEl || T.target === e.wrapperEl && (e.wrapperEl.removeEventListener("transitionend", d), !(M || T.detail && T.detail.bySwiperTouchMove) && D());
  }
  const c = () => {
    if (e.destroyed || !e.autoplay.running) return;
    e.autoplay.paused ? p = !0 : p && (r = u, p = !1);
    const T = e.autoplay.paused ? u : m + r - (/* @__PURE__ */ new Date()).getTime();
    e.autoplay.timeLeft = T, i("autoplayTimeLeft", T, T / o), l = requestAnimationFrame(() => {
      c();
    });
  }, h = () => {
    let T;
    if (e.virtual && e.params.virtual.enabled ? T = e.slides.find((I) => I.classList.contains("swiper-slide-active")) : T = e.slides[e.activeIndex], !!T)
      return parseInt(T.getAttribute("data-swiper-autoplay"), 10);
  }, b = () => {
    let T = e.params.autoplay.delay;
    const I = h();
    return !Number.isNaN(I) && I > 0 && (T = I), T;
  }, E = (T) => {
    if (e.destroyed || !e.autoplay.running) return;
    cancelAnimationFrame(l), c();
    let I = T;
    typeof I > "u" && (I = b(), o = I, r = I), u = I;
    const B = e.params.speed, V = () => {
      !e || e.destroyed || (e.params.autoplay.reverseDirection ? !e.isBeginning || e.params.loop || e.params.rewind ? (e.slidePrev(B, !0, !0), i("autoplay")) : e.params.autoplay.stopOnLastSlide || (e.slideTo(e.slides.length - 1, B, !0, !0), i("autoplay")) : !e.isEnd || e.params.loop || e.params.rewind ? (e.slideNext(B, !0, !0), i("autoplay")) : e.params.autoplay.stopOnLastSlide || (e.slideTo(0, B, !0, !0), i("autoplay")), e.params.cssMode && (m = (/* @__PURE__ */ new Date()).getTime(), requestAnimationFrame(() => {
        E();
      })));
    };
    return I > 0 ? (clearTimeout(a), a = setTimeout(() => {
      V();
    }, I)) : requestAnimationFrame(() => {
      V();
    }), I;
  }, k = () => {
    m = (/* @__PURE__ */ new Date()).getTime(), e.autoplay.running = !0, E(), i("autoplayStart");
  }, z = () => {
    e.autoplay.running = !1, clearTimeout(a), cancelAnimationFrame(l), i("autoplayStop");
  }, L = (T, I) => {
    if (e.destroyed || !e.autoplay.running) return;
    clearTimeout(a), T || (S = !0);
    const B = () => {
      i("autoplayPause"), e.params.autoplay.waitForTransition ? e.wrapperEl.addEventListener("transitionend", d) : D();
    };
    if (e.autoplay.paused = !0, I) {
      B();
      return;
    }
    u = (u || e.params.autoplay.delay) - ((/* @__PURE__ */ new Date()).getTime() - m), !(e.isEnd && u < 0 && !e.params.loop) && (u < 0 && (u = 0), B());
  }, D = () => {
    e.isEnd && u < 0 && !e.params.loop || e.destroyed || !e.autoplay.running || (m = (/* @__PURE__ */ new Date()).getTime(), S ? (S = !1, E(u)) : E(), e.autoplay.paused = !1, i("autoplayResume"));
  }, P = () => {
    if (e.destroyed || !e.autoplay.running) return;
    const T = $();
    T.visibilityState === "hidden" && (S = !0, L(!0)), T.visibilityState === "visible" && D();
  }, C = (T) => {
    T.pointerType === "mouse" && (S = !0, M = !0, !(e.animating || e.autoplay.paused) && L(!0));
  }, w = (T) => {
    T.pointerType === "mouse" && (M = !1, e.autoplay.paused && D());
  }, O = () => {
    e.params.autoplay.pauseOnMouseEnter && (e.el.addEventListener("pointerenter", C), e.el.addEventListener("pointerleave", w));
  }, A = () => {
    e.el && typeof e.el != "string" && (e.el.removeEventListener("pointerenter", C), e.el.removeEventListener("pointerleave", w));
  }, v = () => {
    $().addEventListener("visibilitychange", P);
  }, x = () => {
    $().removeEventListener("visibilitychange", P);
  };
  t("init", () => {
    e.params.autoplay.enabled && (O(), v(), k());
  }), t("destroy", () => {
    A(), x(), e.autoplay.running && z();
  }), t("_freeModeStaticRelease", () => {
    (f || S) && D();
  }), t("_freeModeNoMomentumRelease", () => {
    e.params.autoplay.disableOnInteraction ? z() : L(!0, !0);
  }), t("beforeTransitionStart", (T, I, B) => {
    e.destroyed || !e.autoplay.running || (B || !e.params.autoplay.disableOnInteraction ? L(!0, !0) : z());
  }), t("sliderFirstMove", () => {
    if (!(e.destroyed || !e.autoplay.running)) {
      if (e.params.autoplay.disableOnInteraction) {
        z();
        return;
      }
      y = !0, f = !1, S = !1, g = setTimeout(() => {
        S = !0, f = !0, L(!0);
      }, 200);
    }
  }), t("touchEnd", () => {
    if (!(e.destroyed || !e.autoplay.running || !y)) {
      if (clearTimeout(g), clearTimeout(a), e.params.autoplay.disableOnInteraction) {
        f = !1, y = !1;
        return;
      }
      f && e.params.cssMode && D(), f = !1, y = !1;
    }
  }), t("slideChange", () => {
    e.destroyed || !e.autoplay.running || e.autoplay.paused && (u = b(), o = b());
  }), Object.assign(e.autoplay, {
    start: k,
    stop: z,
    pause: L,
    resume: D
  });
}
function Yt(e) {
  const s = getComputedStyle(e), t = s.getPropertyValue("--swiper-block-ratio").trim(), i = s.getPropertyValue("--swiper-block-height").trim();
  i && (e.style.height = i);
}
async function U() {
  const e = document.querySelectorAll(".swiper-block");
  for (const s of e) {
    if (s._swiperInstance) continue;
    Yt(s);
    let t = {};
    try {
      const a = s.dataset.swiperConfig;
      a && (t = JSON.parse(a));
    } catch (a) {
      console.warn("[swiper-block] Could not parse data-swiper-config", a);
    }
    const i = [Wt, _t];
    t.navigation && (i.push(Rt), await Promise.resolve({                })), t.pagination && (i.push(Ht), await Promise.resolve({                })), t.autoplay && i.push(qt);
    const n = t.effect ?? "slide";
    if (n === "fade") {
      const { EffectFade: a } = await import("../effect-fade-C50LmoI1.js");
      i.push(a), await Promise.resolve({                 });
    } else if (n === "creative") {
      const { EffectCreative: a } = await import("../effect-creative-C50LmoI1.js");
      i.push(a), await Promise.resolve({                     });
    }
    s._swiperInstance = new ce(s, {
      ...t,
      modules: i,
      wrapperClass: "swiper-wrapper",
      slideClass: "swiper-slide",
      navigation: t.navigation ? {
        nextEl: `#${s.id} .swiper-button-next`,
        prevEl: `#${s.id} .swiper-button-prev`
      } : !1,
      pagination: t.pagination ? {
        el: `#${s.id} .swiper-pagination`,
        clickable: !0,
        dynamicBullets: !0
      } : !1,
      autoplay: t.autoplay || !1,
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
      creativeEffect: t.creativeEffect ?? {
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
    }), s.querySelectorAll(".swiper-slide__img").forEach((a) => {
      a.complete ? a.closest(".swiper-slide__media")?.classList.add("is-loaded") : a.addEventListener("load", () => {
        a.closest(".swiper-slide__media")?.classList.add("is-loaded");
      }, { once: !0 });
    });
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", U) : U();
document.addEventListener("turbo:render", U);
document.addEventListener("turbo:frame-render", U);
document.addEventListener("htmx:afterSettle", U);
export {
  U as initSwiperBlocks
};

//# sourceMappingURL=swiper-block.js.map