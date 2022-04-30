import React, { useState } from "react"
import AdminSidebar from './Sidebar';

const btnStyle = {
  backgroundColor: "black",
  color: "white",
  border: "none",
  padding: "5px 10px",
}

function Table({
  list = [
    {  name: "John Doe", Age: 28 },
    {  name: "Jane Doe", Age: 45 },
    {  name: "John Smith", Age: 32 },
    {  name: "John Doe", Age: 28 },
    {  name: "Jane Doe", Age: 45 },
    {  name: "John Smith", Age: 32 },
    {  name: "John Doe", Age: 28 },
    {  name: "Jane Doe", Age: 45 },
    {  name: "John Smith", Age: 32 },
    {  name: "John Doe", Age: 28 },
    {  name: "Jane Doe", Age: 45 },
    {  name: "John Smith", Age: 32 },
    {  name: "John Doe", Age: 28 },
    {  name: "Jane Doe", Age: 45 },
    {  name: "John Smith", Age: 32 },
  ],
  colNames = ['username', 'reputation'],
  pageNum = 0,
  pageSize = 15,
  width = "auto",
  height = "auto",
}) {
//   const [page, setPage] = useState(pageNum)

//   const onBack = () => {
//     setPage(page - 1 > -1 ? page - 1 : page)
//   }

//   const onNext = () => {
//     setPage(page + 1 < list.length / pageSize ? page + 1 : page)
//   }



  return (
    <div className="container"><AdminSidebar />
    <div style={{ width: "100%"}}>
      {list.length > 0 && (
        <table cellSpacing="0" style={{ width: "50%", height: height, padding: "5px 10px" ,marginleft: "600px" }} >
          <thead style={{ backgroundColor: "white", color: "black" }}>
            <tr>
              {colNames.map((headerItem, index) => (
                <th key={index}>{headerItem.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(list
            // .slice(pageSize * page, pageSize * page + pageSize)
            ).map((obj, index) => (
              <tr key={index}>
                {Object.values(obj).map((value, index2) => (
                  <td key={index2}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <td></td>
            <td style={{ padding: "10px 0" }}>
              {/* <button style={btnStyle} onClick={onBack}>
                Back
              </button>
              <label style={{ padding: "0 1em" }}>{page + 1}</label>
              <button style={btnStyle} onClick={onNext}>
                Next
              </button> */}
            </td>
          </tfoot>
        </table>
      )}
      
    </div>
    <div style={{ width: "100%"}}>
      {list.length > 0 && (
        <table cellSpacing="0" style={{ width: "50%", height: height, padding: "5px 10px", marginRight: "-200px"}} >
          <thead style={{ backgroundColor: "white", color: "black" }}>
            <tr>
              {colNames.map((headerItem, index) => (
                <th key={index}>{headerItem.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(list
            // .slice(pageSize * page, pageSize * page + pageSize)
            ).map((obj, index) => (
              <tr key={index}>
                {Object.values(obj).map((value, index2) => (
                  <td key={index2}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <td></td>
            <td style={{ padding: "10px 0" }}>
              {/* <button style={btnStyle} onClick={onBack}>
                Back
              </button>
              <label style={{ padding: "0 1em" }}>{page + 1}</label>
              <button style={btnStyle} onClick={onNext}>
                Next
              </button> */}
            </td>
          </tfoot>
        </table>
      )}
      
    </div>
    </div>
  )
}

export default Table