import React, { useState, useEffect } from "react";
import LineChart from "./LineChart";
import { QuestionsData } from "./Data";
import AdminSidebar from './Sidebar';
import "./Quesgraph.css";

// import connection from "../../config.json";
// import axios from "axios";

function QuestionAnalytics() {


  let data = [];

//   useEffect(() => {
    // axios
    //   .get(`${connection.connectionURL}/api/analytics/questionsPostedPerDay`)
    //   .then((response) => {
    //     console.log(
    //       "-----------------Question analytics----------------------"
    //     );

    //     data = response?.data?.data?.result;
    //     console.log(data);
    //     setQuestionsPerDay(response?.data?.data?.result);


//       })
//       .catch((err) => {
//         throw err;
//       });
//   }, []);

const [questionsData, setQuestionsData] = useState({
    labels: QuestionsData.map((res) => res.date),
    datasets: [
      {
        label: "Questions per day",
        data: QuestionsData.map((res) => res.count),
        backgroundColor: ["rgb(130, 130, 37)"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <>
        <div className="containers">
       <AdminSidebar />
      
        <div className="newline" style={{ width: "500px" }}>

          <LineChart chartData={questionsData}></LineChart>
        </div>
        </div>

    </>
  );
}

export default QuestionAnalytics;
