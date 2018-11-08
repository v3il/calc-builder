import mixBasePropertiesComponentsData from '../mixBasePropertiesComponentsData';

export default (fieldParams) => {
    const propertiesComponentsData = {
        label: {
            component: 'TextField',
            title: 'Заголовок поля',
            description: 'Оставьте пустым, чтобы скрыть элемент надписи'
        },

        placeholder: {
            component: 'TextField',
            title: 'Подсказка поля',
        },

        // borderColor: {
        //     component: 'ColorSelector',
        //     title: 'Цвет границы',
        // },
    };

    return mixBasePropertiesComponentsData(propertiesComponentsData, fieldParams);
}