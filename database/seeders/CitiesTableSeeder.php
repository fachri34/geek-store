<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $response = Http::withHeaders([
            'key' => config('rajaongkir.api_key'),
        ])->get('https://api.rajaongkir.com/starter/city');

        foreach($response['rajaongkir']['results'] as $city){
            City::create([
                'id' => $city['city_id'],
                'province_id' => $city['province_id'],
                'name' => $city['city_name'] . ' - ' . '('. $city['type'] .')', 
            ]);
        }
    }
}
