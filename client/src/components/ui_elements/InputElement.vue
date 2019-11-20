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
            input: onInput,
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
        onInput() {
            if (!this.options.lazy) {
                this.emitUpdate();
            }
        },

        onBlur() {
            this.emitUpdate();
        },

        emitUpdate() {
            const input = this.$el;

            let value = input.value;
            const { validator, minLength } = this.options;

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
