const inputIP = document.querySelector('.inputIp')
const inputSubnet = document.querySelector('.inputSubnet')
const calculateIp = document.querySelector('.btn-calculate')
const calculateResult = document.querySelector('.calculateResult')
const calculation = document.querySelector('.calculation')
const timeExecution = document.querySelector('.timeExecution')
const beforeCalculations = document.querySelector('.beforeCalculations')
const stepCalculate = document.querySelector('.stepCalculate')
const regex =
  '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
const regexBinary = '([^0-9]|^)1234([^0-9]|$)'
const inputBox = document.querySelector('.inputBox')
const showMethodCalculate = document.querySelector('.show-method')
const footer = document.querySelector('.footer')
const tableOfSubnet = document.querySelector('.tableOfSubnet')
const tableHeadOfSubnet = document.querySelector('.tableHeadOfSubnet')
const subnetTableInfo = document.querySelector('.subnetTableInfo')
let valueIp = ''
let valueSubnet = ''
let showMethod = false
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
let typeOfIp = ''
const usableHostIpRange = {
  first: null,
  last: null,
}
const subnettingResults = {}
const subnettingTables = {}
function calculate(ip, prefix) {
  let start = window.performance.now()
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
    if (showMethod) {
      calculationMethod(ip, prefix)
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
    showResults(subnettingResults)
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
    showSubnetTables(subnettingTables)
    let end = window.performance.now()
    timeExecution.innerHTML = `Execution time: ${Math.floor(end - start)} ms`
    footer.style.display = 'block'
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
    if (showMethod) {
      calculationMethod(ip, prefix)
    }
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
    showResults(subnettingResults)

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
    showSubnetTables(subnettingTables)
    let end = window.performance.now()
    timeExecution.innerHTML = `Execution time: ${Math.floor(end - start)} ms`
    footer.style.display = 'block'
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
    if (showMethod) {
      calculationMethod(ip, prefix)
    }
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
    showResults(subnettingResults)
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
    showSubnetTables(subnettingTables)
    let end = window.performance.now()
    timeExecution.innerHTML = `Execution time: ${Math.floor(end - start)} ms`
    footer.style.display = 'block'
  }
}
function showResults(subnettingResults) {
  const {
    ip,
    firstIpRange,
    lastIpRange,
    firstUsableHostRange,
    lastUsableHostRange,
    networkAddress,
    broadcastAddress,
    subnetMask,
    totalHost,
    totalUsableHost,
    cidrNotation,
    ipClassType,
    ipType,
  } = subnettingResults
  const results = `
    <h3 style="color : black">Results</h3>
    <tr>
      <td>IP Address</td>
      <td>${ip}</td>
    </tr>
    <tr>
      <td>Range IP</td>
      <td>${firstIpRange.join('.') + ' - ' + lastIpRange.join('.')}</td>
    </tr>
    <tr>
      <td>Usable Host IP Range</td>
      <td>${
        firstUsableHostRange.join('.') + ' - ' + lastUsableHostRange.join('.')
      }</td>
    </tr>
    <tr>
      <td>Network Address</td>
      <td>${networkAddress.join('.')}</td>
    </tr>
    <tr>
      <td>Broadcast Address</td>
      <td>${broadcastAddress.join('.')}</td>
    </tr>
    <tr>
      <td>Subnet Mask</td>
      <td>${subnetMask}</td>
    </tr>
    <tr>
      <td>Subnet Mask Binary</td>
      <td>${netMaskToBinary(subnetMask)}</td>
    </tr>
    <tr>
      <td>Total Number of Hosts</td>
      <td>${totalHost}</td>
    </tr>
    <tr>
      <td>Number of Usable Hosts</td>
      <td>${totalUsableHost}</td>
    </tr>
    <tr><td>CIDR Notation</td><td>/${cidrNotation}</td></tr>
    <tr><td>IP Class</td><td>${ipClassType}</td></tr>
    <tr><td>IP Type</td><td>${ipType}</td></tr>
    `
  calculateResult.innerHTML = results
}
function showSubnetTables(subnettingTables) {
  const {
    blockSubnets,
    nextSubnets,
    networkAddressTables,
    firstUsableHostTables,
    lastUsableHostTables,
    broadcastAddressTables,
    prefix,
    ip,
  } = subnettingTables
  const tableHeadOfSubnetResults = ` <tr>
      <th>Next Subnets</th>
      <th>Network Address</th>
      <th>Usable Host Range</th>
      <th>Broadcast Address</th>
    </tr>`
  const tableSubnetResults = nextSubnets
    .map((item, i) => {
      return `
        <tr>
        <td>${nextSubnets[i]}</td>
          <td>${networkAddressTables[i].join('.')}</td>
           <td>${
             firstUsableHostTables[i].join('.') +
             ' - ' +
             lastUsableHostTables[i].join('.')
           }</td>
           <td>${broadcastAddressTables[i].join('.')}</td>
         </tr>
         `
    })
    .join('')

  tableHeadOfSubnet.innerHTML = tableHeadOfSubnetResults
  subnetTableInfo.innerHTML = `<p>All ${blockSubnets} of the Possible / ${prefix} Networks for ${ip}</p>`
  tableOfSubnet.innerHTML = tableSubnetResults
}
function validation(valueIp, valueSubnet) {
  beforeCalculations.innerHTML = ''
  stepCalculate.innerHTML = ''
  calculateResult.innerHTML = ''
  tableHeadOfSubnet.innerHTML = ''
  tableOfSubnet.innerHTML = ''
  subnetTableInfo.innerHTML = ''
  footer.style.display = 'none'
  const afterSplit = valueIp.split('.')
  for (let i = 0; i < afterSplit.length; i++) {
    if (afterSplit[i] > 255) {
      return 'FAILURE'
    }
  }
  if (afterSplit.length === 2) {
    return 'FAILURE'
  }
  if (valueSubnet.toString().includes('.')) {
    return 'FAILURE'
  }
  if (valueIp.match(regex) === null || valueSubnet === '') {
    return 'FAILURE'
  } else {
    return 'SUCCESS'
  }
}
function handleInput(e) {
  valueIp = e.target.value
  if (validation(valueIp, valueSubnet) === 'FAILURE') {
    return
  }
  calculate(valueIp, valueSubnet)
}
function handleInputSubnet(e) {
  valueSubnet = e.target.value
  if (validation(valueIp, valueSubnet) === 'FAILURE') {
    return
  }
  calculate(valueIp, valueSubnet)
}
let randomIp = []
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function getRandomIp() {
  let prefix = randomIntFromInterval(8, 32)
  randomIp = []
  randomIp.push(randomIntFromInterval(10, 255))
  randomIp.push(randomIntFromInterval(10, 255))
  randomIp.push(randomIntFromInterval(10, 255))
  randomIp.push(randomIntFromInterval(10, 255))
  return {
    prefix,
    randomIp,
  }
}
function handleCalculate() {
  if (validation(valueIp, valueSubnet) === 'FAILURE') {
    alert(
      'Invalid IP Address / Not Support Prefix. Example : ' +
        getRandomIp().randomIp.join('.') +
        '/' +
        getRandomIp().prefix
    )
    return
  }
  if (valueSubnet < 8 || valueSubnet > 32) {
    alert(
      'Not Support Prefix : ' +
        valueSubnet +
        ' Example Prefix : ' +
        getRandomIp().prefix
    )
  }
  calculate(valueIp, valueSubnet)
}
function handleShowCalculateMethod(e) {
  showMethod = e.target.checked || false
  if (validation(valueIp, valueSubnet) === 'FAILURE') {
    return
  }
  calculate(valueIp, valueSubnet)
}
function handleActive(e) {
  if (e.target.classList.contains('inputIp')) {
    inputSubnet.classList.remove('inputActive')
    inputIP.classList.add('inputActive')
  }
  if (e.target.classList.contains('inputSubnet')) {
    inputIP.classList.remove('inputActive')
    inputSubnet.classList.add('inputActive')
  }
}
inputIP.addEventListener('input', handleInput)
inputSubnet.addEventListener('input', handleInputSubnet)
calculateIp.addEventListener('click', handleCalculate)
showMethodCalculate.addEventListener('change', handleShowCalculateMethod)
// inputBox.addEventListener('click', handleActive)
