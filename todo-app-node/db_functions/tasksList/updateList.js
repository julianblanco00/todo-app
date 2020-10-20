const { db } = require('../../includes/db')

const updateList = (list, cb) => {

    const updatedList = {
        comment: list.comment, 
        tasks: list.tasks,
        title: list.title
    } 

    db.collection('lists').doc(list.id).update({
        ...updatedList
    })

    cb(list)
}

module.exports = { update: updateList }