import { View, FlatList, Image, Dimensions } from "react-native";
import React, { useState, useRef, useEffect } from "react";

const Carousel = () => {
  // Get full dimension width of mobile
  const screenWidth = Dimensions.get("window").width;
  // Track active index state
  const [activeIndex, setActiveIndex] = useState(0);
  // Reference
  const flatlistRef = useRef();

  const carouselData = [
    {
      id: "01",
      image: require("../../assets/ad_1.jpg"),
    },
    {
      id: "02",
      image: require("../../assets/ad_2.jpg"),
    },
  ];

  // Auto Scroll
  useEffect(() => {
    let interval = setInterval(() => {
      flatlistRef.current.scrollToIndex({
        index: activeIndex === carouselData.length - 1 ? 0 : activeIndex + 1,
        animated: true,
      });
    }, 2000);
    return () => clearInterval(interval);
  });

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  // Render image function
  const renderImageItem = ({ item, index }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{ height: 200, width: screenWidth }}
        />
      </View>
    );
  };

  // Render dot slider function
  const renderDotSlider = () => {
    return carouselData.map((dot, index) => (
      <View
        key={index}
        style={{
          backgroundColor: activeIndex === index ? "black" : "gray",
          height: 10,
          width: 10,
          borderRadius: 5,
          marginHorizontal: 6,
        }}
      ></View>
    ));
  };

  // Handle horizontal scroll function
  const handleScroll = (event) => {
    // Get horizontal scroll position
    const scrollPos = event.nativeEvent.contentOffset.x;
    // Get index of current active image
    const index = Math.round(scrollPos / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        {renderDotSlider()}
      </View>
    </View>
  );
};

export default Carousel;
