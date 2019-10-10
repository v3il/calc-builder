<template>

</template>

<script>
    import ButtonsGroup from '../field_properties_editors/ButtonsGroup';
    import CheckBoxSelector from '../field_properties_editors/CheckBoxSelector';
    import ColorSelector from '../field_properties_editors/ColorSelector';
    import SelectOptionsManager from '../field_properties_editors/SelectOptionsManager';
    import Slider from '../field_properties_editors/Slider';
    import TextField from '../field_properties_editors/TextField';
    import TextFieldNumber from '../field_properties_editors/TextFieldNumber';

    import ContainerSizes from '../../constants/ContainerSizes';

    export default {
        name: 'BaseFieldSettings',

        components: {
            ButtonsGroup,
            CheckBoxSelector,
            ColorSelector,
            SelectOptionsManager,
            Slider,
            TextField,
            TextFieldNumber,
        },

        props: {
            fieldData: Object,
        },

        data() {
            return {
                // fieldOptions: this.fieldData,

                propsCategoriesNames: {
                    SIZE_AND_POSITION: 'Размеры и положение',
                    MODEL: 'Атрибуты поля',
                    STYLE: 'Внешний вид',
                },

                sizeVariants: ContainerSizes.sizes.map(size => ({
                    label: `${size}%`,
                    value: size,
                })),
            };
        },
    };
</script>

<style lang="scss">
    .field-settings-component {
        margin-top: 18px;
    }

    .category-title {
        margin-top: 30px;
    }
</style>
