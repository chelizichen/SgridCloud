# Sgrid-Vite-Plugin

将 Vite 服务快速打包成 支持在SgridCloud上部署的服务

打包命令：

-s ServerName   | default : sgridWebServer
-d dist         | default : /dist
-p getPath      | default : /web
-b build        | default : npm run build

````json
    "release":"sgrid release:vite -s ESBigScreenServer -d dist  -p /es-big-screen"
````
