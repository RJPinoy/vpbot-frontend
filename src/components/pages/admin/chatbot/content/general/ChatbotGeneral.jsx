import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiModelAvailable } from '../../../../../../utils';
import { modifyPublicChatbot } from '../../../../../../api/chatbot/public/route';
import { setPublicChatbot } from '../../../../../../stores/slices/publicChatbotSlice';

const ChatbotGeneral = () => {
    const publicChatbot = useSelector((state) => state.publicChatbotSlice);
    const [apiKey, setApiKey] = React.useState("");
    const [assistantId, setAssistantId] = React.useState("");
    const [selectedModel, setSelectedModel] = React.useState("");
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (publicChatbot) 
            {
            setApiKey(publicChatbot.apiKey);
            setAssistantId(publicChatbot.assistantId);
            setSelectedModel(publicChatbot.model);
        }
    }, [publicChatbot]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = {
            apiKey: apiKey,
            assistantId: assistantId,
            selectedModel: selectedModel,
        };

        console.log(params);
        modifyPublicChatbot(params);
        dispatch(setPublicChatbot(params));
    }

    return (
        <>
            <p className="mb-6 text-gray-700">
                Entrez votre clé API et l'ID de votre assistant OpenIA pour commencer.
            </p>
            <form className="space-y-6 max-w-md">
                <div className="flex flex-col">
                    <label htmlFor="api-key" className="mb-1 text-sm font-medium text-gray-700">
                        Clé API :
                    </label>
                    <input
                        type="text"
                        id="api-key"
                        name="api-key"
                        placeholder="sk-..."
                        value={apiKey}
                        onChange={ (e) => setApiKey(e.target.value) }
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="assistant-id" className="mb-1 text-sm font-medium text-gray-700">
                        Assistant ID :
                    </label>
                    <input
                        type="text"
                        id="assistant-id"
                        name="assistant-id"
                        placeholder="asst-..."
                        value={assistantId}
                        onChange={ (e) => setAssistantId(e.target.value) }
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="ai-model" className="mb-1 text-sm font-medium text-gray-700">
                        {/* Todo : change to current model */}
                        Modèle IA : <span className='text-gray-400 italic'>actuel : {publicChatbot?.model}</span>
                    </label>
                    <select
                        name="ai-model"
                        id="ai-model"
                        value={selectedModel}
                        onChange={ (e) => setSelectedModel(e.target.value) }
                        className="px-3 py-2 border rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {AiModelAvailable.map((availableModel) => (
                            <option key={availableModel} value={availableModel}>
                                {availableModel}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    onClick={ handleSubmit }
                    className="w-full rounded-md bg-[#306285] px-4 py-2 text-white text-lg font-semibold cursor-pointer hover:bg-[#1E3E55] transition duration-200 ease-in-out"
                >
                    Sauvegarder
                </button>
            </form>
        </>
    );
};

export default ChatbotGeneral;