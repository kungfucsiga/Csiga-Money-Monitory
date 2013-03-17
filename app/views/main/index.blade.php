<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css" />
        <link href="css/toaster.css" rel="stylesheet" type="text/css" />
        <link href="css/csmm.css" rel="stylesheet" type="text/css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Csiga's money monitor</title>
    </head>
    <body>

        <div class="navbar">
            <div class="navbar-inner">
                <a class="brand" href="#">Csiga's Money Monitor</a>
                <ul class="nav">
                    <li data-bind="css: { 'active': overviewActive }"><a data-bind="click: showOverview" href="#">Áttekintő</a></li>
                    <li data-bind="css: { 'active': sourcesActive }"><a data-bind="click: showSources" href="#">Források</a></li>
                    <li data-bind="css: { 'active': profilesActive }"><a data-bind="click: showProfiles" href="#">Profilok</a></li>
                </ul>
            </div>
        </div>
        
        <div class="container"></div>

        <script data-main="js/app/main.js" type="text/javascript" src="js/libs/require.js"></script>

    </body>
</html>
