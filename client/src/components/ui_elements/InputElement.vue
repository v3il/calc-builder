<template>
    <input
        type="text"
        class="input-element"
        :value="value"
        :placeholder="options.placeholder || ''"
        :id="options.id"
        :style="options.style || {}"
        v-on="{
            ...$listeners,
            input: () => {},
            blur: onBlur,
        }"
    />
</template>

<script>
export default {
    name: 'InputElement',

    props: {
        value: {
            type: [String, Number],
            required: true,
        },

        options: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            prevValue: this.value,
            currentValue: this.value,
        };
    },

    methods: {
        onBlur() {
            this.emitUpdate();
        },

        emitUpdate() {
            const input = this.$el;

            let value = input.value.trim();
            const { validator, minLength, type } = this.options;

            if (type === 'number') {
                try {
                    const cleanedValue = this.cleanNumericValue(value);
                    value = cleanedValue.length ? parseFloat(cleanedValue) : 0;

                    if (Number.isNaN(value) || !Number.isFinite(value)) {
                        value = 0;
                    }
                } catch (error) {
                    value = 0;
                }
            }

            if (minLength && value.length < minLength) {
                value = this.prevValue;
            }

            if (validator) {
                value = validator(value, this.prevValue);
            }

            this.prevValue = value;
            this.currentValue = value;
            input.value = value;

            this.$emit('input', value);
        },

        cleanNumericValue(value) {
            const isNegativeValue = value.startsWith('-');
            const cleanedValue = value.replace(/\.{2,}/g, '.').replace(/([^0-9.])/g, '');

            return isNegativeValue ? `-${cleanedValue}` : cleanedValue;
        },
    },
};
</script>

<style scoped lang="scss">
.input-element {
    padding: 0 1.2rem;
    font-size: 0.93rem;
    outline: none;
    height: 2.4rem;
    color: $color_primary;
    border: 2px solid $gray;
    background-color: $white;
    border-radius: 0.6rem;
    position: relative;
    transition: border 0.3s linear;
    box-sizing: border-box;
    width: 100%;
}
</style>
