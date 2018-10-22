<template>
    <div>
        <v-navigation-drawer v-model="drawer" clipped fixed app>
            <v-list dense>
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

        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-toolbar>

        <v-content>
            <router-link :to="{name: 'constructor'}">Constructor</router-link>
            <router-link :to="{name: 'formula'}">Formula</router-link>

            <router-view></router-view>
        </v-content>

        <v-footer app fixed>
            <span>&copy; 2017</span>
        </v-footer>
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
                        type: 'Button',
                        text: 'Button',
                    },
                    {
                        id: 1,
                        type: 'Text1',
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
