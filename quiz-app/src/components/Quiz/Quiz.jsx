import { useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";
const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [questions, setQuestions] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  const openCorrect = (index) => {
    document.querySelectorAll("li")[index - 1].classList.add("correct");
  };
  const checkAns = (e, ans) => {
    if (lock === false) {
      if (questions.ans === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        openCorrect(questions.ans);
      }
      setLock(true);
    }
  };

  const clearAns = () => {
    document.querySelectorAll("li").forEach((li) => {
      li.classList = "";
    });
  };
  const next = () => {
    if (index === data.length - 1) {
      setResult(true);
      return;
    }
    if (lock === true) {
      clearAns();
      setIndex(++index);
      setQuestions(data[index]);
      setLock(false);
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestions(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };
  return (
    <div className="container">
      <h1>Quiz App</h1>
      {result ? (
        <>
          <h2>
            You scored {score} out of {data.length}
          </h2>
          <button type="reset" onClick={reset}>
            Reset
          </button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {questions.question}
          </h2>
          <ul>
            <li
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {questions.option1}
            </li>
            <li
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {questions.option2}
            </li>
            <li
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {questions.option3}
            </li>
            <li
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {questions.option4}
            </li>
          </ul>

          <button type="button" id="nextBtn" disabled={!lock} onClick={next}>
            Next
          </button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
