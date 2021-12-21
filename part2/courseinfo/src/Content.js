import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
    const exercisesReducer = (prev, cur) => {
        return { exercises: prev.exercises + cur.exercises };
    };

    return (
        <div>
            {parts.map((part) => (
                <Part
                    key={part.id}
                    name={part.name}
                    exercises={part.exercises}
                />
            ))}
            <strong>
                total of {parts.reduce(exercisesReducer).exercises} exercises
            </strong>
        </div>
    );
};

export default Content;
