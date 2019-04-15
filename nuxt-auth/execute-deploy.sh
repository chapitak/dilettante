#!/bin/bash
mkdir testmakingdir
cp /home/ec2-user/deploy/.nuxt/dist /home/ec2-user/dilettante/.nuxt/dist
cd ../dilettante 
npm install
