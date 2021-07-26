import * as rrweb from 'rrweb';
import { ref } from 'vue';
import http from '../../api/index';

const events = ref([]);
let stop = null;
const showTip = (text, time = 6000) => {
  const ele = document.createElement('div');
  const span = document.createElement('span');
  const divStyle = {
    position: 'fixed',
    right: '10px',
    top: '10px',
    height: '50px',
    border: '1px solid #EBEEF5',
    'background-color': '#edf2fc',
    'box-shadow': '1px 1px 1px #EBEEF5',
    transition: 'opacity 2s linear',
    opacity: 1
  };
  const spanStyle = {
    color: '#909399',
    'line-height': '50px',
    padding: '10px 20px',
    'font-size': '14px'
  };
  ele.setAttribute('style', Object.keys(divStyle).map(item => `${item}:${divStyle[item]}`).join(';'));
  span.setAttribute('style', Object.keys(spanStyle).map(item => `${item}:${spanStyle[item]}`).join(';'));
  // ele.style.cssText = JSON.stringify(divStyle);
  span.innerText = text || '播放完成，即将关闭!';
  ele.appendChild(span);
  document.body.appendChild(ele);
  setTimeout(() => {
    document.body.removeChild(ele);
    document.querySelector('#player').innerHTML = '';
  }, time);
};

const init = () => {
  stop = rrweb.record({
    emit(event) {
      if (event.length > 100) {
        stop();
      }
      events.value.push(event);
    }
  });
};

const rePlay = (item) => {
  const player = new rrweb.Replayer(JSON.parse(item.data) || events.value, {
    mouseTail: false,
    root: document.querySelector('#player')
  });
  player.play();
  player.on('finish', () => {
    showTip();
  });
};

const observe = () => {
  const observes = new MutationObserver((obs) => {
    console.log(obs);
  });
  observes.observe(document, {
    childList: true,
    attributes: true,
    subtree: true
  });
};

const record = () => {
  init();
  observe();
};
const stopRecord = () => {
  stop();
  events.value = [];
};

const upload = async() => {
  const res = await http.post('saveEvents', { id: getUuId(), date: new Date().getTime(), events: JSON.stringify(events.value) });
  if (res.retCode !== '200') {
    console.log('保存快照失败');
  }
  stopRecord();
};

const getUuId = () => {
  var s = [];
  var hexDigits = '0123456789abcdef';
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';

  var uuid = s.join('');
  return uuid;
};

const getList = () => {
  return new Promise((resolve, reject) => {
    http.get('/getEvents').then(({ data }) => {
      if (data.retCode !== '200') {
        console.log('获取列表失败');
        reject();
      }
      return resolve(data);
    });
  });
};

const remove = async() => {
  const res = await http.delete('/removeAll');
  if (res.retCode !== '200') {
    console.log('删除列表失败');
  }
};

const startSearch = async(id) => {
  return new Promise((resolve, reject) => {
    http.get(`/getEvent/${id}`).then(({ data }) => {
      if (data.retCode !== '200') {
        console.log('查询失败');
        reject();
      }
      return resolve(data);
    });
  });
};
const copy = (data) => {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', data);
  input.setAttribute('readonly', 'readonly');
  input.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    showTip('复制成功', 1000);
  }
  document.body.removeChild(input);
};
export { rePlay, record, upload, getList, remove, showTip, startSearch, copy };
