// /////////////////////////////////////////////////////////////////
// Variables for hiding and showing
//////////////////////////////////////////////////////////////////
const buildingType = document.getElementById('building-type')
const apartments = document.getElementById('number-of-apartments')
const floors = document.getElementById('number-of-floors')
const basements = document.getElementById('number-of-basements')
const companies = document.getElementById('number-of-companies')
const parking = document.getElementById('number-of-parking-spots')
const elevators = document.getElementById('number-of-elevators')
const corporations = document.getElementById('number-of-corporations')
const occupancy = document.getElementById('maximum-occupancy')
const hours = document.getElementById('business-hours')

//////////////////////////////////////////////////////////////
//Radio Quality Select buttons
//////////////////////////////////////////////////////////////
const quality = document.getElementById('quality')
const standard = document.getElementById('standard')
const premium = document.getElementById('premium')
const excelium = document.getElementById('excelium')

///////////////////////////////////////
// Input ID's
////////////////////////////////////////
const aptInput = document.getElementById('number-of-apartments-input')
const floorInput = document.getElementById('number-of-floors-input')
const basementInput = document.getElementById('number-of-basements-input')
const companyInput = document.getElementById('number-of-companies-input')
const parkingInput = document.getElementById('number-of-parking-spots-input')
const elevatorInput = document.getElementById('number-of-elevators-input')
const corpInput = document.getElementById('number-of-corporations-input')
const occInput = document.getElementById('maximum-occupancy-input')
const hourInput = document.getElementById('business-hours-input')




////////////////////////////////////////
// Output ID's
////////////////////////////////////////
const elevatorAmount = document.getElementById('elevator-amount-output')
const unitPrice = document.getElementById('elevator-unit-price-output')
const total = document.getElementById('elevator-total-price-output')
const installFees = document.getElementById('installation-fees-output')
const final = document.getElementById('final-price-output')



let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',  
  });



function displayBuildings(){
    buildingType.addEventListener('click', (e) => {
        resetValues()
        hideFields()
        if (e.target.id === 'residential') {
            resetValues()
            hideFields()
            displayResidential()
        }
        else if (e.target.id === 'commercial') {
            resetValues()
            hideFields()
            displayCommercial()
        }
        else if (e.target.id === 'corporate') {
            resetValues()
            hideFields()
            displayCorporate()
        }
        else if (e.target.id === 'hybrid') {
            resetValues()
            hideFields()
            displayHybrid()
        }
    })
}

/////////////////////////////////////////////////////
//functions to display various fields when selected
///////////////////////////////////////////////////


function displayResidential() {
    apartments.style.display = 'block'
    floors.style.display = 'block'
    basements.style.display = 'block'

    residentialElevatorAmount()
    residentialTotal()
}

function displayCommercial() {
    companies.style.display = 'block'
    floors.style.display = 'block'
    basements.style.display = 'block'
    parking.style.display = 'block'
    elevators.style.display = 'block'

    commercialElevatorAmount()
    commercialTotal()
}

function displayCorporate() {
    corporations.style.display = 'block'
    floors.style.display = 'block'
    basements.style.display = 'block'
    parking.style.display = 'block'
    occupancy.style.display = 'block'

    corpHybridElevatorAmount()
    corpHybridTotal()
}

function displayHybrid() {
    corporations.style.display = 'block'
    floors.style.display = 'block'
    basements.style.display = 'block'
    parking.style.display = 'block'
    occupancy.style.display = 'block'
    hours.style.display = 'block'

    corpHybridElevatorAmount()
    corpHybridTotal()
}



////////////////////////////////////////////////////
// reset values
///////////////////////////////////////////////////////  
function resetValues() {
    aptInput.value = ''
    floorInput.value = ''
    basementInput.value = ''
    companyInput.value = ''
    parkingInput.value = ''
    elevatorInput.value = ''
    corpInput.value = ''
    occInput.value = ''
    hourInput.value = ''

    standard.checked = false
    premium.checked = false
    excelium.checked = false

    elevatorAmount.value = ''
    unitPrice.value = ''
    total.value = ''
    installFees.value = ''
    final.value = ''
}

function resetOutputs() {
    total.value = ''
    final.value = ''
}

