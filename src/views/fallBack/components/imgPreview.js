const showPreview = (id) => {
  const comment = document.getElementById(id);
  const imgArr = document.getElementsByTagName('img');
  if (imgArr.length) {
    Array.from(imgArr).forEach((item) => {
      if (comment.contains(item)) {
        let divEl = null;
        let img = null;
        const styObj = {
          position: 'fixed',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          'background-color': 'rgba(0,0,0,.8)',
          overflow: 'auto',
          'z-index': '9999'
        };
        const clickHander = (e) => {
          e.stopPropagation();
          if (e.target === item) {
            divEl = document.createElement('div');
            Object.keys(styObj).forEach((key) => {
              divEl.style[key] = styObj[key];
            });
            img = document.createElement('img');
            img.src = item.src;
            img.height = 300;
            img.width = 300;
            img.style.cursor = 'zoom-in';
            divEl.appendChild(img);
            document.body.appendChild(divEl);
          }
        };
        const wheelHander = (e) => {
          e.stopPropagation();
          if (!divEl || !img) {
            return;
          }
          if (e.wheelDelta > 0) {
            img.height += 10;
            img.width += 10;
          } else {
            img.height -= 10;
            img.width -= 10;
          }
        };
        item.setAttribute('style', 'cursor: pointer;');
        item.setAttribute('title', '点击预览');
        item.addEventListener('click', clickHander);
        document.body.addEventListener('mousewheel', wheelHander);
        document.body.addEventListener('click', function(e) {
          if (e.target !== img && divEl && img) {
            document.body.removeChild(divEl);
            divEl = null;
            img = null;
          }
        });
      }
    });
  }
};
export default showPreview;
