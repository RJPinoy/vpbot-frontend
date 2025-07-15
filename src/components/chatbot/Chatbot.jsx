import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Chatbot = ({ onClose }) => {
    const [chatbotLogo, setChatbotLogo] = React.useState('/assets/images/chatbot/chatbot.gif');
    const [message, setMessage] = React.useState('');

    const textareaRef = React.useRef(null);

    const handleChange = (e) => {
        setMessage(e.target.value);

        // Auto-grow height up to max-height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight + 2)}px`;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        console.log('Message sent:', message);
        setMessage('');

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    return (
        <div className="w-full h-full bg-gray-100 flex flex-col">
            {/* Header */}
            <div className="w-full bg-[#306285] flex justify-between items-center px-4 py-2 border-b border-gray-300 shadow-md">
                <div className="flex items-center gap-2">
                    <img className="w-10 h-10 rounded-full" src={chatbotLogo} alt="Chatbot logo" />
                    <h2 className="text-white text-xl font-bold">VPilot</h2>
                </div>

                <div className="flex gap-2">
                    <FontAwesomeIcon icon={'fa-solid fa-eraser'} size="lg" className="text-white cursor-pointer hover:text-orange-400 transition-colors duration-200" />
                    <FontAwesomeIcon
                        icon={'fa-solid fa-xmark'}
                        size="xl"
                        className="text-white cursor-pointer hover:text-red-400 transition-colors duration-200"
                        onClick={onClose}
                    />
                </div>
            </div>

            {/* Chat content */}
            <div className="flex-1 w-full overflow-y-auto p-4"></div>

            {/* Footer input */}
            <div className="border-t border-gray-300 bg-gray-200 px-4 py-3">
                <form onSubmit={handleSubmit} className="flex items-end gap-2">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleChange}
                        placeholder="Posez-moi vos questions !"
                        rows={1}
                        className="w-full max-h-[7rem] text-black px-4 py-2 border rounded-md resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#306285] text-white rounded-md hover:bg-[#1E3E55] transition duration-200 ease-in-out"
                    >
                        Envoyer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;