import React, { useRef, useState, useEffect } from "react";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import parse from "html-react-parser";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../../apiConfig";
import { AddComment, CommentsDisabled } from "@mui/icons-material";

const QuestionOverview = () => {
  const [ans, ansSet] = useState(null);
  const [data, dataSet] = useState(null);
  const [comm, setComment] = useState("");
  const[qComm, setQComment] = useState("");
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios.get(`${API_URL}/api/question/getById/${id}`);
      dataSet(response);
    }

    fetchMyAPI();
  }, []);

  let user = JSON.parse(localStorage.getItem("user"));
  function answer() {
    axios.post(`${API_URL}/api/answer/addAnswer`, {
      question_id: id,
      answer: editorRef.current.getContent(),
      user_id: user._id,
    });
    window.location.reload();
  }
  function bestAns(ans_id) {
    axios.post(`${API_URL}/api/answer/bestAnswer`, {
      answerId: ans_id,
    });
    window.location.reload();
  }

  function addComment(type, qa_id, u_id) {
    console.log(type)
    if (type === "question") {
      axios.post(`${API_URL}/api/question/addComment`, {
        question_id: qa_id,
        comment: qComm,
        user_id: u_id,
      });
      
      console.log(editorRef.current.getContent())
     window.location.reload();
    } else {
      axios.post(`${API_URL}/api/answer/addComment`, {
        answer_id: qa_id,
        comment: comm,
        user_id: u_id,
      });
      window.location.reload();
    }
  }
  function vote(v, type, id) {
    if (v === "up" && type === "question") {
      axios.post(`${API_URL}/api/question/upvoteQuestion`, {
        questionId: id,
        userId: user._id,
      });
      window.location.reload();
    }
    if (v === "down" && type === "question") {
      axios.post(`${API_URL}/api/question/downvoteQuestion`, {
        questionId: id,
        userId: user._id,
      });
      window.location.reload();
    }
    if (v === "up" && type === "answer") {
      axios.post(`${API_URL}/api/answer/upvoteAnswer`, {
        answerId: id,
        userId: user._id,
      });
      window.location.reload();
    }
    if (v === "down" && type === "answer") {
      axios.post(`${API_URL}/api/answer/downvoteAnswer`, {
        answerId: id,
        userId: user._id,
      });
      window.location.reload();
    }
  }
  
  function getNumberOfDays(start) {
    const date1 = new Date(start);
    const date2 = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);

    if (diffInDays < 1) {
      return "today";
    }
    if (diffInDays < 2) {
      return "yesterday";
    }

    return diffInDays + " days ago";
  }

  return (
    <>
      <LeftSideBar />
      <div className="flex flex-wrap ml-[20%] mr-[2%] overflow-hidden">
        <div className="grid grid-cols-12 border-b border-gray-300 mt-[3%]">
          <div className="text-4xl text-[#3B4045] col-span-9">
            {data?.data.question.title}
          </div>
          <div className="mt-1 text-right gap-4 col-span-3">
            <button
              className="bg-[#0A95FF] text-white font-light py-2 px-2 rounded"
              onClick={() => navigate("/askQuestion")}
            >
              Ask Question
            </button>
          </div>
          <div className="flex">
            <div className="font-light text-[#3B4045]">Asked</div>
            <div className="font-normal ml-2 flex-none">
              {getNumberOfDays(data?.data.question.createdAt)}
            </div>
            <div className="font-light ml-2 text-[#3B4045]">Modified</div>
            <div className="font-normal ml-2">
              {getNumberOfDays(data?.data.question.updatedAt)}
            </div>
            <div className="font-light ml-2 text-[#3B4045]">Viewed</div>
            <div className="font-normal ml-2 flex-none">
              {data?.data.question.totalviews} times
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-1 mr-[10%]">
          <div class="col-span-1">
            <button
              onClick={(e) => vote("up", "question", data?.data.question._id)}
            >
              <svg
                aria-hidden="true"
                class="svg-icon iconArrowUpLg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
              >
                <path d="M2 25h32L18 9 2 25Z"></path>
              </svg>
            </button>
            <div className="ml-[15%] mb-[10%]">{data?.data.question.score}</div>
            <button
              onClick={(e) => vote("down", "question", data?.data.question._id)}
            >
              <svg
                aria-hidden="true"
                class="svg-icon iconArrowDownLg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
              >
                <path d="M2 11h32L18 27 2 11Z"></path>
              </svg>
            </button>
            <br />
            <button className="ml-2">
              <svg
                aria-hidden="true"
                class="svg-icon iconBookmark"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M6 1a2 2 0 0 0-2 2v14l5-4 5 4V3a2 2 0 0 0-2-2H6Zm3.9 3.83h2.9l-2.35 1.7.9 2.77L9 7.59l-2.35 1.7.9-2.76-2.35-1.7h2.9L9 2.06l.9 2.77Z"></path>
              </svg>
            </button>
            <br />
            <button className="ml-1.5 mt-1">
              <svg
                aria-hidden="true"
                class="mln2 mr0 svg-icon iconHistory"
                width="19"
                height="18"
                viewBox="0 0 19 18"
              >
                <path d="M3 9a8 8 0 1 1 3.73 6.77L8.2 14.3A6 6 0 1 0 5 9l3.01-.01-4 4-4-4h3L3 9Zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5Z"></path>
              </svg>
            </button>
          </div>
          <div className="text-left font-normal col-span-7 text-lg">
            {parse(String(data?.data.question.body))}
            <div className="flex mt-5 flex-wrap gap-2 overflow-auto">
              {data?.data.question.tags.map((tag) => (
                <button
                  className="bg-[#E1ECF4] text-[#39739F] text-sm font-light py-2 px-2 rounded"
                  onClick={() => navigate(`/questions/tagged/${tag.name}`)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
            <div className="grid mt-3 mr-[75%] grid-cols-3">
              <div className="font-light text-sm text-[#3B4045]">Share</div>
              <button
                className="font-light text-sm text-[#3B4045]"
                onClick={() =>
                  navigate(`/questions/edit/${data?.data.question._id}`)
                }
              >
                Edit
              </button>
              <div className="font-light text-sm text-[#3B4045]">Follow</div>
            </div>
            <div className="">
                <div className="text-1xl font-bold">Comments</div>
                {data?.data.question.comment_id.map((c) => (
                  <div>
                  {c.comment}
                  </div>
                ))}
                <form>
                  <input className="w-full" placeholder="Add Comment" type="text" onChange={e => setQComment(e.target.value)}></input>
                </form>
                <button
                  onClick={(e) => addComment("question", id, user._id)}
                  className="bg-[#0A95FF] mt-2 text-white font-light py-2 px-2 rounded"
                >
                  comment
                </button>
              </div>
          </div>
          <div className="col-span-4">
            <ul className="bg-[#FBF3D5] px-2 py-2 ml-2 bg-cover">
              <div className="bg-[#FBF3D5] s-sidebarwidget--header font-bold s-sidebarwidget__small-bold-text fc-light d:fc-black-900 bb bbw1">
                The Overflow Blog
              </div>
              <li className="bg-[#FBF3D5] s-sidebarwidget--item d-flex px16">
                <div className="flex--item1 fl-shrink0">
                  <svg
                    aria-hidden="true"
                    className="va-text-top svg-icon iconPencilSm"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                  >
                    <path d="m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0ZM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88Z"></path>
                  </svg>{" "}
                </div>
                <div className="flex--item wmn0 ow-break-word">
                  <a
                    href="https://stackoverflow.blog/2022/04/22/episode-435-how-a-college-extra-credit-project-became-php3-still-the-bedrock-of-the-web/?cb=1"
                    class="js-gps-track"
                    title="Episode 435: How a college extra-credit project became PHP3, still the bedrock of the web"
                    data-ga='["community bulletin board","The Overflow Blog","https://stackoverflow.blog/2022/04/22/episode-435-how-a-college-extra-credit-project-became-php3-still-the-bedrock-of-the-web/",null,null]'
                    data-gps-track="communitybulletin.click({ priority: 1, position: 0 })"
                  >
                    Episode 435: How a college extra-credit project became PHP3,
                    still the...
                  </a>
                </div>
              </li>
              <li className="bg-[#FBF3D5] s-sidebarwidget--item d-flex px16">
                <div className="flex--item1 fl-shrink0">
                  <svg
                    aria-hidden="true"
                    class="va-text-top svg-icon iconPencilSm"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                  >
                    <path d="m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0ZM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88Z"></path>
                  </svg>{" "}
                </div>
                <div className="flex--item wmn0 ow-break-word">
                  <a
                    href="https://stackoverflow.blog/2022/04/25/empathy-for-the-dev-avoiding-common-pitfalls-when-communicating-with-developers/?cb=1"
                    class="js-gps-track"
                    data-ga='["community bulletin board","The Overflow Blog","https://stackoverflow.blog/2022/04/25/empathy-for-the-dev-avoiding-common-pitfalls-when-communicating-with-developers/",null,null]'
                    data-gps-track="communitybulletin.click({ priority: 1, position: 1 })"
                  >
                    Empathy for the Dev:&nbsp;Avoiding common pitfalls when
                    communicating with developers
                  </a>
                </div>
              </li>
              <div className="bg-[#FBF3D5] s-sidebarwidget--header font-bold s-sidebarwidget__small-bold-text fc-light d:fc-black-900 bb bbw1">
                Featured on Meta
              </div>
              <li className="bg-[#FBF3D5] s-sidebarwidget--item d-flex px16">
                <div className="flex--item1 fl-shrink0">
                  <div
                    className="favicon favicon-stackexchangemeta"
                    title="Meta Stack Exchange"
                  ></div>{" "}
                </div>
                <div className="flex--item wmn0 ow-break-word">
                  <a
                    href="https://meta.stackexchange.com/questions/377768/how-might-the-staging-ground-the-new-ask-wizard-work-on-the-stack-exchange-net?cb=1"
                    class="js-gps-track"
                    title="How might the Staging Ground &amp; the new Ask Wizard work on the Stack Exchange network?"
                    data-ga='["community bulletin board","Featured on Meta","https://meta.stackexchange.com/questions/377768/how-might-the-staging-ground-the-new-ask-wizard-work-on-the-stack-exchange-net",null,null]'
                    data-gps-track="communitybulletin.click({ priority: 3, position: 2 })"
                  >
                    How might the Staging Ground &amp; the new Ask Wizard work
                    on the Stack Exchange...
                  </a>
                </div>
              </li>
              <li className="bg-[#FBF3D5] s-sidebarwidget--item d-flex px16">
                <div className="flex--item1 fl-shrink0">
                  <div
                    class="favicon favicon-stackoverflowmeta"
                    title="Meta Stack Overflow"
                  ></div>{" "}
                </div>
                <div className="flex--item wmn0 ow-break-word">
                  <a
                    href="https://meta.stackoverflow.com/questions/417475/question-close-reasons-project-introduction-and-feedback?cb=1"
                    class="js-gps-track"
                    data-ga='["community bulletin board","Featured on Meta","https://meta.stackoverflow.com/questions/417475/question-close-reasons-project-introduction-and-feedback",null,null]'
                    data-gps-track="communitybulletin.click({ priority: 6, position: 3 })"
                  >
                    Question Close Reasons project - Introduction and Feedback
                  </a>
                </div>
              </li>
              <li className="bg-[#FBF3D5] s-sidebarwidget--item d-flex px16">
                <div className="flex--item1 fl-shrink0">
                  <div
                    className="favicon favicon-stackoverflowmeta"
                    title="Meta Stack Overflow"
                  ></div>{" "}
                </div>
                <div className="flex--item wmn0 ow-break-word">
                  <a
                    href="https://meta.stackoverflow.com/questions/416486/an-a-b-test-has-gone-live-for-a-trending-sort-option-for-answers?cb=1"
                    class="js-gps-track"
                    data-ga='["community bulletin board","Featured on Meta","https://meta.stackoverflow.com/questions/416486/an-a-b-test-has-gone-live-for-a-trending-sort-option-for-answers",null,null]'
                    data-gps-track="communitybulletin.click({ priority: 6, position: 4 })"
                  >
                    An A/B test has gone live for a "Trending" sort option for
                    answers
                  </a>
                </div>
              </li>
              <li className="bg-[#FBF3D5] s-sidebarwidget--item d-flex px16">
                <div className="flex--item1 fl-shrink0">
                  <div
                    className="favicon favicon-stackoverflowmeta"
                    title="Meta Stack Overflow"
                  ></div>{" "}
                </div>
                <div className="flex--item wmn0 ow-break-word">
                  <a
                    href="https://meta.stackoverflow.com/questions/417008/overhauling-our-communitys-closure-reasons-and-guidance?cb=1"
                    class="js-gps-track"
                    data-ga='["community bulletin board","Featured on Meta","https://meta.stackoverflow.com/questions/417008/overhauling-our-communitys-closure-reasons-and-guidance",null,null]'
                    data-gps-track="communitybulletin.click({ priority: 6, position: 5 })"
                  >
                    Overhauling our community's closure reasons and guidance
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="">
          <div className="font-semibold text-2xl">Answers</div>
          {data?.data.question.answer_id.map((a) => (
            <div className="border-b border-gray-300 grid grid-cols-12 mb-5 mt-5">
              <div class="col-span-1">
                <button onClick={(e) => vote("up", "answer", a._id)}>
                  <svg
                    aria-hidden="true"
                    class="svg-icon iconArrowUpLg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                  >
                    <path d="M2 25h32L18 9 2 25Z"></path>
                  </svg>
                </button>
                <div className="ml-[15%] mb-[10%]">{a.score}</div>
                <button onClick={(e) => vote("down", "answer", a._id)}>
                  <svg
                    aria-hidden="true"
                    class="svg-icon iconArrowDownLg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                  >
                    <path d="M2 11h32L18 27 2 11Z"></path>
                  </svg>
                </button>
                <br />
                {a._id === data?.data.question.best_ans && (
                  <button className="">
                    <svg
                      aria-hidden="true"
                      className="fill-green-700"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                    >
                      <path d="m6 14 8 8L30 6v8L14 30l-8-8v-8Z"></path>
                    </svg>
                  </button>
                )}
                <br />
                <button className="ml-1.5 mt-1">
                  <svg
                    aria-hidden="true"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                  >
                    <path d="M3 9a8 8 0 1 1 3.73 6.77L8.2 14.3A6 6 0 1 0 5 9l3.01-.01-4 4-4-4h3L3 9Zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5Z"></path>
                  </svg>
                </button>
                <br />
                {user._id === data?.data.question.user._id && (
                  <button onClick={(e) => bestAns(a._id)} className="mt-1">
                    Best?
                  </button>
                )}
              </div>
              <div className="col-span-11 font-normal mt-2 mr-[40%]">
                {parse(String(a.answer))}
                <br />
              <div className="">
                <div className=" text-1xl font-bold">Comments</div>
                {a.comment_id.map((c) => (
                  <div className="border-b border-gray-300">
                    {c.comment}
                </div>
                ))}
                <form>
                  <input className="w-full"  placeholder="Add Comment" type="text" onChange={e => setComment(e.target.value)}></input>
                </form>

                <button
                  onClick={(e) => addComment("answer", a._id, user._id)}
                  className="bg-[#0A95FF] mt-2 text-white font-light py-2 px-2 rounded"
                >
                  comment
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ml-[20%] mr-[2%] mt-5 overflow-hidden">
        <div className="font-bold mt-7">Your Answer</div>
        <br />
        <div className="mt-3">
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 300,
              width: 700,
              menubar: false,
              plugins: "lists link codesample image",
              toolbar: "bold italic | link codesample image | bullist numlist ",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
        <div className="my-2">
          <button
            onClick={answer}
            className="bg-[#0A95FF] text-white font-light py-2 px-2 rounded"
          >
            Post Your Answer
          </button>
        </div>
      </div>
    </>
  );
};

export default QuestionOverview;
