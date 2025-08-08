import * as React from 'react';
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserNav = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = React.useState(false);

    const navItems = [
        { label: 'Accueil', path: '/dashboard' },
        { label: 'Support', path: '/support' },
        { label: 'Outils', path: '/tools' },
        { label: 'Documentation', path: '/documentation' },
    ];

    return (
        <div className="flex justify-between items-center w-full h-[100px] bg-white text-black px-4 lg:px-12 relative">
            {/* Logo */}
            <a href="/dashboard" className="w-[200px] cursor-pointer">
                <img src="/assets/images/logo-vp-sans-baseline.png" alt="Logo"/>
            </a>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex flex-row gap-6 text-lg font-semibold text-gray-400">
                {navItems.map((item, index) => (
                    <li key={index} className="hover:text-[#37749F] transition-all duration-300">
                        <a
                            href={item.path}
                            className={ location.pathname === item.path ? 'text-[#37749F] underline underline-offset-8 decoration-4 decoration-[#15bf86]' : '' }
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Mobile Menu Button */}
            <button 
                className="lg:hidden p-2 z-2"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen 
                    ? <FontAwesomeIcon icon="fa-solid fa-xmark" size="2xl" /> 
                    : <FontAwesomeIcon icon="fa-solid fa-bars" size="2xl" />
                }
            </button>

            {/* Mobile Slide-in Menu */}
            <div
                className={`fixed top-[130px] py-4 right-0 w-1/2 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out
                    ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <ul className="flex flex-col items-center gap-6 text-lg font-semibold text-gray-400">
                    {navItems.map((item, index) => (
                        <li key={index} className="hover:text-[#37749F] transition-all duration-300">
                            <a
                                href={item.path}
                                className={ location.pathname === item.path ? 'text-[#37749F] underline underline-offset-8 decoration-4 decoration-[#15bf86]' : '' }
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserNav;