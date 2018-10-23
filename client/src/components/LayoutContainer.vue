<template>

    <v-flex v-bind="{ [`xs6`]: true }">

        <v-card>
            <v-toolbar color="blue-grey darken-4" dense dark>
                <v-btn icon class="js-drag-icon">
                    <v-icon>drag_indicator</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>format_indent_decrease</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>format_indent_increase</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>wrap_text</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>format_align_left</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>format_align_center</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>format_align_right</v-icon>
                </v-btn>

                <!--<v-spacer></v-spacer>-->

                <!--<v-btn icon>-->
                    <!--<v-icon>settings</v-icon>-->
                <!--</v-btn>-->

                <!--<v-btn icon>-->
                    <!--<v-icon>delete</v-icon>-->
                <!--</v-btn>-->
            </v-toolbar>

            <v-container fill-height fluid pa-2>
                <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                        <span class="headline white--text1" v-text="card.title"></span>

                        {{containerData.id}}
                    </v-flex>
                </v-layout>
            </v-container>


            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>settings</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
    <!--</v-layout>-->
    <!--</v-container>-->
    <!--</v-card>-->

        <!--<v-card class="blue-grey darken-2">-->
            <!--<v-container fluid pa-2>-->
                <!--<v-layout >-->
                    <!--<v-flex xs12 align-end flexbox>-->
                        <!--&lt;!&ndash;<div class="layout-container" :style="{width: containerData.width * 100 + '%'}" :class="{&ndash;&gt;-->
                            <!--&lt;!&ndash;'non-float': !containerData.float,&ndash;&gt;-->
                            <!--&lt;!&ndash;'pulled-right': containerData.pullToRight,&ndash;&gt;-->
                        <!--&lt;!&ndash;}">&ndash;&gt;-->

                                <!--<button @click="remove">Remove</button>-->
                                <!--<button @click="float">Float</button>-->
                                <!--<button @click="right">Right</button>-->

                                <!--<button @click="resize(-1)">-</button>-->
                                <!--<button @click="resize(1)">+</button>-->
                                <!--<br>-->
                                <!--{{containerData}}-->

                                <!--<br>-->
                                <!--<br>-->



                                <!--<Draggable v-model="containerData.fields" class="drag" @add="onAdd" :options="{-->
                                    <!--group: 'items',-->
                                <!--}">-->
                                    <!--<template v-for="field in containerData.fields">-->
                                        <!--<component-->
                                                <!--@optionsUpdate="mergeOptions(field, $event)"-->
                                                <!--:key="field.id"-->
                                                <!--:is="field.type"-->
                                                <!--:options="field.params"-->
                                        <!--&gt;</component>-->
                                    <!--</template>-->
                                <!--</Draggable>-->
                         <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--</v-flex>-->
                <!--</v-layout>-->
            <!--</v-container>-->

            <!--<v-card-actions>-->
                <!--<v-spacer></v-spacer>-->
                <!--<v-btn icon>-->
                    <!--<v-icon>favorite</v-icon>-->
                <!--</v-btn>-->
                <!--<v-btn icon>-->
                    <!--<v-icon>bookmark</v-icon>-->
                <!--</v-btn>-->
                <!--<v-btn icon>-->
                    <!--<v-icon>share</v-icon>-->
                <!--</v-btn>-->
            <!--</v-card-actions>-->
        <!--</v-card>-->
    <!--</v-flex>-->

</template>

<script>
    import Draggable from 'vuedraggable';

    import ButtonField from './fields/ButtonField.vue';
    import TextField from './fields/TextField.vue';

    import getNextId from '../utils/getNextId';

    const sizes = [0.33, 0.5, 0.66, 1];

    export default {
        name: 'LayoutContainer',

        props: {
            container: Object,
        },

        components: {
            Draggable,
            ButtonField,
            TextField,
        },

        data() {
            return {
                containerData: this.container,

                items2: [
                    { header: 'Today' },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        title: 'Brunch this weekend?',
                        subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                        subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        title: 'Oui oui',
                        subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
                    }
                ],

                card:
                    { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
                    // { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
                    // { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }

            };
        },

        methods: {
            remove() {
                this.$emit('removeContainer', this.container);
            },

            resize(direction) {
                const currentIndex = sizes.indexOf(this.containerData.width);
                this.containerData.width = sizes[currentIndex + direction];
            },

            float() {
                this.containerData.float = !this.containerData.float;

                if (this.containerData.float) {
                    this.containerData.align = 'left';
                }
            },

            right() {
                if (!this.containerData.float) {
                    this.containerData.pullToRight = !this.containerData.pullToRight;
                } else {
                    this.containerData.pullToRight = false;
                }
            },

            onAdd(event) {
                const itemElement = event.item;
                const fieldIndex = event.newIndex;

                this.containerData.fields.splice(fieldIndex, 0, {
                    id: getNextId(this.containerData.fields),
                    type: itemElement.children[0].dataset.item,
                    params: {},
                });

                itemElement.remove();
            },

            mergeOptions(field, newOptions) {
                field.params = newOptions;
            }
        },
    }
</script>

<style scoped lang="scss">
    .layout-container {
        display: inline-block;
        border: 1px solid gray;
        padding: 12px 24px;
        vertical-align: top;
        background-color: #424242;

        &.non-float {
            display: block;
        }

        &.pulled-right {
            margin-left: auto;
        }
    }

    .resize {
        width: 100px;
        height: 50px;
        background: black;
    }

    .drag {
        width: 100px;
        height: 100px;
        border: 1px dashed royalblue;
    }
</style>