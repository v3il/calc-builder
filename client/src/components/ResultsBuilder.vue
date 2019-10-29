<template>
    <div class="results-builder">
        <aside class="results-builder__sidebar">

        </aside>

        <main class="results-builder__content">

        </main>
    </div>
</template>

<script>
    export default {
        name: "ResultsBuilder"
    }
</script>

<style scoped lang="scss">
    .results-builder {
        display: flex;
        height: 100%;

        // Sidebar
        &__sidebar {
            width: 450px;
            padding: 12px 24px;
            background-color: #fff;
            border-right: 1px solid rgba(0, 0, 0, 0.12);
            overflow-x: hidden;
        }

        // Content
        &__content {

        }
    }
</style>