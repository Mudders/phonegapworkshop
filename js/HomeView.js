var HomeView = function(store) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
    };

    this.render = function() {
        this.el.html(HomeView.template());
        return this;
    };


    this.initialize();

}

HomeView.template = Handlebars.compile($("#home-tpl").html());
