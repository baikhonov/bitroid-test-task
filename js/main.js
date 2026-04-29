window.addEventListener('DOMContentLoaded', function() {

    const portfolioSlider = new Swiper('.swiper', {
        speed: 500,
        initialSlide: 1,
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
                centeredSlides: true,
            },
        },
    });

    const burgerButton = document.querySelector('.header__burger-btn');
    const headerMenu = document.querySelector('.header__menu');
    const headerSearchButton = document.querySelector('.header__search-btn');
    const headerCtaButton = document.querySelector('.header__cta-btn');
    const headerNavLinks = document.querySelectorAll('.header__nav-link[aria-haspopup="true"]');
    const tabletQuery = window.matchMedia('(max-width: 1199px)');

    if (!burgerButton || !headerMenu || !headerSearchButton || !headerCtaButton) {
        return;
    }

    const syncCtaPlacement = function(isTablet) {
        if (isTablet) {
            if (!headerMenu.contains(headerCtaButton)) {
                headerMenu.appendChild(headerCtaButton);
            }
            return;
        }

        headerSearchButton.insertAdjacentElement('afterend', headerCtaButton);
    };

    const closeMenu = function() {
        headerMenu.classList.remove('is-open');
        burgerButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('body--menu-open');
    };

    const openMenu = function() {
        headerMenu.classList.add('is-open');
        burgerButton.setAttribute('aria-expanded', 'true');
        document.body.classList.add('body--menu-open');
    };

    const closeAllDropdowns = function() {
        headerNavLinks.forEach(function(link) {
            link.parentElement.classList.remove('is-open');
        });
    };

    burgerButton.addEventListener('click', function() {
        if (headerMenu.classList.contains('is-open')) {
            closeMenu();
            return;
        }

        openMenu();
    });

    document.addEventListener('click', function(event) {
        if (!tabletQuery.matches || !headerMenu.classList.contains('is-open')) {
            return;
        }

        const clickedInsideMenu = headerMenu.contains(event.target) || burgerButton.contains(event.target);
        if (!clickedInsideMenu) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMenu();
            closeAllDropdowns();
        }
    });

    headerNavLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            if (!tabletQuery.matches) {
                return;
            }

            event.preventDefault();

            const parentItem = link.parentElement;
            const isOpen = parentItem.classList.contains('is-open');
            closeAllDropdowns();

            if (!isOpen) {
                parentItem.classList.add('is-open');
            }
        });
    });

    tabletQuery.addEventListener('change', function(event) {
        syncCtaPlacement(event.matches);

        if (!event.matches) {
            closeMenu();
            closeAllDropdowns();
        }
    });

    syncCtaPlacement(tabletQuery.matches);
});
