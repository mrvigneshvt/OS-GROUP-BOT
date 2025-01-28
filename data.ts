import mongoose, { Collection, connection, mongo } from "mongoose";
import { fileModel, groupModel, IUser, userModel } from "./model";
import { formatBytes } from "./plugins";
import {
  isValid,
  startOfToday,
  endOfDay,
  format,
  addDays,
  isPast,
  parseISO,
  closestIndexTo,
  isThisSecond,
} from "date-fns";
import { Client, ID, is } from "@mtkruto/node";
import { group } from "console";
import { Markup } from "./markup";

export class DataBase {
  private mongoUri;
  private db: undefined | any;
  private botModels: undefined | any;

  constructor(mongoUri: string) {
    this.mongoUri = mongoUri;
    this.botModels = undefined;
    this.db = undefined;
  }

  public async botModel(query: string) {
    try {
      if (!this.db) {
        throw new Error("CORRUPT when CHECKING MODELS!");
      }

      this.botModels = this.db.collection("botmodels");

      const result = await this.botModels.find({ botToken: query }).toArray(); // Convert cursor to array
      return result;
    } catch (error) {
      console.log("error in botModel::::", error);
      return null;
    }
  }

  public async editBotModel(token: string, query: string, key: string) {
    try {
      if (!this.botModels) {
        throw new Error("No Bot Model Assigned Can be FOUND!");
      }

      if (key === "fileLog") {
        await this.botModels.findOneAndUpdate(
          { botToken: token },
          { $push: { [key]: query } }
        );
      } else {
        await this.botModels.findOneAndUpdate(
          { botToken: token },
          { $set: { [key]: query } }
        );
      }

      return true;
    } catch (error) {
      console.log("error in editBotModel:::", error);
      return false;
    }
  }

  public async connectDB() {
    try {
      console.log("Connecting to the DB........");
      console.log(this.mongoUri);
      await mongoose.connect(this.mongoUri);

      this.db = mongoose.connection.db;
      console.log("connected......");
    } catch (error) {
      console.error("Error while connecting to DB:", error);
      throw new Error("Crashing due to DB connection failure");
    }

    console.log("Connected to the DB successfully!");
  }

  public async sendFile(uniqueId?: string, uniqueIds?: string[]) {
    try {
      let file;
      if (uniqueIds) {
        file = await fileModel.find({ fileUniqueId: uniqueId });
      } else {
        file = await fileModel.findOne({ fileUniqueId: uniqueId });
      }

      return file;
    } catch (error) {
      console.log("error in sendFile:::::", error);
    }
  }

  public async setShortner(
    userId: string,
    groupId: string,
    apiUrl: string,
    apiToken: string
  ) {
    try {
      let isExist = await groupModel.findOneAndUpdate(
        { userGroupId: groupId },
        {
          userApi: apiUrl,
          userApiToken: apiToken,
          userPowering: true,
        }
      );

      if (!isExist) {
        console.log("userNotExist");
        await this.newGroup(groupId, userId);
        await groupModel.findOneAndUpdate(
          { userGroupId: groupId },
          {
            userApi: apiUrl,
            userApiToken: apiToken,
            userPowering: true,
          }
        );
        return;
      }

      return;
    } catch (error) {
      console.log("error in setShortner:::", error);
    }
  }

  public async setTutorial(userId: string, groupId: string, fileId: string) {
    try {
      let isExist = await groupModel.findOneAndUpdate(
        { userGroupId: groupId },
        {
          userTutorial: fileId,
        }
      );

      console.log(isExist, "isexxxist");

      if (!isExist) {
        console.log("userNotExist");
        await this.newGroup(groupId, userId);
        await groupModel.findOneAndUpdate(
          { userGroupId: groupId },
          {
            userTutorial: fileId,
          }
        );
      }

      return;
    } catch (error) {
      console.log("error in setTutorial:::;", error);
    }
  }

