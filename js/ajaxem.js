function AjaxEmulator() {
    var timerId, jsonData = { persons: [{ 'name': 'a1', 'type': 1, 'contact': '332223' },
				{ 'name': 'Ann', 'type': 1, 'contact': '332-223' },
				{ 'name': 'Julia', 'type': 3, 'contact': '332-723' },
				{ 'name': 'Andrew', 'type': 1, 'contact': '332-e23' },
				{ 'name': 'Veronika', 'type': 2, 'contact': '332-223' },
				{ 'name': 'Mary', 'type': 1, 'contact': '332-223' },
				{ 'name': 'Eugene', 'type': 2, 'contact': '332-223' },
				{ 'name': 'Volodimer', 'type': 1, 'contact': '332-223' },
				{ 'name': 'Sergei', 'type': 2, 'contact': '332-223' },
				{ 'name': 'Igor', 'type': 1, 'contact': '332-623' },
				{ 'name': 'Vera', 'type': 2, 'contact': '332 - 223' },
				{ 'name': 'Yura', 'type': 1, 'contact': '332 - 223'}]
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
var Updater = function (conf) {
    var ajax = new AjaxEmulator(),
        ui_tbl = $(conf.selector),
		 directive = {
		     'tr': {
		         'person<-persons': {
		             'td:nth-child(1)': 'person.name',
		             'td:nth-child(2)': 'person.type',
		             'td:nth-child(3)': 'person.contact'
		         }
		     }
		 };

    function refreshTable(jsonData) {
        ui_tbl.find("tbody").replaceWith($("<tbody></tbody>")
             .html("<tr><td></td><td></td><td></td></tr>")
             .render(jsonData, directive));
        //theadManager.resize();
    }

    this.refresh = function (url) {
        ajax.sendRequest(url, function (jsonData) {
            refreshTable(jsonData);
        });
        ui_tbl.find("tbody").addClass("loading");
    }
}

