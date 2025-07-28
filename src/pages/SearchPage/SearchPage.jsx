import { Container, Grid, Typography, CircularProgress, Box, Skeleton, LinearProgress, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import notFound from "../../assets/images/Group 1754.png";
import { useLocation } from "react-router-dom";
import HotelCard from "../../components/HotelCard/HotelCard";
import { SearchInput } from "../../components/SearchInput/SearchInput";

const SearchPage = () => {
	const { filteredHotels, loading, error } = useSelector((state) => state.hotels);
	const location = useLocation();

	const searchParams = location.state || {};

	if (loading && filteredHotels.length === 0) {
		return (
			<Container maxWidth sx={{ py: 1 }}>
				{/* Progress Bar */}
				<Box sx={{ mb: 3 }}>
					<Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
						<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
							<CircularProgress size={20} sx={{ mr: 2 }} />
							<Typography variant="h6" color="primary">
								Searching Hotels...
							</Typography>
						</Box>
						<LinearProgress variant="indeterminate" color="primary" sx={{ height: 4, borderRadius: 2 }} />
					</Paper>
				</Box>

				<SearchInput />

				{/* Skeleton Loading */}
				<Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} spacing={4}>
					{[1, 2, 3, 4, 5, 6].map((idx) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
							<Box sx={{ width: 400, height: 520 }}>
								<Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2, mb: 2 }} />
								<Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
								<Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
								<Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
								<Skeleton variant="text" width="90%" height={20} sx={{ mb: 2 }} />

								<Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
									<Skeleton variant="text" width="30%" height={20} />
									<Skeleton variant="text" width="40%" height={20} />
								</Box>

								<Box display="flex" justifyContent="space-around" sx={{ mb: 2 }}>
									<Skeleton variant="text" width="25%" height={24} />
									<Skeleton variant="text" width="25%" height={24} />
									<Skeleton variant="text" width="25%" height={24} />
								</Box>

								<Box display="flex" flexWrap="wrap" gap={1}>
									{[1, 2, 3].map((amenity) => (
										<Skeleton key={amenity} variant="rectangular" width={80} height={32} sx={{ borderRadius: 2 }} />
									))}
								</Box>
							</Box>
						</Grid>
					))}
				</Grid>
			</Container>
		);
	}

	if (error) {
		return (
			<Container sx={{ py: 4 }}>
				<Typography color="error" align="center">
					Error: {error}
				</Typography>
			</Container>
		);
	}

	return (
		<Container maxWidth sx={{ py: 1 }}>
			<SearchInput />
			{searchParams.country && (
				<Typography variant="h5" textAlign="center" mt={3} gutterBottom>
					{filteredHotels.length} Hotels in {searchParams.country}
					{searchParams.query && ` matching "${searchParams.query}"`}
				</Typography>
			)}

			{/* Results grid */}
			<Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} spacing={4}>
				{filteredHotels.length > 0 ? (
					filteredHotels.map((hotel) => {
						return (
							<Grid item xs={12} sm={6} md={4} lg={3} key={hotel.id}>
								<HotelCard hotel={hotel} />
							</Grid>
						);
					})
				) : (
					<Grid item xs={12}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								textAlign: "center",
								py: 4,
							}}>
							<img src={notFound} />
							<Typography variant="h6">No hotels found matching your criteria</Typography>
							<Typography>Try adjusting your search filters</Typography>
						</Box>
					</Grid>
				)}
			</Grid>
		</Container>
	);
};

export default SearchPage;
