<template>
    <div>
        <h3>{{ propsCategoriesNames.MODEL }}</h3>

        <text-field-component
            v-model="fieldData.params.label"
            class="field-settings__property-component"
            :options="{
                title: 'Заголовок поля',
                isValid: (value, prevValue) => value || prevValue,
            }"
        ></text-field-component>
    </div>
</template>

<script>
import BaseFieldSettings from "../BaseFieldSettings";

export default {
    name: "CheckBoxFieldSettings",
    extends: BaseFieldSettings
};
</script>
