import '../static/index.css';
export default function Header(props){
    return (
        <div className="header-container">
            <div className="head-logo-container">
                <img src="logo.png" className="logo" />
                <h2>Forcastify</h2>
            </div>
            <div className="search-container">
                <input className="search-input-field" placeholder="Enter city...." type="text" onChange={(e) => props.changeTyped(e.target.value)} value={props.typed} />
                <button className="search-btn" onClick={()=>{props.search()}}>Search</button>
            </div>
        </div>
    )
}