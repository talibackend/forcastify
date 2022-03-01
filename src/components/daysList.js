export default function DaysList(props){
    return (
        <div onClick={()=>{props.clickHandler(props.date)}} className={props.active == 1 ? "each-other-day each-other-day-active" : "each-other-day"}>
            <div className="other-icon">
                <img src={props.icon} />
            </div>
            <div className="other-data">
                <p className="other-data-city">{props.city} - {props.condition}</p>
                <p className="other-data-date">
                    <small>{props.date}</small>
                </p>
            </div>
        </div>
    );
}