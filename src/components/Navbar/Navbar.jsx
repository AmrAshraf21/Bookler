import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	IconButton,
	Stack,
	List,
	ListItem,
	ListItemText,
	Avatar,
	Menu,
	MenuItem,
	Tooltip,
} from "@mui/material";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import HotelIcon from "@mui/icons-material/Hotel";
import VillaIcon from "@mui/icons-material/Villa";
import { NavLink, useNavigate } from "react-router-dom";
import bg from "../../assets/images/WhatsApp Image 2025-07-17 at 6.02.21 PM.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isLoggedIn } = useSelector((state) => state.auth);


	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const { name } = JSON.parse(localStorage.getItem("auth"))?.user || "";

	const handleOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		dispatch(logout())
		handleClose();
	};
	return (
		<AppBar
			position="static"
			elevation={0}
			sx={{
				position: "relative",
				color: "white",
				boxShadow: "none",
				px: 3,
				pt: 2,
				height: "300px",
			}}>
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					width: "100%",
					height: "100%",
					zIndex: 0,
					backgroundImage: `url(${bg})`,
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "cover",
					opacity: 0.85,
				}}
			/>
			<Toolbar sx={{ justifyContent: "space-between", position: "relative", zIndex: 1 }}>
				{/* Left Side */}
				<Box display="flex" alignItems="center" gap={2}>
					<Typography variant="h4" sx={{ fontFamily: "cursive", fontWeight: "bold" }}>
						Bookler
					</Typography>
				</Box>

				{/* Right Side */}
				{!isLoggedIn ? (
					<Box display="flex" alignItems="center" gap={2}>
						<Button color="inherit" onClick={() => navigate("/login")} sx={{ textTransform: "none", fontWeight: 500 }}>
							Login
						</Button>
						<Button
							variant="contained"
							sx={{
								color: "#fff",
								borderColor: "#fff",
								textTransform: "none",
								fontWeight: 500,
								"&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
							}}
							onClick={() => navigate("/register")}>
							Sign up
						</Button>
					</Box>
				) : (
					<Box sx={{ position: "absolute", top: 16, right: 16 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpen} sx={{ p: 0 }}>
								<Avatar alt="User Profile" src="https://i.pravatar.cc/40" />
								<Typography ml={1} sx={{ color: "white" }} variant="body1">
									Hello, {name}
								</Typography>
							</IconButton>
						</Tooltip>
						<Menu
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							onClick={handleClose}
							PaperProps={{
								elevation: 3,
								sx: {
									mt: 1.5,
									minWidth: 180,
								},
							}}>
							<MenuItem onClick={() => navigate("/my-booking")}>My Profile</MenuItem>
							<MenuItem onClick={() => alert("Settings")}>Settings</MenuItem>
							<MenuItem onClick={handleLogout}>Logout</MenuItem>
						</Menu>
					</Box>
				)}
			</Toolbar>
			<Stack direction="row" mt={8} ml={10} spacing={4}>
				<List>
					<ListItem sx={{ flexDirection: "column", alignItems: "center", py: 0, '&:hover':{backgroundColor:'#0a6ada',borderRadius:5} }}>
						<NavLink
						
							to="/hotels"
							style={({ isActive }) => ({
								color: "white",
								backgroundColor: isActive ? "#0a6ada" : "transparent",
								padding: "0.5rem",
								borderRadius: 10,
								textDecoration: "none",
								fontWeight: isActive ? "bold" : "normal",
							})}>
							<HotelIcon sx={{ fontSize: 40 }} />
							<ListItemText  primary="HOTELS" primaryTypographyProps={{ align: "center" }} />
						</NavLink>
					</ListItem>
				</List>
				<List>
					<ListItem sx={{ flexDirection: "column", alignItems: "center", py: 0,'&:hover':{backgroundColor:'#0a6ada',borderRadius:5} }}>
						<NavLink
							to="villa"
							style={({ isActive }) => ({
								color: "white",
								backgroundColor: isActive ? "#0a6ada" : "transparent",
								padding: "0.5rem",
								borderRadius: 10,
								textDecoration: "none",
								fontWeight: isActive ? "bold" : "normal",
							})}>
							<VillaIcon sx={{ fontSize: 40 }} />
							<ListItemText primary="VILLA" primaryTypographyProps={{ align: "center" }} />
						</NavLink>
					</ListItem>
				</List>
				<List>
					<ListItem sx={{ flexDirection: "column", alignItems: "center", py: 0 ,'&:hover':{backgroundColor:'#0a6ada',borderRadius:5} }}>
						<NavLink
							to="Taxi"
							style={({ isActive }) => ({
								color: "white",
								backgroundColor: isActive ? "#0a6ada" : "transparent",
								padding: "0.5rem",
								borderRadius: 10,
								textDecoration: "none",
								fontWeight: isActive ? "bold" : "normal",
							})}>
							<LocalTaxiIcon sx={{ fontSize: 40 }} />
							<ListItemText primary="TAXI" primaryTypographyProps={{ align: "center" }} />
						</NavLink>
					</ListItem>
				</List>
				<List>
					<ListItem sx={{ flexDirection: "column", alignItems: "center", py: 0 , '&:hover':{backgroundColor:'#0a6ada',borderRadius:5} }}>
						<NavLink
							to="flights"
							style={({ isActive }) => ({
								color: "white",
								backgroundColor: isActive ? "#0a6ada" : "transparent",
								padding: "0.5rem",
								borderRadius: 10,
								textDecoration: "none",
								fontWeight: isActive ? "bold" : "normal",
							})}>
							<AirplaneTicketIcon sx={{ fontSize: 40 }} />
							<ListItemText primary="FLIGHTS" primaryTypographyProps={{ align: "center" }} />
						</NavLink>
					</ListItem>
				</List>
			</Stack>
		</AppBar>
	);
};

export default Navbar;
