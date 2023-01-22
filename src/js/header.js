$(`.header .container .menu_toggle`).click(function(){
    if($(`.header .container .menu`).hasClass(`hidden`)) {
        $(`.header .container .menu`).removeClass(`hidden`);
        $(`.header .container .menu`).addClass(`show`);
        $(`body`).addClass(`disable-scroll`);

        $(`.filter`).removeClass(`filter-hidden`);
        $(`.filter`).addClass(`filter-fade_in`);
        $(`.filter`).addClass(`filter-show`);
        setTimeout(()=>{
            $(`.filter`).removeClass(`filter-fade_in`);
        }, 350);
    } else {
        $(`.header .container .menu`).removeClass(`show`);
        $(`.header .container .menu`).addClass(`hidden`);
        $(`body`).removeClass(`disable-scroll`);

        $(`.filter`).removeClass(`filter-show`);
        $(`.filter`).addClass(`filter-fade_out`);
        setTimeout(()=>{
            $(`.filter`).removeClass(`filter-fade_out`);
            $(`.filter`).addClass(`filter-hidden`);
        }, 350);
    };

    $(this).toggleClass("is-active");
  });