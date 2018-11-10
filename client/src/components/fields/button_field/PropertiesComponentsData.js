import mixBasePropertiesComponentsData from '../mixBasePropertiesComponentsData';
import { CategoriesIds } from '../../../constants/SettingsFieldsCategories';

export default (fieldParams) => {
    const propertiesComponentsData = {
        text: {
            component: 'TextField',
            title: 'Текст кнопки',
            category: CategoriesIds.MODEL,
        },

        borderRadius: {
            component: 'Slider',
            title: 'Окружность углов',

            min: 1,
            max: 10,
            category: CategoriesIds.STYLE,
        },
    };

    return mixBasePropertiesComponentsData(propertiesComponentsData, fieldParams);
}