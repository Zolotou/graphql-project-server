const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const { getArgumentValues } = require('graphql/execution/values')
const users = [{id: 1, username: "VASIA", age:"15", }, {id: 2, username: "VAS2IA", age:"125", }]
let usersMessages = [{id: 1, post: "The post", date: "2021"}]

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
    const id = Date.now();
    const currentDate = new Date()
    const date = currentDate.getHours() + ":" + currentDate.getMinutes() 
    usersMessages.push({id, ...input, date})
    return {id, ...input, date}
  },
  deleteMessage:({input}) => {
    usersMessages = usersMessages.filter(message => message.id != input.id)
    return {id: "sdfsdf", post: "POST", success: users}
  }
}

app.use('/graphql', graphqlHTTP( {
  graphiql: true,
  schema,
  rootValue: resolver
}))

app.listen( 5000, () => console.log("server started on port 5000"))