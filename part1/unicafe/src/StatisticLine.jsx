import React from "react";

const StatisticLine = ({ entry, value }) => {
  return (
    <div>
      <p>
        {entry} {value}
      </p>
    </div>
  );
};

export default StatisticLine;
