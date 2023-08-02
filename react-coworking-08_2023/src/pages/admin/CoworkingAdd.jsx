import { useNavigate } from "react-router-dom"
import HeaderAdmin from "../../components/admin/HeaderAdmin"
import { useEffect } from "react"
import { RoleUserCheck } from "../../components/admin/RoleUserCheck"
import Cookies from "js-cookie"

const CoworkingAdd = () =>{

    const navigate = useNavigate()
    if(!Cookies.get('session')) navigate('/login')

    const handleSubmitCoworking = async (event) =>{
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
            console.log(dataCoworking)

            await fetch(`http://localhost:3001/api/coworkings`, {
                method: 'POST',
                body: JSON.stringify(dataCoworking),
                headers: {
                    "Content-Type": "application/json",
                }})
          
    navigate("/admin/coworkings")
    }
    useEffect(()=>{
        (async()=>{
            const myUserRole = await RoleUserCheck()
            if(myUserRole === 1) {navigate ('/')}
        })()
    },[])

    return(
        <>  
            <HeaderAdmin />
            <section className="sectionFormAdd">
                <h2>Ajouter un coworking :</h2>
                <form className="formAdd" onSubmit={handleSubmitCoworking}>
                    <div>
                        <label htmlFor="name">Nom :</label>
                        <input type="text" name="name" />
                    </div>
                    <div>
                        <label htmlFor="price_hour">Prix / heure :</label>
                        <input type="number" name="price_hour"/>

                        <label htmlFor="price_day">Prix / jour :</label>
                        <input type="number" name="price_day" />

                        <label htmlFor="price_month">Prix / mois :</label>
                        <input type="number" name="price_month"/>
                    </div>
                    <div>
                        <label htmlFor="superficy">Superficie :</label>
                        <input type="number" name="superficy"/>

                        <label htmlFor="capacity">Capacité :</label>
                        <input type="number" name="capacity"/>
                    </div>
                    <div>
                        <label htmlFor="address_number">Numéro de rue :</label>
                        <input type="number" name="address_number"/>

                        <label htmlFor="address_street">Rue :</label>
                        <input type="text" name="address_street"/>

                        <label htmlFor="address_postCode">Code postal :</label>
                        <input type="text" name="address_postCode"/>

                        <label htmlFor="address_city">Ville :</label>
                        <input type="text" name="address_city"/>
                    </div>
                    <div>
                        <input type="submit" value="yes" />
                    </div>
                </form>
            </section>
        </>
    )
}

export default CoworkingAdd