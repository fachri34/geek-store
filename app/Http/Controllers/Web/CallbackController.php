<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class CallbackController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $dutikuConfig = new \Duitku\Config(config('duitku.merchant_key'), config('duitku,merchant_code'));
        $dutikuConfig->setSandboxMode(config('duitku.sandbox_mode'));
        $duitkuConfig->setSanitizedMode(true);
        $duitkuConfig->setDuitkuLogs(false);

        try {
            $callback = \Duitku\Api::callback($duitkuConfig);
            header('Content-Type: application/json');
            $notif = json_decode($callback);

            $transaction = Transaction::where('invoice', $notif->merchantOrderId)->firsr();
            if($notif->resultCode == '00'){
                $transaction->status = 'PAID';
                $transaction->save();
            } else if($notif->resultCode == '01'){
                $transaction->status = 'UNPAID';
                $transaction->save();
            } else if($notif->resultCode == '02'){
                $transaction->status = 'CANCELLED';
                $transaction->save();
            }
        }catch(Exception $e){
            http_response_code(400);
            echo $e->getMessage();
        }
    }
}
