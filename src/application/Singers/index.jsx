import React, { useState, useEffect } from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import {
    NavContainer,
    ListContainer,
    List,
    ListItem,
} from "./style";
import {
    getSingerList,
    getHotSingerList,
    changeEnterLoading,
    changePageCount,
    refreshMoreSingerList,
    changePullUpLoading,
    changePullDownLoading,
    refreshMoreHotSingerList
} from './store/actionCreators';
import Scroll from './../../baseUI/scroll/index';
import { connect } from 'react-redux';
import Loading from '../../baseUI/loading';
import LazyLoad, { forceCheck } from 'react-lazyload';

function Singers(props) {
    let [category, setCategory] = useState('');
    let [alpha, setAlpha] = useState('');

    const { singerList, pageCount, pullUpLoading, pullDownLoading, enterLoading } = props;

    const { getHotSingerDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props;

    useEffect(() => {
        getHotSingerDispatch();
        // eslint-disable-next-line
    }, []);

    const handleUpdateAlpha = (val) => {
        setAlpha(val);
        updateDispatch(category, val);
    };

    const handleUpdateCatetory = (val) => {
        setCategory(val);
        updateDispatch(val, alpha);
    };

    const handlePullUp = () => {
        pullUpRefreshDispatch(category, alpha, category === '', pageCount);
    };

    const handlePullDown = () => {
        pullDownRefreshDispatch(category, alpha);
    };

    const renderSingerList = () => {
        const list = singerList ? singerList.toJS() : [];
        console.log(props)
        return (
            <List>
                {
                    list.map((item, index) => {
                        return (
                            <ListItem key={item.accountId + "" + index}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                                        <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                                    </LazyLoad>
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    };



    return (
        <div>
            <NavContainer>
                <Horizen
                    list={categoryTypes}
                    title={"?????? (????????????):"}
                    handleClick={(val) => handleUpdateCatetory(val)}
                    oldVal={category}></Horizen>
                <Horizen
                    list={alphaTypes}
                    title={"?????????:"}
                    handleClick={val => handleUpdateAlpha(val)}
                    oldVal={alpha}></Horizen>
            </NavContainer>
            <ListContainer>
                <Scroll
                    pullUp={handlePullUp}
                    pullDown={handlePullDown}
                    pullUpLoading={pullUpLoading}
                    pullDownLoading={pullDownLoading}
                    onScroll={forceCheck}
                >
                    {renderSingerList()}
                </Scroll>
                {enterLoading ? <Loading></Loading> : null}
            </ListContainer>
        </div>
    )
}

const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount'])
});
const mapDispatchToProps = (dispatch) => {
    return {
        getHotSingerDispatch() {
            dispatch(getHotSingerList());
        },
        updateDispatch(category, alpha) {
            dispatch(changePageCount(0));//??????????????????????????????pageCount??????
            dispatch(changeEnterLoading(true));//loading?????????????????????????????????????????????????????????????????????loading??????
            dispatch(getSingerList(category, alpha));
        },
        // ????????????????????????????????????
        pullUpRefreshDispatch(category, alpha, hot, count) {
            dispatch(changePullUpLoading(true));
            dispatch(changePageCount(count + 1));
            if (hot) {
                dispatch(refreshMoreHotSingerList());
            } else {
                dispatch(refreshMoreSingerList(category, alpha));
            }
        },
        //??????????????????
        pullDownRefreshDispatch(category, alpha) {
            dispatch(changePullDownLoading(true));
            dispatch(changePageCount(0));//????????????????????????
            if (category === '' && alpha === '') {
                dispatch(getHotSingerList());
            } else {
                dispatch(getSingerList(category, alpha));
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));