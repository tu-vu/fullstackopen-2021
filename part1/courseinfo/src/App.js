import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const App = () => {
    const course = "Half Stack application development";

    return (
        <div>
            <Header course={course} />
            <Content />
            <Total />
        </div>
    );
};

export default App;
