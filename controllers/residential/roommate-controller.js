import * as roommatesDao from './roommate-dao.js'

const RoommateController = (app) => {
    app.get('/api/roommate', findRoommate)
    app.post('/api/roommate', createRoommate)
}

const findRoommate = async (req, res) => {
    // const type = req.query.type
    // if(type) {
    //     const peopleOfType = people
    //         .filter(u => u.type === type)
    //     res.json(peopleOfType)
    //     return
    // }
    // res.json(people)
    const roommate = await roommatesDao.findRoommates()
    res.json(roommate)
}

const createRoommate = async(req, res) => {
    const newPeople = req.body;
    newPeople._id = (new Date()).getTime() + '';
    const insertedRoommate = await roommatesDao
        .createRoommates(newPeople);
    res.json(insertedRoommate);
}


export default RoommateController;