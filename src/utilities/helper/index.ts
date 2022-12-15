import { ErrorComplete, ErrorWithMessage } from "@util/types/Error";

export const setTitle = (title: string): void => {
  document.title = import.meta.env.VITE_APP_TITLE + " | " + title;
};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
};

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;
  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
};

export const getErrorMessage = (error: unknown): string => toErrorWithMessage(error).message;

export const messageParser = (error: unknown): string => `${error}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: any): ErrorComplete => error.response.data;
