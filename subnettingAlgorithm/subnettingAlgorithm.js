const ClassIP = {
  __24: 256,
  __25: 128,
  __26: 64,
  __27: 32,
  __28: 16,
  __29: 8,
  __30: 4,
  __31: 2,
  __32: 1,
}
//you can use this or not
function ipAddrToBinary(ipAddr) {
  let array = []
  let binary = []
  const afterSplit = ipAddr.split('.')
  array = afterSplit
  array.forEach((element, i) => {
    const ipAddrInt = parseInt(element)
    binary[i] = ipAddrInt.toString(2)
  })
  return binary.join('.')
}
//you can use this or not
function netMaskToBinary(netmask) {
  let array = []
  let binary = []
  const afterSplit = netmask.split('.')
  array = afterSplit
  array.forEach((element, i) => {
    const netmaskInt = parseInt(element)
    binary[i] = netmaskInt.toString(2)
  })
  return binary.join('.')
}

function calculate(ip, prefix) {
  let firstIPArray = null
  let lastIPArray = null
  let subnetMask = null
  let ipClass = ''
  const usableHostIpRange = {
    first: null,
    last: null,
  }
  const afterSplit = ip.split('.')
  const selectArray = parseInt(afterSplit[afterSplit.length - 1])
  const selectArray2 = parseInt(afterSplit[afterSplit.length - 2])
  const selectArray3 = parseInt(afterSplit[afterSplit.length - 3])
  const classC = prefix >= 24 && prefix <= 32
  const classB = prefix >= 16 && prefix <= 23
  const classA = prefix >= 8 && prefix <= 15
  const prefix31To32 = prefix >= 31 && prefix <= 32
  if (prefix >= 24 && prefix <= 32) {
    ipClass = 'C'
  } else if (prefix >= 16 && prefix <= 23) {
    ipClass = 'B'
  } else if (prefix >= 8 && prefix <= 15) {
    ipClass = 'A'
  }
  //public and private ip detection
  const selectArrayIndexOf1 = afterSplit[1]
  const MaxIpHost = selectArrayIndexOf1 >= 16 && selectArrayIndexOf1 <= 31
  if (parseInt(afterSplit[0]) === 10) {
    typeOfIp = 'Private'
  } else if (parseInt(afterSplit[0]) === 172 && MaxIpHost) {
    typeOfIp = 'Private'
  } else if (
    parseInt(afterSplit[0]) === 192 &&
    parseInt(afterSplit[1]) === 168
  ) {
    typeOfIp = 'Private'
  } else {
    typeOfIp = 'Public'
  }
  //End of public and private ip detection
  if (classC && afterSplit[3] !== undefined) {
    const firstIP =
      Math.floor(selectArray / ClassIP[`__${prefix}`]) * ClassIP[`__${prefix}`]
    const lastIP = firstIP + ClassIP[`__${prefix}`] - 1
    const copyArray = [...afterSplit]
    const copyArray2 = [...afterSplit]
    copyArray[3] = firstIP
    firstIPArray = copyArray
    copyArray2[3] = lastIP
    lastIPArray = copyArray2
    subnetMask = 256 - ClassIP[`__${prefix}`]
    subnetMask = `255.255.255.${subnetMask}`
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
    if (prefix31To32) {
      usableHostIpRange.first = []
      usableHostIpRange.last = []
    }
  } else if (classB && afterSplit[2] !== undefined) {
    const prefixInt = parseInt(prefix)
    const imaginer = parseInt(prefixInt + 8)
    const IPclass = ClassIP[`__${imaginer}`]
    const totalIP = IPclass * 256
    const totalIpUsable = totalIP - 2
    const firstIP = Math.floor(selectArray2 / IPclass) * IPclass
    const lastIP = firstIP + IPclass - 1
    const copyArray = [...afterSplit]
    const copyArray2 = [...afterSplit]
    copyArray[3] = 0
    copyArray[2] = firstIP
    firstIPArray = copyArray
    copyArray2[3] = 255
    copyArray2[2] = lastIP
    lastIPArray = copyArray2
    subnetMask = 256 - IPclass
    subnetMask = `255.255.${subnetMask}.0`
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
  } else if (classA && afterSplit[1] !== undefined) {
    const prefixInt = parseInt(prefix)
    const imaginer = prefixInt + 16
    const IPclass = ClassIP[`__${imaginer}`]
    const totalIP = IPclass * 65536
    const totalIpUsable = totalIP - 2
    const firstIP = Math.floor(selectArray3 / IPclass) * IPclass
    const lastIP = firstIP + IPclass - 1
    const copyArray = [...afterSplit]
    const copyArray2 = [...afterSplit]
    copyArray[1] = firstIP
    copyArray[2] = 0
    copyArray[3] = 0
    firstIPArray = copyArray
    copyArray2[1] = lastIP
    copyArray2[2] = 255
    copyArray2[3] = 255
    lastIPArray = copyArray2
    subnetMask = 256 - IPclass
    subnetMask = `255.${subnetMask}.0.0`
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
  }
}
calculate('192.168.20.22', 8) //parameter 2 : allow string or number
