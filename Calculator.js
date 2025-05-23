// This object stores all the necessary information for each conversion type.
// ... (conversions object remains the same as you provided) ...
const conversions = {
    length: {
        name: 'Length Conversion',
        icon: 'fas fa-ruler',
        units: { m: 'Meters (m)', km: 'Kilometers (km)', cm: 'Centimeters (cm)', mm: 'Millimeters (mm)', in: 'Inches (in)', ft: 'Feet (ft)', yd: 'Yards (yd)', mi: 'Miles (mi)'},
        factors: { m: 1, km: 1000, cm: 0.01, mm: 0.001, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 }
    },
    mass: {
        name: 'Mass Conversion',
        icon: 'fas fa-weight-hanging',
        units: { kg: 'Kilograms (kg)', g: 'Grams (g)', mg: 'Milligrams (mg)', lb: 'Pounds (lb)', oz: 'Ounces (oz)'},
        factors: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.45359237, oz: 0.028349523125 }
    },
    time: {
        name: 'Time Conversion',
        icon: 'fas fa-clock',
        units: { s: 'Seconds (s)', min: 'Minutes (min)', h: 'Hours (h)', day: 'Days (day)'},
        factors: { s: 1, min: 60, h: 3600, day: 86400 }
    },
    volume: {
        name: 'Volume Conversion',
        icon: 'fas fa-cube',
        units: { m3: 'Cubic Meters (m³)', cm3: 'Cubic Centimeters (cm³)', l: 'Liters (l)', ml: 'Milliliters (ml)', gal: 'Gallons (US gal)', ft3: 'Cubic Feet (ft³)', in3: 'Cubic Inches (in³)'},
        factors: { m3: 1, cm3: 1e-6, l: 0.001, ml: 1e-6, gal: 0.00378541, ft3: 0.0283168, in3: 0.0000163871}
    },
    speed: {
        name: 'Speed Conversion',
        icon: 'fas fa-tachometer-alt',
        units: { mps: 'Meters per second (m/s)', kmph: 'Kilometers per hour (km/h)', mph: 'Miles per hour (mph)', fps: 'Feet per second (ft/s)', knot: 'Knot (kn)'},
        factors: { mps: 1, kmph: 1 / 3.6, mph: 0.44704, fps: 0.3048, knot: 0.514444 }
    },
    force: {
        name: 'Force Conversion',
        icon: 'fas fa-atom',
        units: { N: 'Newton (N)', dyn: 'Dyne (dyn)', lbf: 'Pound-force (lbf)', kgf: 'Kilogram-force (kgf)'},
        factors: { N: 1, dyn: 1e-5, lbf: 4.44822, kgf: 9.80665 }
    },
    pressure: {
        name: 'Pressure Conversion',
        icon: 'fas fa-compress',
        units: { Pa: 'Pascal (Pa)', kPa: 'Kilopascal (kPa)', psi: 'Pounds per square inch (psi)', atm: 'Atmosphere (atm)', bar: 'Bar (bar)', mmHg: 'Millimeters of mercury (mmHg)'},
        factors: { Pa: 1, kPa: 1000, psi: 6894.76, atm: 101325, bar: 100000, mmHg: 133.322 }
    },
    energy: {
        name: 'Energy Conversion',
        icon: 'fas fa-bolt',
        units: { J: 'Joule (J)', kJ: 'Kilojoule (kJ)', cal: 'Calorie (cal)', kcal: 'Kilocalorie (kcal)', Wh: 'Watt-hour (Wh)', kWh: 'Kilowatt-hour (kWh)', eV: 'Electronvolt (eV)'},
        factors: { J: 1, kJ: 1000, cal: 4.184, kcal: 4184, Wh: 3600, kWh: 3600000, eV: 1.60218e-19 }
    },
    power: {
        name: 'Power Conversion',
        icon: 'fas fa-plug',
        units: { W: 'Watt (W)', kW: 'Kilowatt (kW)', hp: 'Horsepower (hp)', BTUh: 'BTU per hour (BTU/h)'},
        factors: { W: 1, kW: 1000, hp: 745.7, BTUh: 0.293071 }
    },
    temperature: {
        name: 'Temperature Conversion',
        icon: 'fas fa-temperature-low',
        units: { c: 'Celsius (°C)', f: 'Fahrenheit (°F)', k: 'Kelvin (K)'},
        factors: null
    }
};

