import {
	Box,
	Typography,
	Container,
	Paper,
	Avatar,
	Divider,
	Chip,
	Button,
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MyBookingPage = () => {
	const [bookings, setBookings] = useState(() => {
		const savedBookings = localStorage.getItem("myBookings");
		return savedBookings ? JSON.parse(savedBookings) : [];
	});
	const [openCancelDialog, setOpenCancelDialog] = useState(false);
	const [bookingToCancel, setBookingToCancel] = useState(null);
	const [openSnack, setOpenSnack] = useState(false);

	const navigate = useNavigate();

	const handleOpenCancelDialog = (bookingId) => {
		setBookingToCancel(bookingId);
		setOpenCancelDialog(true);
	};

	// Close dialog
	const handleCloseCancelDialog = () => {
		setOpenCancelDialog(false);
		setBookingToCancel(null);
	};

	// Confirm cancellation
	const handleConfirmCancel = () => {
		const updatedBookings = bookings.filter((booking) => booking.bookingId !== bookingToCancel);

		localStorage.setItem("myBookings", JSON.stringify(updatedBookings));
		setBookings(updatedBookings);

		handleCloseCancelDialog();
		setOpenSnack(true);
	};



	return (
		<>
			<Container maxWidth="lg" sx={{ py: 4 }}>
				{/* Confirmation Dialog */}
				<Dialog open={openCancelDialog} onClose={handleCloseCancelDialog} maxWidth="xs" fullWidth>
					<DialogTitle>Cancel Booking</DialogTitle>
					<DialogContent>
						<Typography>Are you sure you want to cancel this booking? This action cannot be undone.</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseCancelDialog}>Keep Booking</Button>
						<Button onClick={handleConfirmCancel} color="error" variant="contained">
							Confirm Cancellation
						</Button>
					</DialogActions>
				</Dialog>

				{bookings.length === 0 ? (
					<Box sx={{ mt: 4 }}>
						<Typography variant="h5" align="center">
							You have no bookings yet.
						</Typography>
						<Button variant="contained" sx={{ mt: 3, display: "block", mx: "auto" }} onClick={() => navigate("/")}>
							Browse Hotels
						</Button>
					</Box>
				) : (
					<>
						<Typography variant="h4" fontWeight="bold" mb={4}>
							My Bookings
						</Typography>

						<Box display="flex" flexDirection="column" gap={3}>
							{bookings.map((booking, index) => (
								<Paper key={index} elevation={3} sx={{ p: 3, borderRadius: 3 }}>
									<Box display="flex" gap={3}>
										{/* Hotel Image */}
										<Avatar src={booking.hotel.images.main} variant="rounded" sx={{ width: 200, height: 150 }} />

										{/* Booking Details */}
										<Box flex={1}>
											<Typography variant="h6" fontWeight="bold">
												{booking.hotel.name}
											</Typography>
											<Box display="flex" alignItems="center" mt={1} mb={2}>
												<LocationOnIcon sx={{ color: "#3c6079", mr: 1 }} />
												<Typography variant="body2">
													{booking.hotel.address.street}, {booking.hotel.address.city}
												</Typography>
											</Box>

											<Divider sx={{ my: 2 }} />

											<Box display="flex" justifyContent="space-between" flexWrap="wrap">
												<Box>
													<Typography variant="body2" color="text.secondary">
														Check-in
													</Typography>
													<Typography fontWeight="bold">
														{new Date(booking.checkInDate).toLocaleDateString()}
													</Typography>
												</Box>

												<Box>
													<Typography variant="body2" color="text.secondary">
														Check-out
													</Typography>
													<Typography fontWeight="bold">
														{new Date(booking.checkOutDate).toLocaleDateString()}
													</Typography>
												</Box>

												<Box>
													<Typography variant="body2" color="text.secondary">
														Total Price
													</Typography>
													<Typography fontWeight="bold">
														{booking.hotel.pricing[0].currency} {booking.totalPrice}
													</Typography>
												</Box>

												<Box>
													<Typography variant="body2" color="text.secondary">
														Booking ID
													</Typography>
													<Typography fontWeight="bold">{booking.bookingId}</Typography>
												</Box>
											</Box>
										</Box>
									</Box>

									<Box display="flex" justifyContent="flex-end" mt={2}>
										<Chip label="Confirmed" color="success" size="small" sx={{ mr: 2 }} />
										<Button
											variant="outlined"
											size="small"
											onClick={() => navigate(`/hotel-details/${booking.hotel.id}`)}>
											View Hotel
										</Button>
										<Button
											variant="outlined"
											color="error"
											size="small"
											startIcon={<DeleteIcon />}
											onClick={() => handleOpenCancelDialog(booking.bookingId)}>
											Cancel
										</Button>
									</Box>
								</Paper>
							))}
						</Box>
					</>
				)}
			</Container>
			<Snackbar
				open={openSnack}
				autoHideDuration={3000}
				onClose={() => setOpenSnack(false)}
				message="Booking Cancelled successfully"
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				sx={{
					"& .MuiSnackbarContent-root": {
						backgroundColor: "#c70909ff", // Success green
						color: "white",
						fontSize: "1rem",
						fontWeight: "500",
					},
				}}
			/>
		</>
	);
};

export default MyBookingPage;
