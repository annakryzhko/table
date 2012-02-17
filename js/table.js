//fixed thead
function FixedThead(conf) {
    var thead_tr_elem = $(conf.selector),
                thead_tr_elem_copy = null,
                table_elem = thead_tr_elem.parent().parent();

    function makeCopy() {
        thead_tr_elem_copy = thead_tr_elem.clone(true, true);
        thead_tr_elem_copy.appendTo(thead_tr_elem.parent());
        thead_tr_elem_copy.addClass("fixed");
    }
    function matchWidth() {
        var thead_first_tds = thead_tr_elem.find("td");
        //thead_tr_elem_copy.css("width", thead_tr_elem.width());
        
        if (thead_tr_elem_copy) {
            thead_tr_elem_copy.find("td").each(function (index) {
                $(this).css("width", thead_first_tds.eq(index).width());
            });
        }
    }

     
    $(window).scroll(function (e) {
        var windowTop = $(window).scrollTop();

        if (windowTop >= table_elem.offset().top) {
            if (!thead_tr_elem_copy) {
                makeCopy();
                table_elem.resize();
            }
        }
        else {
            if (thead_tr_elem_copy) {
                thead_tr_elem.remove();
                thead_tr_elem_copy.removeClass("fixed");
                thead_tr_elem_copy.css("width", "auto");
                thead_tr_elem = thead_tr_elem_copy;
                thead_tr_elem_copy = null;
            }

        }
    });
    $(window).resize(function (e) {
        matchWidth()
        }
  );

};



