<template>
    <div class="color-picker">
        <h4 class="color-picker__title">{{options.title}}</h4>
        <input class="color-picker__input" type="color" :value="value" @change="emitUpdate">
    </div>
</template>

<script>
    export default {
        name: 'ColorSelector',

        props: {
            value: {
                type: String,
                required: true,
            },

            options: {
                type: Object,
                default: () => ({}),
            }
        },

        methods: {
            emitUpdate(event) {
                this.$emit('input', event.target.value);
            }
        }
    };
</script>

<style scoped lang="scss">
    .color-picker {

        &__input {
            margin-top: 6px;
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
    }
</style>
