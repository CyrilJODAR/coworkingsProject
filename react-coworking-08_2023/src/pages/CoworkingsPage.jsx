import { useEffect, useState } from "react"
import Coworking from "../components/Coworking";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { Container, Grid, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CoworkingsPage = () =>{

    const [coworkings, setCoworkings] = useState([]);
    const [deleteCoworkings, setDeleteCoworkings] = useState(null);

    const fetchDataAllCoworkings = async () =>{
            const responseCoworkings = await fetch('http://localhost:3001/api/coworkings') 
            const jsonCoworkings = await responseCoworkings.json()
            setCoworkings(jsonCoworkings.data)
            console.log(jsonCoworkings.data)

    }

    const handleDeleteCoworking = async (coworkingId) =>{
            const responseDeleteCoworking = await fetch(`http://localhost:3001/api/coworkings/${coworkingId}`, {
                method : 'DELETE'
            })
            const jsonCoworkingDelete = await responseDeleteCoworking.json()
            setDeleteCoworkings(jsonCoworkingDelete.message)
    }

    useEffect(() =>{
        fetchDataAllCoworkings()
    }, [deleteCoworkings])
    return(
        <>
            <Header />
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