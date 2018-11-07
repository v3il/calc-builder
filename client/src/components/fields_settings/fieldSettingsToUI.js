const settingsParams = {
    width: {
        component: 'Slider'
    }
};


export default (settingName, settingValue) => {
    return Object.assign({}, settingsParams[settingName] || {}, {
        value: settingValue,
        name: settingName,
    });
}