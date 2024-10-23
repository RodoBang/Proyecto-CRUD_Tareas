const {db} = require('../firebaseConfig');

async function createTask(uid, data) { // Asegúrate de pasar el uid aquí
    try {
        const newTask = {
            title: data.title,
            description: data.description,
            completed: false,  // Estado inicial de la tarea
            createdAt: new Date(),
            uid: uid  // Asignar el uid al crear la tarea
        };
        const docRef = await db.collection('tasks').add(newTask); // Verifica el nombre 'tasks'
        return { id: docRef.id, ...newTask };
    } catch (error) {
        console.error("Error al crear tarea:", error);
        throw new Error("No se pudo crear la tarea");
    }
}

async function getTask(uid){
    try{
        const tasksSnapshot = await db.collection('tasks').where('uid', '==', uid).get();
        const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
        return tasks;
    }catch(error){
        console.error('Error al obtener tareas:', error);
        throw new Error('No se pudieron obtener las tareas');
    }
}

async function updateTask(uid, taskId, data){
    try{
        const taskRef = db.collection('tasks').doc(taskId);
        const taskDoc = await taskRef.get();
        if(!taskDoc.exists || taskDoc.data().uid !== uid){
            throw new Error('Tarea no encontrada');
        }
        await taskRef.update(data);
        const updatedTask = await taskRef.get();
        return { id: taskId, ...updatedTask.data()};
    }catch(error){  
        console.error('Error al actualizar tarea:', error);
        throw new Error('No se pudo actualizar la tarea');
    }
}

async function deleteTask(uid, taskId){
    try{
        const taskRef = db.collection('tasks').doc(taskId);
        const taskDoc = await taskRef.get();
        if(!taskDoc.exists || taskDoc.data().uid !== uid){
            throw new Error('No autorizado o tarea no encontrada');
        }
        await taskRef.delete();
        return { message: 'Tarea eliminada correctamente' };
    }catch(error){
        console.error('Error al eliminar tarea:', error);
        throw new Error('No se pudo eliminar la tarea');    
    }
}

module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask
};