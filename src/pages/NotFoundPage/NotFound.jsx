import React from "react";
import { Box, Typography } from "@mui/material";
import not from "../../assets/images/OBJECTS.png";
export const NotFound = () => {
	return (
		<Box
			
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			textAlign="center"
			gap={2}>
			<img src={not} alt="Not Found" style={{  marginBottom: 16 }} />
			<Typography variant="h2" color="primary" fontWeight="bold">
				404
			</Typography>
			<Typography variant="h5" color="text.secondary">
				Page Not Found
			</Typography>
		</Box>
	);
};