const temperatureFormulas = {
    'c-f': '°F = (°C × 9/5) + 32',
    'f-c': '°C = (°F − 32) × 5/9',
    'c-k': 'K = °C + 273.15',
    'k-c': '°C = K − 273.15',
    'f-k': 'K = ((°F − 32) × 5/9) + 273.15',
    'k-f': '°F = ((K − 273.15) × 9/5) + 32',
    'c-c': '°C₁ = °C₂ (No change)',
    'f-f': '°F₁ = °F₂ (No change)',
    'k-k': 'K₁ = K₂ (No change)'
};

let currentConversionType = 'length';
let conversionChartInstance = null; // To store the Chart.js instance

function updateConversionUI(type) {
    currentConversionType = type;
    const conversionData = conversions[type];
    const dynamicConversionDiv = document.getElementById('dynamicConversion');

    dynamicConversionDiv.classList.add('fading-out');

    // Destroy existing chart if it exists
    if (conversionChartInstance) {
        conversionChartInstance.destroy();
        conversionChartInstance = null;
    }

    setTimeout(() => {
        document.getElementById('conversionTitle').innerHTML = `<i class="${conversionData.icon}"></i> ${conversionData.name}`;
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        fromUnitSelect.innerHTML = '';
        toUnitSelect.innerHTML = '';

        for (const unit in conversionData.units) {
            const option1 = document.createElement('option');
            option1.value = unit;
            option1.textContent = conversionData.units[unit];
            fromUnitSelect.appendChild(option1);
            const option2 = document.createElement('option');
            option2.value = unit;
            option2.textContent = conversionData.units[unit];
            toUnitSelect.appendChild(option2);
        }

        if (Object.keys(conversionData.units).length >= 2) {
            fromUnitSelect.value = Object.keys(conversionData.units)[0];
            toUnitSelect.value = Object.keys(conversionData.units)[1];
        } else if (Object.keys(conversionData.units).length === 1) {
            fromUnitSelect.value = Object.keys(conversionData.units)[0];
            toUnitSelect.value = Object.keys(conversionData.units)[0];
        }

        document.getElementById('inputValue').value = '';
        document.getElementById('conversionResult').innerHTML = '<p>Answer will appear here.</p>';
        
        const formulaDisplayElement = document.getElementById('formulaDisplay');
        formulaDisplayElement.innerHTML = '<p>Formula used will appear here.</p>';
        formulaDisplayElement.classList.remove('show');

        const breakdownElement = document.getElementById('computationBreakdown');
        breakdownElement.innerHTML = '<p>Solution will appear here.</p>';
        breakdownElement.classList.remove('show');

        // Hide chart and export button
        document.getElementById('chartDisplay').style.display = 'none';
        document.getElementById('exportButton').style.display = 'none';

        dynamicConversionDiv.classList.remove('fading-out');
        // Trigger a convert call if there's an initial value (optional, good for persistence if needed)
        // convert(); 
    }, 400);
}

