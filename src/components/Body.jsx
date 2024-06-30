import classes from "./Body.module.css";
import { useState, useRef, useEffect } from "react";

export default function Body(props) {
  const [hitPoint, setUserPoint] = useState({ offsetX: 0, offsetY: 0 });
  const [rectangleStyle, setRectangleStyle] = useState({});
  const targetRef = useRef(null);
  const [targetCenter, setTargetCenter] = useState({ x: 0, y: 0 });

  const userHitPointHandler = (event) => {
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    setUserPoint({
      offsetX: offsetX,
      offsetY: offsetY,
    });
  };

  useEffect(() => {
    if (targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      setTargetCenter({
        x: targetRect.width / 2,
        y: targetRect.height / 2,
      });
    }
  }, [targetRef.current]);

  useEffect(() => {
    const rectLeft = Math.min(targetCenter.x, hitPoint.offsetX);
    const rectTop = Math.min(targetCenter.y, hitPoint.offsetY);
    const rectWidth = Math.abs(targetCenter.x - hitPoint.offsetX);
    const rectHeight = Math.abs(targetCenter.y - hitPoint.offsetY);

    setRectangleStyle({
      left: `${rectLeft}px`,
      top: `${rectTop}px`,
      width: `${rectWidth}px`,
      height: `${rectHeight}px`,
    });
  }, [hitPoint, targetCenter]);

  return (
    <main className={classes.container}>
      <div className={classes.target} onClick={userHitPointHandler} ref={targetRef}>
        <div
          className={classes.hitPoint}
          style={{
            top: hitPoint.offsetY,
            left: hitPoint.offsetX,
          }}
        />
        <div className={classes.rectangle} style={rectangleStyle}></div>
      </div>
    </main>
  );
}