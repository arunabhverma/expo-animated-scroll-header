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

const IMAGE_URI =
  "https://assets.vogue.in/photos/5ddd1c3ea7e434000831059d/2:3/w_2560%2Cc_limit/GILL5066.jpg";
const BANNER_HEIGHT = Dimensions.get("window").width;
const IMAGE_HEIGHT = 50;
const EXTRA_PADDING = 20;

const City = () => {
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  console.log("top", top + EXTRA_PADDING);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useSharedValue(0);

  const HEADER_HEIGHT = useHeaderHeight();

  const UPPER_BOUND = [0, BANNER_HEIGHT / 2];

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollOffset.value,
      [0, BANNER_HEIGHT / 2 + EXTRA_PADDING],
      [BANNER_HEIGHT, HEADER_HEIGHT + 10],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollOffset.value,
      [-BANNER_HEIGHT, 0, BANNER_HEIGHT],
      [-BANNER_HEIGHT * 0.5, 0, 0],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      scrollOffset.value,
      [-BANNER_HEIGHT, 0, BANNER_HEIGHT],
      [2, 1, 1],
      Extrapolation.CLAMP
    );

    return {
      height: height,
      transform: [{ translateY: translateY }, { scale: scale }],
    };
  });

  const animatedTitleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollOffset.value,
      [-BANNER_HEIGHT / 2, 0, BANNER_HEIGHT / 2],
      [1.3, 1, 0.8],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollOffset.value,
      UPPER_BOUND,
      [
        BANNER_HEIGHT - 80,
        top + ((HEADER_HEIGHT - top) / 2 - IMAGE_HEIGHT / 1.8),
      ],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scrollOffset.value,
      [-BANNER_HEIGHT / 2, 0, BANNER_HEIGHT / 2],
      [scale * 2 * EXTRA_PADDING, EXTRA_PADDING, 2 * IMAGE_HEIGHT],
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
    const width = interpolate(
      scrollOffset.value,
      UPPER_BOUND,
      [BANNER_HEIGHT, IMAGE_HEIGHT],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollOffset.value,
      UPPER_BOUND,
      [0, top + ((HEADER_HEIGHT - top) / 2 - IMAGE_HEIGHT / 1.8)],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scrollOffset.value,
      UPPER_BOUND,
      [0, IMAGE_HEIGHT],
      Extrapolation.CLAMP
    );

    const borderRadius = interpolate(
      scrollOffset.value,
      UPPER_BOUND,
      [0, width],
      Extrapolation.CLAMP
    );

    return {
      borderRadius: borderRadius,
      aspectRatio: 1,
      maxHeight: width,
      transform: [
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
    const backgroundColor = interpolateColor(scrollOffset.value, UPPER_BOUND, [
      theme.colors.overlay,
      "rgba(0,0,0,0)",
    ]);
    return {
      backgroundColor,
    };
  });

  const animatedPaddingSupport = useAnimatedStyle(() => {
    const height = interpolate(
      scrollOffset.value,
      [0, BANNER_HEIGHT - HEADER_HEIGHT - 100],
      [0, BANNER_HEIGHT - HEADER_HEIGHT - 100],
      Extrapolation.CLAMP
    );
    return {
      height: height,
    };
  });

  const ListTitle = () => {
    return (
      <Animated.View style={[styles.listTitleContainer, animatedTitleStyle]}>
        <Text style={[styles.titleStyle, { color: theme.colors.text }]}>
          Jaipur
        </Text>
        <Text style={[styles.subTitleStyle, { color: theme.colors.subtitle }]}>
          The Pink Jewel of India
        </Text>
      </Animated.View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <Animated.View
          pointerEvents={"none"}
          style={[styles.headerStyle, animatedHeaderStyle]}
        >
          <BlurView style={StyleSheet.absoluteFillObject} />
          <Animated.View style={[styles.bannerStyle, animatedImageStyle]}>
            <Image source={IMAGE_URI} style={{ flex: 1 }} />
            <Animated.View
              style={[StyleSheet.absoluteFillObject, animatedOverlay]}
            />
          </Animated.View>
        </Animated.View>
        <ListTitle />
        <Animated.View style={animatedPaddingSupport} />
      </>
    );
  };
  return (
    <View style={styles.flexOne}>
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: bottom },
        ]}
      >
        <ListHeaderComponent />
        <CityDetails />
        <CityDetails />
      </Animated.ScrollView>
    </View>
  );
};

export default City;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  contentContainerStyle: {
    gap: 25,
  },
  listTitleContainer: {
    position: "absolute",
    gap: 2,
  },
  titleStyle: {
    fontSize: 25,
    fontWeight: "500",
  },
  subTitleStyle: {
    fontSize: 15,
    fontWeight: "400",
  },
  headerStyle: {
    height: BANNER_HEIGHT,
    width: "100%",
  },
  bannerStyle: {
    flex: 1,
    overflow: "hidden",
  },
});
