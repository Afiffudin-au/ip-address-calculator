//class A
calculate1('192.168.240.240')
function calculate1(ip, prefix) {
  const afterSplit = ip.split('.')
  const selectArrayIndexOf1 = afterSplit[1]
  const selectArrayIndexOf2 = afterSplit[2]
  const selectArrayIndexOf3 = afterSplit[3]
  const MaxIpHost = selectArrayIndexOf1 >= 16 && selectArrayIndexOf1 <= 31
  //Class A

  if (parseInt(afterSplit[0]) === 10) {
    console.log('Private')
  } else if (parseInt(afterSplit[0]) === 172 && MaxIpHost) {
    console.log('Private')
  } else if (
    parseInt(afterSplit[0]) === 192 &&
    parseInt(afterSplit[1]) === 168
  ) {
    console.log('Private')
  } else {
    console.log('Public')
  }

  //Class C

  // if (parseInt(prefix) >= 8 && parseInt(prefix) <= 32) {
  //   if (parseInt(afterSplit[0]) === 10) {
  //     if (
  //       selectArrayIndexOf2 <= 255 &&
  //       selectArrayIndexOf3 <= 255 &&
  //       selectArrayIndexOf1 <= 255
  //     ) {
  //       console.log('Private')
  //     } else {
  //       console.log('Public')
  //     }
  //   }

  //   const MaxIpHost = selectArrayIndexOf1 >= 16 && selectArrayIndexOf1 <= 31
  //   if (parseInt(afterSplit[0]) === 172 && MaxIpHost) {
  //     if (selectArrayIndexOf2 <= 255 && selectArrayIndexOf3 <= 255) {
  //       console.log('Private')
  //     }
  //   }
  //   if (parseInt(afterSplit[0]) !== 172 || !MaxIpHost) {
  //     console.log('Public')
  //   }
  // }
}
// calculate1('172.16.25.255', 8)
// calculate1('10.20.255.255', 8)

//class B
function calculate2(ip, prefix) {
  const afterSplit = ip.split('.')
  const selectArrayIndexOf1 = afterSplit[1]
  const selectArrayIndexOf2 = afterSplit[2]
  const selectArrayIndexOf3 = afterSplit[3]
  if (parseInt(prefix) >= 12 && parseInt(prefix) <= 23) {
    const MaxIpHost = selectArrayIndexOf1 >= 16 && selectArrayIndexOf1 <= 31
    if (parseInt(afterSplit[0]) === 172 && MaxIpHost) {
      if (selectArrayIndexOf2 <= 255 && selectArrayIndexOf3 <= 255) {
        console.log('Private')
      }
    } else {
      console.log('Public')
    }
  }
}
calculate2('172.30.255.255', 12)
