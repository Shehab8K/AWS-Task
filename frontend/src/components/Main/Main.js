import React from 'react'
import './Main.css'
import Cards from '../Cards/Cards'
import CollapsibleTable from '../Table/CollapsibleTable'
import { useEffect, useState } from "react";
import axios from "axios"


const Main = () => {

  const [buckets, setBuckets] = useState([]);
  const [object, setObjects] = useState([]);
  const [data, setData] = useState([]);

  // Get All Buckets to send count
  useEffect(() => {
    // Define a function to fetch data using Axios
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/buckets');
        setBuckets(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Get All Objects to send count
    async function fetchObjectData() {
      try {
        const response = await axios.get('http://localhost:5000/objects');
        setObjects(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Get All Buckets with objects and permissions
    async function fetchAllData() {
      try {
        const response = await axios.get('http://localhost:5000/objects-permission');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    // Call the fetch function
    fetchData();
    fetchObjectData();
    fetchAllData();
  }, []);

  const objectCount = object.reduce((acc, innerArray) => acc + innerArray.length, 0);
  const bucketCount = buckets.length;

  const cardData = [
    {
      name: "Buckets",
      count: bucketCount
    },
    {
      name: "Objects",
      count: objectCount
    }
  ]

  return (
    <div className='main'>
        <h1>Dashboard</h1>
        <Cards data={cardData}/>
        <CollapsibleTable data={data}/>
    </div>
  )
}

export default Main