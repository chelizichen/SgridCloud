-- 创建用户

INSERT INTO sgrid.grid_user
(id, user_name, password, create_time, turth_name, last_login_time, user_group_id)
VALUES(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', NULL, '超管', NULL, NULL);

-- 创建grpc链接 host 需要修改成对应的ip

INSERT INTO sgrid.grid_properties
(id, `key`, value, create_time)
VALUES(1, 'SgridPackageServerHosts', 'server.SgridPackageServer@grpc -h 124.220.19.199 -p 14938', NULL);
INSERT INTO sgrid.grid_properties
(id, `key`, value, create_time)
VALUES(3, 'SgridLogTraceServerHosts', 'server.SgridLogTraceServerHosts@grpc -h 124.220.19.199 -p 15887', NULL);

-- 创建角色

INSERT INTO sgrid.grid_user_role
(id, name, description, create_time)
VALUES(1, '超级管理员', '后台管理，系统管理，菜单管理，网关管理，其他管理', NULL);
INSERT INTO sgrid.grid_user_role
(id, name, description, create_time)
VALUES(4, '普通用户', 'C端用户，面向学生，个人开发者提供FASS,PASS服务', '2024-06-02 10:37:17.445');

-- 创建用户-角色映射

INSERT INTO sgrid.grid_user_to_role
(user_id, role_id)
VALUES(1, 1);

-- 创建团队
INSERT INTO sgrid.grid_user_group
(id, name, description, create_user_id, status, create_time)
VALUES(1, '中控团队', '控制中心团队', 0, 0, '2024-08-26 04:30:27.428');

-- 创建菜单

INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(7, '系统管理', 'system', 'system', '', 0);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(8, '用户管理', 'user', 'user', 'devops/system/user_admin', 7);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(10, '角色管理', 'role', 'role', 'devops/system/role_admin', 7);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(11, '菜单管理', 'menu', 'menu', 'devops/system/menu_admin', 7);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(12, '服务管理', 'servant', 'servant', '', 0);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(13, '添加服务组', 'add_group', 'add_group', 'devops/add_group', 12);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(14, '添加服务', 'add_servant', 'add_servant', 'devops/add_servant', 12);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(15, '服务列表', 'servant_admin', 'servant_admin', 'devops/servant_list', 12);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(16, '节点管理', 'grid', 'grid', '', 0);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(17, '添加节点', 'add_node', 'add_node', 'devops/add_node', 16);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(18, '网关管理', 'gateway', 'gateway', '', 0);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(19, '网关配置', 'admin', 'admin', 'devops/gateway_conf', 18);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(20, '属性管理', 'property', 'property', '', 0);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(21, '属性设置', 'set', 'set', 'devops/property_admin', 20);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(22, '更新清单', 'framework_update_list', 'framework_update_list', '', 0);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(23, '更新计划', 'line', 'line', 'devops/version_update_list', 22);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(24, '服务组管理', 'group_admin', 'group_admin', 'devops/group_admin', 12);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(25, '添加计划', 'add_update_plan', 'add_update_plan', 'devops/add_update_plan', 22);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(26, '资源管理', 'assets_admin', 'assets_admin', 'devops/assets_admin', 16);
INSERT INTO sgrid.grid_role_menu
(id, title, `path`, name, component, parent_id)
VALUES(27, '团队管理', 'user_group', 'user_group', 'devops/system/group_admin', 7);


-- 创建角色2菜单

INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(0, 12);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(0, 13);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(0, 14);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(0, 15);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(0, 24);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(4, 12);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(4, 13);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(4, 14);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(4, 15);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(4, 24);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(4, 22);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(4, 23);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(4, 25);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 7);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 8);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 10);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 11);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 27);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 12);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 13);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 14);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 15);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 24);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 16);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 17);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 26);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 18);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 19);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 20);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 21);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 22);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 23);
INSERT INTO sgrid.grid_role_to_menu
(role_id, menu_id)
VALUES(1, 25);