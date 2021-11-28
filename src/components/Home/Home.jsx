import "./home.css";
import CountryCard from "../Country-card/CountryCard";
import Filter from "../Filter-by-region/Filter-by-region";
import notes from "../Country-card/Notes";


function Home(props) {
    return (
        <div className="home">
            <div className="search-filter">
                <div className="search-bar">
                    <i class="fas fa-search input-icon-search"></i>
                    <input className={"form-control search " + props.theme + "-search"} type="text" placeholder="Search for a country..."></input>
                </div>
                <Filter theme={props.theme} />
            </div>


            <div className="flex-container">
                {notes.map((item) => {
                    return (
                        <CountryCard
                            theme={props.theme}
                            imageSource={item.imageSource}
                            content={item.content}
                            title={item.title}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
