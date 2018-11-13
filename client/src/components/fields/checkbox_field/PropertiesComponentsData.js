import mixBasePropertiesComponentsData from '../mixBasePropertiesComponentsData';
import { CategoriesIds } from '../../../constants/SettingsFieldsCategories';

export default (fieldParams) => {
    const propertiesComponentsData = {
        label: {
            component: 'TextField',
            title: 'Текст чекбокса',
            category: CategoriesIds.MODEL,
        },

        value: {
            component: 'ButtonsGroup',
            values: [
                {
                    value: true,
                    label: 'Включен'
                },
                {
                    value: false,
                    label: 'Выключен'
                },
            ],
            title: 'Состояние по умолчанию',
            category: CategoriesIds.MODEL,
        },
    };

    return mixBasePropertiesComponentsData(propertiesComponentsData, fieldParams);
}