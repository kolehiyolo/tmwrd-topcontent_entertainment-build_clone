// Importing other js files
document.querySelector(`.header > .container > .menu_toggle`).addEventListener("click", function () {
    toggleHeaderMenu();
});

function toggleHeaderMenu() {
    if (document.querySelector(`.header > .container > .menu`).classList.contains(`hidden`)) {
        document.querySelector(`.filter`).classList.remove(`filter-hidden`);
        document.querySelector(`.filter`).classList.add(`filter-fade_in`);
        document.querySelector(`.filter`).classList.add(`filter-show`);
        setTimeout(() => {
            document.querySelector(`.filter`).classList.remove(`filter-fade_in`);
        }, 350);
    } else {
        document.querySelector(`.filter`).classList.remove(`filter-show`);
        document.querySelector(`.filter`).classList.add(`filter-fade_out`);
        setTimeout(() => {
            document.querySelector(`.filter`).classList.remove(`filter-fade_out`);
            document.querySelector(`.filter`).classList.add(`filter-hidden`);
        }, 350);
    };

    document.querySelector(`.header > .container > .menu`).classList.toggle(`hidden`);
    document.querySelector(`.header > .container > .menu`).classList.toggle(`show`);
    document.querySelector(`body`).classList.toggle(`disable-scroll`);
    document.querySelector(`.header > .container > .menu_toggle`).classList.toggle("is-active");
}
function showPopup() {
    console.log(`showPopup Clicked`);

    window.scrollTo(0, 0);

    document.querySelector(`.popup-register`).classList.add(`popup-showing`);
    document.querySelector(`.popup-register`).classList.remove(`popup-hidden`);
    
    document.querySelector(`.blur_filter`).classList.add(`blur_filter-showing`);
    document.querySelector(`.blur_filter`).classList.remove(`blur_filter-hidden`);

    document.querySelector(`body`).classList.add(`disable-scroll`);
}
//?= svg.js
//?= main.js