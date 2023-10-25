import React from 'react'
import { Tabs } from 'antd';
import { useSelector } from 'react-redux'
import Inventory from "./Inventory/Inventory"
import test from './test';


function Profile() {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <div>
      <Tabs>
        {currentUser.userType === "organization" && (<> 
          <Tabs.TabPane tab="Inventory" key="1">
              <Inventory />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Donars" key="2">
              
            </Tabs.TabPane>
            <Tabs.TabPane tab="Hospitals" key="3">
              
            </Tabs.TabPane>          </>
        )}

            
      </Tabs>
  
    </div>
  )
}

export default Profile
