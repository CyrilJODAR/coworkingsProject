import { useEffect, useState } from "react"
import HeaderAdmin from "../../components/admin/HeaderAdmin"
import { useNavigate, useParams } from "react-router-dom"
import Cookies from "js-cookie"
import { RoleUserCheck } from "../../components/admin/RoleUserCheck"

const CoworkingUpdate = () =>{

    const { id } = useParams()
    const navigate = useNavigate()
    const [coworking, setCoworking] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [counter, setCounter] = useState(3)

    if(!Cookies.get('session')) navigate('/login')

    const CoworkingDefaultValue = async () =>{
        const fetchDataCoworking = await fetch(`http://localhost:3001/api/coworkings/${id}`)
        const jsonFetchDataCoworking = await fetchDataCoworking.json()
        setCoworking(jsonFetchDataCoworking.data)
    }

    const handleSubmitCoworkingUpdate = (event) =>{

        event.preventDefault()

        const name = event.target.name.value
        const priceHour = parseFloat(event.target.price_hour.value)
        const priceDay = parseFloat(event.target.price_day.value)
        const priceMonth = parseFloat(event.target.price_month.value)
        const superficy = parseInt(event.target.superficy.value)
        const capacity = parseInt(event.target.capacity.value)
        const addressNumber = parseInt(event.target.address_number.value)
        const addressStreet = event.target.address_street.value
        const addressPostCode = parseInt(event.target.address_postCode.value)
        const addressCity = event.target.address_city.value

        const dataCoworking = {
            name : name,
            price : {hour : priceHour, day : priceDay, month : priceMonth},
            superficy : superficy,
            capacity : capacity,
            address : {number : addressNumber, street : addressStreet, postCode : addressPostCode, city: addressCity}
            }
            
        const updatedCoworking = async () =>{
            try{
                const myUpdate = await fetch(`http://localhost:3001/api/coworkings/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(dataCoworking),
                    headers: {
                        "Content-Type": "application/json",
                    }})
                const JsonUpdatedCoworking = await myUpdate.json()
                setSuccessMessage(JsonUpdatedCoworking.message)
            } catch (error) {
                setErrorMsg(error)
            }
        }

        setInterval(() => {
            setCounter(count => count - 1);
        }, 1000);

        updatedCoworking()
        setTimeout(() => {
            navigate('/admin/coworkings')
        }, 3000);
    }

    useEffect(()=>{
        (async()=>{
            const myUserRole = await RoleUserCheck()
            if(myUserRole === 1) {navigate ('/')}
        })()
        CoworkingDefaultValue()
    },[successMessage,errorMsg])

    return(
    <>  
        <HeaderAdmin />
        <section className="sectionFormAdd">
            <h2>Ajouter un coworking :</h2>
            <h3 className="successMessage">{successMessage && `Succés ! vous allez être rediriger vers les coworkins dans ${counter} seconds`}</h3> <h3 className="errorMessage">{errorMsg && `Une erreur est intervenu, veuillez réessayer`}</h3>
            <form className="formAdd" onSubmit={handleSubmitCoworkingUpdate}>
                <div>
                    <label htmlFor="name">Nom :</label>
                    <input type="text" name="name" defaultValue={coworking && coworking.name}/>
                </div>
                <div>
                    <label htmlFor="price_hour">Prix / heure :</label>
                    <input type="number" name="price_hour" defaultValue={coworking && coworking.price.hour}/>

                    <label htmlFor="price_day">Prix / jour :</label>
                    <input type="number" name="price_day" defaultValue={coworking && coworking.price.day}/>

                    <label htmlFor="price_month">Prix / mois :</label>
                    <input type="number" name="price_month" defaultValue={coworking && coworking.price.month}/>
                </div>
                <div>
                    <label htmlFor="superficy">Superficie :</label>
                    <input type="number" name="superficy" defaultValue={coworking && coworking.superficy}/>

                    <label htmlFor="capacity">Capacité :</label>
                    <input type="number" name="capacity" defaultValue={coworking && coworking.capacity}/>
                </div>
                <div>
                    <label htmlFor="address_number">Numéro de rue :</label>
                    <input type="number" name="address_number" defaultValue={coworking && coworking.address.number}/>

                    <label htmlFor="address_street">Rue :</label>
                    <input type="text" name="address_street" defaultValue={coworking && coworking.address.street}/>

                    <label htmlFor="address_postCode">Code postal :</label>
                    <input type="text" name="address_postCode" defaultValue={coworking && coworking.address.postCode}/>

                    <label htmlFor="address_city">Ville :</label>
                    <input type="text" name="address_city" defaultValue={coworking && coworking.address.city}/>
                </div>
                <div>
                    <input type="submit" value="yes" />
                </div>
            </form>
        </section>
    </>
    )
}

export default CoworkingUpdate