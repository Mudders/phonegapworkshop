var app = {

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    registerEvents: function() {
        $(window).on('hashchange', $.proxy(this.route, this));
        $('body').on('mousedown', 'a', function(event) {
            $(event.target).addClass('tappable-active');
        });
        $('body').on('mouseup', 'a', function(event) {
            $(event.target).removeClass('tappable-active');
        });
    },

    route: function() {
        var self = this;

        var hash = window.location.hash;
        if (!hash) {
            if (this.homePage) {
                this.slidePage(this.homePage);
            } else {
                this.homePage = new HomeView(this.store).render();
                this.slidePage(this.homePage);
            }
            return;
        }

        if (hash == "#members" && window.localStorage.getItem("chapter")) { hash = "#chapters/" + window.localStorage.getItem("chapter"); }

        var match = hash.match(this.allChaptersURL);
        if (match) {
            console.log("Into All Chapter...");
            this.store.findAllChapters(function(chapters) {
                self.slidePage(new ChapterView(chapters).render());
            });
        }
        match = hash.match(this.chaptersURL);
        if (match) {
            console.log("Into Chapter..." + Number(match[1]));
            window.localStorage.setItem("chapter", Number(match[1]));
            this.store.findChapterMembersById(Number(match[1]), function(members) {
                self.slidePage(new ChapterDetailView(members).render());
            });
        }
        match = hash.match(this.membersURL);
        if (match) {
            console.log("Into Member..." + Number(match[1]));
            this.store.findById(Number(match[1]), function(member) {
                window.localStorage.setItem("chapter", Number(member.chapterid));
                self.slidePage(new MemberView(member).render());
            });
        }
        match = hash.match(this.searchIndustry);
        if (match) {
            console.log("Into searchIndustry...");
            this.searchPage = new SearchIndustryView(this.store).render();
            this.slidePage(this.searchPage);
            return;
        }
        match = hash.match(this.industryURL);
        if (match) {
            console.log("Into industry..." + Number(match[1]));
            this.store.findMembersByIndustry(Number(match[1]), function(members) {
                self.slidePage(new ChapterDetailView(members).render());
            });
        }

    },

    slidePage: function(page) {

        var currentPageDest,
            self = this;

        // If there is no current page (app just started) -> No transition: Position new page in the view port
        if (!this.currentPage) {
            $(page.el).attr('class', 'page stage-center');
            $('body').append(page.el);
            this.currentPage = page;
            return;
        }

        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').not('.homePage').remove();

        if (page === app.homePage) {
            // Always apply a Back transition (slide from left) when we go back to the search page
            $(page.el).attr('class', 'page stage-left');
            currentPageDest = "stage-right";
        } else {
            // Forward transition (slide from right)
            $(page.el).attr('class', 'page stage-right');
            currentPageDest = "stage-left";
        }

        $('body').append(page.el);

        // Wait until the new page has been added to the DOM...
        setTimeout(function() {
            // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
            $(function() {
               $('body').scrollTop(0);
            });
        });

    },

    initialize: function() {

        var self = this;
        this.allChaptersURL = /^#allChapters/;
        this.chaptersURL = /^#chapters\/(\d{1,})/;
        this.membersURL = /^#members\/(\d{1,})/;
        this.searchIndustry = /^#searchIndustry/;
        this.industryURL = /^#industry\/(\d{1,})/;
        this.registerEvents();
        this.store = new WebSqlStore(function() {
            self.route();
        });
    }

};

app.initialize();

//document.addEventListener("deviceready", app.initialize(), false);