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
    date: Int
  }

  
  input MessageInput {
    id: ID
    post: String!
    date: Int
  }
  
  input UserInput {
    id: ID
    username: String!
    age: Int!
    messages: [MessageInput]
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
  }
`
)

module.exports = schema