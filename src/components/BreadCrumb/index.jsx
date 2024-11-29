const BreadCrumb = ({ children, className = "" }) => {
  return (
    <nav aria-label="breadcrumb" className={`breadcrumb-nav ${className}`}>
      <div className="container">
        <ol className="breadcrumb">{children}</ol>
      </div>
    </nav>
  );
};

const BreadCrumbItem = ({ children, isActive = false }) => {
  return (
    <li className={`breadcrumb-item ${isActive ? "active" : ""}`}>
      {children}
    </li>
  );
};

BreadCrumb.Item = BreadCrumbItem;
export default BreadCrumb;
