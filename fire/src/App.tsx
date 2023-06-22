import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App relative flex h-screen items-center justify-center">
      <header className="l-header">
        <img src={logo} className="l-header__logo w-24" alt="logo" />
      </header>

      <section className="absolute mx-auto h-2/3 w-96 rounded-md bg-white p-10">
        <h1 className="absolute -bottom-20 -right-24 text-6xl text-white">
          File Fire
        </h1>
        <div className="l-form-area">
          <div className="flex flex-wrap justify-center">
            <div className="l-upload mb-24 h-32 w-32 border-2 border-dotted border-gray-400"></div>
            <div className="mb-12 w-full">
              <input
                name="file"
                type="file"
                accept=""
                className="c-button01 border-none"
              />
            </div>
            <input
              type="button"
              disabled={true}
              value="アップする"
              className="c-button02 text-md h-12 w-36"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
