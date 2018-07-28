touch ~/Escritorio/islarobot

apt-get update

#read -p "install apache"

apt-get install nodejs nodejs-legacy --assume-yes



apt-get install gnome-terminal --assume-yes

apt-get install npm --assume-yes




rm -r /usr/share/arduino



#wget http://arduino.cc/download.php?f=/arduino-1.8.4-linux64.tar.xz



tar -xJf ../arduino-1.8.4-linux64.tar.xz -C ../



mv ../arduino-1.8.4 /usr/share/arduino



ln -s /usr/share/arduino/arduino /usr/local/bin  

usermod -aG dialout lubuntu

usermod -aG dialout yago

mv usb.rules /etc/udev/rules.d/usb.rules

apt-get install redis-server --assume-yes

apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential --assume-yes

