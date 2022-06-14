import {ForwardedRef, useImperativeHandle, useRef} from 'react';
import {Validate} from './useValidate';

type InputRefValueType = string | number | boolean;

export interface InputRef<S extends InputRefValueType = string> {
  value: S;
  unvalidate: () => void;
  validate: Validate<S>; // TODO
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

export interface InputRefOptions<S = string> {
  unvalidate?: () => void;
  validate?: Validate<S>;
  // clear?: () => void;
}

type InputRefType<S extends InputRefValueType> = InputRef<S>
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

const useInputRef = <S extends InputRefValueType, T extends InputRefType<S>>(
  ref: ForwardedRef<InputRef<S>>,
  options: InputRefOptions<S> | null,
  initValue: S,
) => {
  const inputRef = useRef<T>();
  const {validate, unvalidate} = options || {};

  useImperativeHandle(ref, () => ({
    get value () {
      return inputRef.current.value as S;
    },
    set value (value: S) {
      inputRef.current.value = value;
    },
    unvalidate: () => {
      unvalidate && unvalidate();
    },
    validate: () => (
      validate ? validate() : null
    ),
    focus: () => inputRef.current.focus(),
    blur: () => inputRef.current.blur(),
    clear: () => {
      inputRef.current.value = initValue;
      (inputRef.current as InputRef<S>).clear?.();
      unvalidate && unvalidate();
    },
  }), [validate, unvalidate, initValue]);

  return inputRef;
};

export default useInputRef;
