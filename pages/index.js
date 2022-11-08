import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/TimeLine";
import { StyledFavorites } from "../src/components/Favorites";

function HomePage() {
        const [valorDoFiltro, setValorDoFiltro] = React.useState("");
        <>
        <CSSReset />
        <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1
            }}>
            <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
            <Header />
            <TimeLine searchValue={valorDoFiltro} playlists={config.playlists}/>
            <Favorites favorites={config.favorites} />
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
        width: 100%;
        height: 230px;
        object-fit: cover;
        
    }
    .banner {
        left: 0px;
        top: 56px;
        border-radius: 0%;
        display: block; 
        width: 100%;
        height: 230px;
        object-fit: cover;
        object-position: 50% 50%;
        src: url(${({ bg }) => bg });
    }
`;

const StyledBanner = styled.div`
    background-color: blue;
    height: 230px;
    //background-image: url(${config.banner});
    background-image: url(${({ bg }) => bg });
`;

function Header(){
    return (
        <StyledHeader>
            {/* <StyledBanner bg={config.banner}/> */}
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

function TimeLine({searchValue, ...props}){
    //console.log("Dentro do componente", props);
    const playlistNames = Object.keys(props.playlists);

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {
                                videos.filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                }).map((video) => {
                                    return(
                                        <a key={video.url} href={video.url}>
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
    const favorites = props.favorites;

    return (
        <StyledFavorites>
            <h2>AluraTube Favoritos</h2>
            <section key ={favorites.name}>
                <div>
                    {
                        favorites.map((favorite) => {
                            return(
                                <a key={favorite.url} href={favorite.url}>
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
