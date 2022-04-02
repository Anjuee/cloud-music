import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Top, Tab, TabItem } from './style';

const Home = () => {
    const activeClassName = (active) => {
        return active.isActive ? 'selected' : '';
    }

    return (
        <div>
            <Top>
                <span className="iconfont menu">&#xe65c;</span>
                <span className="title">云音悦</span>
                <span className="iconfont search">&#xe62b;</span>
            </Top>
            <Tab>
                <NavLink to="recommend" className={activeClassName}><TabItem><span > 推荐 </span></TabItem></NavLink>
                <NavLink to="singers" className={activeClassName}><TabItem><span > 歌手 </span></TabItem></NavLink>
                <NavLink to="rank" className={activeClassName}><TabItem><span > 排行榜 </span></TabItem></NavLink>
            </Tab>
            <Outlet />
        </div>
    )
}

export default React.memo(Home);