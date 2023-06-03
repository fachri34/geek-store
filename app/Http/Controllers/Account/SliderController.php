<?php

namespace App\Http\Controllers\Account;

use App\Models\Slider;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    public function index()
    {
        $sliders = Slider::latest()->paginate(5);
        return inertia('Account/Sliders/Index', [
            'sliders' => $sliders
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'link' => 'required',
            'image' => 'required|mimes:png,jpg',
        ]);

        $image = $request->file('image');
        $image->storeAs('public/sliders', $image->hashName());

        Slider::create([
            'link' => $request->link,
            'image' => $image->hashName()
        ]);

        return redirect()->route('account.sliders.index');
    }

    public function destroy ($id)
    {
        $slider = Slider::findOrFail($id);
        Storage::disk('local')->delete('public/sliders/' . basename($slider->image));
        $slider->delete();
        return redirect()->route('account.sliders.index');
    }
}
