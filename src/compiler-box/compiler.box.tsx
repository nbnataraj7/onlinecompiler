import { useCallback, useMemo, useRef, useState } from "react";
import { SUPPORTED_PROGRAMMING_LANGUAGES } from "../common/constants";
import { PROGRAMMING_LANGUAGES } from "../common/enums";
import { getLanguageFileExtension, getLanguageName } from "../common/utils";

import "./compiler-box.css";
import { runCode } from "../apis/onecompiler";

interface Props {
  defaultLanguage: PROGRAMMING_LANGUAGES;
}

const DEFAULT_FILE_NAME = "main";

export const CompilerBox = ({ defaultLanguage }: Props) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [isWaitingForCompile, setIsWaitingForCompile] = useState(false);
  const [results, setResults] = useState("Output will be shown here");
  const [isError, setIsError] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [showCompileButton, setShowCompileButton] = useState(false);
  const codeEditorRef = useRef<HTMLTextAreaElement>(null);
  const [code, setCode] = useState("");

  const defaultFullFileName = useMemo(
    () => DEFAULT_FILE_NAME + getLanguageFileExtension(language),
    [language]
  );

  const updateCode = useCallback(() => {
    setCode(codeEditorRef.current?.value || "");
    setShowCompileButton(!!codeEditorRef.current?.value);
  }, []);

  const compile = () => {
    setIsWaitingForCompile(true);
    setExecutionTime(0);
    runCode({
      files: [{ name: DEFAULT_FILE_NAME, content: code.current?.value || "" }],
      language: language.toString(),
      stdin: "",
    }).then((response) => {
      if (response && response.status === "success") {
        setResults(response.stdout);
        setExecutionTime(response.executionTime);
        if (response.stderr) {
          setResults(response.stderr);
          setIsError(!!response.stderr);
        }
      }
      setIsError(false);
      setIsWaitingForCompile(false);
    });
  };

  return (
    <div className="compiler-box">
      <div className="compiler-header">
        <h2>{defaultFullFileName}</h2>
        <div className="lang-select">
          <label>Change language</label>
          <select
            onChange={(ev) => setLanguage(ev.target.value)}
            defaultValue={defaultLanguage}
          >
            {SUPPORTED_PROGRAMMING_LANGUAGES.map((lang) => (
              <option key={lang} value={lang} className="lang-option">
                {getLanguageName(lang)}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isWaitingForCompile && <div className="loader-spinner"></div>}
      {!isWaitingForCompile && (
        <div className="compiler-body">
          <div className="code-editor">
            <textarea
              placeholder="Write your code here and hit compile"
              ref={codeEditorRef}
              value={code}
              onChange={updateCode}
            ></textarea>
            <div className="actions">
              {showCompileButton && (
                <button className="app-btn" onClick={compile}>
                  Compile{" "}
                  {executionTime
                    ? `(last execution time - ${executionTime}ms)`
                    : ""}
                </button>
              )}
            </div>
          </div>
          <div className={`result ${isError ? "error" : ""}`}>{results}</div>
        </div>
      )}
    </div>
  );
};