function convert() {
    const inputValueElement = document.getElementById('inputValue');
    const inputValue = parseFloat(inputValueElement.value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultElement = document.getElementById('conversionResult');
    const formulaDisplayElement = document.getElementById('formulaDisplay');
    const breakdownElement = document.getElementById('computationBreakdown');
    const chartDisplayElement = document.getElementById('chartDisplay');
    const exportButtonElement = document.getElementById('exportButton');
    const conversionData = conversions[currentConversionType];

    const resetDisplays = () => {
        formulaDisplayElement.innerHTML = '<p>Formula used will appear here.</p>';
        formulaDisplayElement.classList.remove('show');
        breakdownElement.innerHTML = '<p>Solution will appear here.</p>';
        breakdownElement.classList.remove('show');
        chartDisplayElement.style.display = 'none';
        exportButtonElement.style.display = 'none';
        if (conversionChartInstance) {
            conversionChartInstance.destroy();
            conversionChartInstance = null;
        }
    };

    if (!inputValueElement.value || inputValueElement.value.trim() === '') {
        resultElement.innerHTML = '<p>Enter a value to convert.</p>';
        resetDisplays();
        return;
    }

    if (isNaN(inputValue)) {
        resultElement.innerHTML = '<p>Please enter a valid number.</p>';
        resetDisplays();
        return;
    }

    let result;
    let formulaString = '<p><strong>Formula:</strong></p>';
    let breakdownSteps = '';

    if (currentConversionType === 'temperature') {
        const formulaKey = `${fromUnit}-${toUnit}`;
        if (temperatureFormulas[formulaKey]) {
            formulaString += `<p>${temperatureFormulas[formulaKey]}</p>`;
        } else {
            formulaString += '<p>Direct formula not available for this specific temperature conversion.</p>';
        }

        if (fromUnit === 'c') {
            if (toUnit === 'f') result = (inputValue * 9/5) + 32;
            else if (toUnit === 'k') result = inputValue + 273.15;
            else result = inputValue;
            breakdownSteps += `<p>Starting with ${inputValue}°C.</p>`;
            if (toUnit === 'f') breakdownSteps += `<p class="indent">Apply °F = (°C × 9/5) + 32: (${inputValue} × 9/5) + 32 = ${result.toFixed(4)}°F</p>`;
            if (toUnit === 'k') breakdownSteps += `<p class="indent">Apply K = °C + 273.15: ${inputValue} + 273.15 = ${result.toFixed(4)}K</p>`;
        } else if (fromUnit === 'f') {
            if (toUnit === 'c') result = (inputValue - 32) * 5/9;
            else if (toUnit === 'k') result = (inputValue - 32) * 5/9 + 273.15;
            else result = inputValue;
            breakdownSteps += `<p>Starting with ${inputValue}°F.</p>`;
            if (toUnit === 'c') breakdownSteps += `<p class="indent">Apply °C = (°F − 32) × 5/9: (${inputValue} - 32) × 5/9 = ${result.toFixed(4)}°C</p>`;
            if (toUnit === 'k') breakdownSteps += `<p class="indent">Apply K = ((°F − 32) × 5/9) + 273.15: ((${inputValue} - 32) × 5/9) + 273.15 = ${result.toFixed(4)}K</p>`;
        } else if (fromUnit === 'k') {
            if (toUnit === 'c') result = inputValue - 273.15;
            else if (toUnit === 'f') result = (inputValue - 273.15) * 9/5 + 32;
            else result = inputValue;
            breakdownSteps += `<p>Starting with ${inputValue}K.</p>`;
            if (toUnit === 'c') breakdownSteps += `<p class="indent">Apply °C = K − 273.15: ${inputValue} - 273.15 = ${result.toFixed(4)}°C</p>`;
            if (toUnit === 'f') breakdownSteps += `<p class="indent">Apply °F = ((K − 273.15) × 9/5) + 32: ((${inputValue} - 273.15) × 9/5) + 32 = ${result.toFixed(4)}°F</p>`;
        }
        if (fromUnit === toUnit) {
            breakdownSteps = `<p>${inputValue} ${conversionData.units[fromUnit]} remains ${result.toFixed(4)} ${conversionData.units[toUnit]}. No conversion needed.</p>`;
        }
    } else {
        const factorFrom = conversionData.factors[fromUnit];
        const factorTo = conversionData.factors[toUnit];
        const baseValue = inputValue * factorFrom;
        result = baseValue / factorTo;

        formulaString += `<p>${toUnit.toUpperCase()} = (${fromUnit.toUpperCase()} × Factor<sub>From</sub>) / Factor<sub>To</sub></p>`;
        if (fromUnit === toUnit) {
             formulaString += `<p><em>Since units are the same, the value doesn't change.</em></p>`;
        } else {
             formulaString += `<p>Where ${fromUnit.toUpperCase()} is the value in ${conversionData.units[fromUnit]},</p>`;
             formulaString += `<p>Factor<sub>From</sub> (${factorFrom}) converts ${conversionData.units[fromUnit]} to base units,</p>`;
             formulaString += `<p>Factor<sub>To</sub> (${factorTo}) converts ${conversionData.units[toUnit]} from base units.</p>`;
        }
        
        const baseUnitSymbol = Object.keys(conversionData.factors).find(key => conversionData.factors[key] === 1) || 'base units';
        if (fromUnit === toUnit) {
            breakdownSteps = `<p>${inputValue} ${conversionData.units[fromUnit]} = ${result.toFixed(6)} ${conversionData.units[toUnit]}.</p> <p>No conversion needed as units are the same.</p>`;
        } else {
            breakdownSteps = `
                <p>1. Convert from ${conversionData.units[fromUnit]} to base unit (${baseUnitSymbol}):</p>
                <p class="indent">${inputValue} ${fromUnit} × ${factorFrom} = ${baseValue.toFixed(6)} ${baseUnitSymbol}</p>
                <p>2. Convert from base unit (${baseUnitSymbol}) to ${conversionData.units[toUnit]}:</p>
                <p class="indent">${baseValue.toFixed(6)} ${baseUnitSymbol} / ${factorTo} = ${result.toFixed(6)} ${toUnit}</p>
            `;
        }
    }

    resultElement.innerHTML = `<p>${inputValue} ${conversionData.units[fromUnit]} = <strong>${result.toFixed(6)} ${conversionData.units[toUnit]}</strong></p>`;
    formulaDisplayElement.innerHTML = formulaString;
    formulaDisplayElement.classList.add('show');
    breakdownElement.innerHTML = `<p><strong>Solution:</strong></p>${breakdownSteps}`;
    breakdownElement.classList.add('show');

    // Update or create chart
    const chartCtx = document.getElementById('conversionChart').getContext('2d');
    const chartData = {
        labels: [`Input (${fromUnit})`, `Result (${toUnit})`],
        datasets: [{
            label: conversionData.name,
            data: [inputValue, result],
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)', // Blue for input
                'rgba(255, 99, 132, 0.7)'   // Red for result
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    };

    if (conversionChartInstance) {
        conversionChartInstance.data = chartData;
        conversionChartInstance.options.plugins.title.text = `${conversionData.name}: ${inputValue} ${fromUnit} → ${result.toFixed(4)} ${toUnit}`;
        conversionChartInstance.update();
    } else {
        conversionChartInstance = new Chart(chartCtx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: (currentConversionType !== 'temperature' || (inputValue >= 0 && result >=0)), // Adapt for temperature if values can be negative
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Dataset label is enough, or set to true if preferred
                    },
                    title: {
                        display: true,
                        text: `${conversionData.name}: ${inputValue} ${fromUnit} → ${result.toFixed(4)} ${toUnit}`,
                        font: { size: 14 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toFixed(4) + ' ' + context.label.match(/\(([^)]+)\)/)[1];
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
    chartDisplayElement.style.display = 'block';
    exportButtonElement.style.display = 'inline-flex'; // Or 'block' if preferred
}

function swapUnits() {
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    const tempUnit = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = tempUnit;
    convert();
}

function exportResults() {
    const inputValue = document.getElementById('inputValue').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const conversionData = conversions[currentConversionType];
    
    const resultText = document.getElementById('conversionResult').innerText;
    const formulaHtml = document.getElementById('formulaDisplay').innerHTML;
    const breakdownHtml = document.getElementById('computationBreakdown').innerHTML;

    // Simple text conversion from HTML for formula and breakdown
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = formulaHtml;
    const formulaText = tempDiv.innerText.replace(/^Formula:\s*/, '').trim(); // Cleaner text
    tempDiv.innerHTML = breakdownHtml;
    const breakdownText = tempDiv.innerText.replace(/^Solution:\s*/, '').trim(); // Cleaner text


    if (!inputValue || resultText.includes("Answer will appear here") || resultText.includes("Enter a value") || resultText.includes("valid number")) {
        alert("Please perform a valid conversion before exporting.");
        return;
    }

    const content = `
Unit Conversion Report
--------------------------------------
Conversion Type: ${conversionData.name}
Input: ${inputValue} ${conversionData.units[fromUnit]}
Converted To: ${conversionData.units[toUnit]}
Result: ${resultText.replace(`${inputValue} ${conversionData.units[fromUnit]} = `, '')} 
--------------------------------------
Formula Used:
${formulaText}
--------------------------------------
Solution Steps:
${breakdownText}
--------------------------------------
Exported on: ${new Date().toLocaleString()}
    `;

    const filename = `Conversion_${currentConversionType}_${inputValue}${fromUnit}_to_${toUnit}.txt`;
    const blob = new Blob([content.trim()], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}


document.addEventListener('DOMContentLoaded', function() {
    const typeButtons = document.querySelectorAll('.type-button');
    const inputValueElement = document.getElementById('inputValue');
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    const swapButton = document.querySelector('.swap-button');
    const exportButton = document.getElementById('exportButton');

    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateConversionUI(this.getAttribute('data-type'));
            // No automatic convert on type change unless an input value exists.
            // if (inputValueElement.value.trim() !== '') convert();
        });
    });

    inputValueElement.addEventListener('input', convert);
    fromUnitSelect.addEventListener('change', convert);
    toUnitSelect.addEventListener('change', convert);
    swapButton.addEventListener('click', swapUnits);
    exportButton.addEventListener('click', exportResults);

    inputValueElement.addEventListener('input', function() {
        if (currentConversionType !== 'temperature' && parseFloat(this.value) < 0) {
            this.value = ''; 
            // convert(); // Optionally re-trigger conversion to clear results
        }
    });

    updateConversionUI('length'); // Initialize with default
});