import Account from "./account/Account";
import Users from "./users/Users";
import Chatbot from "./chatbot/Chatbot";

const AdminMainContent = ({ content }) => {
    switch (content) {
        case 'compte':
            return <Account />;
        case 'users':
            return <Users />;
        case 'chatbot':
            return <Chatbot />;
        default:
            console.warn(`Unknown content type: ${content}, defaulting to My Account.`);
            return <Account />;
    }
}

export default AdminMainContent;