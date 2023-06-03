import React, {useState} from 'react'
import LayoutAccount from '../../../Layouts/Account'
import { Head, usePage} from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import Swal from 'sweetalert2'

export default function UserCreate() {
    const{ errors, roles} = usePage().props
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [rolesData, setRolesData] = useState([])

    const handleCheckboxChange= (e) => {
        let data = rolesData
        data.push(e.target.value)
        setRolesData(data)
    }

    const storeUser = async (e) => {
        e.preventDefault()

        Inertia.post('/account/users', {
            name: name,
            email: email,
            password:password,
            password_confirmation: passwordConfirmation,
            roles: rolesData
        }, {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data saved successfully!',
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
            <title>Create Users</title>
        </Head>
        <LayoutAccount>
            <div className='row mt-4'>
                <div className='col-12'>
                    <div className='card border-0 rounded shadow-sm border-top-success'>
                        <div className='card-header'>
                            <span className='fw-bold'><i className='fa fa-users'>Add New User</i></span>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={storeUser}>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <label className='form-label fw-bold'>FullName</label>
                                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Full Name"/>
                                        </div>
                                        {errors.name && (
                                            <div className='alert alert-danger'>
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <label className='form-label fw-bold'>Email Address</label>
                                            <input type="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Address"/>
                                        </div>
                                        {errors.email && (
                                            <div className='alert alert-danger'>
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <label className='form-label fw-bold'>Password</label>
                                            <input type="password" className="form-control" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder="Enter Password"/>
                                        </div>
                                        {errors.password && (
                                            <div className='alert alert-danger'>
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <label className='form-label fw-bold'>Password Confirmation</label>
                                            <input type="password" className="form-control" value={passwordConfirmation} onChange={(e) =>setPasswordConfirmation(e.target.value)} placeholder="Enter Password Confirmation"/>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <label className='fw-bold'>Roles</label>
                                    <br/>
                                    {roles.map((role, index) => (
                                        <div className='form-check form-check-inline' key={index}>
                                            <input className='form-check-input' type="checkbox" value={role.name} onChange={handleCheckboxChange} id={`check-${role.id}`}/>
                                            <label className='form-check-label' htmlFor={`check-${role.id}`}>{role.name}</label>
                                        </div>
                                    ))}
                                    {errors.roles && (
                                        <div className='alert aler-danger mt-2'>
                                            {errors.roles}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <button type='submit' className='btn btn-md btn-success me-2'><i className='fa fa-save'>Save</i></button>
                                    <button type='reset' className='btn btn-md btn-warning'><i className='fa fa-redo'>Reset</i></button>
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
