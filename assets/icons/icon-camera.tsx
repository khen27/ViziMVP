import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CameraIcon(props: any) {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      {...props}
    >
      <Path
        d="M38.4 11.2H33.6L30.4 8H17.6L14.4 11.2H9.6C7.6 11.2 6 12.8 6 14.8V35.2C6 37.2 7.6 38.8 9.6 38.8H38.4C40.4 38.8 42 37.2 42 35.2V14.8C42 12.8 40.4 11.2 38.4 11.2ZM38.4 35.2H9.6V14.8H15.72L18.92 11.6H29.08L32.28 14.8H38.4V35.2ZM24 16C19.6 16 16 19.6 16 24C16 28.4 19.6 32 24 32C28.4 32 32 28.4 32 24C32 19.6 28.4 16 24 16ZM24 28.8C21.32 28.8 19.2 26.68 19.2 24C19.2 21.32 21.32 19.2 24 19.2C26.68 19.2 28.8 21.32 28.8 24C28.8 26.68 26.68 28.8 24 28.8Z"
        fill="rgba(0,0,0,0.5)"
      />
    </Svg>
  );
}

export default CameraIcon; 