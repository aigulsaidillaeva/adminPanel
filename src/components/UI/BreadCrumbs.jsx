import { Link, useLocation } from "react-router";
import styled from "styled-components";

const routeNames = {
  banners: "Баннеры",
  applications: "Заявки",
};

const BreadcrumbNav = styled.nav`
  margin: 10px 0;
  font-size: 18px;
  text-transform: capitalize;
`;

const BreadcrumbItem = styled.span`
  color: ${(props) => (props.isLast ? "black" : "rgb(55, 114, 255)")};
  font-weight: ${(props) => (props.isLast ? "bold" : "normal")};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgb(55, 114, 255);
`;

const Breadcrumbss = ({ bannerTitle }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <BreadcrumbNav>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const label = routeNames[value] || decodeURIComponent(value);

        return (
          <span key={to}>
            {" "}
            ›{" "}
            {isLast ? (
              <BreadcrumbItem isLast>{bannerTitle || label}</BreadcrumbItem>
            ) : (
              <StyledLink to={to}>{label}</StyledLink>
            )}
          </span>
        );
      })}
    </BreadcrumbNav>
  );
};

export default Breadcrumbss;
