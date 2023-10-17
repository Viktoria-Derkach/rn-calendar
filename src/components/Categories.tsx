import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ICategory } from '../types/utils';
import { typography } from './../styles/typography';
import { lightenColor } from '../utils/lightenColor';
import { FormikErrors } from 'formik';
import { categories } from '../data/categories';

interface CategoryProps {
  category: ICategory;
  handlePress: (category: ICategory) => void;
  selected?: ICategory | null;
}

const Category = ({ category, selected, handlePress }: CategoryProps) => {
  const selectedStyle =
    selected?.type === category.type
      ? {
          borderWidth: 2,
          borderColor: category.color,
          shadowColor: lightenColor(category.color, 35),
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 5,
        }
      : undefined;

  return (
    <TouchableOpacity
      onPress={() => handlePress(category)}
      style={[
        styles.category,
        {
          backgroundColor: lightenColor(category.color, 35),
          ...selectedStyle,
        },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: category.color }]}></View>
      <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, typography.text]}>
        {category.type}
      </Text>
    </TouchableOpacity>
  );
};

interface CategoriesProps<T> {
  initialValue: null;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<T>>;
}

const Categories = <T extends {}>({ setFieldValue, initialValue }: CategoriesProps<T>) => {
  const [selected, setSelected] = useState<ICategory | null>(initialValue);
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = useCallback(
    (category: ICategory): void => {
      setIsSelected(!isSelected);
      if (isSelected || (selected && selected.type !== category.type)) {
        setSelected(category);
      } else {
        setSelected(null);
      }
      setFieldValue('category', category);
    },
    [isSelected, selected, setFieldValue]
  );
  return (
    <View style={[typography.flex]}>
      {categories.map(category => (
        <Category
          key={category.type}
          handlePress={handlePress}
          selected={selected}
          category={category}
        />
      ))}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  category: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  dot: {
    borderRadius: 50,
    marginRight: 7,
    width: 10,
    height: 10,
  },
  text: {
    paddingRight: 10,
  },
});
