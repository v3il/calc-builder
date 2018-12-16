<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
    html {
        font-size: 90%;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;

        font-family: Roboto,sans-serif;
        line-height: 1.5;
    }

    label {
        display: block;
        margin-bottom: 12px;
    }

    .ui-button + .ui-button {
        margin-left: 12px;
    }
</style>
