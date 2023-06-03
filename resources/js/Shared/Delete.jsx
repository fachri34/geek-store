import React from "react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function Delete({ URL, id}){
    const destroy = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor:' #3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result)=>{
            if(result.isConfirmed){
                Inertia.delete(`${URL}/${id}`)

                Swal.fire({
                    title: 'Success!',
                    text: 'Data deleted succesfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <>
            <button onClick={()=> destroy(id)} className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
        </>
    )
}