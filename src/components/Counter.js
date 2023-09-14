import { useEffect, useState } from "react";
export default function Counter(props) {
  const [isBouncing, setIsBouncing] = useState(false);
  const handleBounceEffect = () => {
    setIsBouncing(true);

    setTimeout(() => {
      setIsBouncing(false);
    }, 400); // 0.6 seconds, which matches the animation duration
  };

  useEffect(() => {
    // This function will be called whenever `myProp` changes
    handleBounceEffect();

    // You can call your function here, for example:
    // onChangeProp();
  }, [props.counter]);

  return (
    <div>
      <div className={` ${isBouncing ? "bounceScoreBox" : "scoreBox"}`}>
        {props.counter}
      </div>
    </div>
  );
}
