// import React from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// const AutoGenerate = () => {
//   const [length, setLength] = React.useState("");
//   const [digits, setDigits] = React.useState([]);
//   const [loading, setLoading] = useState(false);
//   const [treeData, setTreeData] = useState(null);
//   const [traversalResult, setTraversalResult] = React.useState([]);

//   const generateRandomNumbers = (length) => {
//     const numbers = Array.from({ length: 100 }, (_, i) => i + 1); // Generate numbers 1 to 100
//     const shuffled = numbers.sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, length);
//   };

//   const handleGenerateClick = () => {
//     const len = parseInt(length);
//     if (isNaN(len) || len < 1 || len > 100) {
//       toast.error("Please enter a valid length between 1 and 100");
//       return;
//     }
//     const randomNumbers = generateRandomNumbers(len);
//     setDigits(randomNumbers);
//   };

//   const handlePerformDFS = async () => {
//     try {
//       const response = await axios.post("http://localhost:4000/api/traverse", {
//         array: digits,
//       });
//       setTraversalResult(response.data.result);

//       console.log("Result:", response.data.result);
//     } catch (error) {
//       console.error("Error performing DFS:", error);
//       toast.error("An error occurred while performing DFS");
//     }
//   };

//   useEffect(() => {
//     const numArray = inputs.digit
//       .split(",")
//       .map((num) => num.trim())
//       .filter((num) => !isNaN(num) && num !== "")
//       .map(Number);

//     const validNumbers = numArray.filter((num) => num >= 1 && num <= 100);

//     if (validNumbers.length !== numArray.length) {
//       toast.error("Please enter numbers between 1 and 100.");
//     }

//     setNumbers(validNumbers);

//     // Create a tree-like structure (simple binary tree for example)
//     const tree = createBinaryTree(validNumbers);

//     // Set the tree data in state
//     setTreeData(tree);
//   }, [inputs]);

//   // Function to create a simple binary tree from an array of numbers
//   const createBinaryTree = (numbers) => {
//     // Helper function to create a tree node
//     const createNode = (value) => ({ value, left: null, right: null });

//     // Base case for an empty array
//     if (numbers.length === 0) {
//       return null;
//     }

//     // Initialize root node with the first number
//     const root = createNode(numbers[0]);

//     // Insert remaining numbers into the tree
//     for (let i = 1; i < numbers.length; i++) {
//       insertNode(root, numbers[i]);
//     }

//     // Function to insert a node into the tree
//     function insertNode(node, value) {
//       if (value < node.value) {
//         if (!node.left) {
//           node.left = createNode(value);
//         } else {
//           insertNode(node.left, value);
//         }
//       } else {
//         if (!node.right) {
//           node.right = createNode(value);
//         } else {
//           insertNode(node.right, value);
//         }
//       }
//     }

//     return root;
//   };

//   return (
//     <React.Fragment>
//       <div className="p-6 w-[100%] relative bg-white rounded shadow grid md:grid-cols-2 gap-5">
//         <div>
//           <div className="">
//             <React.Fragment>
//               <div className="py-5 ">
//                 <p className="text-sm text-center font-normal">
//                   You can auto generate digit automatically but length should
//                   not be greater than 100
//                 </p>
//               </div>

//               <form action="" method="post" className="grid gap-5 py-5">
//                 <div className="relative h-11 ">
//                   <input
//                     type="number"
//                     id="length"
//                     value={length}
//                     onChange={(e) => setLength(e.target.value)}
//                     className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-5 font-sans text-sm font-medium text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-600 focus:border-t-transparent focus:outline-0 disabled:border-1 disabled:bg-blue-gray-50"
//                     placeholder=""
//                   />
//                   <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#000000] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#f39c12]peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
//                     Enter Length
//                   </label>
//                 </div>
//                 <div className="py-3 border rounded px-3 cursor-text">
//                   <p>Display the digits: {digits.join(", ")} </p>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4 md:gap-32 mt-5">
//                   <button
//                     onClick={handleGenerateClick}
//                     className="px-7 py-2 border cursor-pointer border-teal-600 text-teal-600 text-center rounded font-medium"
//                     type="button"
//                   >
//                     Generate digit
//                   </button>
//                   <button
//                     onClick={handlePerformDFS}
//                     className="px-10 py-2 cursor-pointer bg-teal-600 text-white text-center rounded font-medium"
//                     type="button"
//                   >
//                     Perform DFS
//                   </button>
//                 </div>
//               </form>
//             </React.Fragment>
//           </div>
//         </div>

