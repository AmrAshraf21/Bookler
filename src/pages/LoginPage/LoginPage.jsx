import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Box, TextField, Button, Typography, MenuItem, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import FacebookIcon from "@mui/icons-material/Facebook";
import bg from "../../assets/images/BG.png";
import logo from "../../assets/images/Brand Logo.png";
import google from "../../assets/images/google 1.png";
import { loginUser } from "../../store/authSlice";
import { useEffect } from "react";

function LoginPage() {
	const { register, handleSubmit, formState } = useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading,error, isLoggedIn } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isLoggedIn) navigate("/");
	}, [isLoggedIn, navigate]);

	const onSubmit = async (data) => {
		dispatch(loginUser(data));
		// const resultAction = await dispatch(loginUser(data));
		// console.log(resultAction);

		// console.log(error);
		// if (loginUser.fulfilled.match(resultAction)) {

		// 	navigate("/"); // or navigate to your home/dashboard page
		// }
	};
	return (
		<Container sx={{ mt: 15 }}>
			<Grid
				container
				sx={{
					display: "flex",
					justifyContent: "space-between",
					backgroundColor: "#f5f5f5",
					borderRadius: 8,
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
						textAlign: "center",
						p: 4,
					}}>
					<Box sx={{ width: "100%", maxWidth: 500 }}>
					
						<img src={logo} alt="Logo" />
						<Typography variant="h4" gutterBottom>
							Login
						</Typography>

						{error && (
							<Typography color="error" sx={{ mb: 2 }}>
								{error}
							</Typography>
						)}

						<form onSubmit={handleSubmit(onSubmit)}>
							<TextField
								fullWidth
								label="Email"
								type="email"
								margin="normal"
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: "Invalid email format",
									},
								})}
								error={!!formState.errors.email}
								helperText={formState.errors.email?.message}
							/>

							<TextField
								fullWidth
								label="Password"
								type="password"
								margin="normal"
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 6,
										message: "Password must be at least 6 characters",
									},
								})}
								error={!!formState.errors.password}
								helperText={formState.errors.password?.message}
							/>

							<Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
								{loading ? "Logging in..." : "Login"}
							</Button>
						</form>

						{/* Social login buttons */}
						<Button variant="outlined" fullWidth sx={{ mt: 2, textTransform: "none" }}>
							Login with others
						</Button>

						<Button
							variant="outlined"
							fullWidth
							startIcon={<FacebookIcon sx={{ fontSize: 30 }} />}
							sx={{ mb: 2, mt: 2, textTransform: "none" }}>
							Login with Facebook
						</Button>

						<Button
							variant="outlined"
							fullWidth
							startIcon={<img src={google} alt="Google" />}
							sx={{ mb: 2, textTransform: "none" }}>
							Login with Google
						</Button>

						<Link to="/register" style={{ textDecoration: "none", color: "#1877f3" }}>
							Don't Have an Account? Register now
						</Link>
					</Box>
				</Grid>

				{/* Right Side (Image) */}
			<Grid
						item
						xs={false}
						md={6}
						sx={{
							display: { xs: "none", md: "block" },
							height: "65vh",
							width: "50%",

							backgroundImage: `url("${bg}")`,
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
							backgroundPosition: "center",
							borderRadius: "0 8px 8px 0",
						}}
					/>
				</Grid>
		</Container>
	);
}

export default LoginPage;
