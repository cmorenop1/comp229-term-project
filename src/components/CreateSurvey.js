import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'

const { v4: uuidv4 } = require('uuid')



const CreateSurvey = () => {

    //attributes
    const initialValues = {
        id: null,
        surveyTitle: 'Survey title goes here',
        surveyType: {
            agreeDisagree: false,
            multipleChoice: false,
        }
    }

    //Hooks => useState  
    const [surveyForm, setSurveyForm] = useState(initialValues)

    //Hooks => useRef
    const surveyTitleFieldRef = useRef()
    const agreeDisagreeRadioButtonRef = useRef()
    const multipleChoiceRadioButtonRef = useRef()

    //Hooks => useNavigate
    const navigate = useNavigate();

    //functions - onChanges
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

        const startDate = new Date()
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + 7) //adding 7 days

        let data = {}

        if (surveyForm.agreeDisagree) {
            data = {
                "title": surveyForm.surveyTitle,
                "type": "Agree or Disagree",
                "status": "not active",
                "startDate": format(startDate, 'mm/dd/yy'),
                "endDate": format(endDate, 'mm/dd/yy'),
            }
        }

        if (surveyForm.multipleChoice) {
            data = {
                "title": surveyForm.surveyTitle,
                "type": "Multiple Choice",
                "status": "not active",
                "startDate": format(startDate, 'mm/dd/yy'),
                "endDate": format(endDate, 'mm/dd/yy'),
            }
        }

        fetch('https://surveymeanbackend.herokuapp.com/survey/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                // 'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })

        navigate('/')
    }

    return (
        <div className='container'>
            <form className="add-form">
                <h2>Create Survey</h2>
                <div className="element">

                    <div className='form-element'>
                        <p>Survey title</p>
                        <input type="text"
                            name="name"
                            ref={surveyTitleFieldRef}
                            placeholder={surveyForm.surveyTitle}
                            onChange={onChangeSurveyTitle}
                        />
                    </div>

                    <div className='form-element'>
                        <p>Survey type</p>
                        <div className='flexbox-container-multiple-choice'>
                            <label>
                                <input type="radio"
                                    className="radio-button"
                                    name="name"
                                    ref={agreeDisagreeRadioButtonRef}
                                    onChange={onChangesRadioButton}
                                />Multiple Choice
                            </label>
                            <label>
                                <input type="radio"
                                    className="radio-button"
                                    name="name"
                                    ref={multipleChoiceRadioButtonRef}
                                    onChange={onChangesRadioButton}
                                />
                                Agree or Disagree
                            </label>
                        </div>
                    </div>

                </div>

                <button className="btn" type='button' onClick={onSubmitSurvey}>Submit</button>
                <button className="btn" type='button' onClick={() => { navigate('/') }}>Cancel</button>

            </form>
        </div>

    );

}

export default CreateSurvey;
