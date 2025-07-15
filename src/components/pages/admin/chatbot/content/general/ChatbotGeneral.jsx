import * as React from 'react';
import { AiModelAvailable } from '../../../../../../utils';

const ChatbotGeneral = () => {
    const [selectedModel, setSelectedModel] = React.useState("");
    const [apiKey, setApiKey] = React.useState("");
    const [assistantId, setAssistantId] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            apiKey: apiKey,
            assistantId: assistantId,
            selectedModel: selectedModel,
        })
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
                        onChange={ (e) => setAssistantId(e.target.value) }
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="ai-model" className="mb-1 text-sm font-medium text-gray-700">
                        {/* Todo : change to current model */}
                        Modèle IA : <span className='text-gray-400'>{selectedModel}</span>
                    </label>
                    <select
                        name="ai-model"
                        id="ai-model"
                        onChange={ (e) => setSelectedModel(e.target.value) }
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Choisissez un modèle --</option>
                        {AiModelAvailable.map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    onClick={ handleSubmit }
                    className="w-full rounded-md bg-[#306285] px-4 py-2 text-white text-lg font-semibold hover:bg-[#1E3E55] transition duration-200 ease-in-out"
                >
                    Sauvegarder
                </button>
            </form>
        </>
    );
};

export default ChatbotGeneral;