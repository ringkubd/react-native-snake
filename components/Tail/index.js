import {View} from 'react-native';
import Constants from '../../utils/constants';

const Tail = ({elements, position, size}) => {
  const tailList = elements.map((el, idx) => (
    <View
      key={idx}
      style={{
        width: size,
        height: size,
        position: 'absolute',
        left: el[0] * size,
        top: el[1] * size,
        backgroundColor: 'red',
      }}
    />
  ));

  return (
    <View
      style={{
        width: Constants.GRID_SIZE * size,
        height: Constants.GRID_SIZE * size,
      }}>
      {tailList}
    </View>
  );
};
export default Tail;
