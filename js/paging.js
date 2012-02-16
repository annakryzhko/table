
var Paging = function (conf) {
    var Cnt = {};

    Cnt= new Filter(conf);

    Cnt.setChange = function (e) {
        var targ = e.target;
        if (targ.nodeName.toLowerCase() == "a") {
            this.cnt.find("a.ui-active").removeClass("ui-active");
            $(targ).addClass("ui-active");
            this.cnt.attr("data-filter", targ.innerHTML);
        }
    }
    Cnt.setBack = function (val) {
        this.cnt.find("a.ui-active").removeClass("ui-active");
        this.cnt.find("a:contains('" + val + "')").addClass("ui-active");
    }

    Cnt.initFilter();

    return Cnt;

}


