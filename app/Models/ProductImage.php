<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class ProductImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'color_id',
        'image'
    ];

    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function image(): Attribute
    {
        return Attribute::make(
        get: fn($image) => asset('/storage/products/' . $image),
        );
    }

}