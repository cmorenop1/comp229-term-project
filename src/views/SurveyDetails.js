import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Auth from '../components/Auth'
import axios from 'axios';


const SurveyDetails = () => {
    const { id } = useParams()

    const [surveyData, setSurveyData] = useState([])

    const [answers, setAnswers] = useState([])

    const handleChange = (i, event) => {
        const values = [...answers]
        values[i] = event.target.value
        setAnswers(values)
        console.log(answers)

    }

    const getSurveyData = () => {
        axios.get("http://surveymeanbackend.herokuapp.com/question/preview/" + id)
            .then(respose => {
                setSurveyData(respose.data)
            })
            .catch(error => {
                console.log(error)
            })

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        var requestBody = {}

        surveyData.map((question, index) => {
            var questionString = question.question
            var answer = answers[index]

            requestBody[questionString] = answer

        })

        console.log(requestBody)



        axios.post("http://surveymeanbackend.herokuapp.com/answer/attend/" + id, requestBody)
            .then(response => {
                alert("Thank you for your answers!")
                window.location.replace("/surveys");

            })
            .catch(error => {
                alert(error)
                console.log(error)
            })

    }

    useEffect(() => {
        getSurveyData()
    }, [])



    return (
        <div className="container">
            <h1>Survey - {id}</h1>
            <form onSubmit={handleSubmit}>
                {
                    surveyData.map((question, i) => {
                        return (<div key={i}>
                            <h3>
                                {question.question}
                            </h3>

                            {
                                question.options.map((option, j) => {
                                    return (
                                        <div key={j}>
                                            <h5>

                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio"
                                                        required
                                                        name={i + question.question} id={i + option}
                                                        value={option}
                                                        onChange={(e) => handleChange(i, e)}
                                                    />
                                                    <label className="form-check-label" htmlFor={i + option}>
                                                        {option}
                                                    </label>
                                                </div>
                                            </h5>
                                        </div>)
                                })
                            }
                        </div>)
                    })
                }

                <button type="submit" className='btn'>Submit</button>

            </form >
        </div >
    )
}

export default SurveyDetails