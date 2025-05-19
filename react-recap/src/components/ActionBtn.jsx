const ActionBtn = ({ show, setShow }) => {
  return (
    <div className='card-actions justify-end'>
      <button onClick={() => setShow((p) => !p)} className='btn btn-primary'>
        {show ? 'To be' : 'Or not to be'}
      </button>
    </div>
  );
};

export default ActionBtn;
