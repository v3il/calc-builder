<template>
    <div>
        <v-navigation-drawer v-model="drawer" clipped fixed app>
            <v-list>
                <Draggable :options="{
                    group: {name: 'items', pull: 'clone', put: false,},
                    sort: false,
                }">
                    <v-list-tile v-for="item in items" :key="item.id" :data-item="item.type" class="js-item">
                        <v-list-tile-action>
                            <v-icon>dashboard</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.text}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </Draggable>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar color="blue-grey darken-4" dark app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-toolbar>

        <v-content>
            <div class="page-content">
                <v-tabs fixed-tabs class="page-tabs">
                    <v-tab :to="{name: 'constructor'}">
                        Constructor
                    </v-tab>

                    <v-tab :to="{name: 'formula'}">
                        Formula
                    </v-tab>
                </v-tabs>

                <router-view></router-view>
            </div>
        </v-content>

        <!--<v-footer app fixed>-->
            <!--<span>&copy; 2017</span>-->
        <!--</v-footer>-->
    </div>
</template>

<script>
    import Draggable from 'vuedraggable';

    export default {
        name: 'MainPage',

        data() {
            return {
                items: [
                    {
                        id: 0,
                        type: 'ButtonField',
                        text: 'Button',
                    },
                    {
                        id: 1,
                        type: 'TextField',
                        text: 'Text',
                    }
                ],

                drawer: true
            }
        },

        components: {
            Draggable,
        },

        props: {
            source: String
        },
    };
</script>

<style lang="scss">
    .page-content {
        padding: 12px 24px;
    }

    .page-tabs {
        margin-bottom: 24px;
    }
</style>
