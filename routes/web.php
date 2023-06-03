<?php

use App\Http\Controllers\Account\CategoryController;
use App\Http\Controllers\Account\ColorController;
use App\Http\Controllers\Account\DashboardController;
use App\Http\Controllers\Account\PermissionController;
use App\Http\Controllers\Account\ProductController;
use App\Http\Controllers\Account\RoleController;
use App\Http\Controllers\Account\SliderController;
use App\Http\Controllers\Account\TransactionController;
use App\Http\Controllers\Account\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Web\CallbackController;
use App\Http\Controllers\Web\CartController;
use App\Http\Controllers\Web\CheckoutController;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\SearchController;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/register', [RegisterController::class, 'index'])->name('register')->middleware('guest');
Route::post('/register', [RegisterController::class, 'store'])->name('register.store')->middleware('guest');

Route::get('/login', [LoginController::class, 'index'])->name('login')->middleware('guest');
Route::post('/login', [LoginController::class, 'store'])->name('login.store')->middleware('guest');

Route::post('/logout', LogoutController::class)->name('logout')->middleware('auth');

Route::prefix('account')->group(function () {
    Route::group(
        ['middleware' => ['auth']],
        function () {
            Route::get('/dashboard', DashboardController::class)->name('account.dashboard');
            Route::get('/permissions', PermissionController::class)->name('account.permissions.index')
                ->middleware('permission:permissions.index');
            Route::resource('/roles', RoleController::class, ['as' => 'account'])
                ->middleware('permission:roles.index|roles.create|roles.edit|roles.delete');
            Route::resource('/users', UserController::class, ['as' => 'account'])
                ->middleware('permission:users.index|users.create|users.edit|users.delete');
            Route::resource('/colors', ColorController::class, ['as' => 'account'])
                ->middleware('permission:colors.index|colors.create|colors.edit|colors.delete');
            Route::resource('/categories', CategoryController::class, ['as' => 'account'])
                ->middleware('permission:categories.index|categories.create|categories.edit|categories.delete');
            Route::post('/products/store_image_product', [ProductController::class, 'storeImageProduct'])->name('account.products.store_image_product');
            Route::delete('/products/destroy_image_product/{id}', [ProductController::class, 'destroyImage'])->name('account.products.destroy_image_product');
            Route::resource('/products', ProductController::class, ['as' => 'account'])
                ->middleware('permission:products.index|products.create|product.edit|product.delete');
            Route::get('transactions', [TransactionController::class, 'index'])->name('account.transactions.index')
                ->middleware('permission:transactions.index');
            Route::get('transactions/{invoice}', [TransactionController::class, 'show'])->name('account.transactions.show')
                ->middleware('permission:transactions.show');
            Route::resource('/sliders', SliderController::class, ['except' => ['create', 'show', 'edit', 'update'], 'as' => 'account'])
                ->middleware('permission:sliders.index|sliders.create|sliders.delete');
        }
    );
});
Route::get('/', HomeController::class)->name('web.home.index');
Route::get('/categories', [\App\Http\Controllers\Web\CategoryController::class, 'index'])->name('web.categories.index');
Route::get('/categories/{slug}', [\App\Http\Controllers\Web\CategoryController::class, 'show'])->name('web.categories.show');
Route::get('/products', [\App\Http\Controllers\Web\ProductController::class, 'index'])->name('web.products.index');
Route::get('/products/{slug}', [\App\Http\Controllers\Web\ProductController::class, 'show'])->name('web.products.show');
Route::get('/carts', [CartController::class, 'index'])->name('web.carts.index')
    ->middleware('auth');
Route::post('/carts', [CartController::class, 'store'])->name('web.carts.store')
    ->middleware('auth');
Route::delete('/carts/{id}', [CartController::class, 'destroy'])->name('web.carts.destroy')
    ->middleware('auth');
Route::get('/checkouts', [CheckoutController::class, 'index'])->name('web.checkouts.index')
    ->middleware('auth');
Route::get('/checkouts/cities', [CheckoutController::class, 'getCities'])->name('web.checkouts.getCities')
    ->middleware('auth');
Route::post('/checkouts/checkOngkir', [CheckoutController::class, 'checkOngkir'])->name('web.checkouts.checkOngkir')
    ->middleware('auth');
Route::post('/checkouts', [CheckoutController::class, 'store'])->name('web.checkouts.store')
    ->middleware('auth');
Route::post('/callback', CallbackController::class)->name('web.callback');
Route::post('/search', SearchController::class)->name('web.search.index');