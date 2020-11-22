const inputIP = document.querySelector('.inputIp')
const inputSubnet = document.querySelector('.inputSubnet')
const calculateIp = document.querySelector('.calculate')
const calculateResult = document.querySelector('.calculateResult')
const calculation = document.querySelector('.calculation')
const calculation_texts = document.querySelectorAll('.calculation_text')
const desc = document.querySelector('.desc')
const timeExecution = document.querySelector('.timeExecution')
const beforeCalculations = document.querySelectorAll('.beforeCalculation')
const stepCalculate = document.querySelector('.stepCalculate')
const regex = '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
let valueIp = ''
let valueSubnet = ''
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
    ipAddrInt = parseInt(element)
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
    netmaskInt = parseInt(element)
    binary[i] = netmaskInt.toString(2)
  })
  return binary.join('.')
}
function calculate(ip, prefix) {
  let start = window.performance.now();
  let firstIPArray = null
  let lastIPArray = null
  let subnetMask = null
  const usableHostIpRange = {
    first: null,
    last: null
  }
  const afterSplit = ip.split('.')
  const selectArray = parseInt(afterSplit[afterSplit.length - 1])
  const selectArray2 = parseInt(afterSplit[afterSplit.length - 2])
  const classC = prefix >= 24 && prefix <= 32
  const classB = prefix >= 16 && prefix <= 23
  if (classC && afterSplit[3] !== undefined) {
    const content = (
      `<h3>Cara Perhitungan</h3>
      <p class="note">Note : Cara perhitungan dibawah diambil dari proses perhitungan dibalik layar </p>`
    )
    desc.innerHTML = (content)
    calculation_texts.forEach(e => {
      e.style.padding = '5px'
    })
    beforeCalculations[0].innerHTML = (`Prefix ${prefix} = ${ClassIP[`__${prefix}`]} IP`)
    beforeCalculations[1].innerHTML = (`4th Octet = ${afterSplit[3]}`)
    calculation_texts[0].innerHTML = (`<td>Calculate IP</td> <td>${selectArray} / ${ClassIP[`__${prefix}`]} = ${Math.floor(selectArray / ClassIP[`__${prefix}`])} * ${ClassIP[`__${prefix}`]} = ${Math.floor(selectArray / ClassIP[`__${prefix}`]) * ClassIP[`__${prefix}`]}</td>`)
    const firstIP = Math.floor(selectArray / ClassIP[`__${prefix}`]) * ClassIP[`__${prefix}`]
    const lastIP = firstIP + ClassIP[`__${prefix}`] - 1
    const copyArray = [...afterSplit]
    const copyArray2 = [...afterSplit]
    copyArray[3] = firstIP
    firstIPArray = (copyArray)
    calculation_texts[1].innerHTML = (`<td>IP firstResult</td> <td>${afterSplit.join('.')} 
    => ${firstIPArray.join('.')} </td>`)
    calculation_texts[2].innerHTML = (`<td>Calculate IP</td>  <td>${firstIP} + ${ClassIP[`__${prefix}`]} - 1 = ${firstIP + ClassIP[`__${prefix}`] - 1}</td>`)
    copyArray2[3] = lastIP
    lastIPArray = (copyArray2)
    calculation_texts[3].innerHTML = (`<td>IP lastResult</td> <td>${afterSplit.join('.')} 
    => ${lastIPArray.join('.')} </td>`)
    calculation_texts[4].innerHTML = (`<td>NETWORK ID (firstResult)</td><td>${firstIPArray.join('.')}</td>`)
    calculation_texts[5].innerHTML = (`<td>BROADCAST (lastResult)</td><td>${lastIPArray.join('.')}</td>`)
    subnetMask = 256 - ClassIP[`__${prefix}`]
    calculation_texts[6].innerHTML = (`<td>Subnet calculate</td> <td>256 - ${ClassIP[`__${prefix}`]} = ${256 - ClassIP[`__${prefix}`]}</td>`)
    calculation_texts[7].innerHTML = (`<td>Subnet result</td> <td>255.255.255.${subnetMask}</td>`)
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
    calculation_texts[8].innerHTML = (`<td>RANGE IP </td> <td>${firstIPArray.join('.')} - ${lastIPArray.join('.')}</td>`)
    calculation_texts[9].innerHTML = (`<td>VALID HOST Range</td><td>${usableHostIpRange.first.join('.')} - ${usableHostIpRange.last.join('.')}</td>`)
    calculation_texts[10].innerHTML = (`<td>Valid Host</td> <td>${(ClassIP[`__${prefix}`])} - 2 = ${(ClassIP[`__${prefix}`] - 2)}</td>`)
    const results = (
      `
      <h3>Hasil</h3>
      <tr>
        <td>ip address</td>
        <td>${ip}</td>
      </tr>
      <tr>
        <td>ip address binary</td>
        <td>${ipAddrToBinary(ip)}</td>
      </tr>
      <tr>
        <td>range ip</td>
        <td>${firstIPArray.join('.') + " - " + lastIPArray.join('.')}</td>
      </tr>
      <tr>
        <td>valid host</td>
        <td>${usableHostIpRange.first.join('.') + ' - ' + usableHostIpRange.last.join('.')}</td>
      </tr>
      <tr>
        <td>network id</td>
        <td>${firstIPArray.join('.')}</td>
      </tr>
      <tr>
        <td>broadcast</td>
        <td>${lastIPArray.join('.')}</td>
      </tr>
      <tr>
        <td>subnet mask</td>
        <td>255.255.255.${subnetMask}</td>
      </tr>
      <tr>
        <td>subnet mask binary</td>
        <td>${netMaskToBinary(`255.255.255.${subnetMask}`)}</td>
      </tr>
      <tr>
        <td>hosts</td>
        <td>${ClassIP[`__${prefix}`]}</td>
      </tr>
      <tr>
        <td>valid hosts</td>
        <td>${(ClassIP[`__${prefix}`] - 2)}</td>
      </tr>
      <tr>
      `
    )
    calculateResult.innerHTML = results
    let end = window.performance.now();
    timeExecution.innerHTML = `Execution time: ${Math.floor(end - start)} ms`
  }
  if(classB && afterSplit[2] !== undefined) {
    const content = (
      `<h3>Cara Perhitungan</h3>
        <p class="note">Note : Cara perhitungan dibawah diambil dari proses perhitungan dibalik layar </p>`
    )
    desc.innerHTML = (content)
    desc.innerHTML = (content)
    calculation_texts.forEach(e => {
      e.style.padding = '5px'
    })
    prefixInt = parseInt(prefix)
    const imaginer = parseInt(prefixInt + 8)
    beforeCalculations[0].innerHTML = (`Imaginer Prefix ${prefix} = ${imaginer} = ${ClassIP[`__${imaginer}`]} IP`)
    beforeCalculations[1].innerHTML = (`3rd Octet = ${afterSplit[2]}`)
    calculation_texts[0].innerHTML = (`<td>imaginer</td><td>${prefix} + 8 = ${prefixInt + 8}</td>`)
    const IPclass = ClassIP[`__${imaginer}`]
    const totalIP = IPclass * 256
    calculation_texts[1].innerHTML = (`<td>total IP </td> <td>  ${IPclass} * 256 = ${IPclass * 256}</td>`)
    const firstIP = Math.floor(selectArray2 / IPclass) * IPclass
    calculation_texts[2].innerHTML = (`<td>Calculate IP </td> <td> ${selectArray2} / ${IPclass} = ${Math.floor(selectArray2 / IPclass)} * ${IPclass} = ${Math.floor(selectArray2 / IPclass) * IPclass}</td>`)
    const lastIP = firstIP + IPclass - 1
    const copyArray = [...afterSplit]
    copyArray[3] = 0
    copyArray[2] = firstIP
    firstIPArray = copyArray
    calculation_texts[3].innerHTML = (`<td>IP firstResult</td> <td>${afterSplit.join('.')} => ${firstIPArray.join('.')}</td>`)
    calculation_texts[4].innerHTML = (`<td>Calculate IP</td> <td>${firstIP} + ${IPclass} - 1 = ${firstIP + IPclass - 1}</td>`)
    const copyArray2 = [...afterSplit]
    copyArray2[3] = 255
    copyArray2[2] = lastIP
    lastIPArray = copyArray2
    calculation_texts[5].innerHTML = (`<td>IP lastResult</td> <td>${afterSplit.join('.')} => ${lastIPArray.join('.')}</td>`)
    calculation_texts[6].innerHTML = (`<td>NETWORK ID (firstResult) </td> <td>${firstIPArray.join('.')}</td>`)
    calculation_texts[7].innerHTML = (`<td>BROADCAST (lastResult)</td>  <td>${lastIPArray.join('.')}</td>`)
    subnetMask = 256 - IPclass
    calculation_texts[8].innerHTML = (`<td>Subnet calculate</td>  <td>256 - ${IPclass} = ${256 - IPclass}</td>`)
    calculation_texts[9].innerHTML = (`<td>SUBNET MASK </td> <td>255.255.${subnetMask}.0</td>`)
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
    calculation_texts[10].innerHTML = (`<td>RANGE IP </td> <td>${firstIPArray.join('.')} - ${lastIPArray.join('.')}</td>`)
    calculation_texts[11].innerHTML = (`<td>VALID HOST Range</td> <td>${usableHostIpRange.first.join('.')} - ${usableHostIpRange.last.join('.')}</td>`)
    calculation_texts[12].innerHTML = (`<td>Valid Host </td> <td>${(totalIP)} - 2 = ${(totalIP - 2)}</td>`)
    const results = (
      `
    <h3>Hasil</h3>
    <tr>
      <td>ip address</td>
      <td>${ip}</td>
    </tr>
    <tr>
      <td>ip address binary</td>
      <td>${ipAddrToBinary(ip)}</td>
    </tr>
    <tr>
      <td>range ip</td>
      <td>${firstIPArray.join('.') + " - " + lastIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>valid host</td>
      <td>${usableHostIpRange.first.join('.') + ' - ' + usableHostIpRange.last.join('.')}</td>
    </tr>
    <tr>
      <td>network id</td>
      <td>${firstIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>broadcast</td>
      <td>${lastIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>subnet mask</td>
      <td>255.255.${subnetMask}.0</td>
    </tr>
    <tr>
      <td>subnet mask binary</td>
      <td>${netMaskToBinary(`255.255.${subnetMask}.0`)}</td>
    </tr>
    <tr>
      <td>hosts</td>
      <td>${totalIP}</td>
    </tr>
    <tr>
      <td>valid hosts</td>
      <td>${(totalIP - 2)}</td>
    </tr>`
    )
    calculateResult.innerHTML = results
    let end = window.performance.now();
    timeExecution.innerHTML = `Execution time: ${Math.floor(end - start)} ms`
  }
}
function validation(valueIp){
  beforeCalculations.forEach(e=>{
    e.innerHTML = ''
  })
  calculation_texts.forEach(e => {
    e.innerHTML = ''
  })
  calculateResult.innerHTML = ''
  desc.innerHTML = ''
  if(valueIp.match(regex)=== null || valueSubnet === ''){
    return true
  }else{
    return false
  }
}
function handleInput(e) {
  valueIp = e.target.value
  if(validation(valueIp,valueSubnet) === true){
    return
  }
  calculate(valueIp, valueSubnet)
}
function handleInputSubnet(e) {
  valueSubnet = e.target.value
  if(validation(valueIp,valueSubnet) === true){
    return
  }
  calculate(valueIp, valueSubnet)
}
function handleCalculate() {
  if(validation(valueIp,valueSubnet) === true){
    alert("IP TIDAK VALID!!!")
    return
  }
  calculate(valueIp, valueSubnet)
}
inputIP.addEventListener('input', handleInput)
inputSubnet.addEventListener('input', handleInputSubnet)
calculateIp.addEventListener('click', handleCalculate)