import { useNavigate } from 'react-router-dom';

function BackButton() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <button className='back_btn' onClick={handleGoBack}>
                Go back
            </button>
        </div>
    );
}
export default BackButton;
