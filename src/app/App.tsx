import { RouterProvider } from "react-router-dom";
import * as Feature from "../features";
import { appRouter } from "../router";

export function App() {
	return (
		<Feature.AuthProvider>
			<RouterProvider router={appRouter}/>
		</Feature.AuthProvider>
	);
}
