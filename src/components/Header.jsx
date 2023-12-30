import React, { useState } from 'react'
import styled from 'styled-components'
import SearchBar from './SearchBar';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { loginWithSpotifyClick, logoutClick, refreshTokenClick } from '../spotify'
import { useLocation } from 'react-router-dom';
import { useDataLayerValue } from '../DataLayer'

function Header() {
    const [{ user, token }] = useDataLayerValue();
    const [menuState, setMenuState] = useState(false);
    const location = useLocation();

    return (
        <HeaderContainer $user={token}>
            <Nav>
                <NavButton>&lt;</NavButton>
                <NavButton>&gt;</NavButton>
                {location.pathname === '/search' ? <SearchBar /> : null}
            </Nav>

            <LoginContainer $user={token}>
                {
                    token ?
                        (<InstallButton ><DownloadingOutlinedIcon className="install_icon" /><span>Install App</span></InstallButton>) :
                        (<h4 >Sign up</h4>)
                }
                {
                    token ?
                        (<Profile onClick={refreshTokenClick}><HistoryOutlinedIcon className='refresh_icon' /></Profile>) :
                        null
                }
                {
                    token ?
                        (<Profile onClick={() => setMenuState(!menuState)}><img src={user?.images[0].url} alt="" /></Profile>) :
                        (<LoginButton onClick={loginWithSpotifyClick}>Log in</LoginButton>)
                }
                <ProfileMenu $menushow={menuState}>
                    <span>Account</span>
                    <span>Profile</span>
                    <span>Settings</span>
                    <span onClick={logoutClick}>Log out</span>
                </ProfileMenu>
            </LoginContainer>
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 65px;
    border-radius: 10px 10px 0 0;
    background-image: ${prop => prop.$user ? "transparent" : "linear-gradient(to top, rgb(12,12,12) 10%, rgb(15,15,15) 100%)"}; 
    z-index: 99;
`

const Nav = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    margin-left: 23px;
`

const NavButton = styled.button`
    margin-right: 8px;
    padding: 0;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 100px;
    font-size: 24px;
    text-align: center;
    background-color: rgba(0,0,0,0.4); //#050505
    color: rgb(150,150,150);
    cursor: pointer;
`

const LoginContainer = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    margin-right: ${prop => prop.$user ? '14px' : '23px'};

    h4{
        margin-right: 32px; 
        font-size: 15px;
        letter-spacing: 0.6px;
        white-space: nowrap;
        color: rgba(250,250,250,0.5);
        cursor: pointer;

        &:hover{
            transform: scale(1.05);
            font-weight: 800;
            color: rgb(250,250,250);
        }
    }
`

const LoginButton = styled.button`
    padding: 13px;
    width: 110px;
    border: none;
    border-radius: 50px;
    background-color: white;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: black;
    cursor: pointer;

    &:hover{
        transform: scale(1.04);
        font-weight: 800;
    }
`

const Profile = styled.div`
    margin-left: 11px;
    width: 24px;
    height: 24px;
    border-radius: 50px;
    border: 3px solid rgba(10,10,10,0.7);
    background-color: rgba(10,10,10,0.7);
    cursor: pointer;

    img{
        width: 100%;
        border-radius: 50px; 
    }
    .refresh_icon{
        object-fit: contain;
        border-radius: 50px;
        background-color: transparent;
        opacity: 0.6;
    }
    &:hover{
        transform: scale(1.08);
        
        .refresh_icon{
            opacity: 1;
        }
    }
`
const InstallButton = styled.button`
    display: flex;
    align-items: center;
    position: relative;
    padding: 7px 13px;
    border: none;
    border-radius: 50px;
    background-color: rgba(10,10,10,0.6);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.8px;
    white-space: nowrap;
    cursor: pointer;

    span{
        margin-left: 24px;
        background-color: transparent;
    }
    .install_icon{
        position: absolute;
        padding-right: 5px;
        font-size: 20px; 
        background-color: transparent;
    }
    &:hover{
        transform: scale(1.05);
    }
`

const ProfileMenu = styled.div`
    display: ${prop => prop.$menushow ? 'flex' : 'none'};
    flex-flow: column nowrap;
    position: absolute;
    top: 100%;
    margin-top: 10px;
    width: 100%;
    border-sizing: border-box;
    border: 4px solid #282828; 
    border-radius: 5px;
    background-color: #282828; 
    z-index: 99;

    span{
        padding: 11px 15px;        
        font-size: 14px;
        cursor: default;

        &:hover{
            background-color: #3e3e3e
        }
    }
    span:nth-child(3){
        border-bottom: 1px solid rgb(60,60,60);
    }
`