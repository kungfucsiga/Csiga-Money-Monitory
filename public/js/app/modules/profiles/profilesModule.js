
define(['jquery','knockout','underscore','global','validate','toaster'],function($,ko,_) {
    
    var profilesModule = {
        
        init: function() {
            
            require(['text!../app/templates/profiles/profilesView.html'],function(profilesView) {
                
                $('.container').empty();
                $('.container').append(profilesView);
                ko.applyBindings(profilesModule, $(".profiles-container")[0]);
            });
        }
    }
    
    return profilesModule;
});