///////////////////////////////////////////////////////////////////
        // FUNCTIONALITY FOR HIDING AND SHOWING FIELDS
///////////////////////////////////////////////////////////////////
function hideFields(){
    apartments.style.display = 'none'
    floors.style.display = 'none'
    basements.style.display = 'none'
    companies.style.display = 'none'
    parking.style.display = 'none'
    elevators.style.display = 'none'
    corporations.style.display = 'none'
    occupancy.style.display = 'none'
    hours.style.display = 'none'
}


//////////////////////////////////////////////////////////////
// Quality Selected
/////////////////////////////////////////////////////////////////

function qualitySelection(){
    quality.addEventListener('click', (e) => {
        if(e.target.id === 'standard') {
            unitPrice.value = formatter.format(7565)
            installFees.value = 10 + '%'
        }
        else if(e.target.id === 'premium') {
            unitPrice.value = formatter.format(12345)
            installFees.value = 13 + '%'
        }
        else if(e.target.id === 'excelium') {
            unitPrice.value = formatter.format(15400)
            installFees.value = 16 + '%'
        }
    })
}
////////////////////////////////////////////////////////////////////
// COMMERCIAL CALCULATIONS
///////////////////////////////////////////////////////////////

function commercialElevatorAmount(){
    elevatorInput.addEventListener('input', () => {
        resetOutputs()
        elevatorAmount.value = elevatorInput.value
        totalCalc()
    })
}

function commercialTotal(){
    quality.addEventListener('click', () => { 
        totalCalc()
    })
}
/////////////////////////////////////////////////////////////////////////
// RESIDENTIAL CALCULATIONS
//////////////////////////////////////////////////////////////////////

function resElevatorCalc(){
    let avgApt = Number(floorInput.value) == 0 ? 0 : Math.ceil(Number(aptInput.value) / Number(floorInput.value))
    let shaft = Math.ceil(Number(avgApt) / 6)
    let column = Math.ceil(Number(floorInput.value) / 20)
    elevatorAmount.value = Number(shaft) * Number(column)
}

function residentialElevatorAmount(){
    aptInput.addEventListener('input', () => {
        resElevatorCalc()
        resetOutputs()
        totalCalc()
    })
    floorInput.addEventListener('input', () => {
        resElevatorCalc()
        resetOutputs()
        totalCalc()
    })
    
}

function residentialTotal(){
    quality.addEventListener('click', () => {
        totalCalc()
    })
}

/////////////////////////////////////////////////////////////
// CORPORATE AND HYBRID CALCULATIONS
///////////////////////////////////////////////////////////

function corpHybridElevatorCalc(){
    let stories = Number(floorInput.value) + Number(basementInput.value)
    let totalOccupants = Number(occInput.value) * stories
    let elevatorsRequired = Math.ceil(totalOccupants / 1000)
    let columns = Math.ceil(stories / 20)
    let elevatorsPerColumn = Math.ceil(elevatorsRequired / columns)
    elevatorAmount.value = elevatorsPerColumn * columns
}

function corpHybridElevatorAmount(){
    occInput.addEventListener('input', () => {
        corpHybridElevatorCalc()
        resetOutputs()
        totalCalc()
    })
    floorInput.addEventListener('input', () => {
        corpHybridElevatorCalc()
        resetOutputs()
        totalCalc()
    })
    basementInput.addEventListener('input', () => {
        corpHybridElevatorCalc()
        resetOutputs()
        totalCalc()
    })
}

function corpHybridTotal(){
    quality.addEventListener('click', () => {
        totalCalc()
    })
}


////////////////////////////////////////////////////////////////////////////////////////////
// TOTAL AND FINAL CALCULATIONS
//////////////////////////////////////////////////////////////////////////////////////////
function totalCalc() {
    total.value = formatter.format(elevatorAmount.value * Number(String(unitPrice.value).replace(/[^0-9.-]+/g,"")))
    let feesDec = Number(String(installFees.value).replace(/[^0-9.-]+/g,"")) / 100
    final.value = formatter.format(Number(total.value.replace(/[^0-9.-]+/g,"")) + (Number(total.value.replace(/[^0-9.-]+/g,"")) * feesDec))
}



qualitySelection()
hideFields()
displayBuildings()