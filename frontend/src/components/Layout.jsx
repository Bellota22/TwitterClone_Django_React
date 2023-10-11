import { Outlet, Link } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import Sidebar from "./Sidebar";
import Search from "./Search";

function Layout() {
    return (
        <>
            <Toaster />
            <div className="flex justify-center" >
                <div className="shrink w-14 sm:w-14 md:w-64 lg:w-[350px] xl:w-[350px] " >
                    <Sidebar />
                </div>

                <div className="shrink w-[500px] pr-6 " >
                    <Outlet />
                </div>
                
                <div className="shrink w-0 sm:w-14 md:w-64 lg:w-[450px] xl:w-[450px]" >
                    <Search />
                </div>
            </div>
        </>
        
    )
}

export default Layout 