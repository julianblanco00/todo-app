const { db } = require('../../includes/db')

const addList = async (data, cb) => {

    const createdList = await db.collection('lists').add({
        ...data
    })

    const obj = {
        ...data,
        id: createdList.id
    }
    
    cb(obj)
}

module.exports = {add: addList}