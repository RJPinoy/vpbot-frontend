import * as React from 'react'
import { useDispatch } from 'react-redux'
import { getPublicChatbot } from "../../../../../api/chatbot/public/route"
import { setPublicChatbot } from '../../../../../stores/slices/publicChatbotSlice'
import ChatbotGeneral from "./general/ChatbotGeneral"
import ChatbotAppearances from './appearance/ChatbotAppearances'
import ChatbotPosition from './position/ChatbotPosition'
import ChatbotGreeting from "./greeting/ChatbotGreeting"
import ChatbotDevice from "./device/ChatbotDevice"

const ChatbotContentWrapper = ({ tab }) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const fetchPublicChatbot = async () => {
            try {
                const response = await getPublicChatbot();
                dispatch(setPublicChatbot(response));
            } catch (error) {
                console.error("Error Fetching public chatbot: ", error);
            }
        }

        fetchPublicChatbot();
    }, [])

    switch (tab) {
        case "general":
            return <ChatbotGeneral />
        case "apparances":
            return <ChatbotAppearances />
        case "position":
            return <ChatbotPosition />
        case "messages":
            return <ChatbotGreeting />
        case "appareils":
            return <ChatbotDevice />
        default:
            return <ChatbotGeneral />
    }
}
 
export default ChatbotContentWrapper;