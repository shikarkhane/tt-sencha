rm -fr pg-tinktime
cordova create pg-tinktime "com.tinktime.app" "Tinktime"

cd pg-tinktime

cordova platform add ios@4.1.0
cordova prepare ios

cordova platform add android
cordova prepare android


cordova plugin add phonegap-plugin-push --variable SENDER_ID="196429376160"   
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-console
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-file-transfer
cordova plugin add cordova-plugin-sms
cordova plugin add https://github.com/cordova-sms/cordova-sms-plugin.git
cordova plugin add cordova-plugin-filepath
cordova plugin add cordova-plugin-google-analytics
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-x-socialsharing
cordova plugin add cordova-plugin-splashscreen
cordova plugin add https://github.com/dbaq/cordova-plugin-contacts-phone-numbers.git
