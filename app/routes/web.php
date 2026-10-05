<?php

use App\Http\Controllers\ADDresumandapplication;
use App\Http\Controllers\JopAPPController;
use App\Http\Controllers\JopADDresumandapplication;
use App\Http\Controllers\RejesterController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/Rejester', 'auth/Rejester')->name('Rejester');
Route::post('/Rejester',[RejesterController::class,'Rejester']);
Route::middleware(['auth','verified'])->group(function () {
    Route::get('/Jops',[JopAPPController::class,'index'] )->name('Jops');
    Route::get('/Jops/{id}',[JopAPPController::class,'show'] )->name('ShowJop');
    Route::get('Myapp',[ADDresumandapplication::class,'index'] )->name('Myapp');
    Route::post('Myapp/{id}',[ADDresumandapplication::class,'store']);
    Route::delete('Myapp/{id}',[ADDresumandapplication::class,'destroy'] )->name('Deletapp');
});


require __DIR__.'/settings.php';
