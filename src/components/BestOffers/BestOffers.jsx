import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBestOffersHotels } from "../../store/hotelSlice";
import { Alert, Box, CircularProgress, Grid, Typography, Skeleton, LinearProgress, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
function BestOffers() {
	const { bestOffers, loading, error } = useSelector((state) => state.hotels);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	

	useEffect(() => {
		dispatch(fetchBestOffersHotels());
	}, [dispatch]);

	if (loading) {
		return (
			<Box sx={{ mb: 4 }}>
		
				<Box sx={{ mb: 3 }}>
					<Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
						<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
							<CircularProgress size={20} sx={{ mr: 2 }} />
							<Typography variant="h6" color="primary">
								Loading Best Offers...
							</Typography>
						</Box>
						<LinearProgress variant="indeterminate" color="primary" sx={{ height: 4, borderRadius: 2 }} />
					</Paper>
				</Box>

				<Typography variant="h4" sx={{ fontFamily: "sans-serif", fontWeight: "bold", mb: 3 }}>
					Best Offers
				</Typography>

			
				<Grid container spacing={2} display="flex" justifyContent="space-between">
					{[1, 2, 3, 4].map((idx) => (
						<Grid component="cite" xs={12} sm={6} md={3} lg={3} key={idx}>
							<Box sx={{ width: "300px", p: 2, borderRadius: 10, border: "1px solid #ccc", background: "#f8f9fa" }}>
								<Box display="flex" alignItems="center">
									<Skeleton variant="circular" width={80} height={80} sx={{ mr: 2 }} />
									<Box>
										<Skeleton variant="text" width={120} height={24} sx={{ mb: 1 }} />
										<Skeleton variant="text" width={100} height={20} />
									</Box>
								</Box>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		);
	}
	if (error) return <Alert severity="error">{error}</Alert>;
	if (!bestOffers.length)
		return (
			<Typography align="center" sx={{ my: 4 }}>
				No recommended hotels found.
			</Typography>
		);

	return (
		<>
			<Typography variant="h4" sx={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
				Best Offers
			</Typography>
			<Grid container mt={3} spacing={2} display="flex" justifyContent="space-between">
				{bestOffers.map((hotel) => (
					<Grid
						onClick={() => navigate(`hotel-details/${hotel.id}`)}
						sx={{ cursor: "pointer" }}
						component="cite"
						xs={12}
						sm={6}
						md={3}
						lg={3}
						key={hotel.id}>
						<Box
							display="flex"
							alignItems="center"
							sx={{ width: "300px", p: 2, borderRadius: 10, border: "1px solid #ccc", background: "#f8f9fa" }}>
							<Box
								component="img"
								src={hotel?.image}
								alt={hotel.name}
								sx={{
									width: 80,
									height: 80,
									borderRadius: "50%",
									objectFit: "cover",
									mr: 2,
									boxShadow: 2,
								}}
							/>
							<Box>
								<Typography variant="subtitle1" fontWeight="bold">
									{hotel?.location}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{hotel?.name}
								</Typography>
							</Box>
						</Box>
					</Grid>
				))}
			</Grid>
		</>
	);
}

export default BestOffers;
