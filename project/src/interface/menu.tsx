import React from "react";
import { NavLink } from "react-router-dom";

export const Menu = (): JSX.Element => {
    const logoUrl = '/img/logo.png';
    const postImgUrl = '/img/pencil.png'
    const menus = [
        { name: "Main", path: "/" },
        { name: "House", path: "/house" },
        { name: "Search", path: "/search" },
        { name: "My", path: "/mypage"} //나중에는 아마 사용자 id 들어가야 할듯
      ];

    return (
        <div className="flex flex-col items-center fixed top-[20px] left-[30px] w-[210px] h-[600px] bg-[#a0d4684c] rounded-[78px]">
            <div className="flex flex-row items-center justify-center mt-[20px] w-[175px] h-[114px] bg-[#f6ffee] rounded-[50px]">
                <h1 className="ml-5 text-[#507d1f] text-[30px] text-center">To Home</h1>
                <img src={logoUrl} alt="logo" className="w-[88px] h-[83px]"/>
            </div>

            <div className="flex flex-col mt-5 gap-4">
                {menus.map((menu, index) => {
                    return (
                        <NavLink
                            to={menu.path}
                            key={index}
                            className="bg-gray"
                        >
                            <div className="w-[106px] text-[#507d1f] text-[25px] tracking-[0] whitespace-nowrap">
                                {menu.name}
                            </div>
                        </NavLink>
                    )
                })}
            </div>

            <div className="flex items-center mt-[100px] w-[172px] gap-[12px] px-[46px] py-[12px] bg-[#507d1f4c] rounded-[8px]">
                <div className="w-[68px] h-[24px] font-h4 font-[number:var(--h4-font-weight)] text-white text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] whitespace-nowrap [font-style:var(--h4-font-style)]">
                    Logout
                </div>
            </div>

            <img src={postImgUrl} className="mt-[40px]"/>
        </div>
    );
};