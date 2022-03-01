import '../static/index.css';
import DaysList from './daysList';
import { ClipLoader } from 'react-spinners';

export default function MainBody(props){
        if(props.loading == true){
            return (
                <>
                    <center className="loading-container">
                        <ClipLoader size="100" />
                        <p>Loading...</p>
                    </center>
                </>
            );
        }else{
            if(props.loading == false && Object.keys(props.loadedData).length > 0){
                return (
                    <div className="main-container">
                        <div className="current-container" style={{ 
                                backgroundImage : `url('${props.loadedData.icon}')`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition : "center",
                                width : "70%"
                            }}>
                            <div className="current-data-container">
                                <p> {props.loadedData.date}</p>
                                <h3>{ props.loadedData.city }</h3>
                                <strong>{ props.loadedData.condition }</strong>
                                <p>
                                    <small>{ props.loadedData.min_tmp } <sup>o</sup> C</small> to <small>{ props.loadedData.max_tmp } <sup>o</sup> C</small>
                                </p>
                            </div>
                        </div>
                        <div className="others-container">
                            {
                                props.loadedList.map((each, index)=>{
                                    return <DaysList clickHandler={props.changeCurrent} key={index} date={each.date} city={each.city} active={each.active} condition={each.condition} icon={each.icon} />
                                })
                            }
                        </div>
                    </div>
                );
            }else{
                if(props.loading == false && props.city != ""){
                    return (
                        <>
                            <center>
                                <video autoPlay={true} muted height="300">
                                    <source src="not-found.mp4" type="video/mp4">
                                    </source>
                                </video>
                                <p>City not found, please specify a valid city.</p>
                            </center>
                        </>
                    );
                }else{
                    return (
                        <>
                            <center>
                                <video autoPlay={true} muted height="300">
                                    <source src="nothing-typed.mp4" type="video/mp4">
                                    </source>
                                </video>
                                <p>Please specify a valid city.</p>
                            </center>
                        </>
                    );
                }
            }
        // }
    }
}