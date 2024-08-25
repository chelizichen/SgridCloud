# Sgrid

## CLUSTER 集群模式

* 服务包上传与同步
  * 前端上传包的地点只有一处,但是需要上传到两个实际的地方进行发布。
  * 可以通过数据库的形式，一次请求两个接口发往两个不同的节点进行发布。这样最简单。
  * 也可以通过后台服务之间的同步进行（缺点是不可控）
* SimpShellServer 服务重构
  * 需要提供节点直连，目前只是单节点。
* SimpExpansionServer 服务重构
  * 原先是针对单节点进行的水平扩容，在集群模式下需要进行多节点多端口扩容。
  * 需要有节点组管理，扩容列表管理。
  * 该服务只涉及扩容与节点组管理。
* SimpCloud 服务重构
  * 针对 多节点-多端口进行界面优化，使得每个节点的状态都可以实时了解。
    * 节点状态每5分钟采集一次，根据SimpExpansionServer提供的当前节点信息进行采集。采集的数据上传至数据库中。
  * 由于请求会打在不同的节点的不同端口上，所以可以进入各个节点进行日志的查看。
  * 提供更多的鉴权方式。
* 提供资源定时上线和下线的方式，通过定时任务和分布式事务来进行对节点资源的管理
  * 涉及到新表 定时表 Cron_Task 和 分布式事务解决方案
  * 分布式事务解决方案由 redis 设置，通过给 Key加过期时间和值来解决一致性问题
    * 加Key成功，则代表加锁成功
    * 加Key失败，且有过期时间，则代表加锁失败。


````go
// 节点
type Node struct {
	Id         int
	Ip         string // IP地址
	Status     string // 状态
	CreateTime string // 创建时间
	PlatForm   string // 平台
	Main       string // 是否为主机
}

// 服务组
type ServantGroup struct {
	Id         int
	TagName    string // 服务标签
	CreateTime string // 创建时间
}

// 服务
type Servant struct {
	Id             string
	ServerName     string // 服务名称
	CreateTime     string // 创建时间
	Language       string // 语言
	ServantGroupId int    // 服务组ID
}

// 服务网格 用于查看所有节点信息
type Grid struct {
	Id         int
	ServantId  int // 网格容纳服务ID
	Port       int // 网格端口
	NodeId     int // 网格所属节点ID
	Status     int // 网格状态
	Pid        int // 网格Pid
	UpdateTime int // 更新时间
}

// 扩容服务
type ExpansionGrid struct {
	Id           int
	ServantId    int    // 服务Id
	Location     string // Nginx Location
	ProxyPass    string // 转发地址
	UpStreamName string // Nginx UpStreamName
}

// 服务包
type ServantPackage struct {
	Id         int
	ServantId  int    // 服务Id
	Hash       string // Hash值
	FilePath   string // 文件路径
	Content    string // 上传内容
	CreateTime string // 创建时间
}
````

## 群组优化

1. 一个用户属于 1到N 个群组
2. 一个群组拥有 0到N 个用户
3. 一个群组 对应 N 个服务组