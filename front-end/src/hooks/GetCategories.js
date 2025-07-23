import axios from 'axios';
import { useEffect, useState } from 'react'



export default function GetCategories() {

    const [allCategs, setAllCategs] = useState([]);
    const [load , setLoad] = useState(true)

    useEffect(() => {

        const fetchData = async ()=>{
            await axios.get("http://localhost:8000/api/categories")
            .then(res=>setAllCategs(res.data.categs))
            .catch(err=>setAllCategs('error'))
            setLoad(false)
          }

        fetchData()

    }, []);


    return load ? 'load' : allCategs
}

