<template>
  <div class="hello">
   <input type="text" >
   <button @click="record">录制</button>
   <button @click="rePlay(tableData.result[0])">回放</button>
   <button @click="upload">上传数据</button>
   <button @click="refresh">获取数据</button>
   <button @click="remove">删除</button><br/>
   <input type="text" ref="searchInput" v-model.trim="searchTxt" placeholder="请输入id搜索">
   <button @click="search">搜索</button>
   
   
   <table v-if="tableData.total > 0">
     <thead>
       
       <td>id</td>
       <td>数据</td>
       <td>时间</td>
     </thead>
     <tbody>
       <tr v-for="item in tableData.result" :key="item.id">
          <td @click="copy(item.id)" style="cursor:pointer;">{{item.id}}</td>
          <td>{{item.data}}</td>
          <td>{{new Date(item.date).toLocaleDateString()}}</td>
       </tr>
     </tbody>
   </table>
   <div id="player" style="width: 500px;height: 500px;"></div>
  </div>
</template>

<script>
import {ref,  reactive} from 'vue'
import * as compApi from './compositionApi'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(){
    const {rePlay, record, upload, getList, remove, showTip, startSearch, copy} = compApi;
    const searchTxt = ref(null);
    const tableData = reactive({
      result: null,
      total: 0
    })
    const refresh = async() => {
      let {result} = await getList();
      console.log("获取列表数据：")
      console.log(result)
      tableData.result = result.reverse();
      tableData.total = result.length;
    }
    const search = async() => {
      if(!searchTxt.value || searchTxt.value === ''){
        showTip("请输入搜索内容");
        return;
      }
      let {result} = await startSearch(searchTxt.value)
      tableData.result = [null].map(() => result);
      tableData.total = 1;
      
    }
    
    return{
      record,
      rePlay,
      upload,
      tableData,
      refresh,
      remove,
      search,
      searchTxt,
      copy
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  text-align: left;
}
button{
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
