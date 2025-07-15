import * as React from 'react';
import Chatbot from './Chatbot';

const ChatbotToggler = () => {
    const [chatbotLogo, setChatbotLogo] = React.useState('/assets/images/chatbot/chatbot.gif');
    const [renderChatbot, setRenderChatbot] = React.useState(false);

    return (
        <div className="fixed bottom-4 right-4 flex items-end gap-2">
            {/* Chatbot container */}
            <div className={`transition-all duration-300 rounded-xl overflow-hidden ${renderChatbot ? 'w-[350px] h-[500px]' : 'w-0 h-0'} `}>
                {renderChatbot && <Chatbot onClose={() => setRenderChatbot(false)} />}
            </div>

            {/* Chatbot toggle button */}
            {!renderChatbot && (
                <div
                    onClick={() => setRenderChatbot(true)}
                    className={`w-[50px] h-[50px] bg-[url(${chatbotLogo})] bg-contain bg-center bg-no-repeat border border-black rounded-full cursor-pointer transition-all duration-200 hover:w-[65px] hover:h-[65px] hover:shadow-lg`}
                ></div>
            )}
        </div>
    );
};

export default ChatbotToggler;