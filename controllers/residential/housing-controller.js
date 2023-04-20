import people from './houses.js'
let users = people

const HousingController = (app) => {
    app.get('/api/houses', findUsers)
    app.get('/api/houses/:uid', findUserById);
    app.post('/api/houses', createHouse);
}

const findUsers = (req, res) => {
    const type = req.query.type
    if(type) {
        const usersOfType = users
            .filter(u => u.type === type)
        res.json(usersOfType)
        return
    }
    res.json(users)
}

const createHouse = (req, res) => {
    const newHouse = req.body;
    newHouse._id = (new Date()).getTime()+'';
    users.push(newHouse);
    res.json(newHouse);

}

const findUserById = (req, res) => {
    const userId = req.params.uid;
    console.log(userId);
    const user = users
        .find(u => u._id === userId);
    res.json(user);
}

export default HousingController;

