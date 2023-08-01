const mockCoworkings = require('./mock-coworkings')
const bcrypt = require('bcrypt')
const roles = require('./roles.json')

module.exports = (CoworkingModel, UserModel, RoleModel, ReviewModel) => {
    const rolePromises = roles.map(role => {
        return RoleModel.create({
            label: role
        })
    })

    Promise.all(rolePromises).then(() => {
        const userPromises = []
        userPromises.push(
            RoleModel.findOne({ where: { label: 'editor' } })
                .then(role => {
                    return bcrypt.hash('mdp', 10)
                        .then(hash => {
                            return UserModel.create({
                                username: 'Simon',
                                password: hash,
                                RoleId: role.id
                            })
                        })
                }),
            RoleModel.findOne({ where: { label: 'admin' } })
                .then(role => {
                    return bcrypt.hash('mdp', 10)
                        .then(hash => {
                            return UserModel.create({
                                username: 'Pierre',
                                password: hash,
                                RoleId: role.id
                            })
                        })
                })
        )
        Promise.all(userPromises)
            .then(() => {
                const coworkingPromises = mockCoworkings.map(mock => {
                    return CoworkingModel.create({
                        name: mock.name,
                        price: mock.price,
                        superficy: mock.superficy,
                        capacity: mock.capacity,
                        address: mock.address,
                        UserId: 1
                    });
                })
                Promise.all(coworkingPromises).then(() => {
                    ReviewModel.create({
                        content: 'Lorem Ipsum',
                        rating: 3,
                        UserId: 1,
                        CoworkingId: 10
                    })
                    ReviewModel.create({
                        content: 'Dolor sit amet',
                        rating: 5,
                        UserId: 2,
                        CoworkingId: 7
                    })
                })
            })
    })
}