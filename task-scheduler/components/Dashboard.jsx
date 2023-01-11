import React from 'react'

const Dashboard = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center p-4'>
        <div className='w-6/12 m-auto border border-black'>
           <p>Hello</p>
           <p>John Doe</p>
           <p>Good to see you here!</p>
           <p>Tasks for 24th Dec, 2022:</p>
           <ul>
               <li>Take the dog for a walk</li>
               <li>Cook breakfast</li>
               <li>Finish pending tasks for the project</li>
           </ul>
           <form action="">
            <input type="text" placeholder='Eg. Need to finish my assignment' />
            <button type='submit'>Add New Task</button>
           </form>
           <button>Logout</button>
        </div>
    </div>
  )
}

export default Dashboard