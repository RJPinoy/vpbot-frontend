import * as React from 'react';
import ChatbotContentWrapper from './content/ChatbotContentWrapper';
import ChatbotPlayground from './content/playground/ChatbotPlayground';

const Chatbot = () => {
    const [activeTab, setActiveTab] = React.useState("general");

    const tabs = [
        { key: "general", label: "General" },
        { key: "apparances", label: "Apparances" },
        { key: "position", label: "Position" },
        { key: "messages", label: "Messages" },
        { key: "appareils", label: "Appareils" },
    ];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    return (
        <>
            <h1 className="text-4xl font-bold w-full mb-8">Chatbot :</h1>

            <p className='mb-4'>Configurer les paramètres du chatbot.</p>

            <div className="flex flex-col md:flex-row border rounded-md p-4 w-full">
                {/* Sidebar Tabs */}
                <ul className="flex md:flex-col flex-row overflow-auto border-gray-400 border-b md:border-b-0 md:border-r w-full md:w-1/5">
                    {tabs.map((tab) => (
                        <li
                            key={tab.key}
                            onClick={() => handleTabChange(tab.key)}
                            className={`cursor-pointer px-4 py-2 font-bold whitespace-nowrap
                                ${activeTab === tab.key 
                                    ? "text-xl bg-gray-200 md:pl-8" 
                                    : "text-gray-700 hover:bg-gray-400"
                                }`}
                        >
                            {tab.label}
                        </li>
                    ))}
                </ul>

                {/* Main content & playground container */}
                <div className="flex flex-col md:flex-row flex-1 ml-0 md:ml-4 mt-4 md:mt-0 gap-4">
                    <div className="flex flex-col flex-1">
                        <ChatbotContentWrapper tab={activeTab} />
                    </div>
                    <div className="w-full md:w-1/2 flex">
                        <ChatbotPlayground />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chatbot;