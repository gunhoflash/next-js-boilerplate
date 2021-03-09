import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { nameState } from '../components/states';

export default function Home() {
  const [name, setNameState] = useRecoilState(nameState);

  const updateName = ({ target: { value } }) => {
    setNameState(value);
  };

  return (
    <>
      <h1>Profile</h1>
      <p>Hello, {name}</p>

      <input type="text" name="name" id="input_name" onChange={updateName} placeholder="Enter your name" />

      <Link href="/">Back to main</Link>
    </>
  );
}