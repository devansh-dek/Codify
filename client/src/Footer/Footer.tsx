import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Add icons for social links

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-6">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Codify. All rights reserved.</p>
                </div>
                <div className="flex space-x-4">
                    <a
                        href="https://github.com/your-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                        <FaGithub size={24} />
                    </a>
                    <a
                        href="https://twitter.com/your-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                        <FaTwitter size={24} />
                    </a>
                    <a
                        href="https://linkedin.com/in/your-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                        <FaLinkedin size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
