import React, { useState } from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, Button, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import {  NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

const Sidebar = () => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const handleToggle = () => setOpen((prev) => !prev);

	return (
		<Box
			sx={{
				width: open ? 240 : 64,
				height:'80vh',
				
				
				background: "linear-gradient(to bottom, #0072ff, #00c6ff)",
				color: "#fff",
				borderRadius: "0 0 16px 16px",
				boxShadow: 3,
				p: 2,
				
				position: "sticky",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				transition: "width 0.3s",
			}}>
			{/* Top */}
			<Box>
				<Box display="flex" justifyContent={open ? "space-between" : "center"} alignItems="center" mb={4}>
					{open && (
						<Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "cursive", transition: "opacity 0.3s" }}>
							Bookler
						</Typography>
					)}
					<IconButton sx={{ color: "#fff" }} onClick={handleToggle}>
						<MenuIcon />
					</IconButton>
				</Box>

				<List>
				<NavLink to='/' style={{textDecoration:'none'}}>

					<ListItem component='button'  sx={{ cursor:'pointer',backgroundColor:'transparent',border:'none' ,color:'white',justifyContent: open ? "flex-start" : "center" }}>
						<ListItemIcon sx={{ color: "#fff", minWidth: 0, justifyContent: "center" }}>
							<HomeIcon />
						</ListItemIcon>
						{open && <ListItemText primary="Home" />}
					</ListItem>
				</NavLink>
					
					{isLoggedIn && (
						<NavLink to='my-booking' style={{textDecoration:'none'}}>

						<ListItem  sx={{ cursor:'pointer',backgroundColor:'transparent',border:'none' ,color:'white',justifyContent: open ? "flex-start" : "center" }}>
							<ListItemIcon sx={{ color: "#fff", minWidth: 0, justifyContent: "center" }}>
								<MenuBookIcon />
							</ListItemIcon>
							{open && <ListItemText primary="My Bookings" />}
						</ListItem>
						</NavLink>
					)}

					<ListItem component='button'  sx={{ cursor:'pointer',backgroundColor:'transparent',border:'none' ,color:'white',justifyContent: open ? "flex-start" : "center" }}>
						<ListItemIcon sx={{ color: "#fff", minWidth: 0, justifyContent: "center" }}>
							<TravelExploreIcon />
						</ListItemIcon>
						{open && <ListItemText primary="Explore" />}
					</ListItem>

					<ListItem component='button'  sx={{ cursor:'pointer',backgroundColor:'transparent',border:'none' ,color:'white',justifyContent: open ? "flex-start" : "center" }}>
						<ListItemIcon sx={{ color: "#fff", minWidth: 0, justifyContent: "center" }}>
							<SupportAgentIcon />
						</ListItemIcon>
						{open && <ListItemText primary="Support" />}
					</ListItem>
				</List>
			</Box>

			{/* Bottom Sign Up Button */}
			{open && (
				<Box textAlign="center">
					{!isLoggedIn ? (
						<Button
							variant="outlined"
							onClick={()=>navigate('/register')}
							sx={{
								
								color: "#ff1744",
								borderColor: "#ff1744",
								borderRadius: "20px",
								px: 2,
								py: 1,
								fontWeight: "bold",
								backgroundColor: "#fff",
								"&:hover": {
									backgroundColor: "#ffecec",
									borderColor: "#ff1744",
								},
							}}>
							Sign UP Now
						</Button>
					) : (
						<Button
							variant="outlined"
							onClick={()=>dispatch(logout())}
							sx={{
								color: "#fff",
								borderColor: "#fff",
								borderRadius: "20px",
								px: 4,
								py: 1,
								fontWeight: "bold",
								"&:hover": {
									backgroundColor: "#eee",
									color: "#000",
								},
							}}>
							Logout
						</Button>
					)}
				</Box>
			)}
		</Box>
	);
};

export default Sidebar;
