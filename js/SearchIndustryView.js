var SearchIndustryView = function(store) {

    this.initialize = function() {
        this.el = $('<div />');
        this.el.on('keyup', '.search-key', this.findIndustryByName);
    };

    this.render = function() {
        this.el.html(SearchIndustryView.template());
        return this;
    };

    this.findIndustryByName = function() {
        store.findIndustryByName($('.search-key').val(), function(industries) {
            $('.industry-list').html(SearchIndustryView.liTemplate(industries));
        });
    };

    this.initialize();

}

SearchIndustryView.template = Handlebars.compile($("#search-tpl").html());
SearchIndustryView.liTemplate = Handlebars.compile($("#search-li-tpl").html());