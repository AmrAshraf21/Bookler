// components/Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { Box, Container } from "@mui/material";

const Layout = () => {
  return (
    

    <Box sx={{ display: "flex" }}>
      {/* Sidebar stays fixed on the left */}
      <Sidebar />

      <Box  sx={{ flexGrow: 1 }}>
        {/* Navbar at the top of content */}
        <Navbar />
        
        {/* Main content changes with the route */}
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
    
  );
};

export default Layout;
