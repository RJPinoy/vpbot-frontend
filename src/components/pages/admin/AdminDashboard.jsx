import * as React from "react";
import AdminMainContent from "./AdminMainContent";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminDashboard = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabFromUrl = searchParams.get("tab") || "compte";
    const [activeTab, setActiveTab] = React.useState(tabFromUrl);
    const [menuOpen, setMenuOpen] = React.useState(false);

    React.useEffect(() => {
        setActiveTab(tabFromUrl);
    }, [tabFromUrl]);

    const handleTabChange = (tab) => {
        setSearchParams({ tab });
        setMenuOpen(false); // close menu on mobile after click
    };

    const tabs = [
        { key: "compte", label: "Mon compte" },
        { key: "users", label: "Utilisateurs" },
        { key: "chatbot", label: "Chatbot" },
    ];

    return (
        <div className="flex w-full h-[95dvh] overflow-hidden relative">
            {/* Sidebar (desktop) */}
            <nav className="hidden lg:flex flex-col w-1/5 h-full bg-[#1E1E1E] text-gray-200 py-4">
                <ul className="flex flex-col w-full h-full">
                    {tabs.map((tab) => (
                        <li
                            key={tab.key}
                            onClick={() => handleTabChange(tab.key)}
                            className={`w-full py-4 px-8 text-xl cursor-pointer transition duration-200 ease-in-out ${
                                activeTab === tab.key
                                    ? "bg-gray-700 font-bold border-t border-b border-l-8 border-gray-200"
                                    : "hover:bg-gray-700"
                            }`}
                        >
                            {tab.label}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Sidebar (mobile, slide-in) */}
            <div
                className={`fixed top-0 left-0 h-full w-2/3 max-w-[250px] bg-[#1E1E1E] text-gray-200 py-4 z-50 transform transition-transform duration-300 ease-in-out lg:hidden
                ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <ul className="flex flex-col w-full h-full">
                    <li
                        className={'w-full py-4 px-8 text-lg cursor-pointer transition duration-200 ease-in-out'}>
                        <a href="/dashboard" className="text-gray-200 hover:text-white">
                            <FontAwesomeIcon icon="fa-solid fa-house" />
                            <span className="ml-2 text-lg font-semibold">Accueil</span>
                        </a>
                    </li>
                    {tabs.map((tab) => (
                        <li
                            key={tab.key}
                            onClick={() => handleTabChange(tab.key)}
                            className={`w-full py-4 px-8 text-lg cursor-pointer transition duration-200 ease-in-out ${
                                activeTab === tab.key
                                    ? "bg-gray-700 font-bold border-t border-b border-l-8 border-gray-200"
                                    : "hover:bg-gray-700"
                            }`}
                        >
                            {tab.label}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Burger button (mobile) */}
            <button
                className="fixed top-1 left-2 z-50 p-2 bg-gray-200 rounded lg:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <FontAwesomeIcon icon={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} size="lg" />
            </button>

            {/* Main content */}
            <main className="flex-1 h-full p-8 bg-white text-black overflow-auto">
                <AdminMainContent content={activeTab} />
            </main>
        </div>
    );
};

export default AdminDashboard;