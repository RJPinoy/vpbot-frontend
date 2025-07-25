const Footer = () => {
    return (
        <footer className="w-full bg-gray-800 text-white py-6 text-sm">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm font-medium">© 1996-2025 Stilog I.S.T. Tous droits réservés.</p>
                <p className="text-xs mt-1 italic">Visual Planning® est une marque déposée de Stilog I.S.T.</p>

                <ul className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-300">
                    <li className="hover:text-white transition-colors duration-200 cursor-pointer">Crédits</li>
                    <li className="hover:text-white transition-colors duration-200 cursor-pointer">C.G.V.</li>
                    <li className="hover:text-white transition-colors duration-200 cursor-pointer">Confidentialité</li>
                    <li className="hover:text-white transition-colors duration-200 cursor-pointer">R.G.P.D.</li>
                    <li className="hover:text-white transition-colors duration-200 cursor-pointer">Plan du site</li>
                    <li className="hover:text-white transition-colors duration-200 cursor-pointer">Photos non contractuelles</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;