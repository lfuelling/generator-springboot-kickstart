#!/bin/sh
#
# Generates keystore
echo entering temp dir...
mkdir temp
cd temp
openssl genrsa -out  dev-key.pem 4096
openssl req -new -key dev-key.pem -out dev.csr
echo entering another temp directory...
mkdir server
cd server
openssl genrsa -aes256 -out server.pem 2048
openssl ca -extensions server_cert -days 375 -notext -md sha256 -in ../dev.csr -out ../../keystore.p12
cd ../../
echo
echo Done! Don\'t forget to adjust /s/m/r/application.properties to the values you chose.