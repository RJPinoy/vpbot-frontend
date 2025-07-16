import * as React from 'react';
import Footer from "../../footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Support = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="flex justify-start items-center flex-col w-full min-h-[100dvh] bg-white text-black">
                <div className="w-full flex justify-center items-center flex-col p-8 bg-[#005CA7] text-white">
                    <h1 className="text-2xl font-bold p-4">Support Page</h1>
                    <p className="p-4">This is the support page where you can find help and resources.</p>
                </div>

                <div className="flex flex-col items-center justify-start w-full h-[100dvh] bg-gray-200">
                    <div className="flex w-full justify-between items-center flex-row px-16 py-4 border-b border-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="w-[50px] h-[50px] p-4 rounded-full bg-[url('/assets/images/chatbot/chatbot.gif')] bg-no-repeat bg-contain bg-center"></div>
                            <span className="text-lg font-semibold">VP Json</span>
                        </div>

                        <div className="flex gap-2">
                            <FontAwesomeIcon icon={'fa-solid fa-file-import'} size="lg" className="text-black cursor-pointer hover:text-orange-400 transition-colors duration-200" />
                            <FontAwesomeIcon icon={'fa-solid fa-eraser'} size="lg" className="text-black cursor-pointer hover:text-orange-400 transition-colors duration-200" />
                        </div>
                    </div>

                    <div className="flex flex-row w-full h-full justify-between items-center">
                        <div className="flex flex-col w-1/4 h-full items-center gap-2 relative px-8 py-4 border-r border-gray-500">
                            <div className="flex flex-col w-full relative mb-4">
                                <label htmlFor="api-key" className="mb-2">Clé API :</label>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="api-key" 
                                    name="api-key" 
                                    className="border border-black rounded-md p-1 px-2"
                                    placeholder='sk-...'
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={ togglePasswordVisibility }
                                    className="absolute right-2 bottom-1 text-black cursor-pointer hover:text-[#1E3E55]"
                                >
                                    <FontAwesomeIcon icon={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} />
                                </button>
                            </div>

                            <div className="flex flex-col w-full relative mb-4">
                                <label htmlFor="assistantName" className="mb-2">Assistant :</label>
                                <select name="" id="" className='border border-black rounded-md p-1 px-2'>
                                    <option value="assistant1">Assistant 1</option>
                                    <option value="assistant2">Assistant 2</option>
                                    <option value="assistant3">Assistant 3</option>
                                </select>
                            </div>

                            <div className='flex flex-col w-full relative mb-4'>
                                <label htmlFor="systemInstructions" className="mb-2">Instructions système supplémentaires :</label>
                                <textarea 
                                    id="systemInstructions" 
                                    name="systemInstructions" 
                                    className="border border-black rounded-md p-1 px-2 resize-none"
                                    rows="8"
                                    placeholder='Entrez les instructions système ici...'
                                ></textarea>
                            </div>

                            <div className="flex flex-col w-full relative mb-4">
                                <label htmlFor="selectField" className="mb-2">Modèle :</label>
                                <select name="" id="" className='border border-black rounded-md p-1 px-2'>
                                    <option value="model1">Modèle 1</option>
                                    <option value="model2">Modèle 2</option>
                                    <option value="model3">Modèle 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col h-full px-50">
                            <div className='flex w-full flex-1'></div>

                            <div className='flex flex-row items-end w-full h-[15dvh] rounded-md bg-gray-500 p-4 mb-4 gap-4'>
                                <textarea 
                                    id="userInput" 
                                    name="userInput" 
                                    className="border border-black rounded-md p-1 px-2 resize-none w-full h-full text-white"
                                    placeholder='Tapez votre message ici...'
                                ></textarea>
                                <button
                                    type="submit"
                                    className="h-[30%] px-2 bg-[#306285] text-white rounded-md hover:bg-[#1E3E55] transition duration-200 ease-in-out cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        console.log('Message sent');
                                    }}
                                >
                                    Envoyer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Support;