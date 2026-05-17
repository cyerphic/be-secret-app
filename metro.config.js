const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 允许打包器识别 .bak 和 .bin 等想要的后缀
config.resolver.assetExts.push('bak', 'bin', 'dat');

module.exports = config;