import React, { useEffect, useState } from 'react';
import axios from "axios"
import ReactApexChart from 'react-apexcharts';
import './Chart.css'
import CircularProgress from '@mui/material/CircularProgress';

const Chart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  // Get All Buckets to send count
  useEffect(() => {
    // Get All Buckets with objects and permissions
    async function fetchAllData() {
      try {
        const response = await axios.get(`${apiBaseUrl}/objects-permission`);
        setData(response.data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      }
    }
    // Call the fetch function
    fetchAllData();
  }, [apiBaseUrl]);


  function chart() {
    const processedData = data.map(bucket => ({
      name: bucket.name,
      objectCount: bucket.objects ? bucket.objects.length : 0, // Add a conditional check
    }));
  
    const chartData = {
      labels: processedData.map(bucket => bucket.name),
      series: processedData.map(bucket => bucket.objectCount),
    };
  
    chartData['Bucket'] = chartData['series'];
    delete chartData['series'];

    const options = {
      chart: {
        type: 'donut',
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return value + ' Objects'; // Add ' Bucket' to the tooltip value
          },
        },
      },
      legend: {
        show: false, // Set the show property to false to hide the legends
      },
    };
    
    return (
      <ReactApexChart  options={options} series={chartData.Bucket} type='donut' />
    );
  }
  
  return (
    <div className='container'>
        <h3>Number of Objects in Buckets</h3>
        {
            loading? 
            <div className="waiting">
                <CircularProgress />
            </div>
            :
            chart()
           
        }
    </div>
  );
}

export default Chart