import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInter from "../network/interceptor";

const initialState = {
	hotels: [],
	bestOffers: [],
	recommendedHotels: [],
	getAllHotels: [],
	filteredHotels: [],
	loading: false,
	availableCountries: ["Egypt", "United States", "Greece", "Morocco"],
	error: null,
	userBookings:[]
};

export const fetchAllHotels = createAsyncThunk("hotels/fetchAll", async (_, { rejectWithValue }) => {
	try {
		const response = await axiosInter.get("hotels");
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data?.message || error.message);
	}
});

export const fetchRecommendedHotels = createAsyncThunk(
	"hotels/fetchRecommendedHotels",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInter.get("recommended_hotels", { params: { recommended: true } });
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || error.message);
		}
	}
);

export const fetchBestOffersHotels = createAsyncThunk(
	"hotels/fetchBestOffersHotels",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInter.get("best_offer", { params: { bestOffers: true } });
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || error.message);
		}
	}
);

const hotelSlice = createSlice({
	name: "hotels",
	initialState,
	reducers: {
		filterHotels: (state, action) => {
			const { country, query } = action.payload;

			let results = [...state.getAllHotels];

			if (country) {
				results = results.filter((hotel) => hotel.address.country.toLowerCase() === country.toLowerCase());
			}

			if (query) {
				const searchQuery = query.toLowerCase();
				results = results.filter(
					(hotel) =>
						hotel.name.toLowerCase().includes(searchQuery) ||
						(hotel.description && hotel.description.toLowerCase().includes(searchQuery))
				);
			}

			state.filteredHotels = results;
		},
		clearFilters: (state) => {
			state.filteredHotels = [];
		},
	},
		extraReducers: (builder) => {
		builder
			.addCase(fetchRecommendedHotels.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchRecommendedHotels.fulfilled, (state, action) => {
				state.loading = false;
				state.recommendedHotels = action.payload;
			})
			.addCase(fetchRecommendedHotels.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
		builder
			.addCase(fetchBestOffersHotels.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchBestOffersHotels.fulfilled, (state, action) => {
				state.loading = false;
				state.bestOffers = action.payload;
			})
			.addCase(fetchBestOffersHotels.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
		builder
			.addCase(fetchAllHotels.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchAllHotels.fulfilled, (state, action) => {
				state.loading = false;
				state.getAllHotels = action.payload;
			})
			.addCase(fetchAllHotels.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
export const { filterHotels, clearFilters } = hotelSlice.actions;
export default hotelSlice.reducer;
