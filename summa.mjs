import mongoose, { mongo } from 'mongoose';
const mongoUri = 'mongodb+srv://admin:freelance@cluster0.l1ziz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const start = async () => {
    const k = await mongoose.connect(uri)
    console.log('connected')
    console.log(await k.modelNames())
}

const schema = new mongoose.Schema({
    botToken: {
        type: String,
        required: true
    },
    botUsername: {
        type: String,
        required: true,
    },
    publicChannelUserName: {
        type: String,
        required: true,
    },
    contactAdmin: {
        type: String,
        required: true,
    },
    poweringGroupLog: {
        type: String,
        required: true,
    },


})

start()