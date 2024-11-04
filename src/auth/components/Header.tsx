import Logo from "../../assets/logo.svg";

export const Header = () => {
    return (
        <header className="fixed top-0 w-full bg-slate-900 bg-opacity-40 shadow-lg">
            <div className="mx-auto max-w-7xl px-4 py-5 flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        src={Logo}
                        alt="EnergyTop Logo"
                        className="h-8 w-8 mr-3"
                    />
                    <h1 className="text-3xl font-semibold text-white tracking-wide">
                        EnergyTop
                    </h1>
                </div>
                <nav>
                    <a
                        href="#"
                        className="text-xl text-white hover:text-gray-900 ml-6 font-semibold"
                    >
                        Contacto
                    </a>
                    <a
                        href="#"
                        className="text-xl text-white hover:text-gray-900 ml-6 font-semibold"
                    >
                        Ayuda
                    </a>
                </nav>
            </div>
        </header>
    );
};
