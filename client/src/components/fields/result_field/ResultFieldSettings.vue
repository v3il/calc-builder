<template>
    <div>
        <h3>{{ propsCategoriesNames.MODEL }}</h3>

        <text-field-component
            class="field-settings__property-component"
            v-model="fieldData.params.template"
            :options="{
                label: uSign('translate', 'Шаблон вывода результата'),
                description: uSign(
                    'translate',
                    'Используйте код $RESULT$ для подстановки результата вычисления формулы',
                ),
                minLength: 1,
                title: uSign('translate', 'Шаблон отображения результата'),
            }"
        ></text-field-component>

        <buttons-group
            class="field-settings__property-component"
            v-model="fieldData.params.textAlign"
            :variants="alignVariants"
            :options="{
                title: uSign('translate', 'Выравнивание текста'),
            }"
        ></buttons-group>

        <h3 class="field-settings__title">{{ propsCategoriesNames.STYLE }}</h3>

        <color-selector
            v-model="fieldData.style.labelColor"
            class="field-settings__property-component"
            :options="{
                title: uSign('translate', 'Цвет надписи'),
            }"
        ></color-selector>
    </div>
</template>

<script>
import BaseFieldSettings from '../BaseFieldSettings';
import TextFieldComponent from '../../field_properties_editors/TextFieldComponent';
import ButtonsGroup from '../../field_properties_editors/ButtonsGroup';
import ColorSelector from '../../field_properties_editors/ColorSelector';

export default {
    name: 'ResultFieldSettings',
    extends: BaseFieldSettings,

    components: {
        TextFieldComponent,
        ButtonsGroup,
        ColorSelector,
    },

    data() {
        return {
            alignVariants: [
                {
                    label: this.uSign('translate', 'Слева'),
                    value: 'left',
                },
                {
                    label: this.uSign('translate', 'По центру'),
                    value: 'center',
                },
                {
                    label: this.uSign('translate', 'Справа'),
                    value: 'right',
                },
            ],
        };
    },

    methods: {},
};
</script>
