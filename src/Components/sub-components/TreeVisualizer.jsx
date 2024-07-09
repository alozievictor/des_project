import React from "react";

const TreeVisualizer = ({ treeData }) => {
  // Function to render nodes in pre-order traversal
  const renderPreOrder = (node) => {
    if (!node) {
      return null;
    }

    return (
      <div className="node relative">
        <div className="node-value">{node.value}</div>
        <div className="children">
          {renderPreOrder(node.left)}
          {renderPreOrder(node.right)}
        </div>
      </div>
    );
  };

  // Function to render edges for connections between nodes
  const renderEdges = (node) => {
    if (!node) {
      return null;
    }

    return (
      <React.Fragment>
        {node.left && (
          <div className="edge left-edge">
            <div className="edge-line"></div>
            {renderEdges(node.left)}
          </div>
        )}
        {node.right && (
          <div className="edge right-edge">
            <div className="edge-line"></div>
            {renderEdges(node.right)}
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="tree-container">
      <div className="tree">
        <div className="tree-content">
          {renderEdges(treeData)}
          {renderPreOrder(treeData)}
        </div>
      </div>
    </div>
  );
};

export default TreeVisualizer;
