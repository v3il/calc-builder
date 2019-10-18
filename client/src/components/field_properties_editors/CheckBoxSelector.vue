<template>
    <div class="checkbox-field">
        <label class="checkbox-field__label" v-if="options.title">
            <input
                type="checkbox"
                class="checkbox-field__input checkbox"
                @input="emitUpdate"
                :value="value"
            ></input>

            <span class="checkbox-field__text checkbox">{{options.title}}</span>
        </label>

        <p
            class="checkbox-field__description"
            v-if="options.description"
        >{{options.description}}</p>
    </div>
</template>

<script>
    export default {
        name: 'TextFieldComponent',

        props: {
            value: {
                type: Boolean,
                required: true,
            },

            options: {
                type: Object,
                default: () => ({}),
            }
        },

        methods: {
            emitUpdate(event) {
                this.$emit('input', event.target.checked);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../../common-styles/text-input';

    .checkbox-field {
        &__input {
            margin: 6px 0;
        }

        &__label {
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        &__input {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            flex-shrink: 0;
            cursor: pointer;
        }

        &__description {
            color: #777;
            font-size: 0.8rem;
        }
    }
</style>
