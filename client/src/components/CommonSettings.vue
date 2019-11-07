<template>
    <div class="common-settings">
        <text-field-component
            class="common-settings__property-item"
            v-model="selectedCalculator.name"
            :options="{
                title: 'Название формы'
            }"
        ></text-field-component>

        <text-field-component
            class="common-settings__property-item"
            v-model="selectedCalculator.backgroundImageSrc"
            :options="{
                title: 'Ссылка на обложку формы'
            }"
        ></text-field-component>

        <buttons-group
            class="common-settings__property-item"
            v-model="selectedCalculator.contentMaxWidth"
            :variants="[
                { label: 600, value: 600 },
                { label: 750, value: 750 },
                { label: 900, value: 900 },
                { label: 1050, value: 1050 },
                { label: 1200, value: 1200 }
            ]"
            :options="{
                title: 'Максимальная ширина формы'
            }"
        ></buttons-group>

        <button class="button button--primary common-settings__submit" @click="saveData">
            Сохранить
        </button>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import TextFieldComponent from "@/components/field_properties_editors/TextFieldComponent";
import ButtonsGroup from "@/components/field_properties_editors/ButtonsGroup";

export default {
    name: "CommonSettings",

    components: {
        ButtonsGroup,
        TextFieldComponent
    },

    computed: {
        ...mapGetters(["selectedCalculator"])
    },

    methods: {
        saveData() {
            this.$store.dispatch("updateData");
        }
    }
};
</script>

<style scoped lang="scss">
.common-settings {
    max-width: 850px;
    margin: 50px auto;
    padding: 0 24px;

    &__property-item {
        margin: 18px 0;
    }
}
</style>
