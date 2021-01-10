import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";

export default class Index extends Component {
  componentWillMount() {
    if (this.compareVersion(Taro.getSystemInfoSync().SDKVersion, "2.3.0")) {
      if (Taro.startGyroscope) {
        Taro.startGyroscope({
          interval: "ui",
          success: () => {
            Taro.onGyroscopeChange((res) => {
              console.log("res", res);
            });
          },
        });
      } else {
        Taro.showModal({
          title: "提示",
          content: `当前版本：${
            Taro.getSystemInfoSync().SDKVersion
          }；不支持 startGyroscope`,
        });
      }
    } else {
      Taro.showModal({
        title: "提示",
        content:
          "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
      });
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  public compareVersion(v1: string, v2: string) {
    const v1Array = v1.split(".");
    const v2Array = v2.split(".");
    const len = Math.max(v1Array.length, v2Array.length);

    while (v1Array.length < len) {
      v1Array.push("0");
    }
    while (v2.length < len) {
      v2Array.push("0");
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i]);
      const num2 = parseInt(v2[i]);

      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      }
    }

    return 0;
  }

  render() {
    return (
      <View className="index">
        <Text>Hello world!</Text>
      </View>
    );
  }
}
