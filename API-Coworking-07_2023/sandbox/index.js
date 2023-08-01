// SPREAD OPERATOR

const { ValidationError } = require("sequelize")

// pour les tableaux
// const arr1 = [2, 4, 7]
// const arr2 = [3, 5, 8]

// const newArr = [1, ...arr2, "hello", "world"]

// console.log(newArr)

// pour les objets

const amir = {
    name: 'Amir',
    age: 36
}

const amirWithEmail = {
    ...amir,
    email: 'amir@example.com'
}

// console.log(amirWithEmail)

const oldAmir = {
    ...amir,
    age: 37
}

// console.log(oldAmir)

// Exercices
const arr1 = ["Bonjour", "tout", "le monde"]
const arr2 = ["Salut", "à tous"]
const arr3 = ["je m'appelle", "mon nom est"]
const arr4 = ["Paul", "Doazan"]
const arr5 = ["Antoine", "Dupont"]

// à l'aide du spread operator, créer pour chaque phrase un seul tableau, qui sera ensuite parcouru :

// Bonjour tout le monde je m'appelle Antoine Dupont
const newArr1 = [...arr1, arr3[0], ...arr5]
const result = newArr1.join(' ')

// Salut à tous mon nom est Paul Doazan
const newArr2 = [...arr2, arr3[1], ...arr4]
const result2 = newArr2.join(' ')

// console.log(result2)

// CONFUSION AVEC LE REST PARAMETER
function sum(...params) {
    let total = 0
    params.forEach((element) => {
        total += element
    })
    return total
}

// console.log(sum(4, 5, 7, 1, 4))


// --------------------------------

// LES PROMESSES

const maPromesse = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('toto');
    }, 3000);
});

maPromesse
    .then((result) => {
        throw new Error('erreur toto')
        return result += ' tata'
    })
    .then(result => {
        return result += ' !'
    })
    .then(resultat => {
        console.log(resultat);
    })
    .catch(err => {
        console.log(err);
    })

// PRECISIONS sur les valeurs retournées des fonctions
function createCar() {
    let car = {
        brand: 'Citroen',
        type: 'diesel',
        create: () => {
            console.log('salut depuis la fenetre de ma citroen')
        },
        destroy: () => {

        },
        update: () => {

        }
    }

    return car
}

let myCitroen = createCar()

myCitroen.create()
myCitroen.destroy()
myCitroen.update()

let nb1 = 3
let nb2 = 4
let nbResult = 0

const sayHello = (seq, types) => {
    nbResult = nb1 + nb2
    return 'monModele'
}

const model = sayHello('sequelize', 'DataTypes');
console.log(nbResult, model)

const btn = document.querySelector('.my-btn')
btn.addEventListener('click', (event) => {
    const myFunction = (monParam) => {
        console.log(event, monParam)
    }
    myFunction()
})

// --------------- CLARIFICATION sur l'usage des Classes en javascript

// if(error instanceof ValidationError){

// }

class Identity {
    firstname;
    lastname;
    constructor(fParameter, lParameter) {
        this.firstname = fParameter
        this.lasttname = lParameter
    }
    sayHello = () => {
        return `Bonjour  ${this.firstname} ${this.lastname} !!!`;
    }
}

const myIdentity = new Identity('Paul', 'Doazan')
const myIdentity_2 = new Identity('Pierre', 'Doazan')
const myIdentity_3 = new Identity('Mathilde', 'Doazan')

myIdentity.lastname

const name = myIdentity_3.sayHello()

const myNumber = 12

// if(myNumber instanceof Identity) =====> false
// if(myIdentity_2 instanceof Identity) =====> true
