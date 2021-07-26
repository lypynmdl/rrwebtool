<template>
  <div class="btn-group">
    <el-row>
      <el-col :span="24">
        <el-tooltip effect="dark" :content="tips" placement="right-start">
          <i class="el-icon-question" />
        </el-tooltip>
      </el-col>
    </el-row>
    <el-tabs v-model="activePane" @tab-click="tabClick">
      <el-tab-pane label="录制" name="record">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-input type="text" placeholder="请点击开始录制后输入内容" />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="record">开始录制</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="upload">上传数据</el-button>
          </el-col>

        </el-row>
      </el-tab-pane>
      <el-tab-pane label="回放" name="replay">
        <el-row :gutter="10">

          <el-col :span="6">
            <el-input ref="searchTxtRef" v-model.trim="searchText" type="text" />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="search">搜索</el-button>
          </el-col>
          <el-col :span="10">
            <el-button class="fr" type="primary" @click="refresh">获取全部数据</el-button>
          </el-col>
          <el-col :span="2">
            <el-button class="fr" type="primary" @click="remove">清空</el-button>
          </el-col>
          <el-col :span="2">
            <el-button class="fr" type="primary" @click="rePlay(tableData.result[0])">回放</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

  </div>
  <div class="hello">
    <table v-if="tableData.total">
      <thead>
        <td>id</td>
        <td>数据</td>
        <td>时间</td>
      </thead>
      <tbody>
        <tr v-for="item in tableData.result" :key="item.id">
          <td style="cursor:pointer;" @click="copy(item.id)">{{ item.id }}</td>
          <td>{{ item.data }}</td>
          <td>{{ new Date(item.date).toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </table>
    <div id="player" style="width: 500px;height: 500px;" />
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import * as compApi from './compositionApi';
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  setup() {
    const { rePlay, record, upload, getList, remove, showTip, startSearch, copy } = compApi;
    const searchText = ref('');
    const searchTxtRef = ref(null);
    const tips = ref('请先启动mongo，再运行yarn start连接数据库');
    const tableData = reactive({
      result: null,
      total: 0
    });
    const activePane = ref('record');
    const refresh = async() => {
      const { result } = await getList();
      console.log('获取列表数据：');
      console.log(result);
      tableData.result = result.reverse();
      tableData.total = result.length;
    };
    const search = async() => {
      if (!searchText.value || searchText.value === '') {
        showTip('请输入搜索内容');
        return;
      }
      const { result } = await startSearch(searchText.value);
      tableData.result = [null].map(() => result);
      tableData.total = 1;
    };
    const tabClick = tab => {
      activePane.value = tab.paneName;
    };
    return {
      activePane,
      tips,
      record,
      rePlay,
      upload,
      tableData,
      refresh,
      remove,
      search,
      searchTxtRef,
      copy,
      searchText,
      tabClick
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.fr{
  float: right;
}
.btn-group{
  ::v-deep .el-row{
    margin: 10px 0;
  }
}

.hello{
  text-align: left;
}
el-button{
  margin: 0 20px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table{
  margin: 20px auto;
  box-sizing: content-box;
}
td{
  width: 100px;
  height: 50px;
  text-align: center;
  border: 1px solid gray;
  white-space: nowrap; /*不允许换行*/
  overflow: hidden; /*超出隐藏*/
  text-overflow: ellipsis; /*文本超出三点代替*/
}
</style>
