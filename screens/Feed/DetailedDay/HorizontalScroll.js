// import React, { useState, useEffect } from 'react';
// import { SafeAreaView, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Text, FlatList, StyleSheet, View, Button, Alert, Image, ScrollView } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// // UI COMPONENTS
// import { BaseTitle, BaseInput, AntDesign } from './../../../components/ui/index';

// export default function HorizontalScroll({ props }) {
//   const currentDay = useSelector(state => state.days.detailedDay);

//   return (
//     <View style={styles.horizontalScroll}>
//       <Text style={{ fontFamily: 'sf-ui', marginBottom: 15 }}>Open day: {currentDay.id}</Text>
//       <ScrollView showsHorizontalScrollIndicator={false} style={styles.horizontalScrollFilter} horizontal="true">
//         {currentDay.posts &&
//           currentDay.posts.map(post => {
//             return (
//               <View style={{ marginRigth: 10, width: 105, height: 90, borderRadius: 5 }} key={post.id}>
//                 <Image style={{ width: 90, height: 90, borderRadius: 5 }} source={{ uri: post.postImageHiRes }} />
//               </View>
//             );
//           })}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   horizontalScroll: {
//     width: '100%',
//     height: 120,
//     backgroundColor: '#fff',
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//   },
//   horizontalScrollFilter: {
//     minHeight: 150,
//     maxHeight: 150,
//     width: '100%',
//   },
// });
