import { Outlet } from "react-router-dom";

export default function MainLayout() {

    return (

        <div
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden"
            }}
        >
            <Outlet />
        </div>

    );

}