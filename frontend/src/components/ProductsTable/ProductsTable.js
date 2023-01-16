import React, { useState } from "react";
import "./ProductsTable.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./ProductsTable.css";
import DetailModal from "../DetailModal/DetailModal";
import EditModal from "../EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";

function ProductsTable({ getAllProducts, allProducts }) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [isShowEditlModal, setIsShowEditlModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [mainProduct, setMainProduct] = useState({});
  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewCount, setProductNewCount] = useState("");
  const [productNewImg, setProductNewImg] = useState("");
  const [productNewPopularity, setProductNewPopularity] = useState("");
  const [productNewSale, setProductNewSale] = useState("");
  const [productNewColors, setProductNewColors] = useState("");

  const deleteModalCancelAction = () => {
    console.log("سرورم کار خوبی کردین مدال کنسل شد گلم");
    setIsShowModal(false);
  };

  const deleteModalSubmitAction = () => {
    console.log(" شما فقط امر کن من محصولو سه  سوته حذف کنم (:", productId);
    fetch(`http://localhost:3000/api/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((products) => {
        setIsShowModal(false);
        getAllProducts();
      });
  };

  const hideDetalModal = () => {
    setIsShowDetailModal(false);
  };

  const updataProductsInfos = (event) => {
    event.preventDefault();
    const productinfos = {
      title: productNewTitle,
      price: productNewPrice,
      img: productNewImg,
      count: productNewCount,
      sale: productNewSale,
      popularity: productNewPopularity,
      colors: productNewColors,
    };

    fetch(`http://localhost:3000/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productinfos),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        getAllProducts();
        setIsShowEditlModal(false);
      })
      .catch((error) => console.error);

    console.log("اطلاعات با موفقیت اپدیت شد");
  };

  return (
    <div className="cms-main">
      <table className=" cms-table">
        <thead>
          <tr>
            <th>عکس</th>
            <th>اسم</th>
            <th>قیمت</th>
            <th>موجودی</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.reverse().map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.img}
                  className="product-table-img"
                  alt={product.title}
                />
              </td>
              <td> {product.title}</td>
              <td>{product.price} تومان</td>
              <td>{product.count}</td>
              <td className="mobile-btn-groupe">
                <button
                  className="product-table-btn"
                  onClick={
                    () => {
                    setMainProduct(product);
                    setIsShowDetailModal(true);
                  }
                }
                >
                  جزئیات
                </button>
                <button
                  className="product-table-btn"
                  onClick={
                    () => {
                    setProductId(product.id);
                    setIsShowModal(true);
                  }
                }
                >
                  حذف
                </button>
                <button
                  className="product-table-btn"
                  onClick={
                    () => {
                    setProductId(product.id);
                    setIsShowEditlModal(true);
                    setProductNewColors(product.colors);
                    setProductNewCount(product.count);
                    setProductNewImg(product.img);
                    setProductNewPopularity(product.popularity);
                    setProductNewPrice(product.price);
                    setProductNewSale(product.sale);
                    setProductNewTitle(product.title);
                  }
                }
                >
                  ویرایش
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isShowModal && (
        <DeleteModal
        title={"ایا از حذف اطمینان دارید؟"}
          submitAction={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
        />
      )}

      {isShowDetailModal && (
        <DetailModal onHide={hideDetalModal}>
          <table className="cms-table">
            <thead>
              <tr className="details-heading">
                <th>محبوبیت</th>
                <th>فروش</th>
                <th>رنگ بندی</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {mainProduct.popularity}</td>
                <td>{mainProduct.sale.toLocaleString()} </td>
                <td>{mainProduct.colors} </td>
              </tr>
            </tbody>
          </table>
        </DetailModal>
      )}

      {isShowEditlModal && (
        <EditModal
          onClose={() => setIsShowEditlModal(false)}
          onSubmit={updataProductsInfos}
        >
          <>
            <div className="edit-products-form-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input
                type="text"
                placeholder="عنوان جدید را وارد کنید"
                className="edit-product-input"
                value={productNewTitle}
                onChange={(e) => setProductNewTitle(e.target.value)}
              />
            </div>
            <div className="edit-products-form-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input
                type="text"
                placeholder="قیمت جدید را وارد کنید"
                className="edit-product-input"
                value={productNewPrice}
                onChange={(e) => setProductNewPrice(e.target.value)}
              />
            </div>
            <div className="edit-products-form-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input
                type="text"
                placeholder="موجودی جدید را وارد کنید"
                className="edit-product-input"
                value={productNewCount}
                onChange={(e) => setProductNewCount(e.target.value)}
              />
            </div>
            <div className="edit-products-form-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input
                type="text"
                placeholder="ادرس کاور جدید را وارد کنید"
                className="edit-product-input"
                value={productNewImg}
                onChange={(e) => setProductNewImg(e.target.value)}
              />
            </div>
            <div className="edit-products-form-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input
                type="text"
                placeholder="محبوبیت جدید را وارد کنید"
                className="edit-product-input"
                value={productNewPopularity}
                onChange={(e) => setProductNewPopularity(e.target.value)}
              />
            </div>
            <div className="edit-products-form-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input
                type="text"
                placeholder="میزان فروش جدید را وارد کنید"
                className="edit-product-input"
                value={productNewSale}
                onChange={(e) => setProductNewSale(e.target.value)}
              />
            </div>
            <div className="edit-products-form-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input
                type="text"
                placeholder="تعداد رنگ بندی جدید را وارد کنید"
                className="edit-product-input"
                value={productNewColors}
                onChange={(e) => setProductNewColors(e.target.value)}
              />
            </div>
          </>
        </EditModal>
      )}
    </div>
  );
}

export default ProductsTable;
