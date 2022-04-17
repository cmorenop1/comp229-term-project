import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AgreeDisagree = ({ surveyTitle, surveyId }) => {
  const navigate = useNavigate()

  const initialValues = {
    id: null,
    question: null,
    optionA: 'Agree',
    optionB: 'Disagree',
  }

  const [formFields, setFormFields] = useState(initialValues)
  const questionField = useRef()
  const optionAField = useRef()
  const optionBField = useRef()

  function onChange() {
    let ff = formFields
    ff.id = surveyId
    ff.question = questionField.current.value
    setFormFields(ff)
  }

  function onSave() {
    const token = localStorage.getItem('token')

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    const body = {
      question: formFields.question,
      options: `${formFields.optionA},${formFields.optionB}`,
    }

    axios
      .post(
        `https://surveymeanbackend.herokuapp.com/question/addsingle/${surveyId}`,
        body,
        {
          headers: headers,
        },
      )
      .then((res) => {
        //alert("ok")
        navigate('/surveys')
      })
      .catch((error) => {
        alert(error)
        console.log(error)
      })
  }

  return (
    <div className="container">
      <h1>{surveyTitle}</h1>
      <h3>{surveyId}</h3>
      <form className="add-form" id="idFormMultipleChoice">
        <label className="form-element">
          {' '}
          Question{' '}
          <input
            onChange={onChange}
            ref={questionField}
            type="text"
          ></input>{' '}
        </label>
      </form>
      <div>
        <button className="btn" type="button" onClick={onSave}>
          Save
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => {
            navigate('/surveys')
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AgreeDisagree
