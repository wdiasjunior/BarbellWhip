export function deepClone(l: any): any {
  let n, u;
  if("object" != typeof l) return l;
  if(!l) return l;
  if("[object Array]" === Object.prototype.toString.apply(l)) {
    for(n = [], u = 0; u < l.length; u += 1) n[u] = deepClone(l[u]);
    return n;
  }
  for(u in n = {}, l) l.hasOwnProperty(u) && (n[u] = deepClone(l[u]));
  return n;
}

export function jsonClone(object: any): any {
  return JSON.parse(JSON.stringify(object));
}
