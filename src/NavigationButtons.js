import PropTypes from 'prop-types';

function NavigationButtons({
  currentPage,
  questionsPerPage,
  totalQuestions,
  handlePrev,
  handleNext,
}) {
  return (
    <div className="navigation-buttons">
      {currentPage > 1 && (
        <button type="button" onClick={handlePrev}>
          Previous
        </button>
      )}
      {currentPage * questionsPerPage < totalQuestions && (
        <button type="button" onClick={handleNext}>
          Next
        </button>
      )}
      {currentPage * questionsPerPage >= totalQuestions && (
        <button type="submit">Submit</button>
      )}
    </div>
  );
}

NavigationButtons.propTypes = {
  currentPage: PropTypes.number.isRequired,
  questionsPerPage: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default NavigationButtons;
