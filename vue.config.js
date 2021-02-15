module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: [
        'src/socket.io.js'
      ]
    }
  }
}
