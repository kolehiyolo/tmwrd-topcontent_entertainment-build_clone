function showPopup() {
    window.scrollTo(0, 0);

    document.querySelector(`.popup-register`).classList.add(`popup-showing`);
    document.querySelector(`.popup-register`).classList.remove(`popup-hidden`);
    
    document.querySelector(`.blur_filter`).classList.add(`blur_filter-showing`);
    document.querySelector(`.blur_filter`).classList.remove(`blur_filter-hidden`);

    document.querySelector(`body`).classList.add(`disable-scroll`);
}