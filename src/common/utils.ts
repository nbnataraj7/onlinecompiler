import { PROGRAMMING_LANGUAGES } from "./enums";

export const getLanguageName = (language: PROGRAMMING_LANGUAGES) => {
  switch (language) {
    case PROGRAMMING_LANGUAGES.C:
      return "C";
    case PROGRAMMING_LANGUAGES.CPP:
      return "C++";
    case PROGRAMMING_LANGUAGES.JAVA:
      return "Java";
    case PROGRAMMING_LANGUAGES.JAVASCRIPT:
      return "JavaScript";
    case PROGRAMMING_LANGUAGES.PYTHON:
      return "Python";
    case PROGRAMMING_LANGUAGES.TYPESCRIPT:
      return "TypeScript";
    default:
      return "";
  }
};

export const getLanguageFileExtension = (language: PROGRAMMING_LANGUAGES) => {
  switch (language) {
    case PROGRAMMING_LANGUAGES.C:
      return ".c";
    case PROGRAMMING_LANGUAGES.CPP:
      return ".cpp";
    case PROGRAMMING_LANGUAGES.JAVA:
      return ".java";
    case PROGRAMMING_LANGUAGES.JAVASCRIPT:
      return ".js";
    case PROGRAMMING_LANGUAGES.PYTHON:
      return ".py";
    case PROGRAMMING_LANGUAGES.TYPESCRIPT:
      return ".ts";
    default:
      return "";
  }
};
