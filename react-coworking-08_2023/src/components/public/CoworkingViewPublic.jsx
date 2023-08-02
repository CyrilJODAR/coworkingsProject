import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const CoworkingViewPublic = () =>{

    const { id } = useParams()
    const [coworking, setCoworking] = useState()

    const fetchSingleCoworking = async () =>{
        const responseCoworking = await fetch(`http://localhost:3001/api/coworkings/${id}`) 
        const jsonCoworking = await responseCoworking.json()
        setCoworking(jsonCoworking.data)
    }
useEffect(()=>{
    fetchSingleCoworking()
},[])

// J'AI MES DATAS MAIS FAUT AFFICHER LE SINGLE COWORKING SIUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU + créer component affichage single
    return (
        22
    )
}
export default CoworkingViewPublic