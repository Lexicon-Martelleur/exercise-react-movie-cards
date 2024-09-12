import { 
	createBrowserRouter,
	createRoutesFromElements,
	Route
} from "react-router-dom";
import * as Pages from "../pages";
import { AuthGuard } from "../features";

export const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<AuthGuard><Pages.MovieCardPage/></AuthGuard>} path="/" />
			<Route element={<Pages.LoginPage />} path="/login" />
		</>
	)
);
