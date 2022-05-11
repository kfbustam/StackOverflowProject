import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import axios from "axios";
import {useNavigate } from "react-router-dom";
const EditQuestion = (qid) => {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [data, dataSet] = useState(null)
    useEffect(() => {
        async function fetchMyAPI() {
          let response = await axios.get('http://localhost:3001/api/question/getById/6275d5f3b319fc3904964e84')
          dataSet(response)
        }
        fetchMyAPI()
    }, [])

    function change(){
        navigate('/questions/overview')
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
