import './NoSignings.css';

const NoSignings = () => {
  return (
    <div className='no-signing-wrapper'>
      <h1 style={{ fontSize: '50px' }}>!אין החתמות במערכת</h1>
      <h2 style={{ fontSize: '23px' }}>
        .על מנת להוסיף החתמה, לחץ על כפתור ה"בקשת החתמה" ומלא את הפרטים הדרושים
      </h2>
    </div>
  );
};

export default NoSignings;
