import React, { useRef, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  Connection,
  type Edge,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
 
import Sidebar from './Sidebar';
import { DragDropProvider, useDragDrop } from './DragDropContext';
import PictureNode from './PictureNode';

 
const initialNodes = [
  {
    id: '1',
    type: 'picture',
    data: { label: '' },
    position: { x: 250, y: 5 },
  },
];
  
const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDragDrop();
  const nodeTypes = useMemo(() => ({ picture: PictureNode }), []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
 
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
 
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: type,
        type: 'input',
        position,
        data: { label: `${type}` },
      };
 
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );
 
  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          nodeTypes={nodeTypes}
          style={{ backgroundColor: "#F7F9FB" }}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
};
 
export default () => (
  <ReactFlowProvider>
    <DragDropProvider>
      <DnDFlow />
    </DragDropProvider>
  </ReactFlowProvider>
);
