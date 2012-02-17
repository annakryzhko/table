var Paging = function (conf) {
    var Cnt = {};

    Cnt = new Filter(conf);

    Cnt.getChange = function (e) {
        var targ = e.target;
        
        if (targ.nodeName.toLowerCase() == "a") {
            e.preventDefault();

            this.cnt.find("a.ui-active").removeClass("ui-active");
            $(targ).addClass("ui-active");
            return targ.innerHTML;
        }
    }
    Cnt.setBack = function (val) {
        val = val || 1;
        this.cnt.find("a.ui-active").removeClass("ui-active");
        this.cnt.find("a:contains('" + val + "')").addClass("ui-active");
    }

    Cnt.initFilter();
    return Cnt;
}


