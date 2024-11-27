import React from "react";
import ReactDOM from "react-dom";
import App from "../index";

ReactDOM.render(
  <React.StrictMode>
    <div style={{width: '100vw', height: '100vh'}}>
      <App onLoad={(engine)=>{
        console.log("on loaded", engine);
      }} onError={(e)=>{
        console.error("load scene error: ", e);
      }}/>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
