import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SurveyElement = ({ surveyTitle, id, surveyType }) => {
  const navigate = useNavigate()
  let takeSurvey = () => {
    navigate('/surveys/' + id)
  }
  let editSurvey = () => {
    navigate('/editSurvey', { state: { surveyTitle, id, surveyType } })
  }
  let addQuestions = () => {
    navigate('/addQuestions', { state: { surveyTitle, id, surveyType } })
  }
  let previewQuestions = () => {
    navigate('/surveys/preview/' + id, {
      state: { surveyTitle, id, surveyType },
    })
  }

  function deleteSurvey() {
    const token = localStorage.getItem('token')
    const currentUser = localStorage.getItem('username')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    //! sending current user to the backend
    const body = {
      currentUser: currentUser
    }

    axios
      .delete(
        `https://surveymeanbackend.herokuapp.com/survey/delete/${id}`,
        body,
        {
          headers: headers,
        },
      )
      .then((res) => {
        alert('Deleted successfully')
        window.location.reload(false)
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <div key={id}>
      <table>
        <tbody>
          <tr>
            <td>
              <button className="btn" onClick={takeSurvey}>
                {' '}
                Take{' '}
              </button>
            </td>
            {/* //! HIDE BUTTTON 
            <td>
              <button className="btn" onClick={editSurvey}>
                Edit
              </button>
            </td> */}
            <td>
              <button className="btn-add" onClick={addQuestions}>
                Add
              </button>
            </td>
            <td style={{ justifyContent: 'flex-end' }}>
              <button className="btn-delete" onClick={deleteSurvey}>
                Delete
              </button>
            </td>
            <td
              style={{ justifyContent: 'flex-end' }}
              onClick={previewQuestions}
            >
              <button className="btn-preview">Preview</button>
            </td>

            {surveyType.agreeDisagree && (
              <td>{surveyTitle} - Agree or Disagree</td>
            )}

            {surveyType.multipleChoice && (
              <td>{surveyTitle} - Multiple Choice</td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SurveyElement
