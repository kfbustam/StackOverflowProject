var mongoose = require('mongoose');
const ConversationModel = require("../model/conversation.js")
const MessageModel = require("../model/message.js")

class Message {

    static createConversation = async (data) => {
        try {
            const newConversation = new ConversationModel({
                members: [data.sender, data.receiver],
              });
            
                const savedConversation = await newConversation.save();
               if(savedConversation)
               {
                   return savedConversation;
               }
               else return []

         }
         catch(err){
                 console.log(err);
                 console.log("Some unexpected error while creating a conversation")
         }

}

static getAllUserConversations = async (data) => {
    try {
        const conversations = await ConversationModel.find({
            members: { $in: [data] },
          });

           if(conversations)
           {
               return conversations;
           }
           else return []

     }
     catch(err){
             console.log(err);
             console.log("Some unexpected error while creating a conversation")
     }
}


static addMessageToConversation = async (data) => {
    try {
        const newMessage = new MessageModel({
            conversationId: data.conversationId,
            sender:data.sender,
            message:data.message
          });

          const saveMessage = await newMessage.save();

           if(saveMessage)
           {
               return saveMessage;
           }
           else return []

     }
     catch(err){
             console.log(err);
             console.log("Some unexpected error while creating a conversation")
     }
}

static getAllMessagesOfConversation = async (data) => {
    try {
        const messages = await MessageModel.find({
            conversationId: data,
          });

           if(messages)
           {
               return messages;
           }
           else return []

     }
     catch(err){
             console.log(err);
             console.log("Some unexpected error while getting messages of a conversation")
     }
}

}


module.exports.Message = Message;