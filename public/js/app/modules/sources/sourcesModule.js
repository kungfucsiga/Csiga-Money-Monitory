
define(['jquery','knockout','underscore','global','validate','toaster'],function($,ko,_) {
    
    var sourcesModule = {
        
        init: function() {
            
            require(['text!../app/templates/sources/sourcesView.html'],function(sourcesView) {
                
                $('.container').empty();
                $('.container').append(sourcesView);
                ko.applyBindings(sourcesModule, $(".sources-container")[0]);
            });
        },
        
        addNewSource: function() {
            
            require(['text!../app/templates/sources/addNewSourceForm.html'],function(addNewSourceForm) {
                
                $('.container').empty();
                $('.container').append(addNewSourceForm);
                ko.applyBindings(sourcesModule, $(".sources-container")[0]);
            });
        },
        
        saveNewSource: function() {
            
            var form = $("#add-new-source-form");
            form.validate({
                messages: global.getValidationMessages()
            });
            
            var isValid = form.valid();
            if (isValid) {
                
                var data = form.serialize();
                var url = '/sources';
                var toaster = $.toaster({showTime:1500, centerX:true, centerY:false}); 
                
                $.ajax({
                    url: url,
                    data: data,
                    type: 'post',
                    dataType: 'json',
                    success: function(res) {
                        
                        if (res.success) {
                            toaster.toast("Forrás sikeresen hozzáadva!");
                        }
                        main.sources.push({
                            name: form.find('input[name=sourceName]').val()
                        });
                    },
                    error: function() {
                        toaster.toast("Hiba történt, kérem próbálja újra!");
                    }
                })
            }
        },
        
        backToSources: function() {
            
            require(['text!../app/templates/sources/sourcesView.html'],function(sourcesView) {
                
                $('.container').empty();
                $('.container').append(sourcesView);
                ko.applyBindings(sourcesModule, $(".sources-container")[0]);
            });
        }
    }
    
    return sourcesModule;
});

