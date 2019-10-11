<template>
    <div class="text-field">
        <h4 class="text-field__title" v-if="options.title">
            {{options.title}}
        </h4>

        <input
            type="text"
            class="text-field__input text-input"
            @input="emitUpdate"
            :value="value"
            :placeholder="options.placeholder"
            :id="options.id"
            :style="options.style"
        ></input>

        <p
            class="text-field__description"
            v-if="options.description"
        >{{options.description}}</p>
    </div>
</template>

<script>
    export default {
        name: 'TextFieldComponent',

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
    @import '../../common-styles/input/text-input';

    .text-field {
        &__title {
            margin-bottom: 6px;
        }

        /*&__input {*/
        /*    padding: 0 18px;*/
        /*    font-size: 14px;*/
        /*    outline: none;*/
        /*    height: 36px;*/
        /*    color: #2c2e32;*/
        /*    border: 2px solid #e0e2e6;*/
        /*    background-color: #fff;*/
        /*    border-radius: 10px;*/
        /*    margin: 0;*/
        /*    z-index: 1;*/
        /*    position: relative;*/
        /*    transition: border .3s linear;*/
        /*    box-sizing: border-box;*/
        /*    width: 100%;*/
        /*}*/

        &__description {
            color: #777;
            margin-top: 6px;
        }
    }
</style>
