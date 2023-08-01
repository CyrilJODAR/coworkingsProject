import { Link } from "react-router-dom";

const Header = () =>{
    return(
        <header className="myHeader">
            <ul>
                <li>
                    <Link to='/coworkings'>Coworkings liste</Link>
                </li>
                <li>
                    {/* <Link></Link> */}
                    menu
                </li>
                <li>
                    <Link to='/'><span class="material-symbols-outlined myHomeBtn">home</span></Link>
                </li>
                <li>
                    {/* <Link></Link> */}
                    menu
                </li>
                <li>
                    {/* <Link></Link> */}
                    menu
                </li>
            </ul>
        </header>
    )
}

export default Header