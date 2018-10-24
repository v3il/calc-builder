<template>

    <div class="text-xs-center">
        <v-menu
                :close-on-content-click="false"
                :nudge-bottom="12"
                offset-y
                bottom

        >
            <v-btn small icon @click="" slot="activator">
                <v-icon>control_camera</v-icon>
            </v-btn>

            <v-card>
                <v-list color="blue-grey darken-4" text-color="white" dark>
                    <v-list-tile dark color="blue-grey darken-4">
                        <v-list-tile-content>
                            <v-list-tile-title>Размеры и положение</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                    <v-list-tile dark color="blue-grey darken-4">
                        <v-list-tile-action>
                            <v-switch  color="purple"></v-switch>
                        </v-list-tile-action>
                        <v-list-tile-title>Enable messages</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile dark color="blue-grey darken-4">
                        <v-list-tile-action>
                            <v-switch  color="purple"></v-switch>
                        </v-list-tile-action>
                        <v-list-tile-title>Enable hints</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
    export default {
        name: "FieldSizeAndPositionSelector"
    }
</script>

<style scoped>

</style>