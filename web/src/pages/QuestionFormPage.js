import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { postQuestion } from "../actions/questionActions";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

const FormPage = ({ dispatch, loading, redirect, userId }) => {
  const history = useHistory();
  const [questionState, setQuestionState] = useState("");

  const onSubmitxd = (e) => {
    e.preventDefault();
    const type = e.target.type.value;
    const category = e.target.category.value;
    const question = questionState;
    dispatch(postQuestion({ type, category, question, userId }));
  };

  useEffect(() => {
    if (redirect) {
      history.push(redirect);
    }
  }, [redirect, history]);

  return (
    <section>
      <h1>New Question</h1>

      <form onSubmit={onSubmitxd}>
        <div>
          <label for="type">Type</label>
          <select id="" name="type">
            <option value="OPEN (LONG OPEN BOX)">OPEN (LONG OPEN BOX)</option>
            <option value="OPINION (SHORT OPEN BOX)">
              OPINION (SHORT OPEN BOX)
            </option>
            <option value="WITH RESULT (OPEN BOX WITH LINK)">
              WITH RESULT (OPEN BOX WITH LINK)
            </option>
            <option value="WITH EVIDENCE (OPEN BOX WITH VIDEO)">
              WITH EVIDENCE (OPEN BOX WITH VIDEO)
            </option>
          </select>
        </div>
        <div>
          <label for="category">Category</label>
          <select id="category" name="category">
            <option value="TECHNOLOGY AND COMPUTER">
              TECHNOLOGY AND COMPUTER
            </option>
            <option value="SCIENCES">SCIENCES</option>
            <option value="SOFTWARE DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
            <option value="SOCIAL SCIENCES">SOCIAL SCIENCES</option>
            <option value="LANGUAGE">LANGUAGE</option>
          </select>
        </div>

        <div>
          <label for="question">Question</label>
          <Editor
            textareaName="question"
            onEditorChange={(e) => {
              setQuestionState(e);
            }}
          />
        </div>
        <button type="submit" className="button">
          {loading ? "Saving ...." : "Save"}
        </button>
      </form>
    </section>
  );
};

const mapStateToProps = (state) => ({
  loading: state.question.loading,
  redirect: state.question.redirect,
  hasErrors: state.question.hasErrors,
  userId: state.auth.uid,
});

export default connect(mapStateToProps)(FormPage);
