import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import '../Css/Login.css';

// import Log_Check from '../Function/Login_Func';
// import { response } from 'express';


function SigninPage({setUserData, userData}) {
    const [isLogin, setIsLogin] = useState(false)
    const history = useHistory();
    const responseGoogle = (response) => {    
        if(response){
            console.log(response);
            const data = {
                mail : response.Fs.lt,
            }
            // req.query.data.mail
            axios.post('http://54.146.88.72:3000/index/login' , {data} )
            .then((res) => {
                console.log(res);
                if(!res.data.result){
                    setUserData({
                        ...userData,
                        mail : response.Fs.lt,
                        name : response.Fs.sd
                    });
                    localStorage.setItem('user_Id', JSON.stringify(res.id));
                    localStorage.setItem('data_user', JSON.stringify(res));
                  
                    alert('가입 되지 않았습니다.\n추가 정보를 기입해 주세요.');
                    history.push('Info');
                }else {
                    alert('가입된 이용자 입니다.')
                    
                    history.push('Home');
                }
            })   //axios 기능을 통한 post 사용및 name 값 전달.
            
        }
    };
    return (
        <div className='Login_Main_Line'>
            <div className='sinzuku_logo'></div>
                <div className='Login_Btn'>
                    <GoogleLogin
                        clientId="1098599664574-dks3nufmqlqommmrd79k205n76ttp8o4.apps.googleusercontent.com"
                        buttonText="GoogleLogin"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'} 
                    />
                    {/* {isLogin ? <Redirect to={'/Info'} />:<Redirect to={'/'} />} */}
            </div>
        </div>
    );
}

export default SigninPage;

