import mongoose, { mongo } from 'mongoose';
const uri = 'mongodb+srv://admin:admin@cluster0.8xj6euc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


const schema = new mongoose.Schema({

    botToken: {
        type: String,
        required: true,
        unique: true,
    },
    botUsername: {
        type: String,
        required: true,
    },
    publicChannelUName: {
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
    fileLog: {
        type: Array,
        required: true,
    },
    upiId: {
        type: String,
        required: true,
    },
    qrFileId: {
        type: String,
    },

});

const botModel = mongoose.model('botmodel', schema);

const data = {
    botToken: '7503916985:AAG9h6PjaiVVDj2Gl7sZI-OhfG_Gpa0poXA',
    botUsername: 'MachiXhubBot',
    publicChannelUName: 'SingleMachiOffll',
    contactAdmin: 'MachiXsupportBot',
    poweringGroupLog: '-1002269051306',
    fileLog: ['-1002094214421'],
    upiId: 'TeamMachiX@apl',
}

/*
const start = async () => {
    const k = await mongoose.connect(uri)
    console.log('connected')
    const is = await botModel.create({
        botToken: '7503916985:AAG9h6PjaiVVDj2Gl7sZI-OhfG_Gpa0poXA',
        botUsername: 'MachiXhubBot',
        publicChannelUName: 'SingleMachiOffll',
        contactAdmin: 'MachiXsupportBot',
        poweringGroupLog: '+1002269051306',
        fileLog: ['-1002094214421'],
        upiId: 'TeamMachiX@apl',
    })

    console.log(is)
}*/

start()


