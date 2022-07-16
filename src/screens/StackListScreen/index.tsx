import React, { useMemo, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import {
  FlatList,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { Card } from '../../components/Card';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  withSequence,
  Extrapolate,
} from 'react-native-reanimated';

import * as S from './styles';
import { AntDesign as Icon } from '@expo/vector-icons';

interface DataProps {
  value: number;
}

interface StackListProps {
  data: DataProps[];
}

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = width * 0.7;
const ANIMATION_DURATION = 1500;
const ROTATE_ANGLE = 4;
const ITEM_VISIBLES = 3;

function Item(props) {
  // For centralize rotate animations
  const rad_angle = useMemo(() => (ROTATE_ANGLE * Math.PI) / 180, []);
  const x_diff = useMemo(() => (Math.sin(rad_angle) * ITEM_HEIGHT) / 2, []);
  const y_diff = useMemo(
    () => ITEM_HEIGHT / 2 - (Math.cos(rad_angle) * ITEM_HEIGHT) / 2,
    [],
  );

  const topAnimated = useSharedValue(0);
  const leftAnimated = useSharedValue(0);
  const rotateZAnimated = useSharedValue(0);
  const scaleAnimated = useSharedValue(
    interpolate(
      props.scrollXValue.value,
      [props.index, props.index + 1],
      [1, 0.94],
      { extrapolateLeft: Extrapolate.CLAMP },
    ),
  );
  const opacityAnimated = useSharedValue(
    interpolate(
      props.scrollXValue.value,
      [props.index, props.index + 1],
      [1, 1 - 1 / 2.15],
    ),
  );

  if (props.index == props.scrollXValue.value + 1) {
    topAnimated.value = withSequence(
      withTiming(y_diff - 40, { duration: 300, easing: Easing.elastic(1) }),

      withTiming(y_diff + 100, { duration: 700, easing: Easing.exp }),
    );

    leftAnimated.value = withSequence(
      withTiming(props.swipeX.current > 0 ? x_diff : -x_diff, {
        duration: 300,
      }),

      withTiming(props.swipeX.current > 0 ? width : -width, {
        duration: 700,
        easing: Easing.exp,
      }),
    );

    rotateZAnimated.value = withTiming(props.swipeX.current > 0 ? 4 : -4, {
      duration: 300,
    });

    scaleAnimated.value = withTiming(1.04, { duration: 300 });
  } else {
    topAnimated.value = withTiming(
      interpolate(
        props.scrollXValue.value,
        [props.index - 1, props.index, props.index + 1],
        [10, 0, 50],
      ),
      { duration: ANIMATION_DURATION },
    );

    scaleAnimated.value = withTiming(
      interpolate(
        props.scrollXValue.value,
        [props.index, props.index + 1],
        [1, 0.94],
        { extrapolateLeft: Extrapolate.CLAMP },
      ),
      { duration: ANIMATION_DURATION },
    );
  }

  opacityAnimated.value = withTiming(
    interpolate(
      props.scrollXValue.value,
      [props.index, props.index + 1],
      [1, 1 - 1 / 2.15],
    ),
    { duration: ANIMATION_DURATION },
  );

  const style = useAnimatedStyle(() => {
    return {
      top: topAnimated.value,
      left: leftAnimated.value,
      opacity: opacityAnimated.value,
      transform: [
        {
          scale: scaleAnimated.value,
        },
        { rotateZ: `${rotateZAnimated.value}deg` },
      ],
    };
  });

  return (
    <Animated.View style={[style]}>
      <Card width={ITEM_WIDTH} height={ITEM_HEIGHT} />
    </Animated.View>
  );
}

export function StackList(props: StackListProps) {
  const [data, setData] = useState<DataProps[]>(props.data);

  const [index, setIndex] = useState(ITEM_VISIBLES);

  const panGesture = Gesture.Pan();

  const scrollXValue = useSharedValue(ITEM_VISIBLES);

  const swipeX = useRef(0);

  panGesture.onEnd((event) => {
    scrollXValue.value = index - 1;
    swipeX.current = event.translationX;
    setIndex((state) => state - 1);
  });

  function renderItem(props) {
    return <Item {...props} scrollXValue={scrollXValue} swipeX={swipeX} />;
  }

  return (
    <GestureDetector gesture={panGesture}>
      <S.StackListContainer>
        <S.ResultsText>74 Results for 'photographer'</S.ResultsText>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          data={data}
          scrollEnabled={false}
          contentContainerStyle={{
            width: '100%',
            height: ITEM_HEIGHT + 100,
          }}
          style={{ flexGrow: 0, overflow: 'visible' }}
        />
        <S.ReactionsContainer>
          <S.Reaction>
            <Icon name="swapleft" size={42} color="#0e177d" />
            <S.ReactionText>Dislike</S.ReactionText>
          </S.Reaction>
          <S.Reaction>
            <Icon name="swapright" size={42} color="#0e177d" />
            <S.ReactionText>Like</S.ReactionText>
          </S.Reaction>
        </S.ReactionsContainer>
        <S.BottomTab>
          <S.BottomTabBg>
            <Icon name="user" size={28} color="grey" />
            <S.SelectedItem>
              <Icon name="search1" size={30} color="#0e177d" />
              <S.SelectedDot />
            </S.SelectedItem>
            <Icon name="setting" size={30} color="grey" />
          </S.BottomTabBg>
        </S.BottomTab>
      </S.StackListContainer>
    </GestureDetector>
  );
}
