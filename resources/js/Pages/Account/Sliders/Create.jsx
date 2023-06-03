import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function SliderCreate(){
    const {errors} = usePage().props
    const [image, setImage] = useState('')
    const [link, setLink] = useState('')

    const storeSlider = async (e) => {
        e.preventDefault()

        Inertia.post('/account/sliders', {
            image: image,
            link: link,
        }, {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data saved successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
                setImage(null)
                setLink('')
            }
        })
    }

    return (
        <>
            <div className="row mt-4">
                <div className="col-12">
                    <div className="card border-0 rounded shadow-sm border-top-success">
                        <div className="card-header">
                            <span className="fw-bold"><i className="fa fa-images"></i>Upload Image Slider</span>
                        </div>
                        <div className="card-body">
                            <form onSubmit={storeSlider}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])}/>
                                </div>
                                {errors.image && (
                                    <div className="alert alert-danger">
                                        {errors.image}
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Link</label>
                                    <input type='text' className="form-control" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Enter Link"/>
                                </div>
                                {errors.link && (
                                    <div className="alert alert-danger">
                                        {errors.link}
                                    </div>
                                )}
                                <div>
                                    <button type="submit" className="btn btn-md btn-success me-2"><i className="fa fa-save"></i>Save</button>
                                    <button type="reset" className="btn btn-md btn-warning"><i className="fa fa-redo"></i>Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}