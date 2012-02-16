var search_conf = { selector: "input.ui-filter-text",
    etypes: ["keyup", "paste"],
    className: "filter", 
    name: "search"
};



var Searching = new Filter(search_conf);
Searching.setChange = function (e) {
    this.cnt.attr("data-filter", e.target.value);
}

Searching.setBack = function (val) {
    this.cnt.attr("value", val);
}

Searching.initFilter();


