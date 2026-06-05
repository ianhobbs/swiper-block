<template>
  <!-- Kirby block wrapper — gives us the standard block toolbar (move, delete, etc.) -->
  <k-block
    v-bind="$props"
    v-on="$listeners"
    class="k-swiper-block"
    :draggable="true"
  >
    <!-- ── Collapsed preview ─────────────────────────────────────────────── -->
    <template #preview>
      <div class="k-swiper-block-preview">
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
          &middot; {{ ratioLabel }}
          &middot; {{ effectLabel }}
          <template v-if="content.autoplay"> &middot; Autoplay</template>
        </div>
      </div>
    </template>

    <!-- ── Open / Edit state — rendered by Kirby's block form ────────────── -->
    <!-- The blueprint fields are shown automatically via <k-block-fields>    -->
  </k-block>
</template>

<script>
export default {
  name: 'SwiperBlock',

  // Inherit standard Kirby block props
  extends: 'k-block',

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
      const map = { slide: 'Slide', fade: 'Fade', creative: 'Creative' };
      return map[this.content?.effect] ?? 'Slide';
    },

    ratioLabel() {
      const map = {
        '21:9': '21:9',
        '16:9': '16:9',
        '4:3': '4:3',
        '3:4': '3:4',
        '2:3': '2:3',
        '1:1': '1:1',
      };
      return map[this.content?.aspect_ratio] ?? '16:9';
    },

    thumbAspectRatio() {
      const map = {
        '21:9': '21 / 9',
        '16:9': '16 / 9',
        '4:3': '4 / 3',
        '3:4': '3 / 4',
        '2:3': '2 / 3',
        '1:1': '1 / 1',
      };
      return map[this.content?.aspect_ratio] || '16 / 9';
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
        aspectRatio: this.thumbAspectRatio,
      };
    },
  },
};
</script>

<style>
/* ── Panel preview styles ─────────────────────────────────────────────────── */
.k-swiper-block-preview {
  padding: var(--spacing-2);
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
