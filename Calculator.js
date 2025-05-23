
// DATA DEFINITIONS

/**
 * @constant conversions
 * @type {object}
 * @description This object stores all the necessary information for each conversion type.
 * Each key For example, 'length', 'mass') represents a distinct conversion category.
 *
 * For each category, it contains:
 *  - `name`: A user-friendly string for the conversion type For example, 'Length Conversion').
 *  - `icon`: A Font Awesome icon class string for visual representation in the UI For example, 'fas fa-ruler').
 *  - `units`: An object mapping unit abbreviations For example, 'm') to their full names and symbols For example, 'Meters (m)'.
 *             These are used to populate the unit selection dropdowns.
 *  - `factors`: For most unit types, this object maps unit abbreviations to their conversion factor
 *               relative to a defined base unit for that category. For example, in 'length', 'm' (meter)
 *               is the base (factor 1), and 'km' (kilometer) has a factor of 1000 (meaning 1 km = 1000 m).
 *               Temperature is a special case and uses `null` for factors, as its conversions involve formulas, not simple multipliers.
 */
const conversions = {
    length: {
        name: 'Length Conversion',
        icon: 'fas fa-ruler',
        units: { m: 'Meters (m)', km: 'Kilometers (km)', cm: 'Centimeters (cm)', mm: 'Millimeters (mm)', in: 'Inches (in)', ft: 'Feet (ft)', yd: 'Yards (yd)', mi: 'Miles (mi)'},
        factors: { m: 1, km: 1000, cm: 0.01, mm: 0.001, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 } // Base unit: meter
    },
    mass: {
        name: 'Mass Conversion',
        icon: 'fas fa-weight-hanging',
        units: { kg: 'Kilograms (kg)', g: 'Grams (g)', mg: 'Milligrams (mg)', lb: 'Pounds (lb)', oz: 'Ounces (oz)'},
        factors: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.45359237, oz: 0.028349523125 } // Base unit: kilogram
    },
    time: {
        name: 'Time Conversion',
        icon: 'fas fa-clock',
        units: { s: 'Seconds (s)', min: 'Minutes (min)', h: 'Hours (h)', day: 'Days (day)'},
        factors: { s: 1, min: 60, h: 3600, day: 86400 } // Base unit: second
    },
    volume: {
        name: 'Volume Conversion',
        icon: 'fas fa-cube',
        units: { m3: 'Cubic Meters (m³)', cm3: 'Cubic Centimeters (cm³)', l: 'Liters (l)', ml: 'Milliliters (ml)', gal: 'Gallons (US gal)', ft3: 'Cubic Feet (ft³)', in3: 'Cubic Inches (in³)'},
        factors: { m3: 1, cm3: 1e-6, l: 0.001, ml: 1e-6, gal: 0.00378541, ft3: 0.0283168, in3: 0.0000163871} // Base unit: cubic meter
    },
    speed: {
        name: 'Speed Conversion',
        icon: 'fas fa-tachometer-alt',
        units: { mps: 'Meters per second (m/s)', kmph: 'Kilometers per hour (km/h)', mph: 'Miles per hour (mph)', fps: 'Feet per second (ft/s)', knot: 'Knot (kn)'},
        factors: { mps: 1, kmph: 1 / 3.6, mph: 0.44704, fps: 0.3048, knot: 0.514444 } // Base unit: meters per second
    },
    force: {
        name: 'Force Conversion',
        icon: 'fas fa-atom',
        units: { N: 'Newton (N)', dyn: 'Dyne (dyn)', lbf: 'Pound-force (lbf)', kgf: 'Kilogram-force (kgf)'},
        factors: { N: 1, dyn: 1e-5, lbf: 4.44822, kgf: 9.80665 } // Base unit: Newton
    },
    pressure: {
        name: 'Pressure Conversion',
        icon: 'fas fa-compress',
        units: { Pa: 'Pascal (Pa)', kPa: 'Kilopascal (kPa)', psi: 'Pounds per square inch (psi)', atm: 'Atmosphere (atm)', bar: 'Bar (bar)', mmHg: 'Millimeters of mercury (mmHg)'},
        factors: { Pa: 1, kPa: 1000, psi: 6894.76, atm: 101325, bar: 100000, mmHg: 133.322 } // Base unit: Pascal
    },
    energy: {
        name: 'Energy Conversion',
        icon: 'fas fa-bolt',
        units: { J: 'Joule (J)', kJ: 'Kilojoule (kJ)', cal: 'Calorie (cal)', kcal: 'Kilocalorie (kcal)', Wh: 'Watt-hour (Wh)', kWh: 'Kilowatt-hour (kWh)', eV: 'Electronvolt (eV)'},
        factors: { J: 1, kJ: 1000, cal: 4.184, kcal: 4184, Wh: 3600, kWh: 3600000, eV: 1.60218e-19 } // Base unit: Joule
    },
    power: {
        name: 'Power Conversion',
        icon: 'fas fa-plug',
        units: { W: 'Watt (W)', kW: 'Kilowatt (kW)', hp: 'Horsepower (hp)', BTUh: 'BTU per hour (BTU/h)'},
        factors: { W: 1, kW: 1000, hp: 745.7, BTUh: 0.293071 } // Base unit: Watt
    },
    temperature: {
        name: 'Temperature Conversion',
        icon: 'fas fa-temperature-low',
        units: { c: 'Celsius (°C)', f: 'Fahrenheit (°F)', k: 'Kelvin (K)'},
        factors: null // Temperature uses specific formulas, not simple factors.
    }
};

