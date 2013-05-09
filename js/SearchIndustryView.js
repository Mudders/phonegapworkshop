var SearchIndustryView = function(chapters) {

    this.initialize = function() {
        this.el = $('<div />');

    };

    this.render = function() {
        this.el.html(SearchIndustryView.template());
        return this;
    };

    this.initialize();

}

SearchIndustryView.template = Handlebars.compile($("#search-tpl").html());