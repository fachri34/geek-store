import React from 'react'
import LayoutAccount from '../../../Layouts/Account'
import { Head, usePage, Link } from '@inertiajs/inertia-react'
import hasAnyPermission from '../../../Utils/Permissions'
import Search from '../../../Shared/Search'
import Pagination from '../../../Shared/Pagination'
import Delete from '../../../Shared/Delete'

export default function CategoryIndex(){
    const {categories} = usePage().props

    return (
        <>
            <Head>
                <title>Categories</title>
            </Head>
            <LayoutAccount>
                <div className='row mt-5'>
                    <div className='col-md-8'>
                        <div className='row'>
                            <div className='col-md-3 col-12 mb-2'>
                                <Link href='/account/categories/create' className="btn btn-md btn-success border-0 shadow w-100" type="button">
                                    <i className='fa fa-plus-circle me-2'></i>
                                    Tambah
                                </Link>
                            </div>
                            <div className='col-md-9 col-12 mb-2'>
                                <Search URL={'/account/categories '}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2 mb-4'>
                    <div className='col-12'>
                        <div className='card border-0 rounded shadow-sm border-top-success'>
                            <div className='card-header'>
                                <span className='fw-bold'><i className='fa fa-folder'></i>Categories</span>
                            </div>
                            <div className='card-body'>
                                <div className='table-responsive'>
                                    <table className='table table-bordered table-striped table-hovered'>
                                        <thead>
                                            <tr>
                                                <th scope='col' style={{ width: '5%'}}>No</th>
                                                <th scope='col' style={{ width: '15%'}}>Category Name</th>
                                                <th scope='col' style={{ width: '15%'}}>Image</th>
                                                <th scope='col' style={{ width: '15%'}}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.data.map((category, index) => (
                                                <tr key={index}>
                                                    <td className='text-center'>{++index + (categories.current_page-1) * categories.per_page}</td>
                                                    <td>{category.name}</td>
                                                    <td className='text-center'>
                                                        <img src={category.image} className='rounded-3' width={'50'}/>
                                                    </td>
                                                    <td className='text-center'>
                                                        {hasAnyPermission(['categories.edit'])&& 
                                                            <Link href={`/account/categories/${category.id}/edit`} className="btn btn-primary btn-sm me-2"><i className='fa fa-pencil-alt'></i></Link>
                                                        }
                                                        {hasAnyPermission(['categories.delete'])&& 
                                                            <Delete URL={'/account/categories'} id={category.id}/>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination links={categories.links} align={'end'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    )
}