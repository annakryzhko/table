
var Sorting =  function (conf) {

    var Cnt = new Filter(conf);

    Cnt.setChange = function (e) {

        var targ = e.target;

        if (targ.nodeName.toLowerCase() == "td") {
            this.cnt
            .find("td.ui-active")
            .removeClass("ui-active")
            .removeClass("asc")
            .removeClass("desc");
            $(targ).addClass("ui-active");
            $(targ).attr("data-order", ($(targ).attr("data-order") == "asc") ? "desc" : "asc");
            $(targ).addClass("ui-active " + $(targ).attr("data-order"));

            this.cnt.attr("data-filter", $(targ).attr("data-col") + "-" + $(targ).attr("data-order"));
        }
    }


    Cnt.setBack = function (val) {
        var cur_choice, arrVal;
        this.cnt
            .find("td.ui-active")
            .removeClass("ui-active")
            .removeClass("asc")
            .removeClass("desc");
        if (val) {
            arrVal = val.split("-")
            cur_choice = this.cnt.find("[data-col = '" + arrVal[0] + "']");
            cur_choice.addClass("ui-active " + arrVal[1]);
            cur_choice.attr("data-order", arrVal[1]);
        }
    }


    Cnt.initFilter();

    return Cnt;

}



