import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setIsLoading, setIsAuthenticated } from '../../../stores/slices/userSlice';

const AdminNav = ({ isAdminPage }) => {
    const currentUser = useSelector((state) => state.userSlice.user);
    const [showProfileMenu, setShowProfileMenu] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const currentUser = JSON.parse(localStorage.getItem('extranet-user'));

    const handleProfileMenu = () => {
        // console.log("Profile clicked");
        setShowProfileMenu(!showProfileMenu);
    };

    const handleLogout = () => {
        console.log("Logout clicked");
        dispatch(setIsLoading(true));
        logout()
            .then(() => {
                setShowProfileMenu(false);
            })
            .catch(error => {
                console.error("Logout error:", error);
            }).finally(() => {
                dispatch(setIsAuthenticated(false));
                dispatch(setUser({}));
                localStorage.removeItem('extranet-user');
                setShowProfileMenu(false);
                dispatch(setIsLoading(false));
                navigate('/login');
            });
    };

    return (
        <div className="flex justify-between items-center w-full h-[5dvh] bg-[#1E1E1E] text-gray-200 px-30">
            { isAdminPage ?
                <a href="/dashboard" className="text-gray-200 hover:text-white">
                    <FontAwesomeIcon icon="fa-solid fa-house" />
                    <span className="ml-2 text-lg font-semibold">Accueil</span>
                </a>
            :
                <a href="/admin/dashboard" className="text-gray-200 hover:text-white">
                    <FontAwesomeIcon icon="fa-solid fa-house" />
                    <span className="ml-2 text-lg font-semibold">Administrateur</span>
                </a>
            }
            <div className="flex items-center gap-2 h-full cursor-pointer hover:bg-gray-700 px-4 transition duration-200 ease-in-out relative" onClick={ handleProfileMenu }>
                <span>Bonjour, {currentUser?.firstName + ' ' + currentUser?.lastName?.toUpperCase()}</span>
                <div
                    className="w-[30px] h-[30px] rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentUser?.img})` }}
                ></div>
                        
                {showProfileMenu && (
                    <div className="absolute top-[5dvh] right-0 p-2 w-full bg-[#1E1E1E] shadow-md z-50 flex flex-row justify-evenly overflow-hidden cursor-default" onMouseLeave={ () => setShowProfileMenu(false) }>
                        <a
                            href='/admin/dashboard?tab=compte'
                            className="w-[50px] h-[50px] rounded-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${currentUser?.img})` }}
                            onMouseEnter={() => document.querySelector('.modify-profile-menu').classList.add('text-blue-300')}
                            onMouseLeave={() => document.querySelector('.modify-profile-menu').classList.remove('text-blue-300')}
                        ></a>
                        <div className='flex flex-col justify-start items-start ml-4 text-sm'>
                            <a href="/admin/dashboard?tab=compte" className='modify-profile-menu flex flex-col justify-start items-start transition-all duration-200 ease-in-out hover:text-blue-300'>
                                <span>{currentUser?.firstName + ' ' + currentUser?.lastName}</span>
                                <span className='italic text-xs mb-2'>{currentUser?.username}</span>
                                <span>Modifier le profil</span>
                            </a>
                            <button
                                onClick={ handleLogout }
                                className="cursor-pointer transition-all duration-200 ease-in-out hover:text-red-400"
                            >
                                Se déconnecter
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminNav;