
var Searching = function (conf) {

    var Cnt = new Filter(conf);

    Cnt.setChange = function (e) {
        this.cnt.attr("data-filter", e.target.value);
    }

    Cnt.setBack = function (val) {
        this.cnt.attr("value", val);
    }

    Cnt.initFilter();

    return Cnt;

}






