import React, { useState, useEffect } from "react";
import LineChart from "./LineChart";
// import { QuestionsData } from "./Data";
import AdminSidebar from './Sidebar';
import "./Quesgraph.css";

import axios from 'axios'
import API_URL from '../../apiConfig'

function QuestionAnalytics() {
  const [questionsPerDay, setQuestionsPerDay] = useState([]);
  const [dates, setDates] = useState([]);
  const [count, setCount] = useState([]);
  const [questionsData, setQuestionsData] = useState(false);


  let data = [];
  

  useEffect(() => {
    axios
      .get(`${API_URL}/api/Question/questionAnalysis`)
      .then((response) => {
      
        data = response.data.data;
        console.log("data",data);
        setQuestionsPerDay(response.data.data);
        setQuestionsData({
          labels: data.map((res) => res.date),
          datasets: [
            {
              label: "Questions per day",
              data: data.map((res) => res.count),
              backgroundColor: ["rgb(244, 130, 37)"],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        });


      })
      .catch((err) => {
        throw err;
      });
  }, []);

// const [questionsData, setQuestionsData] = useState({
//     labels: QuestionsData.map((res) => res.date),
//     datasets: [
//       {
//         label: "Questions per day",
//         data: QuestionsData.map((res) => res.count),
//         backgroundColor: ["rgb(130, 130, 37)"],
//         borderColor: "black",
//         borderWidth: 2,
//       },
//     ],
//   });

  return (
    <>
    <div className="containers">
       <AdminSidebar />
      
      {questionsData && (
        <div className="newline" style={{ width: "700px" }}>
          <LineChart chartData={questionsData}></LineChart>
        </div>
        
      )}
      </div>
    </>
  );
}

export default QuestionAnalytics;
{/* <>
<div className="containers">
<AdminSidebar />

<div className="newline" style={{ width: "500px" }}>

  <LineChart chartData={questionsData}></LineChart>
</div>
</div>

</> */}