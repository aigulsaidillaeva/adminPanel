import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet, useLocation } from "react-router";
import { Box } from "@mui/material";

const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30pa7tZwzxwPPgG5AoxAjPEjekuPWO5hUxQ&s"
            alt="Logo"
            sx={{ height: 40, mr: 2 }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
              gap: 3,
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              <Link
                to="/banner"
                style={{
                  textDecoration: "none",
                  color: location.pathname === "/banner" ? "#1976d2" : "#333",
                  fontWeight: 500,
                  borderBottom:
                    location.pathname === "/banner"
                      ? "2px solid #1976d2"
                      : "none",
                  transition: "color 0.3s, border-bottom 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#1976d2")}
                onMouseLeave={(e) =>
                  (e.target.style.color =
                    location.pathname === "/banner" ? "#1976d2" : "#333")
                }
              >
                Баннер
              </Link>
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              <Link
                to="/application"
                style={{
                  textDecoration: "none",
                  color:
                    location.pathname === "/application" ? "#1976d2" : "#333",
                  fontWeight: 500,
                  borderBottom:
                    location.pathname === "/application"
                      ? "2px solid #1976d2"
                      : "none",
                  transition: "color 0.3s, border-bottom 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#1976d2")}
                onMouseLeave={(e) =>
                  (e.target.style.color =
                    location.pathname === "/application" ? "#1976d2" : "#333")
                }
              >
                Заявки
              </Link>
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 500, color: "black" }}>
            Администратор
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: "20px" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout;
