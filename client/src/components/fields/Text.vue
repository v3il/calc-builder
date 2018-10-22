<template>
    <div>
        <input type="text" v-model="text">
    </div>
</template>

<script>
    export default {
        name: "Text1",

        data() {
            return {
                text: '',
            }
        },

        methods: {
            getData() {
                return {
                    data: this.text,
                }
            }
        }
    }
</script>

<style scoped>

</style>