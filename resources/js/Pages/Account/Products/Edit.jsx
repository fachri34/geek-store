import React, { useState } from 'react'
import LayoutAccount from '../../../Layouts/Account'
import { Head, usePage } from '@inertiajs/inertia-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Inertia } from '@inertiajs/inertia'
import Swal from 'sweetalert2'

export default function ProductEdit() {
    const { errors, categories, product } = usePage().props
    
    const [title, setTitle] = useState(product.title)
    const [categoryID, setCategoryID] = useState(product.category_id)
    const [description, setDescription] = useState(product.description)
    const [weight, setWeight] = useState(product.weight)
    const [discount, setDiscount] = useState(product.discount)
    const [productSize, setProductSize] = useState(product.product_sizes)

    const addMoreFields = () => {
        setProductSize([...productSize, { size: "", price: 0 }]);
    }

    const removeFields = (index) => {
        let newProductSize = [...productSize]
        newProductSize.splice(index, 1)
        setProductSize(newProductSize)
    }

    const setProductSizePrice = (i, e) => {
        let newProductSize = [...productSize]
        newProductSize[i][e.target.name] = e.target.value
        setProductSize(newProductSize)
    }

    const updateProduct = async (e) => {
        e.preventDefault()

        Inertia.put(`/account/products/${product.id}`, {
            title: title,
            category_id: categoryID,
            description: description,
            weight: weight,
            discount: discount,
            product_sizes: productSize
        }, {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data Updated Successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <>
            <Head>
                <title>Edit Product</title>
            </Head>
            <LayoutAccount>
                <div className='row mt-4'>
                    <div className='col-12'>
                        <div className='card border-0 rounded shadow-sm border-top-success'>
                            <div className='card-header'>
                                <span className='fw-bold'><i className='fa fa-shopping-bag'></i>Edit Product</span>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={updateProduct}>
                                    <div className='mb-3'>
                                        <label className='form-label fw-bold'>Title</label>
                                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Titile Product" />
                                    </div>
                                    {errors.title && (
                                        <div className='alert alert-danger'>
                                            {errors.title}
                                        </div>
                                    )}
                                    <div className='mb-3'>
                                        <label className='form-label fw-bold'>Category</label>
                                        <select className='form-select' value={categoryID} onChange={(e) => setCategoryID(e.target.value)}>
                                            <option value="">--Select Category--</option>
                                            {
                                                categories.map((category) => (
                                                    <option value= {category.id} key={category.id}>{category.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    {errors.category_id && (
                                        <div className='alert alert-danger'>
                                            {errors.category_id}
                                        </div>
                                    )}
                                    <div className='mb-3'>
                                        <label className='form-label fw-bold'>Description</label>
                                        <ReactQuill theme='snow' rows="5" value={description} onChange={(content) => setDescription(content)}/>
                                    </div>
                                    {errors.description && (
                                        <div className='alert alert-danger'>
                                            {errors.description}
                                        </div>
                                    )}
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label className='form-label fw-bold'>Weight (Gram)</label>
                                                <input type="number" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Enter Weight (Gram)"/>
                                            </div>
                                            {errors.weight && (
                                                <div className='alert alert-danger'>
                                                    {errors.weight}
                                                </div>
                                            )}
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label className='form-label fw-bold'>Discount</label>
                                                <input type="number" className="form-control" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Enter Discount"/>
                                            </div>
                                            {errors.discount && (
                                                <div className='alert alert-danger'>
                                                    {errors.discount}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className='row mt-3 mb-5'>
                                        <div className='col-md-12'>
                                            <div className='alert alert-warning'>
                                                <i className='fa fa-into-circle'></i> add size and price for your product
                                            </div>
                                        </div>
                                        {productSize.map((element, index) => (
                                            <div className='row' key={index}>
                                                <div className='col-md-5'>
                                                    <div className='mb-3'>
                                                        <label className='form-label fw-bold'>Size</label>
                                                        <input type="text" name="size" value={element.size || ""} onChange={e => setProductSizePrice(index, e)} className="form-control" placeholder="Enter Size"/>
                                                    </div>
                                                </div>
                                                <div className='col-md-5'>
                                                    <div className='mb-3'>
                                                        <label className='form-label fw-bold'>Price</label>
                                                        <input type="number" name="price" value={element.price || ""} onChange={e => setProductSizePrice(index, e)} className="form-control" placeholder="Enter Price"/>
                                                    </div>
                                                </div>
                                                {index ? 
                                                <div className='col-md-2'>
                                                    <div className='mb-3'>
                                                        <label className='form-label fw-bold text-white'>.</label>
                                                        <button type='button' className='btn btn-danger btn-md border-0 shadow-sm w-100' onClick={() =>removeFields(index)}><i className='fa fa-trash'></i></button>
                                                    </div>
                                                </div>
                                                :null}
                                            </div>
                                        ))}
                                        <div className='col-md-12'>
                                            <button type='button' className='btn btn-primary btn-md border-0 shadow-sm' onClick={() => addMoreFields()}><i className='fa fa-plus-circle'></i></button>
                                        </div>
                                    </div>
                                    <div>
                                        <button type='submit' className='btn btn-md btn-success me-2'><i className='fa fa-save'></i>Update</button>
                                        <button type='reset' className='btn btn-md btn-warning'><i className='fa fa-redo'></i>Reset</button>
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