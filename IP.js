let valueIp = ''
let valueSubnet = ''
const ClassIP = {
  __24 : 256,
  __25 : 128,
  __26 : 64,
  __27 : 32,
  __28 : 16,
  __29 : 8,
  __30 : 4,
  __31 : 2,
  __32 : 1,
}
function calculate(ip,prefix){
  let start = window.performance.now();
  let firstIPArray = null
  let lastIPArray = null
  let subnetMask = null
  const usableHostIpRange = {
    first : null,
    last : null
  }
  const afterSplit = ip.split('.')
  const selectArray = parseInt(afterSplit[afterSplit.length - 1])
  const selectArray2 = parseInt(afterSplit[afterSplit.length - 2])
  if(prefix >= 24 && prefix <= 32){
    const content = (
      `<h3>Cara Perhitungan</h3>
      <p class="note">Note : Cara perhitungan dibawah diambil dari proses perhitungan dibalik layar </p>`
    )
    desc.innerHTML = (content)
    calculation_text.forEach(e=>{
      e.style.padding = '10px'
    })
    calculation_text[0].innerHTML = (`Calculate IP : ${selectArray} / ${ClassIP[`__${prefix}`]} = ${Math.floor(selectArray / ClassIP[`__${prefix}`])} * ${ClassIP[`__${prefix}`]} = ${Math.floor(selectArray / ClassIP[`__${prefix}`]) * ClassIP[`__${prefix}`]}`)
    const firstIP = Math.floor(selectArray / ClassIP[`__${prefix}`]) * ClassIP[`__${prefix}`]
    const lastIP = firstIP + ClassIP[`__${prefix}`] - 1
    const copyArray = [...afterSplit]
    const copyArray2 = [...afterSplit]
    copyArray[3] = firstIP
    firstIPArray = (copyArray)
    calculation_text[1].innerHTML = (`IP firstResult : ${afterSplit.join('.')} 
    => ${firstIPArray.join('.')} `)
    calculation_text[2].innerHTML = (`Calculate IP  : ${firstIP} + ${ClassIP[`__${prefix}`]} - 1 = ${firstIP + ClassIP[`__${prefix}`] - 1}` )
    copyArray2[3] = lastIP
    lastIPArray = (copyArray2)
    calculation_text[3].innerHTML = (`IP lastResult : ${afterSplit.join('.')} 
    => ${lastIPArray.join('.')} `)
    calculation_text[4].innerHTML = ('NETWORK ID (firstResult) : ' + firstIPArray.join('.'))
    calculation_text[5].innerHTML = ('BROADCAST (lastResult) : ' + lastIPArray.join('.'))
    subnetMask = 256 - ClassIP[`__${prefix}`]
    calculation_text[6].innerHTML = (`Subnet calculate : 256 - ${ClassIP[`__${prefix}`]} = ${256 - ClassIP[`__${prefix}`]}`)
    calculation_text[7].innerHTML = ('Subnet result : 255.255.255.' + subnetMask)
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = firstIP + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = lastIP - 1
    usableHostIpRange.last = copyArray4
    calculation_text[8].innerHTML = ('RANGE IP : ' + firstIPArray.join('.') + ' - ' + lastIPArray.join('.'))
    calculation_text[9].innerHTML = ('VALID HOST (Network ID + 1 ~ BROADCAST - 1): ' + usableHostIpRange.first.join('.') + ' - ' + usableHostIpRange.last.join('.'))
    const results = (
      `<div>
      <h3>Hasil</h3>
        <p>${('IP ADDRESS  : ' + ip)}</p>
        <p>${('NETWORK ID   : ' + firstIPArray.join('.'))}</p>
        <p>${('RANGE IP  : ' + firstIPArray.join('.') + ' - ' + lastIPArray.join('.'))}</p>
        <p>${('VALID HOST : ' + usableHostIpRange.first.join('.') + ' - ' + usableHostIpRange.last.join('.'))}</p>
        <p>${('BROADCAST : ' + lastIPArray.join('.'))}</p>
        <p>${('SUBNETMASK : 255.255.255.' + subnetMask)}</p>
        <p>${('TOTAL IP : ' + ClassIP[`__${prefix}`])}</p>
      </div>`
    )
    calculateResult.innerHTML = results
    let end = window.performance.now();
    timeExecution.innerHTML = `Execution time: ${Math.floor(end - start)} ms`
  }
    if(prefix >= 16 && prefix <=23){
      const content = (
        `<h3>Cara Perhitungan</h3>
        <p class="note">Note : Cara perhitungan dibawah diambil dari proses perhitungan dibalik layar </p>`
      )
      desc.innerHTML = (content)
      desc.innerHTML = (content)
    calculation_text.forEach(e=>{
      e.style.padding = '10px'
    })
    prefixInt = parseInt(prefix)
    const imaginer = parseInt(prefixInt + 8)
    calculation_text[0].innerHTML = (`imaginer:  ${prefix} + 8 = ${prefixInt + 8}`)
    const IPclass = ClassIP[`__${imaginer}`]
    const totalIP = IPclass * 256
    calculation_text[1].innerHTML = (`total IP : ${IPclass} * 256 = ${IPclass * 256}`)
    const firstIP = Math.floor(selectArray2 / IPclass) * IPclass
    calculation_text[2].innerHTML = (`Calculate IP : ${selectArray2} / ${IPclass} = ${Math.floor(selectArray2 / IPclass)} * ${IPclass} = ${Math.floor(selectArray2 / IPclass) * IPclass}`)
    const lastIP = firstIP + IPclass - 1
    const copyArray = [...afterSplit]
    copyArray[3] = 0
    copyArray[2] = firstIP
    firstIPArray = copyArray
    calculation_text[3].innerHTML = (`IP firstResult ${afterSplit.join('.')} => ${firstIPArray.join('.')}`)
    calculation_text[4].innerHTML = (`Calculate IP : ${firstIP} + ${IPclass} - 1 = ${firstIP + IPclass - 1}`)
    const copyArray2 = [...afterSplit]
    copyArray2[3] = 255
    copyArray2[2] = lastIP
    lastIPArray = copyArray2
    calculation_text[5].innerHTML = (`IP lastResult ${afterSplit.join('.')} => ${lastIPArray.join('.')}`)
    calculation_text[6].innerHTML = ('NETWORK ID (firstResult) : ' + firstIPArray.join('.'))
    calculation_text[7].innerHTML = ('BROADCAST (lastResult) : '+ lastIPArray.join('.'))
    subnetMask = 256 - IPclass
    calculation_text[8].innerHTML = (`Subnet calculate : 256 - ${IPclass} = ${256 - IPclass}`)
    calculation_text[9].innerHTML = ('SUBNET MASK : 255.255.' + subnetMask + '.0')
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
    calculation_text[10].innerHTML = ('RANGE IP : ' + firstIPArray.join('.') + ' - ' + lastIPArray.join('.'))
    calculation_text[11].innerHTML = ('VALID HOST (Network ID + 1 ~ BROADCAST - 1): ' + usableHostIpRange.first.join('.') + ' - ' + usableHostIpRange.last.join('.'))
    const results = (
      `<div>
        <h3>Hasil</h3>
        <p>${('IP ADDRESS : ' + ip)}</p>
        <p>${('RANGE IP : ' + firstIPArray.join('.') + " - " + lastIPArray.join('.'))}</p>
        <p>${('VALID HOST (Network ID + 1 ~ BROADCAST - 1): ' + usableHostIpRange.first.join('.') + ' - ' + usableHostIpRange.last.join('.'))}</p>
        <p>${('NETWORK ID  : ' + firstIPArray.join('.'))}</p>
        <p>${('BROADCAST  : '+ lastIPArray.join('.'))}</p>
        <p>${('SUBNET MASK : 255.255.' + subnetMask + '.0')}</p>
      </div>`
    )
    calculateResult.innerHTML = results
    let end = window.performance.now();
    timeExecution.innerHTML = `Execution time: ${Math.floor(end - start)} ms`
  }
}
function handleInput(e){
  valueIp = e.target.value
  if(valueIp === '' || valueSubnet === ''){
    calculation_text.forEach(e=>{
      e.innerHTML = ''
      e.style.padding = '0'
    })
    calculateResult.innerHTML = ''
    desc.innerHTML = ''
    return
  }
  calculate(valueIp,valueSubnet)
}
function handleInputSubnet(e){
  valueSubnet = e.target.value
  if(valueIp === '' || valueSubnet === ''){
    calculation_text.forEach(e=>{
      e.innerHTML = ''
      e.style.padding = '0'
    })
    calculateResult.innerHTML = ''
    desc.innerHTML = ''
    return
  }
  calculate(valueIp,valueSubnet)
}
function handleCalculate(){
  if(valueIp === '' || valueSubnet === ''){
    calculation_text.forEach(e=>{
      e.innerHTML = ''
      e.style.padding = '0'
    })
    calculateResult.innerHTML = ''
    desc.innerHTML = ''
    return
  }
  calculate(valueIp,valueSubnet)
}
const inputIP = document.querySelector('.inputIp')
const inputSubnet = document.querySelector('.inputSubnet')
const calculateIp = document.querySelector('.calculate')
inputIP.addEventListener('input',handleInput)
inputSubnet.addEventListener('input',handleInputSubnet)
calculateIp.addEventListener('click',handleCalculate)
const calculateResult = document.querySelector('.calculateResult')
const calculation = document.querySelector('.calculation')
const calculation_text = document.querySelectorAll('.calculation_text')
const desc = document.querySelector('.desc')
const timeExecution = document.querySelector('.timeExecution')