import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

const CreateSurvey = () => {
  const initialValues = {
    id: null,
    surveyTitle: null,
    surveyType: {
      agreeDisagree: false,
      multipleChoice: false,
    },
  }
  const [surveyForm, setSurveyForm] = useState(initialValues)
  const surveyTitleFieldRef = useRef()
  const agreeDisagreeRadioButtonRef = useRef()
  const multipleChoiceRadioButtonRef = useRef()
  const navigate = useNavigate()

  function processSave() {
    const username = localStorage.getItem('username')
    const agreeDisagreeValue = agreeDisagreeRadioButtonRef.current.checked
    const multipleChoiceValue = multipleChoiceRadioButtonRef.current.checked

    console.log('agreeDisagreeValue ' + agreeDisagreeValue)
    console.log('multipleChoiceValue ' + multipleChoiceValue)

    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 7) //adding 7 days

    if (agreeDisagreeValue) {
      return {
        title: surveyForm.surveyTitle,
        type: 'Agree or Disagree',
        status: 'not active',
        startDate: format(startDate, 'mm-dd-yy'),
        endDate: format(endDate, 'mm-dd-yy'),
        username: username,
      }
    }
    if (multipleChoiceValue) {
      return {
        title: surveyForm.surveyTitle,
        type: 'Multiple Choice',
        status: 'not active',
        startDate: format(startDate, 'mm-dd-yy'),
        endDate: format(endDate, 'mm-dd-yy'),
        username: username,
      }
    }
  }

  function onChangeSurveyTitle() {
    const surveyTitleValue = surveyTitleFieldRef.current.value
    let data = surveyForm //this (surveyForm) is immutable
    data.surveyTitle = surveyTitleValue
    setSurveyForm(data)
  }

  function onChangesRadioButton() {
    const agreeDisagreeValue = agreeDisagreeRadioButtonRef.current.checked
    const multipleChoiceValue = multipleChoiceRadioButtonRef.current.checked
    let dataPreprocessing = surveyForm //this (surveyForm) is immutable

    if (agreeDisagreeValue) {
      dataPreprocessing.surveyType.agreeDisagree = true
      dataPreprocessing.surveyType.multipleChoice = false
      setSurveyForm(dataPreprocessing)
    }

    if (multipleChoiceValue) {
      dataPreprocessing.surveyType.agreeDisagree = false
      dataPreprocessing.surveyType.multipleChoice = true
      setSurveyForm(dataPreprocessing)
    }
  }

  function onSubmitSurvey() {
    fetch('https://surveymeanbackend.herokuapp.com/survey/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        // 'authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(processSave()),
    })

    navigate('/')
  }

  return (
    <div className="container">
      <form className="add-form">
        <h2>Create Survey</h2>
        <div className="element">
          <div className="form-element">
            <p>Survey title</p>
            <input
              type="text"
              name="name"
              ref={surveyTitleFieldRef}
              placeholder={surveyForm.surveyTitle}
              onChange={onChangeSurveyTitle}
            />
          </div>

          <div className="form-element">
            <p>Survey type</p>
            <div className="flexbox-container-multiple-choice">
              <label>
                <input
                  type="radio"
                  className="radio-button"
                  name="name"
                  ref={multipleChoiceRadioButtonRef}
                  onChange={onChangesRadioButton}
                />
                Multiple Choice
              </label>
              <label>
                <input
                  type="radio"
                  className="radio-button"
                  name="name"
                  ref={agreeDisagreeRadioButtonRef}
                  onChange={onChangesRadioButton}
                />
                Agree or Disagree
              </label>
            </div>
          </div>
        </div>

        <button className="btn" type="button" onClick={onSubmitSurvey}>
          Submit
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => {
            navigate('/')
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default CreateSurvey
