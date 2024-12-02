/////////////

import { useState } from "react";

const ColorPicker = () => {
  ///////////

  const [color, setColor] = useState("#FFFFFF");

  function handleColorChange(event) {
    setColor(event.target.value);
  }
  return (
    <div className="color-picker-container">
      <h1>Color Picker</h1>
      <div className="color-display" style={{ backgroundColor: color }}>
        <p>Selected Color: {color}</p>
      </div>
      <label htmlFor="colorInput">Select a Color:</label>
      <input
        id="colorInput"
        type="color"
        value={color}
        onChange={handleColorChange}
      />
    </div>
  );
};

export default ColorPicker;
