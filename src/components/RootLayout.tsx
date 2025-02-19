import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-lg font-bold">Dashboard</h2>
                <nav>
                    <ul>
                        <li><a href="/" className="block p-2 hover:bg-gray-700">Home</a></li>
                        <li><a href="/settings" className="block p-2 hover:bg-gray-700">Settings</a></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <Outlet /> {/* This renders the child routes, like Dashboard */}
            </main>
        </div>
    );
};

export default RootLayout;

