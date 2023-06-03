<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::latest()->paginate(12);
        return inertia('Web/Categories/Index', [
            'categories' => $categories
        ]);
    }

    public function show($slug){
        $category = Category::where('slug', $slug)->with('products.productImages.color', 'products.productSizes')->firstOrFail();
        return inertia('Web/Categories/Show', [
            'category' => $category
        ]);
    }
}
