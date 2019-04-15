#!/bin/bash
sudo mkdir testmakingdir
sudo cp -r /home/ec2-user/deploy/.nuxt/dist /home/ec2-user/dilettante/.nuxt/
cd /home/ec2-user/dilettante
npm install
pm2 restart nuxt