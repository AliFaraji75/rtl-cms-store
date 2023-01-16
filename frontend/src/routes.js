import Products from './components/Products/Product';
import Users from './components/Users/Users'
import Comments from './components/Comments/Comments'
import Orders from './components/Orders/Orders'
import Offs from './components/Offs/Offes'
import MainPage from './components/MainPage/MainPage'

const routes =[
    { path:'/' ,element:<MainPage/>},
    { path:'/products' ,element:<Products/>},
    {path:'/users', element:<Users/>},
    { path:'/comments', element:<Comments/>},
    { path:'/orders' ,element:<Orders />},
    {path:'/offs', element:<Offs />}
]
export default routes;