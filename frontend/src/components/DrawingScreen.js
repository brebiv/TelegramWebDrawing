import React, {useState, useEffect, useRef} from "react";
import CanvasDraw from 'react-canvas-draw';
import { HexColorPicker } from "react-colorful";


import penIcon from '../pen.png';
import eraserIcon from '../eraser.png';
import gearIcon from '../gear.png';
import backIcon from '../back.png';
// import refreshIcon from '../refresh.png';
import resetZoomIcon from '../reset_zoom.png';
import {ReactComponent as UpArrow} from '../up-arrow-hand-drawn.svg';
// import io from "socket.io-client";

// import { Popover } from 'react-tiny-popover'
import axios from 'axios';


function DrawingScreen(props) {

    const [time_left, setTimeLeft] = useState(0);
    const [all_time, setAllTime] = useState(0);
    const [color, setColor] = useState('#000000');
    const [prevColor, setPrevColor] = useState(null);
    const [saveData, setSaveData] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    // const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [brushSize, setBrushSize] = useState(8);
    const [sendingData, setSendingData] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    // const [recentColors, setRecentColors] = useState(['red', 'green', 'blue', 'yellow']);
    const [recentColors, setRecentColors] = useState(['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000']);
    const canvasRef = useRef(null);
    // const socket = useRef(null);


    useEffect(() => {
        // alert(window.Telegram.WebApp.initDataUnsafe.user.id);
        // console.log("Use effect");
        // socket.current = io('wss://webapp.heytam.net/');
        // socket.current = io('wss://webapp.heytam.net/', {path: "/ws"});
        try {
            fetch(`https://webapp.heytam.net/api/test?uid=${window.Telegram.WebApp.initDataUnsafe.user.id}`).then(response => response.json())
            .then(data => {console.log(data)});
            // fetch(`https://webapp.heytam.net/api/drawing/276784458/`).then(response => response.json()).then(data => {
            fetch(`https://webapp.heytam.net/api/drawing/${window.Telegram.WebApp.initDataUnsafe.user.id}/`).then(response => response.json()).then(data => {
                console.log('did that');
                setSaveData(data.canvas_data);
                canvasRef.current.loadSaveData(data.canvas_data, true);
                setImageLoaded(true);
            })
            // fetch(`https://webapp.heytam.net/api/get_image/${window.Telegram.WebApp.initDataUnsafe.user.id}`).then(response => {console.log(response)})
        } catch (error) {
            console.log(error);
            // fetch(`https://webapp.heytam.net/api/drawing/276784458/`).then(response => response.json()).then(data => {
            //     setSaveData(data.canvas_data);
            //     canvasRef.current.loadSaveData(data.canvas_data, true);
            // })
        }
        setTimeLeft(60);
        setAllTime(60);
        const timer = setInterval(() => {
            setTimeLeft(prev_time => prev_time - 1);
            // let percent_of_time = Math.round((time_left-1 * 100)/all_time);
        }, 1000);
        window.onscroll = function(ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                console.log('bottom');
                document.getElementById('my-body').style.overflowY = 'hidden';
            }
        };
        
        return () => {
            clearInterval(timer);
            // socket.current.close();
        }
    }, [])

    const handleUndo = (e) => {
        canvasRef.current.undo()
        sendCanvasData(e);
    }

    const handleResetView = (e) => {
        canvasRef.current.resetView()
        sendCanvasData(e);
    }

    const sendCanvasData = (e) => {

        // console.log(data_url);
        // if (imageLoaded == false) {
        //     console.log("Image is still loading");
        //     return;
        // }

        setSendingData(true);
        // let data_url = e.getDataURL('jpeg', false, '#FFFFFF');
        let data_url = canvasRef.current.getDataURL('jpeg', false, '#FFFFFF');
        // console.log(data_url);
        // let save_data = e.getSaveData();
        let save_data = canvasRef.current.getSaveData();
        let save_data_json = JSON.parse(save_data);
        setSaveData(save_data);
        // console.log(save_data);
        let payload = {
            canvas_data: save_data,
            data_url: data_url,
            user_id: window.Telegram.WebApp.initDataUnsafe.user.id,
            // user: {id: 1968494431}
            // user_id: 276784458,
        }

        axios.post('https://webapp.heytam.net/api/save_drawing', payload).then(resp => {
            console.log(resp);
            setSendingData(false);
        })
        
        // socket.current.emit("canvas_data", payload);
    }

    const loadCanvasData = (e) => {
        let canvas = canvasRef.current;
        canvasRef.current.loadSaveData(saveData);
    }

    const handleSettingsClick = (e) => {
        // setIsPopoverOpen(!isPopoverOpen);
        if (isSettingsOpen) {
            let new_colors = recentColors;
            new_colors.shift();
            new_colors.push(color);
            setRecentColors(new_colors);
        }
        setIsSettingsOpen(!isSettingsOpen);
    }

    const handleColorChange = (e) => {
        setColor(e.target.value);
        setIsSettingsOpen(false);
    }

    // useEffect(()=>{
    //     console.log(brushSize);
    // })


    return (
        <div>
            {/* <input type='range' value='50' min='5' max='100' step='1' className="z-50" /> */}
            {/* <p className="text-[#7acfcf]">{JSON.stringify(window.Telegram.WebApp.initDataUnsafe)}</p> */}
            <div className="w-full h-screen flex flex-col items-center" style={{backgroundColor: 'var(--tg-theme-bg-color)'}}>
                <h3 style={{fontFamily: 'Pacifico'}} className="pt-4 text-center text-[#7acfcf] text-3xl">Ready to draw?</h3>
                <h3 style={{fontFamily: 'Pacifico'}} className="pt-4 text-center text-[#7acfcf] text-3xl">swipe up...</h3>
                {/* <div className="time-display w-[80%] mt-10">
                    <div className="w-auto rounded-full h-3 bg-gray-700 m-1 p-[2px]">
                        <div className="bg-[#7acfcf] h-full rounded-full ease-linear duration-1000" style={{width: `${Math.round((time_left * 100)/all_time)}%`}}></div>
                    </div>
                </div> */}
                <div className="flex flex-row gap-0.5 mt-20">
                    <UpArrow className="w-8 h-14 pt-4 animate-[bounce_1500ms_linear_infinite] fill-[#7acfcf] stroke-[#7acfcf] stroke-[30px]" />
                    <UpArrow className="w-10 h-16 pb-2 animate-[bounce_1500ms_linear_infinite] fill-[#7acfcf] stroke-[#7acfcf] stroke-[30px]" />
                    <UpArrow className="w-8 h-14 pt-4 animate-[bounce_1500ms_linear_infinite] fill-[#7acfcf] stroke-[#7acfcf] stroke-[30px]" />
                </div>
            </div>
            <div className="container mx-auto h-screen px-1" style={{backgroundColor: 'var(--tg-theme-bg-color)'}}>
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold text-center text-red-500" style={{fontFamily: 'Pacifico'}}>Рисунок могут увидеть другие люди</h1>
                    {sendingData 
                    ? 
                    <div className="flex flex-row">
                        {/* <svg style={{fill: "var(--tg-theme-text-color)"}} role="status" className="w-2 mr-2 text-gray-700 animate-spin fill-[#7acfcf]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
                        <p style={{color: "var(--tg-theme-text-color)"}}>Сохранение... ✨</p>
                        <svg style={{fill: "var(--tg-theme-text-color)"}} role="status" className="w-4 mr-2 text-gray-700 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                        </svg>
                    </div>
                    : <p style={{color: "var(--tg-theme-text-color)"}}>Рисунок сохранен 👍</p>
                    }
                </div>
                {isSettingsOpen ?
                    <div className="absolute w-11/12 z-50 p-2 flex flex-col gap-5 rounded-lg m-auto" style={{backgroundColor: 'var(--tg-theme-bg-color)', border: "2px solid var(--tg-theme-button-color)"}}>
                        {/* <input type="range" min="0" max="100" value="40" class="range" /> */}
                        <label for="range" className="font-bold" style={{color: "var(--tg-theme-text-color)"}}>Толщина кисти</label>
                        <input onChange={e => {setBrushSize(e.target.value);}} type="range" name="brushSize" min="4" max="20" value={brushSize} className="w-[80%] h-2 appearance-none rounded-lg" style={{backgroundColor: "var(--tg-theme-button-color)", color: window.Telegram.WebApp.themeParams.button_text_color}} />
                        {/* <label for='color' className="font-bold" style={{color: "var(--tg-theme-text-color)"}}>Цв</label> */}
                        {/* <input type='color' onChange={e => setColor(e.target.value)} value={color} /> */}
                        <div className="flex flex-row">
                            <HexColorPicker color={color} onChange={setColor} />
                            <div className="rounded-full m-auto" style={{width: `${brushSize*2}px`, height: `${brushSize*2}px`, backgroundColor:`${color}`}}></div>
                        </div>
                        <button onClick={e => handleSettingsClick(e)} className="w-full h-8 rounded-md" style={{backgroundColor: "var(--tg-theme-button-color)", color: "var(--tg-theme-text-color)"}}>Закрыть</button>
                    </div>
                    : ''
                }
                <div onTouchEnd={e => sendCanvasData(e)} className={`container w-auto`} style={{aspectRatio: '4/4'}} >
                    <CanvasDraw ref={canvasRef} lazyRadius={0} immediateLoading={true} clampLinesToDocument={false} enablePanAndZoom={true} zoomExtents={{min:1, max: 3}} hideInterface={true} hideGrid={true} brushRadius={brushSize} brushColor={color} style={{borderRadius: '20px', width: '100%', height: '100%'}} />
                </div>
                <div className="container mx-auto">
                    {/* <div className="time-display">
                        <div className="w-auto bg-gray-200 rounded-full h-3 dark:bg-gray-700 m-1 p-[2px]">
                            <div className="bg-red-500 h-full rounded-full ease-linear duration-1000" style={{width: `${Math.round((time_left * 100)/all_time)}%`}}></div>
                        </div>
                    </div> */}
                </div>
                <div  className="container mt-2 mx-auto flex flex-row space-x-2">
                    <div className="h-full rounded-lg basis-1/6 bg-[#c42d2d] border-4 border-yellow-300" onClick={e => {setColor(prevColor)}}>
                        <img className="h-full w-full icon-color" src={penIcon}></img>
                    </div>
                    <div className="h-full rounded-lg basis-1/6 bg-[#c42d2d] border-4 border-yellow-300" onClick={e => {setPrevColor(color);setColor('white')}}>
                        <img className="h-full w-full icon-color" src={eraserIcon}></img>
                    </div>
                    <div className="h-full rounded-lg basis-1/6 bg-[#c42d2d] border-4 border-yellow-300" onClick={e => handleUndo(e)}>
                        <img className="h-full w-full icon-color" src={backIcon}></img></div>
                    {/* <Popover
                        isOpen={isPopoverOpen}
                        positions={['top', 'bottom', 'left', 'right']} // preferred positions by priority
                        content={
                            // <div className="p-2 flex flex-row items-center gap-2 rounded-lg mb-2" style={{backgroundColor:"var(--tg-theme-bg-color)"}}>
                            //     <div onClick={e => {setBrushSize(4);setIsPopoverOpen(false);}}>
                            //         <div className={`w-6 h-6 rounded-full bg-black border-2 border-yellow-300`}></div>
                            //     </div>
                            //     <div onClick={e => {setBrushSize(8);setIsPopoverOpen(false);}}>
                            //         <div className="w-10 h-10 rounded-full bg-black border-2 border-yellow-300"></div>
                            //     </div>
                            //     <div onClick={e => {setBrushSize(12);setIsPopoverOpen(false);}}>
                            //         <div className="w-14 h-14 rounded-full bg-black border-2 border-yellow-300"></div>
                            //     </div>
                            //     <label for="range" className="font-bold text-gray-600">Толщина кисти</label>
                            //     <input onChange={e => {setBrushSize(e.target.value);setIsPopoverOpen(false);}} type="range" name="price" min="4" max="20" value={brushSize} className="w-full h-2 bg-blue-100 appearance-none" />
                            // </div>
                            <div>
                                <label for="range" className="font-bold text-gray-600">Толщина кисти</label>
                                <input onChange={e => {setBrushSize(e.target.value);}} type="range" name="price" min="4" max="20" value={brushSize} className="w-full h-2 bg-blue-100 appearance-none" />
                            </div>
                        }
                        >

                    </Popover> */}
                    <div className="h-full rounded-lg basis-1/6 bg-[#c42d2d] border-4 border-yellow-300" onClick={e => handleSettingsClick(e)}>
                        <img className="h-full w-full icon-color" src={gearIcon}></img>
                    </div>
                    <div className="h-full rounded-lg basis-1/6 bg-[#c42d2d] border-4 border-yellow-300" onClick={e => handleResetView(e)}>
                        <img className="h-full w-full icon-color" src={resetZoomIcon} />
                    </div>
                    <div className="container basis-2/6">
                        <div className="grid grid-cols-4 gap-1 h-full">
                            {recentColors.slice(0).reverse().map(color => 
                                <div className="rounded border" style={{backgroundColor: `${color}`}} onClick={e => setColor(color)}></div>
                            )}
                            {/* <div className="bg-red-700 rounded border border-emerald-300" onClick={e => setColor('red')}></div>
                            <div className="bg-green-700 rounded border border-emerald-300" onClick={e => setColor('green')}></div>
                            <div className="bg-blue-700 rounded border border-emerald-300" onClick={e => setColor('blue')}></div>
                            <div className="bg-yellow-300 rounded border border-emerald-300" onClick={e => setColor('yellow')}></div> */}
                            {/* <div className="bg-orange-400 rounded border border-emerald-300" onClick={e => setColor('orange')}></div>
                            <div className="bg-purple-700 rounded border border-emerald-300" onClick={e => setColor('purple')}></div>
                            <div className="bg-white rounded border border-emerald-300" onClick={e => setColor('white')}></div>
                            <div className="bg-black rounded border border-emerald-300" onClick={e => setColor('black')}></div> */}
                            {/* <div className="bg-slate-700 rounded border border-emerald-300" onClick={e => setColor('gray')}></div> */}
                            {/* <div className="bg-slate-700 rounded border border-emerald-300" onClick={e => setColor('gray')}></div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DrawingScreen;
