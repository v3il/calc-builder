<template>
    <div>
        123

        {{fieldData}}

        <br>
        <br>

        {{fieldData.params.selectOptions}}

        <SelectOptionsManager :selectOptions="fieldData.params.selectOptions"></SelectOptionsManager>

        <TextField @valueChanged="fieldData.params.label = $event" :value="fieldData.params.label"></TextField>
    </div>
</template>

<script>
    import SelectOptionsManager from '../../field_properties_editors/SelectOptionsManager';
    import TextField from '../../field_properties_editors/TextField';

    export default {
        name: "SelectSettingsComponent",

        components: {
            SelectOptionsManager,
            TextField,
        },

        props: {
            fieldData: Object,
        }
    }
</script>

<style scoped>

</style>