import PropTypes from 'prop-types';

const Result = ({ questions, userAnswers }) => {
  const renderResult = () => {
    return questions.map((question, index) => {
      const userAnswer = userAnswers[question.id];
      const isCorrect = userAnswer === question.answer;

      return (
        <div
          key={index}
          className={`result-question ${isCorrect ? 'correct-answer' : 'incorrect-answer'}`}
        >
          <h3>{question.question}</h3>
          <p>Your Answer: {userAnswer}</p>
          <p>Correct Answer: {question.answer}</p>
        </div>
      );
    });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question) => {
      if (userAnswers[question.id] === question.answer) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div className="result-container">
      <h2>Quiz Results</h2>
      {renderResult()}
      <div className="result-score">
        Your Score: {calculateScore()} / {questions.length}
      </div>
    </div>
  );
};

Result.propTypes = {
  questions: PropTypes.array.isRequired,
  userAnswers: PropTypes.object.isRequired,
};

export default Result;
