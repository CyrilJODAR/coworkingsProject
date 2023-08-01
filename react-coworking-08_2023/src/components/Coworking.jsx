const Coworking = ({ coworking, handleDeleteCoworking }) =>{
    return(
        <article className="coworkingFlichknuck">
            <h3>{coworking.name}</h3>
            <p>{coworking.address.number} {coworking.address.street}, {coworking.address.postCode} {coworking.address.city}</p>
            <a href="#blank" className="btnInfo">Infos</a>
            <a href="#blank" className="btnSuppr" onClick={()=>{handleDeleteCoworking(coworking.id)}}>Supprimer</a>
        </article>
    )
}

export default Coworking