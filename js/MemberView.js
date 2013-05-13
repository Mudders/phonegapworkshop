var MemberView = function(member) {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('click', '.add-location-btn', this.addLocation);
        this.el.on('click', '.add-contact-btn', this.addToContacts);
        this.el.on('click', '.change-pic-btn', this.changePicture);
    };

    this.render = function() {
        this.el.html(MemberView.template(member));
        return this;
    };

    this.addLocation = function(event) {
        event.preventDefault();
        console.log('addLocation');
        navigator.geolocation.getCurrentPosition(
            function(position) {
                $('.location', this.el).html(position.coords.latitude + ',' +position.coords.longitude);
            },
            function() {
                alert('Error getting location');
            });
        return false;
    };

    this.addToContacts = function(event) {
        event.preventDefault();
        console.log('addToContacts');
        if (!navigator.contacts) {
            app.showAlert("Contacts API not supported", "Error");
            return;
        }
        navigator.notification.confirm(
            'Are you sure you want to add to contacts?',  // message
            onConfirm,              // callback to invoke with index of button pressed
            'Add to Contacts Confirmation',            // title
            'Yes, No'          // buttonLabels
        );


        return false;
    };

    this.onConfirm = function(buttonIndex) {
        var contact = navigator.contacts.create({"displayName": member.name});
        //contact.displayName = displayName: member.name;
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', member.phone, false);
        phoneNumbers[1] = new ContactField('mobile', member.mobile, true); // preferred number
        contact.phoneNumbers = phoneNumbers;
        var ContactOrganization  = [];
        ContactOrganization.name = member.company;
        contact.ContactOrganization = ContactOrganization;
        contact.save();
        return false;
    }

    this.changePicture = function(event) {
        event.preventDefault();
        console.log('changePicture');
        if (!navigator.camera) {
            app.showAlert("Camera API not supported", "Error");
            return;
        }
        var options =   {   quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                            encodingType: 0     // 0=JPG 1=PNG
                        };

        navigator.camera.getPicture(
            function(imageData) {
                $('#image').attr('src', "data:image/jpeg;base64," + imageData);
            },
            function() {
                alert('Error taking picture');
            },
            options);

        return false;
    };

    this.initialize();

}

MemberView.template = Handlebars.compile($("#member-tpl").html());