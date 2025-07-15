import * as React from 'react';

const ChatbotAppearances = () => {
    const [chatbotName, setChatbotName] = React.useState('');
    const [chatbotIcon, setChatbotIcon] = React.useState('');
    const [colorFont1, setColorFont1] = React.useState('#000000');
    const [colorFont2, setColorFont2] = React.useState('#000000');
    const [colorPrincipal, setColorPrincipal] = React.useState('#000000');
    const [colorSecondary, setColorSecondary] = React.useState('#000000');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            chatbotName,
            chatbotIcon,
            colorFont1,
            colorFont2,
            colorPrincipal,
            colorSecondary,
        });
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
                        onChange={(e) => setChatbotName(e.target.value)}
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
                        onChange={(e) => setChatbotIcon(e.target.value)}
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
                            onChange={(e) => setColorFont1(e.target.value)}
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
                            onChange={(e) => setColorFont2(e.target.value)}
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
                            onChange={(e) => setColorPrincipal(e.target.value)}
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
                            onChange={(e) => setColorSecondary(e.target.value)}
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