import { useNavigate } from "react-router-dom";


function MainMenuButton(props) {
  const navigate = useNavigate();

  function handleClick() {
      if (props.type == 'play_button') {
          navigate("/d");
      } else if (props.type == 'exit_button') {
          window.Telegram.WebApp.close();
      } else if (props.type == 'watch_button') {
          navigate("/g");
      }
  }

  return (
    <button onClick={handleClick} className="w-full text-[#ffee00] bg-[#7acfcf] font-medium rounded-lg text-2xl py-2.5 focus:outline-none main-font">{props.text}</button>
  )
}

export default MainMenuButton;
