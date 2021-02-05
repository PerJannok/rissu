# rissu

## To setup new Amplify project
Amplify configure

see https://github.com/aws-amplify/amplify-cli/issues/5513#issuecomment-771665979


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### check bundle size
npm run build-report
open report.html
(added config size in vue.config.js, to increase limit, work-around for bundle size warnings)

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


npx cap copy

### Android
npx cap open android
(in Android Studio) Build->Build Bundle / APK->Build APK
transfer apk file from .\android\app\build\outputs\apk\debug\

see https://dev.to/simerca/mobile-ios-android-app-with-vuejs-in-5-minutes-really-52n5vu

amplify push

amplify publish
