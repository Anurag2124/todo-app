const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/todo', async (req,res)=>{
  const title = req.body.title;
  const description = req.body.description;
  
  const result = createTodo.safeParse({
    title: title,
    description: description
  })

  if(!title || !description){
    return res.status(411).json({
      msg: "Inputs can't be empty"
    })
  }

  if(!result.success){
    return res.status(411).json({
      msg: "You sent wrong inputs"
    })
  }
  
  await todo.create({
    title,
    description,
    completed: false
  });

  res.json({
    msg: "Todo created"
  })
})

app.get('/todos', async (req,res)=>{
  const getTodos = await todo.find();
  res.json({
    todos: getTodos
  })
})

app.put('/completed/:id', async (req,res)=>{
  const id = req.params.id;

  const result = updateTodo.safeParse({
    id: id
  })

  if(!result.success){
    res.status(411).json({
      msg: "You sent wrong inputs"
    })
  }

  await todo.updateOne({_id: id},{completed: true});
  res.json({
    msg: "Todo marked as completed"
  })
})


app.use((err,req,res,next)=> {
  if(err){
    res.status(500).json({
      msg: "Something went wrong"
    })
  }
})

app.listen(3000);