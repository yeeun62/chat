import React, { useState } from "react";
import styled from "styled-components";

const TaskInformation = styled.div`
  width: 96%;
  margin: auto;
  height: 7%;
  text-align: center;
  font-weight: 700;
  line-height: 20px;
  background-color: #2d2d2d;
  padding: auto 2rem;
  overflow: hidden;
  border-bottom: 1px slid #999 !important;
  display: flex;

  > select {
    margin: auto;
    width: 14%;
  }
`;

const Progress = styled.div`
  width: 80%;
  height: 70%;
  background-color: #fffeb3;
  margin: 1.05% auto;
  border-radius: 2rem;
  position: relative;
`;

const Bar = styled.div`
  width: 50%;
  height: 80%;
  border-radius: 2rem;
  background-color: #e0de1b;
  position: absolute;
  left: 7px;
  top: 10%;
  text-align: center;
  line-height: 30px;
  color: #2d2d2d;
  font-weight: 900;
`;

const MoreInfo = styled.div`
  width: 100%;
  height: auto;
  > p {
    font-size: 12px;
    width: 40px;
    height: 20px;
    background-color: #010101;
    color: #fff;
  }
`;

function TaskInfo({ translatedResult, result }) {
  const [more, setMore] = useState(false);
  const moreButton = () => setMore(true);
  const closeButton = () => setMore(false);
  //const taskStep = 20;
  return (
    <TaskInformation>
      <Progress>
        <Bar>{"task"}</Bar>
      </Progress>
      <select onChange={(e) => translatedResult(result, e.target.value)}>
        <option value="ko">한국어</option>
        <option value="en">영어</option>
        <option value="ja jp">일본어</option>
        <option value="zh-CN cn">중국어 간체</option>
      </select>
      {/* <button onClick={moreButton}>추가 정보 표시</button>
      <MoreInfo className={more}>
        <h5>업무 관련 자세한 정보</h5>
        <p onClick={closeButton}>닫기</p>
        <ul>
          <li>업무 정보 1</li>
          <li>업무 정보 2</li>
          <li>업무 정보 3</li>
        </ul>
      </MoreInfo> */}
    </TaskInformation>
  );
}
export default TaskInfo;
