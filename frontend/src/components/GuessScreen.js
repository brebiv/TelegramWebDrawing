import React from "react";
// import CanvasDraw from 'react-canvas-draw';

import io from 'socket.io-client';


import { useNavigate } from "react-router-dom";

import backIcon from '../back.png';



function MyButton(props) {
  const navigate = useNavigate();

  function handleClick() {
    //   if (props.type == 'play_button') {
    //       navigate("/d");
    //   } else if (props.type == 'exit_button') {
    //       window.Telegram.WebApp.close();
    //   } else if (props.type == 'watch_button') {
    //       navigate("/g");
    //   }
    navigate('/');
  }

  return (
    <button onClick={handleClick} className="w-1/6 font-medium rounded-lg text-2xl py-2.5 focus:outline-none main-font">{props.text}
        <img src={backIcon} className="w-full h-full rounded-lg" style={{backgroundColor:'var(--tg-theme-button-color)'}} />
    </button>
  )
}

// export default MainMenuButton;



class GuessScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatInputText: '',
            // messages: ['help!', 'help!','help!','help!','help!','help!','help!','help!'],
            messages: ['help!'],
            drawings: [],
        };
        this.canvasRef = React.createRef();
    }

    
    handleChatSubmit(e) {
        e.preventDefault();
        if (this.state.chatInputText != '') {
            // this.socket.send(this.state.chatInputText)
            this.setState({messages: [...this.state.messages, this.state.chatInputText], chatInputText: ''});
        }
    }
    
    componentDidMount() {
        this.socket = io('wss://webapp.heytam.net/', {path: "/ws"});
        this.socket.on('canvas_load', data => {
            console.log(data);
            this.canvasRef.current.loadSaveData(data.canvas_data);
        })
        fetch('https://webapp.heytam.net/api/drawings').then(resp => resp.json()).then(data => {
            this.setState({drawings: data})
            // console.log(data);
        })
        // this.socket.on('connection', (socket) => {
        //     console.log("Here");
        //     console.log("Connection", socket);
        // })
    }

    render() {
        // let imageElements = this.state.drawings.map(drawing => 
        //     <div className="w-full rounded-lg bg-[#7acfcf] p-0.5" style={{aspectRatio: '1/1'}}>
        //         <img src={drawing} className="rounded-lg" />
        //     </div>
        // )
        let imageElements = [];
        this.state.drawings.forEach(drawing => {
            if (drawing.length > 0) {
                imageElements.push(
                    <div className="w-full rounded-lg p-0.5" style={{aspectRatio: '1/1', backgroundColor: "var(--tg-theme-button-color)"}}>
                        <img src={drawing} className="rounded-lg object-cover" />
                    </div>
                )
            }
        })

        // bg-[#f5f5dc] beige
        // text-[#20201D] text color

        return (
            <div className="w-full h-screen p-1" style={{backgroundColor:'var(--tg-theme-bg-color)'}}>
                <div className="w-full h-10 flex flex-row items-center">
                    <MyButton text='' />
                    <h1 className="ml-8 text-center text-xl mb-2" style={{color:'var(--tg-theme-text-color)'}}>Рисунки других людей</h1>
                </div>
                {this.state.drawings.length == 0 
                    && <h1 className="text-center mt-10 text-3xl animate-pulse">Loading...</h1>}
                <div className="w-full grid grid-cols-2 gap-2" style={{backgroundColor:'var(--tg-theme-bg-color)'}}>
                    {imageElements}
                </div>
            </div>
            // <div className="width-full h-screen p-1 flex flex-col" style={{backgroundColor: 'beige'}}>
            //     <div className="container w-auto mb-2 flex-none" style={{aspectRatio: '4/4'}} >
            //         <CanvasDraw ref={this.canvasRef} hideGrid={true} disabled={true} hideInterface={true} style={{borderRadius: '20px', width: '100%', height: '100%', border:"solid 2px #7acfcf"}}/>
            //     </div>
            //     <div className="width-auto flex-grow overflow-auto bg-[#7acfcf] rounded-lg flex flex-col p-2">
            //         <div className="chat-messages flex flex-col overflow-auto basis-5/6">
            //             {messageElements}
            //         </div>
            //         <div className="chat-input basis-1/6">
            //             <form className="h-full" onSubmit={e => this.handleChatSubmit(e)}>
            //                 <input className="h-full rounded-md bg-[#F0F0E0] text-md" type="text" placeholder="   . . ." value={this.state.chatInputText} onChange={e => this.setState({chatInputText: e.target.value})}/>
            //             </form>
            //         </div>
            //     </div>
            // </div>
            // <div className="container mx-auto h-screen px-1 py-1" style={{backgroundColor: 'beige'}}>
            //     <div className="container mx-auto w-[400px] h-[400px]" style={{backgroundColor: ''}} >
            //         <CanvasDraw hideGrid={true} style={{borderRadius: '20px', width: '100%', height: '100%'}} />
            //     </div>
            //     <div className="flex flex-col h-40 mt-2 bg-[#DCF5F5]">
            //         <div className="flex flex-col overflow-auto rounded-lg basis-5/6">
            //             {messageElements}
            //         </div>
            //         <div className="flex flex-row basis-1/6">
            //             <form onSubmit={e => this.handleChatSubmit(e)} className="h-full">
            //                 <input className="h-full" type="text" value={this.state.chatInputText} onChange={e => this.setState({chatInputText: e.target.value})}/>
            //             </form>
            //         </div>
            //     </div>
            // </div>
        )
    }
}
// messages: [...this.state.messages, 'done'
// const data = {
//     time_left: 25,
//     all_time: 30,
// }



