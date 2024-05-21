import { Outlet } from 'react-router-dom';
import SaidbarMain from '../pages/content/SidebarMain';
import Header from '../pages/content/Header';

export default function Layout(){
    

    return(
        <div className="flex flex-1">
            <div className="min-h-screen items-center justify-center z-10  ">
                <SaidbarMain />
            </div>
            <div className="w-full h-full">
                <Header/>
                <Outlet />
            </div>
        </div>
    )
}
