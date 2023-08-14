import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import axios from "axios"

import './CollapsibleTable.css'
// This function is used to pass data from bucket and objects to return simple array for the table
function createData(name, owner, type, bucketPermission, oldObjects) {  

  const objects = oldObjects.map(obj => ({
    key: obj.key,
    size: obj.Size,
    storageClass: obj.StorageClass,
    displayName: obj.permissions[0]?.Grantee?.DisplayName || 'Unknown',
    permission: obj.permissions[0]?.Permission || 'No permission'
  }))
  return {
    name, owner, type, bucketPermission, objects
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.owner}</TableCell>
        <TableCell align="right">{row.type}</TableCell>
        <TableCell align="right">{row.bucketPermission}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Objects
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Storage Class</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Permission</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.objects.map((objectsRow) => (
                    <TableRow key={objectsRow.key}>
                      <TableCell>{objectsRow.key}</TableCell>
                      <TableCell>{objectsRow.size}</TableCell>
                      <TableCell>{objectsRow.storageClass}</TableCell>
                      <TableCell>{objectsRow.displayName}</TableCell>
                      <TableCell>{objectsRow.permission}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CollapsibleTable =() => {

      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);

      // Get All Buckets with their objects / permissions 
      useEffect(() => {
        // Define a function to fetch data using Axios
        async function fetchData() {
          try {
            const response = await axios.get('http://localhost:5000/objects-permission');
            setData(response.data);
            setLoading(false)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        // Call the fetch function
        fetchData();
      }, []);

      const rows = [];
      data.forEach(bucket => {
        const name = bucket.name;
        const owner = bucket.grants[0].Grantee.DisplayName;
        const type = bucket.grants[0].Grantee.Type;
        const bucketPermission = bucket.grants[0].Permission;
        const objects = bucket.objects;
      
        const newRow = createData(name, owner, type, bucketPermission, objects);
        rows.push(newRow)
      })


  return (  
    <div className='mainTable'>
    <h2>Overview</h2>  
    <TableContainer className='tableContainer' component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontWeight: 'bold' }}>Bucket</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align='center'>Owner</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align='center'>User Type</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align='center'>Permission</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='myTable'>
          {
            loading ? 
            <TableCell colSpan={5} align="center">
              <div className="waiting">
                <CircularProgress />
              </div>
            </TableCell>
            :
            rows.map((row) => (
            <Row key={row.name} row={row} />
          ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default CollapsibleTable;