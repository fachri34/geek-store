import React from "react";
import Header from "../Components/Header";
import Menu from "../Components/Menu";

export default function LayoutWeb({children}){
    return (
        <>
            <Header/>
            <div className="main">
                {children}
                <Menu/>
            </div>
        </>
    )
}