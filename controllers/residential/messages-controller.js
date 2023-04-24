import * as messagesDao from "./messages-dao.js";


const MessagesController = (app) => {
    app.get('/api/messages', findMessages)
    app.post('/api/messages', createMessage)
    app.get("/api/messages/user/:userId", findMessagesByUserId);
}

const findMessages = async (req, res) => {
    const message = await messagesDao.findMessages()
    res.json(message)
}

const findMessagesByUserId = async (req,res) => {
    const companies = await messagesDao.findMessagesByUserId(req.params.userId);
    res.json(companies);
}
const createMessage = async (req, res) => {
    const newMessage = req.body;
    newMessage._id = (new Date()).getTime() + '';
    const insertedMessage = await messagesDao
        .createMessages(newMessage);
    res.json(insertedMessage);
}


export default MessagesController;