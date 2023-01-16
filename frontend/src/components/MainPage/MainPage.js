import "./MainPage.css";
import { useState,useEffect } from "react";
import {Link} from 'react-router-dom'
const MainPage = () => {
    const [allProducts, setAllProucts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        getAllProducts();
        getUsers();
        getAllOrders();
        getAllComments();
      }, []);
    const totalSale= orders.reduce((total,order)=> total+order.sale_count,0)
 
      const getAllProducts = () => {
        fetch("http://localhost:3000/api/products")
          .then((res) => res.json())
          .then((products) => console.log(setAllProucts(products)));
      };
      const getUsers = () => {
        fetch("http://localhost:3000/api/users")
          .then((res) => res.json())
          .then((data) => {
            setUsers(data);
          })
          .catch((error) => console.log("error msg:", error));
      };
      const getAllOrders = () => {
        fetch("http://localhost:3000/api/orders")
          .then((res) => res.json())
          .then((result) => {
            setOrders(result);
            console.log("orders:", result);
          })
          .catch((error) => console.log("orders:", error));
      };
      const getAllComments = () => {
        fetch("http://localhost:3000/api/comments")
          .then((res) => res.json())
          .then((data) => {
            setAllComments(data);
          })
          .catch((error) => console.log("error msg:", error));
      };
  return (
    <main>
      <div className="parent">
        <Link to={"/users"} className="number-of-users commn">
          <h1>تعداد کاربران</h1>
          <div> {users.length}</div>
        </Link>
        <Link to={"/products"} className="number-of-products commn ">
          <h1>تعداد محصولات</h1>
          <div> {allProducts.length}</div>
        </Link>

        <Link to={"/orders"} className="number-of-orders commn">
          <h1>تعداد سفارشات</h1>
          <div> {orders.length}</div>
        </Link> 
        <Link to={"/comments"} className="number-of-comments commn">
          <h1>تعداد کامنت ها</h1>
          <div> {allComments.length}</div>
        </Link>
      </div>
      <div className="sale">
      <div className="number-of-sale">
          <h1>  میزان فروش</h1>
          <div> {totalSale.toLocaleString()} تومان</div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
