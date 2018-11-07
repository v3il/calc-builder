import ContainerSizes from '../../../constants/ContainerSizes';

export default (fieldParams) => {
    const propertiesComponentsData = {
        width: {
            component: 'SizeSelector',
            values: ContainerSizes.sizes,
            title: 'Ширина элемента'
        },

        float: {
            component: 'CheckBoxSelector',
            title: 'Обтекаемый элемент',
        },

        marginLeft: {
            component: 'MarginSelector',
            title: 'Сдвиг элемента',
            min: 0,

            get max() {
                return 100 - fieldParams.width;
            },

            get disabled() {
                return fieldParams.float;
            },
        },
    };

    Object.keys(propertiesComponentsData).forEach((key) => {
        const paramsObject = propertiesComponentsData[key];

        paramsObject.propertyName = key;
        paramsObject.value = fieldParams[key];
    });

    console.log(propertiesComponentsData);

    return propertiesComponentsData;
}