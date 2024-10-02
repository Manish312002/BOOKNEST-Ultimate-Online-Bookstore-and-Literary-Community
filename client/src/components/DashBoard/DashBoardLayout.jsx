import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";



export default function DashBoardLayout(){
    return(
        <>
            <div className="flex gap-4 flex-col lg:flex-row">
                <SideBar />
                <Outlet />
            </div>
        </>
    )
}