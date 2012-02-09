// JavaScript Document
//fixed thead
var AN_APP = {};
AN_APP.Utils = {};

AN_APP.Utils.Serializer = {
    deserialize: function (str) {
        var arr = [], obj = [], lng, tmp;

        str.replace("?", "");
        arr = str.split("&");
        lng = arr.length;
        for (i = 0; i < lng; i++) {
            tmp = arr[i].split("=")
            obj[tmp[0]] = tmp[1];
        }
        return obj;

    },
    serialize: function (obj) {
        var str = "";
        for (prop in obj) {
            str += prop + "=" + obj[prop] + "&";
        };
        str.substring(0, str.length - 2);
        return str;
    }

};
AN_APP.UIController = (function () {
    var filterInput = $("input.ui-filter-text"),
		filterSelect = $("select.ui-filter-select"),
		pageControl = $("div.ui-paging"),
		sortControl = $("thead.ui-fixed-thead"),
		ui_tbody = $('table.ui-table-data tbody'),
		ui_tbl = $('table.ui-table-data'),
        srl = AN_APP.Utils.Serializer,
        theadManager = new FixedThead(),
		ajaxEm = new AjaxEmulator(),
		directive = {
		    'tr': {
		        'person<-persons': {
		            'td:nth-child(1)': 'person.name',
		            'td:nth-child(2)': 'person.type',
		            'td:nth-child(3)': 'person.contact'
		        }
		    }
		},
		filters = { fsort: "",
		    type: "",
		    filter: "",
		    page: 1
		};

    $(window).load(function () { onWinLoad(filters) });
    filterInput.keyup(onInputKeyup);
    filterSelect.change(onSelectChange);
    pageControl.click(onPageCntClick);
    sortControl.click(onSortCntClick);

    function changeState(e) {
        var str = window.location.search || "fsort=&type=&filter=&page=1&";
        filters = srl.deserialize(str);
        ajaxEm.sendRequest(srl.serialize(filters), function (jsonData) {
            refreshTable(jsonData);
        });

        synchronizeCnt(filters);
        e.preventDefault();
    }
    function filtersChange(filters) {
        history.pushState(null, null, "table1.htm?" + srl.serialize(filters));
        ajaxEm.sendRequest(srl.serialize(filters), function (jsonData) {
            refreshTable(jsonData);
        });
        ui_tbl.find("tbody").addClass("loading");

    }
    function refreshTable(jsonData) {
        ui_tbl.find("tbody").replaceWith($("<tbody></tbody>")
             .html("<tr><td></td><td></td><td></td></tr>")
             .render(jsonData, directive));
        theadManager.resize();
    }
    function synchronizeCnt(filters) {
        var sort_parts;
        filterInput.val(filters.filter);
        filterSelect.find("option[value ='" + filters.type + "']").attr("selected", "selected");
        pageControl.find("a.ui-active").removeClass("ui-active");
        pageControl.find("a:contains('" + filters.page + "')").addClass("ui-active");
        sortControl.find("td.ui-sort").removeClass("td.ui-sort");
        sortControl.find("td.ui-asc").removeClass("td.ui-asc");
        if (filters.fsort !== "") {
            sort_parts = filters.fsort.split("-");
            sortControl.find("td[rel='" + sort_parts[0] + "']").addClass("ui-sort" + (sort_parts[1] == "asc") ? " ui-asc" : "");
        }
    }
    function onInputKeyup(e) {
        filters.filter = e.target.value;
        filtersChange(filters);
    };
    function onSelectChange() {
        filters.type = filterSelect.find("option:selected").val();
        filtersChange(filters);
    };
    function onPageCntClick(e) {
        var targ = e.target;
        if (targ.nodeName.toLowerCase() == "a") {
            pageControl.find("a.ui-active").removeClass("ui-active");
            $(targ).addClass("ui-active");
            filters.page = targ.innerHTML;
            filtersChange(filters);
        }

    };

    function setSortLinkAsc(rel) {
        sortControl.find("a[rel='" + rel + "']").each(function () {
            $(this).next().remove();
            $(this).after("<span>&uarr;</span>");
            $(this).addClass("ui-sort");
        });
    };
    function setSortLinkDesc(rel) {

        sortControl.find("a[rel='" + rel + "']").each(function () {
            $(this).next().remove();
            $(this).after("<span>&darr;</span>");
            $(this).addClass("ui-sort");
        });
    }

    function onSortCntClick(e) {
        var targ = e.target, sort_parts = [], prevlink;

        if (targ.nodeName.toLowerCase() == "a") {
            sort_parts = filters.fsort.split("-");

            if (filters.fsort != "" && sort_parts[0] == targ.rel) {

                if (sort_parts[1] == 'asc') {
                    setSortLinkDesc(sort_parts[0]);
                    sort_parts[1] = "desc";
                }
                else {
                    $(targ).removeClass("ui-sort");
                    setSortLinkAsc(sort_parts[0]);
                    sort_parts[1] = "desc";
                }
            }
            else {

                prevlink = sortControl.find("a.ui-sort");
                prevlink.each(function () {
                    $(this).removeClass("ui-sort")
                    $(this).next().remove(); ;
                });
                setSortLinkAsc(targ.rel);
                sort_parts[0] = targ.rel;
                sort_parts[1] = "asc";
            }
            filters.fsort = sort_parts.join("-");
            filtersChange(filters);
        }
    };



    function onWinLoad(filters) {
        synchronizeCnt(filters);
        window.setTimeout(function () {
            $(window).bind("popstate", changeState);
        }, 10);
    }



})();

function AjaxEmulator() {
    var timerId, jsonData = { persons: [{ 'name': 'a1', 'type': 1, 'contact': '332223' },
				{ 'name': 'a1', 'type': 1, 'contact': '332223' },
				{ 'name': 'b1', 'type': 3, 'contact': '332223' },
				{ 'name': 'c1', 'type': 1, 'contact': '332223' },
				{ 'name': 'd1', 'type': 2, 'contact': '332223' },
				{ 'name': 'e1', 'type': 1, 'contact': '332223' },
				{ 'name': 'f1', 'type': 2, 'contact': '332223' },
				{ 'name': 'g1', 'type': 1, 'contact': '332223' },
				{ 'name': 'h1', 'type': 2, 'contact': '332223' },
				{ 'name': 'p1', 'type': 1, 'contact': '332223' },
				{ 'name': 'r1', 'type': 2, 'contact': '332223' },
				{ 'name': 's1', 'type': 1, 'contact': '332223'}]
    };

    this.changeJson = function (jsontest) {
        var tmp = jsontest.persons.shift();
        jsontest.persons.push(tmp);
        return jsontest;
    }
    this.sendRequest = function (data, callback) {
        window.clearTimeout(timerId);
        jsonData = this.changeJson(jsonData)
        timerId = window.setTimeout(function () { callback(jsonData); }, 1000);
    }
    this.abort = function () {
        window.clearTimeout(timerId);
    }

}
function FixedThead() {
    var thead_tr_elem = $("thead.ui-fixed-thead tr"),
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