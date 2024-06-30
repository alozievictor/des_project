import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const Inputted = () => {
  const [error, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [array, setArray] = React.useState([]);
  const [numbers, setNumbers] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [inputs, setInputs] = React.useState({
    digit: "",
  });

  React.useEffect(() => {
    const numArray = inputs.digit
      .split(",")
      .map((num) => num.trim())
      .filter((num) => !isNaN(num) && num !== "")
      .map(Number);

    // Validate each number
    const validNumbers = numArray.filter((num) => num >= 1 && num <= 100);

    if (validNumbers.length !== numArray.length) {
      toast.error("Please enter numbers between 1 and 100.");
    }

    setArray(numArray);

    setNumbers(validNumbers);
  }, [inputs]);

  const HandleDfs = async (e) => {
    e.preventDefault();
    try {
      console.log("user Data:", inputs);
      if (!inputs.digit || inputs.digit.length < 3) {
        setArray([]);
        toast.error("Please Enter at least 3 Digits");
        return;
      }

      const response = await axios.post("http://localhost:4000/api/traverse", {
        array: numbers,
      });

      setData(response.data.result);

      setLoading(true);
    } catch (error) {
      toast.error("An error occurred while submitting the form");
    } finally {
      setLoading(false);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  return (
    <React.Fragment>
      <div className="p-6 w-[100%] relative bg-white rounded shadow grid md:grid-cols-2 gap-5">
        <div>
          <form action="" method="post" className="grid gap-5 py-5">
            <div className="relative h-11 ">
              <input
                // disabled={generate}
                type="text"
                id="digit"
                value={inputs.digit}
                onFocus={() => handleError(null, "digit")}
                onChange={(e) => handleOnchange(e.target.value, "digit")}
                className={`peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-5 font-sans text-sm font-medium text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-600 focus:border-t-transparent focus:outline-0 disabled:border-1 disabled:bg-blue-gray-50  `}
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#000000] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#f39c12]peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Enter Digits
              </label>
            </div>
            <div className="py-3 border rounded px-3 cursor-text">
              <p className="text-sm font-medium capitalize">
                Tree digits: <span className="">{JSON.stringify(array)}</span>
              </p>
            </div>

            <div className="flex justify-start items-center mt-5">
              <button
                onClick={HandleDfs}
                className={`px-10 py-2 bg-teal-600 text-white text-center rounded font-medium 
               `}
                type="button"
              >
                Perform DFS
              </button>
            </div>
          </form>
        </div>

        <div className="border relative flex justify-center items-center">
          {data && data.length > 0 ? (
            <div className="w-[100%] relative p-5">
              <p>
                Depth First Search for the given digit using Pre-order traversal
                is:
              </p>
              <ul className="flex items-center">
                {data.map((item, index) => (
                  <li
                    className="text-lg font-semibold text-gray-800"
                    key={index}
                  >
                    {item},
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-lg font-semibold text-gray-800">Result</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Inputted;
