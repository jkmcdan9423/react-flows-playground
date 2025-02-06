import { useEffect, useReducer } from 'react';
import { Handle, Position, useNodeConnections } from '@xyflow/react';
 

interface State {
    imageSrc: string;
    choice: string;
  }

//Since image and choice are related, instead of handling two pieces of state let's use a reducer
type Action =
  { type: 'set_image_and_choice'; imageSrc: string; choice: string } | { type: 'reset'; imageSrc: string };

const reducer = (state: State, action: Action): State => {
switch (action.type) {
  case 'set_image_and_choice':
    return { ...state, imageSrc: action.imageSrc, choice: action.choice };
  case 'reset':
    return { ...state, imageSrc: action.imageSrc, choice: '' };
  default:
    return state;
}
};

function PictureNode() {
    const [state, dispatch] = useReducer(reducer, { imageSrc: 'https://picsum.photos/200/300', choice: '' });

    const connections = useNodeConnections({
        handleType: 'target',
        handleId: 'picture-handle'
    })

  let choices: any = []

  const imageMap = {
    
    Mountains: 'https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA',
    City: 'https://fastly.picsum.photos/id/43/1280/831.jpg?hmac=glK-rQ0ppFClW-lvjk9FqEWKog07XkOxJf6Xg_cU9LI',
    Desert: 'https://fastly.picsum.photos/id/46/3264/2448.jpg?hmac=ZHE8nk-Q9uRp4MxgKNvN7V7pYFvA-9BCv99ltY3HBv4',
    Beach: 'https://fastly.picsum.photos/id/77/1631/1102.jpg?hmac=sg0ArFCRjP1wlUg8vszg5RFfGiXZJkWEtqLLCRraeBw',
    Adrenaline: 'https://fastly.picsum.photos/id/174/1600/589.jpg?hmac=W4bG4rAGyrN9dOGFpK_BB6yROybLRgCsKQErTl9llRQ',

  } as const;

  useEffect(() => {
    connections.forEach((connection) => {
        choices.push(connection.source);
    });

    const randomChoice = choices.length > 0 ? Math.floor(Math.random() * choices.length) : -1;

    if(randomChoice > -1) {
        const chosen = choices[randomChoice];
        dispatch({ type: 'set_image_and_choice', imageSrc: imageMap[chosen as keyof typeof imageMap], choice: chosen });  
    } else {
        dispatch({ type: 'reset', imageSrc: 'https://picsum.photos/200/300' });
    }
   }, [connections])

  
  return (
    <>
      <Handle id="picture-handle" type="target" position={Position.Top} />
      <div>
        <h1>Your Vacation Spot:</h1>
        <img className="vacation-image" src={state.imageSrc} />
        <div>{state.choice}</div>
      </div>
    </>
  );
}

export default PictureNode;