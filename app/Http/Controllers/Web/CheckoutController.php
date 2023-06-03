<?php

namespace App\Http\Controllers\Web;

use App\Models\Cart;
use App\Models\City;
use App\Models\Province;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class CheckoutController extends Controller
{
    public function index ()
    {
        if(Cart::where('user_id', auth()->user()->id)->count() == 0){
            return redirect()->route('web.carts.index');
        }

        $provinces = Province::all();

        return inertia('Web/Checkouts/Index', [
            'provinces' => $provinces
        ]);
    }

    public function getCities(Request $request)
    {
        $cities = City::where('province_id', $request->province_id)->get();
        return response()->json($cities);
    }

    public function checkOngkir(Request $request)
    {
        $response = Http::withHeaders([
            'key' => config('rajaongkir.api_key')
        ])->post('https://api.rajaongkir.com/starter/cost', [
                'origin' => 113,
                'destination' => $request->destination,
                'weight' => $request->weight,
                'courier' => $request->courier
            ]);

        return response()->json($response['rajaongkir']['results'][0]['costs']);
    }

    public function store(Request $request)
    {
        $duitkuConfig = new \Duitku\Config(config('duitku.merchant_key'), config('duitku.merchant_code'));
        $duitkuConfig->setSandboxMode(config('duitku.sandbox_mode'));
        $duitkuConfig->setSanitizedMode(true);
        $duitkuConfig->setDuitkuLogs(false);

        DB::transaction(function () use ($duitkuConfig, $request) {
            $paymentAmount = $request->grand_total;
            $email = $request->email;
            $merchantOrderId = 'INV-' . time();
            $productDetails = 'Pembayaran untuk Invoice :' . $merchantOrderId;
            $customerVaName = $request->name;
            $callbackUrl = config('app.url') . '/callback';
            $returnUrl = config('app.url') . '/account/transactions/' . $merchantOrderId;
            $expiryPeriod = 1440;

            $transaction = Transaction::create([
                'invoice' => $merchantOrderId,
                'user_id' => auth()->user()->id,
                'province_id' => $request->province_id,
                'city_id' => $request->city_id,
                'weight' => $request->weight,
                'courier_name' => $request->courier_name,
                'courier_service' => $request->courier_service,
                'courier_cost' => $request->courier_cost,
                'grand_total' => $request->grand_total,
                'address' => $request->address,
                'status' => 'UNPAID',
            ]);

            $item_details = [];
            foreach (Cart::with('product')->where('user_id', auth()->user()->id)->get() as $cart) {
                $transaction->transactionDetails()->create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $cart->product->id,
                    'product_image' => basename($cart->product_image),
                    'color' => $cart->color,
                    'color_image' => basename($cart->color_image),
                    'size' => $cart->size,
                    'qty' => $cart->qty,
                    'price' => $cart->price,
                ]);

                $item_details[] = array(
                    'name' => $cart->product->title,
                    'price' => $cart->price,
                    'quantity' => $cart->qty
                );
            }

            Cart::with('product')->where('user_id', auth()->user()->id)->delete();

            $ongkir = array(
                'name' => 'Shipping Cost :' . $request->courier_name,
                'price' => (int) $request->courier_cost,
                'quantity' => 1
            );

            array_push($item_details, $ongkir);
            $customerDetail = array(
                'firstName' => $request->name,
                'email' => $request->email,
                'billingAddres' => array(
                    'firstName' => $request->name,
                    'address' => $request->address,
                ),
                'shippingAddress' => array(
                    'firstName' => $request->name,
                    'address' => $request->address,
                ),
            );

            $payload = array(
                'paymentAmount' => $paymentAmount,
                'merchantOrderId' => $merchantOrderId,
                'productDetails' => $productDetails,
                'customerVaName' => $customerVaName,
                'email' => $email,
                'itemDetails' => $item_details,
                'customerDetail' => $customerDetail,
                'callbackUrl' => $callbackUrl,
                'returnUrl' => $returnUrl,
                'expiryPeriod' => $expiryPeriod
            );

            try {
                $responseDuitkuPop = \Duitku\Pop::createInvoice($payload, $duitkuConfig);
                $getReference = json_decode($responseDuitkuPop, true);
                $transaction->reference = $getReference['reference'];
                $transaction->save();

                $this->response['invoice'] = $transaction->invoice;
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        });

        return redirect()->route('account.transactions.show', $this->response);
    }
}
