#!/bin/bash
sudo mkdir testmakingdir
sudo cp -r /home/ec2-user/deploy/.nuxt/dist /home/ec2-user/dilettante/.nuxt/
cd /home/ec2-user/dilettante
npm install
sudo pm2 delete nuxt
sudo pm2 start strapi --no-automation --name nuxt -- start