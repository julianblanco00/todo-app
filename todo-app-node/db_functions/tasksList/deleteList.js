const { db } = require('../../includes/db')

const deleteList = async (list, cb) => {

    try{
        
        const result = await db.collection('tasks').where("listId", '==', list.id).get()
        
        if(!result.empty){
            result.forEach((doc) => {
                db.collection('tasks').doc(doc.id).delete()
                db.collection('lists').doc(list.id).delete()
            })
        }else{
            db.collection('lists').doc(list.id).delete()
        }
        
        cb(list)
    
    }catch(err){
        cb(err)
    }

}

module.exports = { delete: deleteList }