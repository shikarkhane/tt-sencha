rm -fr pg-tinktime
cordova create pg-tinktime "com.tinktime.app" "Tinktime"

cd pg-tinktime

cordova platform add ios
cordova prepare ios

cordova platform add android
cordova platform update android@5.0.0
cordova prepare android

cordova plugin add phonegap-plugin-push
cordova plugin add https://github.com/apache/cordova-plugin-camera.git
cordova plugin add cordova-plugin-console
cordova plugin add cordova-plugin-contacts-phonenumbers
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-file-transfer
cordova plugin add cordova-plugin-sms
cordova plugin add https://github.com/cordova-sms/cordova-sms-plugin.git
cordova plugin add cordova-plugin-filepath
cordova plugin add cordova-plugin-google-analytics
cordova plugin add cordova-plugin-network-information
