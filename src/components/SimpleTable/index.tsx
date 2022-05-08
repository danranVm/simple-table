/**
 * @file 简单的表格组件封装
*/

// TODO 表头的相关代码待解耦

import { defineComponent, computed, ref } from "vue";
import Pagination from "./Pagination";
import './index.scss';

export default defineComponent({
  name: "SimpleTable",

  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },

  setup(props, ctx) {
    // 排序方式,ascend: 升序;descend: 降序; '': 无排序;
    const SORT_WAYS: Array<string> = ['ascend', 'descend', ''];
    const SORT_WAYS_MAP = {
      ascend: 'ascend',
      descend: 'descend',
      noSort: ''
    };
    const SORT_STATUS_DESC = {
      [SORT_WAYS_MAP.ascend]: '当前为升序, 点击降序',
      [SORT_WAYS_MAP.descend]: '当前为降序, 点击取消排序',
      [SORT_WAYS_MAP.noSort]: '当前无排序,点击升序'
    }

    const curPage = ref(1);
    const pageSize = ref(10);
    const theSortDirections = ref<'ascend' | 'descend' | '' | string>('');
    const sortedDataSource = ref<unknown>([]);
  
    // 当前页码的数据
    let curPageData = computed(() => {
      let targetData = sortedDataSource.value.length ? sortedDataSource.value : props.dataSource;
      let startIndex = (curPage.value - 1) * pageSize.value;

      return targetData.slice(startIndex, startIndex + pageSize.value);
    });

    // 页码改变后的处理
    const handlePageChange = (cur: number) => {
      curPage.value = cur;
    };

    // 排序点击事件handle
    const handleSort = (callback: (a: unknown, b: unknown) => number, defaultSortOrder: string, sortDirections: Array<'ascend' | 'descend'>) => {
      if(!callback) {// columns配置中未定义sorter
        return;
      }

      let theSortWays = [...SORT_WAYS, SORT_WAYS[0]];
      let curSortWay = theSortWays.findIndex((item) => item === theSortDirections.value);

      theSortDirections.value = theSortWays[curSortWay + 1];
      const tempData = [...props.dataSource];
  
      if(theSortDirections.value !== SORT_WAYS_MAP.noSort) {
        tempData.sort((a: unknown, b: unknown): any => {
          if(theSortDirections.value === SORT_WAYS_MAP.descend) {
            return callback(a, b);
          } else if(theSortDirections.value === SORT_WAYS_MAP.ascend) {
            return callback(b, a);
          }
        });
      }
      sortedDataSource.value = tempData;
    }
  
    return () => (
      <div class="simple-table_table-box">
        <table class="simple-table_table global-mg-b-10">
          <thead>
            <tr>
              {
                props.columns.map((item: {} | any) => (
                  <th class={item.sorter ? 'simple-table_column-header-sort' : ''}
                      title={item.sorter ? SORT_STATUS_DESC[theSortDirections.value] : ''}
                      onClick={() => handleSort(item.sorter, item.defaultSortOrder, item.sortDirections)}>
                    {item.title}
                    {/* TODO 待添加筛选UI,筛选功能已有 */}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              curPageData.value.map((row: {} | any) => (
                <tr>
                  { props.columns.map((_item: {} | any) => <td>{row[_item.dataIndex]}</td>) }
                </tr>
              ))
            }
          </tbody>
        </table>

        {/* 分页 */}
        <Pagination change={handlePageChange} total={props.dataSource.length} page-size={pageSize.value} />
      </div>
    );
  },
});
