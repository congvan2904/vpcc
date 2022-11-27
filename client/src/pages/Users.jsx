import React from 'react'
import instance from '../services/configAxios'

const getUsers=async()=>{
  const users=(await instance.get('user/getlists')).data
 if(users&&users.message==='success'){
  console.log(users.data)
  return users
 }
  
}

const Users = () => {
  return (
    <>
    <h1>Users</h1>
    <button onClick={getUsers}>Get users</button>
    </>
  )
}

export default Users