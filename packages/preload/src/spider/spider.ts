import getPage from './request';

export  function getHref(url:string):unknown[] {
  const html =getPage(url);
  const b = /html_data\/14\/([^<>"]*)/gi;
  const href = html.match(b);
  const hrefs =  Array.from(new Set(href));
  return hrefs;
}

export  function getSrc(url:string):{
  title: string;
  href: string;
  srcs: unknown[];
} {
  const html = getPage(url);
  const b = /http:\/\/p1.pi22y.cc\/([^<>"]*)\.jpg/gi;
  const srcs = html.match(b);
  // 匹配 img 的 title 值
  const t = /<span id="subject_tpc">(.*?)<\/span>/gi;
  const title = t.exec(html);
  const img = {
    title: title[1],
    href: url,
    srcs: Array.from(new Set(srcs)),
  };
  // console.log(img)
  return img;
}
