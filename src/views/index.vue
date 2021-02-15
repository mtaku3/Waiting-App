<template>
    <v-row
        justify="center"
        align="center"
    >
        <v-card :style="{ width: '400px' }">
            <v-card-title class="justify-center">メインメニュー</v-card-title>
            <v-card-text>
                <v-row
                    justify="center"
                    align="center"
                >
                    <v-btn class="mx-2" color="yellow" to="/all">マスター</v-btn>
                    <v-btn class="mx-2" color="green" to="/register">クライアント</v-btn>
                </v-row>
            </v-card-text>
        </v-card>
    </v-row>
</template>

<style lang="scss">
</style>

<script>
export default {
};
</script>
