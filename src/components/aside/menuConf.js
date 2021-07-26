export default [
  {
    id: '1',
    title: '总览',
    icon: 'el-icon-menu',
    visible: true,
    children: [{
      id: '1-1',
      title: '数据展示',
      visible: true,
      path: '/homePage'
    }]
  }, {
    id: '2',
    title: '录制回放',
    icon: 'el-icon-video-camera-solid',
    visible: true,
    children: [{
      id: '2-1',
      title: '视频录制回放',
      visible: true,
      path: '/rrweb'
    }]
  }, {
    id: '3',
    title: '反馈',
    icon: 'el-icon-chat-dot-round',
    visible: true,
    children: [{
      id: '3-1',
      title: '反馈建议',
      visible: true,
      path: '/fallBack'
    }]
  }
];
