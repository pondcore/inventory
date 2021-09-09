const getDistrict = async (provinceName) => {
    return await axios({
        method: 'get',
        url: `/v1/thailand/provinces/${provinceName}/district`,
        baseURL: 'https://thaiaddressapi-thaikub.herokuapp.com/'
    });
}

export default { getDistrict };
