import React, { useState } from "react";
import "./Sidebar.css";

import { UilEstate } from '@iconscout/react-unicons'
import { UilClipboardAlt } from '@iconscout/react-unicons'
import { UilUsersAlt } from '@iconscout/react-unicons'
import { UilChartLine } from '@iconscout/react-unicons'
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <h2 className='logo'>Shehab</h2>

      <div className="menu">
        <div 
            className={selected===0 ? 'menuItem active': 'menuItem'}
            onClick={()=>setSelected(0)}>
                <div>
                    <UilEstate/>
                </div>
                <span>Dashboard</span>
            </div>

            <div 
            className={selected===1 ? 'menuItem active': 'menuItem'}
            onClick={()=>setSelected(1)}>
                <div>
                    <UilChartLine/>
                </div>
                <span>Link 1</span>
            </div>

            <div 
            className={selected===2 ? 'menuItem active': 'menuItem'}
            onClick={()=>setSelected(2)}>
                <div>
                    <UilUsersAlt/>
                </div>
                <span>Link 2</span>
            </div>

            <div             
            className={selected===3 ? 'menuItem active': 'menuItem'}
            onClick={()=>setSelected(3)}>
                <div>
                    <UilClipboardAlt/>
                </div>
                <span>Link 3</span>
            </div>
        {/* signoutIcon */}
        <div className="menuItem">
          <UilSignOutAlt className='signout'/>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
