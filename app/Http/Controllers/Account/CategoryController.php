<?php

namespace App\Http\Controllers\Account;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::when(request()->q, function ($categories) {
            $categories = $categories->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(5);
        
        $categories->appends(['q' => request()->q]);

        return inertia('Account/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return inertia('Account/Categories/Create');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'image' => 'required|image|mimes:jpeg,jpg,png|max:2000',
            'name' => 'required|unique:categories',
        ]);

        $image = $request->file('image');
        $image->storeAs('public/categories', $image->hashName());

        Category::create([
            'image' => $image->hashName(),
            'name' => $request->name,
            'slug' => Str::slug($request->name, '-')
        ]);

        return redirect()->route('account.categories.index');
    }

    public function edit(Category $category)
    {
        return inertia('Account/Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $this->validate($request, [
            'name' => 'required|unique:categories,name,' . $category->id,
        ]);

        if($request->file('image')){
            Storage::disk('local')->delete('public/categories' . basename($category->image));

            $image = $request->file('image');
            $image->storeAs('public/categories', $image->hashName());

            $category->update([
                'image' => $image->hashName(),
                'name' => $request->name,
                'slug' => Str::slug($request->name, '-')
            ]);

            return redirect()->route('account.categories.index');
        }
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        Storage::disk('local')->delete('public/categories' . basename($category->image));
        $category->delete();
        return redirect()->route('account.categories.index');
    }
}
