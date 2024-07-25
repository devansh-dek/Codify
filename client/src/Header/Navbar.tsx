import React from 'react'
import { Link } from 'react-router-dom'
interface Tab {
    title: string,
    route: string
}
function Navbar() {

    const topBarItems: Tab[] = [
        {
            title: "Blogs",
            route: "/blogs"
        },
        {
            title: "ProblemSet",
            route: "/problemset"
        },
        {
            title: "Contests",
            route: "/contests"
        },
        {
            title: "Profile",
            route: "/Profile"
        }

    ]


    return (
        <nav>
            <div className='flex m-1 ml-20 p-1 w- w-full  justify-around  text-white '>

                {topBarItems.map((item) => <NavBarItem route={item.route} title={item.title}  ></NavBarItem>)}
            </div>
        </nav>
    )
}

function NavBarItem({ title, route }: Tab) {
    return <Link to={route}>
        <div className=''>
            {title}
        </div>

    </Link>
}

export default Navbar   