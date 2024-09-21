import axios from "axios";
import { CodeInput, CodeOutput } from "../models/OneCompiler";

const apiKey = "a393bc8a21mshed5180606eba860p1b04bcjsn351ffcfa36fc";

const instance = axios.create({
  baseURL: "https://onecompiler-apis.p.rapidapi.com/api/v1/run",
  timeout: 12000,
  headers: {
    "x-rapidapi-host": "onecompiler-apis.p.rapidapi.com",
    "Content-Type": "application/json",
    "x-rapidapi-key": apiKey,
  },
});

export const runCode = async (input: CodeInput) => {
  try {
    const response = await instance.post<CodeOutput>("/", input);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
