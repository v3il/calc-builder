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

        min: {
            component: 'TextFieldNumber',
            title: 'Минимальное значение',
            category: CategoriesIds.MODEL,
            min: 0.5,

            get max() {
                return fieldParams.max;
            }
        },

        max: {
            component: 'TextFieldNumber',
            title: 'Максимальное значение',
            category: CategoriesIds.MODEL,

            get min() {
                return fieldParams.min;
            }
        },

        step: {
            component: 'TextFieldNumber',
            title: 'Значение шага',
            category: CategoriesIds.MODEL,
            min: 0.5,
        },

        // borderColor: {
        //     component: 'ColorSelector',
        //     title: 'Цвет границы',
        // },
    };

    return mixBasePropertiesComponentsData(propertiesComponentsData, fieldParams);
}