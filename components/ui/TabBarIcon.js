import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

export default function TabBarIcon(props) {
  return (
    <AntDesign
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? "#FF6251" : Colors.tabIconDefault}
    />
  );
}
