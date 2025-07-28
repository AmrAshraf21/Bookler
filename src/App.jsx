import "./App.css";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./layouts/Layout";
import { NotFound } from "./pages/NotFoundPage/NotFound";
import { HotelDetails } from "./pages/HotelDetails/HotelDetails";
import BookNowPage from "./pages/BookNowPage/BookNowPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import { useSelector } from "react-redux";
import AuthInitializer from "./components/AuthInitializer/AuthInitializer";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PrivateRoute from "./routes/PrivateRoute";
import MyBookingPage from "./pages/MyBookingPage/MyBookingPage";
import { HotelsPage } from "./pages/HotelsPage/HotelsPage";


function App() {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	
	
	return (
		<>
			<AuthInitializer />
			<Routes>
				<Route path="register" element={<RegisterPage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="*" element={<NotFound />} />
					<Route path="hotel-details/:id" element={<HotelDetails />} />
					<Route path="hotels" element={<HotelsPage />} />
					<Route element={<PrivateRoute />}>
						<Route path="book-now/:id" element={<BookNowPage />} />
						<Route path="profile" element={<MyBookingPage />} />
						<Route path="my-booking" element={<MyBookingPage />} />
					</Route>
					
					<Route path="search" element={<SearchPage />} />
					<Route path="profile" element={isLoggedIn ? <MyBookingPage /> : <Navigate to="/login" />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