// function GuessScreen() {

//     const [time_left, setTimeLeft] = useState(0);
//     const [all_time, setAllTime] = useState(0);
//     const [messages, setMessages] = useState(null);
//     const [color, setColor] = useState(null);
//     const [prevColor, setPrevColor] = useState(null);

//     const messageElements = null;

//     // const setMessage = (message) => {
//         // setMes
//     // }


//     useEffect(() => {
//         console.log("Use effect");
//         setTimeLeft(60);
//         setAllTime(60);
//         setMessages(['hey', 'cat', 'cat', 'cat', 'cay','cat']);
//         const timer = setInterval(() => {
//             console.log("Interval");
//             setTimeLeft(prev_time => prev_time - 1);
//             // let percent_of_time = Math.round((time_left-1 * 100)/all_time);
//             // setPercentOfTime(percent_of_time)
//         }, 1000);
//         return () => clearInterval(timer);
//     }, [])

    

//     return (
//         <div className="container mx-auto h-screen px-1 py-1" style={{backgroundColor: 'beige'}}>
//             {/* <div className="container mx-auto">
//                 <h1 className="text-3xl font-bold text-center text-red-500" style={{fontFamily: 'Pacifico'}}>Guess Screen</h1>
//             </div> */}
//             <div className="container mx-auto w-[400px] h-[400px]" style={{backgroundColor: ''}} >
//                 <CanvasDraw hideGrid={true} brushRadius={8} brushColor={color} style={{borderRadius: '20px', width: '100%', height: '100%'}} />
//             </div>
//             <div className="flex flex-col h-40 mt-2 bg-blue-600">
//                 <div className="overflow-auto">
//                     {messageElements}
//                     {/* <div className="w-auto bg-red-800">
//                         <p>cat</p>
//                     </div>
//                     <div className="w-auto bg-red-800">
//                         <p>cat</p>
//                     </div>
//                     <div className="w-auto bg-red-800">
//                         <p>cat</p>
//                     </div>
//                     <div className="w-auto bg-red-800">
//                         <p>cat</p>
//                     </div>
//                     <div className="w-auto bg-red-800">
//                         <p>cat</p>
//                     </div>
//                     <div className="w-auto bg-red-800">
//                         <p>cat</p>
//                     </div>
//                     <div className="w-auto bg-red-800">
//                         <p>cat</p>
//                     </div>
//                     <div className="w-auto bg-red-800">
//                         <p>cat</p>
//                     </div> */}
//                 </div>
//                 <div className="flex flex-row">
//                     <div>
//                         <input type="text" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


export default GuessScreen;
