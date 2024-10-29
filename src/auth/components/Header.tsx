import Logo from "../../assets/logo.svg";

export const Header = () => {
    return (
        <header className="fixed top-0 w-full bg-gradient-to-r from-indigo-300 via-indigo-100 to-blue-100 shadow-md z-50">
            <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        src={Logo}
                        alt="EnergyTop Logo"
                        className="h-8 w-8 mr-3"
                    />
                    <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">
                        EnergyTop
                    </h1>
                </div>
                <nav>
                    <a
                        href="#"
                        className="text-sm text-gray-700 hover:text-gray-900 ml-6 font-medium"
                    >
                        Contacto
                    </a>
                    <a
                        href="#"
                        className="text-sm text-gray-700 hover:text-gray-900 ml-6 font-medium"
                    >
                        Ayuda
                    </a>
                </nav>
            </div>
        </header>
    );
};
