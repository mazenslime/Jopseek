<?php

use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JopappController;
use App\Http\Controllers\JopcategouryController;
use App\Http\Controllers\JopvacanciesController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
Route::get('/',function(){
    return Inertia::render('welcome');
});
Route::get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');
Route::get('/dashboard', DashboardController::class)
    ->middleware('auth', 'Role:admin')
    ->name('dashboard');

Route::middleware(['Role:admin,owner'])->group(function () { 
    Route::resource("Jopapplication", JopappController::class)->except(['create','store','edit']);
    Route::get('companies/{company}',[CompaniesController::class, 'show'])->name('companies.show');
    Route::resource("Jopvacancies", JopvacanciesController::class);
    Route::get('companies', [CompaniesController::class,'index'])->name('companies.index');
    });
    Route::middleware(['auth','Role:admin'])->group(function () {
        // Route::resource("companies",CompaniesController::class)->except(['show']);
        Route::resource("Users",UserController::class);
        Route::resource("Jopcategoury",JopcategouryController::class);
        Route::post('companies', [CompaniesController::class,'store'])->name('companies.store');
        Route::patch('companies/{company} ', [CompaniesController::class,'update'])->name('companies.update');
        Route::delete('ompanies/{id}', [CompaniesController::class,'destroy'])->name('companies.destroy');
        Route::delete('companies/delete/{id}', [CompaniesController::class,'delete'])->name('companies.delete');
        Route::get('companies/restore/{id}', [CompaniesController::class,'Restor'])->name('companies.Restor');
});
require __DIR__.'/settings.php';
