import React from "react";

const Person = ({ info }) => {
    return (
        <p>
            {info.name} {info.number}
        </p>
    );
};

export default Person;
