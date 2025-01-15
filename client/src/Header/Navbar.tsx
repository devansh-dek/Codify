import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Command, BookOpen, Award, User } from 'lucide-react';


interface Tab {
    title: string,
    route: string,
    icon: React.ReactNode
}

function Navbar() {
    const topBarItems = [
        { title: "Blogs", route: "/blogs", icon: <BookOpen className="w-4 h-4" /> },
        { title: "ProblemSet", route: "/problemset", icon: <Command className="w-4 h-4" /> },
        { title: "Profile", route: "/profile", icon: <User className="w-4 h-4" /> }
    ];

    return (
        <nav className='bg-slate-900 border-b border-slate-800'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex-shrink-0'>

                    </div>
                    <div className='hidden md:block'>
                        <div className='flex items-center space-x-4'>
                            {topBarItems.map((item) => (
                                <Link
                                    key={item.route}
                                    to={item.route}
                                    className='px-3 py-1  rounded-md text-sm font-medium text-xl text-gray-300 hover:text-white hover:bg-slate-800 transition-colors duration-200'
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavBarItem({ title, route, icon }: Tab) {
    return (
        <Link to={route}>
            <div className='text-white p-2 hover:bg-gray-700 rounded-md transition-colors'>
                {title}
            </div>
        </Link>
    );
}

export default Navbar;
