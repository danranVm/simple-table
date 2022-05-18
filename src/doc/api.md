### 表格 - 数据加载: loadData
重置表格内部原始数据

### 表格 - 过滤数据: onFilter

提供给外部,支持外部传入过滤函数对表格数据进行过滤

### 表格 - 获取表格原始数据: getAllData

提供给外部提取整体数据进行自定义操作

### 表格 - 获取表格当前页数据：getCurrPageData

提供给外部提取当页数据进行自定义操作

### 表格 - 内部排序函数： _onSort(key, direction, sortAble)
key: 表格列数据的key,
direction: 排序方向 'DEC' | 'ASC' | '',
sortAble: 当前列是否开启排序功能，需要在配置colunms列表时对元素配置sort:字段。

### 分页器 - 获取数据： getData: () => ({start, end})
获取表格当前页的start,end用于给外部数据进行过滤。

### 分页器 - 重置第一页：resetIndex
分页器重置回第一页

### 分页器 - 内部 - 向前翻页： _prevPage
向前翻页

### 分页器 - 内部 - 向后翻页： _nextPage
向后翻页

### 分页器 - 内部 - 输入校验： _isValid
校验用户输入是否合法；（是否在限制范围内）



