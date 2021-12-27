import React, { useState } from "react";
import Anecdote from "./Anecdote";
import Button from "./Button";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [mostVote, setMostVote] = useState(0);

  const getRandomNumber = (max) => Math.floor(Math.random() * max);

  const handleNextClick = () => {
    setSelected(getRandomNumber(anecdotes.length));
  };

  const handleVoteClick = () => {
    setVotes([
      ...votes.slice(0, selected),
      votes[selected] + 1,
      ...votes.slice(selected + 1, votes.length),
    ]);
    setMostVote(votes[selected] > votes[mostVote] ? selected : mostVote);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote content={anecdotes[selected]} />
      <Button name="vote" handleClick={handleVoteClick} />
      <Button name="next anecdote" handleClick={handleNextClick} />
      <h1>Anecdote with most votes</h1>
      <Anecdote content={anecdotes[mostVote]} />
      <p>has {votes[mostVote]} votes</p>
    </div>
  );
};

export default App;
