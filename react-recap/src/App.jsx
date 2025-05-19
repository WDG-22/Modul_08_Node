import { useEffect, useState } from 'react';
import Card from './components/Card.jsx';

const myVariable = 'Hello, World!';

function App() {
  const [state, setState] = useState(0);
  const [show, setShow] = useState(false);

  function myClickHandler() {
    console.log('RUNNING!');
    // count = count + 1;
    setState((vorherigerWert) => {
      return vorherigerWert + 1;
    });

    setShow((p) => !p);
  }

  useEffect(() => {
    console.log('useEffect läuft!');

    show && console.log('Show is true');
    // const i = setInterval(() => {
    //   setState((p) => p + 1);
    // }, 1000);

    // return () => {
    //   console.log('Aufräumen');
    //   clearInterval(i);
    // };
  }, [show]);

  console.log('Logik-Teil');

  return (
    <>
      <div className='navbar bg-base-100 shadow-sm'>
        <div className='flex-1'>
          <a className='btn btn-ghost text-xl'>daisyUI</a>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <a>Link</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className='bg-base-100 rounded-t-none p-2'>
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      <p>{14 * 545}</p>
      <p>{myVariable}</p>
      <p>{state}</p>
      <button onClick={myClickHandler} className='btn'>
        Count up!
      </button>
      {/* <button
        onClick={() => {
          console.log('HELLO');
        }}
        className='btn'
      >
        Count up!
      </button> */}

      {show && <p>Hier bin ich!</p>}
      <Card stegosaurus={show} setShow={setShow} />
      <Card stegosaurus={show} setShow={setShow} />
    </>
  );
}

export default App;
