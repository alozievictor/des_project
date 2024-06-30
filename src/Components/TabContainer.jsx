import React from "react";
import AutoGenerate from "./sub-components/AutoGenerate";
import Inputted from "./sub-components/Inputted";
import { motion, AnimatePresence } from "framer-motion";

const TabContainer = () => {
  const [showTab, setShowTab] = React.useState({
    Inputted: true,
    AutoGenerate: false,
  });

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <div className="w-[90%] mx-auto py-4 grid gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex justify-between items-center"
        >
          <h2 className="text-xl font-semibold text-slate-900 mt-3 capitalize">
            Pre-order binary tree depth first search
          </h2>

          <button
            className="flex items-center rounded border border-teal-600 group hover:bg-teal-600 hover:text-white py-1.5 px-5"
            onClick={() => window.location.reload()}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
              className="text-teal-600 group-hover:text-white"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
            <span className="ml-1 text-teal-600 group-hover:text-white">
              Reload
            </span>
          </button>
        </motion.div>

        <div className="my-3 rounded w-full h-[65px] flex items-center bg-white shadow">
          <div className="h-[50px] relative w-full">
            <div className="w-full flex justify-start items-center px-3">
              <div className="w-full">
                <ul className="flex items-center gap-3">
                  <li className="text-sm p-1 cursor-pointer">
                    <button
                      //   role="button"
                      className={`${
                        showTab.Inputted
                          ? "bg-[#0d948836] h-[40px] text-teal-600 font-semibold text-[15px] capitalize py-2 px-5 rounded font-[Urbanist]"
                          : "text-teal-600 capitalize font-norml text-[15px]"
                      }`}
                      id="tab-0"
                      data-toggle="tab"
                      href="#"
                      onClick={() =>
                        setShowTab((prev) => ({
                          ...prev,
                          Inputted: true,
                          AutoGenerate: false,
                        }))
                      }
                    >
                      Inputted
                    </button>
                  </li>

                  <li className="text-sm p-1 cursor-pointer">
                    <button
                      //   role="button"
                      className={`${
                        showTab.AutoGenerate
                          ? "bg-[#0d948836] h-[40px] text-teal-600 font-semibold text-[15px] capitalize py-2 px-5 rounded font-[Urbanist]"
                          : "text-teal-600 capitalize font-norml text-[15px]"
                      }`}
                      id="tab-0"
                      data-toggle="tab"
                      href="#"
                      onClick={() =>
                        setShowTab((prev) => ({
                          ...prev,
                          Inputted: false,
                          AutoGenerate: true,
                        }))
                      }
                    >
                      Auto-Generate
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full my-7 bg-transparent">
              {showTab.Inputted && <Inputted />}
              {showTab.AutoGenerate && <AutoGenerate />}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TabContainer;
