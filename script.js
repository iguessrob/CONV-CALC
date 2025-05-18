// Conversion factors
const conversions = {
    length: {
        name: 'Length Conversion',
        icon: 'fas fa-ruler',
        units: {
            m: 'Meters (m)',
            km: 'Kilometers (km)',
            cm: 'Centimeters (cm)',
            mm: 'Millimeters (mm)',
            in: 'Inches (in)',
            ft: 'Feet (ft)',
            yd: 'Yards (yd)',
            mi: 'Miles (mi)'
        },
        factors: {
            m: 1,
            km: 1000,
            cm: 0.01,
            mm: 0.001,
            in: 0.0254,
            ft: 0.3048,
            yd: 0.9144,
            mi: 1609.344
        }
    },
    mass: {
        name: 'Mass Conversion',
        icon: 'fas fa-weight-hanging',
        units: {
            kg: 'Kilograms (kg)',
            g: 'Grams (g)',
            mg: 'Milligrams (mg)',
            lb: 'Pounds (lb)',
            oz: 'Ounces (oz)'
        },
        factors: {
            kg: 1,
            g: 0.001,
            mg: 0.000001,
            lb: 0.45359237,
            oz: 0.028349523125
        }
    },
    time: {
        name: 'Time Conversion',
        icon: 'fas fa-clock',
        units: {
            s: 'Seconds (s)',
            min: 'Minutes (min)',
            h: 'Hours (h)',
            day: 'Days (day)'
        },
        factors: {
            s: 1,
            min: 60,
            h: 3600,
            day: 86400
        }
    },
    volume: {
        name: 'Volume Conversion',
        icon: 'fas fa-cube',
        units: {
            m3: 'Cubic Meters (m³)',
            cm3: 'Cubic Centimeters (cm³)',
            in3: 'Cubic Inches (in³)',
            ft3: 'Cubic Feet (ft³)',
            gal: 'Gallons (gal)',
            l: 'Liters (l)',
            ml: 'Milliliters (ml)'
        },
        factors: {
            m3: 1,
            cm3: 0.000001,
            in3: 0.0000163871,
            ft3: 0.0283168,
            gal: 0.00378541,
            l: 0.001,
            ml: 0.000001
        }
    },
    speed: {
        name: 'Speed Conversion',
        icon: 'fas fa-tachometer-alt',
        units: {
            mps: 'Meters per second (m/s)',
            kmph: 'Kilometers per hour (km/h)',
            mph: 'Miles per hour (mph)',
            fps: 'Feet per second (ft/s)',
            knot: 'Knot (kn)'
        },
        factors: {
            mps: 1,
            kmph: 1 / 3.6,
            mph: 0.44704,
            fps: 0.3048,
            knot: 0.514444
        }
    },
    force: {
        name: 'Force Conversion',
        icon: 'fas fa-atom',
        units: {
            N: 'Newton (N)',
            dyn: 'Dyne (dyn)',
            lbf: 'Pound-force (lbf)',
            kgf: 'Kilogram-force (kgf)'
        },
        factors: {
            N: 1,
            dyn: 0.00001,
            lbf: 4.44822,
            kgf: 9.80665
        }
    },
    pressure: {
        name: 'Pressure Conversion',
        icon: 'fas fa-compress',
        units: {
            Pa: 'Pascal (Pa)',
            kPa: 'Kilopascal (kPa)',
            psi: 'Pound-force per square inch (psi)',
            atm: 'Atmosphere (atm)',
            bar: 'Bar (bar)',
            mmHg: 'Millimeters of mercury (mmHg)'
        },
        factors: {
            Pa: 1,
            kPa: 1000,
            psi: 6894.76,
            atm: 101325,
            bar: 100000,
            mmHg: 133.322
        }
    },
    energy: {
        name: 'Energy Conversion',
        icon: 'fas fa-bolt',
        units: {
            J: 'Joule (J)',
            kJ: 'Kilojoule (kJ)',
            cal: 'Calorie (cal)',
            kcal: 'Kilocalorie (kcal)',
            Wh: 'Watt-hour (Wh)',
            kWh: 'Kilowatt-hour (kWh)',
            eV: 'Electronvolt (eV)'
        },
        factors: {
            J: 1,
            kJ: 1000,
            cal: 4.184,
            kcal: 4184,
            Wh: 3600,
            kWh: 3600000,
            eV: 1.60218e-19
        }
    },
    power: {
        name: 'Power Conversion',
        icon: 'fas fa-plug',
        units: {
            W: 'Watt (W)',
            kW: 'Kilowatt (kW)',
            hp: 'Horsepower (hp)',
            ftp: 'Foot-pound per minute (ft-lb/min)',
            BTU: 'British Thermal Unit per hour (BTU/h)'
        },
        factors: {
            W: 1,
            kW: 1000,
            hp: 745.7,
            ftp: 0.022597,
            BTU: 0.293071
        }
    },
    temperature: {
        name: 'Temperature Conversion',
        icon: 'fas fa-temperature-low',
        units: {
            c: 'Celsius (°C)',
            f: 'Fahrenheit (°F)',
            k: 'Kelvin (K)'
        },
        // Temperature needs special handling, factors are not simple multipliers
        factors: null
    }
};

