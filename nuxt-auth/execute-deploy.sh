#!/bin/bash
#sudo mkdir testmakingdir
sudo cp -r /home/ec2-user/deploy/* /home/ec2-user/dilettante/
cd /home/ec2-user/dilettante
npm install

sudo su - ec2-user -c "cd dilettante; pm2 delete nuxt; pm2 start npm --name \"nuxt\" -- start "
# pm2 delete nuxt
# pm2 start 


#  sudo cp -r /home/ec2-user/deploy/* /home/ec2-user/dilettante/