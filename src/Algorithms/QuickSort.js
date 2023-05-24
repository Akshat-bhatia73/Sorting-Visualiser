import swap from "../helper/Swap";

export const getQuickSortAnimations = (array, arraySize) => {
  const animations = [];
  quickSort(array, 0, arraySize - 1, animations);
  return animations;
};

const quickSort = (array, low, high, animations) => {
  if (low < high) {
    const pivotIdx = partition(array, low, high, animations);
    quickSort(array, low, pivotIdx - 1, animations);
    quickSort(array, pivotIdx + 1, high, animations);
  }
};

const partition = (array, low, high, animations) => {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      animations.push([i, j]);
      swap(array, i, j);
      animations.push([i, array[i], j, array[j]])
      animations.push([i, j]);
    }
  }

  animations.push([i + 1, high]);
  swap(array, i + 1, high);
  animations.push([i + 1, array[i+1], high, array[high]]);
  animations.push([i + 1, high]);

  return i + 1;
};
