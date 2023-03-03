function Footer() {
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
                    © {new Date().getFullYear()}
                </h1>
            </div>
        </footer>
    );
}
export default Footer;
