import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useTheme } from "@react-navigation/native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useHeaderHeight } from "@react-navigation/elements";
import CityDetails from "@/components/CityDetails";

const HEADER_HEIGHT = Dimensions.get("window").width;

const City = () => {
  const theme = useTheme();
  const NativeHeaderHeight = useHeaderHeight();
  const { top, bottom } = useSafeAreaInsets();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useSharedValue(0);
  const imageHeight = 50;
  const padding = 20;
  const cHeight = NativeHeaderHeight;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollOffset.value,
      [0, HEADER_HEIGHT - cHeight],
      [HEADER_HEIGHT, cHeight + 10],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollOffset.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      [-HEADER_HEIGHT * 0.5, 0, 0],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      scrollOffset.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      [2, 1, 1],
      Extrapolation.CLAMP
    );

    return {
      height: height,
      transform: [{ translateY: translateY }, { scale: scale }],
      overflow: "hidden",
    };
  });

  const animatedTitleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollOffset.value,
      [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT / 2],
      [1.3, 1, 0.8],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollOffset.value,
      [0, HEADER_HEIGHT / 2],
      [HEADER_HEIGHT - 80, top + ((cHeight - top) / 2 - imageHeight / 1.8)],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scrollOffset.value,
      [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT / 2],
      [scale * 2 * padding, padding, 2 * imageHeight],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          translateX,
        },
        {
          translateY,
        },
        {
          scale,
        },
      ],
    };
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollOffset.value,
      [HEADER_HEIGHT + cHeight, 0, HEADER_HEIGHT - cHeight],
      [2 * HEADER_HEIGHT - cHeight, HEADER_HEIGHT, HEADER_HEIGHT / 2],
      Extrapolation.CLAMP
    );

    const width = interpolate(
      height,
      [HEADER_HEIGHT / 2, HEADER_HEIGHT],
      [imageHeight, HEADER_HEIGHT]
    );

    const originX = (HEADER_HEIGHT - width) / 2;

    const translateY = interpolate(
      height,
      [HEADER_HEIGHT / 3, HEADER_HEIGHT],
      [top + ((cHeight - top) / 2 - imageHeight / 4), 0],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      height,
      [0, HEADER_HEIGHT],
      [
        -HEADER_HEIGHT +
          width +
          (padding + imageHeight / 2) +
          imageHeight / 4 +
          (padding / 2 + imageHeight / 2),
        0,
      ],
      Extrapolation.CLAMP
    );

    const borderRadius = interpolate(
      height,
      [HEADER_HEIGHT / 3, HEADER_HEIGHT],
      [HEADER_HEIGHT, 0]
    );

    return {
      borderRadius: borderRadius,
      width: width,
      maxHeight: width,
      transform: [
        { translateX: originX },
        {
          translateY,
        },
        {
          translateX,
        },
      ],
    };
  });

  const animatedOverlay = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollOffset.value,
      [0, HEADER_HEIGHT],
      ["rgba(0,0,0,0.4)", "rgba(0,0,0,0)"]
    );
    return {
      backgroundColor,
    };
  });

  const ListHeaderComponent = () => {
    return (
      <>
        <Animated.View
          pointerEvents={"none"}
          style={[
            {
              height: HEADER_HEIGHT,
              width: "100%",
            },
            animatedHeaderStyle,
          ]}
        >
          <BlurView style={StyleSheet.absoluteFillObject} />
          <Animated.View
            style={[{ flex: 1, overflow: "hidden" }, animatedImageStyle]}
          >
            <Image
              source={{
                uri: "https://assets.vogue.in/photos/5ddd1c3ea7e434000831059d/2:3/w_2560%2Cc_limit/GILL5066.jpg",
              }}
              style={{ flex: 1 }}
              // transition={500}
              // placeholder={{ blurhash: "LgKRXksnrqfk}YfPnjayIoWWSgj@" }}
              // cachePolicy={"none"}
            />
            <Animated.View
              style={[StyleSheet.absoluteFillObject, animatedOverlay]}
            />
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={[
            {
              position: "absolute",
              gap: 2,
            },
            animatedTitleStyle,
          ]}
        >
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 25,
              fontWeight: "500",
            }}
          >
            Jaipur
          </Text>
          <Text
            style={{
              color: theme.colors.subtitle,
              fontSize: 15,
              fontWeight: "400",
            }}
          >
            The Pink Jewel of India
          </Text>
        </Animated.View>
      </>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {/* <ListHeaderComponent /> */}
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          gap: 25,
          //   paddingHorizontal: 16,
          //   paddingTop: HEADER_HEIGHT + padding,
          paddingBottom: bottom,
        }}
      >
        <ListHeaderComponent />
        <CityDetails />
        <CityDetails />
      </Animated.ScrollView>
    </View>
  );
};

export default City;

const styles = StyleSheet.create({});
