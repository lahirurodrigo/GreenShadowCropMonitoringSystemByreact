import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-[#abf565] text-white h-screen p-6 shadow-lg">
            <h2 className="text-xl font-extrabold text-center mb-6">Green Shadow</h2>
            <nav>
                <ul className="space-y-3">
                    {[
                        { to: "/", label: "Home", icon: "bi-house" },
                        { to: "/users", label: "Users", icon: "bi-person" },
                        { to: "/fields", label: "Fields", icon: "bi-geo-alt" },
                    ].map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-2 rounded-lg text-white transition duration-300
                                    ${isActive ? "bg-[#28a745] font-bold shadow-md" : "hover:bg-[#32ff7e]"}`
                                }
                            >
                                <i className={`bi ${item.icon} text-white text-lg`}></i>
                                <span className="text-lg text-white">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
