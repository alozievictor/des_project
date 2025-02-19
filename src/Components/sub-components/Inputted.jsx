import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TreeVisualizer from "./TreeVisualizer";

const Inputted = () => {
  const [error, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState(null);
  const [data, setData] = React.useState([]);
  const [numbers, setNumbers] = React.useState([]);
  const [inputs, setInputs] = useState({
    digit: "",
  });

  useEffect(() => {
    const numArray = inputs.digit
      .split(",")
      .map((num) => num.trim())
      .filter((num) => !isNaN(num) && num !== "")
      .map(Number);

    const validNumbers = numArray.filter((num) => num >= 1 && num <= 100);

    if (validNumbers.length !== numArray.length) {
      toast.error("Please enter numbers between 1 and 100.");
    }

    setNumbers(validNumbers);

    // Create a tree-like structure (simple binary tree for example)
    const tree = createBinaryTree(validNumbers);

    // Set the tree data in state
    setTreeData(tree);
  }, [inputs]);

  // Function to create a simple binary tree from an array of numbers
  const createBinaryTree = (numbers) => {
    // Helper function to create a tree node
    const createNode = (value) => ({ value, left: null, right: null });

    // Base case for an empty array
    if (numbers.length === 0) {
      return null;
    }

    // Initialize root node with the first number
    const root = createNode(numbers[0]);

    // Insert remaining numbers into the tree
    for (let i = 1; i < numbers.length; i++) {
      insertNode(root, numbers[i]);
    }

    // Function to insert a node into the tree
    function insertNode(node, value) {
      if (value < node.value) {
        if (!node.left) {
          node.left = createNode(value);
        } else {
          insertNode(node.left, value);
        }
      } else {
        if (!node.right) {
          node.right = createNode(value);
        } else {
          insertNode(node.right, value);
        }
      }
    }

    return root;
  };

  const HandlePreorder = async (e) => {
    e.preventDefault();
    try {
      console.log("user Data:", inputs);
      if (!inputs.digit || inputs.digit.length < 3) {
        toast.error("Please Enter at least 3 Digits");
        return;
      }

      console.log("array digit:", numbers);

      console.log("tree data:", treeData);

      const response = await axios.post(
        "http://localhost:4000/api/preorder-traverse",
        {
          array: numbers,
        }
      );

      setData(response.data.result);

      setLoading(true);
    } catch (error) {
      toast.error("An error occurred while submitting the form");
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = useCallback((text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  }, []);

  const handleError = useCallback((errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  }, []);

  return (
    <div className="p-6 w-full relative bg-white rounded shadow grid md:grid-cols-2 gap-5">
      <div>
        <form className="grid gap-5 py-5">
          <div className="relative h-11">
            <input
              type="text"
              id="digit"
              value={inputs.digit}
              onFocus={() => handleError(null, "digit")}
              onChange={(e) => handleOnChange(e.target.value, "digit")}
              className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-5 font-sans text-sm font-medium text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-600 focus:border-t-transparent focus:outline-0 disabled:border-1 disabled:bg-blue-gray-50"
              placeholder=""
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#000000] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#f39c12]peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Enter Length
            </label>
          </div>

          <div className="py-3 border rounded px-3 cursor-text">
            <p className="text-sm font-medium capitalize">
              Tree digits: <span>{inputs.digit}</span>
            </p>
          </div>

          <div className="flex justify-start items-center mt-5">
            <button
              onClick={HandlePreorder}
              className="px-10 py-2 bg-teal-600 text-white text-center rounded font-medium"
              type="button"
              disabled={loading}
            >
              {loading ? "Loading..." : "Perform pre order"}
            </button>
          </div>
        </form>
      </div>

      <div className="border relative">
        <div>
          <TreeVisualizer treeData={treeData} />
        </div>
        <div className="mb-5 w-[100%]">
          {data && data.length > 0 ? (
            <div className="w-[100%] relative p-5 flex items-center">
              <p>Pre-order Traversal:</p>
              <ul className="flex items-center ml-1">
                {data.map((item, index) => (
                  <li
                    className="text-lg font-semibold flex justify-center items-center text-gray-800"
                    key={index}
                  >
                    {item},
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-lg ml-3 text-center font-semibold text-gray-800">
              Pre-order Traversal:
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inputted;
