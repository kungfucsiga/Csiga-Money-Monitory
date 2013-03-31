
require.config({
    baseUrl: "js/libs",
    paths: {
        
        // libs
        jquery: 'jquery',
        knockout: 'knockout',
        underscore: 'underscore',
        bootstrap: 'bootstrap.min',
        validate: 'jquery.validate.min',
        toaster: 'jquery.toaster.min',
        highcharts: 'highcharts',
        
        // modules
        global: '../app/global',
        mainModule: '../app/modules/main/mainModule',
        overviewModule: '../app/modules/overview/overviewModule',
        sourcesModule: '../app/modules/sources/sourcesModule',
        profilesModule: '../app/modules/profiles/profilesModule'
    },
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

require(['jquery','global','mainModule','sourcesModule','overviewModule'],function(jQuery,globalModule,mainModule,sourcesModule,overviewModule) {
    
    main = mainModule;
    sources = sourcesModule;
    global = globalModule;
    overview = overviewModule; 
    $ = jQuery;
    mainModule.init();
});