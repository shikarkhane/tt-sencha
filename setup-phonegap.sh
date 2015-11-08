mv pg-tinktime pg-tinktime-old
rm -fr pg-tinktime
cordova create pg-tinktime "com.tinktime.app" "Tinktime"

cd pg-tinktime

cordova plugin add https://github.com/cordova-sms/cordova-sms-plugin
cordova plugin add https://github.com/hiddentao/cordova-plugin-filepath
cordova plugin add https://github.com/phonegap/phonegap-plugin-push

cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-console
cordova plugin add cordova-plugin-contacts
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-file-transfer
cordova plugin add cordova-plugin-sms

cordova platform add ios

rm -fr www
rm -fr platforms/ios/www

ln -s ../build/testing/ttapp www
cordova prepare ios
