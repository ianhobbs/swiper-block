const swiper = new Swiper('.swiper', {
  slidesPerView: 4,
  loop: true,
  freeMode: {
    enabled: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination"
  },
  autoplay: {
    disableOnInteraction: true
  }
});