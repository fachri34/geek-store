<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('productImages.color', 'productSizes')->latest()->paginate(8);

        return inertia('Web/Products/Index', [
            'products' => $products
        ]);
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)->with('productImages.color', 'productSizes')->firstOrFail();

        return inertia('Web/Products/Show', [
            'product' => $product
        ]);
    }
}
