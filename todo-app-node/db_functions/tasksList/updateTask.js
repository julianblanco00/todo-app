const { db } = require('../../includes/db')

const updateTask = async (task, cb) => {

    const updatedTask = {
        date: task.date,
        description: task.description,
        listId: task.listId,
        name: task.name
    }

    db.collection('tasks').doc(task.id).update({
        ...updatedTask
    })

    cb(task)
} 

module.exports = { update: updateTask }