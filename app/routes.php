<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
    return View::make('main.index');
});

Route::get('sources/{id}/delete',array('uses' => 'SourcesController@deleteSource'));
Route::get('sources/{id}/update',array('uses' => 'SourcesController@updateSource'));
Route::get('getDatesFromThisYear/{year}',array('uses' => 'OverviewsController@getDatesFromThisYear'));

Route::resource('sources', 'SourcesController');
Route::resource('overviews', 'OverviewsController');