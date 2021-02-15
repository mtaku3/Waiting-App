<template>
    <v-row
        justify="center"
        align="center"
    >
        <v-card :style="{ width: '50vw' }">
            <v-card-title class="justify-center" >ご登録</v-card-title>
            <v-card-text>
                <v-row
                    justify="center"
                    align="center"
                    class="mx-5"
                >
                    <v-row>
                        <v-col>
                            <v-text-field v-model="sei" label="姓(カナ)"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="mei" label="名(カナ)"></v-text-field>
                        </v-col>
                    </v-row>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.stop="register()">登録</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog
            v-model="dialog"
            width="unset"
        >
            <v-card>
                <v-card-title class="justify-center">登録されました</v-card-title>
                <v-card-text>
                    <v-row
                        justify="center"
                        align="center"
                    >
                        <v-col cols="auto">
                            <span>{{ this.sei + ' ' + this.mei }}様。ご登録ありがとうございます。</span>
                            <v-card>
                                <v-card-title class="justify-center">待合番号</v-card-title>
                                <v-card-text class="text-center text-h1">
                                    {{ this.code }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            sei: '',
            mei: '',
            code: ''
        }
    },
    methods: {
        register() {
            const socket = this.$store.state.socket;
            const data = {
                sei: this.sei,
                mei: this.mei
            };
            socket.emit('register', data, (code) => {
                this.code = code;
                data.code = code;
            });
            console.log('registered data: ', data);
            this.dialog = true;
            setTimeout(() => {
                this.sei = '';
                this.mei = '';
                this.code = '';
                this.dialog = false
            }, 5000)
        }
    }
}
</script>