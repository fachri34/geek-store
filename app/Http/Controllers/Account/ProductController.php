<?php

namespace App\Http\Controllers\Account;

use App\Models\Color;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductImage;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::when(request()->q, function ($products) {
            $products = $products->where('title', 'like', '%' . request()->q . '%');
        })->with('category')->latest()->paginate(5);

        $products->appends(['q' => request()->q]);
        return inertia('Account/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return inertia('Account/Products/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'category_id' => 'required',
            'description' => 'required',
            'weight' => 'required',
            'product_sizes' => 'required|array|min:2'
        ]);

        $product = Product::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title, '-'),
            'category_id' => $request->category_id,
            'description' => $request->description,
            'weight' => $request->weight,
        ]);

        if ($request->product_sizes > 0) {
            foreach ($request->product_sizes as $data) {
                $product->productSizes()->create([
                    'size' => $data['size'],
                    'price' => (int) $data['price']
                ]);
            }
        }

        return redirect()->route('account.products.index');
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        $product->setRelation('productImages', $product->productImages()->with('color')->paginate(5));
        $colors = Color::all();

        return inertia('Account/Products/Show', [
            'product' => $product,
            'colors' => $colors
        ]);
    }

    public function edit($id)
    {
        $product = Product::with('productSizes')->findOrFail($id);
        $categories = Category::all();
        return inertia('Account/Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $this->validate($request, [
            'title' => 'required',
            'category_id' => 'required',
            'description' => 'required',
            'weight' => 'required',
            'product_sizes' => 'required|array|min:2'
        ]);

        $product->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title, '-'),
            'category_id' => $request->category_id,
            'description' => $request->description,
            'weight' => $request->weight,
        ]);

        if ($request->product_sizes > 0) {
            $id = Arr::pluck($request->product_sizes, 'id');
            $product->productSizes()->whereNotIn('id', $id)->delete();

            foreach ($request->product_sizes as $data) {
                $size = $product->productSizes()->where('product_id', $product->id)->where('size', $data['size'])->first();
                if ($size) {
                    $size->update([
                        'size' => $data['size'],
                        'price' => (int) $data['price'],
                    ]);
                } else {
                    $product->productSizes()->create([
                        'size' => $data['size'],
                        'price' => (int) $data['price']
                    ]);
                }
            }
        }

        return redirect()->route('account.products.index');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return redirect()->route('account.products.index');
    }

    public function storeImageProduct(Request $request)
    {
        $this->validate($request, [
            'image' => 'required|mimes:png,jpg',
            'color_id' => 'required',
        ]);

        $product = Product::findOrFail($request->product_id);
        $image = $request->file('image');
        $image->storeAs('public/products', $image->hashName());
        $product->productImages()->create([
            'image' => $image->hashName(),
            'color_id' => $request->color_id
        ]);

        return redirect()->back();
    }

    public function destroyImage($id)
    {
        $product_image = ProductImage::findOrFail($id);
        Storage::disk('local')->delete('public/product/' .basename($product_image->image));
        $product_image->delete();
        return redirect()->back();
    }
}