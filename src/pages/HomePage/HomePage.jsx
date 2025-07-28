
import { Container, Typography } from "@mui/material";
import RecommendedHotels from "./RecommendedHotels";
import BestOffers from "../../components/BestOffers/BestOffers";
import { SearchInput } from "../../components/SearchInput/SearchInput";


function HomePage() {
	return (
		<>
			<Container sx={{ mt: 2 }}>
		<SearchInput />
				
				<RecommendedHotels />
				<BestOffers />

			</Container>
		</>
	);
}

export default HomePage;
