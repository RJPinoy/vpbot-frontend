import * as React from 'react';

const ChatbotDevice = () => {
    const [renderChatbotMobile, setRenderChatbotMobile] = React.useState(false);
    const [renderChatbotTablet, setRenderChatbotTablet] = React.useState(false);
    const [renderChatbotDesktop, setRenderChatbotDesktop] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            renderChatbotMobile,
            renderChatbotTablet,
            renderChatbotDesktop,
        });
    };

    return (
        <>
            <p className="mb-6 text-gray-700 text-base">
                Afficher le chatbot sur des appareils spécifiques.
            </p>
            <form className="space-y-6 max-w-md" onSubmit={handleSubmit}>
                <fieldset className="border border-gray-200 rounded-md p-4">
                    <legend className="text-sm font-medium text-gray-600 px-2">Appareils</legend>

                    <div className="flex flex-col space-y-3 mt-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="render-chatbot-mobile"
                                name="render-chatbot-mobile"
                                checked={renderChatbotMobile}
                                onChange={(e) => setRenderChatbotMobile(e.target.checked)}
                                className="h-4 w-4 text-blue-600 rounded"
                            />
                            <span className="text-sm text-gray-700">Mobile</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="render-chatbot-tablet"
                                name="render-chatbot-tablet"
                                checked={renderChatbotTablet}
                                onChange={(e) => setRenderChatbotTablet(e.target.checked)}
                                className="h-4 w-4 text-blue-600 rounded"
                            />
                            <span className="text-sm text-gray-700">Tablette</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="render-chatbot-desktop"
                                name="render-chatbot-desktop"
                                checked={renderChatbotDesktop}
                                onChange={(e) => setRenderChatbotDesktop(e.target.checked)}
                                className="h-4 w-4 text-blue-600 rounded"
                            />
                            <span className="text-sm text-gray-700">Bureau</span>
                        </label>
                    </div>
                </fieldset>

                <button
                    type="submit"
                    className="w-full rounded-md bg-[#306285] px-4 py-2 text-white text-lg font-semibold hover:bg-[#1E3E55] transition duration-200 ease-in-out"
                >
                    Sauvegarder
                </button>
            </form>
        </>
    );
};

export default ChatbotDevice;