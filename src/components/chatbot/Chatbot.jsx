import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import Messages from './message/Messages';
import { sanitizeInput, initialMessage, parseMarkdown } from '../../utils';

const Chatbot = ({ onClose }) => {
    const publicChatbot = useSelector((state) => state.publicChatbotSlice);
    const [chat, setChat] = React.useState([]);
    const [chatbotLogo, setChatbotLogo] = React.useState();
    const [greetingMessage, setGreetingMessage] = React.useState('');
    const [promptPlaceholder, setPromptPlaceholder] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [colorFont1, setColorFont1] = React.useState('');
    const [colorPrincipal, setColorPrincipal] = React.useState('');

    React.useEffect(() => {
        if (publicChatbot) {
            setChat([initialMessage(publicChatbot.welcomeMessage)]);
            setChatbotLogo(publicChatbot.iconUrl);
            setGreetingMessage(publicChatbot.welcomeMessage);
            setPromptPlaceholder(publicChatbot.promptMessage);
            setColorFont1(publicChatbot.fontColor1);
            setColorPrincipal(publicChatbot.mainColor);
        }
    }, [publicChatbot]);

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
        if (!message.trim()) {
            console.warn('Cannot send empty messages.')
            return
        }

        console.log('Message sent:', sanitizeInput(parseMarkdown(message)));
        setMessage('');
        setChat([...chat, {
            role: 'user',
            content: [
                {
                    text: {
                        value: message
                    }
                }
            ]
        }])

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleResetChat = () => {
        console.log("Resetting chat...");
        setChat([initialMessage(publicChatbot.welcomeMessage)]);
    }

    return (
        <div className="w-full h-full bg-gray-100 flex flex-col">
            {/* Header */}
            <div className="w-full flex justify-between items-center px-4 py-2 border-b border-gray-300 shadow-md" style={{backgroundColor: colorPrincipal}}>
                <div className="flex items-center gap-2">
                    <img className="w-10 h-10 rounded-full" src={chatbotLogo} alt="Chatbot logo" />
                    <h2 className="text-white text-xl font-bold" style={{color: colorFont1}}>{publicChatbot.name}</h2>
                </div>

                <div className="flex gap-2">
                    <FontAwesomeIcon 
                        icon={'fa-solid fa-eraser'} 
                        size="lg" 
                        className="text-white cursor-pointer hover:text-orange-400 transition-colors duration-200"
                        style={{color: colorFont1}} 
                        onClick={handleResetChat}
                    />
                    <FontAwesomeIcon
                        icon={'fa-solid fa-xmark'}
                        size="xl"
                        className="text-white cursor-pointer hover:text-red-400 transition-colors duration-200"
                        style={{color: colorFont1}}
                        onClick={onClose}
                    />
                </div>
            </div>

            {/* Chat content */}
            <div className="flex-1 w-full overflow-y-auto p-4">
                <Messages chat={chat} fontColor2={publicChatbot.fontColor2} secondaryColor={publicChatbot.secondaryColor} />
            </div>

            {/* Footer input */}
            <div className="border-t border-gray-300 px-4 py-3">
                <form onSubmit={handleSubmit} className="flex items-end gap-2">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        placeholder={promptPlaceholder}
                        rows={1}
                        className="w-full max-h-[7rem] text-black px-4 py-2 bg-gray-200 border rounded-md resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#306285] text-white rounded-md cursor-pointer hover:bg-[#1E3E55] transition duration-200 ease-in-out"
                    >
                        Envoyer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;