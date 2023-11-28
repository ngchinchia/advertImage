import {
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
  Text,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { setActiveIndex } from "../../store/actions/carousel_actions/carousel_actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";

const Carousel = () => {
  // Get full dimension width of mobile
  const screenWidth = Dimensions.get("window").width;

  const dispatch = useDispatch();
  const activeIndex = useSelector((state) => state.activeIndex.activeIndex);

  // Reference
  const flatlistRef = useRef();

  const carouselData = [
    {
      id: "01",
      image: require("../../assets/ad_3.png"),
      url: "http://sghired.com/",
    },
    {
      id: "02",
      image: require("../../assets/ad_1.jpg"),
      url: "https://example.com/page1",
    },
    {
      id: "03",
      image: require("../../assets/ad_2.jpg"),
      url: "http://sghired.com/",
    },
  ];

  // Auto Scroll 2s
  useEffect(() => {
    let interval = setInterval(() => {
      flatlistRef.current.scrollToIndex({
        index: activeIndex === carouselData.length - 1 ? 0 : activeIndex + 1,
        animated: true,
      });
    }, 2500);
    return () => clearInterval(interval);
  });

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  const handleImagePress = () => {
    const url = carouselData[activeIndex].url;
    if (url) {
      Linking.openURL(url);
    }
  };

  // Render image function
  const renderImageItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={handleImagePress}>
        <View>
          <Image
            source={item.image}
            style={{ height: 180, width: screenWidth }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // Render dot slider function
  const renderDotSlider = () => {
    return carouselData.map((dot, index) => (
      <View
        key={index}
        style={{
          backgroundColor: activeIndex === index ? "black" : "gray",
          height: 8,
          width: 8,
          borderRadius: 5,
          marginHorizontal: 6,
        }}
      ></View>
    ));
  };

  // Handle horizontal scroll function
  const handleScroll = (event) => {
    const scrollPos = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPos / screenWidth);
    dispatch(setActiveIndex(index));
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
      <View style={styles.dot_icon}>{renderDotSlider()}</View>
      <View style={styles.job_container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.job_title}>Agency: Xav</Text>
        </View>
        <View>
          <Text style={styles.job_title}>Posted By: Denon</Text>
        </View>
      </View>
    </View>
  );
};

export default Carousel;
