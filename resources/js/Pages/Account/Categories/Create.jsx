import React, {useState} from "react";
import LayoutAccount from "../../../Layouts/Account";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function CategoryCreate(){
    const {errors} = usePage().props
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)

    const storeCategory = async (e) => {
        e.preventDefault()

        Inertia.post('/account/categories', {
            name: name,
            image: image
        }, {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data Saved Successfully!',
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
                <title>Crate Category</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="fw-bold"><i className="fa fa-folder"></i>Add New Category</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={storeCategory}>
                                    <div className="mb-3">
                                        <label className="foorm-label fw-bold">Image</label>
                                        <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])}/>
                                    </div>
                                    {errors.image && (
                                        <div className="alert alert-danger">
                                            {errors.image}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Category</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Category Name"/>
                                    </div>
                                    {errors.name && (
                                        <div className="alert alert-danger">
                                            {errors.name}
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
            </LayoutAccount>
        </>
    )
}