function Reset() {

  let width = document.body.clientWidth;

  let designWidth = 100;

  let fontSize = (width / 1920) * designWidth;

  const html = document.documentElement;

  let fontEl = document.getElementById('styleHtml');
  if (!fontEl) {
    fontEl = document.createElement('style');
    fontEl.id = 'styleHtml';
    html.firstElementChild.appendChild(fontEl);

    const dpr = Math.round(window.devicePixelRatio || 1);
    //写入高清倍数
    html.setAttribute('data-dpr', dpr);
  }

  //动态写入样式
  fontEl.innerHTML = 'html{font-size:' + fontSize + 'px!important;}';
}

export const reset = Reset;
