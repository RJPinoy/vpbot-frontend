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

            <div className="flex flex-row border rounded-md p-4 w-full">
                <ul className="flex flex-col justify-start items-start border-gray-400 border-r w-1/5 overflow-hidden">
                    { tabs.map((tab) => {
                        return (
                            <li 
                                key={tab.key} 
                                onClick={ () => handleTabChange(tab.key) }
                                className={`w-full px-4 py-2 cursor-pointer font-bold transition-all duration-200 ease-in-out
                                    ${activeTab === tab.key ? "text-xl bg-gray-200 pl-8" : "text-gray-700 hover:bg-gray-400"}`}
                            >
                                {tab.label}
                            </li>
                        );
                    })}
                </ul>

                <div className="flex flex-row flex-1 ml-4 gap-4">
                    <div className="flex flex-1 flex-col">
                        <ChatbotContentWrapper tab={ activeTab } />
                    </div>
                    <div className="w-1/2 flex">
                        <ChatbotPlayground />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chatbot;