import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Slider, Button, Image, TouchableOpacity } from 'react-native';
import { Shaders, Node, GLSL } from 'gl-react';

import { Surface } from 'gl-react-expo'; // for React Native via Expo GLView

const shaders = Shaders.create({
  Saturate: {
    frag: GLSL`
  precision highp float;
  varying vec2 uv;
  uniform sampler2D t;
  uniform float contrast, saturation, brightness;
  const vec3 L = vec3(0.2125, 0.7154, 0.0721);
  void main() {
    vec4 c = texture2D(t, uv);
  	vec3 brt = c.rgb * brightness;
  	gl_FragColor = vec4(mix(
      vec3(0.5),
      mix(vec3(dot(brt, L)), brt, saturation),
      contrast), c.a);
  }
  `,
  },
});

export const Saturate = ({ contrast, saturation, brightness, children }) => <Node shader={shaders.Saturate} uniforms={{ contrast, saturation, brightness, t: children }} />;

export default function FilterBW({ url, update }) {
  const filter = {
    contrast: 1.2,
    saturation: 0.2,
    brightness: 1.2,
  };

  updateImage = async () => {
    let pictureSave = await imageFilterBW.glView.capture();
    await update(pictureSave.uri);
  };

  return (
    <TouchableOpacity onPress={updateImage}>
      <Surface style={{ width: 150, height: 150, borderRadius: 10 }}>
        <Saturate {...filter}>{{ uri: url }}</Saturate>
      </Surface>

      <View style={{ width: 0, height: 0 }}>
        <Surface ref={view => (imageFilterBW = view)} style={{ width: 700, height: 700, borderRadius: 10 }}>
          <Saturate {...filter}>{{ uri: url }}</Saturate>
        </Surface>
      </View>
    </TouchableOpacity>
  );
}
