import "./App.css";
import { PROGRAMMING_LANGUAGES } from "./common/enums";
import { CompilerBox } from "./compiler-box/compiler.box";

function App() {
  return (
    <>
      <h1>Hackathon coding round</h1>
      <div className="container">
        <CompilerBox defaultLanguage={PROGRAMMING_LANGUAGES.JAVASCRIPT} />
      </div>
    </>
  );
}

export default App;
