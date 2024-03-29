import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PostData } from "./PostData.tsx";

export const MyRecipePage:React.FC<{userId:string}> = ( {userId}) => {
    const [ myRecipes, setMyRecipes ] = useState<PostData[]>([])
    const [ iLikes, setILikes ] = useState<number[]>([])

    useEffect(() => { 
        fetch(`http://tobehome.kro.kr:8080/api/posts/user/${userId}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { 
            if(data){ setMyRecipes(data) }
            else{ alert(data.message) }
        });
        //내가 좋아요 누른 게시글 조회
        fetch(`http://tobehome.kro.kr:8080/api/posts/likedByUser/${userId}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { 
            if(data){ data.map((each)=> setILikes(prev => [...prev, each.id])) }
        });
    },[]);
    
    return <div>
    
    <h1 className="text-[#507e1f] text-[30px] ">Recipes: {myRecipes.length}</h1>
    <div className="grid grid-cols-3 gap-3 max-h-[500px] overflow-y-auto overflow-x-hidden">
    
    { myRecipes.map((each, index) => {
        //게시글 좋아요 수 조회
        /*
        fetch(`http://tobehome.kro.kr:8080/api/posts/${each.id}/likeCount`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { 
            if(data){  }
        });
        */

        return (
        <div className="flex items-center justify-center bg-white rounded-[20px] h-[250px]">
            <Link to={`/${each.type === 'product' ? 'recipe':'house'}/${each.id}`}> 
            <div>
                <img className='rounded-[20px] max-h-[200px]' src={each.imageUrl} alt={each.title}/></div>
            <div className="max-h-[24px] max-w-[260px] ml-2 flex flex-row">
                <h1 className="text-[#507e1f] max-w-[180px] overflow-hidden">{each.title}</h1>
                <div className="flex flex-row ml-auto mr-1">
                    { (iLikes.indexOf(each.id) !== -1) ? 
                        <img className='w-[23px]' src="/img/heart.png" alt="heart"/>:
                        <img className='w-[23px]' src="/img/emptyHeart.png" alt="emptyHeart"/>
                    }
                </div>
            </div>
            </Link>
        </div>)
    })}
    </div>
</div>
}