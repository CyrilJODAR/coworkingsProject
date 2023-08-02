import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import Cookies from "js-cookie";

const Header = () =>{
    const navigate = useNavigate()
    const token = Cookies.get('session')

    const handleLogOut = () =>{
        Cookies.remove('session')
        navigate('/login')
    }

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
                {token == undefined ? (
                    <IconButton><Link to='/login'><LoginIcon /></Link></IconButton>)
                    : (<IconButton onClick={handleLogOut}><Link to='/'><LogoutIcon /></Link></IconButton>)
                    }
                </li>
            </ul>
        </header>
    )
}

export default Header