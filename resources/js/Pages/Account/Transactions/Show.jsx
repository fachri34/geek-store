import React from "react";
import LayoutAccount from "../../../Layouts/Account";
import { Head, usePage } from "@inertiajs/inertia-react";
import formatPrice from "../../../Utils/FormatPrice";

export default function TransactionShow() {
    const { transaction } = usePage().props

    return (
        <>
            <>
                <Head>
                    <title>Detail Transaction</title>
                </Head>
                <LayoutAccount>
                    <div className="row mt-4 mb-4">
                        <div className="col-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-header">
                                    <span className="fw-bold"><i className="fa fa-shopping-cart"></i>Detail Transaction</span>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <tr>
                                            <td style={{ width: '25%' }}>No. Invoice</td>
                                            <td style={{ width: '1%' }}>:</td>
                                            <td className="p-2">{transaction.invoice}</td>
                                        </tr>
                                        <tr>
                                            <td>Full Name</td>
                                            <td>:</td>
                                            <td className="p-2">{transaction.user.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Courier/Service/Cost</td>
                                            <td>:</td>
                                            <td className="p-2">{transaction.courier_name}/{transaction.courier_service} / Rp.{formatPrice(transaction.courier_cost)}</td>
                                        </tr>
                                        <tr>
                                            <td>City</td>
                                            <td>:</td>
                                            <td className="p-2">{transaction.city.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Province</td>
                                            <td>:</td>
                                            <td className="p-2">{transaction.province.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Address</td>
                                            <td>:</td>
                                            <td className="p-2">{transaction.address}</td>
                                        </tr>
                                        <tr>
                                            <td>Grand Total</td>
                                            <td>:</td>
                                            <td className="p-2">Rp.{formatPrice(transaction.grand_total)} </td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td>:</td>
                                            <td className="p-3">
                                                {
                                                    transaction.status == 'UNPAID' &&
                                                    <a href={`https://app-sandbox.duitku.com/redirect_checkout?reference=${transaction.reference}&lang=id`} className="btn btn-success btn-sm border-0 shadow-sm">Pay Now</a>
                                                }
                                                {transaction.status == 'PAID' &&
                                                    <button className="btn btn-sm btn-success border-0 shadow-sm"><i className="fa fa-check-circle"></i>Paid</button>
                                                }
                                                {transaction.status == 'CANCELLED' &&
                                                    <button className="btn btn-sm btn-danger border-0 shadow-sm"><i className="fa fa-times"></i>Cancelled</button>
                                                }  
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="card border-0 rounded shadow-sm border-top-success mt-4">
                                <div className="card-header">
                                    <span className="fw-bold"><i className="fa fa-shopping-bag"></i>Detail Product</span>
                                </div>
                                <div className="card-body">
                                    {transaction.transaction_details.map((detail, index) =>(
                                        <div key={index}>
                                            <div className="row g-0">
                                                <img src={detail.product_image} className="img-fluid rounded-3"/>
                                            </div>
                                            <div className="col-md-9 col-9">
                                                <div className="card-body">
                                                    <h4 className="card-title">{detail.product.title}</h4>
                                                    <div className="row">
                                                        <div className="col-md-3 col-6">
                                                            <div>
                                                                Qty:<strong>{detail.qty}</strong>
                                                            </div>
                                                            <div>
                                                                Size : <strong>{detail.size}</strong>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div>
                                                                Color : <img src={detail.color_image} width={'20'} className="rounded-circle mb-1"/>
                                                            </div>
                                                            <div>
                                                                Color Name : <strong>{detail.color}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <h5>Rp . {formatPrice(detail.price)}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutAccount>
            </>
        </>
    )
}