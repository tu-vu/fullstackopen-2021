import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const getTotal = () => {
    return good + neutral + bad;
  };

  const getAverage = () => {
    if (getTotal() === 0) return 0;
    return (good - bad) / getTotal();
  };

  const getPositive = () => {
    if (getTotal() === 0) return 0;
    return (good / getTotal()) * 100;
  };

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine entry="good" value={good} />
      <StatisticLine entry="neutral" value={neutral} />
      <StatisticLine entry="bad" value={bad} />
      <StatisticLine entry="all" value={getTotal()} />
      <StatisticLine entry="average" value={getAverage()} />
      <StatisticLine entry="positive" value={getPositive()} />
    </div>
  );
};

export default Statistics;
