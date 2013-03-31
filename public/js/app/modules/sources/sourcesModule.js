
define(['jquery','knockout','underscore','global','validate','toaster'],function($,ko,_) {
    
    var sourcesModule = {
        
        init: function() {
            
            require(['text!../app/templates/sources/sourcesView.html'],function(sourcesView) {
                
                $('.container').empty();
                $('.container').append(sourcesView);
                ko.applyBindings(sourcesModule, $(".sources-container")[0]);
            });
        },
                
        getSourceNames: function() {
            
            var overviewObj = main.overviewObj;
            var firstDateObjInThisYear = _.first(main.datesInThisYear());
            var overviewObjFirst = overviewObj[firstDateObjInThisYear.date];
            var sourceNames = _.pluck(overviewObjFirst, 'name');
            
            return sourceNames;
        },
        
        addNewSource: function() {
            
            require(['text!../app/templates/sources/addNewSourceForm.html'],function(addNewSourceForm) {
                
                $('.container').empty();
                $('.container').append(addNewSourceForm);
                ko.applyBindings(sourcesModule, $(".sources-container")[0]);
            });
        },
                
        editSource: function(data) {
            
            var id = data.id;
            
            require(['text!../app/templates/sources/editSourceForm.html'],function(editSourceForm) {
                
                $.ajax({
                    url: '/sources/' + id,
                    dataType: 'json',
                    success: function(sourceName) {
                        
                        $('.container').empty();
                        var tpl = _.template(editSourceForm,{name: sourceName,id:id});
                        $('.container').append(tpl);
                        ko.applyBindings(sourcesModule, $(".sources-container")[0]);
                    }
                });
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
                        main.sources().push({
                            name: form.find('input[name=sourceName]').val()
                        });
                    },
                    error: function() {
                        toaster.toast("Hiba történt, kérem próbálja újra!");
                    }
                })
            }
        },
        
        updateSource: function() {
            
            var sourceName = $('#edit-source-form input[type=text]').val();
            var id = $("#edit-source-form #source-id").val();
            
            $.ajax({
                url: '/sources/' + id + '/update',
                data: {sourceName:sourceName},
                success: function() {
                    
                    var origSources = main.sources();
                    var newSources = new Array();
                    $(origSources).each(function(index,source) {
                        if (source.id == id) source.name = sourceName;
                    });
                }
            })
        },
        
        deleteSource: function(data) {
            
            var result = confirm('Biztos vagy benne?');
            if (result) {
                
                var id = data.id;
                
                $.ajax({
                   url: '/sources/' + id + '/delete',
                   success: function() {
                       
                       var sourceToDelete = _.find(main.sources(), function(source){ return source.id == id; });
                       var cleanedArr = _.without(main.sources(), sourceToDelete);
                       main.sources(cleanedArr);
                       
                   },
                   error: function() {
                       toaster.toast("Hiba történt, kérem próbálja újra!");
                   }
                });
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

