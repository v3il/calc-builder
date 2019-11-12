<script>
/* eslint vue/no-unused-components: 0 */

import ButtonsGroup from '../field_properties_editors/ButtonsGroup';
import CheckBoxSelector from '../field_properties_editors/CheckBoxSelector';
import ColorSelector from '../field_properties_editors/ColorSelector';
import SelectOptionsManager from '../field_properties_editors/SelectOptionsManager';
import Slider from '../field_properties_editors/Slider';
import TextFieldComponent from '../field_properties_editors/TextFieldComponent';

export default {
    name: 'BaseFieldSettings',

    components: {
        ButtonsGroup,
        CheckBoxSelector,
        ColorSelector,
        SelectOptionsManager,
        Slider,
        TextFieldComponent,
    },

    props: {
        fieldData: Object,
    },

    data() {
        return {
            propsCategoriesNames: {
                SIZE_AND_POSITION: 'Размеры и положение',
                MODEL: 'Атрибуты поля',
                STYLE: 'Внешний вид',
            },
        };
    },
};
</script>

<style lang="scss">
.field-settings {
    margin: 12px 0;

    &__title {
        margin-top: 24px;
        margin-bottom: 6px;
    }

    &__property-component {
        margin: 9px 0;
    }
}
</style>
