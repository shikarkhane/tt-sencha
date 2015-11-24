sencha app build production

cp -r build/production/ttapp/* pg-tinktime/www/

cd pg-tinktime
cordova prepare ios -d
cordova prepare android -d
