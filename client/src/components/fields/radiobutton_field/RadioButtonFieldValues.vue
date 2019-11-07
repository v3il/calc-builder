<template>
    <div class="checkbox-values">
        <h3 class="checkbox-values__field-title">{{ field.params.label }}</h3>

        <div
            class="checkbox-values__option"
            v-for="(option, index) in field.params.options"
            :key="index"
        >
            <h4>{{ option.label }}</h4>

            <div class="checkbox-values__values-editor">
                <label class="checkbox-values__value-block">
                    <span class="checkbox-values__value-label">Значение включённого состояния</span>

                    <input
                        type="text"
                        class="checkbox-values__value-input text-input"
                        v-model.number="option.activatedValue"
                    />
                </label>

                <label class="checkbox-values__value-block">
                    <span class="checkbox-values__value-label"
                        >Значение выключенного состояния</span
                    >

                    <input
                        type="text"
                        class="checkbox-values__value-input text-input"
                        v-model.number="option.deactivatedValue"
                    />
                </label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RadioFieldValues",

    props: {
        field: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped lang="scss">
.checkbox-values {
    max-width: 1600px;
    margin: 0 auto;

    &__values-editor {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 -12px;
    }

    &__option {
        margin: 6px 0;
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
