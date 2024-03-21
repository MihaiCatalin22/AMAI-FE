import React from "react";
import Header from "../layoutComponents/Header";
import Footer from "../layoutComponents/Footer";

function DefaultLayout({children}) {
    return (
        <>
        <Header/>
        {children}
        <Footer/>

        </>
        
    );
}
 export default DefaultLayout;