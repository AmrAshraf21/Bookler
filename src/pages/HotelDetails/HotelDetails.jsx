import React, { useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, CircularProgress, Paper, Typography, Skeleton, LinearProgress } from "@mui/material";
import Slider from "react-slick";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WifiIcon from "@mui/icons-material/Wifi";
import BathtubIcon from "@mui/icons-material/Bathtub";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SpaIcon from "@mui/icons-material/Spa";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VideocamIcon from "@mui/icons-material/Videocam";
import RecommendedHotels from "../HomePage/RecommendedHotels";

export const HotelDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { getAllHotels, bestOffers, loading } = useSelector((state) => state.hotels);
	const hotel = getAllHotels.find((h) => String(h.id) === id) || bestOffers.find((h) => String(h.id) === id);
	const sliderRef = useRef();
	const [current, setCurrent] = useState(0);

	let gallery = hotel?.images?.gallery || [];
	if (!gallery.length && hotel?.images?.main) {
		gallery = [hotel?.images?.main];
	}

	if (loading) {
		return (
			<Box sx={{ p: 2 }}>
				{/* Progress Bar */}
				<Box sx={{ mb: 3 }}>
					<Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
						<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
							<CircularProgress size={20} sx={{ mr: 2 }} />
							<Typography variant="h6" color="primary">
								Loading Hotel Details...
							</Typography>
						</Box>
						<LinearProgress variant="indeterminate" color="primary" sx={{ height: 4, borderRadius: 2 }} />
					</Paper>
				</Box>

				{/* Skeleton Loading */}
				<Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
					{/* Hotel Name Skeleton */}
					<Skeleton variant="text" width="60%" height={48} sx={{ mb: 2 }} />

					<Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="stretch" gap={4}>
						{/* Image Gallery Skeleton */}
						<Box flex={1} sx={{ position: "relative", height: 500, maxWidth: 800 }}>
							<Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 2 }} />
							{/* Thumbnail skeletons */}
							<Box
								display="flex"
								justifyContent="center"
								gap={1}
								sx={{
									position: "absolute",
									left: 0,
									right: 0,
									bottom: 16,
									zIndex: 2,
								}}>
								{[1, 2, 3, 4].map((idx) => (
									<Skeleton key={idx} variant="rectangular" width={56} height={40} sx={{ borderRadius: 2 }} />
								))}
							</Box>
						</Box>

						{/* Content Skeleton */}
						<Box flex={1} display="flex" flexDirection="column">
							{/* Rating Skeleton */}
							<Skeleton variant="text" width="30%" height={24} sx={{ mb: 1 }} />
							<Box sx={{ width: "90%" }} display="flex" justifyContent="space-between" alignItems="center" mb={3}>
								<Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 2 }} />
								<Skeleton variant="text" width={80} height={32} />
							</Box>

							{/* About Section Skeleton */}
							<Skeleton variant="text" width="20%" height={32} sx={{ mb: 1 }} />
							<Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.5 }} />
							<Skeleton variant="text" width="90%" height={20} sx={{ mb: 0.5 }} />
							<Skeleton variant="text" width="70%" height={20} sx={{ mb: 2 }} />
							<Skeleton variant="text" width="30%" height={20} sx={{ mb: 3 }} />

							{/* Location Skeleton */}
							<Box display="flex" mt={2} mb={3}>
								<Skeleton variant="circular" width={24} height={24} sx={{ mr: 2 }} />
								<Skeleton variant="text" width="80%" height={20} />
							</Box>

							{/* Amenities Skeleton */}
							<Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
							<Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-start">
								{[1, 2, 3, 4, 5, 6].map((idx) => (
									<Skeleton key={idx} variant="rectangular" width={120} height={40} sx={{ borderRadius: 2 }} />
								))}
							</Box>

							{/* Button Skeleton */}
							<Skeleton variant="rectangular" width="90%" height={48} sx={{ mt: 3, borderRadius: 2 }} />
						</Box>
					</Box>
				</Paper>
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

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		beforeChange: (oldIndex, newIndex) => setCurrent(newIndex),
	};

	return (
		<>
			<Box mx="auto" mt={2}>
				<Box sx={{ mb: 3 }}>
					<Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center", borderRadius: 4 }}>
						<Typography variant="h5" fontWeight="bold">
							Hotel Details
						</Typography>
						<Typography color="textDisabled" ml={1}>
							| Hotels &gt;
						</Typography>
						<Typography color="primary" ml={1}>
							Hotel Details
						</Typography>
					</Paper>
				</Box>
				<Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
					<Typography variant="h4" fontWeight="bold" gutterBottom fontFamily="unset">
						{hotel.name}
					</Typography>
					<Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="stretch" gap={4}>
						<Box
							flex={1}
							display="flex"
							flexDirection="column"
							alignItems="center"
							justifyContent="center"
							sx={{ position: "relative", height: 500, maxWidth: 800, overflow: "hidden", borderRadius: 2 }}>
							<Slider {...settings} ref={sliderRef} style={{ width: "100%", height: "100%" }}>
								{gallery.map((img, idx) => (
									<img key={idx} src={img} alt={hotel.name} style={{ objectFit: "cover", display: "block" }} />
								))}
							</Slider>
							<Box
								display="flex"
								justifyContent="center"
								gap={1}
								sx={{
									position: "absolute",
									left: 0,
									right: 0,
									bottom: 16,
									zIndex: 2,
								}}>
								{gallery.map((img, idx) => (
									<Box
										key={idx}
										component="img"
										src={img}
										alt={hotel.name}
										onClick={() => {
											setCurrent(idx);
											sliderRef.current.slickGoTo(idx);
										}}
										sx={{
											width: 56,
											height: 40,
											objectFit: "cover",
											borderRadius: 2,
											border: idx === current ? "2px solid #1976d2" : "2px solid transparent",
											cursor: "pointer",
											transition: "border 0.2s",
											background: "#fff",
											boxShadow: 2,
											pointerEvents: "auto",
										}}
									/>
								))}
							</Box>
						</Box>
						<Box flex={1} display="flex" flexDirection="column">
							<Typography fontFamily="-moz-initial" variant="body1">
								Hotel Review
							</Typography>
							<Box sx={{ width: "90%" }} display="flex" justifyContent="space-between" alignItems="center">
								<Box display="flex">
									<Typography
										sx={{
											color: "white",
											backgroundColor: "#3c6097",
											borderRadius: 2,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											height: 40,
											minWidth: 56,
											px: 2,
											fontWeight: "bold",
											fontSize: 18,
											textAlign: "center",
										}}>
										{hotel.rating.score} <StarIcon sx={{ ml: 0.5, fontSize: 20 }} />
									</Typography>
									<Box ml={2} display="flex" flexDirection="column">
										<Typography>{hotel.rating.status}</Typography>
										<Box display="flex" alignItems="center">
											<Typography variant="body2" color="textSecondary" mr={1}>
												{hotel.rating.reviewCount} reviews
											</Typography>
											{Array.from({ length: 5 }).map((_, i) => (
												<StarIcon
													key={i}
													sx={{
														color: i < Math.round(hotel.rating.score) ? "#3c6097" : "#ccc",
														fontSize: 20,
													}}
												/>
											))}
										</Box>
									</Box>
								</Box>
								<Box>
									<Typography fontSize={20} color="red">
										{hotel.pricing[0].discount}
									</Typography>
									<Box display="flex">
										<Typography sx={{ fontSize: "30px" }}>{hotel.pricing[0].discountedPrice}</Typography>
										<Typography alignContent="flex-end" variant="body2" color="textDisabled">
											{hotel.pricing[0].currency}
										</Typography>
									</Box>
									<Typography>{hotel.pricing[0].priceUnit}</Typography>
								</Box>
							</Box>
							<Typography variant="h6" fontWeight="bold" gutterBottom>
								About
							</Typography>
							<Typography variant="body1" fontWeight="bold" color="textDisabled">
								{hotel.description}
							</Typography>
							<Box display="flex" mt={1} sx={{ cursor: "pointer" }}>
								<Typography>Show more </Typography>
								<KeyboardArrowDownIcon />
							</Box>
							<Box display="flex" mt={2}>
								<LocationOnIcon sx={{ color: "#3c6079" }} />
								<Typography ml={2}>
									{hotel.address.street}, {hotel.address.city}, {hotel.address.state}, {hotel.address.country}
								</Typography>
							</Box>
							<Typography variant="h6" fontWeight="bold" my={3}>
								Popular Service{" "}
							</Typography>

							<Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-start">
								{hotel.amenities.map((e, idx) => {
									// Map amenity string to icon
									const amenity = e.toLowerCase();
									const iconMap = {
										wifi: <WifiIcon sx={{ color: "#3c6097", mr: 1 }} />,
										bathroom: <BathtubIcon sx={{ color: "#3c6097", mr: 1 }} />,
										parking: <LocalParkingIcon sx={{ color: "#3c6097", mr: 1 }} />,
										restaurant: <RestaurantIcon sx={{ color: "#3c6097", mr: 1 }} />,
										gym: <FitnessCenterIcon sx={{ color: "#3c6097", mr: 1 }} />,
										spa: <SpaIcon sx={{ color: "#3c6097", mr: 1 }} />,
										air: <AcUnitIcon sx={{ color: "#3c6097", mr: 1 }} />,
										tv: <VideocamIcon sx={{ color: "#3c6097", mr: 1 }} />,
									};
									// Find icon by key or use default
									const icon = Object.keys(iconMap).find((key) => amenity.includes(key)) ? (
										iconMap[Object.keys(iconMap).find((key) => amenity.includes(key))]
									) : (
										<CheckCircleOutlineIcon sx={{ color: "#3c6097", mr: 1 }} />
									);
									return (
										<Box
											key={idx}
											display="flex"
											alignItems="center"
											px={2}
											py={1}
											bgcolor="#f5f7fa"
											borderRadius={2}
											minWidth={120}>
											{icon}
											<Typography fontSize={15}>{e}</Typography>
										</Box>
									);
								})}
							</Box>
							<Button
								onClick={() => navigate(`/book-now/${hotel.id}`)}
								variant="contained"
								sx={{ mt: 3, margin: "auto", width: "90%" }}>
								Pay Now
							</Button>
						</Box>
					</Box>
				</Paper>
			</Box>
			<Box mt={6}>
				<RecommendedHotels />
			</Box>
		</>
	);
};
