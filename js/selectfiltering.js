
var SelectFiltering = function (conf) {

    var Cnt = new Filter(conf);

    Cnt.setChange = function (e) {
        var val, targ = e.target;
        val = this.cnt.find("option:selected").val();
        this.cnt.attr("data-filter", val);

    }

    Cnt.setBack = function (val) {
        this.cnt.find("option[value='" + val + "']").attr("selected", "selected");
    }

    Cnt.initFilter();

    return Cnt;

}




