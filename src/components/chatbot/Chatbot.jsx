import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import Messages from './message/Messages';
import { sanitizeInput, initialMessage, fetchFailed, parseMarkdown } from '../../utils';
import { messages, pollRun } from '../../api/chatbot/openai/route';
import { getPublicChatbot } from '../../api/chatbot/public/route';
import { setPublicChatbot } from '../../stores/slices/publicChatbotSlice';

const Chatbot = ({ onClose }) => {
    const publicChatbot = useSelector((state) => state.publicChatbotSlice);
    const [chat, setChat] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const [storedData, setStoredData] = React.useState(JSON.parse(localStorage.getItem('extranet-threadIds')) || {});
    const [threadId, setThreadId] = React.useState(JSON.parse(localStorage.getItem('extranet-threadIds'))?.public?.threadId || '');
    const [isTyping, setIsTyping] = React.useState(false);
    const didRun = React.useRef(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;
        
        setChat([initialMessage(publicChatbot.welcomeMessage)]);

        const fetchPublicChatbot = async () => {
            try {
                const response = await getPublicChatbot();
                dispatch(setPublicChatbot(response));
            } catch (error) {
                console.error("Error Fetching public chatbot: ", error);
            }
        }

        const fetchMessages = async () => {
            console.log(threadId);
            try {
                setIsTyping(true);
                const data = await messages('list', { 
                    threadId, 
                    type: 'public' 
                });
                const sortedMessages = [...data.data].sort((a, b) => a.created_at - b.created_at);
                setChat(prev => [...prev, ...sortedMessages]);
            } catch (error) {
                console.error('Error fetching messages.', error);
                setChat(prev => [...prev, fetchFailed])
            } finally {
                setIsTyping(false);
            }
        };

        if (threadId) {
            fetchMessages();
        }
        fetchPublicChatbot();
    }, []);

    const textareaRef = React.useRef(null);

    const handleChange = (e) => {
        setMessage(e.target.value);

        // Auto-grow height up to max-height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight + 2)}px`;
        }
    };

    const pollUntilComplete = async (threadId, runId) => {
        const data = await pollRun(threadId, runId, 'public');
        
        if (data.status === 'completed') {
            console.log('Run completed:', data.messages);
            setChat(prev => [...prev, data.messages.data[0]]);
            setIsTyping(false);
        } else if (data.status === 'in_progress' || data.status === 'queued') {
            console.log('Run in progress, polling again...');
            setTimeout(() => pollUntilComplete(threadId, runId), 1000);
        } else {
            console.warn('Run ended with unexpected status:', data.status);
            setChat(prev => [...prev, fetchFailed]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) {
            console.warn('Cannot send empty messages.')
            return
        }

        console.log('Message sent:', sanitizeInput(parseMarkdown(message)));
        setMessage('');
        setChat(prev => [...prev, {
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

        try {
            setIsTyping(true);
            const response = await messages('send', {
                threadId: threadId,
                message: message,
                assistantId: publicChatbot.assistantId,
                type: 'public'
            });

            if (response.success) {
                const updatedData = { ...storedData, public: { threadId: response.thread_id } };
                setThreadId(response.thread_id);
                setStoredData(updatedData);
                localStorage.setItem('extranet-threadIds', JSON.stringify(updatedData));

                pollUntilComplete(response.thread_id, response.run_id);
            }
        } catch (error) {
            console.error(error);
            setChat(prev => [...prev, fetchFailed]);
        }
    };

    const handleResetChat = () => {
        setChat([initialMessage(publicChatbot.welcomeMessage)]);
        setThreadId('');
        const updatedData = { ...storedData, public: { threadId: null } };
        setStoredData(updatedData);
        localStorage.setItem('extranet-threadIds', JSON.stringify(updatedData));
    };

    return (
        <div className="w-full h-full bg-gray-100 flex flex-col">
            {/* Header */}
            <div className="w-full flex justify-between items-center px-4 py-2 border-b border-gray-300 shadow-md" style={{backgroundColor: publicChatbot.mainColor}}>
                <div className="flex items-center gap-2">
                    <img className="w-10 h-10 rounded-full" src={publicChatbot.iconUrl} alt="Chatbot logo" />
                    <h2 className="text-white text-xl font-bold" style={{color: publicChatbot.fontColor1}}>{publicChatbot.name}</h2>
                </div>

                <div className="flex gap-2">
                    <FontAwesomeIcon 
                        icon={'fa-solid fa-eraser'} 
                        size="lg" 
                        className="text-white cursor-pointer hover:text-orange-400 transition-colors duration-200"
                        style={{color: publicChatbot.fontColor1}} 
                        onClick={handleResetChat}
                    />
                    <FontAwesomeIcon
                        icon={'fa-solid fa-xmark'}
                        size="xl"
                        className="text-white cursor-pointer hover:text-red-400 transition-colors duration-200"
                        style={{color: publicChatbot.fontColor1}}
                        onClick={onClose}
                    />
                </div>
            </div>

            {/* Chat content */}
            <div className="flex-1 w-full overflow-y-auto p-4">
                <Messages chat={chat} fontColor2={publicChatbot.fontColor2} secondaryColor={publicChatbot.secondaryColor} />
                { isTyping &&
                    <div className='px-2 w-fit rounded-md rounded-bl-none' style={{ backgroundColor: publicChatbot.secondaryColor }}>
                        <span className="loading loading-dots loading-md" style={{ backgroundColor: publicChatbot.fontColor2 }}></span>
                    </div>
                }
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
                        placeholder={publicChatbot.promptMessage}
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