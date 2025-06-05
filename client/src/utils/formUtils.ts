import { NavigateFunction } from "react-router-dom";

export const handleFormSubmission = async <T extends {}>(
  submitFn: (data: T) => Promise<void>,
  data: T,
  navigate: NavigateFunction,
  path: string,
  setError?: (error: string | null) => void,
  setShowSuccess?: (show: boolean) => void,
  delay = 0
) => {
  try {
    if (setError) setError(null);
    await submitFn(data);

    if (setShowSuccess) {
      setShowSuccess(true);
      if (delay > 0) {
        setTimeout(() => {
          navigate(path);
        }, delay);
      } else {
        navigate(path);
      }
    } else {
      navigate(path);
    }
  } catch (error) {
    if (setError) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
    console.error("Form submission error:", error);
  }
};
