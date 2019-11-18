<template>
    <textarea
        class="textarea-element"
        :value="value"
        :placeholder="options.placeholder || ''"
        :id="options.id"
        :style="options.style || {}"
        v-on="{
            ...$listeners,
            input: emitUpdate,
            blur: updateCurrentValue,
        }"
    ></textarea>
</template>

<script>
    export default {
        name: 'TextAreaElement',

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
    .textarea-element {
        padding: 0.4rem 1.2rem;
        font-size: 0.93rem;
        outline: none;
        color: $color_primary;
        border: 2px solid $gray;
        background: $white;
        border-radius: 0.6rem;
        box-sizing: border-box;
        min-height: 5rem;
        transition: border 0.3s;
        width: 100%;
        max-width: 100%;
    }
</style>
