import { useLocation } from "react-router-dom";

const UserNav = () => {
    const location = useLocation();
    const navItems = [
        { label: 'Accueil', path: '/dashboard' },
        { label: 'Support', path: '/support' },
        { label: 'Outils', path: '/tools' },
        { label: 'Documentation', path: '/documentation' },
    ];

    return (
        <div className="flex justify-between items-center w-full h-[100px] bg-white text-black px-50">
            <a href="/dashboard" className="w-[200px] cursor-pointer">
                <img src="/assets/images/logo-vp-sans-baseline.png" alt="Logo"/>
            </a>
            <div className="flex items-center gap-4">
                <ul id="user-nav-ul" className="flex flex-row gap-4 text-lg font-semibold text-gray-400">
                    {navItems.map((item, index) => (
                        <li key={index} className="hover:text-[#37749F] transition-all duration-300">
                            <a
                                href={item.path}
                                className={ location.pathname === item.path ? 'text-[#37749F] underline underline-offset-8 decoration-4 decoration-[#15bf86]': '' }
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