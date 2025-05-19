import ActionBtn from './ActionBtn.jsx';

const Card = ({ stegosaurus, setShow }) => {
  // const { stegosaurus } = props;
  console.log(stegosaurus);
  return (
    <div className='card bg-base-100 w-96 shadow-sm'>
      <figure>
        <img src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp' alt='Shoes' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>Card Title</h2>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
        <ActionBtn show={stegosaurus} setShow={setShow} />
      </div>
    </div>
  );
};

export default Card;
