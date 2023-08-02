import { useEffect, useState } from "react"
import CoworkingPublic from "../../components/public/CoworkingPublic";
import { Link, useNavigate } from "react-router-dom";
import { Container, Grid, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Cookies from "js-cookie";
import Header from "../../components/public/Header";

const CoworkingsUserPage = () =>{
    const navigate = useNavigate();
    if(!Cookies.get('session')) navigate('/login')

    const [coworkings, setCoworkings] = useState([]);

    const fetchDataAllCoworkings = async () =>{
            const responseCoworkings = await fetch('http://localhost:3001/api/coworkings') 
            const jsonCoworkings = await responseCoworkings.json()
            setCoworkings(jsonCoworkings.data)
    }

    useEffect(() =>{
        fetchDataAllCoworkings()
    },[])
    return(
        <>
            <Header />
            <h2>Voici tout les coworkings</h2>
            <Container sx={{ p: 4 }} maxWidth="lg" className="containerCardCoworking">
                <Grid sx={{ gap: 1}}>
                    <section className="CoworkingsList">
                        {coworkings.length === 0 ?
                        <h3>Loading ...</h3> :
                        coworkings.map(coworking => (
                            <CoworkingPublic coworking={coworking} key={coworking.id}/>
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

export default CoworkingsUserPage;