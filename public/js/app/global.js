
define([],function() {
    
    var global = {
        
        dateObj: new Date(),
        getBaseUrl: function() {
            
            var baseUrl = location.href;
            return baseUrl;
        },
        
        hideAllWindows: function() {
            
            main.overviewActive(false);
            main.sourcesActive(false);
            main.profilesActive(false);
        },
        
        getValidationMessages: function() {
            
            var messages = {
                'source': {
                    required: 'A mező kitöltése kötelező'
                }
            };
            
            return messages;
        },
                
        getCurrentMonth: function() {
            var month = "0" + (global.dateObj.getMonth() + 1);
            return month;
        },

        getCurrentYear: function() {
            var year = global.dateObj.getFullYear();
            return year;
        }
    }
    
    return global;
});


