var mediator = {
    filters: [],
    self: this,
    updater: { refresh: function () { }, lock: function () { } },
    history_cnt: { forward: function () { } },
    ajax: new AjaxEmulator(),

    filterChanged: function () {
        var result = this.createStateObj();
        this.history_cnt.forward(result);
        this.sendRequest(result.url);
    },
    refresh: function (jsonData) {
        this.updater.refresh(jsonData);
    },
    sendRequest: function (url) {
        var self = this;
        this.ajax.sendRequest(url, function (jsonData) {
            self.refresh(jsonData)
        });
        this.updater.lock();
    },
    addFilter: function (obj) {
        this.filters.push(obj);
    },
    addUpdater: function (obj) {
        this.filters.push(obj);
    },
    back: function (State) {
        var i, j, lng, filters = this.filters;
        lng = filters.length;
        this.sendRequest(State.url);
        for (i = 0; i < lng; i++) {
            filters[i].setState(State.data);
        }
    },
    createStateObj: function () {
        var filters = this.filters, i, lng, arr = [], result = {}, fname, fdata;
        lng = filters.length;
        result.state = {};
        result.url = "";

        for (i = 0; i < lng; i++) {
            fname = filters[i].name;
            fdata = filters[i].data;
            if (fdata) {
                arr.push(fname + "=" + fdata);
                result.state[fname] = fdata;
            }
        }
        result.url = encodeURI("?" + arr.join("&"));
        return result;
    }

}