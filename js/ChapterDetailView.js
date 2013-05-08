var ChapterDetailView = function(members) {

    this.initialize = function() {
        this.el = $('<div />');
    };

    this.render = function() {
        this.el.html(ChapterDetailView.template(members));
        return this;
    };

this.initialize();

}

ChapterDetailView.template = Handlebars.compile($("#chapter-tpl").html());