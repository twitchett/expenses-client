# Expenses Tracker Client

The simplest ever app to capture data and send it to the Expenses Tracker server. Built in react native. Android only.

To develop locally (on linux):
<!-- 
1. get local IP using `hostname -I | awk '{print $NF}'`
2. tell the packager to use the IP: `export REACT_NATIVE_PACKAGER_HOSTNAME='ip'`
3. run `npm start` -->

1. Run `react-native start`

Verify the packager is running and the bundle is available by visiting: http://localhost:8081/index.bundle?platform=android&dev=true

2. Connect phone via USB in developer mode.
3. Run `react-native run-android`


Ensure: adb reverse tcp:8081 tcp:8081