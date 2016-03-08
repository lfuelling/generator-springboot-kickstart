#!/bin/sh
#
# Generates a keystore containing one self-signed certificate named "development".
# 
# Author: Lukas Fülling <lerk@lerk.io>
# 
echo entering temp dir...
mkdir temp
cd temp
openssl genrsa -out dev-key.pem 4096
openssl req -new -key dev-key.pem -out dev.csr
openssl x509 -req -days 365 -in dev.csr -signkey dev-key.pem -out dev.crt
cat dev-key.pem dev.crt > dev-boundled.pem
openssl pkcs12 -export -in dev-boundled.pem -out ../development.pkcs12 -name "development"
cd ../
rm -rf temp
echo
echo Done! Don\'t forget to adjust /s/m/r/application.properties to the values you chose.
echo 
echo The name of the key is: development
