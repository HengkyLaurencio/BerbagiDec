import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function RestoranHomePage() {
  const total = 30;
  const completed = 5;
  const radius = 80;
  const strokeWidth = 20;
  const percentage = completed / total;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: "#333",
          marginBottom: 40,
        }}
      >
        Rumah Padang Sederhana
      </Text>

      <View
        style={{
          width: 220,
          height: 220,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Svg width={200} height={200}>
          {/* Background Circle */}
          <Circle
            stroke="#D6F0E0"
            fill="none"
            cx="100"
            cy="100"
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Progress Circle */}
          <Circle
            stroke="#2D7A2D"
            fill="none"
            cx="100"
            cy="100"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin="100, 100"
          />
        </Svg>

        {/* Centered Text */}
        <View
          style={{
            position: "absolute",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#333",
            }}
          >
            Target Hari Ini
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {completed}/{total}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#FF7F5C",
              fontWeight: "bold",
            }}
          >
            2 Di Proses
          </Text>
        </View>
      </View>
    </View>
  );
}
