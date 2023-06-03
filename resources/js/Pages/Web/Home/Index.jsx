import React from "react";
import LayoutWeb from '../../../Layouts/Web'
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import Slider from '../../../Components/Slider'
import CardCategory from '../../../Shared/CardCategory'
import CardProduct from '../../../Shared/CardProduct'

export default function HomeIndex() {
    const { sliders, categories, products } = usePage().props

    return (
        <>
            <Head>
                <title>Geek Store</title>
            </Head>
            <LayoutWeb>
                <Slider silders={sliders} />
                <div className="container mt-4 mb-5">
                    <div className="fade-in">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="row-justify-content-between mb-3">
                                    <div className="col=md-6 col-6 text-start"><strong>Categories</strong></div>
                                    <div className="col-md-6 col-6 text-end">
                                        <Link href="/categories" className="text-dark"><strong>See More<i className="fa fa-long-arrow-alt-right"></i></strong></Link>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    {categories.map((category, index) => (
                                        <CardCategory category={category} key={index}/>
                                    ))}
                                </div>
                                <div className="row justify-content-between mb-1 mt-4">
                                    <div className="col-md-6 col-6 text-start"><strong>All Product</strong></div>
                                    <div className="col-md-6 col-6 text-end">
                                        <Link href="/products" className='text-dark'><strong>See More<i className="fa fa-long-arrow-alt-right"></i></strong></Link>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                        {products.map((product, index) =>(
                                            <CardProduct product={product} key={index}/>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutWeb>
        </>
    )
}