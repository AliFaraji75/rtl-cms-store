import './Sidebar.css'
import {AiOutlineHome} from 'react-icons/ai'
import {MdOutlineProductionQuantityLimits} from 'react-icons/md'
import {HiOutlineUsers} from 'react-icons/hi'
import {TfiComments} from 'react-icons/tfi'
import {SlHandbag} from 'react-icons/sl'
import {TbShoppingCartDiscount} from 'react-icons/tb'
import {  NavLink } from 'react-router-dom'
const Sidebar = () => {
    return ( 
        <div className="sidebar">
            <h1 className="sidebar-title">به داشبورد خود خوش امدید</h1>
            <ul className='sidebar-links'>
            
                    <NavLink to={'/'} className="home-icon">
                    <AiOutlineHome className='icon '/>
                       <span > صفحه اصلی</span>
                        </NavLink>
              
                    <NavLink to={'/products'}>
                        <MdOutlineProductionQuantityLimits className='icon' />
                        <span > محصولات</span>
                        </NavLink>
            
                    <NavLink to={'/users'}> 
                     <HiOutlineUsers className='icon' />
                      <span>کاربران</span>
                    </NavLink>
                
                    <NavLink to={'/comments'}>
                        <TfiComments  className='icon'/>
                        <span>  کامنت ها </span>
                       </NavLink>
              
                    <NavLink to={'/orders'}> 
                     <SlHandbag  className='icon'/>
                     <span>سفارشات</span>
                    </NavLink>
               
          
                    <NavLink to={'/offs'}>
                        <TbShoppingCartDiscount className='icon'/>
                        <span> تخفیف ها </span>
                        </NavLink>
             
            </ul>

            
        </div>
     );
}
 
export default Sidebar;


