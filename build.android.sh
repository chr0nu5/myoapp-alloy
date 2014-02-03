jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/Dropbox/Yannis/Keys/myoapp.keys -signedjar app-notzip.apk build/android/bin/app-unsigned.apk myoapp
rm app.apk
/Library/AndroidSDK/tools/zipalign -v 4 app-notzip.apk app.apk

rm app-notzip.apk