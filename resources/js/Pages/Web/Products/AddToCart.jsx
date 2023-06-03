import React from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import Swal from 'sweetalert2'

export default function AddToCart({ product_id, productImage, color, colorImage, size, price, weight }) {

    const { auth } = usePage().props

    const addToCart = () => {
        if(!auth.user){
            Swal.fire({
                title: 'Oopss!',
                text: 'Please login!',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
            })

            return Inertia.visit('/login')
        }

        Inertia.post('/carts', {
            product_id: product_id,
            product_image: productImage.split('\\').pop().split('/').pop(),
            color: color,
            color_image: colorImage.split('\\').pop().split('/').pop(),
            size: size,
            price: price,
            qty: 1,
            weight: weight
        }, {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Add to Cart successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <>
            <div className='justify-content-center fixed-bottom'>
                <button onClick={() => addToCart()} className="btn btn-success btn-sm btn-cart p-2 pe-2"><i className='fa fa-shopping-cart me-2'></i>Add to Cart</button>
            </div>
        </>
    )
}