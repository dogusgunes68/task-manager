const pool = require("../db/db");

const createTodo = async(req,res)=>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *',[description]);//return insterted object using 'RETURNING *'
        res.status(201).json({
            status:'success',
            message:[newTodo.rows]
        });
    } catch (error) {
        res.status(error).json({
            error:`${error.message}`,
        });
    }
}

const getAllTodos = async(req,res) =>{
    try {
        const todos = await pool.query('SELECT * FROM todo');
        res.status(200).json({
            status:"success",
            data:[todos]
        })
    } catch (error) {
        res.status(500).json({
            error:`${error.message}`
        })
    }
}

const deleteTodo = async(req,res)=>{
    try {
        const id = req.params.todo_id;
        await pool.query('DELETE FROM todo WHERE todo_id=($1)',[id]);
        res.status(200).json({
            status:'success',
            message:'deleted'
        })
    } catch (error) {
        res.status(200).json({
            error:`${error.message}`
        })
    }
}

const updateTodo = async(req,res)=>{
    try {
        const {description} = req.body
        const id = req.params.todo_id;
        const updatedTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2',[description,id]);
        res.status(200).json({
            status:'success',
            data:updatedTodo
        })
    } catch (error) {
        res.status(500).json({
            error:`${error.message}`
        })
    }
}


module.exports = {
    createTodo,getAllTodos,deleteTodo,updateTodo
}