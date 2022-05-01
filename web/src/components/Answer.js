import React from "react";
import ReactHtmlParse from "react-html-parser";

export const Answer = ({ answer }) => (
  <aside className="answer">
    <p>{ReactHtmlParse(answer.answer)}</p>
  </aside>
);
