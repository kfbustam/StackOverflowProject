// import React, { useState,useEffect } from "react"
import AdminSidebar from './Sidebar';
import axios from 'axios'
import API_URL from '../../apiConfig'
import React, { useState, useEffect } from 'react'
import './UserList.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
import { Typeahead } from 'react-bootstrap-typeahead'
import defaultimg from '../../default/default.png'




// const btnStyle = {
//   backgroundColor: "black",
//   color: "white",
//   border: "none",
//   padding: "5px 10px",
// }

// function Table({
//   // list = [
//   //   {  name: "John Doe", Age: 28 },
//   //   {  name: "Jane Doe", Age: 45 },
//   //   {  name: "John Smith", Age: 32 },
//   //   {  name: "John Doe", Age: 28 },
//   //   {  name: "Jane Doe", Age: 45 },
//   //   {  name: "John Smith", Age: 32 },
//   //   {  name: "John Doe", Age: 28 },
//   //   {  name: "Jane Doe", Age: 45 },
//   //   {  name: "John Smith", Age: 32 },
//   //   {  name: "John Doe", Age: 28 },
//   //   {  name: "Jane Doe", Age: 45 },
//   //   {  name: "John Smith", Age: 32 },
//   //   {  name: "John Doe", Age: 28 },
//   //   {  name: "Jane Doe", Age: 45 },
//   //   {  name: "John Smith", Age: 32 },
//   // ],
//   colNames = ['username', 'reputation'],
//   pageNum = 0,
//   pageSize = 15,
//   width = "auto",
//   height = "auto",
// }) {
// //   const [page, setPage] = useState(pageNum)

// //   const onBack = () => {
// //     setPage(page - 1 > -1 ? page - 1 : page)
// //   }

// //   const onNext = () => {
// //     setPage(page + 1 < list.length / pageSize ? page + 1 : page)
// //   }
// const [list, setList] = useState([{}]);
// useEffect(() => {
//   axios.get(`${API_URL}/api/user/top10Results`)
//   .then(res => {
//     const Lists = res.data.top10Results.top10Users_low_reputation

//     setList(Lists)
//     // setFilteredTags(dataTags)

//     // const nameData = dataTags.map(tag => tag.name)
//     // const distinctNames = [...new Set(nameData)]
//     // setTagNames(distinctNames)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// }, [])



//   return (
//     <div className="containers"><AdminSidebar />
//     <div className="userList" style={{ width: "90%"}}>
//       {list.length > 0 && (
//         <table cellSpacing="30px" style={{ width: "40%", height: height, padding: "5px 10px" ,marginleft: "200px" }} >
//           <thead style={{ backgroundColor: "white", color: "black" }}>
//             <tr>
//               {colNames.map((headerItem, index) => (
//                 <th key={index}>{headerItem.toUpperCase()}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {Object.values(list
//             // .slice(pageSize * page, pageSize * page + pageSize)
//             ).map((obj, index) => (
//               <tr key={index}>
//                 {Object.values(obj).map((value, index2) => (
//                   <td key={index2}>{value}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <td></td>
//             <td style={{ padding: "10px 0" }}>
//               {/* <button style={btnStyle} onClick={onBack}>
//                 Back
//               </button>
//               <label style={{ padding: "0 1em" }}>{page + 1}</label>
//               <button style={btnStyle} onClick={onNext}>
//                 Next
//               </button> */}
//             </td>
//           </tfoot>
//         </table>
//       )}
      
//     </div>
//     <div className="userList" style={{ width: "100%"}}>
//       {list.length > 0 && (
//         <table cellSpacing="0" style={{ width: "0%", height: height, padding: "5px 10px", marginRight: "-200px"}} >
//           <thead style={{ backgroundColor: "white", color: "black" }}>
//             <tr>
//               {colNames.map((headerItem, index) => (
//                 <th key={index}>{headerItem.toUpperCase()}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {Object.values(list
//             // .slice(pageSize * page, pageSize * page + pageSize)
//             ).map((obj, index) => (
//               <tr key={index}>
//                 {Object.values(obj).map((value, index2) => (
//                   <td key={index2}>{value}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <td></td>
//             <td style={{ padding: "10px 0" }}>
//               {/* <button style={btnStyle} onClick={onBack}>
//                 Back
//               </button>
//               <label style={{ padding: "0 1em" }}>{page + 1}</label>
//               <button style={btnStyle} onClick={onNext}>
//                 Next
//               </button> */}
//             </td>
//           </tfoot>
//         </table>
//       )}
      
//     </div>
//     </div>
//   )
// }

// export default Table

function AllUsers() {
  const [users, setUsers] = useState([{}])
  const [filteredUsers, setFilteredUsers] = useState([{}])
  const [usernames, setUsernames] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {


    axios.get(`${API_URL}/api/user/top10Results`)
    .then(res => {
      const dataUsershigh = res.data.top10Results.top10Users_high_reputation



      setUsers(dataUsershigh)
      
      
   
    })
    .catch(err => {
      console.log(err)
    })

    axios.get(`${API_URL}/api/user/top10Results`)
    .then(res => {
      const dataUsers = res.data.top10Results.top10Users_low_reputation



     
      setFilteredUsers(dataUsers)

    })
    .catch(err => {
      console.log(err)
    })

  }, [])



  return (
    <div className="containers"><AdminSidebar />
    <Container className='all-users-containers mt-4'>
     
 
      <h1 className='all-users-header'>High Reputation Users</h1>
      
      <Row className='mt-5'>
        {users.map(user => (
          <Col sm={6} md={users.length < 3 ? 6 : 4} lg={users.length < 3 ? 4 : 3} className='mb-3'>
            <Image src={user.profileURL ? `${API_URL}/image/${user.profileURL}` : defaultimg} className='all-users-image me-2'/>
            <Link to={`/users/${user._id}`} className='all-users-link'>{user.username && user.username}</Link>
            <p className='all-users-location'>{user.location && user.location}</p>
            <p className='all-users-reputation mb-0'>{user.reputation}</p>
          </Col>
        ))}
      </Row>
      <br></br>
      <h1 className='all-users-header'>Low Reputation Users</h1>
      
      <Row className='mt-5'>
        {filteredUsers.map(user => (
          <Col sm={6} md={filteredUsers.length < 3 ? 6 : 4} lg={filteredUsers.length < 3 ? 4 : 3} className='mb-3'>
            <Image src={user.profileURL ? `${API_URL}/image/${user.profileURL}` : defaultimg} className='all-users-image me-2'/>
            <Link to={`/users/${user._id}`} className='all-users-link'>{user.username && user.username}</Link>
            <p className='all-users-location'>{user.location && user.location}</p>
            <p className='all-users-reputation mb-0'>{user.reputation}</p>
          </Col>
        ))}
      </Row>
    </Container>
    <br>
    </br>
    
    </div>
  )
}

export default AllUsers