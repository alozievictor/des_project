import React from "react";
import { Typewriter } from "react-simple-typewriter";
import Vid from "../assets/vbg.mp4";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const [firstDone, setFirstDone] = React.useState(false);
  const [secondDone, setSecondDone] = React.useState(false);
  const [thirdDone, setThirdDone] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    // Calculate the time it takes for the first Typewriter to finish
    const typeSpeed = 70;
    const deleteSpeed = 50;
    const firstTextLength = "pre order binary tree depth first search".length;
    const firstDelaySpeed = 1000; // The delay speed after typing

    const firstTypeDuration = firstTextLength * typeSpeed + firstDelaySpeed;
    const totalFirstDuration = firstTypeDuration + deleteSpeed;

    const firstTimer = setTimeout(() => {
      setFirstDone(true);
    }, totalFirstDuration);

    return () => clearTimeout(firstTimer);
  }, []);

  React.useEffect(() => {
    if (firstDone) {
      // Calculate the time it takes for the second Typewriter to finish
      const typeSpeed = 70;
      const deleteSpeed = 50;
      const secondTextLength = "Group 9".length;
      const secondDelaySpeed = 1000; // The delay speed after typing

      const secondTypeDuration =
        secondTextLength * typeSpeed + secondDelaySpeed;
      const totalSecondDuration = secondTypeDuration + deleteSpeed;

      const secondTimer = setTimeout(() => {
        setSecondDone(true);
      }, totalSecondDuration);

      return () => clearTimeout(secondTimer);
    }
  }, [firstDone]);

  React.useEffect(() => {
    if (secondDone) {
      // Calculate the time it takes for the second Typewriter to finish
      const typeSpeed = 70;
      const deleteSpeed = 50;
      const thirdTextLength = "Mr Opeyemi Mansoor".length;
      const thirdDelaySpeed = 1000; // The delay speed after typing

      const ThirdTypeDuration = thirdTextLength * typeSpeed + thirdDelaySpeed;
      const totalThirdDuration = ThirdTypeDuration + deleteSpeed;

      const thirdTimer = setTimeout(() => {
        setThirdDone(true);
      }, totalThirdDuration);

      return () => clearTimeout(thirdTimer);
    }
  }, [secondDone]);

  return (
    <React.Fragment>
      <div className="video-container">
        <video autoPlay loop muted className="background-video">
          <source src={Vid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="content">
          <div className="w-[100%] h-[80vh] flex justify-center items-center rounded shadow-md">
            <div className="w-[90%] md:w-[75%] xl:w-[70%] mx-auto p-5">
              <div className="w-[100%] mb-5">
                <p className=" text-7xl text-center text-white capitalize font-semibold font-[Urbanist]">
                  <Typewriter
                    words={[
                      "Graph-Depth first search and pre-order binary search tree",
                    ]}
                    loop={1}
                    cursor
                    cursorStyle=""
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </p>
              </div>

              <div className="w-[100%] mb-5">
                <p className="text-3xl text-center text-white capitalize font-medium font-[Urbanist]">
                  {firstDone && (
                    <Typewriter
                      words={["Group-9"]}
                      loop={1}
                      cursor
                      cursorStyle=""
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  )}
                </p>
              </div>

              <div className="w-[100%]">
                <p className="text-3xl text-center text-white capitalize font-medium font-[Urbanist]">
                  {secondDone && (
                    <Typewriter
                      words={["Mr Opeyemi Mansoor"]}
                      loop={1}
                      cursor
                      cursorStyle=""
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  )}
                </p>
              </div>

              {thirdDone && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-[100%] flex justify-center items-center mt-10"
                >
                  <button
                    onClick={() => navigate("/operation")}
                    class="relative border border-2 border-teal-600 rounded px-4 py-2 inline cursor-pointer text-xl font-medium before:bg-teal-600 hover:rounded-b-none before:absolute before:-bottom-0 before:-left-0  before:block before:h-[4px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"
                  >
                    Get Started
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Hero;
