import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const ActionBtn = ({ show, setShow }) => {
  const { test } = useContext(AuthContext);
  console.log({ test });
  return (
    <div className='card-actions justify-end'>
      <button onClick={() => setShow((p) => !p)} className='btn btn-primary'>
        {show ? 'To be' : 'Or not to be'}
      </button>
    </div>
  );
};

export default ActionBtn;
