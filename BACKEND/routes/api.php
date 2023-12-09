<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\PostAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);
Route::middleware(['jwt.verify'])->group(function(){
    Route::get('user/{email}',[PostAuthController::class,'index']);
    Route::patch('update/{id}',[PostAuthController::class,'updateInfo']);
    Route::patch('updatePassword/{id}',[PostAuthController::class,'updatePassword']);
});