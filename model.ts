import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    userId: string;
    verified: boolean;
    verifiedAt: string;
    verifiedFor?: number;
    verifiedTill: string;
    valid: boolean;
    isPowered: boolean;
    freeTrialDate: string,
    isFreeTrialUsed: boolean
    poweringChatId: string,
    poweringApi: string,
    poweringTutorial: string,
}

interface IGroup extends Document {
    userId: string,
    userGroupId: string,
    userPowering: boolean,
    userApi: string,
    userApiToken: string,
    userTutorial: string,
}

interface IFile extends Document {
    fileName: string;
    fileId: string;
    fileUniqueId: string;
    fileMimeType: string
    fileSize: string
    fileChannelName: string
    fileChannelId: string
    fileMsgId: number

}

const groupSchema = new Schema<IGroup>({
    userId: {
        type: String,
        required: true,
    },
    userGroupId: {
        type: String,
        required: true,
        unique: true,
    },
    userPowering: {
        type: Boolean,
        default: false,
    },
    userApi: {
        type: String,
    },
    userApiToken: {
        type: String,
    },
    userTutorial: {
        type: String,
    }

})

const userSchema = new Schema<IUser>({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verifiedAt: {
        type: String,
        required: false,
    },
    verifiedTill: {
        type: String,
    },
    valid: {
        type: Boolean,
        default: true,
        required: true,
    },
    isPowered: {
        type: Boolean,
        default: false,
    },
    poweringChatId: {
        type: String,
    },
    poweringApi: {
        type: String,
    },
    poweringTutorial: {
        type: String,
    },
    isFreeTrialUsed: {
        type: Boolean,
        default: false,

    }
});



const fileSchema = new Schema<IFile>({
    fileName: {
        type: String,
        required: true,
    },
    fileId: {
        type: String,
        required: true,
    },
    fileUniqueId: {
        type: String,
        required: true,
        unique: true,
    },
    fileMimeType: {
        type: String,
        required: true,
    },
    fileSize: {
        type: String,
        required: true,
    },
    fileChannelName: {
        type: String,
        required: true,
    },
    fileChannelId: {
        type: String,
    },
    fileMsgId: {
        type: Number,
    }
})

// Create a Mongoose model
export const userModel = mongoose.model<IUser>('User', userSchema);
export const fileModel = mongoose.model<IFile>("File", fileSchema)
export const groupModel = mongoose.model<IGroup>("Group", groupSchema)



