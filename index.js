const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const users = [{id: 1, username: "VASIA", age:"15", }]
const usersMessages = [{id: 1, post: "The post", date: "2021"}]

const app = express()
app.use(cors())

const createUser = (input) => {
  const id = Date.now()
  return {
    id, ...input
  }
}

const resolver = {
  getAllUsers: () => {
    return users
  },
  getAllMessages: () => {
    return usersMessages
  },
  getMessage: ({id}) => {
    return usersMessages.find(post => post.id == id)
  },
  getUser: ({id}) => {
    return users.find(user => user.id == id)
  },
  createUser: ({input}) => {
    const user = createUser(input)
    users.push(user)
    return user
  },
  createMessage:({input}) => {
    const id = Date.now()
    const date = 123456
    usersMessages.push({id, ...input, date})
    return {id, ...input, date}
  }
}

app.use('/graphql', graphqlHTTP( {
  graphiql: true,
  schema,
  rootValue: resolver
}))

app.listen( 5000, () => console.log("server started on port 5000"))