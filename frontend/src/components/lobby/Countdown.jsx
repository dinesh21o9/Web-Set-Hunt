import React from 'react'
import "../../css/CountDown.scss"

function Countdown({ hours, minutes, seconds, days }) {
    return (
        <div className="cd-container">
            <div className="box relative font-black bg-black/30">
                <div className="text">
                    Web Set Hunt will start in 
                </div>
                <div className="countdown flex gap-4 font-bold ">
                    <div className="hour">
                        <div className="top">Hours</div>
                        <div className="bottom">{hours}</div>
                    </div>
                    <div className="colon">:</div>
                    <div className="minute">
                        <div className="top">Minutes</div>
                        <div className="bottom">{minutes}</div>
                    </div>
                    <div className="colon">:</div>
                    <div className="second">
                        <div className="top">Seconds</div>
                        <div className="bottom">{seconds}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Countdown