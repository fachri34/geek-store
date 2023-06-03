import React, { useState } from 'react'
import LayoutAccount from '../../../Layouts/Account'
import { Head, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import Swal from 'sweetalert2'

export default function RoleEdit() {
    const { errors, permissions, role } = usePage().props
    const [name, setName] = useState(role.name)
    const [permissionsData, setPermissionsData] = useState(role.permissions.map(obj => obj.name));

    const handleCheckboxChange = (e) => {
        let data = permissionsData;

        if (data.some((name) => name === e.target.value)) {
            data = data.filter((name) => name !== e.target.value);
        } else {
            data.push(e.target.value);
        }
        setPermissionsData(data)    
    }
    const updateRole = async (e) => {
        e.preventDefault()

        Inertia.put(`/account/roles/${role.id}`, {
            name: name,
            permissions: permissionsData
        }, {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data updated successfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    return (
        <>
            <Head>
                <title>Edit Roles</title>
            </Head>
            <LayoutAccount>
                <div className='row mt-4'>
                    <div className='col-12'>
                        <div className='card border-0 rounded shadow-sm border-top-success'>
                            <div className='card-header'>
                                <span className='fw-bold'><i className='fa fa-shield-alt'>Edit Role</i></span>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={updateRole}>
                                    <div className='mb-3'>
                                        <label className='form-label fw-bold'>Role Name</label>
                                        <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Role Name" />
                                    </div>
                                    {errors.name && (
                                        <div className='alert alert-danger'>
                                            {errors.name}
                                        </div>
                                    )}
                                    <hr />
                                    <div className='mb-3'>
                                        <label className='fw-bold'>Permissions</label>
                                        <br/>
                                        {permissions.map((permission, index) => (
                                            <div className='form-check form-check-inline' key={index}>
                                                <input className='form-check-input' type="checkbox"
                                                    value={permission.name}
                                                    defaultChecked={permissionsData.some((name) => name === permission.name ?? true)}
                                                    onChange={handleCheckboxChange}
                                                    id={`check-${permission.id}`} />
                                                <label className='form-check-label' htmlFor={`check-${permission.id}`}>{ permission.name }</label>
                                            </div>
                                        ))}
                                        {errors.permissions && (
                                            <div className='alert alert-danger mt-2'>
                                                {errors.permissions}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <button type='submit' className='btn btn-md btn-success me-2'><i className='fa fa-save'>Update</i></button>
                                        <button type="reset" className='btn btn-md btn-warning'><i className='fa fa-redo'></i>Reset</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    )
}