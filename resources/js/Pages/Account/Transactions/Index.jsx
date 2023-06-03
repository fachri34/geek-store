import React from "react";
import LayoutAccount from '../../../Layouts/Account'
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import hasAnyPermission from "../../../Utils/Permissions";
import formatPrice from "../../../Utils/FormatPrice";
import Search from '../../../Shared/Search'
import Pagination from '../../../Shared/Pagination'

export default function TransactionIndex(){
    const {transactions} = usePage().props

    return (
        <>
            <Head>
                <title>Transactions</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-5">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-9 col-12 mb-2">
                                <Search URL={'/account/transactions'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 mb-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="fw-bold"><i className="fa fa-shopping-cart">Transaction</i></span>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: '5%'}}>No</th>
                                                <th scope="col" style={{ width: '20%'}}>Full Name</th>
                                                <th scope="col" style={{ width: '15%'}}>Grand Total</th>
                                                <th scope="col" style={{ width: '20%'}}>Status</th>
                                                <th scope="col" style={{ width: '15%'}}>Created At</th>
                                                <th scope="col" style={{ width: '5%'}}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions.data.map((transaction, index) => (
                                                <tr key={index}>
                                                    <td className="text-cenetr">{++index +(transactions.current_page -1) * transactions.per_page}</td>
                                                    <td>{transaction.user.name}</td>
                                                    <td>Rp. {formatPrice(transaction.grand_total)}</td>
                                                    <td>
                                                        {transaction.status == 'UNPAID' &&
                                                            <button className="btn btn-sm btn-warning"><i className="fa fa-circle-notch fa-spin"></i>UNPAID</button>
                                                        }
                                                        {transaction.status == 'PAID' && 
                                                            <button className="btn btn-sm btn-success"><i className="fa fa-check-circle"></i>PAID</button>
                                                        }
                                                        {transaction.status == 'CANCELLED' && 
                                                            <button className="btn btn-sm btn-danger"><i className="fa fa-times"></i>CANCELLED</button>
                                                        }
                                                    </td>
                                                    <td>{transaction.created_at}</td>
                                                    <td className="text-center">
                                                        {hasAnyPermission(['transactions.show']) && 
                                                        <Link href={`/account/transactions/${transaction.invoice}`} className="btn btn-dark btn-sm me-2"><i className="fa fa-list-ul"></i></Link>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination links={transactions.links} align={'end'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    )
}