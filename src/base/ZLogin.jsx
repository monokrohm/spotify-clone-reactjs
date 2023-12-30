import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function ZLogin() {
    return (
        <Container>
            <Header><img src='/images/Spotify_LogoWhite.png' alt="" /></Header>
            <CTA>
                <h1>Log in to Spotify</h1>
                <LoginContainer>
                    <SSOButton><img src='/images/google-icon.svg' alt="" /><span>Continue with Google</span></SSOButton>
                    <SSOButton><img src='/images/facebook-icon.svg' alt="" /><span>Continue with Facebook</span></SSOButton>
                    <SSOButton><img src='/images/apple-icon.svg' alt="" /><span>Continue with Apple</span></SSOButton>
                </LoginContainer>
                <LoginContainer>
                    <h5>Email Address</h5>
                    <EmailInput></EmailInput>
                    <h5>Password</h5>
                    <PasswordInput></PasswordInput>
                    <ToggleContainer>
                        <Toggle></Toggle><RememberToggle></RememberToggle>
                        <span>Remember me</span>
                    </ToggleContainer>
                    <LoginButton >Log In</LoginButton>
                    <Link to="/">Forgot your password?</Link>
                </LoginContainer>
                <span>Don't have an account? <Link to="/">Sign up for Spotify.</Link></span>
            </CTA>
        </Container>
    )
}

export default ZLogin

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    height: 100vh;
    background-color: #121212;

    &:after{
        display: block;
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        background-image: linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%);
    }
`

const Header = styled.div`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    height: 100px;
    width: 100%;
    background-color: black;
    z-index: 3;

    img{
        margin-left: 50px;
        width: 120px;
        background-color: black;
    }
`

const CTA = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin-top: 30px;
    width: 730px;
    height: 910px;
    border-radius: 10px;
    background-color: black;
    z-index: 3;

    h1{
        margin-top: 70px;
        margin-bottom: 22px;
        font-size: 45px;
        background-color: black;
    }

    span:nth-child(4){
        margin-top: 40px;
        color: rgb(150,150,150)
    }
  
    a:hover{
        color: #1FDF64;
    }
`

const LoginContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    margin-top: 15px;
    padding-bottom: 41px; 
    width: 324px;
    border-bottom: 1px solid #282c2d;

    h5{
        margin-top: 15px;
        letter-spacing: 0.7px;
    }
    a{
        margin-top: 30px;
        margin-right: auto;
        margin-left: auto;

        &:hover{
            color: #1FDF64;
        }
    }
`

const SSOButton = styled.button`
    display: flex;
    align-items: center;
    margin-top: 8px; 
    height: 48px;
    width: 100%;
    border: 1px solid rgba(250,250,250, 0.5);
    border-radius: 50px;
    
    img{
        margin-left: 25px;
    }
    &:hover{
        border: 1px solid white;
    }
    span{
        margin-right: 20px;
        width: 100%;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
    }
`

const EmailInput = styled.input.attrs({ type: "email", placeholder: "Email Address" })`
    display: flex;
    margin-top: 10px;
    padding: 14px;
    width: calc(100% - 28px);
    border: 1px solid rgba(250,250,250,0.5);
    border-radius: 5px;
    background-color: #121212;

    &:hover{
        border: 1px solid white;
    }
    &:focus{
        border: 4px solid white;
        outline: none;
    }
    &::placeholder{
        font-size: 16px;
        letter-spacing: 0.5px;
        color: rgb(150,150,150);
    }
`

const PasswordInput = styled.input.attrs({ type: "password", placeholder: "Password" })`
    display: flex;
    margin-top: 10px;
    padding: 14px;
    width: calc(100% - 28px);
    border: 1px solid rgba(250,250,250,0.5);
    border-radius: 5px;
    background-color: #121212;

    &:hover{
        border: 1px solid white;
    }
    &:focus{
        border: 4px solid white;
        outline: none;
    }
    &::placeholder{
        font-size: 16px;
        letter-spacing: 0.5px;
        color: rgb(150,150,150);
    }
`

const ToggleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 23px;

    span{
        margin-left: 12px;
        font-size: 14px;
    }
`

const Toggle = styled.input.attrs({ type: "checkbox", id: "switch" })`
    height: 0;
    width: 0;
    visibility: hidden;

    &:checked + label {
        background: #1FDF64;
    }
    &:checked + label:after {
        left: calc(100% - 3px);
        transform: translateX(-100%);
    }
`

const RememberToggle = styled.label.attrs({ for: "switch" })`
    display: block;
    position: relative;
    width: 30px;
    height: 16px;
    border-radius: 100px;
    background: grey;
    cursor: pointer;

    &:after{
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;        
        width: 12px;
        height: 12px;
        border-radius: 50px;
        background: #121212;
        transition: 0.1s;
    }
    &:active:after {
        width: 20px;
    }
`

const LoginButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    height: 48px;
    width: 100%;
    border: none;
    border-radius: 50px;
    background-color: #1FDF64;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.5px;
    color: black;
    cursor: pointer;

    &:hover{
        transform: scale(1.05);
        font-weight: 800;
    }
`