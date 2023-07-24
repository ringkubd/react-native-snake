import { Text, View } from "react-native";

const Food = ({size, position}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: 'green',
        position: 'absolute',
        left: position[0] * size,
        top: position[1] * size,
        borderRadius: 50,
      }}
    >
      <Text style={{textAlign: 'center'}}>F</Text>
    </View>
  );
};
export default Food;
