<template>
    <div
        class="formula-gap"
        :class="{
            'formula-gap--active': element.isActive,
            'formula-gap--in-var': element.isGapInVariable,
        }"
        v-on="$listeners"
    >
        <span class="formula-cursor" />
    </div>
</template>

<script>
export default {
    name: 'FormulaGap',

    props: {
        element: {
            type: Object,
        },
    },
};
</script>

<style scoped lang="scss">
.formula {
    &-gap {
        box-sizing: border-box;
        display: inline-block;
        cursor: text;
        margin: 3px 0;
        padding: 1px;
        height: 26px;
    }

    &-cursor {
        display: block;
        height: 100%;
        width: 1px;
        animation: blink 1s infinite;
        margin: 0 auto;
        cursor: text;
        background-color: transparent;
    }

    &-gap--active &-cursor {
        background-color: $white;
    }

    &-gap--in-var {
        background-color: $input_widget;
    }
}

@keyframes blink {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
