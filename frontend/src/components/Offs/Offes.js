import { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from "../DeleteModal/DeleteModal";
import './Offes.css'
const Offs = () => {
    const [offs,setOffs]=useState([])
    const [isShowDeleteModal, setIsDeleteShowModal] = useState(false);
    const [isShowAccetOffModal, setIsShowAccetOffModal] = useState(false);
    const [isShowRejectOffModal, setIsShowRejectOffModal] = useState(false);
    const [offID, setOffID] = useState("");
    const [isActive, setIsActive] = useState(0);
    const getAllOffs = () => {
        fetch("http://localhost:3000/api/offs")
          .then((res) => res.json())
          .then((result) => {
            setOffs(result);
            console.log("orders:", result);
          })
          .catch((error) => console.log("orders:", error));
      };
      useEffect(()=>{
        getAllOffs()
      },[])

      const offAccept=(event)=>{
        event.preventDefault();
     
        
            fetch(`http://localhost:3000/api/offs/${offID}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((result) => {
                setIsDeleteShowModal(false)
                getAllOffs();
              })
              .catch((error) => console.log("orders:", error));
          };
           
          const updataStatusOff =(event)=>{
            event.preventDefault();
            fetch(`http://localhost:3000/api/offs/active-off/${offID}/${isActive}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsShowAccetOffModal(false)
        setIsShowRejectOffModal(false)
        getAllOffs();
      })
      .catch((error) => console.log("orders1:", error))
          }
      
    return ( 
        <>
        <ErrorBox msg="هیچ کد تخفیفی یافت نشد" />
        <table className="cms-table">
        <thead>
          <tr className="details-heading">
            <th>  کد تخفیف</th>
            <th> درصد تخفیف</th>
            <th> تاریخ ثبت</th>
            <th>  ثبت شده توسط</th>
            <th>  ساخته شده برای </th>
            <th>   </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {offs.map((off) => (
            <tr key={off.id}>
              <td> {off.code}</td>
              <td>{off.percent} </td>
              <td> {off.date}</td>
              <td>{off.adminID} </td>
              <td>{off.productID} </td>
             
              <td className="btn-groupe-mobile">
               
                <button
                  onClick={() => {
                    setIsDeleteShowModal(true)
                    setOffID(off.id)
                    
                  }}
                  className="product-table-btn"
                >
                  حذف
                </button>
               
                {
                  !off.isActive ? (
                    <button 
                    onClick={()=>{
                        setOffID(off.id)
                        setIsActive(1)
                        setIsShowAccetOffModal(true)
                    }}
                    className="product-table-btn"
                    >تایید</button>
                  ):
                  (
                    <button 
                    onClick={()=>{
                        setOffID(off.id)
                        setIsActive(0)
                        setIsShowRejectOffModal(true)
                        
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
      {
        isShowDeleteModal && (
            <DeleteModal 
            submitAction={offAccept}
            cancelAction={()=>setIsDeleteShowModal(false)}
            title={"آیا از حذف تخفیف مد نظر مطمعن هستید؟"} />
        )
      }{
        isShowAccetOffModal&&(
            <DeleteModal 
            submitAction={updataStatusOff}
            cancelAction={()=>setIsShowAccetOffModal(false)}
            title={"آیا از تایید تخفیف  مطمعن هستید؟"} />
        )
      }
      {
        isShowRejectOffModal && (
            <DeleteModal 
            submitAction={updataStatusOff}
            cancelAction={()=>setIsShowRejectOffModal(false)}
            title={"آیا از رد تخفیف مطمعن هستید؟"} />
        )
      }
        </>

     );
}
 
export default Offs;