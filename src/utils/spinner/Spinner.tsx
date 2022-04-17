import './Spinner.css';

const Spinner = () => {
  return (
    <div className='loader-wrapper'>
      <img
        src='https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/space-rocket-512.png'
        style={{ width: '60px', height: '50px' }}
        className='loader'
      />
    </div>
  );
};

export default Spinner;
