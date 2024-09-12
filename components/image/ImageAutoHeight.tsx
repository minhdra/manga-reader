import React, { useState, useEffect, useCallback, memo } from "react";
import { Image as RNImage } from "react-native";
import { Image, ImageProps } from "tamagui";
import { SnapbackZoom } from "react-native-zoom-toolkit";

interface ImageAutoHeightProps extends ImageProps {
  width: number;
  uri: string;
  enableZoom?: boolean;
}

const aspectRatioCache: { [key: string]: number } = {};

const ImageAutoHeightInner: React.FC<ImageAutoHeightProps> = ({
  width,
  uri,
  enableZoom = false,
  ...props
}) => {
  const [aspectRatio, setAspectRatio] = useState(aspectRatioCache[uri] || 1);
  const [zIndex, setZIndex] = useState(0);

  const calculateAspectRatio = useCallback(() => {
    if (aspectRatioCache[uri]) {
      setAspectRatio(aspectRatioCache[uri]);
    } else {
      RNImage.getSize(
        uri,
        (w, h) => {
          const ratio = w / h;
          aspectRatioCache[uri] = ratio;
          setAspectRatio(ratio);
        },
        (error) => {
          console.error("Error loading image:", error);
        },
      );
    }
  }, [uri]);

  useEffect(() => {
    calculateAspectRatio();
  }, [calculateAspectRatio]);

  return (
    <SnapbackZoom
      gesturesEnabled={enableZoom}
      onPinchStart={() => {
        setZIndex(100);
      }}
      onPinchEnd={() => {
        setZIndex(0);
      }}
    >
      <Image
        {...props}
        zIndex={zIndex}
        source={{ uri }}
        width={width}
        height={width / aspectRatio}
        resizeMethod="scale"
      />
    </SnapbackZoom>
  );
};

export const ImageAutoHeight = memo(ImageAutoHeightInner);
