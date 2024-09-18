# 部署指南

参考链接

## [设置docker源]

1. https://blog.csdn.net/weixin_47316183/article/details/131987609
2. https://zhuanlan.zhihu.com/p/670743587
3. https://blog.csdn.net/qq_40709110/article/details/104740600 (有用)

## 设置跨平台编译

https://blog.csdn.net/l00102795/article/details/140183902

## 源码编译

````sh
## build client
cd client

chmod +x ./build.sh

cd ..

## build linux
sudo docker buildx build  --platform linux/amd64  --load -t sgrid-test:latest .

## build macos
docker build  -t sgrid-test:latest .

docker tag sgrid-test:latest chelizichen/sgrid-release:version_os

docker push chelizichen/sgrid-release:version_os
````

## 部署

1. 部署docker https://cloud.tencent.com/developer/article/1701451

2. 下载mysql镜像 https://blog.csdn.net/github_39770867/article/details/141949580
   1. docker pull daocloud.io/library/mysql:8.0.2
   2. docker run -d \
    --name mysql-server \
    --restart unless-stopped \
    -e MYSQL_ROOT_PASSWORD=YOUR_PASSWORD \
    -p 3306:3306 \
    -v /path/to/mysql/data:/var/lib/mysql \
    -v /path/to/mysql/logs:/var/log/mysql \
    daocloud.io/library/mysql:8.0.2
    3. 验证是否安装成功 docker exec -it mysql-server bash (进入交互式界面)
    4. mysql -u root -p YOUR_PASSWORD
3. 下载redis镜像
    1. https://blog.csdn.net/weixin_52156647/article/details/129593177
    2. https://blog.csdn.net/BThinker/article/details/123374236
    3. 最后执行命令：
    4. docker run \
                -d \
                --name redis \
                -p 6379:6379 \
                --restart unless-stopped \
                -v /home/redis/data:/data \
                -v /home/redis/conf/redis.conf:/etc/redis/redis.conf \
                docker.io/library/redis:latest \
                redis-server /etc/redis/redis.conf
4. 下载sgrid-release镜像 【 https://dockerpull.com/ 】
   1. 设置外部目录 mkdir -p  /usr/app/server/SgridPackageServer | 并且在 /usr/app 目录下创建 sgrid.yml文件作为静态配置
   2. 将该路径指定为 docker 发布路径 并且做目录映射 ,参考文章【 https://zhuanlan.zhihu.com/p/671793715 】
   3. docker pull dockerproxy.cn/chelizichen/sgrid-release:0.0.18_x86
   4. sudo docker run \
           -it --entrypoint /bin/sh \
           --net=host \
           -v /usr/app/sgrid.yml:/app/sgrid.yml \
           -v /etc/localtime:/etc/localtime \
           --name sgrid-cloud-server \
           --mount type=bind,source=/usr/app/server/SgridPackageServer,target=/app/server/SgridPackageServer \
           chelizichen/sgrid-release:0.20.1_x86
    5. docker exec -it sgrid-cloud-server /bin/sh
    6. 执行 ./main

5. 一般会启动失败，这是数据库没连接上的原因，需要进入交互界面进行配置
   1. yum install lsof  先配置lsof命令
   2. https://blog.csdn.net/qyfx123456/article/details/134618191 进入容器内部
   3. 使用vi 修改配置文件
   4. 验证网络连通性
   5. 创建数据库 （sgrid）
   6. sudo docker exec -it sgrid-cloud-server /bin/sh
   7. ./main (首次建表)
   8. 然后配置相应参数

sudo systemctl daemon-reload

sudo systemctl restart docker
