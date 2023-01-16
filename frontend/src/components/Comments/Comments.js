import { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import "./Comments.css";
import DetailModal from "../DetailModal/DetailModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
const Comments = () => {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetail,setIsShowDetail]=useState(false)
  const [isShowDeleteModal,setIsShowDeleteModal]=useState(false)
  const [isShowEditModal,setIsShowEditModal]=useState(false)
  const [isAcceptCommentModal,setIsAcceptCommentModal]=useState(false)
  const[mainComment,setMainComment]=useState('')
  const[commentID,setCommentID]=useState('')
  const [editBodyComment,setEditBodyComment]=useState('')
  const [isRejectCommentModal,setIsRejectCommentModal]=useState(false)
  useEffect(() => {
    getAllComments();
  }, []);

  const hideDetailModal = () => {
    setIsShowDetail(false);
  };
  const getAllComments = () => {
    fetch("http://localhost:3000/api/comments")
      .then((res) => res.json())
      .then((data) => {
        setAllComments(data);
        console.log("data:", data);
      })
      .catch((error) => console.log("error msg:", error));
  };

   const submitAction =()=>{
    fetch(`http://localhost:3000/api/comments/${commentID}`,
    {
      method:'DELETE'
    })
    .then(res=>res.json())
    .then(result=>{
      setIsShowDeleteModal(false)
      getAllComments()
    })
    .catch(error=>console.log("error msg",error))
    
   }
   const cancelAction =()=>{
    console.log("no")
    setIsShowDeleteModal(false)
   }
  
   const updataCommentBody =(event)=>{
    event.preventDefault();
    fetch(`http://localhost:3000/api/comments/${commentID}`,{
      method:'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body:editBodyComment
      })
    })
    .then(res=>res.json())
    .then(result=>{
      setIsShowEditModal(false);
      getAllComments()
    })
    .catch(error=>console.log("error msg:",error))
   }

   const acceptComment =(event)=>{
    event.preventDefault();
    fetch(`http://localhost:3000/api/comments/accept/${commentID}`,{
      method:'POST'
    }).then(res=>res.json())
    .then(result=>{
      setIsAcceptCommentModal(false);
      getAllComments();
    })
    .catch(error=>console.log("error msg",error))
   }

   const rejectComment =(event)=>{
     event.preventDefault();
     fetch(`http://localhost:3000/api/comments/reject/${commentID}`,{
      method:'POST'
    }).then(res=>res.json())
    .then(result=>{
      setIsRejectCommentModal(false);
      getAllComments();
    })
    .catch(error=>console.log("error msg",error))

   }
  return (
    <div className="cms-main">
      <ErrorBox msg="هیچ کامنتی یافت نشد" />
       <div >
      <table className="cms-table">
        <thead>
          <tr>
            <th>اسم کاربر</th>
            <th>محصول</th>
            <th>کامنت</th>
            <th> تاریخ</th>
            <th>ساعت</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allComments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.userID}</td>
              <td>{comment.productID}</td>
              <td>
                <button className="comment-table-btn"
                 onClick={()=>{
                  setMainComment(comment.body)
                  setIsShowDetail(true)
                  }
                  }
                  >دیدن</button>
              </td>
              <td> {comment.date}</td>
              <td> {comment.hour}</td>
              <td className="btn-groupe-mobile">
              <button className="comment-table-btn" 
                onClick={()=>{
                  setIsShowDeleteModal(true)
                  setCommentID(comment.id)
                  }
                  }>حذف</button>
               
                <button className="comment-table-btn" onClick={()=>{
                  setIsShowEditModal(true)
                  setEditBodyComment(comment.body)
                  setCommentID(comment.id)
                }
                }>ویرایش</button>
                <button className="comment-table-btn">پاسخ</button>
                
                {
                  !comment.isAccept ? (
                    <button className="comment-table-btn"
                    onClick={()=>{
                      setIsAcceptCommentModal(true)
                      setCommentID(comment.id)
                    }}
                    >
                      تایید
                    </button>
                  ):(
                    <button className="comment-table-btn-reject"
                    onClick={()=>{
                      setIsRejectCommentModal(true)
                      setCommentID(comment.id)
                    }}
                    >
                      ریجکت
                    </button>
                  )
                }
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {
        isShowDetail && 
        <DetailModal onHide={hideDetailModal} >
          <div>{mainComment}</div>
          <button onClick={hideDetailModal} className="comment-detail-table-btn">بستن</button>
        </DetailModal>
      }
      {
        isShowDeleteModal && 
        <DeleteModal 
        title={"ایا از حذف اطمینان دارید؟"}
        submitAction={submitAction} cancelAction={cancelAction}/>
      }
      {
        isShowEditModal && 
        <EditModal onClose={()=>setIsShowEditModal(false)}  onSubmit={updataCommentBody}>
          <textarea 
          className="edit-box-comment"
          value={editBodyComment} 
          onChange={(e)=>setEditBodyComment(e.target.value)}>
          </textarea>
       
        </EditModal>
      }
      {
        isAcceptCommentModal&& 
        <DeleteModal  
        title={"ایا از تایید کامنت اطمینان دارید؟"}
        submitAction={acceptComment}
         cancelAction={()=>setIsAcceptCommentModal(false)} />
      }
       {
        isRejectCommentModal&& 
        <DeleteModal  
        title={"ایا از رد کامنت اطمینان دارید؟"}
        submitAction={rejectComment}
         cancelAction={()=>setIsRejectCommentModal(false)} />
      }
    </div>
  );
};

export default Comments;
