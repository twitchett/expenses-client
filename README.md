# Expenses Tracker Client

The simplest ever app to capture data and send it to the Expenses Tracker server. Built in react native.

To develop locally (on linux):

1. get local IP using `hostname -I | awk '{print $NF}'`
2. tell the packager to use the IP: `export REACT_NATIVE_PACKAGER_HOSTNAME='ip'`
3. run `npm start`
