import * as messagesDao from "./messages-dao.js";
import * as housingDao from "./housing-dao.js";


const MessagesController = (app) => {
    app.get('/api/messages', findMessages)
    app.post('/api/messages', createMessage)
}

const findMessages = async (req, res) => {
    // const type = req.query.type
    // if(type) {
    //     const messageOfType = texts
    //         .filter(u => u.type === type)
    //     res.json(messageOfType)
    //     return
    // }
    const message = await messagesDao.findMessages()
    res.json(message)
}

const createMessage = async (req, res) => {
    const newMessage = req.body;
    newMessage._id = (new Date()).getTime() + '';
    const insertedMessage = await messagesDao
        .createMessages(newMessage);
    res.json(insertedMessage);
}


export default MessagesController;