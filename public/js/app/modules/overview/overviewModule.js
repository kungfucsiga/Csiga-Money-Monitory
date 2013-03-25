
define(['jquery','knockout','underscore','global','validate','toaster','highcharts'],function($,ko,_,global) {
    
    var overviewModule = {
        
        yearOverviewActive: ko.observable(true),
        monthOverviewActive: ko.observable(false),
        averageOverviewActive: ko.observable(false),
        hasThisMonthFilled: ko.observable(true),
        
        monthToShow: ko.observable(global.getCurrentMonth()),
        yearToShow: ko.observable(global.getCurrentYear()),
        init: function() {
            
            require(['text!../app/templates/overview/overviewView.html'],function(overviewView) {
                
                $('.container').empty();
                $('.container').append(overviewView);
                ko.applyBindings(overviewModule, $(".overview-container")[0]);
                overviewModule.initYearChart();
            });
        },
                
        showOverviewByYear: function() {
            
            overviewModule.yearOverviewActive(true);
            overviewModule.monthOverviewActive(false);
            overviewModule.averageOverviewActive(false);
        },
                
        showOverviewByMonth: function() {
    
            overviewModule.monthOverviewActive(true);
            overviewModule.yearOverviewActive(false);
            overviewModule.averageOverviewActive(false);
            this.calculateSum();
            this.showDirectionOfDifference();
        },
                
        showOverviewByAverage: function() {
            
            overviewModule.monthOverviewActive(false);
            overviewModule.yearOverviewActive(false);
            overviewModule.averageOverviewActive(true);
        },
                
        getMonthString: function() {
            
            var year = this.yearToShow().toString();
            var month = this.monthToShow().toString();
            
            if (month.length == 1) month = '0' + month;
            
            var monthString = year + '-' + month + '-01';
            return monthString;
        },
                
        getLastMonthString: function() {
    
            var year = this.yearToShow();
            var month = this.monthToShow() - 1;
            if (month == 0) {
                month = 12;
                year--;
            }
            
            year = year.toString();
            month = month.toString();
            
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
            
            this.calculateSum();
            this.showDirectionOfDifference();
        },
                
        calculateSum: function() {
    
            var sum = 0;
            $(".overview-table .source-value").each(function() {
                
                var value = parseInt($(this).text());
                sum += value;
            });
            
            $(".sum-value").text(sum);
        },
                
        showDirectionOfDifference: function() {
            
            $(".overview-table .last-month-difference").each(function() {
                
                var column = $(this);
                var row = column.closest('tr');
                
                var directionOfDifferenceColumn = row.find('.direction-of-difference');
                
                var value = parseInt(column.text());
                if (value >= 0) directionOfDifferenceColumn.addClass('icon-hand-up');
                else directionOfDifferenceColumn.addClass('icon-hand-down');
            });
        },
                
        getMonthsArr: function() {
            
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
            
            return months;
        },
                
        getMonthStringByInt: function() {
            
            var months = this.getMonthsArr();
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
                    success: function() {
                        
                        var monthOverviewObj = {
                            date: "2013-03-01",
                            name: "Citibank",
                            source_id: "1",
                            source_value: "456"
                        };
                        
                        console.log(main.currMonthOverview());
                        
                        
                        overview.hasThisMonthFilled(true);
                    },
                    error: function() {
                        toaster.toast("Hiba történt, kérem próbálja újra!");
                    }
                })
            }
        },
        
        initYearChart: function() {
            
            var months = this.getMonthsArr();
            
            var overviewObj = main.overviewObj;
            alert('ITT KI KELL SZEDNI AZ ELSŐ DÁTUMOT ADATÁBIZSBÓL');
            var overviewObjFirst = overviewObj['2013-02-01'];
            
            var sourceNames = _.pluck(overviewObjFirst, 'name');
            this.makeChartObject(sourceNames,overviewObj);
            
            $('#charts-container').highcharts({
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Változás'
                },
                xAxis: {
                    categories: months
                },
                yAxis: {
                    title: {
                        text: 'Havi változás'
                    }
                },
                series: [{
                    name: 'Jane',
                    data: [1,0,4,2,1,2,3,4,5,6,7,8]
                }, 
                {
                    name: 'John',
                    data: [5,7,3,3]
                }]
            });
        },
                
        makeChartObject: function(sourceNames,overviewObj) {
    
            $(sourceNames).each(function(sourceIndex,sourceName) {
//                var result = _.where(overviewObj['2013-02-01'], {name: sourceName});
//                console.log(result);
            });
        }
    }
    
    return overviewModule;
});

