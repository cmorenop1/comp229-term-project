import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const MultipleChoice = ({ surveyTitle, surveyId }) => {

    const navigate = useNavigate();

    const initialValues = {
        id: null,
        question: null,
        optionA: null,
        optionB: null,
        optionC: null,
    }

    const [formFields, setFormFields] = useState(initialValues)
    const questionField = useRef()
    const optionAField = useRef()
    const optionBField = useRef()
    const optionCField = useRef()

    function onChange() {
        let ff = formFields
        ff.id = surveyId
        ff.question = questionField.current.value
        ff.optionA = optionAField.current.value
        ff.optionB = optionBField.current.value
        ff.optionC = optionCField.current.value
        setFormFields(ff)
    }

    function onSave() {

        const token = localStorage.getItem('token')

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        const body = {
            "question": formFields.question,
            "options": `${formFields.optionA},${formFields.optionB},${formFields.optionC}`
        }

        axios.post(`http://surveymeanbackend.herokuapp.com/question/add/${surveyId}`, body, {
            headers: headers
        }).then(res => {
            //alert("ok")
            navigate('/surveys')
        }).catch(error => {
            alert(error)
            console.log(error)
        })
    }

    return (
        <div className='container'>
            <h1>{surveyTitle}</h1>
            <h3>{surveyId}</h3>
            <form className="add-form" id="idFormMultipleChoice">
                <label className='form-element'> Question  <input onChange={onChange} ref={questionField} type="text"></input> </label>
                <label className='element'> Option A  <input onChange={onChange} ref={optionAField} type="text"></input> </label>
                <label className='element'> Option B  <input onChange={onChange} ref={optionBField} type="text"></input> </label>
                <label className="element"> Option C  <input onChange={onChange} ref={optionCField} type="text"></input> </label>
            </form>
            <div>
                <button className="btn" type='button' onClick={onSave}>Save</button>
                <button className="btn" type='button' onClick={() => { navigate('/surveys') }}>Cancel</button>
            </div>
        </div>
    );

}

export default MultipleChoice;
