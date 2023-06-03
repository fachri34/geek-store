import React from "react";
import LayoutAccount from '../../../Layouts/Account'
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import hasAnyPermission from "../../../Utils/Permissions";
import Search from '../../../Shared/Search'
import Pagination from '../../../Shared/Pagination'
import Delete from '../../../Shared/Delete'

export default function ColorIndex(){
    const{colors} = usePage().props

    return(
        <>
            <Head>
                <title>Colors</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-5">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-3 col-12 mb-2">
                                <Link href="/account/colors/create" className="btn btn-md btn-success border-0 shadow w-100" type="button">
                                <i className="fa fa-plus-circle me-2"></i>
                                    Tambah
                                </Link>
                            </div>
                            <div className="col-md-9 col-12 mb-2">
                                <Search URL={'/account/colors'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 mb-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="fw-bold"><i className="fa fa-palette">Colors</i></span>
                            </div>
                            <div className="card-body">
                                <div className="table-respinsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: '5%'}}>No</th>
                                                <th scope="col" style={{ width: '1%'}}>Name</th>
                                                <th scope="col" style={{ width: '15%'}}>Colors</th>
                                                <th scope="col" style={{ width: '15%'}}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {colors.data.map((color, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">{++index + (colors.current_page-1)* colors.per_page}</td>
                                                    <td>{color.name}</td>
                                                    <td className="text-center">
                                                        <img src={color.image} className='rounded-circle' width={'30'}/>
                                                    </td>
                                                    <td className="text-center">
                                                        {hasAnyPermission(['colors.edit']) &&
                                                            <Link href={`/account/colors/${color.id}/edit`} className='btn btn-primary btn-sm me-2'><i className="fa fa-pencil-alt"></i></Link>
                                                        }
                                                        {hasAnyPermission(['colors.delete']) &&
                                                            <Delete URL={'/account/colors'} id={color.id}/>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination links={colors.links} align={'end'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    )
}