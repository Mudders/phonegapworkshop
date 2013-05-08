var ChapterView = function(chapters) {

    this.initialize = function() {
        this.el = $('<div />');

    };

    this.render = function() {
        this.el.html(ChapterView.template(chapters));
        return this;
    };

    this.initialize();

}

ChapterView.template = Handlebars.compile($("#chapter-li-tpl").html());