import React from 'react'
import { Tabs } from 'antd';
import { useSelector } from 'react-redux'
import Inventory from "./Inventory/Inventory"
import test from './test';
import Donors from './Donor/Donors';
import Hospital from './Hospital/hospital';
import Organization from '../Profile/Organization/organization'
import InventoryTable from '../../components/InventoryTable';


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
              <Donors/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Hospitals" key="3">
              <Hospital/>
            </Tabs.TabPane>          </>
        )}
        {currentUser.userType === "donor" && (
          <> 
             <Tabs.TabPane tab="Donations" key="4">
             <InventoryTable 
            filters={
              {inventoryType:"in",
              donor:currentUser._id,}
              
            } userType="donor"/>
           </Tabs.TabPane> 
          <Tabs.TabPane tab="Organizations" key="5">
          <Organization userType = "donor"/>
        </Tabs.TabPane> 
        </>

        )}

{currentUser.userType === "hospital" && (
          <> 
             <Tabs.TabPane tab="Consumptions" key="6">
            <InventoryTable 
            filters={
              {inventoryType:"out",
              hospital:currentUser._id,}
              
            } userType="hospital"/>
           </Tabs.TabPane> 
          <Tabs.TabPane tab="Organizations" key="7">
          <Organization userType = "hospital"/>
        </Tabs.TabPane> 
        </>

        )}

            
      </Tabs>
  
    </div>
  )
}

export default Profile
