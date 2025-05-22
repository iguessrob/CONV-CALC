// This object stores all the necessary information for each conversion type.
// 'name': User-friendly name for the conversion type.
// 'icon': Font Awesome icon class for visual representation.
// 'units': An object mapping unit abbreviations (e.g., 'm') to their full names (e.g., 'Meters (m)').
// 'factors': For most units, this object maps unit abbreviations to their conversion factor relative to a common base unit.
//            For example, in 'length', 'm' is the base (factor 1), and 'km' is 1000 (meaning 1 km = 1000 m).
//            Temperature is a special case and doesn't use simple factors.
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
        factors: { // Base unit: meter
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
        factors: { // Base unit: kilogram
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
        factors: { // Base unit: second
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
            l: 'Liters (l)', // Liter is a common base for many, but SI is m³
            ml: 'Milliliters (ml)',
            gal: 'Gallons (US gal)',
            ft3: 'Cubic Feet (ft³)',
            in3: 'Cubic Inches (in³)'
        },
        factors: { // Base unit: cubic meter (m³)
            m3: 1,
            cm3: 0.000001, // 1 cm³ = 1e-6 m³
            l: 0.001,      // 1 Liter = 0.001 m³
            ml: 0.000001,  // 1 mL = 1e-6 m³
            gal: 0.00378541, // 1 US Gallon = 0.00378541 m³
            ft3: 0.0283168,  // 1 ft³ = 0.0283168 m³
            in3: 0.0000163871 // 1 in³ = 1.63871e-5 m³
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
        factors: { // Base unit: meters per second (m/s)
            mps: 1,
            kmph: 1 / 3.6, // 1 km/h = 0.277... m/s
            mph: 0.44704,  // 1 mph = 0.44704 m/s
            fps: 0.3048,   // 1 ft/s = 0.3048 m/s
            knot: 0.514444 // 1 knot = 0.514444 m/s
        }
    },
    force: {
        name: 'Force Conversion',
        icon: 'fas fa-atom', // Note: fas fa-hand-fist or similar might be more intuitive for Force
        units: {
            N: 'Newton (N)',
            dyn: 'Dyne (dyn)',
            lbf: 'Pound-force (lbf)',
            kgf: 'Kilogram-force (kgf)'
        },
        factors: { // Base unit: Newton (N)
            N: 1,
            dyn: 0.00001,     // 1 dyne = 1e-5 N
            lbf: 4.44822,     // 1 lbf ≈ 4.44822 N
            kgf: 9.80665      // 1 kgf = 9.80665 N
        }
    },
    pressure: {
        name: 'Pressure Conversion',
        icon: 'fas fa-compress',
        units: {
            Pa: 'Pascal (Pa)',
            kPa: 'Kilopascal (kPa)',
            psi: 'Pounds per square inch (psi)',
            atm: 'Atmosphere (atm)',
            bar: 'Bar (bar)',
            mmHg: 'Millimeters of mercury (mmHg)'
        },
        factors: { // Base unit: Pascal (Pa)
            Pa: 1,
            kPa: 1000,        // 1 kPa = 1000 Pa
            psi: 6894.76,     // 1 psi ≈ 6894.76 Pa
            atm: 101325,      // 1 atm = 101325 Pa
            bar: 100000,      // 1 bar = 100000 Pa
            mmHg: 133.322     // 1 mmHg ≈ 133.322 Pa
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
        factors: { // Base unit: Joule (J)
            J: 1,
            kJ: 1000,         // 1 kJ = 1000 J
            cal: 4.184,       // 1 cal ≈ 4.184 J (thermochemical calorie)
            kcal: 4184,       // 1 kcal = 4184 J
            Wh: 3600,         // 1 Wh = 3600 J
            kWh: 3600000,     // 1 kWh = 3,600,000 J
            eV: 1.60218e-19   // 1 eV ≈ 1.60218 × 10⁻¹⁹ J
        }
    },
    power: {
        name: 'Power Conversion',
        icon: 'fas fa-plug',
        units: {
            W: 'Watt (W)',
            kW: 'Kilowatt (kW)',
            hp: 'Horsepower (hp)', // Mechanical horsepower
            BTUh: 'BTU per hour (BTU/h)' // Corrected from BTU to BTUh for power
        },
        factors: { // Base unit: Watt (W)
            W: 1,
            kW: 1000,         // 1 kW = 1000 W
            hp: 745.7,        // 1 hp (mechanical) ≈ 745.7 W
            BTUh: 0.293071    // 1 BTU/h ≈ 0.293071 W
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
        // Temperature conversions use specific formulas, not simple factors.
        // These are handled directly in the `convert` function.
        factors: null // Indicates special handling is needed
    }
};

// Helper object for temperature conversion formulas.
// Keys are in 'fromUnit-toUnit' format.
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


// Keeps track of the currently selected conversion type (e.g., 'length', 'mass').
let currentConversionType = 'length'; // Default to 'length' on page load.

// This function is responsible for updating the user interface (UI)
// when a new conversion type is selected.
function updateConversionUI(type) {
    currentConversionType = type; // Update the global variable.
    const conversionData = conversions[type]; // Get data for the selected type.
    const dynamicConversionDiv = document.getElementById('dynamicConversion');

    // To make the transition smooth, we first fade out the current content.
    dynamicConversionDiv.classList.add('fading-out');

    // We wait for the fade-out animation (defined in CSS) to complete
    // before updating the content and fading it back in.
    setTimeout(() => {
        // Update the title and icon of the conversion section.
        document.getElementById('conversionTitle').innerHTML = `<i class="${conversionData.icon}"></i> ${conversionData.name}`;

        // Get references to the 'from' and 'to' unit dropdowns.
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        // Clear any existing options from the dropdowns.
        fromUnitSelect.innerHTML = '';
        toUnitSelect.innerHTML = '';

        // Populate the dropdowns with units relevant to the selected conversion type.
        for (const unit in conversionData.units) {
            // Create a new <option> element for the 'from' dropdown.
            const option1 = document.createElement('option');
            option1.value = unit; // The abbreviation (e.g., 'm') is the value.
            option1.textContent = conversionData.units[unit]; // The full name (e.g., 'Meters (m)') is displayed.
            fromUnitSelect.appendChild(option1);

            // Create a similar <option> for the 'to' dropdown.
            const option2 = document.createElement('option');
            option2.value = unit;
            option2.textContent = conversionData.units[unit];
            toUnitSelect.appendChild(option2);
        }

        // Set default selected units in the dropdowns.
        // Typically, the first unit for 'from' and the second for 'to'.
        if (Object.keys(conversionData.units).length >= 2) {
            fromUnitSelect.value = Object.keys(conversionData.units)[0];
            toUnitSelect.value = Object.keys(conversionData.units)[1];
        } else if (Object.keys(conversionData.units).length === 1) {
            // If there's only one unit (less common), select it for both.
            fromUnitSelect.value = Object.keys(conversionData.units)[0];
            toUnitSelect.value = Object.keys(conversionData.units)[0];
        }

        // Clear the input field and reset result/breakdown/formula areas.
        document.getElementById('inputValue').value = '';
        document.getElementById('conversionResult').innerHTML = '<p>Answer will appear here.</p>';
        
        const formulaDisplayElement = document.getElementById('formulaDisplay');
        formulaDisplayElement.innerHTML = '<p>Formula used will appear here.</p>';
        formulaDisplayElement.classList.remove('show');

        const breakdownElement = document.getElementById('computationBreakdown');
        breakdownElement.innerHTML = '<p>Solution will appear here.</p>';
        breakdownElement.classList.remove('show');

        // After updating content, remove the 'fading-out' class to trigger fade-in animation.
        dynamicConversionDiv.classList.remove('fading-out');
    }, 400); // This delay should match the CSS transition duration for opacity/transform.
}

// This is the core function that performs the unit conversion.
// It's called whenever the input value or selected units change.
function convert() {
    // Get references to the HTML elements involved in the conversion.
    const inputValueElement = document.getElementById('inputValue');
    const inputValue = parseFloat(inputValueElement.value); // Convert input string to a number.
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultElement = document.getElementById('conversionResult');
    const formulaDisplayElement = document.getElementById('formulaDisplay');
    const breakdownElement = document.getElementById('computationBreakdown');
    const conversionData = conversions[currentConversionType];

    // If the input field is empty, reset displays to placeholders and hide details.
    if (!inputValueElement.value || inputValueElement.value.trim() === '') {
        resultElement.innerHTML = '<p>Enter a value to convert.</p>';
        formulaDisplayElement.innerHTML = '<p>Formula used will appear here.</p>';
        formulaDisplayElement.classList.remove('show');
        breakdownElement.innerHTML = '<p>Solution will appear here.</p>';
        breakdownElement.classList.remove('show');
        return; // Stop further processing.
    }

    // If the input is not a valid number (e.g., text), show an error.
    if (isNaN(inputValue)) {
        resultElement.innerHTML = '<p>Please enter a valid number.</p>';
        formulaDisplayElement.innerHTML = '<p>Formula used will appear here.</p>';
        formulaDisplayElement.classList.remove('show');
        breakdownElement.innerHTML = '<p>Solution will appear here.</p>';
        breakdownElement.classList.remove('show');
        return; // Stop further processing.
    }

    let result;
    let formulaString = '<p><strong>Formula:</strong></p>';
    let breakdownSteps = '';

    // Temperature conversion requires special formulas, not simple factors.
    if (currentConversionType === 'temperature') {
        let baseValueKelvin; // We'll use Kelvin as an intermediate step for some conversions if needed.

        // Construct the formula string for display.
        const formulaKey = `${fromUnit}-${toUnit}`;
        if (temperatureFormulas[formulaKey]) {
            formulaString += `<p>${temperatureFormulas[formulaKey]}</p>`;
        } else {
            formulaString += '<p>Direct formula not available for this specific temperature conversion.</p>';
        }

        // Perform the conversion and build breakdown steps.
        // Step 1: Convert input from 'fromUnit' to Kelvin (if not already Kelvin).
        // This is mostly for internal consistency in the breakdown, direct formulas are preferred for calculation.
        if (fromUnit === 'c') { // Celsius
            if (toUnit === 'f') result = (inputValue * 9/5) + 32;
            else if (toUnit === 'k') result = inputValue + 273.15;
            else result = inputValue; // c to c
            // Breakdown example
            breakdownSteps += `<p>Starting with ${inputValue}°C.</p>`;
            if (toUnit === 'f') breakdownSteps += `<p>Apply °F = (°C × 9/5) + 32: (${inputValue} × 9/5) + 32 = ${result.toFixed(4)}°F</p>`;
            if (toUnit === 'k') breakdownSteps += `<p>Apply K = °C + 273.15: ${inputValue} + 273.15 = ${result.toFixed(4)}K</p>`;

        } else if (fromUnit === 'f') { // Fahrenheit
            if (toUnit === 'c') result = (inputValue - 32) * 5/9;
            else if (toUnit === 'k') result = (inputValue - 32) * 5/9 + 273.15;
            else result = inputValue; // f to f
            breakdownSteps += `<p>Starting with ${inputValue}°F.</p>`;
            if (toUnit === 'c') breakdownSteps += `<p>Apply °C = (°F − 32) × 5/9: (${inputValue} - 32) × 5/9 = ${result.toFixed(4)}°C</p>`;
            if (toUnit === 'k') breakdownSteps += `<p>Apply K = ((°F − 32) × 5/9) + 273.15: ((${inputValue} - 32) × 5/9) + 273.15 = ${result.toFixed(4)}K</p>`;

        } else if (fromUnit === 'k') { // Kelvin
            if (toUnit === 'c') result = inputValue - 273.15;
            else if (toUnit === 'f') result = (inputValue - 273.15) * 9/5 + 32;
            else result = inputValue; // k to k
            breakdownSteps += `<p>Starting with ${inputValue}K.</p>`;
            if (toUnit === 'c') breakdownSteps += `<p>Apply °C = K − 273.15: ${inputValue} - 273.15 = ${result.toFixed(4)}°C</p>`;
            if (toUnit === 'f') breakdownSteps += `<p>Apply °F = ((K − 273.15) × 9/5) + 32: ((${inputValue} - 273.15) × 9/5) + 32 = ${result.toFixed(4)}°F</p>`;
        }
        
        // If fromUnit is same as toUnit, breakdown is simpler
        if (fromUnit === toUnit) {
            breakdownSteps = `<p>${inputValue} ${conversionData.units[fromUnit]} remains ${result.toFixed(4)} ${conversionData.units[toUnit]}. No conversion needed.</p>`;
        }


    } else { // For all other conversion types (length, mass, etc.) that use factors.
        // Step 1: Convert the input value from 'fromUnit' to the base unit.
        // The 'factor' is how many base units are in one 'fromUnit'.
        // Example: if fromUnit is 'km' (1000m) and inputValue is 2, baseValue is 2 * 1000 = 2000m.
        const factorFrom = conversionData.factors[fromUnit];
        const factorTo = conversionData.factors[toUnit];
        const baseValue = inputValue * factorFrom;

        // Step 2: Convert the value from the base unit to the 'toUnit'.
        // Example: if baseValue is 2000m and toUnit is 'cm' (0.01m), result is 2000 / 0.01 = 200000cm.
        result = baseValue / factorTo;

        // Construct the formula string for display.
        // Using unit symbols for brevity in the formula itself.
        formulaString += `<p>${toUnit} = (${fromUnit} × ${factorFrom}) / ${factorTo}</p>`;
        if (fromUnit === toUnit) {
             formulaString += `<p><em>Since units are the same, the value doesn't change.</em></p>`;
        } else {
             formulaString += `<p>Where ${fromUnit} is the value in ${conversionData.units[fromUnit]},</p>`;
             formulaString += `<p>${factorFrom} is the factor to convert ${conversionData.units[fromUnit]} to the base unit,</p>`;
             formulaString += `<p>and ${factorTo} is the factor to convert ${conversionData.units[toUnit]} to the base unit.</p>`;
        }

        // Build the breakdown steps for linear conversions.
        const baseUnitSymbol = Object.keys(conversionData.factors).find(key => conversionData.factors[key] === 1) || 'base units'; // Try to find base unit symbol
        
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

    // Display the final converted result, limiting to a reasonable number of decimal places.
    resultElement.innerHTML = `<p>${inputValue} ${conversionData.units[fromUnit]} = <strong>${result.toFixed(6)} ${conversionData.units[toUnit]}</strong></p>`;

    // Display the formula used.
    formulaDisplayElement.innerHTML = formulaString;
    formulaDisplayElement.classList.add('show'); // Make it visible.

    // Display the computation breakdown.
    breakdownElement.innerHTML = `
        <p><strong>Solution:</strong></p>
        ${breakdownSteps}
    `;
    breakdownElement.classList.add('show'); // Make it visible.
}


// This function swaps the 'from' and 'to' units and then re-calculates the conversion.
function swapUnits() {
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    
    // A simple way to swap values of two variables.
    const tempUnit = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = tempUnit;
    
    convert(); // After swapping, perform the conversion again.
}

// This function runs once the entire HTML document is fully loaded and parsed.
// It's used to set up initial UI elements and attach event listeners.
document.addEventListener('DOMContentLoaded', function() {
    // Get all buttons used for selecting conversion types.
    const typeButtons = document.querySelectorAll('.type-button');
    // Get references to input and select elements.
    const inputValueElement = document.getElementById('inputValue');
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    const swapButton = document.querySelector('.swap-button');

    // Add a click event listener to each conversion type button.
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // When a button is clicked, first remove 'active' class from all type buttons.
            typeButtons.forEach(btn => btn.classList.remove('active'));
            // Then, add 'active' class to the clicked button to highlight it.
            this.classList.add('active');
            // Update the UI to reflect the newly selected conversion type.
            updateConversionUI(this.getAttribute('data-type'));
            // Optional: Trigger conversion if there's an existing input value.
            // if (inputValueElement.value) convert(); 
        });
    });

    // Add event listeners to automatically convert when input value or units change.
    inputValueElement.addEventListener('input', convert); // Triggers on every keystroke/change in input.
    fromUnitSelect.addEventListener('change', convert);   // Triggers when 'from' unit is changed.
    toUnitSelect.addEventListener('change', convert);     // Triggers when 'to' unit is changed.

    // Add event listener to the swap button.
    swapButton.addEventListener('click', swapUnits);

    // Simple input validation: prevent negative numbers from being entered.
    // While physics might involve negative values (e.g., temperature),
    // for many basic unit conversions, non-negative inputs are typical.
    // Temperature conversions handle negatives correctly regardless.
    inputValueElement.addEventListener('input', function() {
        if (currentConversionType !== 'temperature' && this.value < 0) {
            this.value = ''; // Or set to 0: this.value = 0;
        }
    });

    // Initialize the UI with the default conversion type (length).
    updateConversionUI('length');
});