//         <div className="border relative ">
//           <div className="flex justify-center items-center">
//             <TreeVisualizer treeData={treeData} />
//           </div>
//           <div className="mb-5 w-[100%]">
//             {data && data.length > 0 ? (
//               <div className="w-[100%] relative p-5 flex items-center">
//                 <p>Pre-order Traversal:</p>
//                 <ul className="flex items-center ml-1">
//                   {data.map((item, index) => (
//                     <li
//                       className="text-lg font-semibold text-gray-800"
//                       key={index}
//                     >
//                       {item},
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ) : (
//               <p className="text-lg ml-3 font-semibold text-gray-800">
//                 Pre-order Traversal:
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default AutoGenerate;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TreeVisualizer from "./TreeVisualizer"; // Assuming TreeVisualizer is a component to visualize the tree

const AutoGenerate = () => {
  const [length, setLength] = useState("");
  const [digits, setDigits] = useState([]);
  const [treeData, setTreeData] = useState(null);
  const [traversalResult, setTraversalResult] = useState([]);

  const generateRandomNumbers = (length) => {
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1); // Generate numbers 1 to 100
    const shuffled = numbers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, length);
  };

  const handleGenerateClick = () => {
    const len = parseInt(length);
    if (isNaN(len) || len < 1 || len > 100) {
      toast.error("Please enter a valid length between 1 and 100");
      return;
    }
    const randomNumbers = generateRandomNumbers(len);
    setDigits(randomNumbers);
  };

  const handlePerformDFS = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/preorder-traverse",
        {
          array: digits,
        }
      );
      setTraversalResult(response.data.result);
    } catch (error) {
      console.error("Error performing DFS:", error);
      toast.error("An error occurred while performing DFS");
    }
  };

  useEffect(() => {
    if (digits.length > 0) {
      const validNumbers = digits.filter((num) => num >= 1 && num <= 100);

      if (validNumbers.length !== digits.length) {
        toast.error("Please enter numbers between 1 and 100.");
        return;
      }

      const tree = createBinarySearchTree(validNumbers);
      setTreeData(tree);
    }
  }, [digits]);

  const createBinarySearchTree = (numbers) => {
    if (numbers.length === 0) {
      return null;
    }

    const root = { value: numbers[0], left: null, right: null };

    const insertNode = (node, value) => {
      if (value < node.value) {
        if (!node.left) {
          node.left = { value, left: null, right: null };
        } else {
          insertNode(node.left, value);
        }
      } else {
        if (!node.right) {
          node.right = { value, left: null, right: null };
        } else {
          insertNode(node.right, value);
        }
      }
    };

    for (let i = 1; i < numbers.length; i++) {
      insertNode(root, numbers[i]);
    }

    return root;
  };

  return (
    <div className="p-6 w-full relative bg-white rounded shadow grid md:grid-cols-2 gap-5">
      <div>
        <div className="">
          <div className="py-5 ">
            <p className="text-sm text-center font-normal">
              You can auto generate digits automatically but length should not
              be greater than 100
            </p>
          </div>

          <form className="grid gap-5 py-5">
            <div className="relative h-11 ">
              <input
                type="number"
                id="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-5 font-sans text-sm font-medium text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-600 focus:border-t-transparent focus:outline-0 disabled:border-1 disabled:bg-blue-gray-50"
                placeholder=""
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#000000] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#f39c12]peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Enter Length
              </label>
            </div>
            <div className="py-3 border rounded px-3 cursor-text">
              <p>Display the digits: {digits.join(", ")} </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-32 mt-5">
              <button
                onClick={handleGenerateClick}
                className="px-7 py-2 border cursor-pointer border-teal-600 text-teal-600 text-center rounded font-medium"
                type="button"
              >
                Generate digit
              </button>
              <button
                onClick={handlePerformDFS}
                className="px-10 py-2 cursor-pointer bg-teal-600 text-white text-center rounded font-medium"
                type="button"
              >
                Perform DFS
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border relative flex justify-center items-center">
        <div>
          <TreeVisualizer treeData={treeData} />
          <div className="mb-5 w-[100%]">
            {traversalResult.length > 0 ? (
              <div className="w-[100%] relative p-5 flex items-center">
                <p>Pre-order Traversal:</p>
                <ul className="flex items-center ml-1">
                  {traversalResult.map((item, index) => (
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
              <p className="text-lg ml-3 font-semibold text-gray-800">
                Pre-order Traversal:
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoGenerate;
