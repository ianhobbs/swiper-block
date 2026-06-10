(function(){"use strict";function r(t,e,i,s,n,d,m,b){var l=typeof t=="function"?t.options:t;return e&&(l.render=e,l.staticRenderFns=i,l._compiled=!0),{exports:t,options:l}}const a={name:"SwiperBlock",props:{content:{type:Object,default:()=>({})},disabled:{type:Boolean,default:!1},endpoints:{type:Object,default:()=>({})},fieldset:{type:Object,default:()=>({})},id:{type:String,default:""},isHidden:{type:Boolean,default:!1},isMergeable:{type:Boolean,default:!1},name:{type:String,default:""},next:{type:Object,default:null},prev:{type:Object,default:null}},computed:{slides(){var t;return Array.isArray((t=this.content)==null?void 0:t.slides)?this.content.slides:[]},slideCount(){return this.slides.length},hasThumbs(){return this.slides.some(t=>{var e;return((e=t.image)==null?void 0:e.length)>0})},previewSlides(){return this.slides.slice(0,5)},effectLabel(){var e;return{slide:"Slide",fade:"Fade",creative:"Creative"}[(e=this.content)==null?void 0:e.effect]??"Slide"},ratioLabel(){var e;return{"21:9":"21:9","16:9":"16:9","4:3":"4:3","3:4":"3:4","2:3":"2:3","1:1":"1:1"}[(e=this.content)==null?void 0:e.aspect_ratio]??"16:9"},thumbAspectRatio(){var e;return{"21:9":"21 / 9","16:9":"16 / 9","4:3":"4 / 3","3:4":"3 / 4","2:3":"2 / 3","1:1":"1 / 1"}[(e=this.content)==null?void 0:e.aspect_ratio]||"16 / 9"}},methods:{thumbStyle(t){var i;const e=(i=t==null?void 0:t.image)==null?void 0:i[0];return e!=null&&e.url?{backgroundImage:`url(${e.url})`,backgroundSize:"cover",backgroundPosition:"center",aspectRatio:this.thumbAspectRatio}:{}}}};var o=function(){var e=this,i=e._self._c;return i("k-block",e._g(e._b({staticClass:"k-swiper-block",attrs:{draggable:!0},scopedSlots:e._u([{key:"preview",fn:function(){return[i("div",{staticClass:"k-swiper-block-preview"},[i("div",{staticClass:"k-swiper-block-preview__thumbs"},[e.hasThumbs?e._l(e.previewSlides,function(s,n){return i("div",{key:n,staticClass:"k-swiper-block-preview__thumb",style:e.thumbStyle(s)},[s.heading?i("span",{staticClass:"k-swiper-block-preview__label"},[e._v(" "+e._s(s.heading)+" ")]):e._e()])}):i("div",{staticClass:"k-swiper-block-preview__empty"},[i("k-icon",{attrs:{type:"image"}}),i("span",[e._v("No slides yet")])],1)],2),i("div",{staticClass:"k-swiper-block-preview__meta"},[i("k-icon",{attrs:{type:"loader"}}),e._v(" "+e._s(e.slideCount)+" slide"+e._s(e.slideCount!==1?"s":"")+" · "+e._s(e.ratioLabel)+" · "+e._s(e.effectLabel)+" "),e.content.autoplay?[e._v(" · Autoplay")]:e._e()],2)])]},proxy:!0}])},"k-block",e.$props,!1),e.$listeners))},p=[],c=r(a,o,p);const u=c.exports;window.panel.plugin("ianhobbs/kirby-swiper-block",{blocks:{swiper:u},fields:{"swiper-slide-image":{extends:"k-files-field"}},components:{"k-swiper-slide-image-field-preview":{props:{value:[Array,String],column:Object,field:Object},computed:{firstFile(){return Array.isArray(this.value)&&this.value.length>0?this.value[0]:null},thumbUrl(){var e,i;const t=this.firstFile;return t?((e=t==null?void 0:t.image)==null?void 0:e.url)??((i=t==null?void 0:t.thumb)==null?void 0:i.url)??((t==null?void 0:t.type)==="image"?t==null?void 0:t.url:null):null},filename(){var e;const t=this.firstFile;return(t==null?void 0:t.filename)??((e=t==null?void 0:t.url)==null?void 0:e.split("/").pop())??"—"}},template:`
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
      `}}})})();
