import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Box, TextField, Button, Typography, MenuItem, Container, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import FacebookIcon from "@mui/icons-material/Facebook";
import bg from "../../assets/images/BG.png";
import logo from "../../assets/images/Brand Logo.png";
import google from "../../assets/images/google 1.png";
import { registerUser } from "../../store/authSlice";

function RegisterPage() {
	const { register, watch, handleSubmit, formState } = useForm();
	const navigate = useNavigate();
	const [country, setCountry] = useState("");
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.auth);
	const password = watch("password");

	const countries = [
		{ value: "EG", label: "Egypt" },
		{ value: "US", label: "United States" },
		{ value: "DE", label: "Germany" },
		{ value: "FR", label: "France" },
	];

	const onSubmit = async (data) => {
		const resultAction = await dispatch(registerUser(data));
		if (registerUser.fulfilled.match(resultAction)) {
			navigate("/login");
		}
	};
	return (
		<>
			<Container sx={{ mt: 2 }}>
				<Grid
					sx={{
						display: "flex",
						justifyContent: "space-between",
						
						
						borderRadius: "20px",
					}}>
					{/* Left Side (Form) */}

					<Grid
						item
						xs={12}
						md={6}
						lg={6}
						sx={{
							display: "flex",
							flexDirection: "column",

							p: 3,
						}}>
						<Box textAlign="center" sx={{ width: "100%", maxWidth: 500 }}>
							<img src={logo} />
							<Typography variant="h4" gutterBottom>
								Signup
							</Typography>
							<form onSubmit={handleSubmit(onSubmit)}>
								{error && (
									<Alert severity="error" sx={{ mb: 2 }}>
										{error}
										{error.includes("already exists") && (
											<>
												<br />
												<Link to="/login" style={{ color: "#1976d2", textDecoration: "underline" }}>
													You can Login
												</Link>
											</>
										)}
									</Alert>
								)}
								<TextField
									fullWidth
									label="Name"
									margin="none"
									{...register("name", {
										required: {
											value: true,
											message: "Name is required",
										},
									})}
								/>
								{formState.errors.name && (
									<small style={{ color: "red", display: "block", textAlign: "left" }}>
										{formState.errors.name.message}
									</small>
								)}
								<TextField
									fullWidth
									label="Email"
									type="email"
									margin="dense"
									{...register("email", {
										required: {
											value: true,
											message: "Email is required",
										},
										pattern: {
											value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
											message: "Invalid email format",
										},
									})}
								/>
								{formState.errors.email && (
									<small style={{ color: "red", display: "block", textAlign: "left" }}>
										{formState.errors.email.message}
									</small>
								)}
								<TextField
									fullWidth
									label="Password"
									type="password"
									margin="dense"
									{...register("password", {
										required: {
											value: true,
											message: "Password is required",
										},
										pattern: {
											value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
											message: "Password must at least 1 of each (Special Char, Capital Letter , Number)",
										},
									})}
								/>
								{formState.errors.password && (
									<small style={{ color: "red", display: "block", textAlign: "left" }}>
										{formState.errors.password.message}
									</small>
								)}
								<TextField
									fullWidth
									label="Confirm Password"
									type="password"
									margin="dense"
									{...register("confirmPassword", {
										required: {
											value: true,
											message: "confirm password is required",
										},
										validate: (val) => val === password || "password does not match",
									})}
								/>
								{formState.errors.confirmPassword && (
									<small style={{ color: "red", display: "block", textAlign: "left" }}>
										{formState.errors.confirmPassword.message}
									</small>
								)}

								<TextField
									fullWidth
									select
									label="Select Country"
									value={country}
									{...register("country", {
										required: {
											value: true,
											message: "Country is required",
										},
									})}
									onChange={(e) => {
										setCountry(e.target.value);
									}}>
									{countries.map((option) => (
										<MenuItem key={option.value} value={option.label}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								{formState.errors.country && (
									<small style={{ color: "red", display: "block", textAlign: "left" }}>
										{formState.errors.country.message}
									</small>
								)}

								<TextField
									fullWidth
									label="Phone"
									type="number"
									margin="dense"
									{...register("phone", {
										required: {
											value: true,
											message: "Phone number is required",
										},
										pattern: {
											value: /^\d{11}$/,
											message: "Phone number must be 12 digits",
										},
									})}
								/>
								{formState.errors.phone && (
									<small style={{ color: "red", display: "block", textAlign: "left" }}>
										{formState.errors.phone.message}
									</small>
								)}
								<Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
									Signup
								</Button>
							</form>
							<Button variant="outlined" fullWidth sx={{ mt: 2, outline: "none", textTransform: "none" }}>
								Signup with others
							</Button>
							<Button
								variant="outlined"
								fullWidth
								startIcon={
									<span style={{ display: "flex", alignItems: "center" }}>
										<FacebookIcon sx={{ fontSize: 30 }} />
									</span>
								}
								sx={{
									mb: 2,
									mt: 2,
									textTransform: "none",
									backgroundColor: "#fff",
									color: "#1877f3",
									borderColor: "#ddd",
								}}>
								Login with Facebook
							</Button>
							<Button
								variant="outlined"
								fullWidth
								startIcon={<img src={google} />}
								sx={{ mb: 2, textTransform: "none", backgroundColor: "#fff", color: "#1877f3", borderColor: "#ddd" }}>
								Login with Google
							</Button>
							<Link to={"/login"} style={{ textDecoration: "none", color: "#1877f3" }}>
								Already Have an Account? Login
							</Link>
						</Box>
					</Grid>
					<Grid
						item
						xs={false}
						md={6}
						sx={{
							display: { xs: "none", md: "block" },

							width: "70%",

							backgroundImage: `url("${bg}")`,
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
							backgroundPosition: "center",
							borderRadius: "0 8px 8px 0",
						}}
					/>
				</Grid>
			</Container>
		</>
	);
}

export default RegisterPage;
