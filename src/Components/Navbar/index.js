import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    return (
        <div className="navbar">
            <img src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1722181350/transaction_zf1liz.png" alt="logo" />
            <Link className="link" to="/add-transaction">
                <button disabled={location.pathname === "/add-transaction" ? true : false}>Add Transaction</button>
            </Link>
        </div>
    );
}
