"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupModel = exports.fileModel = exports.userModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const groupSchema = new mongoose_1.Schema({
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
});
const userSchema = new mongoose_1.Schema({
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
const fileSchema = new mongoose_1.Schema({
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
});
// Create a Mongoose model
exports.userModel = mongoose_1.default.model('User', userSchema);
exports.fileModel = mongoose_1.default.model("File", fileSchema);
exports.groupModel = mongoose_1.default.model("Group", groupSchema);
