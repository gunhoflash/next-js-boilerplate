import classNames from 'classnames';
import useInputRef, {InputRef, InputRefOptions} from 'hooks/useInputRef';
import useValidate, {Validate} from 'hooks/useValidate';
import uniqueId from 'lodash.uniqueid';
import {forwardRef, HTMLInputTypeAttribute, useCallback, useState} from 'react';
import InputWrapper, {InputCommonProps} from './InputWrapper';

interface InputProps extends InputCommonProps {
  disabled?: boolean;
  initialValue?: string;
  label?: string;
  placeholder?: string;
  refOptions?: InputRefOptions;
  type?: HTMLInputTypeAttribute;
  validates?: Validate[];
}

const defaultProps: Partial<InputProps> = {
  disabled: false,
  initialValue: '',
  label: '',
  refOptions: {},
  type: 'text',
  validates: [],
};

const Input = forwardRef<InputRef<string>, InputProps>((props: InputProps, ref) => {
  const [id] = useState(uniqueId());
  const [value, setValue] = useState(props.initialValue);
  const {unvalidate, validate, validationResult} = useValidate(props.validates, true);
  const inputRef = useInputRef<string, HTMLInputElement>(ref, {...props.refOptions, validate, unvalidate}, '');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    validate(value);
  }, [validate]);

  return (
    <InputWrapper className={props.className}>
      {props.label && (
        <label className="block my-2" htmlFor={id}>
          {props.label}
        </label>
      )}
      <input
        ref={inputRef}
        id={id}
        name={props.name}
        type={props.type}
        className={classNames('border rounded p-2 w-full leading-5', {
          'border-red-500': validationResult.isError,
          'border-blue-500': validationResult.isConfirmed,
        })}
        value={value}
        onChange={onChange}
        disabled={props.disabled}
        placeholder={props.placeholder}
      />
    </InputWrapper>
  );
});

Input.displayName = 'Input';
Input.defaultProps = defaultProps;

export default Input;