  public async poweringGroups(): Promise<any | false> {
    try {
      const data = await groupModel.find({});
      return data;
    } catch (error) {
      console.log("error getting poweingGroups::", error);
      return false;
    }
  }
  public async newGroup(groupId: string, ownerUserId: string) {
    try {
      const isExist = await groupModel.findOne({ userGroupId: groupId });

      if (!isExist) {
        await groupModel.create({
          userId: ownerUserId,
          userGroupId: groupId,
          userPowering: false,
        });

        console.log("group didnt exist created new");

        return;
      }

      console.log("group already");

      return;
    } catch (error) {
      console.log("error in  newGroup DAtA:::", error);
    }
  }

  public async isFreeTrialUsed(id: string) {
    try {
      const data = await userModel.findOne({ userId: id });

      if (data?.isFreeTrialUsed) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("error in freeteialuseddata::::", error);
    }
  }

  public async Unlock(
    id: string,
    client?: Client,
    days?: number,
    isFreeTrial?: boolean
  ): Promise<void> {
    try {
      console.log(days, "daysss");
      const currentDate = new Date();

      // Format current date for 'verifiedAt'
      const updateData: any = {
        verified: true,
        verifiedAt: format(currentDate, "yyyy-MM-dd HH:mm:ss"),
      };

      // Determine the 'verifiedTill' date based on free trial or premium plan
      if (isFreeTrial) {
        updateData.isFreeTrialUsed = true;
        updateData.verifiedTill = format(
          endOfDay(currentDate),
          "yyyy-MM-dd HH:mm:ss"
        );
      } else if (days) {
        const futureDate = addDays(currentDate, days);
        updateData.verifiedTill = format(futureDate, "yyyy-MM-dd HH:mm:ss"); // Always use the future date
      } else {
        updateData.verifiedTill = format(
          endOfDay(currentDate),
          "yyyy-MM-dd HH:mm:ss"
        );
      }

      // Update user in the database
      const user = await userModel.findOneAndUpdate(
        { userId: id },
        { $set: updateData }
      );

      // Handle client messaging
      if (client) {
        if (isFreeTrial || !days) {
          const del = await client.sendMessage(id, "Unlocked Till MIDNIGHT!");
          setTimeout(async () => {
            await client.deleteMessage(id, del.id);
          }, 300000); // 5 minutes
        } else if (days) {
          await client.sendMessage(
            id,
            `!! Premium Plan Added !!\n\nDays: ${days}`
          );
        }
      }
    } catch (error) {
      console.error("Error in Unlock:", error);
      throw error; // Rethrow to handle or log further
    }
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

  public async adminReport(ads: boolean): Promise<string> {
    try {
      console.log("admi");

      const Ads = ads ? "✅" : "❎";
      const todayFormatted = format(startOfToday(), "yyyy-MM-dd");

      const [
        userDetails,
        primeUserCount,
        bannedUserCount,
        totalFiles,
        totalGroup,
        todayUnlockCount,
      ] = await Promise.all([
        userModel.countDocuments({}), // Count total users
        userModel.countDocuments({ verified: true }), // Count verified users
        userModel.countDocuments({ valid: false }), // Count banned users
        fileModel.countDocuments({}), // Count total files
        groupModel.countDocuments({}), // Count total groups
        userModel.countDocuments({
          verifiedAt: {
            $regex: `^${todayFormatted}`, // Count today's unlocked users (date string comparison)
          },
        }),
      ]);

      // Now you can use userDetails, primeUser, bannedUser, totalFiles, and totalGroup

      return Markup.adminReportCaption(
        userDetails,
        primeUserCount,
        bannedUserCount,
        todayUnlockCount,
        totalFiles,
        Ads,
        totalGroup
      );

      //return passingData(userDetails, primeUser, unlockCount,)
    } catch (error) {
      console.log("errror in admin report::::", error);

      return "";
    }
  }

  public async isFileExist(
    query: string,
    lim?: number,
    offset?: number
  ): Promise<any[]> {
    try {
      console.log(query);
      const raw_pattern = query
        .replace(/['’]?s/g, "(?:['’]?[sS])?") // Optional 's' or 'S' with or without apostrophe
        .replace(/ /g, ".*[\\s\\.\\+\\-_\\(\\)\\[\\]]?"); // Flexible separator handling

      // Compile the regex, making it case-insensitive with 'i' flag
      const regex = new RegExp(raw_pattern, "i");

      // Perform the search with the compiled regex
      if (lim && offset) {
        const files = await fileModel
          .find({ fileName: { $regex: regex } })
          .sort({ _id: -1 })
          .skip(offset * 5)
          .limit(lim);
        return files;
      } else {
        const files = await fileModel
          .find({ fileName: { $regex: regex } })
          .limit(50)
          .sort({ _id: -1 });
        return files;
      }
    } catch (error) {
      console.log(error);
      return [];
    }
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

  public async changeValid(id: string, val: boolean) {
    try {
      if (val) {
        await userModel.findOneAndUpdate(
          { userId: id },
          {
            $set: {
              valid: true,
            },
          }
        );

        return;
      }

      await userModel.findOneAndUpdate(
        { userId: id },
        {
          $set: {
            valid: false,
          },
        }
      );

      return;
    } catch (error) {}
  }
  public async isExist(id: string): Promise<IUser | any> {
    try {
      const exist = await userModel.findOne({ userId: id });

      if (!exist) {
        console.log("adding new user");
        await this.addUser(id);
        return await this.isExist(id);
      }

      console.log("user existed");
      return exist; // This is of type IUser
    } catch (error) {
      console.log(error);
      // Handle error and return false
    }
  }

  public async isVerified(id: string): Promise<Boolean | String> {
    try {
      let user: any = await userModel.findOne({ userId: id });

      if (!user) {
        await this.addUser(id);
        user = await userModel.findOne({ userId: id });
      }

      if (!user.valid) {
        return "ban";
      }

      if (!user.verified) {
        return "notVerified";
      }

      const premiumExpired = isPast(parseISO(String(user.verifiedTill)));

      console.log(premiumExpired, "premium status");

      if (premiumExpired) {
        user.verified = false;
        user.verifiedAt = "";
        user.verifiedTill = "";
        await user.save(); // Save the updated user object
        return "notVerified";
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public async checkFile(query: string) {
    try {
      await fileModel.find({ fileName: query });
    } catch (error) {
      console.log("Error in checkFile:", error);
    }
  }
  public async addFile(
    data: {
      fileName: string;
      mimeType: string;
      fileId: string;
      fileUniqueId: string;
      fileSize: number;
    },
    datas?: { done: number; skip: number },
    fileChannelId?: ID,
    FileChannelName?: string
  ) {
    try {
      await fileModel.create({
        fileName: this.sanitizeFileName(data.fileName),
        fileMimeType: data.mimeType,
        fileId: data.fileId,
        fileUniqueId: data.fileUniqueId,
        fileSize: formatBytes(data.fileSize),
        fileChannelName: FileChannelName,
        fileChannelId: fileChannelId,
      });
      if (datas) {
        datas.done++;
      }
      console.log("saved file from fileLogs");
    } catch (error) {
      if (datas) {
        datas.skip++;
      }
      console.log("Error in addFile:", error);
    }
  }

  private sanitizeFileName = (fileName: string) => {
    return fileName
      .replace(/[\s,.]+/g, "_") // Replace spaces, commas, and periods with underscores
      .replace(/[^a-zA-Z0-9_]/g, "") // Remove any characters that are not alphanumeric or underscores
      .replace(/_+/g, "_") // Replace multiple underscores with a single underscore
      .replace(/^_+|_+$/g, ""); // Remove leading or trailing underscores
  };

  private async addUser(id: string) {
    try {
      let date: Date | string = new Date();
      date = date.toLocaleDateString();

      await userModel.create({
        userId: id,
        verified: false,
      });
    } catch (error) {
      console.log("error in addUser:");
      console.log(error);
    }
  }
}
