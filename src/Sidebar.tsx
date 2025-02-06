import { useDragDrop } from './DragDropContext';
 
export default () => {
  const [_, setType] = useDragDrop();
 
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, option: string) => {
    setType(option);
    event.dataTransfer.effectAllowed = 'move';
  };

  const options: Array<string> = ['Beach', 'Desert', 'City', 'Mountains', 'Adrenaline']
 
  return (
    <aside>
      <div className="description">Drag these options and connect them to pick a random vacation spot!</div>
      {options.map((option) => (
        <div key={option} className="dndnode input"onDragStart={(event) => onDragStart(event, option)} draggable>
            {option}
        </div>
      ))}
    </aside>
  );
};