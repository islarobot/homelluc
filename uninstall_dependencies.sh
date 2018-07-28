
apt-get purge nodejs --assume-yes

apt-get purge nodejs nodejs-legacy --assume-yes

apt-get purge gnome-terminal --assume-yes

apt-get purge npm --assume-yes

apt-get purge redis-server --assume-yes

rm /usr/local/bin/arduino

rm /usr/share/arduino

apt-get purge libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential --assume-yes

apt autoremove --assume-yes

rm ~/Escritorio/islarobot