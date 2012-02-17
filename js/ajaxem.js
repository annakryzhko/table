function AjaxEmulator() {
    var timerId, jsonData = {
        cols: ['name', 'type', 'contact'],
        data: [{ 'name': 'Sela', 'type': 'shop', 'contact': '332223' },
				{ 'name': "Colin's", 'type': 'shop', 'contact': '332-223' },
				{ 'name': 'Rifle', 'type': 'shop', 'contact': '332-723' },
				{ 'name': 'Puma', 'type': 'shop', 'contact': '332-e23' },
				{ 'name': 'Ecco', 'type': 'shop', 'contact': '332-223' },
				{ 'name': 'Geox', 'type': 'shop', 'contact': '332-223' },
				{ 'name': 'Aval', 'type': 'bank', 'contact': '332-223' },
				{ 'name': 'Privat', 'type': 'bank', 'contact': '332-223' },
				{ 'name': 'Ukrsibbank', 'type': 'bank', 'contact': '332-223' },
				{ 'name': 'Cosmo', 'type': 'shop', 'contact': '332-623' }
                ]
    };

    this.changeJson = function (jsontest) {
        var tmp = jsontest.data.shift();
        jsontest.data.push(tmp);
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
