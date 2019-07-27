import React from 'react';
import { Link } from "react-router-dom";

function App() {
  return (
      <ul>
          <li>
              <Link to="/">主页</Link>
          </li>
          <li>
              <Link to="/subject-evaluation">科目评价</Link>
          </li>
          <li>
              <Link to="/weekly-duty-check">值周生检查</Link>
          </li>
      </ul>
  );
}

export default App;
