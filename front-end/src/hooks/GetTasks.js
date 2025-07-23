import axios from 'axios';
import { useEffect, useState } from 'react'



export default function GetTasks() {

    const [allTasks, setAllTasks] = useState([]);
    const [load , setLoad] = useState(true)

    useEffect(() => {

        const fetchData = async ()=>{
            await axios.get("http://localhost:8000/api/tasks")
            .then(res=>setAllTasks(res.data.tasks))
            .catch(err=>setAllTasks('error'))
            setLoad(false)
          }

        fetchData()

    }, []);


    return load ? 'load' : allTasks
}
