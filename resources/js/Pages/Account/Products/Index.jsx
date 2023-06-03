import React from 'react'
import LayoutAccount from '../../../Layouts/Account'
import { usePage, Head, Link } from '@inertiajs/inertia-react'
import hasAnyPermission from '../../../Utils/Permissions'
import Search from '../../../Shared/Search'
import Pagination from '../../../Shared/Pagination'
import Delete from '../../../Shared/Delete'

export default function ProductIndex() {
    const { products } = usePage().props

    return (
        <>
            <Head>
                <title>Products</title>
            </Head>
            <LayoutAccount>
                <div className='row mt-5'>
                    <div className='col-md-8'>
                        <div className='row'>
                            <div className='col-md-3 col-12 mb-2'>
                                <Link href='/account/products/create' className='btn btn-md btn-success border-0 shadow w-100' type='button'>
                                    <i className='fa fa-plus-circle me-2'></i>
                                    Add
                                </Link>
                            </div>
                            <div className='col-md-9 col-12 mb-2'>
                                <Search URL={'/account/products'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2 mb-4'>
                    <div className='col-12'>
                        <div className='card border-0 rounded shadow-sm border-top-success'>
                            <div className='card-header'>
                                <span className='fw-bold'><i className='fa fa-shopping-bag'></i>Product</span>
                            </div>
                            <di className="card-body">
                                <div className='table-responsive'>
                                    <table className='table table-bordered table-striped table-hovered'>
                                        <thead>
                                            <tr>
                                                <th scope='col' style={{ width: '5%'}}>No.</th>
                                                <th scope='col' style={{ width: '20%'}}>Title</th>
                                                <th scope='col' style={{ width: '20%'}}>Category</th>
                                                <th scope='col' style={{ width: '15%'}}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.data.map((product, index) => (
                                                <tr key={index}>
                                                    <td className='text-center'>{++index + (products.current_page-1) * products.per_page}</td>
                                                    <td>{product.title}</td>
                                                    <td>{product.category.name}</td>
                                                    <td className='text-center'>
                                                        {hasAnyPermission(['products.show']) && 
                                                            <Link href={`/account/products/${product.id}`} className="btn btn-dark btn-sm me-2"><i className='fa fa-plus-circle'></i></Link>
                                                        }
                                                        {hasAnyPermission(['products.edit']) &&
                                                            <Link href={`/account/products/${product.id}/edit`} className="btn btn-primary btn-sm me-2"><i className='fa fa-pencil-alt'></i></Link>
                                                        }
                                                        {hasAnyPermission(['products.delete']) &&
                                                            <Delete URL={'/account/products'} id={product.id}/>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination links={products.links} align={'end'}/>
                            </di>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    )
}