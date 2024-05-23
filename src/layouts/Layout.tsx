import { Outlet } from 'react-router-dom';
import SidebarMain from '../pages/content/SidebarMain';
import Header from '../pages/content/Header';

const Layout: React.FC = () => {
    return (
        <div className="flex flex-1 min-h-screen">
            <aside className="z-10">
                <SidebarMain />
            </aside>
            <div className="flex flex-col w-full h-full">
                <Header />
                <main className="flex-grow p-5">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;
