import { createContext, useContext, useState, PropsWithChildren } from 'react';
 
const DragDropContext = createContext<[string | null, React.Dispatch<React.SetStateAction<string | null>>]>([
    null, 
    () => {}
  ]);

export const DragDropProvider = ({ children }: PropsWithChildren) => {
  const [type, setType] = useState<string | null>(null);
 
  return (
    <DragDropContext.Provider value={[type, setType]}>
      {children}
    </DragDropContext.Provider>
  );
}
 
export default DragDropContext;
 
export const useDragDrop = () => {
  return useContext(DragDropContext);
}
