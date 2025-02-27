import { Outlet} from "react-router-dom";
import Sidebar from "./Sidebar.tsx";

const RootLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar/>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto h-screen scrollbar-hide">
                <Outlet /> {/* Renders child routes */}
            </main>
        </div>
    );
};

export default RootLayout;