import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Cookies from "js-cookie";

const HeaderAdmin = () =>{
    const handleLogOut = () =>{
        Cookies.remove('session')
    }

    return(
        <header className="myHeader">
            <ul>
                <li>
                    <Link to='/admin/coworkings'>Coworkings liste</Link>
                </li>
                <li>
                    {/* <Link></Link> */}
                    menu
                </li>
                <li>
                    <Link to='/admin/dashboard'><span class="material-symbols-outlined myHomeBtn">home</span></Link>
                </li>
                <li>
                    {/* <Link></Link> */}
                    menu
                </li>
                <li>
                {!Cookies.get('session')? (
                    <IconButton><Link to='/login'><LoginIcon /></Link></IconButton>)
                    : (<IconButton onClick={handleLogOut}><Link to='/login'><LogoutIcon /></Link></IconButton>)
                    }
                </li>
            </ul>
        </header>
    )
}

export default HeaderAdmin