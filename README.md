# Aplicaciones-web-III

*Actualizaciòn de node*
Para actualizar Node en Linux Ubuntu para WSL

+ Revisamos la versión de npm
```basch
    npm --version
```
+ Instalamos la ultima versión de npm
```basch
    sudo npm install -g npm@latest
```
+ Comprobamos la nueva versión
```basch
    npm --version
```
+ limpiamos la caché
```basch
    sudo npm cache clean -f
```
+ Actualizamos Node
```basch
    sudo npm install -g n
    sudo n stable
```