#!/usr/bin/env bash
#
#
#
name=blog
mvn compile && 
mvn package -Dmaven.test.skip=true && 
cp target/${name}.war ${TOMCAT_HOME}/webapps/ && 
google-chrome http://localhost:8080/${name}/
