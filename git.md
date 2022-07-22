###关于项目git提交记录规范
####header
> type：用户说明commit类型

| type | 说明 |
|:---|:---|
|feat|新功能|
|fix|修补bug|
|ui|页面ui修改|
|docs|文档|
|style|格式（不影响代码运行的变动）|
|refactor|重构（既不是新增功能，也不是修改bug的代码变动）|
|perf|性能优化|
|test|增加测试|
|chore|构建过程或辅助工具的变动|
|revert|回滚到上一个版本|

注：revert比较特殊，如果当前commit用于撤销以前的commit，则必须以revert:开头，后面跟着被撤销commit的Header

scope：可以省略，用于说明commit的影响范围，比如数据层、控制层、视图层等

subject：是commit的简短描述，不超过50个字符

####Body

>是commit的详细描述，可省略
