<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        $role = auth()->user()->getRoleNames();

        if($role[0] == 'admin'){
            $transactions = Transaction::with('user')->when(request()->q, function ($categories) {
                $categories = $categories->where('invoice', 'like', '%' . request()->q . '%');
            })->latest()->paginate(5);
        }else{
            $transactions = Transaction::with('user')->when(request()->q, function ($categories) {
                $categories = $categories->where('invoice', 'like', '%' . request()->q . '%');
            })->where('user_id', auth()->user()->id)->latest()->paginate(5);
        }

        $transactions->appends(['q' => request()->q]);
        return inertia('Account/Transactions/Index', [
            'transactions' => $transactions,
        ]);
    }   

    public function show($invoice)
    {
        $transaction = Transaction::with('transactionDetails.product', 'user', 'province', 'city')->where('invoice', $invoice)->first();
        return inertia('Account/Transactions/Show', [
            'transaction' => $transaction,
        ]);
    }
}
