import { useState } from "react"

export function CreateTodo(){

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return <div>

    <input type="text" placeholder="title"
      onChange={(e)=>{
        setTitle(e.target.value)
      }}></input><br/><br/>

    <input type="text" placeholder="description"
      onChange={(e)=>{
        setDescription(e.target.value)
      }}></input><br/><br/>

    <button onClick={()=>{
      fetch("http://localhost:3000/todo",{
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description
        }),
        headers: {
          "Content-type": "application/json"
        }
      }).then(async (res)=>{
        const json = await res.json();
        alert("todo created");
      })
    }}>Add todo</button><br/>
  </div>
}