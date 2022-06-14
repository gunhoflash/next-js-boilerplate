import {useCallback, useState} from 'react';

export interface ValidationResult {
  isError: boolean;
  isConfirmed?: boolean;
  message: string;
}

const defaultValidationResult: ValidationResult = {
  isError: false,
  isConfirmed: false,
  message: '',
};

export type Validate<T = string> = (value?: T) => ValidationResult;

const useValidate = <T>(validates: Validate<T>[] = [], skipAfterError = true) => {
  const [validationResult, setValidationResult] = useState<ValidationResult>(defaultValidationResult);

  const validate: Validate<T> = useCallback(value => {
    const totalResult = {...defaultValidationResult};

    for (const func of validates) {
      const result = func(value);
      if (result.isError) {
        if (totalResult.isError === false) {
          totalResult.isError = true;
          totalResult.message = result.message;
        }
        if (skipAfterError) break;
      } else if (result.isConfirmed && totalResult.isError) {
        totalResult.isError = false;
        totalResult.isConfirmed = true;
        totalResult.message = result.message;
      }
    }

    setValidationResult(totalResult);
    return totalResult;
  }, [validates, skipAfterError]);

  const unvalidate = useCallback(() => {
    setValidationResult(defaultValidationResult);
  }, []);

  return {
    validationResult,
    validate,
    unvalidate,
  };
};

export default useValidate;
