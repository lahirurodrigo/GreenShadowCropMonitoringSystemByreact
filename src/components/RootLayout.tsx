import { Outlet} from "react-router-dom";
import Sidebar from "./Sidebar.tsx";

const RootLayout = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar/>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <Outlet /> {/* Renders child routes like Dashboard */}
            </main>
        </div>
    );
};

export default RootLayout;