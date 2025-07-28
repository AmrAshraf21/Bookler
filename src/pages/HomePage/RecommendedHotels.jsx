import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedHotels } from "../../store/hotelSlice";
import { Card, CardContent, CardMedia, Typography, CircularProgress, Alert, Button, Skeleton, LinearProgress, Paper, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const RecommendedHotels = () => {
	const dispatch = useDispatch();
	const { recommendedHotels, loading, error } = useSelector((state) => state.hotels);
	const navigate = useNavigate();

	useEffect(() => {
		if(recommendedHotels.length ===0){

			dispatch(fetchRecommendedHotels());
		}
	}, [dispatch,recommendedHotels.length]);

	if (loading) {
		return (
			<div style={{ maxWidth: 1300, margin: "20px auto 80px" }}>
				{/* Progress Bar */}
				<Box sx={{ mb: 3 }}>
					<Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
							<CircularProgress size={20} sx={{ mr: 2 }} />
							<Typography variant="h6" color="primary">
								Loading Recommended Hotels...
							</Typography>
						</Box>
						<LinearProgress 
							variant="indeterminate" 
							color="primary" 
							sx={{ height: 4, borderRadius: 2 }}
						/>
					</Paper>
				</Box>

				<Typography sx={{fontFamily:'monospace',marginTop:10 ,fontWeight:'bold'}} variant="h4">
					Recommended Hotels
				</Typography>

				{/* Skeleton Loading */}
				<Box sx={{ mt: 3 }}>
					{[1, 2].map((idx) => (
						<Card key={idx} sx={{ mx: 1, display: "flex", alignItems: "stretch", minHeight: 200, height: 250, borderRadius: 5, mb: 2 }}>
							<Skeleton variant="rectangular" width={200} height={250} sx={{ borderRadius: 8, p: 2 }} />
							<CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 200, p: 2 }}>
								<div>
									<Skeleton variant="text" width="20%" height={16} sx={{ mb: 1 }} />
									<Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
									<Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
									<Skeleton variant="text" width="70%" height={20} sx={{ mb: 2 }} />
								</div>
								<Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 2 }} />
							</CardContent>
						</Card>
					))}
				</Box>
			</div>
		);
	}
	if (error) return <Alert severity="error">{error}</Alert>;
	if (!recommendedHotels.length)
		return (
			<Typography align="center" sx={{ my: 4 }}>
				No recommended hotels found.
			</Typography>
		);

	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 2000,
		cssEase: "linear",
	};

	return (
		<div style={{ maxWidth: 1300, margin: "20px auto 80px" }}>
		<Typography sx={{fontFamily:'monospace',marginTop:10 ,fontWeight:'bold'}} variant="h4">Recommended Hotels</Typography>
			<Slider {...settings} className="custom-slick-slider">
				{recommendedHotels.map((hotel) => (
					<div key={hotel.id}>
						<Card sx={{ mx: 1, display: "flex", alignItems: "stretch", minHeight: 200, height: 250, borderRadius: 5 }}>
							{hotel?.images && (
								<CardMedia
									onClick={() => navigate(`/hotel-details/${hotel.id}`)}
									component="img"
									image={hotel?.images?.main}
									alt={hotel.name}
									sx={{
										width: 200,
										height: 250,
										objectFit: "cover",
										borderRadius: 8,
										p: 2,
										alignSelf: "center",
										cursor: "pointer",
									}}
								/>
							)}
							<CardContent
								sx={{
									flex: 1,
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									minHeight: 200,
									p: 2,
								}}>
								<div>
									<Typography variant="caption">HOTEL </Typography>
									<Typography variant="h6" gutterBottom align="left">
										{hotel.name}
									</Typography>
									<Typography variant="body2" color="text.secondary" align="left">
										{hotel.address.country}, {hotel.address.city}, {hotel.address.street}
									</Typography>
									<Typography variant="body1" mt={1} color="textPrimary" align="left">
										{hotel.description}
									</Typography>
								</div>
								<Button
								onClick={()=>navigate(`/book-now/${hotel.id}`)}
									variant="contained"
									color="primary"
									endIcon={<SendIcon />}
									sx={{ mt: 1, alignSelf: "flex-start", minWidth: 120 }}>
									Book Now
								</Button>
							</CardContent>
						</Card>
					</div>
				))}
			</Slider>
			<style>{`
		.custom-slick-slider .slick-track {
		  padding-left: 0 !important;
		  padding-right: 0 !important;
		}
	  `}</style>
		</div>
	);
};

export default RecommendedHotels;
