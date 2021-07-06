const {buildSchema} = require("graphql")

const schema = buildSchema(`
  type User {
    id: ID
    username: String
    age: Int
    messages: [Message]
  }
  type Message {
    id: ID
    post: String
    date: String
  }

  
  input MessageInput {
    id: ID
    post: String!
    date: String
  }
  
  input UserInput {
    id: ID
    username: String!
    age: Int!
    messages: [MessageInput]
  }

  input DeleteMessageInput {
    id: ID
    post: String
  }

  type DeleteMessage {
    id: ID
    success: [User]
    post: String
  }

  type Query {
    getAllUsers: [User]
    getAllMessages: [Message]
    getMessage(id: ID): User
    getUser(id: ID): User
  }

  type Mutation {
    createUser(input: UserInput): User
    createMessage(input: MessageInput): Message
    deleteMessage(input: DeleteMessageInput): DeleteMessage
  }
`
)

module.exports = schema