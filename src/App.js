import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import UserFonts from "./Components/sub-components/UserFonts";
const Hero = lazy(() => import("./Pages/Hero"));
const Operation = lazy(() => import("./Pages/Operation"));

const override = {
  display: "flex",
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  height: "100vh", // Set the height of the container to the full viewport height
  borderColor: "#db0000",
};

function App() {
  const [color] = React.useState("#265670");
  const fontsLoaded = UserFonts();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [fontsLoaded]);

  if (loading) {
    return (
      <div
        style={override}
        className="flex justify-center items-center h-screen"
      >
        <BounceLoader
          color={color}
          size={90}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="flex justify-center items-center"
        />
      </div>
    );
  }

  return (
    <Router>
      <Suspense
        fallback={
          <div
            style={override}
            className="flex justify-center items-center h-screen"
          >
            <BounceLoader
              color={color}
              size={90}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="flex justify-center items-center"
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" exact element={<Hero />} />
          <Route path="/operation" element={<Operation />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
