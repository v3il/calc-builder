<template>
    <div class="checkbox-values">
        <h3 class="checkbox-values__field-title">{{ field.params.label }} (Checkbox)</h3>

        <div class="checkbox-values__values-editor">
            <label class="checkbox-values__value-block">
                <span class="checkbox-values__value-label">
                    {{ uSign('translate', 'Значение включённого состояния') }}
                </span>

                <input
                    type="text"
                    class="checkbox-values__value-input text-input"
                    v-model.number="field.params.activatedValue"
                />
            </label>

            <label class="checkbox-values__value-block">
                <span class="checkbox-values__value-label">
                    {{ uSign('translate', 'Значение выключенного состояния') }}
                </span>

                <input
                    type="text"
                    class="checkbox-values__value-input text-input"
                    v-model.number="field.params.deactivatedValue"
                />
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CheckBoxFieldValues',

    props: {
        field: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped lang="scss">
.checkbox-values {
    background-color: $checkbox_widget_light;
    padding: 12px 24px;

    &__values-editor {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 -12px;
    }

    &__value-block {
        min-width: 300px;
        margin: 6px 12px;
        flex: 1;
    }

    &__value-label {
        display: block;
        margin-bottom: 6px;
    }
}
</style>
