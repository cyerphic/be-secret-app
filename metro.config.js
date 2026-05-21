const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 允许打包器识别 .bak 和 .bin 等想要的后缀
config.resolver.assetExts.push('bak', 'bin', 'dat');

// 打包器忽略 lib, modules 文件夹, 指定文件
//config.resolver.blocklist = [/(lib|modules)\/.*/];
//config.resolver.blocklist = [/(Decrypt|Encrypt)\.tsx$/];

module.exports = config;