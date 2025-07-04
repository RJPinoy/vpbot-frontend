import ChatbotGeneral from "./general/chatbotGeneral"
import ChatbotAppearances from "./appearance/chatbotAppearances"
import ChatbotPosition from "./position/chatbotPosition"
import ChatbotGreeting from "./greeting/chatbotGreeting"
import ChatbotDevice from "./device/chatbotDevice"

const ChatbotContentWrapper = ({ tab }) => {
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