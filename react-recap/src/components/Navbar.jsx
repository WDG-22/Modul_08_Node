import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, login, logout } = useContext(AuthContext);
  return (
    <div className='navbar bg-base-100 shadow-sm'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>daisyUI</a>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            {user ? (
              <button className='btn btn-ghost btn-circle avatar' onClick={logout}>
                <div className='w-10 rounded-full'>
                  <img alt='Tailwind CSS Navbar component' src={user.profilePic} />
                </div>
              </button>
            ) : (
              <button onClick={login} className='btn'>
                Login
              </button>
            )}
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
  );
};

export default Navbar;
