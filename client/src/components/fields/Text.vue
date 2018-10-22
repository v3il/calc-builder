<template>
    <div>
        <input type="text" v-model="params.text">
    </div>
</template>

<script>
    const defaultOptions = {
        text: '',
        borderColor: 'red'
    };

    export default {
        name: "Text1",

        data() {
            return {
                params: Object.assign({}, defaultOptions, this.options),
            }
        },

        props: {
            options: Object,
        },

        beforeMount() {
            // console.log(1)
            // console.log(this.data)
            // console.log(this.$data)
        },

        created() {
            // this.options = this.params

            this.$emit('optionsUpdate', this.params);

            // for(let key in this.options) {
            //     this[key] = this.options[key];
            // }

            // console.log(2)
            // console.log(this.data)
            // console.log(this.$data)
            // console.log(this.options)
        },

        methods: {
            getData() {
                return this.params
            }
        }
    }
</script>

<style scoped>

</style>