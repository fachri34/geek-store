<?php

namespace App\Http\Controllers\Account;

use App\Models\Color;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ColorController extends Controller
{
    public function index()
    {
        $colors = Color::when(request()->q, function ($colors) {
            $colors = $colors->where('name', 'like', '%' . request()->q, '%');
        })->latest()->paginate(5);

        $colors->appends(['q' => request()->q]);
        return inertia('Account/Colors/Index', [
            'colors' =>$colors,
        ]);
    }

    public function create()
    {
        return inertia('Account/Colors/Create');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'image' => 'required|mimes:png,jpg',
        ]);
        $image = $request->file('image');
        $image->storeAs('public/colors', $image->hashName());
        $color = Color::create([
            'name' => $request->name,
            'image' => $image->hashName()
        ]);

        return redirect()->route('account.colors.index');
    }

    public function edit($id)
    {
        $color = Color::findOrFail($id);
        return inertia('Account/Colors/Edit', [
            'color' => $color,
        ]);
    }

    public function update(Request $request, Color $color)
    {
        $this->validate($request, [
            'name' => 'required',
        ]);

        if($request->file('image')){
            Storage::disk('local')->delete('public/colors/' .basename($color->image));
            $image = $request->file('image');
            $image->storeAs('public/colors', $image->hashName());
            $color->update([
                'image' => $image->hashName(),
                'name' => $request->name,
            ]);
        }

        $color->update([
            'name' => $request->name,
        ]);

        return redirect()->route('account.colors.index');
    }

    public function destroy($id)
    {
        $color = Color::findOrFail($id);
        Storage::disk('local')->delete('public/colors/' . basename($color->image));
        $color->delete();
        return redirect()->route('account.colors.index');
    }
}
