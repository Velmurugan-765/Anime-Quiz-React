import PropTypes from 'prop-types';

function Timer({ timeLeft }) {
  return (
    <div className="timer">
      Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}
      {timeLeft % 60}
    </div>
  );
}

Timer.propTypes = {
  timeLeft: PropTypes.number.isRequired,
};

export default Timer;
