import classNames from 'classnames';
import useInputRef, {InputRef, InputRefOptions} from 'hooks/useInputRef';
import useValidate, {Validate} from 'hooks/useValidate';
import uniqueId from 'lodash.uniqueid';
import {forwardRef, useCallback, useState} from 'react';
import InputWrapper, {InputCommonProps} from './InputWrapper';

interface SelectOption {
  text: string;
  value: string;
}

interface SelectProps extends InputCommonProps {
  options: SelectOption[];
  disabled?: boolean;
  initialValue?: string;
  label?: string;
  placeholder?: string;
  refOptions?: InputRefOptions;
  validates?: Validate[];
}

const defaultProps: Partial<SelectProps> = {
  disabled: false,
  initialValue: '',
  label: '',
  refOptions: {},
  validates: [],
};

const Select = forwardRef<InputRef<string>, SelectProps>((props: SelectProps, ref) => {
  const [id] = useState(uniqueId());
  const [value, setValue] = useState(props.initialValue);
  const {unvalidate, validate, validationResult} = useValidate(props.validates, true);
  const inputRef = useInputRef<string, HTMLSelectElement>(ref, {...props.refOptions, validate, unvalidate}, '');

  const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
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
      <select
        ref={inputRef}
        id={id}
        name={props.name}
        className={classNames('border rounded p-2 w-full', {
          'border-red-500': validationResult.isError,
          'border-blue-500': validationResult.isConfirmed,
        })}
        value={value}
        onChange={onChange}
        disabled={props.disabled}
        placeholder={props.placeholder}
      >
        {!props.initialValue && props.placeholder && <option value="" disabled>{props.placeholder}</option>}
        {props.options.map((o, i) => (
          <option key={i} value={o.value}>
            {o.text}
          </option>
        ))}
      </select>
    </InputWrapper>
  );
});

Select.displayName = 'Select';
Select.defaultProps = defaultProps;

export default Select;
