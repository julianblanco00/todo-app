const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const app = express()

const server = http.createServer(app)

const io = socketio(server)

const getLists = require('./db_functions/tasksList/getLists')
const addList = require('./db_functions/tasksList/addList')
const deleteList = require('./db_functions/tasksList/deleteList')
const updateList = require('./db_functions/tasksList/updateList')

const addTask = require('./db_functions/tasksList/addTask')
const updateTask = require('./db_functions/tasksList/updateTask')
const deleteTask = require('./db_functions/tasksList/deleteTask')

io.on('connection', (socket) => {

    socket.on('getLists', getLists.get)

    socket.on('addList', addList.add)

    socket.on('deleteList', deleteList.delete)

    socket.on('updateList', updateList.update)

    
    socket.on('addTask', addTask.add)

    socket.on('updateTask', updateTask.update)

    socket.on('deleteTask', deleteTask.delete)

})

server.listen(3000, () => {
    console.log('Server on port 3000');
})
