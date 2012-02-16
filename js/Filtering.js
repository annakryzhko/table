var AN_Controller = function (conf) {
    this.observers = [];
    this.isForward = false;

    var self = this, History = window.History;
    if (!History.enabled) {
        return false;
    }

    History.Adapter.bind(window, 'statechange', function () {
        var State,
            i,
            lng = self.observers.length;

        if (!self.isForward) {
            State = History.getState();
            conf.updater.refresh(State.url);
            for (i = 0; i < lng; i++) {
                self.observers[i].setState(State.data);
            }

        }
        self.isForward = false;

    });


    function createStateObj() {
        var filters = $(conf.selector);
        var i, lng, arr = [], result = {}, fname, fdata;
        lng = filters.length;
        result.state = {};
        result.url = "";

        for (i = 0; i < lng; i++) {
            fname = filters.eq(i).attr("data-name");
            fdata = filters.eq(i).attr("data-filter");
            if (fdata) {
                arr.push(fname + "=" + fdata);
                result.state[fname] = fdata;
            }
        }
        result.url = escape("?" + arr.join("&"));
        return result;
    }

    this.addObserver = function (fObj) {
        this.observers.push(fObj);
    }

    this.change = function () {
        var result = createStateObj();
        self.isForward = true;
        conf.updater.refresh(result.url);
        History.pushState(result.state, "", result.url);


    }
};

var DocCnt = new AN_Controller({ selector: ".filter", updater: TBodyUpdater });



function Filter(conf) {
    var self = this;
    this.cnt = $(conf.selector);
    
    this.name = conf.name;

    this.initFilter = function () {
        var lng = conf.etypes.length, i;
        this.cnt.addClass(conf.className);
        this.cnt.attr("data-name", conf.name);
        for (var i = 0; i < lng; i++) {
            this.cnt.on(conf.etypes[i], this.onChange);
        }
        DocCnt.addObserver(this);
    };

    this.setState = function (state) {
        var val = state[this.name] || "";
        this.setBack(val);
        this.cnt.attr("data-filter", val);
    }

    this.onChange = function (e) {
        var new_val = self.setChange(e);
        self.cnt.attr("data-filter", new_val);
        DocCnt.change();
    };
}

