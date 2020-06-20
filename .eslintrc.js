module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Hook kurallarını kontrol eder
    'react-hooks/exhaustive-deps': 'warn', // Efekt bağımlılıklarını kontrol eder
  },
};
