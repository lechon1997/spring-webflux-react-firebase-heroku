import React from "react";
import { Link } from "react-router-dom";
import ReactHtmlParse from "react-html-parser";

export const Question = ({ question, excerpt, onDelete }) => (
  <article className={excerpt ? "question-excerpt" : "question"}>
    <h2>{ReactHtmlParse(question.question)}</h2>
    <p>
      {question.category} - <small>{question.type}</small>
    </p>

    {onDelete && (
      <button className="button right" onClick={() => onDelete(question.id)}>
        DELETE
      </button>
    )}
    {excerpt && (
      <Link to={`/question/${question.id}`} className="button">
        View Question
      </Link>
    )}
  </article>
);
