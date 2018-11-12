import mixBasePropertiesComponentsData from '../mixBasePropertiesComponentsData';
import { CategoriesIds } from '../../../constants/SettingsFieldsCategories';

export default (fieldParams) => {
    const propertiesComponentsData = {
        label: {
            component: 'TextField',
            title: 'Заголовок поля',
            description: 'Оставьте пустым, чтобы скрыть элемент надписи',
            category: CategoriesIds.MODEL,
        },

        placeholder: {
            component: 'TextField',
            title: 'Подсказка поля',
            category: CategoriesIds.MODEL,
        },

        resizable: {
            component: 'CheckBoxSelector',
            title: 'Разрешить увеличение размера',
            category: CategoriesIds.STYLE,
        },
    };

    return mixBasePropertiesComponentsData(propertiesComponentsData, fieldParams);
}