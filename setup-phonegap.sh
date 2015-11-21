rm -fr pg-tinktime
cordova create pg-tinktime "com.tinktime.app" "Tinktime"

cd pg-tinktime

cordova plugin add phonegap-plugin-push
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-console
cordova plugin add https://github.com/apache/cordova-plugin-contacts.git
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-file-transfer
cordova plugin add com.rjfun.cordova.sms
cordova plugin add cordova-plugin-filepath
cordova plugin add cordova-plugin-google-analytics

cordova platform add ios
cordova prepare ios

cordova platform add android
cordova prepare android
