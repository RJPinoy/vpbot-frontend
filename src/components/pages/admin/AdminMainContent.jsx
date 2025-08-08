import * as React from 'react';
import Account from "./account/Account";
import Users from "./users/Users";
import Chatbot from "./chatbot/Chatbot";
import { checkAuth } from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

const AdminMainContent = ({ content }) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                await checkAuth();
            } catch (error) {
                console.error('Failed checking connexion.', error);
                navigate('/login');
            }
        }

        fetchUser();
    }, [])

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