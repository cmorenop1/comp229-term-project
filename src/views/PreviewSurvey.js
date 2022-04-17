import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Auth from '../components/Auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PreviewSurvey = () => {
  const { id } = useParams()
  const [surveyData, setSurveyData] = useState([])
  const [answers, setAnswers] = useState([])
  const navigate = useNavigate()

  const handleChange = (i, event) => {
    const values = [...answers]
    values[i] = event.target.value
    setAnswers(values)
    console.log(answers)
  }

  const getSurveyData = () => {
    axios
      .get('https://surveymeanbackend.herokuapp.com/question/preview/' + id)
      .then((respose) => {
        setSurveyData(respose.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getSurveyData()
  }, [])

  return (
    <div className="container">
      <h1>Survey - {id}</h1>
      <form>
        {surveyData.map((question, i) => {
          return (
            <div key={i}>
              <h3>{question.question}</h3>

              {question.options.map((option, j) => {
                return (
                  <div key={j}>
                    <h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          required
                          name={i + question.question}
                          id={i + option}
                          value={option}
                          onChange={(e) => handleChange(i, e)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={i + option}
                        >
                          {option}
                        </label>
                      </div>
                    </h5>
                  </div>
                )
              })}
            </div>
          )
        })}
      </form>
    </div>
  )
}

export default PreviewSurvey
