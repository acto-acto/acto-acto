export type OutputType = string | React.ReactElement;

export type Feature = {
  command: string;
  response: string | (() => React.ReactElement) | (() => void);
};
