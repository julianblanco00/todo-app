const { db } = require('../../includes/db')
const admin = require('firebase-admin');

const deleteTask = async (task, cb) => {

    db.collection('tasks').doc(task.id).delete()

    const listsRef = db.collection('lists').doc(task.listId)

    await listsRef.update({
        tasks: admin.firestore.FieldValue.arrayRemove(task.id)
    })

    cb(task)
}

module.exports = { delete: deleteTask }