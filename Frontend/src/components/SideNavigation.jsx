import { Link } from "react-router-dom";

export default function SideNavigation({ index }) {
  return (
    <>
      <div className="sidebar">
        <ul>
          <li className={index === "1" ? "active" : ""}>
            <Link to="/" className="stretched-link">
              <i className="fa-solid fa-user"></i>&nbsp;Overview
            </Link>
          </li>
          <li className={index === "2" ? "active" : ""}>
            <Link to="/invoices" className="stretched-link">
              <i className="fa-solid fa-user"></i>&nbsp;Invoices
            </Link>
          </li>
          <li className={index === "3" ? "active" : ""}>
            <Link to="/sales-returns" className="stretched-link">
              <i className="fa-solid fa-user"></i>&nbsp;Sales Returns
            </Link>
          </li>
          <li className={index === "4" ? "active" : ""}>
            <Link to="/goods-received-notes" className="stretched-link">
              <i className="fa-solid fa-user"></i>&nbsp;Goods Received Notes
            </Link>
          </li>
          <li className={index === "5" ? "active" : ""}>
            <Link to="/goods-return-notes" className="stretched-link">
              <i className="fa-solid fa-user"></i>&nbsp;Goods Return Notes
            </Link>
          </li>
          <li className={index === "6" ? "active" : ""}>
            <Link to="/items" className="stretched-link">
              <i className="fa-solid fa-user"></i>&nbsp;Items
            </Link>
          </li>
          <li className={index === "7" ? "active" : ""}>
            <Link to="/purchase-orders" className="stretched-link">
              <i className="fa-solid fa-user"></i>&nbsp;Purchase Orders
            </Link>
          </li>
          <li className="nav-end">
            <a href="#">
              <i className="fa-solid fa-user"></i>&nbsp;Logout
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