/**
 * @constant temperatureFormulas
 * @type {object}
 * @description Helper object storing the string representations of temperature conversion formulas.
 * Keys are in the format 'fromUnit-toUnit' For example, 'c-f' for Celsius to Fahrenheit).
 * These strings are displayed to the user to show how the conversion is performed.
 */
const temperatureFormulas = {
    'c-f': '°F = (°C × 9/5) + 32',
    'f-c': '°C = (°F − 32) × 5/9',
    'c-k': 'K = °C + 273.15',
    'k-c': '°C = K − 273.15',
    'f-k': 'K = ((°F − 32) × 5/9) + 273.15',
    'k-f': '°F = ((K − 273.15) × 9/5) + 32',
    'c-c': '°C₁ = °C₂ (No change)', // For same unit conversion
    'f-f': '°F₁ = °F₂ (No change)', // For same unit conversion
    'k-k': 'K₁ = K₂ (No change)'  // For same unit conversion
};

// GLOBAL STATE VARIABLES

/**
 * @let currentConversionType
 * @type {string}
 * @description Stores the key of the currently selected conversion type For example, 'length', 'mass'.
 *              Defaults to 'length' when the page loads. This variable determines which
 *              set of units and factors are used for calculations.
 */
let currentConversionType = 'length';

/**
 * @let conversionChartInstance
 * @type {Chart|null}
 * @description Holds the instance of the Chart.js chart object.
 *              It's `null` if no chart is currently displayed. This allows
 *              the chart to be updated or destroyed as needed.
 */
let conversionChartInstance = null;

// UI UPDATE FUNCTIONS
/**
 * @function updateConversionUI
 * @param {string} type - The key of the new conversion type to display For example, 'mass'.
 * @description This function is responsible for updating the user interface (UI)
 *              when a new conversion type is selected by the user. It handles:
 *              - Updating the title and icon of the conversion section.
 *              - Populating the 'from' and 'to' unit dropdowns with units relevant to the selected type.
 *              - Setting default selected units.
 *              - Clearing previous input values and results.
 *              - Resetting and hiding formula, breakdown, chart, and export sections.
 *              - Managing fade-in/out animations for a smooth transition.
 */
