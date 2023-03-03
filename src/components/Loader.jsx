import ClockLoader from 'react-spinners/ClockLoader';

function Loader() {
    return (
        <div className='loader'>
            <ClockLoader color='#36d7b7' size={100} />;
        </div>
    );
}
export default Loader;
