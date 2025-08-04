import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyPublicChatbot } from '../../../../../../api/chatbot/public/route';
import { setPublicChatbot } from '../../../../../../stores/slices/publicChatbotSlice';

const ChatbotAppearances = () => {
    const publicChatbot = useSelector((state) => state.publicChatbotSlice);
    const [chatbotName, setChatbotName] = React.useState('');
    const [chatbotIcon, setChatbotIcon] = React.useState('');
    const [colorFont1, setColorFont1] = React.useState('');
    const [colorFont2, setColorFont2] = React.useState('');
    const [colorPrincipal, setColorPrincipal] = React.useState('');
    const [colorSecondary, setColorSecondary] = React.useState('');
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (publicChatbot) {
            setChatbotName(publicChatbot.name);
            setChatbotIcon(publicChatbot.iconUrl);
            setColorFont1(publicChatbot.fontColor1);
            setColorFont2(publicChatbot.fontColor2);
            setColorPrincipal(publicChatbot.mainColor);
            setColorSecondary(publicChatbot.secondaryColor);
        }
    }, [publicChatbot]);

    const handleChatbotName = (e) => {
        setChatbotName(e.target.value);
        dispatch(setPublicChatbot({name: e.target.value}))
    }

    const handleChatbotIcon = (e) => {
        setChatbotIcon(e.target.value);
        dispatch(setPublicChatbot({iconUrl: e.target.value}))
    }

    const handleChatbotFontColor1 = (e) => {
        setColorFont1(e.target.value);
        dispatch(setPublicChatbot({fontColor1: e.target.value}))
    }

    const handleChatbotFontColor2 = (e) => {
        setColorFont2(e.target.value);
        dispatch(setPublicChatbot({fontColor2: e.target.value}))
    }

    const handleMainColor = (e) => {
        setColorPrincipal(e.target.value);
        dispatch(setPublicChatbot({mainColor: e.target.value}))
    }

    const handleSecondaryColor = (e) => {
        setColorSecondary(e.target.value);
        dispatch(setPublicChatbot({secondaryColor: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = {
            name: chatbotName,
            iconUrl: chatbotIcon,
            fontColor1: colorFont1,
            fontColor2: colorFont2,
            mainColor: colorPrincipal,
            secondaryColor: colorSecondary,
        }

        console.log(params);
        modifyPublicChatbot(params);
        dispatch(setPublicChatbot(params));
    };

    return (
        <>
            <p className="mb-6 text-gray-700">Customisez votre chatbot.</p>
            <form className="space-y-6 max-w-md" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="chatbot-name" className="mb-1 text-sm font-medium text-gray-700">
                        Nom du chatbot :
                    </label>
                    <input
                        type="text"
                        id="chatbot-name"
                        name="chatbot-name"
                        value={chatbotName}
                        onChange={handleChatbotName}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="chatbot-icon" className="mb-1 text-sm font-medium text-gray-700">
                        Icône du chatbot :
                    </label>
                    <input
                        type="text"
                        id="chatbot-icon"
                        name="chatbot-icon"
                        value={chatbotIcon}
                        onChange={handleChatbotIcon}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-row">
                    <div  className="flex flex-col justify-between w-full">
                        <label htmlFor="color-font-1" className="mb-1 text-sm font-medium text-gray-700">
                            Couleur font 1 :
                        </label>
                        <input
                            type="color"
                            id="color-font-1"
                            name="color-font-1"
                            value={colorFont1}
                            onChange={handleChatbotFontColor1}
                            className="h-10 w-20 cursor-pointer rounded"
                        />
                    </div>
                    <div  className="flex flex-col justify-between w-full">
                        <label htmlFor="color-font-2" className="mb-1 text-sm font-medium text-gray-700">
                            Couleur font 2 :
                        </label>
                        <input
                            type="color"
                            id="color-font-2"
                            name="color-font-2"
                            value={colorFont2}
                            onChange={handleChatbotFontColor2}
                            className="h-10 w-20 cursor-pointer rounded"
                        />
                    </div>
                </div>

                <div className="flex flex-row">
                    <div  className="flex flex-col justify-between w-full">
                        <label htmlFor="color-principal" className="mb-1 text-sm font-medium text-gray-700">
                            Couleur principale :
                        </label>
                        <input
                            type="color"
                            id="color-principal"
                            name="color-principal"
                            value={colorPrincipal}
                            onChange={handleMainColor}
                            className="h-10 w-20 cursor-pointer rounded"
                        />
                    </div>
                    <div  className="flex flex-col justify-between w-full">
                        <label htmlFor="color-secondary" className="mb-1 text-sm font-medium text-gray-700">
                            Couleur secondaire :
                        </label>
                        <input
                            type="color"
                            id="color-secondary"
                            name="color-secondary"
                            value={colorSecondary}
                            onChange={handleSecondaryColor}
                            className="h-10 w-20 cursor-pointer rounded"
                        />
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

export default ChatbotAppearances;