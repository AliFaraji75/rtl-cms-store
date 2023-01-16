import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import './custom.css'
import './App.css'
import './cms.css'
import routes from './routes';
import { useRoutes } from 'react-router-dom';


function App() {
  const route =useRoutes(routes)
  return (
    <>
    <Sidebar/>
    <div className='main'>
       <Header />
        {route}
    </div>
    </>
  );
}

export default App;
