const { db } = require('../../includes/db')

const getLists = async (cb) => {

    try{
        const lists = await getOnlyLists(cb)
        const tasks = await getTasks(cb)

        cb({lists, tasks})
    
    }catch(err){

        cb({err})
    }

}

const getOnlyLists = async () => {

    let result = []
    let snapshot = await db.collection('lists').get()

    try{
        snapshot.forEach((doc) => {

            const list = {
                ...doc.data(),
                id: doc.id,
            }

            result.push(list)
        });

        return result

    } catch(err) {
        console.log('Error getting documents', err);
        throw err
    }
} 

const getTasks = async () => {

    let result = {}
    let snapshot = await db.collection('tasks').get()

    try{
        snapshot.forEach((doc) => {

            const task = {
                ...doc.data(),
                id: doc.id,
            }

            result[doc.id] = task
        });

        return result

    } catch(err) {
        console.log('Error getting documents', err);
        throw err
    }
}

module.exports = {get: getLists}