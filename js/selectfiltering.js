var SelectFiltering = new Filter({ selector: "select.ui-filter-select",
    etypes: ["change"],
    className: "filter",
    name: "type"
});
SelectFiltering.setChange = function (e) {
    var val, targ = e.target;
    val = this.cnt.find("option:selected").val();
    this.cnt.attr("data-filter", val);
    
}
SelectFiltering.setBack = function (val) {
    this.cnt.find("option[value='"+val+"']").attr("selected", "selected");
}


SelectFiltering.initFilter();


