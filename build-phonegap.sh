cd pg-tinktime
rm -fr www
ln -s ../build/testing/ttapp www
cordova prepare ios -d
