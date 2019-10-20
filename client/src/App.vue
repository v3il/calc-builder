<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
    @import "common-styles/button";
    @import "common-styles/select";
    @import "common-styles/checkbox";
    @import "common-styles/textarea";
    @import "common-styles/text-input";

    html {
        font-size: 15px;
        font-family: 'Roboto', sans-serif;
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
