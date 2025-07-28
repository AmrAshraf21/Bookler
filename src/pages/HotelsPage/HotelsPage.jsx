import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Pagination,
	Stack,
	Typography,
	Skeleton,
	CircularProgress,
	LinearProgress,
	Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHotels } from "../../store/hotelSlice";
import PlaceIcon from "@mui/icons-material/Place";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
export const HotelsPage = () => {
	const { getAllHotels, loading, error } = useSelector((state) => state.hotels);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const hotelsPerPage = 9;

	useEffect(() => {
		dispatch(fetchAllHotels());
	}, [dispatch]);

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const indexOfLastHotel = page * hotelsPerPage;
	const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
	const currentHotels = getAllHotels.slice(indexOfFirstHotel, indexOfLastHotel);

	const totalPages = Math.ceil(getAllHotels.length / hotelsPerPage);
	console.log(currentHotels);

	if (loading) {
		return (
			<Container sx={{ py: 4 }}>
				{/* Progress Bar */}
				<Box sx={{ mb: 3 }}>
					<Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
						<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
							<CircularProgress size={20} sx={{ mr: 2 }} />
							<Typography variant="h6" color="primary">
								Loading Hotels...
							</Typography>
						</Box>
						<LinearProgress variant="indeterminate" color="primary" sx={{ height: 4, borderRadius: 2 }} />
					</Paper>
				</Box>

				{/* Skeleton Loading */}
				<Grid container spacing={3}>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
							<Card sx={{ maxWidth: 350, height: 520, borderRadius: 2 }}>
								<Skeleton variant="rectangular" width="100%" height={200} />
								<CardContent>
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
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		);
	}

	return (
		<Container sx={{ py: 4 }}>
			<Grid container spacing={3}>
				{currentHotels.map((hotel) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={hotel.id}>
						<CardActionArea>
							<Card sx={{ maxWidth: 350, height: 520, borderRadius: 2 }}>
								<CardMedia
									onClick={() => navigate(`/hotel-details/${hotel.id}`)}
									component="img"
									height="200"
									image={hotel.images?.main}
									alt={hotel.name}
								/>
								<CardContent>
									<Typography gutterBottom variant="h6" component="div">
										{hotel.name}
									</Typography>
									<Typography variant="body2" color="textDisabled">
										<PlaceIcon fontSize="20" />
										{hotel.address.country},{hotel.address.city},{hotel.address.street},{hotel.address.state}
									</Typography>
									<Typography variant="body2" sx={{ color: "text.secondary" }}>
										{hotel.description}
									</Typography>
									<Box display="flex" sx={{ py: 1 }} justifyContent="space-between">
										<Typography variant="body2" color="info">
											<StarIcon fontSize="20" />
											{hotel.rating.score}
										</Typography>
										<Typography variant="body2" color="primary">
											{hotel.rating.reviewCount} Reviews
										</Typography>
									</Box>
									<Box display="flex" justifyContent="space-around">
										<Typography sx={{ textDecoration: "line-through" }} variant="body1" color="textDisabled">
											{hotel.pricing[0].currency}
											{hotel.pricing[0].originalPrice}
										</Typography>
										<Typography variant="body1" color="success">
											{hotel.pricing[0].currency}
											{hotel.pricing[0].discountedPrice}
										</Typography>
										<Typography variant="body1" color="error">
											{hotel.pricing[0].discount}
										</Typography>
									</Box>

									<Box display="flex" my={2} flexWrap="wrap" alignItems="center" gap={1}>
										{hotel.amenities.map((item) => (
											<Typography variant="body" sx={{ backgroundColor: "#ccc", p: 1, borderRadius: 2 }}>
												{item}
											</Typography>
										))}
									</Box>
								</CardContent>
							</Card>
						</CardActionArea>
					</Grid>
				))}
			</Grid>

			{totalPages > 1 && (
				<Stack spacing={2} sx={{ mt: 4, alignItems: "center" }}>
					<Pagination count={totalPages} page={page} onChange={handlePageChange} variant="outlined" shape="rounded" />
				</Stack>
			)}
		</Container>
	);
};
