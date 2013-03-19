
define(['knockout','global','sourcesModule','overviewModule','profilesModule','underscore'],function(ko,global,sourcesModule,overviewModule,profilesModule,_) {
    
    var mainModule = {
        
        overviewActive: ko.observable(true),
        sourcesActive: ko.observable(false),
        profilesActive: ko.observable(false),
        
        init: function() {
            
            // get data
            var ajax1 = $.getJSON('/sources', function(sources) {
                main.sources = ko.observableArray(sources);
            })
            
            var ajax2 = $.getJSON('/overviews',function(overview) {
                main.overviewObj = _.groupBy(overview, function(obj){ return obj.date });
                var monthString = overviewModule.getMonthString();
                var lastMonthString = overviewModule.getLastMonthString();
                
                main.currMonthOverview = ko.observableArray(main.overviewObj[monthString]);
                main.lastMonthOverview = ko.observableArray(main.overviewObj[lastMonthString]);
                
                // különbségképzés
                var thisMonthObj = main.overviewObj[monthString];
                var lastMonthObj = main.overviewObj[lastMonthString];
                
                var calculatedOverviewArr = new Array();
                $(thisMonthObj).each(function(index,obj) {
                    
                    var sourceId = obj.source_id;
                    var thisMonthSourceValue = parseInt(obj.source_value);
                    
                    var filteredObj = _.where(lastMonthObj, {source_id: sourceId}) 
                    
                    var firstObj = $(filteredObj).first();
                    var lastMonthSourceValue = parseInt(firstObj[0].source_value);
                    
                    var calculatedObj = {
                        name: obj.name,
                        date: obj.date,
                        thisMonthSourceValue: thisMonthSourceValue,
                        lastMonthSourceValue: lastMonthSourceValue
                    }
                    
                    calculatedOverviewArr.push(calculatedObj);
                    alert('IDÁIG MEGVAN');
                });
            });
            
            $.when(ajax1, ajax2).done(function() {
                
                ko.applyBindings(mainModule);
                mainModule.showOverview();
                
                // ha az adott havi egyenleg nincs kitöltve
                if (main.currMonthOverview() == undefined) {
                    
                    overviewModule.hasThisMonthFilled(false);

                    require(['text!../app/templates/overview/addMonthlyOverviewForm.html'],function(addMonthlyOverviewFormTpl) {
                        
                        var addMonthlyOverviewForm = _.template(addMonthlyOverviewFormTpl,{sources: main.sources() });
                        $('#addMonthlyOverview').append(addMonthlyOverviewForm);
                        
                        $("#add-new-source-form button").on('click',function(e) {
                            
                            e.preventDefault();
                            overviewModule.saveMonthlyOverview();
                        });
                    });
                }
            });
        },
        
        showOverview: function() {
            global.hideAllWindows();
            mainModule.overviewActive(true);
            overviewModule.init();
        },
        
        showSources: function() {
            global.hideAllWindows();
            mainModule.sourcesActive(true);
            sourcesModule.init();
        },
        
        showProfiles: function() {
            global.hideAllWindows();
            mainModule.profilesActive(true);
            profilesModule.init();
        }
    }
    
    return mainModule;
});


