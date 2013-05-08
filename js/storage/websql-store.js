var WebSqlStore = function(successCallback, errorCallback) {

    this.initializeDatabase = function(successCallback, errorCallback) {
        var self = this;
        this.db = window.openDatabase("BNIDB", "1.0", "BNI DB", 200000);
        this.db.transaction(
                function(tx) {
                    self.createChapterTable(tx);
                    self.addChapterData(tx);
                    self.createMemberTable(tx);
                    self.addMemberData(tx);
                },
                function(error) {
                    console.log('Transaction error: ' + error);
                    if (errorCallback) errorCallback();
                },
                function() {
                    console.log('Transaction success');
                    if (successCallback) successCallback();
                }
        )
    }

    this.createChapterTable = function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS chapter');
        var sql = "CREATE TABLE IF NOT EXISTS chapter ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "chaptername VARCHAR(50), " +
            "venue VARCHAR(250), " +
            "city VARCHAR(50), " +
            "area VARCHAR(50), " +
            "meetingday VARCHAR(50), " +
            "meetingtime VARCHAR(50))";
        tx.executeSql(sql, null,
                function() {
                    console.log('Create table success');
                },
                function(tx, error) {
                    alert('Create table error: ' + error.message);
                });
    }

    this.addChapterData = function(tx, chapters) {
        var chapters = [
                {"id": 1, "chaptername": "BNI Absolute", "venue": "Du Boirs Restaurant, 13 Hillford Road", "city": "Waterfall", "area":"Gillits/Kloof", "meetingday": "Thursday", "meetingtime":"7:45 AM"},
                {"id": 2, "chaptername": "BNI Alpha", "venue": "Silveranis, Glenwood Village, Moore Road, Glenwood, KZN, 4001", "city": "Glenwood", "area":"Berea/Glenwood", "meetingday": "Tuesday", "meetingtime":"7:00 AM"},
            ];
        var l = chapters.length;
        var sql = "INSERT OR REPLACE INTO chapter " +
            "(id, chaptername, venue, city, area, meetingday, meetingtime) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = chapters[i];
            tx.executeSql(sql, [e.id, e.chaptername, e.venue, e.city, e.area, e.meetingday, e.meetingtime],
                    function() {
                        console.log('INSERT success');
                    },
                    function(tx, error) {
                        alert('INSERT error: ' + error.message);
                    });
        }
    }

    this.createMemberTable = function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS member');
        var sql = "CREATE TABLE IF NOT EXISTS member ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "firstName VARCHAR(50), " +
            "lastName VARCHAR(50), " +
            "title VARCHAR(50), " +
            "managerId INTEGER, " +
            "chapterId INTEGER, " +
            "city VARCHAR(50), " +
            "officePhone VARCHAR(50), " +
            "cellPhone VARCHAR(50), " +
            "email VARCHAR(50))";
        tx.executeSql(sql, null,
                function() {
                    console.log('Create table success');
                },
                function(tx, error) {
                    alert('Create table error: ' + error.message);
                });
    }

    this.addMemberData = function(tx, members) {
        var members = [
                {"id": 1, "firstName": "Ryan", "lastName": "Howard", "title":"Vice President, North East", "managerId": 0, "chapterId": 1, "city":"New York, NY", "cellPhone":"212-999-8888", "officePhone":"212-999-8887", "email":"ryan@dundermifflin.com"},
                {"id": 2, "firstName": "Michael", "lastName": "Scott", "title":"Regional Manager", "managerId": 1, "chapterId": 1, "city":"Scranton, PA", "cellPhone":"570-865-2536", "officePhone":"570-123-4567", "email":"michael@dundermifflin.com"},
                {"id": 3, "firstName": "Dwight", "lastName": "Schrute", "title":"Assistant Regional Manager", "managerId": 2, "chapterId": 1, "city":"Scranton, PA", "cellPhone":"570-865-1158", "officePhone":"570-843-8963", "email":"dwight@dundermifflin.com"},
                {"id": 4, "firstName": "Jim", "lastName": "Halpert", "title":"Assistant Regional Manager", "managerId": 2, "chapterId": 1, "city":"Scranton, PA", "cellPhone":"570-865-8989", "officePhone":"570-968-5741", "email":"dwight@dundermifflin.com"},
                {"id": 5, "firstName": "Pamela", "lastName": "Beesly", "title":"Receptionist", "managerId": 2, "chapterId": 1, "city":"Scranton, PA", "cellPhone":"570-999-5555", "officePhone":"570-999-7474", "email":"pam@dundermifflin.com"},
                {"id": 6, "firstName": "Angela", "lastName": "Martin", "title":"Senior Accountant", "managerId": 2, "chapterId": 1, "city":"Scranton, PA", "cellPhone":"570-555-9696", "officePhone":"570-999-3232", "email":"angela@dundermifflin.com"},
                {"id": 7, "firstName": "Kevin", "lastName": "Malone", "title":"Accountant", "managerId": 6, "chapterId": 1, "city":"Scranton, PA", "cellPhone":"570-777-9696", "officePhone":"570-111-2525", "email":"kmalone@dundermifflin.com"},
                {"id": 8, "firstName": "Oscar", "lastName": "Martinez", "title":"Accountant", "managerId": 6, "chapterId": 1, "city":"Scranton, PA", "cellPhone":"570-321-9999", "officePhone":"570-585-3333", "email":"oscar@dundermifflin.com"},
                {"id": 9, "firstName": "Creed", "lastName": "Bratton", "title":"Quality Assurance", "managerId": 2, "chapterId": 1, "city":"Scranton, PA", "cellPhone":"570-222-6666", "officePhone":"570-333-8585", "email":"creed@dundermifflin.com"},
                {"id": 10, "firstName": "Andy", "lastName": "Bernard", "title":"Sales Director", "managerId": 4, "chapterId": 1, "city":"Scranton, PA", "cellPhone":"570-555-0000", "officePhone":"570-646-9999", "email":"andy@dundermifflin.com"},
                {"id": 11, "firstName": "Phyllis", "lastName": "Lapin", "title":"Sales Representative", "managerId": 10, "chapterId": 1, "city":"Scranton, PA", "cellPhone":"570-241-8585", "officePhone":"570-632-1919", "email":"phyllis@dundermifflin.com"},
                {"id": 12, "firstName": "Stanley", "lastName": "Hudson", "title":"Sales Representative", "managerId": 10, "chapterId": 1, "city":"Scranton, PA", "cellPhone":"570-700-6464", "officePhone":"570-787-9393", "email":"shudson@dundermifflin.com"},
                {"id": 13, "firstName": "Meredith", "lastName": "Palmer", "title":"Supplier Relations", "managerId": 2, "chapterId": 2, "city":"Scranton, PA", "cellPhone":"570-588-6567", "officePhone":"570-981-6167", "email":"meredith@dundermifflin.com"},
                {"id": 14, "firstName": "Kelly", "lastName": "Kapoor", "title":"Customer Service Rep.", "managerId": 2, "chapterId": 2, "city":"Scranton, PA", "cellPhone":"570-123-9654", "officePhone":"570-125-3666", "email":"kelly@dundermifflin.com"},
                {"id": 15, "firstName": "Toby", "lastName": "Flenderson", "title":"Human Resources", "managerId": 1, "chapterId": 2, "city":"Scranton, PA", "cellPhone":"570-485-8554", "officePhone":"570-699-5577", "email":"toby@dundermifflin.com"}
            ];
        var l = members.length;
        var sql = "INSERT OR REPLACE INTO member " +
            "(id, firstName, lastName, managerId, chapterId, title, city, officePhone, cellPhone, email) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = members[i];
            tx.executeSql(sql, [e.id, e.firstName, e.lastName, e.managerId, e.chapterId, e.title, e.city, e.officePhone, e.cellPhone, e.email],
                    function() {
                        console.log('INSERT success');
                    },
                    function(tx, error) {
                        alert('INSERT error: ' + error.message);
                    });
        }
    }

    this.findByName = function(searchKey, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.title, count(r.id) reportCount " +
                    "FROM member e LEFT JOIN member r ON r.managerId = e.id " +
                    "WHERE e.firstName || ' ' || e.lastName LIKE ? " +
                    "GROUP BY e.id ORDER BY e.lastName, e.firstName";

                tx.executeSql(sql, ['%' + searchKey + '%'], function(tx, results) {
                    var len = results.rows.length,
                        members = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        members[i] = results.rows.item(i);
                    }
                    callback(members);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    }

    this.findById = function(id, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.title, e.city, e.officePhone, e.cellPhone, e.email, e.managerId, m.firstName managerFirstName, m.lastName managerLastName, count(r.id) reportCount " +
                    "FROM member e " +
                    "LEFT JOIN member r ON r.managerId = e.id " +
                    "LEFT JOIN member m ON e.managerId = m.id " +
                    "WHERE e.id=:id";

                tx.executeSql(sql, [id], function(tx, results) {
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    };

    this.findAllChapters = function(callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.chaptername, e.venue, e.city, e.area, e.meetingday, e.meetingtime " +
                    "FROM chapter e";

                tx.executeSql(sql, [], function(tx, results) {
                    var len = results.rows.length,
                        chapters = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        chapters[i] = results.rows.item(i);
                    }
                    callback(chapters);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    }

    this.findChapterMembersById = function(id, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.chaptername, e.venue, e.city, e.area, e.meetingday, e.meetingtime, m.id as memberid, m.firstname, m.lastname, m.title, m.officePhone, m.cellPhone " +
                    "FROM chapter e " +
                    "LEFT JOIN member m ON m.chapterid = e.id " +
                    "WHERE e.id=:id";

                tx.executeSql(sql, [id], function(tx, results) {
                    var len = results.rows.length,
                        members = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        members[i] = results.rows.item(i);
                    }
                    callback(members);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    };

    this.initializeDatabase(successCallback, errorCallback);

}
