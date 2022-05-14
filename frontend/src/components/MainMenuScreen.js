import React from "react";
import MainMenuButton from "./MainMenuButton";
// import CanvasDraw from 'react-canvas-draw';


// import io from 'socket.io-client';


class MainMenuScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatInputText: '',
            // messages: ['help!', 'help!','help!','help!','help!','help!','help!','help!'],
            messages: ['help!'],
        };
    }

    
    handleChatSubmit(e) {
        // e.preventDefault();
        // if (this.state.chatInputText != '') {
        //     // this.socket.send(this.state.chatInputText)
        //     this.setState({messages: [...this.state.messages, this.state.chatInputText], chatInputText: ''});
        // }
    }

    handlePlayButtonClick(e) {
        e.preventDefault();
        window.history.pushState({}, undefined, "/d");
    }
    
    componentDidMount() {
        // this.socket = io('ws://localhost:5000/')
        // this.socket.on('message', msg => {
        //     console.log(msg);
        // })
        // this.socket.on('connection', (socket) => {
        //     console.log("Here");
        //     console.log("Connection", socket);
        // })
    }

    render() {
        // let messageElements = this.state.messages.map(message => 
        //     <div className="w-auto">
        //         <p><a href="https://t.me/xyz941d"><b>leo</b></a> {message}</p>
        //     </div>)

        return (
            <div className="width-full h-screen p-1 pt-16 flex flex-col" style={{backgroundColor: 'var(--tg-theme-bg-color)'}}>
                <div className="flex flex-col items-center">
                    <h1 className="text-[#7acfcf] text-5xl main-font border-4 border-amber-500 px-1">Draw Game</h1>
                    <div className="py-14 w-4/6 flex flex-col gap-4">
                        <MainMenuButton text={'Рисовать'} type={'play_button'} />
                        <MainMenuButton text={'Галерея'} type={'watch_button'} />
                        <MainMenuButton text={'Выход'} type={'exit_button'} />
                    </div>
                </div>
            </div>
        )
    }
}

export default MainMenuScreen;