function updateConversionUI(type) {
    // Update the global state variable for the current conversion type.
    currentConversionType = type;
    // Retrieve the data object for the selected conversion type.
    const conversionData = conversions[type];
    // Get a reference to the main dynamic content area for conversions.
    const dynamicConversionDiv = document.getElementById('dynamicConversion');

    // Add a CSS class to trigger a fade-out animation.
    dynamicConversionDiv.classList.add('fading-out');

    // If a chart instance exists from a previous conversion, destroy it to free resources
    // and prevent conflicts with new chart data.
    if (conversionChartInstance) {
        conversionChartInstance.destroy();
        conversionChartInstance = null;
    }

    // Use setTimeout to allow the fade-out animation to play before updating content.
    // The delay (400ms) should match the CSS transition duration.
    setTimeout(() => {
        // Update the title of the conversion section with the new type's name and icon.
        document.getElementById('conversionTitle').innerHTML = `<i class="${conversionData.icon}"></i> ${conversionData.name}`;

        // Get references to the 'from' and 'to' unit select (dropdown) elements.
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        // Clear any existing options from both dropdowns.
        fromUnitSelect.innerHTML = '';
        toUnitSelect.innerHTML = '';

        // Iterate over the units defined for the current conversion type.
        for (const unit in conversionData.units) {
            // Create a new <option> element for the 'from' unit dropdown.
            const option1 = document.createElement('option');
            option1.value = unit; // The unit abbreviation For example, 'm' is the option's value.
            option1.textContent = conversionData.units[unit]; // The full name For example, 'Meters (m)' is displayed to the user.
            fromUnitSelect.appendChild(option1);

            // Create a similar <option> element for the 'to' unit dropdown.
            const option2 = document.createElement('option');
            option2.value = unit;
            option2.textContent = conversionData.units[unit];
            toUnitSelect.appendChild(option2);
        }

        // Set default selected units in the dropdowns.
        // Typically, the first unit for 'from' and the second unit for 'to'.
        if (Object.keys(conversionData.units).length >= 2) {
            fromUnitSelect.value = Object.keys(conversionData.units)[0];
            toUnitSelect.value = Object.keys(conversionData.units)[1];
        } else if (Object.keys(conversionData.units).length === 1) {
            // If there's only one unit available (less common), select it for both dropdowns.
            fromUnitSelect.value = Object.keys(conversionData.units)[0];
            toUnitSelect.value = Object.keys(conversionData.units)[0];
        }

        // Clear the input field for the value to be converted.
        document.getElementById('inputValue').value = '';
        // Reset the result display area to its placeholder text.
        document.getElementById('conversionResult').innerHTML = '<p>Answer will appear here.</p>';
        
        // Reset the formula display area.
        const formulaDisplayElement = document.getElementById('formulaDisplay');
        formulaDisplayElement.innerHTML = '<p>Formula used will appear here.</p>';
        formulaDisplayElement.classList.remove('show'); // Hide it by removing the 'show' class.

        // Reset the computation breakdown area.
        const breakdownElement = document.getElementById('computationBreakdown');
        breakdownElement.innerHTML = '<p>Solution will appear here.</p>';
        breakdownElement.classList.remove('show'); // Hide it.

        // Hide the chart display area and the export button as no conversion has been made yet for the new type.
        document.getElementById('chartDisplay').style.display = 'none';
        document.getElementById('exportButton').style.display = 'none';

        // Remove the 'fading-out' class to trigger a fade-in animation for the newly updated content.
        dynamicConversionDiv.classList.remove('fading-out');
        
        // Optional: If an input value was persisted, one could trigger `convert()` here.
        // convert(); 
    }, 400); // Delay matches CSS opacity/transform transition.
}

// CORE CONVERSION LOGIC

/**
 * @function convert
 * @description This is the core function that performs the unit conversion calculation.
 *              It is called whenever the input value or selected units change. It handles:
 *              - Reading input value and selected units.
 *              - Validating the input.
 *              - Performing the conversion calculation (special handling for temperature).
 *              - Generating strings for the formula and step-by-step breakdown.
 *              - Displaying the result, formula, and breakdown.
 *              - Updating or creating a bar chart to visualize the conversion.
 *              - Showing the chart and export button.
 */
