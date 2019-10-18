<template>

</template>

<script>
    import ButtonsGroup from '../field_properties_editors/ButtonsGroup';
    import CheckBoxSelector from '../field_properties_editors/CheckBoxSelector';
    import ColorSelector from '../field_properties_editors/ColorSelector';
    import SelectOptionsManager from '../field_properties_editors/SelectOptionsManager';
    import Slider from '../field_properties_editors/Slider';
    import TextFieldComponent from '../field_properties_editors/TextFieldComponent';
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
            TextFieldComponent,
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
