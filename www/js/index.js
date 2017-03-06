var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },


    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        document.addEventListener("backbutton", function(){
          debugger;
          topbar.props.history.goBack();
        }, false);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};
app.initialize();
