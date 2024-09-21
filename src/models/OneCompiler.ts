export interface ProgramFile {
  name: string;
  content: string;
}

export interface CodeInput {
  language: string;
  stdin: string;
  files: ProgramFile[];
}

export interface CodeOutput {
  stdout: string;
  stderr: string;
  status: string;
  exception: string;
  executionTime: number;
}
