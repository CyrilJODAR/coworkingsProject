import { useEffect, useState } from "react"
import Coworking from "../components/Coworking";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const CoworkingsPage = () =>{

    const [coworkings, setCoworkings] = useState([]);
    const [deleteCoworkings, setDeleteCoworkings] = useState(null);

    const fetchDataAllCoworkings = async () =>{
            const responseCoworkings = await fetch('http://localhost:3001/api/coworkings') 
            const jsonCoworkings = await responseCoworkings.json()
            setCoworkings(jsonCoworkings.data)
            console.log(jsonCoworkings.data)

    }

    const handleDeleteCoworking = async (coworking) =>{
            const responseDeleteCoworking = await fetch(`http://localhost:3001/api/coworkings/${coworking}`, {
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
            {deleteCoworkings != null && <p>{deleteCoworkings}</p>}
            <h2>Voici tout les coworkings</h2>
            <section className="CoworkingsList">
                {coworkings.length === 0 ?
                <h3>Loading ...</h3> :
                coworkings.map(coworking => (
                    <Coworking coworking={coworking} handleDeleteCoworking={handleDeleteCoworking} key={coworking.id}/>
                    ))}
                <Link className="addCoworking" to="/postCoworking">+</Link>
            </section>
        </>
    )
}

export default CoworkingsPage;