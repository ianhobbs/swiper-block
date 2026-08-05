<template>
  <!--
    Collapsed block preview. Registered via blocks: { swiper } which Kirby
    wraps as `k-block-type-swiper` extending `k-block-type-default`, so the
    block chrome (toolbar, drawer, content prop) is inherited — this component
    only renders the preview. Do NOT wrap <k-block> here: that re-resolves
    k-block-type-swiper and recurses infinitely.
  -->
  <div class="k-swiper-block-preview" @dblclick="open">
    <div class="k-swiper-block-preview__thumbs">
      <template v-if="hasThumbs">
        <div
          v-for="(slide, i) in previewSlides"
          :key="i"
          class="k-swiper-block-preview__thumb"
          :style="thumbStyle(slide)"
        >
          <span v-if="slide.heading" class="k-swiper-block-preview__label">
            {{ slide.heading }}
          </span>
        </div>
      </template>
      <div v-else class="k-swiper-block-preview__empty">
        <k-icon type="image" />
        <span>No slides yet</span>
      </div>
    </div>
    <div class="k-swiper-block-preview__meta">
      <k-icon type="loader" />
      {{ slideCount }} slide{{ slideCount !== 1 ? 's' : '' }}
      &middot; {{ heightLabel }}
      &middot; {{ effectLabel }}
      <template v-if="content.autoplay"> &middot; Autoplay</template>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    slides() {
      return Array.isArray(this.content?.slides) ? this.content.slides : [];
    },

    slideCount() {
      return this.slides.length;
    },

    hasThumbs() {
      return this.slides.some((s) => s.image?.length > 0);
    },

    // Show up to 5 thumbs in the collapsed preview
    previewSlides() {
      return this.slides.slice(0, 5);
    },

    effectLabel() {
      const map = {
        slide: 'Slide',
        fade: 'Fade',
        creative: 'Creative',
        coverflow: 'Coverflow',
      };
      return map[this.content?.effect] ?? 'Slide';
    },

    // Slider Height replaced the old Aspect Ratio field: 0 means each slide
    // follows its image's native ratio, anything else is an explicit container
    // height in the chosen unit.
    heightLabel() {
      const height = Number(this.content?.slider_height) || 0;
      if (height <= 0) return 'Auto height';
      const unit = this.content?.slider_height_unit || 'px';
      return `${height}${unit}`;
    },
  },

  methods: {
    /**
     * Build an inline background-image style for the preview thumbnail.
     * Uses the first file in the image structure field.
     */
    thumbStyle(slide) {
      const file = slide?.image?.[0];
      if (!file?.url) return {};
      return {
        backgroundImage: `url(${file.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    },
  },
};
</script>

<style>
/* ── Panel preview styles ─────────────────────────────────────────────────── */
.k-swiper-block-preview {
  padding: var(--spacing-2);
  cursor: pointer;
}

.k-swiper-block-preview__thumbs {
  display: flex;
  gap: 4px;
  border-radius: var(--rounded);
  overflow: hidden;
  height: 80px;
  margin-bottom: var(--spacing-2);
}

.k-swiper-block-preview__thumb {
  flex: 1;
  min-width: 0;
  border-radius: var(--rounded-sm);
  background-color: var(--color-gray-300);
  position: relative;
  overflow: hidden;
}

.k-swiper-block-preview__label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2px 4px;
  font-size: 9px;
  line-height: 1.2;
  background: rgba(0, 0, 0, .5);
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.k-swiper-block-preview__empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: var(--color-gray-500);
  font-size: var(--text-xs);
  background: var(--color-gray-100);
  border-radius: var(--rounded);
}

.k-swiper-block-preview__meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  font-size: var(--text-xs);
  color: var(--color-gray-600);
}

.k-swiper-block-preview__meta .k-icon {
  color: var(--color-blue-600);
}
</style>
