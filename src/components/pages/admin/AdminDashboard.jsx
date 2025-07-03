import * as React from "react";
import AdminMainContent from "./AdminMainContent";
import { useSearchParams } from "react-router-dom";

const AdminDashboard = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const tabFromUrl = searchParams.get("tab") || "compte";
    const [activeTab, setActiveTab] = React.useState(tabFromUrl);

    React.useEffect(() => {
        setActiveTab(tabFromUrl);
    }, [tabFromUrl]);

    const handleTabChange = (tab) => {
        setSearchParams({ tab });
    };

    const tabs = [
        { key: "compte", label: "Mon compte" },
        { key: "users", label: "Utilisateurs" },
        { key: "chatbot", label: "Chatbot" },
    ];

    return (
        <div className="flex justify-start items-center flex-row w-full h-[95dvh] overflow-hidden">
            <nav className="dashboard flex justify-start items-center flex-col w-1/5 h-[95dvh] bg-[#1E1E1E] text-gray-200 py-4">
                <ul className="flex justify-start items-start flex-col w-full h-full">
                    {tabs.map((tab) => (
                        <li
                            key={tab.key}
                            onClick={() => handleTabChange(tab.key)}
                            className={`w-full py-4 px-8 text-xl cursor-pointer transition duration-200 ease-in-out ${
                                activeTab === tab.key ? 
                                    "bg-gray-700 font-bold border-t border-b border-l-8 border-gray-200"
                                    : "hover:bg-gray-700"
                            }`}
                        >
                            {tab.label}
                        </li>
                    ))}
                </ul>
            </nav>

            <main className="flex justify-start items-start flex-col flex-1 h-[95dvh] p-8 bg-white text-black">
                <AdminMainContent content={ activeTab } />
            </main>
        </div>
    );
}

export default AdminDashboard;