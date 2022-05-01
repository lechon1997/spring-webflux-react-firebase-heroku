import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { fetchQuestion, postAnswer } from "../actions/questionActions";
import { connect } from "react-redux";
import { Question } from "../components/Question";
import { Editor } from "@tinymce/tinymce-react";

const FormPage = ({
  dispatch,
  loading,
  redirect,
  match,
  hasErrors,
  question,
  userId,
}) => {
  const { id } = match.params;

  const [answerState, setAnswerState] = useState("");
  const history = useHistory();

  const onSubmitxd = (e) => {
    e.preventDefault();
    dispatch(
      postAnswer({ answer: answerState, userId: userId, questionId: id })
    );
  };

  useEffect(() => {
    dispatch(fetchQuestion(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (redirect) {
      history.push(redirect);
    }
  }, [redirect, history]);

  const renderQuestion = () => {
    if (loading.question) return <p>Loading question...</p>;
    if (hasErrors.question) return <p>Unable to display question.</p>;

    return <Question question={question} />;
  };

  return (
    <section>
      {renderQuestion()}
      <h1>New Answer</h1>

      <form onSubmit={onSubmitxd}>
        <div>
          <label for="answer">Answer</label>
          <Editor
            textareaName="answer"
            onEditorChange={(e) => {
              setAnswerState(e);
            }}
          />
        </div>
        <button type="submit" className="button">
          Save
        </button>
      </form>
    </section>
  );
};

const mapStateToProps = (state) => ({
  loading: state.question.loading,
  redirect: state.question.redirect,
  question: state.question.question,
  hasErrors: state.question.hasErrors,
  userId: state.auth.uid,
});

export default connect(mapStateToProps)(FormPage);
