import './ErrorBox.css'
const ErrorBox = ({msg}) => {
    return (  
        <div className="error-box-msg">
          <h1>{msg} </h1>
        </div>
    );
}
 
export default ErrorBox;