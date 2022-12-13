function contains(value: string, param: string = " ") {
  return param.split("").some((el) => {
    return value.includes(el) || value.includes(" ");
  });
}

function isChar(value: string) {
  return /[a-z]/gi.test(value);
}

function trim(value: string, param: string = " ") {
  value = value.trim();

  let l = 0;
  let r = value.length - 1;

  while (l < value.length) {
    if (isChar(value[l]) || !contains(value[l], param)) {
      break;
    }
    l++;
  }
  while (r >= 0) {
    if (isChar(value[r]) || !contains(value[r], param)) {
      break;
    }
    r--;
  }

  return value.slice(l, r + 1);
}

export default trim;

// function trim(string: string, chars?: string): string {
//   if (string && !chars) {
//     return string.trim();
//   }
//
//   const reg = new RegExp(`[${chars}]`, "gi");
//   return string.replace(reg, "");
// }
