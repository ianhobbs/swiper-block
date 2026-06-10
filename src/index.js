/**
 * Kirby Panel — Swiper Block component registration
 *
 * Compiled by kirbyup into index.js / index.css in the plugin root,
 * which Kirby auto-loads when the plugin is active.
 */
import SwiperBlock from './SwiperBlock.vue';

window.panel.plugin('ianhobbs/kirby-swiper-block', {

  blocks: {
    swiper: SwiperBlock,
  },

  fields: {
    /**
     * The swiper-slide-image field extends the built-in files field in PHP
     * (index.php), so the Panel input can simply reuse the stock files-field
     * component. Without this registration the Panel cannot resolve a
     * k-swiper-slide-image-field component and the drawer form errors out.
     */
    'swiper-slide-image': {
      extends: 'k-files-field',
    },
  },

  components: {
    /**
     * Structure-table column preview for the swiper-slide-image field type.
     *
     * Kirby 5 fieldPreviews convention: the component name must be
     *   k-{fieldType}-field-preview
     *
     * Props injected automatically by the structure field:
     *   value  — array of resolved file objects (each has .url, .filename, .type)
     *   column — the column definition from the blueprint
     *   field  — the field definition from the blueprint
     *
     * In Kirby 5 the Panel resolves file references to full objects before
     * passing them here, so `value[0].url` is the direct file URL we can
     * use as a background-image thumbnail.
     */
    'k-swiper-slide-image-field-preview': {
      props: {
        value:  [Array, String],
        column: Object,
        field:  Object,
      },

      computed: {
        firstFile() {
          return Array.isArray(this.value) && this.value.length > 0
            ? this.value[0]
            : null;
        },

        // Prefer the Panel's own thumb (smaller, faster); fall back to the
        // direct file URL for images.
        thumbUrl() {
          const f = this.firstFile;
          if (!f) return null;
          return (
            f?.image?.url           // Kirby 5 panel thumb object
            ?? f?.thumb?.url        // alternative thumb key
            ?? (f?.type === 'image' ? f?.url : null)  // raw URL fallback
          );
        },

        filename() {
          const f = this.firstFile;
          return f?.filename ?? f?.url?.split('/').pop() ?? '—';
        },
      },

      template: `
        <span v-if="firstFile" style="display:inline-flex;align-items:center;gap:0.375rem;min-width:0;">
          <span
            v-if="thumbUrl"
            :title="filename"
            :style="{
              display:           'inline-block',
              flexShrink:        '0',
              width:             '2.75rem',
              height:            '1.75rem',
              backgroundImage:   'url(' + thumbUrl + ')',
              backgroundSize:    'cover',
              backgroundPosition:'center',
              borderRadius:      '2px',
              outline:           '1px solid rgba(0,0,0,.08)',
            }"
          />
          <k-icon v-else type="image" style="flex-shrink:0;opacity:.5;" />
          <span style="font-size:.75rem;opacity:.65;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            {{ filename }}
          </span>
        </span>
        <span v-else style="opacity:.35;">—</span>
      `,
    },
  },
});
