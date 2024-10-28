"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const model_1 = require("./model");
const plugins_1 = require("./plugins");
const date_fns_1 = require("date-fns");
const markup_1 = require("./markup");
class DataBase {
    constructor(mongoUri) {
        this.sanitizeFileName = (fileName) => {
            return fileName
                .replace(/[\s,.]+/g, '_') // Replace spaces, commas, and periods with underscores
                .replace(/[^a-zA-Z0-9_]/g, '') // Remove any characters that are not alphanumeric or underscores
                .replace(/_+/g, '_') // Replace multiple underscores with a single underscore
                .replace(/^_+|_+$/g, ''); // Remove leading or trailing underscores
        };
        this.mongoUri = mongoUri;
        this.botModels = undefined;
        this.db = undefined;
    }
    botModel(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.db) {
                    throw new Error('CORRUPT when CHECKING MODELS!');
                }
                this.botModels = this.db.collection('botmodels');
                const result = yield this.botModels.find({ botToken: query }).toArray(); // Convert cursor to array
                return result;
            }
            catch (error) {
                console.log('error in botModel::::', error);
                return null;
            }
        });
    }
    editBotModel(token, query, key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.botModels) {
                    throw new Error('No Bot Model Assigned Can be FOUND!');
                }
                if (key === 'fileLog') {
                    yield this.botModels.findOneAndUpdate({ botToken: token }, { $push: { [key]: query } });
                }
                else {
                    yield this.botModels.findOneAndUpdate({ botToken: token }, { $set: { [key]: query } });
                }
                return true;
            }
            catch (error) {
                console.log('error in editBotModel:::', error);
                return false;
            }
        });
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Connecting to the DB........');
                yield mongoose_1.default.connect(this.mongoUri);
                this.db = mongoose_1.default.connection.db;
                console.log('connected......');
            }
            catch (error) {
                console.error('Error while connecting to DB:', error);
                throw new Error('Crashing due to DB connection failure');
            }
            console.log('Connected to the DB successfully!');
        });
    }
    sendFile(uniqueId, uniqueIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let file;
                if (uniqueIds) {
                    file = yield model_1.fileModel.find({ fileUniqueId: uniqueId });
                }
                else {
                    file = yield model_1.fileModel.findOne({ fileUniqueId: uniqueId });
                }
                return file;
            }
            catch (error) {
                console.log('error in sendFile:::::', error);
            }
        });
    }
    setShortner(userId, groupId, apiUrl, apiToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isExist = yield model_1.groupModel.findOneAndUpdate({ userGroupId: groupId }, {
                    userApi: apiUrl,
                    userApiToken: apiToken,
                    userPowering: true,
                });
                if (!isExist) {
                    console.log('userNotExist');
                    yield this.newGroup(groupId, userId);
                    yield model_1.groupModel.findOneAndUpdate({ userGroupId: groupId }, {
                        userApi: apiUrl,
                        userApiToken: apiToken,
                        userPowering: true,
                    });
                    return;
                }
                return;
            }
            catch (error) {
                console.log('error in setShortner:::', error);
            }
        });
    }
    setTutorial(userId, groupId, fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isExist = yield model_1.groupModel.findOneAndUpdate({ userGroupId: groupId }, {
                    userTutorial: fileId,
                });
                console.log(isExist, 'isexxxist');
                if (!isExist) {
                    console.log('userNotExist');
                    yield this.newGroup(groupId, userId);
                    yield model_1.groupModel.findOneAndUpdate({ userGroupId: groupId }, {
                        userTutorial: fileId,
                    });
                }
                return;
            }
            catch (error) {
                console.log('error in setTutorial:::;', error);
            }
        });
    }
    poweringGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield model_1.groupModel.find({});
                return data;
            }
            catch (error) {
                console.log('error getting poweingGroups::', error);
                return false;
            }
        });
    }
    newGroup(groupId, ownerUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isExist = yield model_1.groupModel.findOne({ userGroupId: groupId });
                if (!isExist) {
                    yield model_1.groupModel.create({
                        userId: ownerUserId,
                        userGroupId: groupId,
                        userPowering: false,
                    });
                    console.log('group didnt exist created new');
                    return;
                }
                console.log('group already');
                return;
            }
            catch (error) {
                console.log('error in  newGroup DAtA:::', error);
            }
        });
    }
    isFreeTrialUsed(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield model_1.userModel.findOne({ userId: id });
                if (data === null || data === void 0 ? void 0 : data.isFreeTrialUsed) {
                    return true;
                }
                return false;
            }
            catch (error) {
                console.log('error in freeteialuseddata::::', error);
            }
        });
    }
    Unlock(id, client, days, isFreeTrial) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(days, 'daysss');
                const currentDate = new Date();
                // Format current date for 'verifiedAt'
                const updateData = {
                    verified: true,
                    verifiedAt: (0, date_fns_1.format)(currentDate, 'yyyy-MM-dd HH:mm:ss')
                };
                // Determine the 'verifiedTill' date based on free trial or premium plan
                if (isFreeTrial) {
                    updateData.isFreeTrialUsed = true;
                    updateData.verifiedTill = (0, date_fns_1.format)((0, date_fns_1.endOfDay)(currentDate), 'yyyy-MM-dd HH:mm:ss');
                }
                else if (days) {
                    const futureDate = (0, date_fns_1.addDays)(currentDate, days);
                    updateData.verifiedTill = (0, date_fns_1.format)(futureDate, 'yyyy-MM-dd HH:mm:ss'); // Always use the future date
                }
                else {
                    updateData.verifiedTill = (0, date_fns_1.format)((0, date_fns_1.endOfDay)(currentDate), 'yyyy-MM-dd HH:mm:ss');
                }
                // Update user in the database
                const user = yield model_1.userModel.findOneAndUpdate({ userId: id }, { $set: updateData });
                // Handle client messaging
                if (client) {
                    if (isFreeTrial || !days) {
                        const del = yield client.sendMessage(id, "Unlocked Till MIDNIGHT!");
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield client.deleteMessage(id, del.id);
                        }), 300000); // 5 minutes
                    }
                    else if (days) {
                        yield client.sendMessage(id, `!! Premium Plan Added !!\n\nDays: ${days}`);
                    }
                }
            }
            catch (error) {
                console.error('Error in Unlock:', error);
                throw error; // Rethrow to handle or log further
            }
        });
    }
    /* public async Unlock(id: string, client?: Client, days?: number, isFreeTrial?: boolean): Promise<void> {
         try {
             const currentDate = new Date();
             const updateData: any = {
                 verified: true,
                 verifiedAt: format(currentDate, 'yyyy-MM-dd HH:mm:ss')
             };
 
             if (isFreeTrial) {
                 updateData.isFreeTrialUsed = true;
                 updateData.verifiedTill = format(endOfDay(currentDate), 'yyyy-MM-dd HH:mm:ss');
             } else if (days) {
                 updateData.verifiedTill = format(addDays(currentDate, days), 'yyyy-MM-dd HH:mm:ss');
             } else {
                 updateData.verifiedTill = format(endOfDay(currentDate), 'yyyy-MM-dd HH:mm:ss');
             }
 
             const user = await userModel.findOneAndUpdate(
                 { userId: id },
                 { $set: updateData }
             );
 
             if (client) {
                 if (isFreeTrial || !days) {
                     const del = await client.sendMessage(id, "Unlocked Till MIDNIGHT!");
                     setTimeout(async () => {
                         await client.deleteMessage(id, del.id);
                     }, 300000); // 5 minutes
                 } else if (days) {
                     await client.sendMessage(id, `!! Premium Plan Added !!\n\nDays: ${days}`);
                 }
             }
         } catch (error) {
             console.error('Error in Unlock:', error);
             throw error; // Rethrow or handle based on your needs
         }
     }*/
    adminReport(ads) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('admi');
                const Ads = ads ? '✅' : '❎';
                const todayFormatted = (0, date_fns_1.format)((0, date_fns_1.startOfToday)(), 'yyyy-MM-dd');
                const [userDetails, primeUserCount, bannedUserCount, totalFiles, totalGroup, todayUnlockCount] = yield Promise.all([
                    model_1.userModel.countDocuments({}), // Count total users
                    model_1.userModel.countDocuments({ verified: true }), // Count verified users
                    model_1.userModel.countDocuments({ valid: false }), // Count banned users
                    model_1.fileModel.countDocuments({}), // Count total files
                    model_1.groupModel.countDocuments({}), // Count total groups
                    model_1.userModel.countDocuments({
                        verifiedAt: {
                            $regex: `^${todayFormatted}` // Count today's unlocked users (date string comparison)
                        }
                    })
                ]);
                // Now you can use userDetails, primeUser, bannedUser, totalFiles, and totalGroup
                return markup_1.Markup.adminReportCaption(userDetails, primeUserCount, bannedUserCount, todayUnlockCount, totalFiles, Ads, totalGroup);
                //return passingData(userDetails, primeUser, unlockCount,)
            }
            catch (error) {
                console.log('errror in admin report::::', error);
                return '';
            }
        });
    }
    isFileExist(query, lim, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(query);
                const raw_pattern = query
                    .replace(/['’]?s/g, "(?:['’]?[sS])?") // Optional 's' or 'S' with or without apostrophe
                    .replace(/ /g, '.*[\\s\\.\\+\\-_\\(\\)\\[\\]]?'); // Flexible separator handling
                // Compile the regex, making it case-insensitive with 'i' flag
                const regex = new RegExp(raw_pattern, 'i');
                // Perform the search with the compiled regex
                if (lim && offset) {
                    const files = yield model_1.fileModel.find({ fileName: { $regex: regex } }).sort({ _id: -1 }).skip(offset).limit(lim);
                    return files;
                }
                else {
                    const files = yield model_1.fileModel.find({ fileName: { $regex: regex } }).limit(50).sort({ _id: -1 });
                    return files;
                }
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
    /*
    public async isFileExist(query: string): Promise<any[]> {
        try {

            const queryWords = query.split(' ');

            // Initial regex to match the full query case-sensitively
            let pattern = `^${queryWords.join(' ')}`;

            // Progressively reduce the regex to match all but the last word(s)
            for (let i = queryWords.length - 1; i > 0; i--) {
                pattern += `|^${queryWords.slice(0, i).join(' ')}`;
            }

            // Create the regex without the 'i' flag to keep it case-sensitive
            const regex = new RegExp(pattern, 'i');

            // Perform the search with the case-sensitive regex
            const files = await fileModel.find({ fileName: { $regex: regex } })



            console.log(files.length);
            return files;
        } catch (error) {
            console.log(error);
            return [];
        }
    }*/
    changeValid(id, val) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (val) {
                    yield model_1.userModel.findOneAndUpdate({ userId: id }, {
                        $set: {
                            valid: true
                        }
                    });
                    return;
                }
                yield model_1.userModel.findOneAndUpdate({ userId: id }, {
                    $set: {
                        valid: false
                    }
                });
                return;
            }
            catch (error) {
            }
        });
    }
    isExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield model_1.userModel.findOne({ userId: id });
                if (!exist) {
                    console.log('adding new user');
                    yield this.addUser(id);
                    return yield this.isExist(id);
                }
                console.log('user existed');
                return exist; // This is of type IUser
            }
            catch (error) {
                console.log(error);
                // Handle error and return false
            }
        });
    }
    isVerified(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield model_1.userModel.findOne({ userId: id });
                if (!user) {
                    yield this.addUser(id);
                    user = yield model_1.userModel.findOne({ userId: id });
                }
                if (!user.valid) {
                    return 'ban';
                }
                if (!user.verified) {
                    return 'notVerified';
                }
                const premiumExpired = (0, date_fns_1.isPast)((0, date_fns_1.parseISO)(String(user.verifiedTill)));
                console.log(premiumExpired, 'premium status');
                if (premiumExpired) {
                    user.verified = false;
                    user.verifiedAt = '';
                    user.verifiedTill = '';
                    yield user.save(); // Save the updated user object
                    return 'notVerified';
                }
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    checkFile(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.fileModel.find({ fileName: query });
            }
            catch (error) {
                console.log('Error in checkFile:', error);
            }
        });
    }
    addFile(data, datas, fileChannelId, FileChannelName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.fileModel.create({
                    fileName: this.sanitizeFileName(data.fileName),
                    fileMimeType: data.mimeType,
                    fileId: data.fileId,
                    fileUniqueId: data.fileUniqueId,
                    fileSize: (0, plugins_1.formatBytes)(data.fileSize),
                    fileChannelName: FileChannelName,
                    fileChannelId: fileChannelId,
                });
                if (datas) {
                    datas.done++;
                }
                console.log('saved file from fileLogs');
            }
            catch (error) {
                if (datas) {
                    datas.skip++;
                }
                console.log('Error in addFile:', error);
            }
        });
    }
    addUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let date = new Date();
                date = date.toLocaleDateString();
                yield model_1.userModel.create({
                    userId: id,
                    verified: false,
                });
            }
            catch (error) {
                console.log('error in addUser:');
                console.log(error);
            }
        });
    }
}
exports.DataBase = DataBase;
