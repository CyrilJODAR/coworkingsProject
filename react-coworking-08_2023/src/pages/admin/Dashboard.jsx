import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { RoleUserCheck } from "../../components/admin/RoleUserCheck";

const Dashboard = () => {
    let user = ''
    let id = 0
    let userData = {}
    const navigate = useNavigate()

    const checkCookies = () =>{
        !Cookies.get('session') && navigate('/admin/login')
    }
    if(Cookies.get('session')){
        const jwt = Cookies.get('session');
        userData = jwtDecode(jwt)
        console.log(jwtDecode(jwt))
        user = userData.data.username
        id = userData.data.id
    }

    useEffect(()=>{
        (async()=>{
            const myUserRole = await RoleUserCheck()
            if(myUserRole === 1) {navigate ('/')}
        })()
        checkCookies()
    }, [])

    return(
        <>
            <HeaderAdmin />
            <h2>Bienvenue sur votre interface Admin {user} !</h2>
        </>
    )
}

export default Dashboard