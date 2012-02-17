function Filter(conf) {
    var self = this;
    this.cnt = $(conf.selector);    
    this.name = conf.name;
    this.data = "";

    this.initFilter = function () {
        var lng = conf.etypes.length, i;
        for (var i = 0; i < lng; i++) {
            this.cnt.on(conf.etypes[i], this.onChange);
        }
        mediator.addFilter(this);
    };

    this.setState = function (state) {
        var val = state[this.name] || "";
        this.setBack(val);
        this.data = val;
    }

    this.onChange = function (e) {
        var new_val = self.getChange(e);
        self.data = new_val;
        mediator.filterChanged();
    };
}

