<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;

        font-family: Roboto,sans-serif;
        line-height: 1.5;
    }

    .btn {
        border: none;
        color: white;
        display: block;
        padding: 6px 12px;
        cursor: pointer;
        border-radius: 6px;

        &:hover {
            opacity: 0.8;
        }

        &.btn--primary {
            background: royalblue;
        }

        &.btn--error {
            background: #ff444d;
        }

        & + .btn {
            margin-left: 12px;
        }

        &.save-button {
            margin-left: auto;
        }
    }
</style>
