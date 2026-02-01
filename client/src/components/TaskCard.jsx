import {useNavigate} from "react-router-dom"

export function TaskCard({task}){
    const {title,description}=task
    const navigate=useNavigate()
    return(
        <div className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
        onClick={()=>{
            navigate(`/task/${task.id}`)
        }}>
            <h1 className="font-bold capitalize">{title}</h1>
            <p className="text-slate-400">{description.length>50?description.substring(0,50)+"..":description}</p>
            
        </div>
    )
}