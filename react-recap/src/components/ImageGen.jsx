import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const ImageGen = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('unset'); // loading, success, error, unset

  const { updateUserProfilePic } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log('FORM');

    try {
      setStatus('loading');
      const res = await fetch(`https://gen-ai-wbs-consumer-api.onrender.com/api/v1/images/generations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          provider: 'open-ai',
          mode: 'development',
          // mode: 'production',
          Authorization: 'Setze hier deinen Token ein, den du von WBS bekommen hast',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          response_format: 'b64_json',
          size: '1024x1024',
          prompt,
        }),
      });

      const data = await res.json();
      setImage(data[0].b64_json);
      updateUserProfilePic(`data:image/png;base64, ${data[0].b64_json}`);
      // console.log({ data });
      setStatus('unset');
    } catch (error) {
      // console.log(error);
      setStatus('error');
    }
  };

  return (
    <div className='p-10'>
      <div className='w-48'>
        <img src={`data:image/png;base64, ${image}`} alt='' className='w-full' />
      </div>

      <form onSubmit={submitHandler} inert={status === 'loading'}>
        <textarea
          className='textarea textarea-lg'
          placeholder='Prompt to AI'
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        ></textarea>
        <button className='btn disabled:border disabled:border-red-400' disabled={status === 'loading'}>
          {status === 'loading' ? <span className='loading loading-ring loading-md'></span> : 'Submit'}
        </button>
      </form>
      {status === 'error' && <p className='bg-error'>Da ist etwas schiefgegangen. Bitte versuche es nochmal</p>}
    </div>
  );
};

export default ImageGen;
