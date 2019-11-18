<template>
    <select
        :style="options.styles"
        :id="options.id"
        class="select-element"
        @change="$emit('change', $event)"
    >
        <option
            v-for="(option, index) in options.options"
            :key="index"
            :selected="option.isSelected"
            >{{ option.label }}</option
        >
    </select>
</template>

<script>
export default {
    name: 'SelectElement',

    props: {
        value: {
            type: [String, Number],
        },

        options: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style scoped lang="scss">
.select-element {
    padding: 0.33rem 0.93rem;
    font-size: 0.93rem;
    outline: none;
    color: $color_primary;
    border: 2px solid $gray;
    border-radius: 0.3rem;
    transition: border 0.3s;
    background-color: $white;
    cursor: pointer;
    display: inline-block;
    width: 100%;
}
</style>
