import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearFilters, fetchAllHotels, filterHotels } from "../../store/hotelSlice";
import { Box, Button, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const COUNTRIES = ["Egypt", "United States", "Greece", "Morocco"];

export const SearchInput = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { getAllHotels, availableCountries, loading } = useSelector((state) => state.hotels);

	const [searchParams, setSearchParams] = useState({
		country: "",
		query: "",
		checkIn: null,
		checkOut: null,
	});

	useEffect(() => {
		if (getAllHotels.length === 0) {
			dispatch(fetchAllHotels());
		}
	}, [dispatch, getAllHotels.length]);

	const handleSearch = () => {
		const params = {
			country: searchParams.country,
			query: searchParams.query,
			checkIn: searchParams.checkIn?.toISOString(),
			checkOut: searchParams.checkOut?.toISOString(),
		};

		navigate("/search", { state: params });

		dispatch(filterHotels(params));
	};

	const handleClear = () => {
		setSearchParams({
			country: "",
			query: "",
			checkIn: null,
			checkOut: null,
		});
		dispatch(clearFilters());
	};

	const handleParamChange = (name, value) => {
		setSearchParams((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Box
				display="flex"
				flexDirection={{ xs: "column", md: "row" }}
				alignItems="center"
				gap={2}
				sx={{
					border: "1px solid #ccc",
					borderRadius: 8,
					p: 2,
					backgroundColor: "#fbfbfb",
					width: "100%",
					maxWidth: 1000,
					margin: "0 auto",
				}}>
				<TextField
					name="query"
					label="Hotel Name"
					value={searchParams.query}
					onChange={(e) => handleParamChange("query", e.target.value)}
					sx={{ flex: 1, "& .MuiOutlinedInput-root": { borderRadius: 8 } }}
					disabled={loading}
				/>

				<FormControl sx={{ flex: 1 }}>
					<InputLabel id="country-label">Country</InputLabel>
					<Select
						labelId="country-label"
						id="country-select"
						value={searchParams.country}
						label="Country"
						onChange={(e) => handleParamChange("country", e.target.value)}
						sx={{ borderRadius: 8 }}
						disabled={loading}>
						<MenuItem value="">All Countries</MenuItem>
						{availableCountries.map((country) => (
							<MenuItem key={country} value={country}>
								{country}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<DatePicker
					label="Check-in"
					value={searchParams.checkIn}
					onChange={(value) => handleParamChange("checkIn", value)}
					sx={{ flex: 1 }}
					disabled={loading}
				/>

				<DatePicker
					label="Check-out"
					value={searchParams.checkOut}
					onChange={(value) => handleParamChange("checkOut", value)}
					minDate={searchParams.checkIn}
					sx={{ flex: 1 }}
					disabled={loading}
				/>

				<Box display="flex" gap={2}>
					<Button
						onClick={handleClear}
						disabled={loading}
						sx={{
							textDecoration: "underline",
							color: "black",
							minWidth: 100,
						}}>
						Clear
					</Button>

					<Button
						onClick={handleSearch}
						disabled={loading || !searchParams.country}
						sx={{
							backgroundColor: "#df142d",
							color: "white",
							borderRadius: 5,
							px: 4,
							minWidth: 120,
							"&:disabled": {
								backgroundColor: "#cccccc",
							},
						}}>
						{loading ? "Loading..." : "Search"}
					</Button>
				</Box>
			</Box>
		</LocalizationProvider>
	);
};
