import { getHref } from './spider';



export  function done(url: string) {
  const hrefs = getHref(url);
  console.log(hrefs);
}

