import React from 'react';
import { Link } from 'react-router-dom';

interface Tab {
    title: string,
    route: string
}

function Navbar() {
    const topBarItems: Tab[] = [
        { title: "Blogs", route: "/blogs" },
        { title: "ProblemSet", route: "/problemset" },
        { title: "Contests", route: "/contests" },
        { title: "Profile", route: "/profile" }
    ];

    return (
        <nav className='flex flex-col md:flex-row md:items-center md:justify-center w-full'>
            <div className='flex flex-wrap justify-center md:justify-around w-full md:w-auto'>
                {topBarItems.map((item) => (
                    <NavBarItem key={item.route} route={item.route} title={item.title} />
                ))}
            </div>
        </nav>
    );
}

function NavBarItem({ title, route }: Tab) {
    return (
        <Link to={route}>
            <div className='text-white p-2 hover:bg-gray-700 rounded-md transition-colors'>
                {title}
            </div>
        </Link>
    );
}

export default Navbar;
