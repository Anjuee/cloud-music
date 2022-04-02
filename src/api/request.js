import { axiosInstance, categoryMap } from "./config";

// 推荐页面相关Ajax请求
export const getBannerRequest = () => {
    return axiosInstance.get('/banner');
}

export const getRecommendListRequest = () => {
    return axiosInstance.get('/personalized');
}

// 歌手页面相关Ajax请求
export const getHotSingerListRequest = (count) => {
    return axiosInstance.get(`/top/artists?offset=${count}`);
}

/* export const getSingerListRequest = (category, alpha, count) => {
    return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
} */

export const getSingerListRequest = (category, alpha, count) => {
    const { type, area } = category ? categoryMap.get(category) : {};
    return axiosInstance.get(
        `/artist/list?${type && area ? `type=${type}&area=${area}` : ''
        }&initial=${alpha.toLowerCase()}&offset=${count}`
    );
}







