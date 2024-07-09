# sgrid-cli

该CLI能够解决绝大多数的打包问题，不过一些特定化的需求还得手动写 shell 脚本

## VITE

将 Vite 服务快速打包成 支持在SgridCloud上部署的服务

打包命令：

-s ServerName   | default : sgridWebServer
-d dist         | default : /dist
-p getPath      | default : /web
-b build        | default : npm run build

````json
    "release":"sgrid release:vite -s ESBigScreenServer -d dist  -p /es-big-screen"
````

## SpringBoot

RUN SPRINGBOOT

````sh
sgrid run:springboot
````

RELEASE SPRINGBOOT

打包命令：
-s ServerName   | default : SgridJavaServer

````sh
sgrid release:springboot -s TestSgridJavaServer
````
