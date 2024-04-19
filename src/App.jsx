import React, { useState, useEffect } from 'react';
import { Input } from "@nextui-org/react";
import SaveIcon from '@mui/icons-material/Save';
import { Button } from "@nextui-org/react";
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { readData, writeData } from "./firebaseExample"
import WifiFindIcon from '@mui/icons-material/WifiFind';


const App = () => {
  return (
    <div className='h-screen'>
      <header>
        <h1 className='text-5xl font-bold bg-gradient-to-r from-blue-500 
                via-blue-800 
                to-red-600
                text-transparent bg-clip-text text-center p-10'> Details of the patient</h1>
      </header>
      <div className='w-[70%] mx-auto'>
        <Profile />
      </div>
    </div>
  )
}

export default App



function Profile() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [buttonStatus, setButtonStatus] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCancel, setIsCancel] = useState(false); // State for editing status

  const handleEditClick = async () => {
     // Set editing status to true when Edit button is clicked
     const path = await getData1()
     setData(`/${path}`)

  };


  const getData1 = async () => {
    try {
     
      const response = await fetch('http://127.0.0.1:5000/data');

       const data = await response.json();

      return data.message
  

    }
    catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {

    // setData()

  }, [])
  const setData = async (path) => {

    const userData = await readData(path);
    console.log(userData)
    setFullName(userData.fullName);
    setAge(userData.age);
    setPhone(userData.phone);
    setEmail(userData.email);
    setAddress(userData.address);
    setBloodGroup(userData.bloodGroup);
  }

  const toggleButtonStatus = () => {
    setButtonStatus(!buttonStatus);
    setIsEditing(false)
    const userData = {
      fullName: fullName,
      age: age,
      phone: phone,
      email: email,
      address: address,
      bloodGroup: bloodGroup,
    };
    writeData("/UserData", userData)



    console.log(fullName, age, phone, email, address, bloodGroup)
  };

  return (
    <div className="w-full flex-wrap md:flex-nowrap space-y-9 ">
      <Input isDisabled={!isEditing} type="text" label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <Input isDisabled={!isEditing} type="number" label="Age" value={age} onChange={(e) => setAge(e.target.value)} />
      <Input isDisabled={!isEditing} type="number" label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Input isDisabled={!isEditing} type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input isDisabled={!isEditing} type="text" label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <Input isDisabled={!isEditing} type="text" label="Blood Group" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />

      <div className="pt-20 flex justify-around items-center  w-full">
        {!isEditing ? (
          <Button color="danger" endContent={<WifiFindIcon  />} onClick={handleEditClick}>
            Scan Data
          </Button>
        ) : (
          <Button color="danger" endContent={<CloseRoundedIcon />} onClick={() => { setIsEditing(false); setIsCancel(true) }}>
            Cancel
          </Button>
        )}
        
        {/* <Button isDisabled={!isEditing} color="success" endContent={<SaveIcon />} onClick={toggleButtonStatus}> Save </Button> */}
      </div>

      {buttonStatus && (<div className="absolute right-5 bottom-20">
        <Alert onClose={() => { setButtonStatus(false) }} variant="outlined" severity="success">
          Saved Successfully
        </Alert>

      </div>)}
      {isCancel && (<div className="absolute right-5 bottom-20">
        <Alert onClose={() => { setIsCancel(false) }} variant="outlined" severity="warning">
          Cancelled Successfully
        </Alert>

      </div>)}

    </div>
  );
}
