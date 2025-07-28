import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Box,
	Chip,
	Stack,
	Divider,
	Button,
	Rating,
	useTheme,
} from "@mui/material";
import { LocationOn, Star, Hotel, Wifi, Restaurant, LocalParking } from "@mui/icons-material";
import { useNavigate} from "react-router-dom";

const HotelCard = ({ hotel }) => {
	const theme = useTheme();
    const navigate = useNavigate();
	const bestPrice = Math.min(...hotel.pricing.map((p) => p.discountedPrice));
	const bestOffer = hotel.pricing.find((p) => p.discountedPrice === bestPrice);

	return (
		<Card
			sx={{
				borderRadius: 3,
				boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
				transition: "transform 0.3s, box-shadow 0.3s",
				"&:hover": {
					transform: "translateY(-5px)",
					boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
				},
				height: "100%",
                width:'400px',
				display: "flex",
				flexDirection: "column",
			}}>
			{/* Hotel Image with Badge */}
			<Box  sx={{ position: "relative" }}>
            
				<CardMedia
					component="img"
					height="300"
                	onClick={() => navigate(`/hotel-details/${hotel.id}`)}        
					image={hotel.images.main}
					alt={hotel.name}
					sx={{
						borderTopLeftRadius: 12,
						borderTopRightRadius: 12,
						objectFit: "cover",
					}}
				/>
				<Chip
					label={bestOffer.discount}
					color="error"
					size="small"
					sx={{
						position: "absolute",
						top: 16,
						right: 16,
						fontWeight: "bold",
						backgroundColor: theme.palette.error.main,
						color: "white",
					}}
				/>
			</Box>

			{/* Hotel Content */}
			<CardContent sx={{ flexGrow: 1 }}>
				{/* Hotel Name and Rating */}
				<Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
					<Typography  variant="h6" fontWeight="bold">
						{hotel.name}
					</Typography>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Rating
							value={hotel.rating.score}
							precision={0.5}
							readOnly
							size="small"
							emptyIcon={<Star fontSize="inherit" />}
						/>
						<Typography variant="body2" ml={0.5}>
							({hotel.rating.reviewCount})
						</Typography>
					</Box>
				</Box>

				{/* Location */}
				<Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
					<LocationOn color="primary" fontSize="small" />
					<Typography variant="body2" color="text.secondary" ml={0.5}>
						{hotel.address.city}, {hotel.address.country}
					</Typography>
				</Box>

				{/* Amenities Chips */}
				<Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
					{hotel.amenities?.includes("Wifi") && <Chip icon={<Wifi />} label="WiFi" size="small" />}
					{hotel.amenities?.includes("Parking") && <Chip icon={<LocalParking />} label="Parking" size="small" />}
					{hotel.amenities?.includes("Restaurant") && <Chip icon={<Restaurant />} label="Restaurant" size="small" />}
				</Stack>

				<Divider sx={{ my: 1.5 }} />

            {/* Pricing */}
				<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Box>
						<Typography variant="body2" color="text.secondary">
							Starting from
						</Typography>
						<Box sx={{ display: "flex", alignItems: "baseline" }}>
							<Typography variant="h5" color="primary" fontWeight="bold">
								{bestOffer.currency} {bestPrice}
							</Typography>
							<Typography variant="body2" color="text.secondary" ml={0.5}>
								/ night
							</Typography>
						</Box>
					</Box>
					<Button
						variant="contained"
						color="primary"
                        onClick={()=>navigate(`/book-now/${hotel.id}`)}
						sx={{
							borderRadius: 2,
							px: 3,
							py: 1,
							textTransform: "none",
							fontWeight: "bold",
						}}>
						Book Now
					</Button>
				</Box>
			</CardContent>
		</Card>
	);
};

export default HotelCard;
