import {FC, ReactNode} from 'react';

interface InputWrapperPublicProps {
  className?: string;
}

interface InputWrapperProps extends InputWrapperPublicProps {
  children: ReactNode;
}

export interface InputCommonProps extends InputWrapperPublicProps {
  name?: string;
}

const InputWrapper: FC<InputWrapperProps> = props => (
  <div className={props.className || 'my-2'}>
    {props.children}
  </div>
);

export default InputWrapper;
