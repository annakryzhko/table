// JavaScript Document
//fixed thead
function FixedThead(conf) {
    var thead_tr_elem = $(conf.selector),
                thead_tr_elem_copy,
                table_elem = thead_tr_elem.parent().parent();

    thead_tr_elem_copy = thead_tr_elem.clone(true, true);
    thead_tr_elem_copy.appendTo(thead_tr_elem.parent());
    thead_tr_elem_copy.addClass("fixed");

    function matchWidth() {
        var thead_first_tds = thead_tr_elem.find("td");
        thead_tr_elem_copy.find("td").each(function (index) {

            $(this).css("width", $(thead_first_tds[index]).width());
        });
    }

    table_elem.resize(matchWidth);
    table_elem.resize();


    thead_tr_elem_copy.hide();
    $(window).scroll(function (e) {
        var windowTop = $(window).scrollTop();

        if (windowTop > table_elem.offset().top) {

            thead_tr_elem_copy.show();
        }
        else { thead_tr_elem_copy.hide(); }
    });

    this.resize = function () {
        table_elem.resize();
    };

};
var theadManager = new FixedThead({selector:"thead.ui-fixed-thead tr"});


