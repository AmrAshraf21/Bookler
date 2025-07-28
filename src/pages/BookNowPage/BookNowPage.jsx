import {
	Box,
	Paper,
	Typography,
	Container,
	TextField,
	Button,
	Divider,
	Chip,
	InputLabel,
	Select,
	FormControl,
	MenuItem,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	Alert,
	LinearProgress,
	Snackbar,
	Skeleton,
	CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const BookNowPage = () => {
	const { user } = useSelector((state) => state.auth);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			title: "Mr",
			country: user?.country || "",
		},
	});
	const navigate = useNavigate();
	const { id } = useParams();
	const { getAllHotels, loading } = useSelector((state) => state.hotels);
	const hotel = getAllHotels.find((h) => String(h.id) === id);

	// Form state
	const [openSuccess, setOpenSuccess] = useState(false);
	const [checkInDate, setCheckInDate] = useState(new Date());
	const [openSnack, setOpenSnack] = useState(false);
	const [checkOutDate, setCheckOutDate] = useState(() => {
		const date = new Date();
		date.setDate(date.getDate() + 3);
		return date;
	});

	useEffect(() => {
		if (!user) {
			navigate("/login", { state: { from: `/book-now/${id}` } });
		}
	}, [user, navigate, id]);

	useEffect(() => {
		if (user) {
			setValue("email", user.email);
			setValue("phone", user.phone);
			setValue("country", user.country);
		}
	}, [user, setValue]);

	const handlePayment = (data) => {
		const bookingData = {
			hotel: hotel,
			userDetails: data,
			checkInDate: checkInDate.toISOString(),
			checkOutDate: checkOutDate.toISOString(),
			totalPrice: calculateTotalPrice(),
			bookingDate: new Date().toISOString(),
			bookingId: `BOOK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
		};

		const existingBookings = JSON.parse(localStorage.getItem("myBookings")) || [];
		localStorage.setItem("myBookings", JSON.stringify([...existingBookings, bookingData]));

		setOpenSuccess(true);
		setOpenSnack(true);
	};

	const calculateTotalPrice = () => {
		if (!checkInDate || !checkOutDate || !hotel) return 0;
		const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
		return nights * hotel.pricing[0].discountedPrice;
	};

	if (loading) {
		return (
			<Box sx={{ p: 2 }}>
				{/* Progress Bar */}
				<Box sx={{ mb: 3 }}>
					<Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
							<CircularProgress size={20} sx={{ mr: 2 }} />
							<Typography variant="h6" color="primary">
								Loading Booking Details...
							</Typography>
						</Box>
						<LinearProgress 
							variant="indeterminate" 
							color="primary" 
							sx={{ height: 4, borderRadius: 2 }}
						/>
					</Paper>
				</Box>

				{/* Skeleton Loading */}
				<Container maxWidth>
					<Box display="flex" gap={4} mt={2}>
						{/* Booking Form Skeleton */}
						<Box flex={8}>
							<Paper elevation={15} sx={{ p: 3, borderRadius: 4 }}>
								<Skeleton variant="text" width="40%" height={32} sx={{ mb: 3 }} />
								
								{/* Form Fields Skeleton */}
								<Box display="flex" gap={2} mb={3}>
									<Skeleton variant="rectangular" width={120} height={56} />
									<Skeleton variant="rectangular" width="100%" height={56} />
								</Box>
								
								<Box display="flex" gap={2} mb={3}>
									<Skeleton variant="rectangular" width="100%" height={56} />
									<Skeleton variant="rectangular" width="100%" height={56} />
								</Box>
								
								<Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 3 }} />
								<Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 3 }} />
								<Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 3 }} />
								
								{/* Date Pickers Skeleton */}
								<Box display="flex" gap={2} mb={3}>
									<Skeleton variant="rectangular" width="100%" height={56} />
									<Skeleton variant="rectangular" width="100%" height={56} />
								</Box>
								
								<Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 3 }} />
								<Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 3 }} />
								<Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 3 }} />
								
								{/* Submit Button Skeleton */}
								<Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 2 }} />
							</Paper>
						</Box>

						{/* Booking Summary Skeleton */}
						<Box flex={4}>
							<Paper elevation={15} sx={{ p: 3, borderRadius: 4, height: 'fit-content' }}>
								<Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
								<Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2, mb: 2 }} />
								<Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
								<Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
								<Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />
								<Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 2 }} />
							</Paper>
						</Box>
					</Box>
				</Container>
			</Box>
		);
	}

	if (!hotel) {
		return (
			<Typography align="center" sx={{ mt: 4 }}>
				Hotel not found.
			</Typography>
		);
	}

	const countries = ["Egypt", "United States", "Germany", "France"];

	const cardRegex = /^[0-9]{16}$/;
	const cvvRegex = /^[0-9]{3,4}$/;

	return (
		<>
			<Box sx={{ mb: 3 }}>
				<Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center", borderRadius: 4 }}>
					<Typography variant="h5" fontWeight="bold">
						Booking
					</Typography>
					<Typography color="text.disabled" ml={1}>
						| Hotels &gt;
					</Typography>
					<Typography color="text.disabled" ml={1}>
						Hotel Details &gt;
					</Typography>
					<Typography color="primary" ml={1}>
						Booking
					</Typography>
				</Paper>
			</Box>

			<Container maxWidth>
				<Box display="flex" gap={4} mt={2}>
					{/* Booking Form (70% width) */}
					<Box flex={8}>
						<Paper
							component="form"
							onSubmit={handleSubmit(handlePayment)}
							elevation={15}
							sx={{ p: 3, borderRadius: 4 }}>
							<Typography variant="h5" fontWeight="bold">
								Your Details
							</Typography>

							{!user && (
								<Alert severity="error" sx={{ mb: 2 }}>
									Please login to complete your booking
								</Alert>
							)}

							<Box display="flex" gap={2} mb={3}>
								<FormControl sx={{ minWidth: 120 }} error={!!errors.title}>
									<InputLabel id="title-label">Title</InputLabel>
									<Select
										labelId="title-label"
										label="Title"
										defaultValue="Mr"
										{...register("title", { required: "Title is required" })}>
										<MenuItem value="Mr">Mr</MenuItem>
										<MenuItem value="Mrs">Mrs</MenuItem>
									</Select>
									{errors.title && (
										<Typography variant="caption" color="error">
											{errors.title.message}
										</Typography>
									)}
								</FormControl>

								<TextField
									fullWidth
									label="First Name"
									{...register("firstName", { required: "First name is required" })}
									error={!!errors.firstName}
									helperText={errors.firstName?.message}
								/>

								<TextField
									fullWidth
									label="Last Name"
									{...register("lastName", { required: "Last name is required" })}
									error={!!errors.lastName}
									helperText={errors.lastName?.message}
								/>
							</Box>

							<TextField
								fullWidth
								label="Email"
								type="email"
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "Invalid email address",
									},
								})}
								error={!!errors.email}
								helperText={errors.email?.message}
								sx={{ mb: 3 }}
							/>

							<Box display="flex" gap={3}>
								<FormControl fullWidth error={!!errors.country}>
									<InputLabel id="country-label">Country</InputLabel>
									<Select
										labelId="country-label"
										label="Country"
										defaultValue={user?.country || ""}
										{...register("country", { required: "Country is required" })}>
										{countries.map((country) => (
											<MenuItem key={country} value={country}>
												{country}
											</MenuItem>
										))}
									</Select>
									{errors.country && (
										<Typography variant="caption" color="error">
											{errors.country.message}
										</Typography>
									)}
								</FormControl>

								<TextField
									fullWidth
									label="Phone Number"
									{...register("phone", {
										required: "Phone number is required",
										pattern: {
											value: /^[0-9]{10,15}$/,
											message: "Invalid phone number",
										},
									})}
									error={!!errors.phone}
									helperText={errors.phone?.message}
								/>
							</Box>

							<Divider sx={{ my: 2 }} />

							<Typography variant="h6" fontWeight="bold" mb={3}>
								Payment Information
							</Typography>

							<TextField
								fullWidth
								label="Card Number"
								{...register("cardNumber", {
									required: "Card number is required",
									pattern: {
										value: cardRegex,
										message: "Invalid card number (16 digits)",
									},
								})}
								error={!!errors.cardNumber}
								helperText={errors.cardNumber?.message}
								sx={{ mb: 3 }}
							/>

							<Box display="flex" gap={2} mb={3}>
								<TextField
									fullWidth
									label="Expiry Date (MM/YY)"
									{...register("expiryDate", {
										required: "Expiry date is required",
									})}
									error={!!errors.expiryDate}
									helperText={errors.expiryDate?.message}
								/>

								<TextField
									fullWidth
									label="CVV"
									{...register("cvv", {
										required: "CVV is required",
										pattern: {
											value: cvvRegex,
											message: "Invalid CVV (3-4 digits)",
										},
									})}
									error={!!errors.cvv}
									helperText={errors.cvv?.message}
								/>
							</Box>

							<TextField
								fullWidth
								label="Card Holder Name"
								{...register("cardHolder", { required: "Card holder name is required" })}
								error={!!errors.cardHolder}
								helperText={errors.cardHolder?.message}
								sx={{ mb: 3 }}
							/>

							<Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.5 }} disabled={!user}>
								PAY NOW
							</Button>
						</Paper>
					</Box>

					{/* Booking Summary (30% width) */}
					<Box flex={2}>
						<Paper elevation={3} sx={{ p: 2, borderRadius: 4, position: "sticky", top: 20 }}>
							<Typography variant="h6" fontWeight="bold" mb={2}>
								Your Booking Summary
							</Typography>

							<Box width={350}>
								<img src={hotel.images.main} alt={hotel.name} width="100%" style={{ borderRadius: 10 }} />
							</Box>

							<Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
								<Box flex={2}>
									<Typography variant="subtitle1" fontWeight="bold">
										{hotel.name}
									</Typography>
									<Box display="flex" mt={1}>
										<LocationOnIcon sx={{ color: "#3c6079" }} />
										<Typography sx={{ width: "80%" }}>
											{hotel.address.street}, {hotel.address.city}, {hotel.address.state}, {hotel.address.country}
										</Typography>
									</Box>
								</Box>
								<Box>
									<Typography fontSize={20} color="red">
										{hotel.pricing[0].discount}
									</Typography>
									<Box display="flex" alignItems="baseline">
										<Typography sx={{ fontSize: "30px" }}>{hotel.pricing[0].discountedPrice}</Typography>
										<Typography variant="body2" color="text.disabled" ml={0.5}>
											{hotel.pricing[0].currency}
										</Typography>
									</Box>
									<Typography variant="body2">{hotel.pricing[0].priceUnit}</Typography>
								</Box>
							</Box>

							<Divider sx={{ my: 2 }} />

							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<Box mb={2}>
									<DatePicker
										label="Check-in"
										value={checkInDate}
										onChange={(newValue) => setCheckInDate(newValue)}
										minDate={new Date()}
										slotProps={{
											textField: {
												fullWidth: true,
												required: true,
											},
										}}
									/>
								</Box>

								<Box mb={2}>
									<DatePicker
										label="Check-out"
										value={checkOutDate}
										onChange={(newValue) => setCheckOutDate(newValue)}
										minDate={checkInDate}
										slotProps={{
											textField: {
												fullWidth: true,
												required: true,
											},
										}}
									/>
								</Box>
							</LocalizationProvider>

							<Box display="flex" justifyContent="space-between" mb={2}>
								<Typography variant="body2" color="text.secondary">
									Total Nights
								</Typography>
								<Typography variant="body1">
									{checkInDate && checkOutDate ? Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)) : 0}{" "}
									nights
								</Typography>
							</Box>

							<Box display="flex" justifyContent="space-between" mb={1}>
								<Typography variant="body2" color="text.secondary">
									Price per night
								</Typography>
								<Typography variant="body2">
									{hotel.pricing[0].currency} {hotel.pricing[0].discountedPrice}
								</Typography>
							</Box>

							<Divider sx={{ my: 2 }} />

							<Box display="flex" justifyContent="space-between">
								<Typography variant="subtitle1" fontWeight="bold">
									Total Price
								</Typography>
								<Typography variant="subtitle1" fontWeight="bold">
									{hotel.pricing[0].currency} {calculateTotalPrice()}
								</Typography>
							</Box>

							<Chip label="Free cancellation available" color="success" size="small" sx={{ mt: 2 }} />
						</Paper>
					</Box>
				</Box>
			</Container>

			{/* Success Dialog */}
			<Dialog
				open={openSuccess}
				onClose={() => setOpenSuccess(false)}
				sx={{
					"& .MuiDialog-paper": {
						borderRadius: 3,
						maxWidth: 500,
						width: "100%",
						textAlign: "center",
						position: "relative",
					},
				}}>
				<IconButton
					aria-label="close"
					onClick={() => setOpenSuccess(false)}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}>
					<CloseIcon />
				</IconButton>

				<DialogContent sx={{ py: 4, px: 6 }}>
					<CheckCircleIcon
						color="success"
						sx={{
							fontSize: 80,
							mb: 2,
							color: "#4caf50",
						}}
					/>
					<Typography variant="h5" fontWeight="bold" gutterBottom>
						Booking Confirmed!
					</Typography>
					<Typography variant="body1" color="text.secondary" mb={3}>
						Your reservation at <strong>{hotel?.name}</strong> is confirmed.
					</Typography>
					<Typography variant="body2">Confirmation has been sent to your email.</Typography>
				</DialogContent>

				<DialogActions sx={{ justifyContent: "center", pb: 4 }}>
					<Button
						variant="contained"
						size="large"
						sx={{
							px: 4,
							backgroundColor: "#4caf50",
							"&:hover": { backgroundColor: "#388e3c" },
						}}
						onClick={() => {
							setOpenSuccess(false);
							navigate("/my-booking");
						}}>
						View Booking
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={openSnack}
				autoHideDuration={3000}
				onClose={() => setOpenSnack(false)}
				message="Booking Created successfully"
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				sx={{
					"& .MuiSnackbarContent-root": {
						backgroundColor: "#0cc925ff", // Red color
						color: "white",
						fontSize: "1rem",
					},
				}}
			/>
		</>
	);
};

export default BookNowPage;
