import { useNavigate } from "react-router-dom";

interface HamburgerMenuProps {
    hamburger: boolean;
    setHamburger: React.Dispatch<React.SetStateAction<boolean>>;
    navigate: ReturnType<typeof useNavigate>;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ hamburger, setHamburger, navigate,}) => {
    return (
        <div
            className={`fixed inset-0 z-50 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
                hamburger ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
        >
            <div className="p-4">
                <button
                    className="text-gray-500 focus:outline-none focus:text-gray-700 mb-4"
                    aria-label="close menu"
                    onClick={() => setHamburger(false)}
                >
                    ✕
                </button>
                <ul className="space-y-4">
                    <li>
                        <button
                            onClick={() => {
                                setHamburger(false);
                                navigate("/features");
                            }}
                            className="text-lg font-medium"
                        >
                            Features
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                setHamburger(false);
                                navigate("/contact");
                            }}
                            className="text-lg font-medium"
                        >
                            Contact
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                setHamburger(false);
                                navigate("/faq");
                            }}
                            className="text-lg font-medium"
                        >
                            FAQ
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                setHamburger(false);
                                navigate("/login");
                            }}
                            className="text-lg font-medium"
                        >
                            Login
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default HamburgerMenu;
