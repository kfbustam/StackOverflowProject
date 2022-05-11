import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import axios from "axios";
import API_URL from '../../apiConfig'
import {useNavigate, useParams } from "react-router-dom";
const EditQuestion = (qid) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [data, dataSet] = useState(null);
    useEffect(() => {
        async function fetchMyAPI() {
          let response = await axios.get(`${API_URL}/api/question/getById/${id}`)
          dataSet(response)
        }
        fetchMyAPI()
    }, [])

    function change(){
        axios.post(`${API_URL}/api/question/updateQuestion/${id}`)
        navigate(`questions/${data?.data.question._id}`)
    }
  return (
    <div className="ml-[20%]">
      <LeftSideBar />
      <div className="text-2xl font-semibold">EditQuestion</div>
      <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={String(data?.data.question.body)}
                init={{
                  height: 300,
                  width: 700,
                  menubar: false,
                  plugins: "lists link codesample image",
                  toolbar:
                    "bold italic | link codesample image | bullist numlist ",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
        <div className="my-2">
              <button onClick={change} className="bg-[#0A95FF] text-white font-light py-2 px-2 rounded">
                Make changes
              </button>
            </div>
    </div>
    
  );
};

export default EditQuestion;
