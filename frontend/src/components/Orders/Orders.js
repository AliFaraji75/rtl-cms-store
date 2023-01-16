import ErrorBox from "../ErrorBox/ErrorBox";
import { useEffect, useState } from "react";
import DetailModal from "../DetailModal/DetailModal";
import DeleteModal from "../DeleteModal/DeleteModal";

import "./Order.css";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [isShowDeleteModal, setIsDeleteShowModal] = useState(false);
  const [isShowEditlModal, setIsShowEditlModal] = useState(false);
  const [isShowRejectEditModal, setIsShowRejectEditModal] = useState(false);
  const [orderID, setOrderID] = useState("");
  const [isActive, setIsActive] = useState(0);
  const [mainOrderInfos, setMainOrderInfos] = useState("");
  const getAllOrders = () => {
    fetch("http://localhost:3000/api/orders")
      .then((res) => res.json())
      .then((result) => {
        setOrders(result);
        console.log("orders:", result);
      })
      .catch((error) => console.log("orders:", error));
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  const deleteOrder = () => {
    fetch(`http://localhost:3000/api/orders/${orderID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsDeleteShowModal(false);
        getAllOrders();
      })
      .catch((error) => console.log("orders:", error));
  };

  const updataOrder =(event)=>{
    event.preventDefault();
    console.log("orderid ,isaccept",mainOrderInfos.id,mainOrderInfos.isActive)
    fetch(`http://localhost:3000/api/orders/active-order/${orderID}/${isActive}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsShowEditlModal(false);
        setIsShowRejectEditModal(false)
        getAllOrders();
      })
      .catch((error) => console.log("orders1:", error));
  }
  return (
    <>
      <ErrorBox msg="هیچ سفارشی یافت نشد" />

      <table className="cms-table">
        <thead>
          <tr className="details-heading">
            <th> نام محصول</th>
            <th>نام خریدار</th>
            <th> تاریخ سفارش</th>
            <th> ساعت سفارش</th>
            <th> مبلغ کل </th>
            <th> تخفیف اعمال شده</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td> {order.productID}</td>
              <td>{order.userID} </td>
              <td> {order.date}</td>
              <td>{order.hour} </td>
              <td>{order.sale_count} </td>
              <td>{order.off} </td>
              <td className="btn-groupe-mobile">
                <button
                  className="product-table-btn"
                  onClick={() => {
                    setMainOrderInfos(order);
                    setIsShowDetailModal(true);
                  }}
                >
                  جزییات
                </button>
                <button
                  onClick={() => {
                    setIsDeleteShowModal(true);
                    setOrderID(order.id);
                  }}
                  className="product-table-btn"
                >
                  حذف
                </button>
               
                {
                  !order.isActive ? (
                    <button 
                    onClick={()=>{
                      setIsShowEditlModal(true)
                      setMainOrderInfos(order)
                      setOrderID(order.id)
                      setIsActive(1)
                    }}
                    className="product-table-btn"
                    >تایید</button>
                  ):
                  (
                    <button 
                    onClick={()=>{
                      setIsShowRejectEditModal(true)
                      setMainOrderInfos(order)
                      setOrderID(order.id)
                      setIsActive(0)
                    }}
                    className="order-table-btn-reject"
                    >رد کردن</button>
                  )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isShowDetailModal && (
        <DetailModal
          onHide={() => {
            setIsShowDetailModal(false);
            console.log("jk");
          }}
        >
          <table className="cms-table">
            <thead>
              <tr className="details-heading">
                <th>قیمت تکی محصول</th>
                <th>محبوبیت</th>
                <th> تعداد محصول</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {mainOrderInfos.sale}</td>
                <td> {mainOrderInfos.popularity}</td>
                <td>{mainOrderInfos.count} </td>
              </tr>
            </tbody>
          </table>
        </DetailModal>
      )}
      {isShowDeleteModal && (
        <DeleteModal
          submitAction={deleteOrder}
          cancelAction={()=>setIsDeleteShowModal(false)}
          title={"ایا از حذف این سفارش مطمعن هستید؟"}
        />
      )}
      {
        isShowEditlModal && (
          <DeleteModal 
          cancelAction={()=>setIsShowEditlModal(false)}
          submitAction={updataOrder}
          title={"ایا از تایید این سفارش مطمعن هستید؟"}/>
        )
      }
      {
        isShowRejectEditModal&&(
          <DeleteModal 
          cancelAction={()=>setIsShowRejectEditModal(false)}
          submitAction={updataOrder}
          title={"ایا از رد کردن این سفارش مطمعن هستید؟"}/>
        )
      }
    </>
  );
};

export default Orders;
