import { useEffect, useState } from "react"
import Coworking from "../../components/admin/Coworking";
import HeaderAdmin from "../../components/admin/HeaderAdmin"
import { Link, useNavigate } from "react-router-dom";
import { Container, Grid, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Cookies from "js-cookie";
import { RoleUserCheck } from "../../components/admin/RoleUserCheck";

const CoworkingsPage = () =>{
    const navigate = useNavigate();
    if(!Cookies.get('session')) navigate('/login')

    const [coworkings, setCoworkings] = useState([]);
    const [deleteCoworkings, setDeleteCoworkings] = useState(null);

    const fetchDataAllCoworkings = async () =>{
            const responseCoworkings = await fetch('http://localhost:3001/api/coworkings') 
            const jsonCoworkings = await responseCoworkings.json()
            setCoworkings(jsonCoworkings.data)
            console.log(jsonCoworkings.data)

    }

    const handleDeleteCoworking = async (coworkingId) =>{
        const token = Cookies.get("session")
            const responseDeleteCoworking = await fetch(`http://localhost:3001/api/coworkings/${coworkingId}`, {
                method : 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const jsonCoworkingDelete = await responseDeleteCoworking.json()
            setDeleteCoworkings(jsonCoworkingDelete.message)
    }

    useEffect(() =>{
        (async()=>{
            const myUserRole = await RoleUserCheck()
            if(myUserRole === 1) {navigate ('/')}
        })()
        fetchDataAllCoworkings()
    }, [deleteCoworkings])
    return(
        <>
            <HeaderAdmin />
            <h2>Voici tout les coworkings</h2>
            <Container sx={{ p: 4 }} maxWidth="lg" className="containerCardCoworking">
                <Grid sx={{ gap: 1}}>
                {deleteCoworkings != null && <p>{deleteCoworkings}</p>}
                    <section className="CoworkingsList">
                        {coworkings.length === 0 ?
                        <h3>Loading ...</h3> :
                        coworkings.map(coworking => (
                            <Coworking coworking={coworking} handleDeleteCoworking={handleDeleteCoworking} key={coworking.id}/>
                            ))}
                        <IconButton
                        variant="outlined"
                        color="secondary"
                        fontSize="large"
                        ><Link className="addCoworking" to="/admin/coworkings/add"><AddCircleIcon/></Link></IconButton> 
                    </section>
                </Grid>
            </Container>
        </>
    )
}

export default CoworkingsPage;