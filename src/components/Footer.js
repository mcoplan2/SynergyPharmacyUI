const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p>&copy; 2021 - 2024 Synergy Pharmacy</p>
        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        marginTop: 'auto',  // Pushes the footer to the bottom of the page
        width: '100%',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '20px',  // Adds padding at the top of the footer content
    }
};

export default Footer;