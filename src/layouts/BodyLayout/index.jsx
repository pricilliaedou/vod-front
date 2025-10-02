import Header from "../Header";
import Footer from "../Footer";
import "./index.css";

const BodyLayout = ({ children }) => {
  return (
    <div className="container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default BodyLayout;