let currentConversionType = 'length'; // Default type

// Function to update the UI based on the selected conversion type
function updateConversionUI(type) {
    currentConversionType = type;
    const conversionData = conversions[type];
    const dynamicConversionDiv = document.getElementById('dynamicConversion');

    // Add fading-out class to start animation
    dynamicConversionDiv.classList.add('fading-out');

    // Wait for the animation to finish before updating content
    setTimeout(() => {
        // Update title and icon
        document.getElementById('conversionTitle').innerHTML = `<i class="${conversionData.icon}"></i> ${conversionData.name}`;

        // Populate unit dropdowns
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

        // Set default selections (e.g., first two units)
        if (Object.keys(conversionData.units).length >= 2) {
            fromUnitSelect.value = Object.keys(conversionData.units)[0];
            toUnitSelect.value = Object.keys(conversionData.units)[1];
        } else if (Object.keys(conversionData.units).length === 1) {
             fromUnitSelect.value = Object.keys(conversionData.units)[0];
            toUnitSelect.value = Object.keys(conversionData.units)[0];
        }

        // Clear input and result
        document.getElementById('inputValue').value = '';
        document.getElementById('conversionResult').innerHTML = '<p>Result will appear here</p>';
        document.getElementById('computationBreakdown').classList.remove('show'); // Hide breakdown on type change

        // Remove fading-out class to start fade-in animation
        dynamicConversionDiv.classList.remove('fading-out');
    }, 400); // Match this delay with the CSS transition duration
}

