import React, { useState } from "react";
import "./AddNewProduct.css";

function AddNewProduct({ getAllProducts }) {
  const initialProductInfos = {
    title: "",
    price: "",
    img: "",
    count: "",
    colors: "",
    popularity: "",
    sale: "",
  };

  const [newProduct, setNewProduct] = useState(initialProductInfos);
  const addProcutNewInfos = {
    title: newProduct.title,
    price: newProduct.price,
    img: newProduct.img,
    count: newProduct.count,
    colors: newProduct.colors,
    popularity: newProduct.popularity,
    sale: newProduct.sale,
  };

  const addProduct = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addProcutNewInfos),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewProduct(initialProductInfos);
        getAllProducts();
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="products-main">
      <h1 className="products-title"> افزودن محصول جدید</h1>
      <form action="#" className="add-products-form">
        <div className="add-products-form-wrap">
          <div className="add-produts-form-group">
            <input
              value={newProduct.title}
              name="title"
              type="text"
              placeholder="اسم محصول را وارد نمایید"
              className="add-produts-input"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="add-produts-form-group">
            <input
              value={newProduct.price}
              name="price"
              type="text"
              placeholder="قیمت محصول را وارد نمایید"
              className="add-produts-input"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="add-produts-form-group">
            <input
              value={newProduct.count}
              name="count"
              type="text"
              placeholder="موجودی محصول را وارد نمایید"
              className="add-produts-input"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="add-produts-form-group">
            <input
              value={newProduct.img}
              name="img"
              type="text"
              placeholder="ادرس عکس محصول را وارد نمایید"
              className="add-produts-input"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="add-produts-form-group">
            <input
              value={newProduct.popularity}
              name="popularity"
              type="text"
              placeholder="میزان محبوبیت محصول را وارد نمایید"
              className="add-produts-input"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="add-produts-form-group">
            <input
              value={newProduct.sale}
              name="sale"
              type="text"
              placeholder="میزان فروش محصول را وارد نمایید"
              className="add-produts-input"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="add-produts-form-group">
            <input
              value={newProduct.colors}
              name="colors"
              type="text"
              placeholder="تعداد رنگ بندی محصول را وارد نمایید"
              className="add-produts-input"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
        </div>
        <button className="add-products-submit" onClick={addProduct}>
          ثبت محصول
        </button>
      </form>
    </div>
  );
}

export default AddNewProduct;

/*
const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    img: "",
    count: "",
    colors: "",
    popularity: "",
    sale: ""
  });
  const addpro ={
    title: newProduct.title,
    price: newProduct.price,
    img: newProduct.img,
    count: newProduct.count,
    colors: newProduct.colors,
    popularity: newProduct.popularity,
    sale: newProduct.sale
  }*/
