import { UserModel } from './models/user.model.js'
import { ConversationModel } from './models/conversation.model.js'
import { mapContextData } from './utils.js'

class MondoDB {
    async createOrGetUser(from) {
        const user = mapContextData(from)

        try {
            const existingUser = await UserModel.findOne({
                telegramId: user.telegramId,
            })

            if (existingUser) return existingUser

            return await new UserModel({
                telegramId: user.telegramId,
                firstname: user.firstname,
                username: user.username,
            }).save()
        } catch (e) {
            console.log('Error in creating user', e.message)
        }
    }

    async saveConversation(messages, userId) {
        try {
            await new ConversationModel({
                messages,
                userId,
            }).save()
        } catch (e) {
            console.log('Error in creating conversation', e.message)
        }
    }

    async getConversations(userId) {
        try {
            return await ConversationModel.find({ userId })
        } catch (e) {
            console.log('Error in creating conversation', e.message)
        }
    }
}

export const mongo = new MondoDB()