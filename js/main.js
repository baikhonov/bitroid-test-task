window.addEventListener('DOMContentLoaded', function() {

    const portfolioSlider = new Swiper('.swiper', {
        speed: 500,
        initialSlide: 1,
        centeredSlides: true,
        watchSlidesProgress: true,
        roundLengths: true,
        spaceBetween: 16,
        slidesPerView: 1,

        navigation: {
            nextEl: '.portfolio__slider .swiper-button-next',
            prevEl: '.portfolio__slider .swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 18,
            },
        },
    });
});
