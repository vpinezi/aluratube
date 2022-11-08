import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/TimeLine";
import { StyledFavorites } from "../src/components/Favorites";

function HomePage() {
    return (
        <>
        <CSSReset />
        <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1
            }}>
            <Menu />
            <Header />
            <TimeLine playlists={config.playlists}/>
            <Favorites Favorites={config.favorites} />
        </div>
        </>
        
    ) 
    
}
  
export default HomePage

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        margin-top: 10px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f7f8;
        width: 1512px;
        height: 230px;
        object-fit: cover;
        
    }
    .banner {
        left: 0px;
        top: 56px;
        border-radius: 0%;
        display: block; 
        width: 1512px;
        height: 230px;
        object-fit: cover;
        object-position: 50% 50%;
    }
`;

function Header(){
    return (
        <StyledHeader>
            <div className="container">
                <img className="banner" src={config.banner} />
            </div> 
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function TimeLine(props){
    //console.log("Dentro do componente", props);
    const playlistNames = Object.keys(props.playlists);

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {
                                videos.map((video) => {
                                    return(
                                        <a href={video.url}>
                                            <img src={video.thumb}/>
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

function Favorites(props){
    //console.log("Dentro do componente", props.Favorites);
    const favorites = props.Favorites;

    return (
        <StyledFavorites>
            <h2>AluraTube Favoritos</h2>
            <section>
                <div>
                    {
                        favorites.map((favorite) => {
                            return(
                                <a href={favorite.url}>
                                    <img src={favorite.thumb} />
                                    <span>
                                        {favorite.name}
                                    </span>
                                </a>  
                            )
                        })
                    }
                </div>
                
            </section>
        </StyledFavorites>      
    )
}
