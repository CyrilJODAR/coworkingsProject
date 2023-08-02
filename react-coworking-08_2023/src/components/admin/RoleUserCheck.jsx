import Cookies from "js-cookie"
import jwtDecode from "jwt-decode"

export const RoleUserCheck = async () =>{
        const jwt = Cookies.get('session')
                    const userData = jwtDecode(jwt)
    
                    const myUser = await fetch(`http://localhost:3001/api/users/${userData.data.id}`)
                    const responseMyUser = await myUser.json()
    
                    const myUserRole = responseMyUser.data.RoleId
    return myUserRole
}