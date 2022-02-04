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
let firstIPArray = null
let lastIPArray = null
let subnetMask = null
let ipClassType = ''
let usableHostIpRange = {
  first: null,
  last: null,
}
let subnettingResults = {}
let subnettingTables = {}
function calculate(ip, prefix) {
  const afterSplit = ip.split('.')
  const selectArray = parseInt(afterSplit[afterSplit.length - 1])
  const selectArray2 = parseInt(afterSplit[afterSplit.length - 2])
  const selectArray3 = parseInt(afterSplit[afterSplit.length - 3])
  const classC = prefix >= 24 && prefix <= 32
  const classB = prefix >= 16 && prefix <= 23
  const classA = prefix >= 8 && prefix <= 15
  const prefix31To32 = prefix >= 31 && prefix <= 32
  if (prefix >= 24 && prefix <= 32) {
    ipClassType = 'C'
  } else if (prefix >= 16 && prefix <= 23) {
    ipClassType = 'B'
  } else if (prefix >= 8 && prefix <= 15) {
    ipClassType = 'A'
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
    const totalIP = ClassIP[`__${prefix}`]
    const totalIpUsable =
      ClassIP[`__${prefix}`] - 2 === -1 ? '0  N/A' : ClassIP[`__${prefix}`] - 2
    const copyArray = [...afterSplit]
    const copyArray2 = [...afterSplit]
    copyArray[3] = firstIP
    firstIPArray = copyArray
    copyArray2[3] = lastIP
    lastIPArray = copyArray2
    subnetMask = 256 - ClassIP[`__${prefix}`]
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
    subnettingResults.ip = ip
    subnettingResults.firstIpRange = firstIPArray
    subnettingResults.lastIpRange = lastIPArray
    subnettingResults.firstUsableHostRange = usableHostIpRange.first
    subnettingResults.lastUsableHostRange = usableHostIpRange.last
    subnettingResults.networkAddress = firstIPArray
    subnettingResults.broadcastAddress = lastIPArray
    subnettingResults.subnetMask = `255.255.255.${subnetMask}`
    subnettingResults.totalHost = totalIP.toLocaleString()
    subnettingResults.totalUsableHost = totalIpUsable.toLocaleString()
    subnettingResults.cidrNotation = prefix
    subnettingResults.ipClassType = ipClassType
    subnettingResults.ipType = typeOfIp
    //block subnet
    if (subnetMask === 0 || parseInt(prefix) === 24 || parseInt(prefix) >= 31) {
      return
    }
    let nextSubnets = []

    for (let i = 0; i <= subnetMask; i += totalIP) {
      nextSubnets.push(i)
    }

    const networkAddressTables = []
    const firstUsableHostTables = []
    const lastUsableHostTables = []
    const broadcastAddressTables = []
    for (let i = 0; i < nextSubnets.length; i++) {
      const copyFirstIpArray = [...firstIPArray]
      const copyFirstUsableHost = [...usableHostIpRange.first]
      const copyLastUsableHost = [...usableHostIpRange.last]
      const copyLastIpArray = [...lastIPArray]
      copyFirstIpArray[3] = nextSubnets[i]
      copyFirstUsableHost[3] = nextSubnets[i] + 1
      copyLastUsableHost[3] = nextSubnets[i] + nextSubnets[1] - 2
      copyLastIpArray[3] = nextSubnets[i] + nextSubnets[1] - 1
      networkAddressTables.push(copyFirstIpArray)
      firstUsableHostTables.push(copyFirstUsableHost)
      lastUsableHostTables.push(copyLastUsableHost)
      broadcastAddressTables.push(copyLastIpArray)
    }
    subnettingTables.blockSubnets = nextSubnets.length
    subnettingTables.nextSubnets = nextSubnets
    subnettingTables.networkAddressTables = networkAddressTables
    subnettingTables.firstUsableHostTables = firstUsableHostTables
    subnettingTables.lastUsableHostTables = lastUsableHostTables
    subnettingTables.broadcastAddressTables = broadcastAddressTables
    subnettingTables.prefix = prefix
    subnettingTables.ip =
      ip.split('.')[0] + '.' + ip.split('.')[1] + '.' + ip.split('.')[2] + '.*'
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
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
    subnettingResults.ip = ip
    subnettingResults.firstIpRange = firstIPArray
    subnettingResults.lastIpRange = lastIPArray
    subnettingResults.firstUsableHostRange = usableHostIpRange.first
    subnettingResults.lastUsableHostRange = usableHostIpRange.last
    subnettingResults.networkAddress = firstIPArray
    subnettingResults.broadcastAddress = lastIPArray
    subnettingResults.subnetMask = `255.255.${subnetMask}.0`
    subnettingResults.totalHost = totalIP.toLocaleString()
    subnettingResults.totalUsableHost = totalIpUsable.toLocaleString()
    subnettingResults.cidrNotation = prefix
    subnettingResults.ipClassType = ipClassType
    subnettingResults.ipType = typeOfIp
    //block subnet
    if (subnetMask === 0 || parseInt(prefix) === 16) return
    const blockSubnet = IPclass
    let nextSubnets = []

    for (let i = 0; i <= subnetMask; i += blockSubnet) {
      nextSubnets.push(i)
    }
    //Network Address Table
    const networkAddressTables = []
    const firstUsableHostTables = []
    const lastUsableHostTables = []
    const broadcastAddressTables = []
    for (let i = 0; i < nextSubnets.length; i++) {
      const copyFirstIpArray = [...firstIPArray]
      const copyFirstUsableHost = [...usableHostIpRange.first]
      const copyLastUsableHost = [...usableHostIpRange.last]
      const copyLastIpArray = [...lastIPArray]
      copyFirstIpArray[2] = nextSubnets[i]
      copyFirstUsableHost[2] = nextSubnets[i]
      copyLastUsableHost[2] = nextSubnets[i] - 1 + nextSubnets[1]
      copyLastIpArray[2] = nextSubnets[i] - 1 + nextSubnets[1]
      networkAddressTables.push(copyFirstIpArray)
      firstUsableHostTables.push(copyFirstUsableHost)
      lastUsableHostTables.push(copyLastUsableHost)
      broadcastAddressTables.push(copyLastIpArray)
    }
    subnettingTables.blockSubnets = nextSubnets.length
    subnettingTables.nextSubnets = nextSubnets
    subnettingTables.networkAddressTables = networkAddressTables
    subnettingTables.firstUsableHostTables = firstUsableHostTables
    subnettingTables.lastUsableHostTables = lastUsableHostTables
    subnettingTables.broadcastAddressTables = broadcastAddressTables
    subnettingTables.prefix = prefix
    subnettingTables.ip = ip.split('.')[0] + '.' + ip.split('.')[1] + '.*.*'
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
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
    subnettingResults.ip = ip
    subnettingResults.firstIpRange = firstIPArray
    subnettingResults.lastIpRange = lastIPArray
    subnettingResults.firstUsableHostRange = usableHostIpRange.first
    subnettingResults.lastUsableHostRange = usableHostIpRange.last
    subnettingResults.networkAddress = firstIPArray
    subnettingResults.broadcastAddress = lastIPArray
    subnettingResults.subnetMask = `255.${subnetMask}.0.0`
    subnettingResults.totalHost = totalIP.toLocaleString()
    subnettingResults.totalUsableHost = totalIpUsable.toLocaleString()
    subnettingResults.cidrNotation = prefix
    subnettingResults.ipClassType = ipClassType
    subnettingResults.ipType = typeOfIp
    if (subnetMask === 0 || parseInt(prefix) === 8) return
    const blockSubnet = IPclass
    let nextSubnets = []

    for (let i = 0; i <= subnetMask; i += blockSubnet) {
      nextSubnets.push(i)
    }
    //Network Address Table
    const networkAddressTables = []
    const firstUsableHostTables = []
    const lastUsableHostTables = []
    const broadcastAddressTables = []
    for (let i = 0; i < nextSubnets.length; i++) {
      const copyFirstIpArray = [...firstIPArray]
      const copyFirstUsableHost = [...usableHostIpRange.first]
      const copyLastUsableHost = [...usableHostIpRange.last]
      const copyLastIpArray = [...lastIPArray]
      copyFirstIpArray[1] = nextSubnets[i]
      copyFirstUsableHost[1] = nextSubnets[i]
      copyLastUsableHost[1] = nextSubnets[i] - 1 + nextSubnets[1]
      copyLastIpArray[1] = nextSubnets[i] - 1 + nextSubnets[1]
      networkAddressTables.push(copyFirstIpArray)
      firstUsableHostTables.push(copyFirstUsableHost)
      lastUsableHostTables.push(copyLastUsableHost)
      broadcastAddressTables.push(copyLastIpArray)
    }
    subnettingTables.blockSubnets = nextSubnets.length
    subnettingTables.nextSubnets = nextSubnets
    subnettingTables.networkAddressTables = networkAddressTables
    subnettingTables.firstUsableHostTables = firstUsableHostTables
    subnettingTables.lastUsableHostTables = lastUsableHostTables
    subnettingTables.broadcastAddressTables = broadcastAddressTables
    subnettingTables.prefix = prefix
    subnettingTables.ip = ip.split('.')[0] + '.*.*.*'
  }
}
calculate('36.68.223.200', 25) //parameter 2 : allow string or number

//For Performance test
// let randomIp = []
// function randomIntFromInterval(min, max) {
//   // min and max included
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }
// for (var k = 0; k < 1000000; k++) {
//   randomIp = []
//   randomIp.push(randomIntFromInterval(10, 255))
//   randomIp.push(randomIntFromInterval(10, 255))
//   randomIp.push(randomIntFromInterval(10, 255))
//   randomIp.push(randomIntFromInterval(10, 255))
//   var start = new Date().getTime()
//   calculate(randomIp.join('.'), randomIntFromInterval(8, 31))
//   var end = new Date().getTime()
//   console.log(k + ' took: ' + (end - start) + ' ms')
// }
