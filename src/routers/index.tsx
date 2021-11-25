import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SideBar from '@containers/sidebar'
import Container from '@mui/material/Container';
import MainBar from '@containers/mainbar';
import Master from '@pages/master/index'


const Router = () => {
    const result = (
        <BrowserRouter>
            <SideBar/>
            <Routes>
                <Route caseSensitive={true} path="/" element={<MainBar/>}> </Route>
                
                <Route path="master" element={<Master/>}> 
                    
                    <Route path="employee" element={<MainBar/>}> </Route>

                </Route>
            </Routes>
        </BrowserRouter>
    )
    return result;
}

export default Router;
