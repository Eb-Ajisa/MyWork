
import React, { useState } from 'react'

function ToDo()
{
    const [task, settask] = useState("")
    const [tasklist, addtolist] = useState<any>([])

    function handlechange(e: any){
        settask(e.target.value)
    }

    const removetask = (index : any) => {
        const newlist = tasklist.filter((_: any,i: any) => i !== index)
        addtolist(newlist)

    }

    const listadd = () =>{
        if (task.trim() !== ""){
            addtolist((t: any) => [...t,task]);
        }
    }

    const getupp = (index : any) => {
        if(index > 0)
        {
            const newwlist = [...tasklist];
            [newwlist[index], newwlist[index - 1]] = [newwlist[index - 1], newwlist[index]] 
            addtolist(newwlist);
        }
    }
    const getdown = (index : any) => {
        if(index < tasklist.length - 1)
        {
            const newwlistt = [...tasklist];
            [newwlistt[index], newwlistt[index + 1]] = [newwlistt[index + 1], newwlistt[index]] 
            addtolist(newwlistt)
        }

    }
    

    return(
        <div className="todoapp">
            <h1 className="title"> To Do List </h1>
            <input type="text" placeholder="Add A task" value={task} onChange={handlechange}></input>
            <button className="addButt" onClick={() => listadd()}> Add</button>
            <ol>
            {tasklist.map((task: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => <li key={index}>
                <span className='text'> {task} </span>
                <span className="Buttons">
                <button className='delete' onClick={() => removetask(index)}>Delete</button>
                <button className="upper" onClick={() => getupp(index)}> Go Up</button>
                <button className="downer" onClick={() => getdown(index)}> Go Down</button>
                </span>
                 </li>)}
            </ol>
        </div>
    )

}


export default ToDo