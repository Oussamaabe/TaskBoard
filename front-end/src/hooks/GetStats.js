import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { useEffect, useState } from 'react'

export default function GetStats() {
    const { userId } = useAuth();
  const [stats, setStats] = useState([]);
  const [load , setLoad] = useState(true)



    useEffect(() => {
      const fetchData = async () => {
        await axios
          .get(`http://localhost:8000/api/stats/${userId}`)
          .then((res) => setStats([res.data]))
          .catch((error) => setStats("error fetching stats", error));
          setLoad(false)
      };
      fetchData();
    }, [userId]);


    return load ? 'load' : stats;
}
