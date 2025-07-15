import * as React from 'react'

const ChatbotGreeting = () => {
    const [greetingMessage, setGreetingMessage] = React.useState('Bonjour ! Comment puis-je vous aider sur la documentation de Visual Planning ?');
    const [promptPlaceholder, setPromptPlaceholder] = React.useState('Posez-moi vos questions!');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            greetingMessage,
            promptPlaceholder
        })
    }

    return (
        <>
            <p className="mb-6 text-gray-700">Configurer les messages du chatbot.</p>
            <form className="space-y-6 max-w-md" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="greeting-message" className="mb-1 text-sm font-medium text-gray-700">
                        Message d'accueil :
                    </label>
                    <textarea 
                        name="greeting-message"
                        id="greeting-message"
                        onChange={(e) => setGreetingMessage(e.target.value)}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        value={greetingMessage}
                    ></textarea>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="prompt-message" className="mb-1 text-sm font-medium text-gray-700">
                        Customisez le placeholder du prompt :
                    </label>
                    <input
                        type="text"
                        id="prompt-message"
                        name="prompt-message"
                        value={promptPlaceholder}
                        placeholder={promptPlaceholder}
                        onChange={(e) => setPromptPlaceholder(e.target.value)}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
}
 
export default ChatbotGreeting;