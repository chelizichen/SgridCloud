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

## 业务服务部署

TODO

## 更新计划

2024-07-29 : 添加 服务组、用户小组、用户之间的对应关系，涉及用户对服务组的查询接口的改造

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
