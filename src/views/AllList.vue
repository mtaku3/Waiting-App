<template>
    <v-row
        justify="center"
        align="center"
    >
        <v-card :style="{ width: '80vw' }">
            <v-card-title class="justify-center">待機中</v-card-title>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    番号
                                </th>
                                <th class="text-left">
                                    お名前
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="item in list"
                                :key="item.code"
                            >
                                <td>{{ item.code }}</td>
                                <td>{{ item.sei + ' ' + item.mei }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.stop="call()">呼び出し</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog
            v-model="dialog"
            width="unset"
        >
            <v-card>
                <v-card-title class="justify-center">呼び出し</v-card-title>
                <v-card-text>
                    <v-row
                        justify="center"
                        align="center"
                    >
                        <v-col cols="auto">
                            <span>{{ this.data.sei + ' ' + this.data.mei }}様。お進みください。</span>
                            <v-card>
                                <v-card-title class="justify-center">待合番号</v-card-title>
                                <v-card-text class="text-center text-h1">
                                    {{ this.data.code }}
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
const SECRET = "ABC";
export default {
    data() {
        return {
            dialog: false,
            data: {},
            list: []
        }
    },
    created() {
        const socket = this.$store.state.socket;

        socket.emit('master', SECRET, (res) => {
            if (res === true) {
                console.log('successfully registered as master socket: ' + socket.id);
                socket.emit('/', (list) => {
                    this.list = list;
                    console.log('list initialized: ' + list);
                });

                socket.on('register', (data) => {
                    this.list.push(data);
                    console.log('list pushed: ' + data)
                });
            }
            else
                console.log('failed to be registered as master socket: ' + socket.id);
        });
    },
    methods: {
        call() {
            const socket = this.$store.state.socket;

            if (this.list.length < 1) return;
            this.data = this.list[0];
            socket.emit('call', this.data.code, (res) => {
                if (res === true) {
                    this.list = this.list.filter(x => x !== this.data);
                    this.dialog = true;
                    setTimeout(() => {
                        this.dialog = false;
                        this.data = {};
                    }, 10000)
                }
            });
        }
    }
};
</script>