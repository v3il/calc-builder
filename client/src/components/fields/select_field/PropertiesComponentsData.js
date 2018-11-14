import mixBasePropertiesComponentsData from '../mixBasePropertiesComponentsData';

import { CategoriesIds } from '../../../constants/SettingsFieldsCategories';

export default (fieldParams) => {
    const propertiesComponentsData = {
        selectOptions: {
            component: 'SelectOptionsManager',
            category: CategoriesIds.MODEL,
        }
    };

    return mixBasePropertiesComponentsData(propertiesComponentsData, fieldParams);
}