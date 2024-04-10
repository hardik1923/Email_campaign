import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom"; // Import your action creator
import { setenableclone } from "../features/counter/roomslice";
function GlobalStateUpdater() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Check if navigating from a particular route
    console.log("GlobalStateUpdater component rendered");
    console.log("Current location:", location.pathname);

    if (location.pathname !== "/campaign") {
      console.log("I am running");
      // Dispatch action to update global state to false when navigating from '/from-route'
      dispatch(setenableclone({ enableclone: false }));
    }
  }, [location.pathname]); // Run effect when location.pathname changes

  return null; // This component doesn't render anything
}

export default GlobalStateUpdater;
