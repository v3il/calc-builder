<template>
    <div class="select-values">
        <h3 class="select-values__field-title">{{ field.params.label }} (Select)</h3>

        <div
            class="select-values__option"
            v-for="(option, index) in field.params.options"
            :key="index"
        >
            <h4>{{ option.label }}</h4>

            <div class="select-values__values-editor">
                <label class="select-values__value-block">
                    <span class="select-values__value-label">
                        {{ uSign('translate', 'Значение включённого состояния') }}
                    </span>

                    <input
                        type="text"
                        class="select-values__value-input text-input"
                        v-model.number="option.activatedValue"
                    />
                </label>

                <label class="select-values__value-block">
                    <span class="select-values__value-label">{{
                        uSign('translate', 'Значение выключенного состояния')
                    }}</span>

                    <input
                        type="text"
                        class="select-values__value-input text-input"
                        v-model.number="option.deactivatedValue"
                    />
                </label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SelectFieldValues',

    props: {
        field: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped lang="scss">
.select-values {
    padding: 12px 24px;
    background-color: lighten($bright_color3, 30%);

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
