
define(['jquery','knockout','underscore','global','validate','toaster'],function($,ko,_,global) {
    
    var overviewModule = {
        
        yearOverviewActive: ko.observable(true),
        monthOverviewActive: ko.observable(false),
        hasThisMonthFilled: ko.observable(true),
        monthToShow: ko.observable(global.getCurrentMonth()),
        yearToShow: ko.observable(global.getCurrentYear()),
        init: function() {
            
            require(['text!../app/templates/overview/overviewView.html'],function(overviewView) {
                
                $('.container').empty();
                $('.container').append(overviewView);
                ko.applyBindings(overviewModule, $(".overview-container")[0]);
            });
        },
                
        showOverviewByYear: function() {
            
            overviewModule.yearOverviewActive(true);
            overviewModule.monthOverviewActive(false);
        },
                
        showOverviewByMonth: function() {
    
            overviewModule.monthOverviewActive(true);
            overviewModule.yearOverviewActive(false);
        },
                
        getMonthString: function() {
            
            var year = this.yearToShow().toString();
            var month = this.monthToShow().toString();
            
            if (month.length == 1) month = '0' + month;
            
            var monthString = year + '-' + month + '-01';
            return monthString;
        },
                
        setPrevYear: function() {
            
            var currYear = this.yearToShow();
            currYear--;
            overview.yearToShow(currYear);
        },
                
        setNextYear: function() {
            
            var currYear = this.yearToShow();
            currYear++;
            overview.yearToShow(currYear);
        },
                
        setPrevMonth: function() {
            
            var monthIndex = parseInt(this.monthToShow());
            monthIndex--;
            if (monthIndex == 0) monthIndex = 12;
            overview.monthToShow(monthIndex);
            
            this.refreshTable();
        },
                
        setNextMonth: function() {
    
            var monthIndex = parseInt(this.monthToShow());
            monthIndex++;
            if (monthIndex == 13) monthIndex = 1;
            overview.monthToShow(monthIndex);
            
            this.refreshTable();
        },
                
        refreshTable: function() {
            
            var monthString = this.getMonthString();
            main.currMonthOverview(main.overviewObj[monthString]);
        },
                
        getMonthStringByInt: function() {
            
            var months = [
                'január',
                'február',
                'március',
                'április',
                'május',
                'június',
                'július',
                'augusztus',
                'szeptember',
                'október',
                'november',
                'december'
            ];
            
            var monthIndex = parseInt(this.monthToShow());
            return months[monthIndex - 1];
        },
                
        saveMonthlyOverview: function() {
            
            var form = $("#add-new-source-form");
            form.validate({
                messages: global.getValidationMessages()
            });
            
            var isValid = form.valid();
            if (isValid) {
                
                var data = form.serialize();
                var url = '/overviews';
                var toaster = $.toaster({showTime:1500, centerX:true, centerY:false}); 
                
                $.ajax({
                    url: url,
                    data: data,
                    type: 'post',
                    dataType: 'json',
                    success: function(res) {
                        
                        console.log(res);
                    },
                    error: function() {
                        toaster.toast("Hiba történt, kérem próbálja újra!");
                    }
                })
            }
        }
    }
    
    return overviewModule;
});

