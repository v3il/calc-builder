<template>
    <input
        :type="options.type || 'text'"
        class="input-element"
        :value="value"
        :placeholder="options.placeholder || ''"
        :id="options.id"
        :style="options.style || {}"
        v-on="{
            ...$listeners,
            input: emitUpdate,
            blur: updateCurrentValue,
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
        emitUpdate() {
            const input = this.$el;

            let value = input.value;
            const { validator, minLength } = this.options;

            if (minLength && value.length < minLength) {
                value = this.prevValue;
            }

            if (validator) {
                const validationResult = validator(value, this.prevValue);

                if (validationResult === false) {
                    value = this.prevValue;
                }

                if (typeof validationResult !== 'boolean') {
                    value = validationResult;
                }
            }

            this.prevValue = value;
            this.currentValue = value;
            input.value = value;

            this.$emit('input', value);
        },

        updateCurrentValue() {
            this.$el.value = this.currentValue;
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
