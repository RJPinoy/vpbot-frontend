import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyPublicChatbot } from '../../../../../../api/chatbot/public/route';
import { setPublicChatbot } from '../../../../../../stores/slices/publicChatbotSlice';

const ChatbotPosition = () => {
    const publicChatbot = useSelector((state) => state.publicChatbotSlice);
    const [renderChatbot, setRenderChatbot] = React.useState(true);
    const [chatbotPosition, setChatbotPosition] = React.useState('');
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (publicChatbot) {
            setRenderChatbot(publicChatbot.renderEveryPages);
            setChatbotPosition(publicChatbot.position);
        }
    }, [publicChatbot]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = {
            renderEveryPages: renderChatbot,
            position: chatbotPosition,
        };

        console.log(params);
        modifyPublicChatbot(params);
        dispatch(setPublicChatbot(params));
    };

    return (
        <>
            <p className="mb-6 text-gray-700">Positionnez votre chatbot.</p>
            <form className="space-y-6 max-w-md" onSubmit={handleSubmit}>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="render-chatbot"
                        name="render-chatbot"
                        checked={renderChatbot}
                        onChange={(e) => setRenderChatbot(e.target.checked)}
                        className="h-4 w-4"
                    />
                    <label htmlFor="render-chatbot" className="text-sm font-medium text-gray-700">
                        Afficher le chatbot sur toutes les pages
                    </label>
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 text-sm font-medium text-gray-700">
                        Position du chatbot :
                    </label>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-1">
                            <input
                                type="radio"
                                name="chatbot-position"
                                value="left"
                                checked={chatbotPosition === 'left'}
                                onChange={(e) => setChatbotPosition(e.target.value)}
                            />
                            <span>Gauche</span>
                        </label>

                        <label className="flex items-center space-x-1">
                            <input
                                type="radio"
                                name="chatbot-position"
                                value="center"
                                checked={chatbotPosition === 'center'}
                                onChange={(e) => setChatbotPosition(e.target.value)}
                            />
                            <span>Centre</span>
                        </label>

                        <label className="flex items-center space-x-1">
                            <input
                                type="radio"
                                name="chatbot-position"
                                value="right"
                                checked={chatbotPosition === 'right'}
                                onChange={(e) => setChatbotPosition(e.target.value)}
                            />
                            <span>Droite</span>
                        </label>
                    </div>
                    <div className='block w-full h-[20dvh] bg-gray-400 mt-4 relative'>
                        <div
                            className={`absolute m-2 bottom-0 ${
                                chatbotPosition === 'left' ? 'left-0' : 
                                    chatbotPosition === 'center' ? 'left-1/2 -translate-x-1/2' : 'right-0'
                            }`}
                        >
                            X
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-md bg-[#306285] px-4 py-2 text-white text-lg font-semibold cursor-pointer hover:bg-[#1E3E55] transition duration-200 ease-in-out"
                >
                    Sauvegarder
                </button>
            </form>
        </>
    );
};

export default ChatbotPosition;