import { useEffect, useState } from "react";
import "../keyboard.css";

function Keyboard({typedLetter, isSpecialKey}) {


  return (
    <div className="container">
      <section>
      </section>
      <section className="Keyboard">
        <section className="row">
          <p className={`keys ${typedLetter === "`" ? `active` : ``}`}>`</p>
          <p className={`keys ${typedLetter === "1" ? `active` : ``}`}>1</p>
          <p className={`keys ${typedLetter === "2" ? `active` : ``}`}>2</p>
          <p className={`keys ${typedLetter === "3" ? `active` : ``}`}>3</p>
          <p className={`keys ${typedLetter === "4" ? `active` : ``}`}>4</p>
          <p className={`keys ${typedLetter === "5" ? `active` : ``}`}>5</p>
          <p className={`keys ${typedLetter === "6" ? `active` : ``}`}>6</p>
          <p className={`keys ${typedLetter === "7" ? `active` : ``}`}>7</p>
          <p className={`keys ${typedLetter === "8" ? `active` : ``}`}>8</p>
          <p className={`keys ${typedLetter === "9" ? `active` : ``}`}>9</p>
          <p className={`keys ${typedLetter === "0" ? `active` : ``}`}>0</p>
          <p className={`keys ${typedLetter === "-" ? `active` : ``}`}>-</p>
          <p className={`keys ${typedLetter === "=" ? `active` : ``}`}>=</p>
          <p
            className={`Backspace ${
              typedLetter === "Backspace" ? `active` : ``
            }`}
          >
            Backspace
          </p>
        </section>
        <section className="row">
          <p className={`Tab ${typedLetter === "Tab" ? `active` : ``}`}>Tab</p>
          <p className={`keys ${typedLetter === "q" ? `active` : ``}`}>Q</p>
          <p className={`keys ${typedLetter === "w" ? `active` : ``}`}>W</p>
          <p className={`keys ${typedLetter === "e" ? `active` : ``}`}>E</p>
          <p className={`keys ${typedLetter === "r" ? `active` : ``}`}>R</p>
          <p className={`keys ${typedLetter === "t" ? `active` : ``}`}>T</p>
          <p className={`keys ${typedLetter === "y" ? `active` : ``}`}>Y</p>
          <p className={`keys ${typedLetter === "i" ? `active` : ``}`}>I</p>
          <p className={`keys ${typedLetter === "o" ? `active` : ``}`}>O</p>
          <p className={`keys ${typedLetter === "p" ? `active` : ``}`}>P</p>
          <p className={`keys ${typedLetter === "[" ? `active` : ``}`}>{`[`}</p>
          <p className={`keys ${typedLetter === "]" ? `active` : ``}`}>{`]`}</p>
          <p className={`Slash ${typedLetter === "\\" ? `active` : ``}`}>\</p>
        </section>
        <section className="row">
          <p
            className={`Caps_Lock ${isSpecialKey === "Capslock" ? `active` : ``}`}
          >
            Caps Lock
          </p>
          <p className={`keys ${typedLetter === "a" ? `active` : ``}`}>A</p>
          <p className={`keys ${typedLetter === "s" ? `active` : ``}`}>S</p>
          <p className={`keys ${typedLetter === "d" ? `active` : ``}`}>D</p>
          <p className={`keys ${typedLetter === "f" ? `active` : ``}`}>F</p>
          <p className={`keys ${typedLetter === "g" ? `active` : ``}`}>G</p>
          <p className={`keys ${typedLetter === "h" ? `active` : ``}`}>H</p>
          <p className={`keys ${typedLetter === "j" ? `active` : ``}`}>J</p>
          <p className={`keys ${typedLetter === "k" ? `active` : ``}`}>K</p>
          <p className={`keys ${typedLetter === "l" ? `active` : ``}`}>L</p>
          <p className={`keys ${typedLetter === ";" ? `active` : ``}`}>;</p>
          <p className={`keys ${typedLetter === "'" ? `active` : ``}`}>'</p>
          <p className={`Enter_Key ${isSpecialKey === "Enter" ? `active` : ``}`}>
            Enter
          </p>
        </section>
        <section className="row">
          <p className={`Shift_Left ${isSpecialKey === "Shift" ? `active` : ``}`}>
            Shift
          </p>
          <p className={`keys ${typedLetter === "z" ? `active` : ``}`}>Z</p>
          <p className={`keys ${typedLetter === "x" ? `active` : ``}`}>X</p>
          <p className={`keys ${typedLetter === "c" ? `active` : ``}`}>C</p>
          <p className={`keys ${typedLetter === "v" ? `active` : ``}`}>V</p>
          <p className={`keys ${typedLetter === "b" ? `active` : ``}`}>B</p>
          <p className={`keys ${typedLetter === "n" ? `active` : ``}`}>N</p>
          <p className={`keys ${typedLetter === "," ? `active` : ``}`}>,</p>
          <p className={`keys ${typedLetter === "." ? `active` : ``}`}>.</p>
          <p className={`keys ${typedLetter === "/" ? `active` : ``}`}>/</p>
          <p className={`keys ${typedLetter === "?" ? `active` : ``}`}>?</p>
          <p
            className={`Shift_Right ${isSpecialKey === "Shift" ? `active` : ``}`}
          >
            Shift
          </p>
        </section>
        <section className="row">
          <p className={`Ctrl ${isSpecialKey === "Control" ? `active` : ``}`}>
            Ctrl
          </p>
          <p className={`Alt ${isSpecialKey === "Alt" ? `active` : ``}`}>Alt</p>
          <p className={`Space_Key ${isSpecialKey === " " ? `active` : ``}`}>
            ____
          </p>
          <p className={`Ctrl ${isSpecialKey === "Alt" ? `active` : ``}`}>Alt</p>
          <p className={`Alt ${isSpecialKey === "Control" ? `active` : ``}`}>
            Ctrl
          </p>
        </section>
      </section>
    </div>
  );
}

export default Keyboard;
