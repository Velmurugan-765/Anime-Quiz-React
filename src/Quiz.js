import PropTypes from 'prop-types';

function Quiz({ questions, currentPage, userAnswers, onAnswerChange }) {
  const currentQuestions = questions.slice(
    (currentPage - 1) * 5,
    currentPage * 5
  );

  const handleAnswerChange = (questionId, answer) => {
    onAnswerChange(questionId, answer);
  };

  return (
    <div>
      {currentQuestions.map((question) => (
        <div key={question.id} className="question-container">
          <h3>{question.question}</h3>
          <div className="answer-container">
            {question.type === "radio" && 
              question.options.map((option) => (
                <div key={option} className="radio-option">
                  <input
                    type="radio"
                    id={`${question.id}-${option}`}
                    name={question.id}
                    value={option}
                    checked={userAnswers[question.id] === option}
                    onChange={() => handleAnswerChange(question.id, option)}
                  />
                  <label htmlFor={`${question.id}-${option}`}>{option}</label>
                </div>
              ))}
            {question.type === "dropdown" && (
              <select
                value={userAnswers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              >
                <option value="" disabled>Select an option</option>
                {question.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
            {question.type === "text" && (
              <input
                type="text"
                value={userAnswers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string),
      answer: PropTypes.string.isRequired
    })
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  userAnswers: PropTypes.object.isRequired,
  onAnswerChange: PropTypes.func.isRequired // Ensure propType is correctly defined
};

export default Quiz;