function convert() {
    // Get references to relevant HTML elements.
    const inputValueElement = document.getElementById('inputValue');
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultElement = document.getElementById('conversionResult');
    const formulaDisplayElement = document.getElementById('formulaDisplay');
    const breakdownElement = document.getElementById('computationBreakdown');
    const chartDisplayElement = document.getElementById('chartDisplay');
    const exportButtonElement = document.getElementById('exportButton');

    // Parse the input value from a string to a floating-point number.
    const inputValue = parseFloat(inputValueElement.value);
    // Get the data object for the currently selected conversion type.
    const conversionData = conversions[currentConversionType];

    /**
     * @function resetDisplays
     * @description Helper function to reset formula, breakdown, chart, and export sections to their default/hidden state.
     *              Used when input is invalid or cleared.
     */
    const resetDisplays = () => {
        formulaDisplayElement.innerHTML = '<p>Formula used will appear here.</p>';
        formulaDisplayElement.classList.remove('show');
        breakdownElement.innerHTML = '<p>Solution will appear here.</p>';
        breakdownElement.classList.remove('show');
        chartDisplayElement.style.display = 'none';
        exportButtonElement.style.display = 'none';
        // If a chart exists, destroy it.
        if (conversionChartInstance) {
            conversionChartInstance.destroy();
            conversionChartInstance = null;
        }
    };

    // Validate input: If the input field is empty or contains only whitespace.
    if (!inputValueElement.value || inputValueElement.value.trim() === '') {
        resultElement.innerHTML = '<p>Enter a value to convert.</p>'; // Show placeholder message.
        resetDisplays(); // Reset detailed output areas.
        return; // Exit the function early.
    }

    // Validate input: If the parsed input is not a number For example, user typed text).
    if (isNaN(inputValue)) {
        resultElement.innerHTML = '<p>Please enter a valid number.</p>'; // Show error message.
        resetDisplays(); // Reset detailed output areas.
        return; // Exit the function early.
    }

    // Initialize variables for storing the result, formula string, and breakdown steps.
    let result;
    let formulaString = '<p><strong>Formula:</strong></p>'; // Start with a "Formula:" heading.
    let breakdownSteps = '';

    // --- Temperature Conversion (Special Case) ---
    if (currentConversionType === 'temperature') {
        // Construct the key to look up the formula string in `temperatureFormulas`.
        const formulaKey = `${fromUnit}-${toUnit}`;
        if (temperatureFormulas[formulaKey]) {
            formulaString += `<p>${temperatureFormulas[formulaKey]}</p>`;
        } else {
            // Fallback if a specific formula string isn't found (should not happen with current setup).
            formulaString += '<p>Direct formula not available for this specific temperature conversion.</p>';
        }

        // Perform temperature conversion based on 'fromUnit' and 'toUnit'.
        if (fromUnit === 'c') { // From Celsius
            if (toUnit === 'f') result = (inputValue * 9/5) + 32;
            else if (toUnit === 'k') result = inputValue + 273.15;
            else result = inputValue; // c to c (no change)
            // Build breakdown steps for Celsius conversions.
            breakdownSteps += `<p>Starting with ${inputValue}°C.</p>`;
            if (toUnit === 'f') breakdownSteps += `<p class="indent">Apply °F = (°C × 9/5) + 32: (${inputValue} × 9/5) + 32 = ${result.toFixed(4)}°F</p>`;
            if (toUnit === 'k') breakdownSteps += `<p class="indent">Apply K = °C + 273.15: ${inputValue} + 273.15 = ${result.toFixed(4)}K</p>`;
        } else if (fromUnit === 'f') { // From Fahrenheit
            if (toUnit === 'c') result = (inputValue - 32) * 5/9;
            else if (toUnit === 'k') result = (inputValue - 32) * 5/9 + 273.15;
            else result = inputValue; // f to f (no change)
            // Build breakdown steps for Fahrenheit conversions.
            breakdownSteps += `<p>Starting with ${inputValue}°F.</p>`;
            if (toUnit === 'c') breakdownSteps += `<p class="indent">Apply °C = (°F − 32) × 5/9: (${inputValue} - 32) × 5/9 = ${result.toFixed(4)}°C</p>`;
            if (toUnit === 'k') breakdownSteps += `<p class="indent">Apply K = ((°F − 32) × 5/9) + 273.15: ((${inputValue} - 32) × 5/9) + 273.15 = ${result.toFixed(4)}K</p>`;
        } else if (fromUnit === 'k') { // From Kelvin
            if (toUnit === 'c') result = inputValue - 273.15;
            else if (toUnit === 'f') result = (inputValue - 273.15) * 9/5 + 32;
            else result = inputValue; // k to k (no change)
            // Build breakdown steps for Kelvin conversions.
            breakdownSteps += `<p>Starting with ${inputValue}K.</p>`;
            if (toUnit === 'c') breakdownSteps += `<p class="indent">Apply °C = K − 273.15: ${inputValue} - 273.15 = ${result.toFixed(4)}°C</p>`;
            if (toUnit === 'f') breakdownSteps += `<p class="indent">Apply °F = ((K − 273.15) × 9/5) + 32: ((${inputValue} - 273.15) × 9/5) + 32 = ${result.toFixed(4)}°F</p>`;
        }
        // If fromUnit is the same as toUnit, provide a simpler breakdown message.
        if (fromUnit === toUnit) {
            breakdownSteps = `<p>${inputValue} ${conversionData.units[fromUnit]} remains ${result.toFixed(4)} ${conversionData.units[toUnit]}. No conversion needed.</p>`;
        }
    } else { // --- Factor-Based Conversions (Length, Mass, etc.) ---
        // Get the conversion factor for the 'from' unit (to convert it to the base unit).
        const factorFrom = conversionData.factors[fromUnit];
        // Get the conversion factor for the 'to' unit (from the base unit).
        const factorTo = conversionData.factors[toUnit];
        
        // Step 1: Convert the input value from 'fromUnit' to the category's base unit.
        // Example: If inputValue is 2 km, factorFrom is 1000 (m/km), baseValue becomes 2000 m.
        const baseValue = inputValue * factorFrom;
        
        // Step 2: Convert the value from the base unit to the 'toUnit'.
        // Example: If baseValue is 2000 m, and toUnit is 'cm' (factorTo 0.01 m/cm), result is 2000 / 0.01 = 200000 cm.
        // Note: This calculation is effectively (inputValue * factorFrom) / factorTo.
        result = baseValue / factorTo;

        // Construct the formula string for display, using unit symbols.
        formulaString += `<p>${toUnit.toUpperCase()} = (${fromUnit.toUpperCase()} × Factor<sub>From</sub>) / Factor<sub>To</sub></p>`;
        if (fromUnit === toUnit) {
             formulaString += `<p><em>Since units are the same, the value doesn't change.</em></p>`;
        } else {
             // Provide context for the factors used in the formula.
             formulaString += `<p>Where ${fromUnit.toUpperCase()} is the value in ${conversionData.units[fromUnit]},</p>`;
             formulaString += `<p>Factor<sub>From</sub> (${factorFrom}) converts ${conversionData.units[fromUnit]} to base units,</p>`;
             formulaString += `<p>Factor<sub>To</sub> (${factorTo}) is the factor for ${conversionData.units[toUnit]} relative to base units.</p>`;
        }
        
        // Try to find the symbol of the base unit for display in breakdown (the unit with factor 1).
        const baseUnitSymbol = Object.keys(conversionData.factors).find(key => conversionData.factors[key] === 1) || 'base units';
        
        // Build the breakdown steps for factor-based conversions.
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

    // --- Display Results and Details ---
    // Display the final converted result, limiting to a reasonable number of decimal places (6 for general, 4 for temp).
    const precision = (currentConversionType === 'temperature') ? 4 : 6;
    resultElement.innerHTML = `<p>${inputValue} ${conversionData.units[fromUnit]} = <strong>${result.toFixed(precision)} ${conversionData.units[toUnit]}</strong></p>`;

    // Display the formula used.
    formulaDisplayElement.innerHTML = formulaString;
    formulaDisplayElement.classList.add('show'); // Make it visible.

    // Display the computation breakdown.
    breakdownElement.innerHTML = `<p><strong>Solution:</strong></p>${breakdownSteps}`;
    breakdownElement.classList.add('show'); // Make it visible.

    // --- Chart Generation/Update ---
    // Get the 2D rendering context for the chart canvas.
    const chartCtx = document.getElementById('conversionChart').getContext('2d');
    // Prepare data for the chart: labels for X-axis, and dataset for Y-axis values.
    const chartData = {
        labels: [`Input (${fromUnit})`, `Result (${toUnit})`], // Labels for the two bars.
        datasets: [{
            label: conversionData.name, // Label for the dataset (used in tooltips).
            data: [inputValue, result],  // The actual values for the bars.
            backgroundColor: [           // Colors for the bars.
                'rgba(54, 162, 235, 0.7)', // Blue for input bar.
                'rgba(255, 99, 132, 0.7)'  // Red for result bar.
            ],
            borderColor: [               // Border colors for the bars.
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    };

    // If a chart instance already exists, update its data and options.
    if (conversionChartInstance) {
        conversionChartInstance.data = chartData;
        // Update the chart title to reflect the current conversion.
        conversionChartInstance.options.plugins.title.text = `${conversionData.name}: ${inputValue} ${fromUnit} → ${result.toFixed(precision)} ${toUnit}`;
        conversionChartInstance.update(); // Redraw the chart.
    } else {
        // If no chart instance exists, create a new one.
        conversionChartInstance = new Chart(chartCtx, {
            type: 'bar', // Type of chart.
            data: chartData, // The data prepared above.
            options: {
                responsive: true, // Make the chart responsive to container size.
                maintainAspectRatio: false, // Allow chart to fill container height without strict aspect ratio.
                scales: {
                    y: { // Y-axis configuration.
                        // Start Y-axis at zero, unless it's temperature and values might be negative.
                        beginAtZero: (currentConversionType !== 'temperature' || (inputValue >= 0 && result >=0)),
                        title: {
                            display: true,
                            text: 'Value' // Label for the Y-axis.
                        }
                    }
                },
                plugins: { // Configuration for Chart.js plugins.
                    legend: {
                        display: false // Hide the default legend (dataset label is shown in title/tooltip).
                    },
                    title: { // Chart title configuration.
                        display: true,
                        text: `${conversionData.name}: ${inputValue} ${fromUnit} → ${result.toFixed(precision)} ${toUnit}`,
                        font: { size: 14 }
                    },
                    tooltip: { // Tooltip configuration (when hovering over bars).
                        callbacks: {
                            // Customize tooltip label to include unit.
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    // Append value and unit (extracted from bar label).
                                    label += context.parsed.y.toFixed(precision) + ' ' + context.label.match(/\(([^)]+)\)/)[1];
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
    // Make the chart display area and export button visible.
    chartDisplayElement.style.display = 'block';
    exportButtonElement.style.display = 'inline-flex'; // Use 'inline-flex' to align icon and text.
}


// UTILITY FUNCTIONS

/**
 * @function swapUnits
 * @description Swaps the selected 'from' and 'to' units in their respective dropdowns
 *              and then triggers a new conversion calculation with the swapped units.
 */
function swapUnits() {
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    
    // Store the current 'from' unit value in a temporary variable.
    const tempUnit = fromUnitSelect.value;
    // Set the 'from' unit dropdown to the current 'to' unit value.
    fromUnitSelect.value = toUnitSelect.value;
    // Set the 'to' unit dropdown to the original 'from' unit value (stored in tempUnit).
    toUnitSelect.value = tempUnit;
    
    // After swapping units, re-calculate the conversion.
    convert();
}

/**
 * @function exportResults
 * @description Gathers the current conversion details (input, output, formula, breakdown)
 *              and generates a text file that the user can download.
 */
function exportResults() {
    // Get current input values and selected units.
    const inputValue = document.getElementById('inputValue').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const conversionData = conversions[currentConversionType]; // Data for current conversion type.
    
    // Get the text content from the result, formula, and breakdown display areas.
    const resultText = document.getElementById('conversionResult').innerText;
    const formulaHtml = document.getElementById('formulaDisplay').innerHTML;
    const breakdownHtml = document.getElementById('computationBreakdown').innerHTML;

    // Convert HTML content of formula and breakdown to plain text for the export file.
    // This is a simple way to strip HTML tags.
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = formulaHtml;
    // Remove "Formula:" prefix and trim whitespace for cleaner text.
    const formulaText = tempDiv.innerText.replace(/^Formula:\s*/, '').trim();
    tempDiv.innerHTML = breakdownHtml;
    // Remove "Solution:" prefix and trim whitespace.
    const breakdownText = tempDiv.innerText.replace(/^Solution:\s*/, '').trim();

    // Basic validation: ensure a conversion has been performed before exporting.
    if (!inputValue || resultText.includes("Answer will appear here") || resultText.includes("Enter a value") || resultText.includes("valid number")) {
        alert("Please perform a valid conversion before exporting.");
        return; // Exit if no valid conversion data to export.
    }

    // Construct the content for the text file using a template literal.
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

    // Generate a filename for the download.
    const filename = `Conversion_${currentConversionType}_${inputValue}${fromUnit}_to_${toUnit}.txt`;
    // Create a Blob (Binary Large Object) containing the text content.
    const blob = new Blob([content.trim()], { type: 'text/plain;charset=utf-8' });
    
    // Create a temporary anchor (<a>) element to trigger the download.
    const link = document.createElement('a');
    // Create a URL for the Blob object.
    link.href = URL.createObjectURL(blob);
    // Set the download attribute to the desired filename.
    link.download = filename;
    // Programmatically click the link to initiate the download.
    link.click();
    // Release the object URL to free up resources.
    URL.revokeObjectURL(link.href);
}

// ===================================================================================
// EVENT LISTENERS AND INITIALIZATION
// ===================================================================================

/**
 * @event DOMContentLoaded
 * @description This event fires when the initial HTML document has been completely loaded and parsed,
 *              without waiting for stylesheets, images, and subframes to finish loading.
 *              It's used to set up initial UI elements and attach event listeners.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get references to various interactive HTML elements.
    const typeButtons = document.querySelectorAll('.type-button'); // All conversion type selector buttons.
    const inputValueElement = document.getElementById('inputValue'); // Input field for the value.
    const fromUnitSelect = document.getElementById('fromUnit');   // 'From' unit dropdown.
    const toUnitSelect = document.getElementById('toUnit');     // 'To' unit dropdown.
    const swapButton = document.querySelector('.swap-button');    // Button to swap units.
    const exportButton = document.getElementById('exportButton'); // Button to export results.

    // Add a click event listener to each conversion type button.
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // When a type button is clicked:
            // 1. Remove 'active' class from all type buttons to visually deactivate them.
            typeButtons.forEach(btn => btn.classList.remove('active'));
            // 2. Add 'active' class to the clicked button to highlight it.
            this.classList.add('active');
            // 3. Update the UI to reflect the newly selected conversion type (data from 'data-type' attribute).
            updateConversionUI(this.getAttribute('data-type'));
            // Optional: Could trigger conversion if an input value already exists.
            // if (inputValueElement.value.trim() !== '') convert();
        });
    });

    // Add event listeners to automatically trigger `convert()` when input value or units change.
    inputValueElement.addEventListener('input', convert); // Triggers on every keystroke/change in the input field.
    fromUnitSelect.addEventListener('change', convert);   // Triggers when 'from' unit selection changes.
    toUnitSelect.addEventListener('change', convert);     // Triggers when 'to' unit selection changes.

    // Add event listener to the swap units button.
    swapButton.addEventListener('click', swapUnits);

    // Add event listener to the export results button.
    exportButton.addEventListener('click', exportResults);

    // Add input validation: prevent negative numbers for non-temperature conversions.
    // Temperature conversions handle negative values correctly.
    inputValueElement.addEventListener('input', function() {
        if (currentConversionType !== 'temperature' && parseFloat(this.value) < 0) {
            this.value = ''; // Clear the input if negative value entered for non-temp types.
            // convert(); // Optionally re-trigger conversion to clear results if input is now invalid.
        }
    });

    // Initialize the UI with the default conversion type ('length') when the page loads.
    updateConversionUI('length');
});