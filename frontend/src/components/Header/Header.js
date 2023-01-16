
import { CiBellOn } from "react-icons/ci";
import { BsBrightnessHigh } from "react-icons/bs";
import "./Header.css";
const Header = () => {
  return (
    <div className="main-header">
      <div className="right-header-section">
        <img className="profile-img" src="./img/1.jpg" alt="" />
        <div className="user-info">
         <h1> علی فرجی</h1>
        <h3>توسعه دهنده فرانت اند</h3>

        </div>
      </div>
      <div className="left-header-section">
        <div className="serach-box">
          <input placeholder="جستوجو کنید..." />
          <button>جست و جو</button>
        </div>
        <button className="icon">
          <CiBellOn />
        </button>
        <button className="icon">
          <BsBrightnessHigh />
        </button>
      </div>
    </div>
  );
};

export default Header;
