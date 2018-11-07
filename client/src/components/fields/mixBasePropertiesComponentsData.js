import ContainerSizes from '../../constants/ContainerSizes';

export default (fieldPropertiesComponentsData, fieldParams) => {
    const baseFieldPropertiesComponentsData = {
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

    const propertiesComponentsData = Object.assign(
        {},
        baseFieldPropertiesComponentsData,
        fieldPropertiesComponentsData
    );

    Object.keys(propertiesComponentsData).forEach((key) => {
        const paramsObject = propertiesComponentsData[key];

        paramsObject.propertyName = key;
        paramsObject.value = fieldParams[key];
    });

    console.log(111, propertiesComponentsData);

    return propertiesComponentsData;
}