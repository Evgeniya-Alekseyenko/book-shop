import React from 'react';

function Footer() {
    const [currentYear, setCurrentYear] = React.useState(
        new Date().getFullYear()
    );

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentYear(new Date().getFullYear());
        }, 1000 * 60 * 60 * 24); // обновляем год каждые 24 часа
        return () => clearInterval(intervalId);
    }, []);
    return (
        <footer>
            <div className='footer'>
                <h1>
                    Виконано в
                    <a
                        href='https://prometheus.org.ua/'
                        target='_blank'
                        rel='noreferrer'
                    >
                        Prometheus
                    </a>
                    © {currentYear}
                </h1>
            </div>
        </footer>
    );
}
export default Footer;
