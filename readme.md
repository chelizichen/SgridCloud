<h2 align="center" style="display:flex;align-items:center;justify-content:center;">
    <img src="http://150.158.120.244/sgirdcloud/web/icon.png" style="width:35px;height:35px;" />
    <div>SgridCloud</div>
</h2>

<h5 align="center">
SgridCloud是一套运维监控系统，囊括了从开发到生产整个流程的运维操作，并且做到对系统侵入程度小于5%
</h5>

## 使用的技术栈

1. 前端：Vue3 + TypeScript + Vite
2. 缓存中间件：Redis
3. 验证中间件：JWT
4. 后台系统: Golang + Gin + Grpc
5. 扩容系统: Nodejs16 + Express + TypeScript
6. 数据库：Mysql8

## 已验证过的系统

1. MacOS
2. Centos7
3. Ali Centos

PS: Windows理论上也支持，但未测试

## 已支持的语言

1. NodeJS 14+
2. SpringBoot 2+
3. Golang

PS：对于NodeJs+TypeScript服务，建议将 tsconfig.json 的 target 设置为 es6 以上，否则会出现兼容性问题

## 支持的功能

1. 多语言服务部署
2. 远程配置中心
3. 日志监控与查询
4. 多节点组管理
5. 多服务组管理
6. 服务版本控制
7. 服务健康检查
8. 系统信息统计
9. Web化网关配置

## 框架部署

1. 进入Sgrid目录下，运行 prod.sh 脚本，打包成 Sgrid.tar.gz 压缩文件
2. 在 linux 服务器下 /usr/ 目录下创建 app 目录 (mkdir app),将压缩文件移动到服务器中
3. 解压 (tar -xvzf ./Sgrid.tar.gz)
4. 配置文件修改 /usr/app/sgrid.yml 文件, 配置对应的 host ， mysql ， redis 等
5. 创建目录 /usr/app/server/SgridPackageServer
6. 首次运行 /usr/app/sgrid_app，会报错链接不到 grpc， 但是会创建数据库
7. 去 mysql 数据库 grid_properties 里面手动添加对应的grpc链接数据
   1. key : SgridPackageServerHosts value: server.SgridPackageServer@grpc -h 127.0.0.1 -p 14938
   2. key : SgridLogTraceServerHosts value: server.SgridLogTraceServer@grpc -h 127.0.0.1 -p 15887
   3. // TODO RBAC 基础数据
8. 再次运行 /usr/app/sgrid_app，启动成功

## docker部署

### build

````sh
## build client
cd client

chmod +x ./build.sh

cd ..
## build docker-image
sudo docker buildx build  --platform linux/amd64  --load -t sgrid-test:latest .
## build macos
docker build  -t sgrid-test:latest .

docker tag sgrid-test:latest chelizichen/sgrid-release:version_os

docker push chelizichen/sgrid-release:version_os
````

### run

````sh
# linux
docker run  \
           --net=host \
           --name sgrid-container \
           --add-host=host.docker.internal:host-gateway \
           sgrid-test:latest

# macos (集中暴露100个端口供开发使用)
sudo docker run \
           -it --entrypoint /bin/sh \
           --net=host \
           -v /Users/leemulus/Desktop/SgridCloud/Sgrid/sgrid.yml:/app/sgrid.yml \
           --name sgrid-cloud-server \
           --mount type=bind,source=/Users/leemulus/Desktop/SgridCloud/Sgrid/server/SgridPackageServer,target=/app/server/SgridPackageServer \
           chelizichen/sgrid-release:0.20.1_x86

# test
docker run  \
           --net=host \
           --name sgrid-container \
           sgrid-test:latest

````

### TIPS

1. macos 本地启动时 sgrid.yml 里面的 host要进行对应的修改[参考链接](https://www.cnblogs.com/forlive/p/15989409.html#:~:text=%E5%9C%A8%E5%90%AF%E5%8A%A8docker%E6%97%B6%EF%BC%8C%E5%8A%A0%E5%85%A5%E5%A6%82%E4%B8%8B%E8%AF%AD%E5%8F%A5%20--add-host%3Dhost.docker.internal%3Ahost-gateway%20%E8%80%8C%E5%9C%A8container%E5%86%85%EF%BC%8C%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E8%AF%B7%E6%B1%82host.docker.internal%3APORT%EF%BC%8C%E6%9D%A5%E8%8E%B7%E5%8F%96%E5%AE%BF%E4%B8%BB%E6%9C%BA%E4%B8%8A%E6%8F%90%E4%BE%9B%E7%9A%84%E5%90%84%E7%A7%8D%E6%9C%8D%E5%8A%A1%20%E5%A6%82%E6%9E%9C%E4%BD%BF%E7%94%A8%E4%BA%86Docker%20Compose%EF%BC%8C%E5%88%99%E5%BA%94%E8%AF%A5%E5%B0%86%E4%B8%8B%E9%9D%A2%E7%9A%84%E5%8F%A5%E5%AD%90%E5%8A%A0%E5%85%A5container%E7%9A%84%E5%A3%B0%E6%98%8E%E4%B8%AD%EF%BC%9A%20extra_hosts%3A,-%20%22host.docker.internal%3Ahost-gateway%22%20Mac%E5%92%8CWindows%3A%20Docker%E7%89%88%E6%9C%AC%E9%AB%98%E4%BA%8Ev18.03%20%282018%E5%B9%B43%E6%9C%8821%E6%97%A5%E6%9B%B4%E6%96%B0%EF%BC%89%20%E7%9B%B4%E6%8E%A5%E5%9C%A8container%E5%86%85%E4%BD%BF%E7%94%A8host.docker.internal%3APORT%E6%9D%A5%E8%AE%BF%E9%97%AE%E5%AE%BF%E4%B8%BB%E6%9C%BA%E6%9C%8D%E5%8A%A1%E5%8D%B3%E5%8F%AF)

## 优化性能提示

1. 为 grid_stat_log 添加 (grid_id, create_time) 的索引，避免全扫描
2. 定时清理业务服务日志数据，为业务服务日志添加索引，避免全扫描

## 业务服务部署

1. 添加服务组，服务组的名称，英文名称，方便做管理
2. 添加服务，包括服务名称，选择服务组，选择服务类型、执行路径等
3. 为服务添加节点
4. 选择节点，发布服务

注：

1. 选择服务类型时，相当于只是选择服务的 执行命令模版，当然可以使用自定义命令的方式
2. 节点组添加完之后可以通过 nginx 配置端口后进行访问

## 更新计划

2024-07-29 : 添加 服务组、用户小组、用户之间的对应关系，涉及用户对服务组的查询接口的改造

2024-09-07 : 计划添加 自定义命令行、完善周边扩展库 比如：

1. 使用自定义命令行 启动代码，该项措施可以使静态资源的部署的能力得到更进一步的提升
2. 使得原本 jar、node、exe 的方式 可以得到进一步的扩展

2024-09-08 ：扩展 sgrid-cli 启动静态资源托管服务的方式

2024-12-28 ：优化框架性能、改造PackageServer部分旧代码

## 维护者

<table>
    <tbody>
        <tr>
            <td>
                <a target="_blank" href="https://github.com/chelizichen"><img width="60px" src="https://avatars.githubusercontent.com/u/86051766?v=4"></a>
            </td>
        </tr>
    </tbody>
</table>
