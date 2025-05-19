import { useEffect, useState } from 'react';
import Card from './components/Card.jsx';
import MyButton from './components/MyButton.jsx';
import Navbar from './components/Navbar.jsx';
import ImageGen from './components/ImageGen.jsx';

// Einfache Variablen können außerhalb der Komponenten stehen. Auch importiert von anderen Dateien.
const myVariable = 'Hello, World!';

function App() {
  // Dynamische Daten speichert ihr in State. Verändern sich die Daten (z.B. weil der User etwas geklickt hat) ruft ihr den State Setter auf. Dadurch wird die Komponente neu ausgeführ, neu gerendert.
  const [state, setState] = useState(0); // useState() ist eine Funktion, die immer ein Array in der Form [state, StateSetterFunktion] zurückgibt

  // Ihr könne alle möglichen Datentypen in State halten: Booleans, Strings, Zahlen, Arrays, Objekte
  const [show, setShow] = useState(false);

  // useState ist ein React Hook, eine spezielle Funktion, die uns React zur Verfügung stellt. Ein Hook muss bestimmten Regeln folgen (https://react.dev/reference/rules/rules-of-hooks). Z.B. dürfen sie nur im Top Level einer Funktionalen Komponente aufgerufen werden.

  // useEffect ist ein weiterer React Hook.
  // Verwendet ihn, wenn ihr mit Browser APIs kommunizieren müsst. (Fetch, Timer, Geolocation)
  // Wenn etwas aufgrund einer Userinteraktion geschehen soll, nutzt keinen useEffect, sondern einen Event Handler (onClick, onSubmit, onBlur...)
  useEffect(() => {
    // Funktion -> Was soll ausgeführ werden?
    console.log('useEffect läuft!');

    show && console.log('Show is true');

    const i = setInterval(() => {
      setState((p) => p + 1);
    }, 1000);

    // Einige Dinge wie Timer oder manuell gesetzte EventListener (z.B. window.addEventListener("resize", handleResize))
    // müssen wieder aufgeräumt werden. Dafür setzt ihr eine Funktion in den return eines useEffects.
    return () => {
      console.log('Aufräumen');
      clearInterval(i);
    };
  }, [show]); // Dependency Array -> Wann soll es ausgeführt werden

  // useEffect läuft immer nach dem Rendern einer Komponente. Bei fehlendem Dependency Array immer, bei leerem nur beim ersten Mal, bei einem befüllten immer, wenn sich eine der Dependencies verändert hat.
  console.log('Logik-Teil');

  function myClickHandler() {
    console.log('RUNNING!');
    // count = count + 1;
    // Im State Setter habt ihr die Möglichkeit, eine Funktion zu benutzen, die Zugriff auf den vorherigen State hat. Nutzt das für sichere Updates.
    setState((vorherigerWert) => {
      return vorherigerWert + 1;
    });

    setShow((p) => !p);
  }

  return (
    <>
      <Navbar />

      <ImageGen />

      <MyButton>Dieser Text ist ein Kind Element</MyButton>
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
