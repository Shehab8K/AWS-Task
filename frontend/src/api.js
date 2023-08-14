import axios from "axios"

const BASE_URL = 'http://localhost:5000'


export async function getBuckets(){
    const response = await axios.get(BASE_URL + '/buckets');
    let objects = response.data
    console.log(objects)
    return response.data;
} 

export async function getObjects(){
    const response = await axios.get(BASE_URL + '/objects');
    return response.data;
} 

export async function permissions(){
    const response = await axios.get(BASE_URL + '/objects-permission');
    return response.data;
} 