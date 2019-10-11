<template>
    <div class="text-field">
        <h4 class="text-field__title" v-if="options.title">
            {{options.title}}
        </h4>

        <input
            type="text"
            class="text-field__input"
            @input="emitUpdate"
            :value="value"
            :placeholder="options.placeholder"
            :id="options.id"
            :style="options.style"
        ></input>

        <p
            class="text-field__description"
            v-if="options.description"
        >{{description}}</p>
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

<style scoped>

</style>
