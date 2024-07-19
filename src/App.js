import { useState, useEffect, useRef } from 'react';
import './App.css';
import Quiz from './Quiz';
import Result from './Result';
import Timer from './Timer';
import NavigationButtons from './NavigationButtons';

const questions = [
  {
    id: 1,
    question: "Who is the main character of Naruto?",
    type: "radio",
    options: ["Naruto Uzumaki", "Sasuke Uchiha", "Sakura Haruno", "Kakashi Hatake"],
    answer: "Naruto Uzumaki"
  },
  {
    id: 2,
    question: "Which anime features the character 'Monkey D. Luffy'?",
    type: "radio",
    options: ["Naruto", "One Piece", "Dragon Ball Z", "Bleach"],
    answer: "One Piece"
  },
  {
    id: 3,
    question: "In which anime does the character 'Goku' appear?",
    type: "dropdown",
    options: ["Naruto", "One Piece", "Dragon Ball Z", "Bleach"],
    answer: "Dragon Ball Z"
  },
  {
    id: 4,
    question: "Who is the protagonist of Attack on Titan?",
    type: "text",
    answer: "Eren Yeager"
  },
  {
    id: 5,
    question: "Which anime series features 'Lelouch Lamperouge'?",
    type: "radio",
    options: ["Naruto", "One Piece", "Code Geass", "Death Note"],
    answer: "Code Geass"
  },
  {
    id: 6,
    question: "Which anime features 'Ichigo Kurosaki'?",
    type: "radio",
    options: ["Naruto", "One Piece", "Bleach", "Dragon Ball Z"],
    answer: "Bleach"
  },
  {
    id: 7,
    question: "Who is known as the 'Strongest Hero' in One Punch Man?",
    type: "text",
    answer: "Saitama"
  },
  {
    id: 8,
    question: "Which anime revolves around the 'Soul Society' and 'Hollows'?",
    type: "dropdown",
    options: ["Naruto", "One Piece", "Dragon Ball Z", "Bleach"],
    answer: "Bleach"
  },
  {
    id: 9,
    question: "One of three legendary sannin. He helped train Naruto",
    type: "text",
    answer: "Jiraiya"
  },
  {
    id: 10,
    question: "Which anime features 'Light Yagami'?",
    type: "radio",
    options: ["Naruto", "One Piece", "Code Geass", "Death Note"],
    answer: "Death Note"
  },
  {
    id: 11,
    question: "In 'My Hero Academia', who is the protagonist known as 'Deku'?",
    type: "radio",
    options: ["Izuku Midoriya", "Katsuki Bakugo", "Shoto Todoroki", "Eijiro Kirishima"],
    answer: "Izuku Midoriya"
  },
  {
    id: 12,
    question: "Which anime features 'Natsu Dragneel' and 'Lucy Heartfilia'?",
    type: "dropdown",
    options: ["Naruto", "Fairy Tail", "Dragon Ball Z", "Bleach"],
    answer: "Fairy Tail"
  },
  {
    id: 13,
    question: "Who is the first crew mate of Luffy?",
    type: "text",
    answer: "Roronoa Zoro"
  },
  {
    id: 14,
    question: "Which anime revolves around the 'Akatsuki' organization?",
    type: "radio",
    options: ["Naruto", "One Piece", "Bleach", "Naruto Shippuden"],
    answer: "Naruto Shippuden"
  },
  {
    id: 15,
    question: "In 'Tokyo Ghoul', what do ghouls need to consume to survive?",
    type: "radio",
    options: ["Human flesh", "Water", "Plants", "Soul energy"],
    answer: "Human flesh"
  },
  {
    id: 16,
    question: "Which anime features 'Gon Freecss' and 'Killua Zoldyck'?",
    type: "dropdown",
    options: ["Naruto", "One Piece", "Dragon Ball Z", "Hunter x Hunter"],
    answer: "Hunter x Hunter"
  },
  {
    id: 17,
    question: "Who is Garp's Grandson and Dragon's Son?",
    type: "text",
    answer: "Luffy"
  },
  {
    id: 18,
    question: "Which anime series features 'Spike Spiegel'?",
    type: "radio",
    options: ["Naruto", "One Piece", "Cowboy Bebop", "Dragon Ball Z"],
    answer: "Cowboy Bebop"
  },
  {
    id: 19,
    question: "In 'Neon Genesis Evangelion', who pilots the Evangelion Unit-01?",
    type: "radio",
    options: ["Shinji Ikari", "Asuka Langley Soryu", "Rei Ayanami", "Kaworu Nagisa"],
    answer: "Shinji Ikari"
  },
  {
    id: 20,
    question: "Which anime features 'Edward' and 'Alphonse Elric'?",
    type: "dropdown",
    options: ["Naruto", "One Piece", "Dragon Ball Z", "Fullmetal Alchemist"],
    answer: "Fullmetal Alchemist"
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current); // Cleanup on unmount or completion
  }, []);

  const handleNext = () => {
    if (currentPage * 5 < questions.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    setShowResults(true);
    clearInterval(timerRef.current); // Clear the timer interval when submitting
  };

  return (
    <div className="quiz-container">
      <h1>Anime Quiz</h1>
      <Timer timeLeft={timeLeft} />
      {!showResults ? (
        <form onSubmit={handleSubmit}>
          <Quiz
            questions={questions}
            currentPage={currentPage}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange} // Pass the correct prop
          />
          <NavigationButtons
            currentPage={currentPage}
            questionsPerPage={5}
            totalQuestions={questions.length}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </form>
      ) : (
        <Result questions={questions} userAnswers={userAnswers} />
      )}
    </div>
  );
}

export default App;
