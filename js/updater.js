var TBodyUpdater = function (conf) {
    var ui_tbl_body = $(conf.selector);

    this.refresh = function (jsonData) {
        var str = "", i, j, lngCols, lngPerson,
        cols = jsonData.cols,
        data = jsonData.data;
        lngCols = cols.length;
        lngData = data.length;
        for (i = 0; i < lngData; i++) {
            str += "<tr>";
            for (j = 0; j < lngCols; j++) {
                str += "<td>" + data[i][cols[j]] + "</td>";
            }
            str += "</tr>";
        }
        ui_tbl_body.removeClass("loading");
        ui_tbl_body.html(str);
        

    }
    this.lock = function () {
        ui_tbl_body.addClass("loading");
    }
}

