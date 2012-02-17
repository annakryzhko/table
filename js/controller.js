var History_Controller = function () {
    
    this.isForward = false;

    var self = this, History = window.History;
    if (!History.enabled) {
        return false;
    }

    History.Adapter.bind(window, 'statechange', function () {
        var State;
        if (!self.isForward) {
            State = History.getState();
            mediator.back(State);

        }
        self.isForward = false;
    });

    this.forward = function (result) {
        self.isForward = true;
        History.pushState(result.state, "", result.url);
    }
};