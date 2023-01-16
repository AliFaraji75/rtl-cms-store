import AddNewProduct from "../AddNewProduct/AddNewProduct";
import ErrorBox from "../ErrorBox/ErrorBox";
import ProductsTable from "../ProductsTable/ProductsTable";
import React, { useEffect, useState } from "react";
const Products = () => {
    const [allProducts, setAllProucts] = useState([]);

    useEffect(() => {
        getAllProducts();
      }, []);
    
      const getAllProducts = () => {
        fetch("http://localhost:3000/api/products")
          .then((res) => res.json())
          .then((products) => console.log(setAllProucts(products)));
      };
      
    return ( 
        <>
        <ErrorBox msg="هیچ محصولی یافت نشد" /> 
        <AddNewProduct getAllProducts={getAllProducts} />
        <ProductsTable allProducts={allProducts} getAllProducts={getAllProducts} />
        </>
     );
}
 
export default Products;
