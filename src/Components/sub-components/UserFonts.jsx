import React from "react";
import WebFont from "webfontloader";

const UserFonts = () => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Urbanist:300,400,700"],
      },
      active: () => setFontsLoaded(true),
    });
  }, []);

  return fontsLoaded;
};

export default UserFonts;
