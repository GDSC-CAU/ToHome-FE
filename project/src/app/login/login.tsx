import React from "react"
//import { Link } from "react-router-dom";


export const LoginPage:React.FC = () => {
    const handleID = () => {
        //아이디 입력

    }
    const handlePW = () => {
        //비밀번호 입력
    }
    const handleLoginBtn = () => {
        //로그인 버튼 눌렀을때
    }

    return <div className="LoginPageBg flex justify-center">
        <div>
            <img className="absolute top-0 right-0 max-h-full z-0" alt="LoginFlower" src="/img/loginFlower.svg"/>
            <div className="fixed w-[498px] h-[498px] -bottom-60 right-2/3 -left-40 bg-[#a0d4680d] rounded-[249px]" />
            <div className="fixed w-[650px] h-[650px] -bottom-80 right-2/3 -left-60 bg-[#a0d4680d] rounded-[325px]" />
            <div className="fixed w-[822px] h-[822px] -bottom-96 right-2/3 -left-80 bg-[#a0d4680d] rounded-[411px]" />
        </div>
        <div className="flex flex-col items-center justify-center h-full w-1/4 gap-4 ">
            <img className='w-[146px]' alt="leaf" src='/img/logo.png'/>
            
            <div className="bg-white h-[50px] w-full flex flex-row items-center gap-4 rounded-md">
                <img className='ml-3 w-[23px] h-[23px]' alt="guest" src="/img/guest.png"/>
                <input 
                    onChange={handleID}
                    type="text" 
                    placeholder="ID" 
                    className="LoginInput font-semibold w-full"/>

            </div>
            <div className="bg-white h-[50px] w-full flex flex-row items-center gap-4 rounded-md">
                <img className='ml-3 w-[23px] h-[23px]' alt="guest" src="/img/lock.png"/>
                <input 
                    onChange={handlePW}
                    type="text" 
                    placeholder="password" 
                    className="LoginInput font-semibold w-full"/>
                
            </div>
            <button onClick = {handleLoginBtn} className="bg-white h-[50px] w-full z-30 rounded-md border hover:border-[#507e1f] transition-all">LOG IN</button>
            <button className="flex z-30 ml-auto hover:font-semibold transition-all">Forget password?</button>
        </div>
        
    </div>
}