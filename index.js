(function() {
  "use strict";
  function normalizeComponent(scriptExports, render, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render) {
      options.render = render;
      options.staticRenderFns = staticRenderFns;
      options._compiled = true;
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const _sfc_main = {
    name: "SwiperBlock",
    // Declare all standard Kirby block props so v-bind="$props" passes them to k-block
    props: {
      content: { type: Object, default: () => ({}) },
      disabled: { type: Boolean, default: false },
      endpoints: { type: Object, default: () => ({}) },
      fieldset: { type: Object, default: () => ({}) },
      id: { type: String, default: "" },
      isHidden: { type: Boolean, default: false },
      isMergeable: { type: Boolean, default: false },
      name: { type: String, default: "" },
      next: { type: Object, default: null },
      prev: { type: Object, default: null }
    },
    computed: {
      slides() {
        var _a;
        return Array.isArray((_a = this.content) == null ? void 0 : _a.slides) ? this.content.slides : [];
      },
      slideCount() {
        return this.slides.length;
      },
      hasThumbs() {
        return this.slides.some((s) => {
          var _a;
          return ((_a = s.image) == null ? void 0 : _a.length) > 0;
        });
      },
      // Show up to 5 thumbs in the collapsed preview
      previewSlides() {
        return this.slides.slice(0, 5);
      },
      effectLabel() {
        var _a;
        const map = { slide: "Slide", fade: "Fade", creative: "Creative" };
        return map[(_a = this.content) == null ? void 0 : _a.effect] ?? "Slide";
      },
      ratioLabel() {
        var _a;
        const map = {
          "21:9": "21:9",
          "16:9": "16:9",
          "4:3": "4:3",
          "3:4": "3:4",
          "2:3": "2:3",
          "1:1": "1:1"
        };
        return map[(_a = this.content) == null ? void 0 : _a.aspect_ratio] ?? "16:9";
      },
      thumbAspectRatio() {
        var _a;
        const map = {
          "21:9": "21 / 9",
          "16:9": "16 / 9",
          "4:3": "4 / 3",
          "3:4": "3 / 4",
          "2:3": "2 / 3",
          "1:1": "1 / 1"
        };
        return map[(_a = this.content) == null ? void 0 : _a.aspect_ratio] || "16 / 9";
      }
    },
    methods: {
      /**
       * Build an inline background-image style for the preview thumbnail.
       * Uses the first file in the image structure field.
       */
      thumbStyle(slide) {
        var _a;
        const file = (_a = slide == null ? void 0 : slide.image) == null ? void 0 : _a[0];
        if (!(file == null ? void 0 : file.url)) return {};
        return {
          backgroundImage: `url(${file.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          aspectRatio: this.thumbAspectRatio
        };
      }
    }
  };
  var _sfc_render = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("k-block", _vm._g(_vm._b({ staticClass: "k-swiper-block", attrs: { "draggable": true }, scopedSlots: _vm._u([{ key: "preview", fn: function() {
      return [_c("div", { staticClass: "k-swiper-block-preview" }, [_c("div", { staticClass: "k-swiper-block-preview__thumbs" }, [_vm.hasThumbs ? _vm._l(_vm.previewSlides, function(slide, i) {
        return _c("div", { key: i, staticClass: "k-swiper-block-preview__thumb", style: _vm.thumbStyle(slide) }, [slide.heading ? _c("span", { staticClass: "k-swiper-block-preview__label" }, [_vm._v(" " + _vm._s(slide.heading) + " ")]) : _vm._e()]);
      }) : _c("div", { staticClass: "k-swiper-block-preview__empty" }, [_c("k-icon", { attrs: { "type": "image" } }), _c("span", [_vm._v("No slides yet")])], 1)], 2), _c("div", { staticClass: "k-swiper-block-preview__meta" }, [_c("k-icon", { attrs: { "type": "loader" } }), _vm._v(" " + _vm._s(_vm.slideCount) + " slide" + _vm._s(_vm.slideCount !== 1 ? "s" : "") + " · " + _vm._s(_vm.ratioLabel) + " · " + _vm._s(_vm.effectLabel) + " "), _vm.content.autoplay ? [_vm._v(" · Autoplay")] : _vm._e()], 2)])];
    }, proxy: true }]) }, "k-block", _vm.$props, false), _vm.$listeners));
  };
  var _sfc_staticRenderFns = [];
  _sfc_render._withStripped = true;
  var __component__ = /* @__PURE__ */ normalizeComponent(
    _sfc_main,
    _sfc_render,
    _sfc_staticRenderFns
  );
  __component__.options.__file = "/Volumes/3000/Sites/2026-sliderPlugin/src/SwiperBlock.vue";
  const SwiperBlock = __component__.exports;
  window.panel.plugin("ianhobbs/kirby-swiper-block", {
    blocks: {
      swiper: SwiperBlock
    }
  });
})();
