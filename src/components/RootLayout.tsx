import { Outlet, NavLink } from "react-router-dom";

const RootLayout = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-[#abf565] text-white p-4">
                <h2 className="text-lg font-bold">Green Shadow</h2>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `block p-2 ${isActive ? "bg-[#28a745]" : "hover:bg-[#28a745]"}`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/users"
                                className={({ isActive }) =>
                                    `block p-2 ${isActive ? "bg-[#28a745]" : "hover:bg-[#28a745]"}`
                                }
                            >
                                Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/settings"
                                className={({ isActive }) =>
                                    `block p-2 ${isActive ? "bg-[#28a745]" : "hover:bg-[#28a745]"}`
                                }
                            >
                                Settings
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <Outlet /> {/* Renders child routes like Dashboard */}
            </main>
        </div>
    );
};

export default RootLayout;


