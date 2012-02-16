var page_conf = { selector: "div.ui-paging",
    etypes: ["click"],
    className: "filter",
    name: "page"
};




var Paging = new Filter(page_conf);
Paging.setChange = function (e) {
    var targ = e.target;
    if (targ.nodeName.toLowerCase() == "a") {
        this.cnt.find("a.ui-active").removeClass("ui-active");
        $(targ).addClass("ui-active");
        this.cnt.attr("data-filter", targ.innerHTML);
    }
}
Paging.setBack = function (val) {
    this.cnt.find("a.ui-active").removeClass("ui-active");
    this.cnt.find("a:contains('" + val + "')").addClass("ui-active");
}


Paging.initFilter();

