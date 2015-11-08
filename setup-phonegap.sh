mv pg-tinktime pg-tinktime-old
rm -fr pg-tinktime
cordova create pg-tinktime "com.tinktime.app" "Tinktime"

cd pg-tinktime

cordova plugin add phonegap-plugin-push
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-console
cordova plugin add cordova-plugin-contacts
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-file-transfer
cordova plugin add cordova-sms-plugin
cordova plugin add cordova-plugin-filepath

cordova platform add ios
cordova prepare ios
