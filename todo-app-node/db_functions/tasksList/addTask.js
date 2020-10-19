const { db } = require('../../includes/db')
const admin = require('firebase-admin');

const storeTask = async (params, cb) => {

    let addedTask = {}

    const newTask = await db.collection('tasks').add({
        ...params
    })

    const id = newTask.id

    let listsRef = db.collection('lists').doc(params.listId)
    
    listsRef.update({
        tasks: admin.firestore.FieldValue.arrayUnion( id )
    })

    const task = {
        ...params,
        id: id,
    }

    addedTask[id] = task

    cb({addedTask, id})
}

module.exports = {add: storeTask}