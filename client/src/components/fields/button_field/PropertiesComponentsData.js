import mixBasePropertiesComponentsData from '../mixBasePropertiesComponentsData';

export default (fieldParams) => {
    const propertiesComponentsData = {
        text: {
            component: 'TextField',
            title: 'Текст кнопки',
        },

        borderColor: {
            component: 'ColorSelector',
            title: 'Цвет границы',
        },
    };

    return mixBasePropertiesComponentsData(propertiesComponentsData, fieldParams);
}