// Generic conversion function for real-time updates
function convert() {
    const inputValueElement = document.getElementById('inputValue');
    const inputValue = parseFloat(inputValueElement.value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultElement = document.getElementById('conversionResult');
    const conversionData = conversions[currentConversionType];
    const breakdownElement = document.getElementById('computationBreakdown');

    // Clear result and breakdown if input is empty
    if (!inputValueElement.value || inputValueElement.value.trim() === '') {
        resultElement.innerHTML = '<p>Result will appear here</p>';
        breakdownElement.classList.remove('show');
        return;
    }

    if (isNaN(inputValue)) {
        resultElement.innerHTML = '<p>Please enter a valid number</p>';
        breakdownElement.classList.remove('show');
        return;
    }

    let result;
    let breakdownSteps = '';

    // Handle temperature conversion separately
    if (currentConversionType === 'temperature') {
        let baseValueKelvin;

        // Convert from the input unit to Kelvin (base unit)
        if (fromUnit === 'c') {
            baseValueKelvin = inputValue + 273.15; // Celsius to Kelvin
            breakdownSteps += `<p>Convert ${inputValue} °C to Kelvin: ${inputValue} + 273.15 = ${baseValueKelvin.toFixed(6)} K</p>`;
        } else if (fromUnit === 'f') {
            baseValueKelvin = (inputValue - 32) * 5/9 + 273.15; // Fahrenheit to Kelvin
            breakdownSteps += `<p>Convert ${inputValue} °F to Kelvin: (${inputValue} - 32) * 5/9 + 273.15 = ${baseValueKelvin.toFixed(6)} K</p>`;
        } else if (fromUnit === 'k') {
            baseValueKelvin = inputValue; // Kelvin to Kelvin (no change)
             breakdownSteps += `<p>Input value is already in Kelvin: ${inputValue} K</p>`;
        }

        // Convert from Kelvin (base unit) to the target unit
        if (toUnit === 'c') {
            result = baseValueKelvin - 273.15; // Kelvin to Celsius
             breakdownSteps += `<p>Convert ${baseValueKelvin.toFixed(6)} K to Celsius: ${baseValueKelvin.toFixed(6)} - 273.15 = ${result.toFixed(6)} °C</p>`;
        } else if (toUnit === 'f') {
            result = (baseValueKelvin - 273.15) * 9/5 + 32; // Kelvin to Fahrenheit
             breakdownSteps += `<p>Convert ${baseValueKelvin.toFixed(6)} K to Fahrenheit: (${baseValueKelvin.toFixed(6)} - 273.15) * 9/5 + 32 = ${result.toFixed(6)} °F</p>`;
        } else if (toUnit === 'k') {
            result = baseValueKelvin; // Kelvin to Kelvin (no change)
             breakdownSteps += `<p>Target unit is Kelvin: ${baseValueKelvin.toFixed(6)} K</p>`;
        }

         resultElement.innerHTML = `<p>${inputValue} ${conversionData.units[fromUnit]} = ${result.toFixed(6)} ${conversionData.units[toUnit]}</p>`;

        // Display computation breakdown for temperature
        breakdownElement.innerHTML = `
            <p><strong>Computation Breakdown:</strong></p>
            ${breakdownSteps}
        `;
        breakdownElement.classList.add('show');

    } else {
        // Handle linear conversions (all other types)
        // Convert to base unit then to target unit
        const baseValue = inputValue * conversionData.factors[fromUnit];
        result = baseValue / conversionData.factors[toUnit];

        resultElement.innerHTML = `<p>${inputValue} ${conversionData.units[fromUnit]} = ${result.toFixed(6)} ${conversionData.units[toUnit]}</p>`;

        // Display computation breakdown for linear conversions
        breakdownElement.innerHTML = `
            <p><strong>Computation Breakdown:</strong></p>
            <p>1. Convert from ${conversionData.units[fromUnit]} to base unit (${Object.keys(conversionData.factors)[0]}):</p>
            <p>${inputValue} ${conversionData.units[fromUnit]} * ${conversionData.factors[fromUnit]} = ${baseValue.toFixed(6)} ${Object.keys(conversionData.factors)[0]}</p>
            <p>2. Convert from base unit (${Object.keys(conversionData.factors)[0]}) to ${conversionData.units[toUnit]}:</p>
            <p>${baseValue.toFixed(6)} ${Object.keys(conversionData.factors)[0]} / ${conversionData.factors[toUnit]} = ${result.toFixed(6)} ${conversionData.units[toUnit]}</p>
        `;
        breakdownElement.classList.add('show');
    }

     // Hide breakdown if input is not a valid number
    if (isNaN(inputValue) || inputValueElement.value.trim() === '') {
        breakdownElement.classList.remove('show');
    }
}

// Swap units function (re-written to be generic)
function swapUnits() {
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    const tempUnit = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = tempUnit;
    convert(); // Perform conversion after swapping
}

// Initialize UI and attach event listeners
document.addEventListener('DOMContentLoaded', function() {
    const typeButtons = document.querySelectorAll('.type-button');
    const inputValue = document.getElementById('inputValue');
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    const swapButton = document.querySelector('.swap-button');

    // Add event listeners to type buttons
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateConversionUI(this.getAttribute('data-type'));
            // convert(); // Removed automatic conversion on type change
        });
    });

    // Add event listeners for input and select changes for real-time conversion
    inputValue.addEventListener('input', convert);
    fromUnitSelect.addEventListener('change', convert);
    toUnitSelect.addEventListener('change', convert);

    // Add event listener for swap button
    swapButton.addEventListener('click', swapUnits);

    // Input validation to prevent negative values
    inputValue.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });

    // Initial UI setup (default to length)
    updateConversionUI('length');
}); 