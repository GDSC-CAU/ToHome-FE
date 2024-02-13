import React, { useState } from "react"
import { Menu } from "../interface/menu.tsx"


interface goodsBtnType {
    x: number;
    y: number;
    postId:string;
}
  
const GoodsBtnComponent: React.FC<goodsBtnType> = ({ x, y, postId}) => {
    console.log(x)
    console.log(y)
    return <button style={{position: 'absolute', top: y+40 , left: x+40,}} className='flex items-center justify-center text-white bg-[#507E1F] rounded-[30px] w-5 h-5'>+</button>
}

export const PostPage:React.FC = () => {

    const [ IsRecipe, setIsRecipe ] = useState(false);
    const [ IsHouse, setIsHouse ] = useState(false);
    
    const [ photosSrc, setPhotosSrc ] = useState<string[]>([])
    const [ imgBase64, setImgBase64 ] = useState('')
    
    const [ Source, setSource ] = useState<string[]>([])
    const [ addSourceInput, setAddSourceInput ] = useState<string>('')

    const [ Furniture, setFurniture ] = useState<string[]>([])
    const [ addFurnitureInput, setAddFurnitureInput ] = useState<string>('')
    
    const bestSource = ['플라스틱','유리','정제된 나무']
    const bestFurniture = ['의자','간이책상','서랍장']

    const [ IsHousePhoto, setIsHousePhoto ] = useState(false);
    const [ EditingGoods, setEditingGoods ] = useState(false)
    const [ goodsBtn, setGoodsBtn ] = useState<goodsBtnType[]>([])
    //goodsBtn 배열은 각 버튼의 위치와 게시글 아이디를 가지고 있음

    const LocatePhotos = (photosrc) => {
        //이미지 주소 복사 할때의 그 주소를 넣으면 되긴함
        return <div>
            <img src={`/img/select/${photosrc}`} alt="photos" className="flex items-center justify-center min-w-[128px] h-[128px] text-[30px] bg-[#F1F2F0] rounded-[50px]"/>
        </div>
    }

    const SaveImage = (event) => {
        //여기서 받은 사진 주소를 photosSrc에 푸시
        setIsHousePhoto(true)
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64 = reader.result;
            if(base64){
                setImgBase64(base64.toString())
            }
        }

        if(event.target.files[0]) {
            reader.readAsDataURL(event?.target.files[0])
            setPhotosSrc( [...photosSrc, event.target.files[0].name ] )
        }
    }

    const Input3Component = (props:string) => {
        return <div className="flex flex-col gap-5 ">
            <input 
            type="text"
            placeholder="제목을 입력하세요"
            className="bg-[#DEF0CA] text-[30px] text-[#507E1F] p-5 placeholder:text-zinc-300 rounded-[30px] w-full h-[80px] focus:outline-none active:translate-y-1"/>
            <input 
            type="text"
            placeholder={`${props}에 대해 간단히 설명해주세요!`}
            className="bg-[#F8FBF4] text-[20px] text-[#507E1F] p-5 placeholder:text-zinc-300 rounded-[30px] w-full h-[50px] focus:outline-none active:translate-y-1"/>
            <textarea 
            placeholder={`${props}에 대한 설명을 자세하게 해주세요!`}
            className="bg-[#F8FBF4] text-[20px] text-[#507E1F] p-5 placeholder:text-zinc-300 rounded-[30px] w-full h-[400px] focus:outline-none resize-none active:translate-y-1">
            </textarea>
        </div>
    }

    const UsedComponent = ( props:string, best ) => {
        let flag = true
        if(props === '사용재료'){ flag = true }
        else { flag = false }

        return <div>
                <div className={`mt-10 ${flag ? 'bg-[#F8FBF4]':'bg-[#DEF0CA]'} rounded-[30px] border-b border-b-[#73974C] p-10`}>
                    <h1 className="text-[30px] text-[#507E1F]">{props}</h1>
                    <div className="flex overflow-x-auto min-h-[40px]">
                    { (flag ? Source:Furniture).map((each, index) => {
                        return <div className="flex items-center gap-2 h-[40px] bg-[#507E1F] text-white rounded-[30px] p-2 mr-3 whitespace-nowrap">
                            <div>{each}</div>
                            <button 
                            onClick={ () => 
                                { (flag ? setSource:setFurniture)(
                                    (flag ? Source:Furniture).filter( function(_, indexx) { return index !== indexx } )
                                ) } 
                            } 
                            className=" text-red-200 hover:text-red-300">x</button>
                        </div>
                        } 
                    ) }
                    </div>
                </div>
                <div className={`${props === '사용재료' ? 'bg-[#F8FBF4]':'bg-[#DEF0CA]'} rounded-[30px] p-10`}>

                    <input
                    type="text"
                    onChange={(event) => { (flag ? setAddSourceInput:setAddFurnitureInput)(event?.target.value) }}
                    placeholder={`${props}를 입력하세요`}
                    value={ (flag ? addSourceInput:addFurnitureInput) }
                    className={`text-[#507E1F] ${props === '사용재료' ? 'bg-[#DEF0CA]':'bg-[#F8FBF4]'} rounded-[30px] pl-5 h-[40px] placeholder:text-[#507E1F] focus:outline-none`}/>
                    
                    <button 
                    onClick={() => { 
                        if((flag ? Source:Furniture).indexOf((flag ? addSourceInput:addFurnitureInput)) === -1) //현재 배열에 없다면
                        {   
                            (flag ? setSource:setFurniture)([...(flag ? Source:Furniture), (flag ? addSourceInput:addFurnitureInput)]);   //배열에 추가
                        }
                        (flag ? setAddSourceInput:setAddFurnitureInput)('')
                        }} 
                    className="bg-[#B4CE97] h-[40px] w-[50px] rounded-[30px] text-[15px] text-[#507E1F] p-1">
                        추가
                    </button>
                    
                    <div className="flex flex-row gap-3 mt-5">
                    {best.map((each) => {
                        return <button 
                        onClick={() => { 
                            if((flag ? Source:Furniture).indexOf(each) === -1) {
                                (flag ? setSource:setFurniture)([...(flag ? Source:Furniture), each])
                            }
                        }} 
                        className="bg-[#507E1F] text-white rounded-[30px] p-2 active:translate-y-1">
                            {each}
                        </button>
                    })}
                    </div>
                </div>
            </div>
    }

    const handlePhotoClick = (event: React.MouseEvent<HTMLImageElement>) => {
        //클릭 했을 때 마우스 좌표(위치) 파악 
        //-> 거기에 +버튼 추가 (+버튼에 기능 따로 넣어놓고)
        if(EditingGoods)
        {
            const boundingRect = event.currentTarget.getBoundingClientRect();
            console.log(event.clientX, event.clientY)
            const newBtn:goodsBtnType = { x:event.clientX - boundingRect.left, y:event.clientY - boundingRect.top, postId:'0' }
            setGoodsBtn([...goodsBtn, newBtn])
        }
    }



    return <div className="flex items-center justify-center">
        <Menu />

        {!IsRecipe && !IsHouse &&
        <div className="absolute left-[40%] top-[20%]">
            <button onClick={() => { setIsRecipe(true) }} className="absolute text-[20px] sm:text-[50px] bg-[#DEF0CA] rounded-[30px] sm:w-0  hover:text-[52px] hover:w-[210px] transition-all">Recipe POST</button>
            <button onClick={() => { setIsHouse(true) }} className="absolute top-[200px] text-[20px] sm:text-[50px] bg-[#B4CE97] rounded-[30px] sm:w-0 hover:text-[52px] hover:w-[210px] transition-all">House POST</button>
        </div>
        }

        { IsRecipe && 
        <div className="absolute top-[93px] w-[50%] lg:w-[40%] bg-white rounded-[50px] p-10">
            <button className="absolute -top-[60px] left-[80%] bg-[#E9F3DE] rounded-[4px] text-[#507E1F] text-[16px] w-[139px] h-[50px] font-semibold shadow-md hover:w-[145px] hover:h-[55px] hover:left-[79%] hover:-top-[62px] active:translate-y-1">POST</button>
            <div className="flex flex-row overflow-x-auto gap-5">
                { photosSrc.map( (each) => LocatePhotos(each) ) }
                <label
                htmlFor="photoInput"
                className="flex items-center justify-center min-w-[128px] h-[128px] text-[30px] bg-[#F1F2F0] rounded-[50px] hover:bg-[#DBDCDB] transition-all">+</label>
                <input
                type="file"
                id="photoInput"
                onChange={ SaveImage }
                className="hidden"/>
            </div>
            <h1 className="text-[20px] text-[#507E1F] border-b border-b-[#73974C] pb-5">사용할 사진을 삽입하세요</h1>
            
            <div className="mt-[30px] border-b border-b-[#73974C] pb-10">
                { Input3Component('레시피') }
            </div>

            { UsedComponent('사용재료', bestSource) }
        </div>
        }

        { IsHouse &&
        <div className="absolute top-[93px] w-[50%] lg:w-[40%] bg-white rounded-[50px] p-10">
            <div className="w-full flex items-center justify-center">
                { IsHousePhoto ?
                <div >
                    { EditingGoods && 
                        <h1 className="absolute top-4 left-40 justify-center text-[15px]">
                            사진위에 원하는 위치에 클릭해서 소품을 추가해주세요!
                        </h1>
                    }
                    <img 
                    src={`/img/select/${photosSrc[0]}`} 
                    onClick={ handlePhotoClick }
                    alt="photos" 
                    className="max-w-full max-h-30% rounded-[50px]">
                    </img>
                    {/*circles.map((circle, index) => (<CircleButton key={index} x={circle.x} y={circle.y} />))*/}
                    { goodsBtn.map((each,index) =>  <GoodsBtnComponent key={index} x={each.x} y={each.y} postId={each.postId} />)}
                    <button 
                    onClick={() => { setEditingGoods(!EditingGoods) }} 
                    className="flex bg-zinc-200 rounded-[30px] ml-auto mr-3 mt-2">
                        {EditingGoods ? '편집 완료':'소품 추가'}
                    </button>
                </div>:
                <div>
                    <label
                    htmlFor="photoInput"
                    className="text-[20px] py-5 px-20 bg-[#F1F2F0] rounded-[50px] hover:bg-[#DBDCDB] transition-all">인테리어 사진 선택</label>
                    <input
                    type="file"
                    id="photoInput"
                    onChange={ SaveImage }
                    className="hidden"/>
                </div>
                }
            </div>
            <div className="mt-[30px] border-b border-b-[#73974C] pb-10">
                { Input3Component('집') }
            </div>

            { UsedComponent('가구 종류', bestFurniture) }
            { UsedComponent('사용재료', bestSource) }
        </div>
        }
    </div>
}