import { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import DetailModal from "../DetailModal/DetailModal";
import "./Users.css";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const[isShowDetailModal,setIsShowDetailModal]=useState(false)
  const [userID, setUserID] = useState("");
  const [mainUserInfos,setMainUserInfos]=useState('')
  const [updataContent, setUpdataContent] = useState({
    firsname: "sdsd",
    lastname: "",
    username: "",
    password: "",
    phone: "",
    city: "",
    email: "",
    address: "",
    score: "",
    buy: "",
  });
  const getUsers = () => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log("data:222", data);
        console.log("c", updataContent);
      })
      .catch((error) => console.log("error msg:", error));
  };
  useEffect(() => {
    console.log("a", updataContent.firsname);
    getUsers();
    console.log("b", updataContent.firsname);
  }, []);

  const deleteUserAction = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3000/api/users/${userID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsShowDeleteModal(false);
        getUsers();
      })
      .catch((error) => console.log("error msg:", error));
  };

  const updataUserInfos = (event) => {
    event.preventDefault();
    console.log("updata");
    fetch(`http://localhost:3000/api/users/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firsname:updataContent.firsname ,
            lastname: updataContent.lastname,
            username:updataContent.username,
            password: updataContent.password,
            phone: updataContent.phone,
            city: updataContent.city,
            email: updataContent.email,
            address: updataContent.address,
            score: updataContent.score,
            buy: updataContent.buy,
          }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
         getUsers();
         setIsShowEditModal(false)
        })
        .catch((error) => console.error);
  };
  return (
    <>
      <ErrorBox msg="هیچ کاربری یافت نشد" />
      <div className=" mobile-table">
      <table className="cms-table">
        <thead>
          <tr>
            <th> نام و نام خانوادگی</th>
            <th>یوزرنیم</th>
            <th>رمز عبور</th>
            <th> شماره تماس</th>
            <th>ایمیل</th>
            <th></th>
          </tr>
        </thead>
        <tbody >
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firsname} {user.lastname}
              </td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>

              <td className="btn-groupe-mobile">
                <button
                  onClick={() => {
                    setIsShowDeleteModal(true);
                    setUserID(user.id);
                  }}
                  className="comment-table-btn"
                >
                  حذف
                </button>
                <button 
                 onClick={()=>{
                    setIsShowDetailModal(true)
                    setMainUserInfos(user)
                }}
                className="comment-table-btn">
                    جزئیات</button>
                <button
                  onClick={() => {
                    setIsShowEditModal(true);
                    setUserID(user.id)
                    setUpdataContent({
                      firsname: user.firsname,
                      lastname: user.lastname,
                      username: user.username,
                      password: user.password,
                      phone: user.phone,
                      city: user.city,
                      email: user.email,
                      address: user.address,
                      score: user.score,
                      buy: user.buy,
                    });
                    console.log(updataContent.firsname);
                  }}
                  className="comment-table-btn"
                >
                  ویرایش
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       </div>
      {isShowDeleteModal && (
        <DeleteModal
          submitAction={deleteUserAction}
          cancelAction={() => setIsShowDeleteModal(false)}
          title={"آیا ازحذف کاربر مد نظر مطمعن هستید؟"}
        />
      )}

      {isShowEditModal && (
        <EditModal
          onClose={() => setIsShowEditModal(false)}
          onSubmit={updataUserInfos}
        >
          <>
            <div className="edit-products-form-group">
              <input
                value={updataContent.firsname}
                name="firsname"
                onChange={(e)=>setUpdataContent({...updataContent,[e.target.name]:e.target.value})}
                className="edit-product-input"
                type="text"
                placeholder="نام کاربری جدید را وارد نمایید"
              />
            </div>
            <div className="edit-products-form-group">
              <input
                name="lastname"
                onChange={(e)=>setUpdataContent({...updataContent,[e.target.name]:e.target.value})}
                value={updataContent.lastname}
                className="edit-product-input"
                type="text"
                placeholder="نام خانوادگی جدید را وارد نمایید"
              />
            </div>
            <div className="edit-products-form-group">
              <input
                name="username"
                onChange={(e)=>setUpdataContent({...updataContent,[e.target.name]:e.target.value})}
                value={updataContent.username}
                className="edit-product-input"
                type="text"
                placeholder="یوزرنیم جدید را وارد نمایید"
              />
            </div>
            <div className="edit-products-form-group">
              <input
                name="password"
                onChange={(e)=>setUpdataContent({...updataContent,[e.target.name]:e.target.value})}
                value={updataContent.password}
                className="edit-product-input"
                type="text"
                placeholder="پسورد جدید را وارد نمایید"
              />
            </div>
            <div className="edit-products-form-group">
              <input
                name="phone"
                onChange={(e)=>setUpdataContent({...updataContent,[e.target.name]:e.target.value})}
                value={updataContent.phone}
                className="edit-product-input"
                type="text"
                placeholder="شماره تماس جدید را وارد نمایید"
              />
            </div>
            <div className="edit-products-form-group">
              <input
                name="city"
                onChange={(e)=>setUpdataContent({...updataContent,[e.target.name]:e.target.value})}
                value={updataContent.city}
                className="edit-product-input"
                type="text"
                placeholder="شهر جدید را وارد نمایید"
              />
            </div>
            <div className="edit-products-form-group">
              <input
                name="email"
                onChange={(e)=>setUpdataContent({...updataContent,[e.target.name]:e.target.value})}
                value={updataContent.email}
                className="edit-product-input"
                type="text"
                placeholder="ایمیل جدید را وارد نمایید"
              />
            </div>
            <div className="edit-products-form-group">
                <textarea  name="address"
                onChange={(e)=>setUpdataContent({...updataContent,[e.target.name]:e.target.value})}
                value={updataContent.address}
                className="edit-product-input"
                placeholder="آدرس جدید را وارد نمایید">
                </textarea>
             
            </div>
            <div className="edit-products-form-group">
              <input
                name="score"
                onChange={(e)=>setUpdataContent({...updataContent,[e.target.name]:e.target.value})}
                value={updataContent.score}
                className="edit-product-input"
                type="text"
                placeholder="امتیاز جدید را وارد نمایید"
              />
            </div>
            <div className="edit-products-form-group">
              <input
                name="buy"
                onChange={(e)=>setUpdataContent({...updataContent,[e.target.name]:e.target.value})}
                value={updataContent.buy}
                className="edit-product-input"
                type="text"
                placeholder="میزان خرید جدید را وارد نمایید"
              />
            </div>
          </>
        </EditModal>
      )}
      {
        isShowDetailModal&&
        <DetailModal onHide={()=>setIsShowDetailModal(false)}>
            
            <table className="cms-table">
            <thead>
              <tr className="details-heading">
                <th>شهر</th>
                <th>ادرس</th>
                <th> امتیاز</th>
                <th> خرید</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {mainUserInfos.city}</td>
                <td>{mainUserInfos.address} </td>
                <td>{mainUserInfos.score} </td>
                <td>{mainUserInfos.buy.toLocaleString()} </td>
              </tr>
            </tbody>
          </table>

        </DetailModal>
      }
    </>
  );
};

export default Users;
