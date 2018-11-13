import ContainerSizes from '../../constants/ContainerSizes';
import { CategoriesIds } from '../../constants/SettingsFieldsCategories';

export default (fieldPropertiesComponentsData, fieldParams) => {
    const baseFieldPropertiesComponentsData = {
        width: {
            component: 'ButtonsGroup',
            values: ContainerSizes.sizes.map(size => ({label: `${size}%`, value: size})),
            title: 'Ширина элемента',
            category: CategoriesIds.SIZE_AND_POSITION,
        },

        float: {
            component: 'CheckBoxSelector',
            title: 'Обтекаемый элемент',
            category: CategoriesIds.SIZE_AND_POSITION,
        },

        marginLeft: {
            component: 'MarginSelector',
            title: 'Сдвиг элемента',
            description: 'Применимо только к необтекаемым элементам',
            min: 0,
            category: CategoriesIds.SIZE_AND_POSITION,

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

    return propertiesComponentsData;
}