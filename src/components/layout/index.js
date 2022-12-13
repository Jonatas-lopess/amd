import Footer from "./Footer";
import Header from "./Header";
import './styles.css';

const Layout = ({children}) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;